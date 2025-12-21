create database mern_db;
use mern_db;

CREATE TABLE users (
    email VARCHAR(100) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'student') NOT NULL
);

CREATE TABLE courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    fees INT,
    start_date DATE,
    end_date DATE,
    video_expire_days INT
);

CREATE TABLE students (
    reg_no INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100),
    course_id INT,
    mobile_no BIGINT,
    profile_pic BLOB,
    FOREIGN KEY (email) REFERENCES users(email),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

CREATE TABLE videos (
    video_id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT,
    title VARCHAR(150),
    description VARCHAR(255),
    youtube_url VARCHAR(255),
    added_at DATE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
