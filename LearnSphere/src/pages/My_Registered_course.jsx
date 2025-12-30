import { useEffect, useState } from "react";
import { getAllvideo, getStudentCourses } from "../srevices/CourseService"; 
import Navbar from "../Component/Navbar";


export default function My_Registered_course() {
  const [courses, setCourses] = useState([]);
  const [video, setvideo] = useState([]);
  const [openId, setOpenId] = useState(null); 

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await getStudentCourses();
      if (result.status === "success") {
        setCourses(result.data);
      } else {
        setCourses([]); 
      }
    };
    fetchCourses();
  }, []);

      

  //use Effect for video   

  useEffect(() => {
    const fetchvideo = async () => {
      const result = await getAllvideo(); 
      if (result.status === "success") {
        setvideo(result.data);
      } else {
        setvideo([]); 
      }
    };
    fetchvideo();
  }, []);

  

    //only for date formating 

 const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";

 
  const parts = dateStr.split("-");
  
  if (parts.length === 3) {
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const day = parseInt(parts[2]);
    
    const date = new Date(year, month, day);

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

    



};

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2 className="text-center mb-4">My Registered Courses</h2>

        {courses.length === 0 ? (
          <p className="text-center">No courses found.</p>
        ) : (
          courses.map((course) => (
            <div key={course.course_id} className="card mb-3 shadow-sm border-1">
             

              <div
                className="p-3 d-flex justify-content-between align-items-center"
                style={{ backgroundColor: "#e7f1ff", cursor: "pointer" }}
                onClick={() => setOpenId(openId === course.course_id ? null : course.course_id)}
              >
                <span>
                  <strong>{course.course_id}</strong> — {course.course_name}
                </span>
                <span style={{ fontWeight: "bold" }}>{openId === course.course_id ? "∧" : "∨"}</span>
              </div>

             

              {openId === course.course_id && (
                <div className="p-3 border-top">
                  <p className="small mb-2">
                    <strong>Start:</strong> {formatDate(course.start_date)} <br />
                    <strong>End:</strong> {formatDate(course.end_date)}
                  </p>
                  <hr />

                  <h6>Videos</h6>

                  

                {video.filter(v => v.course_id === course.course_id).length === 0 ? (
                    <p className="text-muted">No videos available</p>
                   ) : (video.filter(v => v.course_id === course.course_id)
                     .map(v => (<div key={v.video_id} className="border p-2 rounded bg-light mb-2">
                   <div className="fw-bold">{v.title}</div>
                   <div className="small text-muted">{v.description}</div>

                    <a  href={v.youtube_url} target="_blank"rel="noreferrer"className="text-primary small" >
                      ▶ Lesson 1: Introduction to {course.course_name}
                    </a>
                      <div className="small text-muted">
                       Added on: {formatDate(v.added_at?.split("T")[0])}
                    </div>
                  </div>
                 ))
               )}
                
            </div>
             )}
        </div>
       ))
      )}
   </div>
 </>
);
}



