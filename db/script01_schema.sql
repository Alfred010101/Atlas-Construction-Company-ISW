CREATE DATABASE IF NOT EXISTS construction_company 
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS construction_company.employees(
	id INT AUTO_INCREMENT NOT NULL,
	first_name VARCHAR(51) NOT NULL,
    last_name VARCHAR(51) NOT NULL,
    username VARCHAR(31) NOT NULL UNIQUE,
    `password` VARCHAR(100) NOT NULL,
    phone VARCHAR(10) NOT NULL,
	`role` ENUM('SYS_ADMIN', 'RESOURCE_MANAGER', 'CONSTRUCTION_SUPERVISOR', 'WAREHOUSE_SUPERVISOR', 'CEO') NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS construction_company.customers(
	id INT AUTO_INCREMENT NOT NULL,
	first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS construction_company.projects(
	id INT AUTO_INCREMENT NOT NULL,
	`name` VARCHAR(63),
    fk_customer INT NOT NULL,    
    address VARCHAR(255) NOT NULL UNIQUE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    fk_supervisor INT NOT NULL,
	PRIMARY KEY(id),
    FOREIGN KEY(fk_customer) REFERENCES construction_company.customers(id),
    FOREIGN KEY(fk_supervisor) REFERENCES construction_company.employees(id)
);
