--  DROP DATABASE Shopping;
CREATE DATABASE Shopping;
USE Shopping;

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    role VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE users(
    id INT AUTO_INCREMENT NOT NULL,
    userName VARCHAR(255),
    address VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    phoneNumber VARCHAR(255),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE products
(
id INT AUTO_INCREMENT NOT NULL,
productName VARCHAR(255),
img VARCHAR(255),
description VARCHAR(255),
price INT,
is_deleted TINYINT DEFAULT 0,
PRIMARY KEY (id)
);

CREATE TABLE permissions(
    id int auto_increment  NOT NULL,
    permission varchar (255)  NOT NULL,
    is_deleted TINYINT DEFAULT 0,
    primary key (id)
);

CREATE TABLE roles_permissions(
id int auto_increment NOT NULL,
permission_id INT,
role_id INT,
foreign key (role_id) references roles(id),
foreign key (permission_id) references permissions(id),
is_deleted TINYINT DEFAULT 0,
primary key (id)
);

CREATE TABLE basket(
id int auto_increment NOT NULL,
product_id INT,
user_id INT,
amount INT DEFAULT 1,
foreign key (product_id) references products(id),
foreign key (user_id) references users(id),
is_deleted TINYINT DEFAULT 0,
primary key (id)
);