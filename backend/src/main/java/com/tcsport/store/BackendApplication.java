package com.tcsport.store;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
        System.out.println("==================================================================");
        System.out.println("🚀 [TC SPORT BACKEND] Server Spring Boot đang chạy tại: http://localhost:8081");
        System.out.println("📦 Swagger/REST Endpoints: /api/products, /api/orders, /api/auth");
        System.out.println("==================================================================");
    }
}
