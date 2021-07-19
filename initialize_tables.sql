CREATE DATABASE foolab;
USE foolab;

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL,
    salt CHAR(32) NOT NULL,
    hash CHAR(128) NOT NULL,
    is_admin BOOLEAN NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL
);
CREATE TABLE statuses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL,
);

CREATE TABLE file_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE sequencing_providers(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(25) NOT NULL, 
    updated_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL
);
CREATE TABLE sequencing_types(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(25) NOT NULL, 
    updated_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE organisms(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(15) NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL
);
CREATE TABLE sequencers(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL
);
CREATE TABLE experiments(
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    code CHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT NULL,
    updated_at TIMESTAMP NOT NULL, 
    created_at TIMESTAMP NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE samples(
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    code CHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT NULL,
    tissue VARCHAR(100) NOT NULL,
    condition VARCHAR(255) NOT NULL,
    treatment VARCHAR(255) NOT NULL,
    SRA CHAR(10) NOT NULL, 
    remarks TEXT NULL,
    updated_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL,
    experiment_id INT NOT NULL,
    FOREIGN KEY (experiment_id) REFERENCES experiments (id),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    status_id INT NOT NULL,
    FOREIGN KEY (status_id) REFERENCES statuses (id),
    organism_id INT NOT NULL,
    FOREIGN KEY (organism_id) REFERENCES organisms (id),
    sequencing_type_id INT NOT NULL,
    FOREIGN KEY (sequencing_type_id) REFERENCES sequencing_type (id),
    sequencer_id INT NOT NULL,
    FOREIGN KEY (sequencer_id) REFERENCES sequencers(id),
    sequencing_provider_id INT NOT NULL,
    FOREIGN KEY (sequencing_provider_id) REFERENCES sequencing_providers(id)
);

CREATE TABLE sample_files(
    id INT AUTO_INCREMENT PRIMARY KEY,
    sample_id INT NOT NULL,
    FOREIGN KEY (sample_id) REFERENCES samples(id),
    file_type_id INT NOT NULL,
    FOREIGN KEY (file_type_id) REFERENCES file_types(id),
    location VARCHAR(255) NOT NULL,
    remarks TEXT NULL,
    updated_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL
);


