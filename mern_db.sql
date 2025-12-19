create database mern_db;
use mern_db;
CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'student', 'instructor') NOT NULL
);
CREATE TABLE courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(255) NOT NULL,
    description VARCHAR(500),
    fees INT,
    start_date DATE,
    end_date DATE,
    video_expire_days INT
);
CREATE TABLE students (
    reg_no INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    course_id INT,
    mobile_no BIGINT,
    profile_pic BLOB,
    FOREIGN KEY (email) REFERENCES users(email),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
CREATE TABLE videos (
    video_id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT,
    title VARCHAR(255),
    description VARCHAR(500),
    youtube_url VARCHAR(255),
    added_at DATE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
INSERT INTO users (email, password, role)
VALUES ('student1@gmail.com', 'hashed_password', 'student');
INSERT INTO courses (course_name, description, fees, start_date, end_date, video_expire_days)
VALUES ('MERN Stack', 'Full MERN course', 5000, '2025-01-01', '2025-03-01', 90);
INSERT INTO students (name, email, course_id, mobile_no)
VALUES ('John Doe', 'student1@gmail.com', 1, 9876543210);
INSERT INTO videos (course_id, title, description, youtube_url, added_at)
VALUES (1, 'Intro to MERN', 'Overview of MERN stack', 'https://youtube.com/xyz', CURDATE());

Select * from users;
select *from courses;
select *from students;
select *from videos;