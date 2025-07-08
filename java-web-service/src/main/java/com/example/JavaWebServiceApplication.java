package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class JavaWebServiceApplication {

	@GetMapping("/hello")
	public String hello() {
		try {
			String hostName = java.net.InetAddress.getLocalHost().getHostName();
			return "Hello from " + hostName + "!";
		} catch (java.net.UnknownHostException e) {
			return "Hello from an unknown host!";
		}
	}

	public static void main(String[] args) {
		SpringApplication.run(JavaWebServiceApplication.class, args);
	}

}
