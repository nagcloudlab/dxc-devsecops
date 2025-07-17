
db.employees.insertMany([
  {
    _id:1,
    name: "Alice",
    position: "Software Engineer",
    department: "Engineering",
    salary: 80000
  },
  {
    _id:2,
    name: "Bob",
    position: "Data Scientist",
    department: "Data Science",
    salary: 90000
  },
  {
    _id:3,
    name: "Charlie",
    position: "Product Manager",
    department: "Product",
    salary: 95000
  }
]);

db.projects.insertOne({
  name: "Project1",
  description: "This is the first project in the MongoDB lab.",
  tasks:[
    {
      title: "Task 1",
      description: "Complete the first task of the project.",
      status: "in-progress",
      assignedTo: 1
    },
    {
      title: "Task 2",
      description: "Complete the second task of the project.",
      status: "not-started",
      assignedTo: 1
    },
    {
      title: "Task 3",
      description: "Complete the third task of the project.",
      status: "completed",
      assignedTo: 2
    }
  ]
});

db.employees.updateOne(
  { _id: 1 },
  { $set: { salary: 85000 } }
);

db.projects.updateOne(
  { name: "Project1" },
  { $push: { tasks: { title: "Task 4", description: "Complete the fourth task of the project.", status: "not-started", assignedTo: 3 } } }
);



To Query the data

way-1 : .find() method is used to retrieve documents from a collection. : form simple quries
way-2 : aggregation framework is used to process data records and return computed results. : for complex queries

db.employees.find({ department: "Engineering" });

// Query the database to find all tasks assigned to Alice

<!-- db.projects.find(
  { "tasks.assignedTo": 1 },
  { "tasks.$": 1 }
); -->


db.projects.aggregate([
  { $unwind: "$tasks" },
  { $match: { "tasks.assignedTo": 1 } },
  { $project: { _id: 0, taskTitle: "$tasks.title", taskStatus: "$tasks.status" } }
]);

