# MERN Internship 2025: Course Management System

This repository contains the backend API implementation and documentation for a MERN-stack Course Management System. The project is designed to handle student enrollments, course administration, and video content delivery with role-based access control.

---

## 🏗 Database Architecture

The system uses a relational structure (documented via ER Diagram) with the following core entities:

* 
**Users**: Handles authentication with fields for `email`, `password`, and `role` (Admin/Student).


* 
**Courses**: Stores educational programs including `course_name`, `fees`, `start_date`, and `end_date`.


* 
**Videos**: Content linked to specific courses via `course_id`, including `youtube_url` and `video_expire_days`.


* 
**Students**: Manages profile data like `reg_no`, `mobile_no`, and `profile_pic`.



---

## 🚀 API Reference

1. Authentication & Common APIs 

| Endpoint | Method | Description | Request Body/Query |
| --- | --- | --- | --- |
| `/auth/login` | `POST` | Authenticate user (Student/Admin) | `{ email, password }` |
| `/course/all-active-courses` | `GET` | Fetch all currently active courses | N/A |

2. Admin Features 

Admins have full CRUD (Create, Read, Update, Delete) capabilities over courses and video content.

* **Course Management**:
* 
`GET /course/all-courses`: Retrieve all courses with optional date filtering (`startDate`, `endDate`).


* 
`POST /course/add`: Create a new course entry.


* 
`PUT /course/update/:courseId`: Modify existing course details.


* 
`DELETE /course/delete/:courseId`: Remove a course from the system.




* **Video Management**:
* 
`POST /video/add`: Upload video metadata (Title, YouTube URL) to a course.


* 
`PUT /video/update/:videoId`: Update video information.


* 
`DELETE /video/delete/:videoId`: Remove a specific video.




* **Student Oversight**:
* 
`GET /admin/enrolled-students`: Fetch a list of students filtered by `courseId`.





3. Student Features 

* 
**Enrollment**: `POST /student/register-to-course` using `email`, `name`, and `mobileNo`.


* 
**Account**: `PUT /student/change-password` for security updates.


* **Content Access**:
* 
`GET /student/my-courses`: View all registered courses.


* 
`GET /student/my-course-with-videos`: Access registered course content and valid videos.





---

## 🛠 Tech Stack

* **Frontend**: React.js
* **Backend**: Node.js & Express.js
* 
**Database**: MongoDB (MERN Stack) 


* 


