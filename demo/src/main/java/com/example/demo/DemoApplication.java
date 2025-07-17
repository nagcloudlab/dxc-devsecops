package com.example.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Repository;

// MongoDB Document Entity Example
@Document(collection = "employees")
class Employee {
	@Id
	private long id;
	private String name;
	private String department;
	private double salary;
	private String position;

	public Employee(long id, String name, String department, double salary, String position) {
		this.id = id;
		this.name = name;
		this.department = department;
		this.salary = salary;
		this.position = position;
	}

	public Employee() {
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public double getSalary() {
		return salary;
	}

	public void setSalary(double salary) {
		this.salary = salary;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	@Override
	public String toString() {
		return "Employee{" +
				"id=" + id +
				", name='" + name + '\'' +
				", department='" + department + '\'' +
				", salary=" + salary +
				", position='" + position + '\'' +
				'}';
	}

}

@Repository
interface EmployeeRepository extends org.springframework.data.mongodb.repository.MongoRepository<Employee, Long> {
	// This class can be used to define custom repository methods if needed
}

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(MongoTemplate mongoTemplate,
			EmployeeRepository employeeRepository) {
		return args -> {

			// // Create a new Employee
			// Employee employee = new Employee(5, "John Doe", "Engineering", 75000,
			// "Software Engineer");

			// // Save the Employee to MongoDB
			// mongoTemplate.save(employee);

			// // Retrieve the Employee from MongoDB
			// Employee retrievedEmployee = mongoTemplate.findById(1L, Employee.class);

			// // Print the retrieved Employee
			// System.out.println("Retrieved Employee: " + retrievedEmployee);

			// employeeRepository.findAll().forEach(emp -> {
			// System.out.println("Employee: " + emp);
			// });

			// Aggration Framework Example
			// mongoTemplate.aggregate(
			// org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation(
			// org.springframework.data.mongodb.core.aggregation.Aggregation.group("department")
			// .avg("salary").as("averageSalary")),
			// Employee.class,
			// org.springframework.data.mongodb.core.aggregation.AggregationResults.class)
			// .getMappedResults().forEach(result -> {
			// System.out.println(result);
			// });

		};

	}

}
