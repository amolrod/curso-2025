-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS crud_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE crud_db;

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- Crear tabla de empleados
CREATE TABLE IF NOT EXISTS employees (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar datos de ejemplo con nombres espanoles (sin acentos por compatibilidad)
INSERT INTO employees (name, address, salary) VALUES
    ('Maria Garcia Lopez', 'Calle Gran Via 45, Madrid', 35000.00),
    ('Jose Martinez Ruiz', 'Avenida Diagonal 123, Barcelona', 42000.00),
    ('Carmen Rodriguez Perez', 'Calle Colon 78, Valencia', 38000.00),
    ('Antonio Fernandez Santos', 'Paseo de la Castellana 201, Madrid', 45000.00),
    ('Isabel Lopez Navarro', 'Ronda de Sant Pere 56, Barcelona', 40000.00),
    ('Francisco Sanchez Moreno', 'Calle Larios 12, Malaga', 33000.00),
    ('Ana Torres Gil', 'Avenida de la Constitucion 34, Sevilla', 37000.00),
    ('Manuel Jimenez Castro', 'Calle Mayor 89, Zaragoza', 36000.00),
    ('Laura Ramirez Diaz', 'Plaza Espana 15, Bilbao', 41000.00),
    ('David Gonzalez Munoz', 'Calle Alcala 167, Madrid', 39000.00);

-- Crear usuario con permisos (por si acaso)
CREATE USER IF NOT EXISTS 'crud_user'@'%' IDENTIFIED BY 'crud_password';
GRANT ALL PRIVILEGES ON crud_db.* TO 'crud_user'@'%';
FLUSH PRIVILEGES;
