# 📦 Pro-Level Inventory Management System

A robust, full-stack CRUD (Create, Read, Update, Delete) application built with **Java Spring Boot**, **MySQL**, and **Vanilla JavaScript**. This project demonstrates a clean separation of concerns, RESTful API design, and a responsive User Experience.

## 🚀 Key Features

- **Full CRUD Operations**: Seamlessly manage products (Create, View, Edit, Delete).
- **Real-time Search**: Instant client-side filtering by Product Name or ID.
- **State Management**: Dynamic UI transitions between "Creation" and "Edition" modes.
- **Data Integrity**: Multi-level validation (Frontend & Backend) to ensure data quality.
- **RESTful Architecture**: Follows standard HTTP methods (GET, POST, PUT, DELETE).
- **Responsive Design**: Modern, clean UI built with professional CSS variables.

## 🛠️ Tech Stack

- **Backend**: Java 17, Spring Boot 3.x, Spring Data JPA.
- **Database**: MySQL 8.0.
- **Frontend**: HTML5, CSS3 (Modern Flexbox/Grid), Vanilla JavaScript (ES6+).
- **Build Tool**: Maven.

## 📋 Prerequisites

Before running this project, ensure you have:
- **JDK 17** or higher installed.
- **MySQL Server** running.
- An IDE (Eclipse, IntelliJ, or VS Code).

## ⚙️ Setup & Installation

1. **Clone the repository**:

   git clone [https://github.com/tomasgarcia39/inventory-management.git](https://github.com/tomasgarcia39/inventory-management.git)"# inventory-management" 

**Configure the Database**

-Create a schema named inventory_db in MySQL.

-Update src/main/resources/application.properties with your credentials:

**spring.datasource.url=jdbc:mysql://localhost:3306/inventory_db**

**spring.datasource.username=your_username**

**spring.datasource.password=your_password**

**Build and Run**:

-**Using your IDE**: Run InventoryManagementApplication.java.

-**Using Maven**:

mvn spring-boot:run

Access the App:
Open your browser and navigate to http://localhost:8081.

**📂 Project Structure**

-src/main/java/.../controller: REST API Endpoints.

-src/main/java/.../model: Entity definitions (JPA).

-src/main/java/.../repository: Data Access Layer.

-src/main/resources/static: Frontend assets (Separated CSS/JS).

Developed by [Tomas Garcia] – Focused on building scalable and maintainable software.