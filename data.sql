CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role ENUM('admin', 'superadmin') NOT NULL DEFAULT 'admin',
    service_number VARCHAR(255) NOT NULL,
    FOREIGN KEY (service_number) REFERENCES personnel(service_number)
);