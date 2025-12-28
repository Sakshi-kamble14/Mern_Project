import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAllCourses } from "../services/courseService";

import mernImg from "../images/mern.png";
import aiImg from "../images/ai.png";
import androidImg from "../images/android.png";
import pythonImg from "../images/python.png";
import javaImg from "../images/java.png";

import "../styles/home.css"; 


function Home() {
  const courseImages = {
    "IIT-MERN-2025": mernImg,
    "AI": aiImg,
    "Android": androidImg,
    "Python": pythonImg,
    "Java": javaImg
  };

  const [courses, setCourses] = useState([]);


  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const result = await getAllCourses();
    if (result.status === "success") {
      setCourses(result.data);
    }
   
  };

  return (
    <>
      

      <div className="container mt-4">
        <div className="row">
          {courses.map((course) => (
              <div
                key={course.id}
                className="col-lg-4 col-md-6 col-sm-12 mt-3 fade-in"
              >
                <div className="card h-100 course-card">
                  <img
                    src={courseImages[course.course_name]}
                    alt={course.course_name}
                    className="card-img-top mx-auto course-img"
                    style={{ height: "180px", padding: "5px" }}
                  />

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-center">
                      {course.course_name}
                    </h5>

                    <p className="card-text flex-grow-1 text-muted">
                      {course.description}
                    </p>

                    <button className="btn btn-primary mt-auto">
                      View More
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Home