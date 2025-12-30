import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAllCourses } from "../services/courseService";
import { Link } from "react-router"

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

  const [course, setCourse] = useState([]);


  useEffect(() => {
    getCourse()
  }, []);

   const getCourse = async () => {
        const result = await getAllCourses()
        if(result.status == "success"){
            // localStorage.setItem('course_id',result.data.course_id)
            setCourse(result.data)
        }
    }

    const handleViewMore = (course_id) => {
    localStorage.setItem("course_id", course_id);
  };

    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-IN", {
             day: "2-digit",
            month: "short",
            year: "numeric",
         });
    };


  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          {course.map((course) => (
              <div
                key={course.course_id}
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

     <h6 className="card-subtitle mb-2 text-body-secondary"> Start: {formatDate(course.start_date)}</h6>

                  <Link className="btn btn-primary" to="/courseInfo" onClick={() => handleViewMore(course.course_id)}> View More </Link>
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