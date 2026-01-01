import { useEffect, useState } from "react";
import { getCourseById } from "../services/courseService";
import { useNavigate, useParams } from "react-router";
import mernImg from "../images/mern.png";
import aiImg from "../images/ai.png";
import androidImg from "../images/android.png";
import pythonImg from "../images/python.png";
import javaImg from "../images/java.png";

export default function CourseInfo() {
  const { course_id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const courseImages = {
    "IIT-MERN-2025": mernImg,
    AI: aiImg,
    Android: androidImg,
    Python: pythonImg,
    Java: javaImg,
  };

  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (!course_id) {
      navigate("/");
      return;
    }

    fetchCourse();
  }, [course_id, token, navigate]);

  const fetchCourse = async () => {
    const result = await getCourseById(course_id, token);
    if (result.status === "success") {
      setCourse(result.data[0]); // backend returns array
    }
  };

  // Redirect to registration form instead of direct register
  const handleRegister = () => {
    // Store course_id temporarily to use in registration form
    localStorage.setItem("course_id", course_id);
   navigate(`/registertocourse/${course.course_id}`); // navigate to the registration form page
  };

  if (!course) {
    return (
      <div className="container mt-5 text-center">
        <h5>Loading course details...</h5>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
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
            <h3>{course.course_name}</h3>
            <p><b>Description:</b> {course.description}</p>
            <p><b>Start Date:</b> {new Date(course.start_date).toLocaleDateString()}</p>
            <p><b>End Date:</b> {new Date(course.end_date).toLocaleDateString()}</p>
            <p><b>Fees:</b> ₹{course.fees}</p>

            <button className="btn btn-success mt-3" onClick={handleRegister}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
