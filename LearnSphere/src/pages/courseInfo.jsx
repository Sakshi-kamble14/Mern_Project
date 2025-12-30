import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";
import { getCourseById } from "../services/courseService";

import mernImg from "../images/mern.png";
import aiImg from "../images/ai.png";
import androidImg from "../images/android.png";
import pythonImg from "../images/python.png";
import javaImg from "../images/java.png";

export default function CourseInfo() {
  const navigate = useNavigate();

  const courseImages = {
    "IIT-MERN-2025": mernImg,
    "AI": aiImg,
    "Android": androidImg,
    "Python": pythonImg,
    "Java": javaImg
  };

  const [course, setCourse] = useState(null);

  useEffect(() => {
    const storedCourseId = localStorage.getItem("course_id");
    if (!storedCourseId) {
      navigate("/");
    } else {
      fetchCourse(storedCourseId);
    }
  }, []);

  const fetchCourse = async (course_id) => {
    const result = await getCourseById(course_id);
    if (result.status === "success") {
      setCourse(result.data); // single object
    }
  };

  const goToRegister = () => {
    const course_id = localStorage.getItem("course_id");
    navigate(`/user/registertocourse/${course_id}`);
  };

  
  if (!course) {
    return (
      <>
        <Navbar />
        <div className="container mt-5">
          <p>Loading course...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="card p-3">
          <div className="row">
            <div className="col-md-4 text-center">
              <img
                src={courseImages[course.course_name] || aiImg}
                alt={course.course_name}
                className="img-fluid"
                style={{ maxHeight: "200px" }}
              />
            </div>

            <div className="col-md-8">
              <h4>{course.course_name}</h4>
              <p><b>Description:</b> {course.description}</p>
              <p><b>Start Date:</b> {new Date(course.start_date).toLocaleDateString()}</p>
              <p><b>End Date:</b> {new Date(course.end_date).toLocaleDateString()}</p>
              <p><b>Fees:</b> ₹{course.fees}</p>

              <button className="btn btn-success mt-3" onClick={goToRegister}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}