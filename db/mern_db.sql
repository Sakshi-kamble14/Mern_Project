DROP DATABASE IF EXISTS mern_db;
show databases;
create database mern_db;

use mern_db;

DROP TABLE IF EXISTS users;


CREATE TABLE users (
    email VARCHAR(100) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'student') NOT NULL
);

DROP TABLE IF EXISTS courses;

CREATE TABLE courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    fees INT,
    start_date DATE,
    end_date DATE,
    video_expire_days INT
);

DROP TABLE IF EXISTS students;

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

DROP TABLE IF EXISTS videos;

CREATE TABLE videos (
    video_id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT,
    title VARCHAR(150),
    description VARCHAR(255),
    youtube_url VARCHAR(255),
    added_at DATE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
INSERT INTO users (email, password, role) VALUES
('admin@mern.com', 'admin123', 'admin'),
('student1@gmail.com', 'stud123', 'student'),
('student2@gmail.com', 'stud123', 'student'),
('student3@gmail.com', 'stud123', 'student');

INSERT INTO courses 
(course_name, description, fees, start_date, end_date, video_expire_days) 
VALUES
('MERN Stack', 'Full Stack Web Development with MERN', 25000, '2025-01-10', '2025-06-10', 180),
('Python Full Stack', 'Python, Django & React', 22000, '2025-02-01', '2025-07-01', 180),
('Java Full Stack', 'Java, Spring Boot & Angular', 24000, '2025-03-01', '2025-08-01', 180);

INSERT INTO students 
(name, email, course_id, mobile_no, profile_pic) 
VALUES
('Rahul Sharma', 'student1@gmail.com', 1, 9876543210, NULL),
('Anita Verma', 'student2@gmail.com', 2, 9876543222, NULL),
('Amit Kumar', 'student3@gmail.com', 3, 9876543333, NULL);

INSERT INTO videos 
(course_id, title, description, youtube_url, added_at) 
VALUES
(1, 'Introduction to MERN', 'Overview of MERN Stack', 'https://youtube.com/mern_intro', '2025-01-12'),
(1, 'MongoDB Basics', 'Learn MongoDB CRUD', 'https://youtube.com/mongodb_basics', '2025-01-15'),

(2, 'Python Basics', 'Introduction to Python', 'https://youtube.com/python_basics', '2025-02-05'),
(2, 'Django Models', 'Working with Django ORM', 'https://youtube.com/django_models', '2025-02-10'),

(3, 'Java Basics', 'Introduction to Java', 'https://youtube.com/java_basics', '2025-03-05'),
(3, 'Spring Boot Intro', 'Spring Boot Overview', 'https://youtube.com/springboot_intro', '2025-03-10');

SELECT * FROM users;
SELECT * FROM courses;
SELECT * FROM students;
SELECT * FROM videos;

