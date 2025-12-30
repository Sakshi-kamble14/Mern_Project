import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import courseImage from "../image/images.jpg";
import { useNavigate } from "react-router-dom";
import { getCourseById } from "../services/courseServices";
import Registertocourse from "./Registertocourse"

export default function CourseInfo() { 
    const navigate = useNavigate();

  const [course, setCourse] = useState([]);


   useEffect(() => {

  const storedCourseId = localStorage.getItem("course_id");
  if (!storedCourseId) {
      navigate("/"); // safety redirect
    } else {
      fetchCourse(storedCourseId);
    }
  }, []);


  const fetchCourse = async (course_id) => {
    const result = await getCourseById(course_id);
    if (result.status === "success") {
      setCourse(result.data); 
    }
  };

  const goToRegister = () => {
    const course_id =localStorage.getItem('course_id')
    navigate(`/user/registertocourse/${course_id}`);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="card p-3">
          <div className="row">
            <div className="col-4 text-center">
              <img src={courseImage} height="150" alt="course" />
            </div>

            {course.length === 0 ? (
              <div className="col-8">
                <p>No course found</p>
              </div>
            ) : (
              course.map(c => (
                <div key={c.course_id} className="col-8">
                  <h4>{c.course_name}</h4>
                  <p><b>Description:</b> {c.description}</p>
                  <p><b>Start Date:</b> {new Date(c.start_date).toLocaleDateString()}</p>
                  <p><b>End Date:</b> {new Date(c.end_date).toLocaleDateString()}</p>
                  <p><b>Fees:</b> ₹{c.fees}</p>
                  <button className="btn btn-success mt-3" onClick={goToRegister}>  Register  </button>                
                   </div>
              ))
            )}

          </div>
        </div>
      </div>
    </>
  );
}
