import React, { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { getAllCourses, addCourse, getActiveCourses, deleteCourse } from "../services/courseService";
import {getAllVideos,addVideo,deleteVideo,updateVideo} from "../services/videoService";
import { getAllstudents, getStudentsByCourse } from "../services/studentService";
import Home from './Home'


function Admin() {

  const [view, setView] = useState("dashboard"); 
  const [courses, setCourses] = useState([]);
  const [students,setStudents]=useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [fees, setFees] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [videoExpireDays, setVideoExpireDays] = useState("");
  const [editCourseId, setEditCourseId] = useState(null);


  const [videos, setVideos] = useState([]);
  const [videoCourse, setVideoCourse] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoDesc, setVideoDesc] = useState("");
  const [videodate,setVideodate] =useState("")
  const [editVideoId, setEditVideoId] = useState(null);


        // ---------------- COURSES ----------------------
        const fetchCourses = async () => {
           const result = await getActiveCourses();
          if (result.status === "success") {
            setCourses(result.data);
            console.log(result.data)
          }
          setView("courses");
        };
        
        const submitCourse = async (e) => {
          e.preventDefault();

          const token=localStorage.getItem('token')
          if (!courseName ||!description ||!fees ||!startDate ||!endDate ||!videoExpireDays) {
            alert("All fields are required");
            return;
          }

          const result = await addCourse(courseName,description,fees, startDate,endDate,videoExpireDays,token);

          if (result.status === "success") {
            alert("Course added successfully");

          
            setCourseName("");
            setDescription("");
            setFees("");
            setStartDate("");
            setEndDate("");
            setVideoExpireDays("");

            fetchCourses(); 
          }
        };


        // ---------------- STUDENTS ----------------
        const fetchstudents = async () => {
              const token=localStorage.getItem('token')
          if (courses.length === 0) {
            const courseResult = await getAllCourses(token);
            if (courseResult.status === "success") {
              setCourses(courseResult.data);
            }
          }

          const result = await getAllstudents(token);
          if (result.status === "success") {
            setStudents(result.data);
          }
          setSelectedCourse("");
          setView("students");
        };

        // filter wise courses
        const handleCourseFilter = async (courseId) => {
          const token=localStorage.getItem('token')
          setSelectedCourse(courseId);

          if (courseId === "") {
            fetchstudents();
          } else {
            const result = await getStudentsByCourse(courseId,token);
            if (result.status === "success") {
              setStudents(result.data);
            }
          }
        };

        const handleEditCourse = (course) => {
  setEditCourseId(course.course_id);
  setCourseName(course.course_name);
  setDescription(course.description);
  setFees(course.fees);
  setStartDate(course.start_date?.slice(0, 10));
  setEndDate(course.end_date?.slice(0, 10));
  setVideoExpireDays(course.video_expire_days);
  setView("editCourse");
        };


        const submitUpdateCourse = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  const result = await updateCourse(
    editCourseId,
    courseName,
    description,
    fees,
    startDate,
    endDate,
    videoExpireDays,
    token
  );

  if (result.status === "success") {
    alert("Course updated successfully");
    setEditCourseId(null);
    fetchCourses();
  }
};

        const handleDeleteCourse = async (course_id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this course?"
  );

  if (!confirmDelete) return;

  const token = localStorage.getItem("token");

  const result = await deleteCourse(course_id, token);

  if (result.status === "success") {
    alert("Course deleted successfully");

    // remove from UI instantly
    setCourses((prevCourses) =>
      prevCourses.filter((c) => c.course_id !== course_id)
    );
  } else {
    alert("Failed to delete course");
  }
};


        // -------------- VIDEOS --------------------
        

        const fetchVideos = async () => {
          fetchCourses();
          const token=localStorage.getItem('token')
        const result = await getAllVideos(token);
        if (result.status === "success") {
          setVideos(result.data);
        }
        
        setView("videos");
        };

        const submitVideo = async (e) => {
          const token=localStorage.getItem('token')
    e.preventDefault();

    const result = await addVideo(videoCourse,videoTitle, youtubeUrl, videoDesc,videodate,token);

    if (result.status === "success") {
      alert("Video added successfully");
      setVideoCourse("");
      setVideoTitle("");
      setYoutubeUrl("");
      setVideoDesc("");
      setVideodate("")
      fetchVideos();
    }
  };
        const handleEditVideo = (video) => {
        setEditVideoId(video.video_id);
        setVideoCourse(video.course_id);
        setVideoTitle(video.title);
        setYoutubeUrl(video.youtube_url);
        setVideoDesc(video.description);
        
        setView("editVideo");
      };

      const submitUpdateVideo = async (e) => {
        const token=localStorage.getItem('token')
        e.preventDefault();

        const result = await updateVideo(editVideoId,videoCourse,videoTitle,youtubeUrl,videoDesc,token);

        if (result.status === "success") {
          alert("Video updated successfully");
          setEditVideoId(null);
          fetchVideos();
        }
      };

      const handleDeleteVideo = async (video_id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this video?");
        if (!confirmDelete) return;

        const token = localStorage.getItem("token");

        const result = await deleteVideo(video_id, token);

        if (result.status === "success") {
          alert("Video deleted successfully");

          
          setVideos((prevVideos) =>
            prevVideos.filter((v) => v.video_id !== video_id)
          );
        } else {
          alert("Failed to delete video");
        }
      };



  return (
    <>
      <AdminNavbar
        onDashboard={() => setView("dashboard")}
        onViewCourses={fetchCourses}
        onAddCourse={() => setView("add")}
        onAddVideo={()=>setView('addVideo')}
        onViewVideos={fetchVideos}
        onViewStudents={fetchstudents}
      />

      <div className="container mt-4">

        {/* Dashboard  */}
        {view === "dashboard" && (
          <>
            <Home/>
          </>
        )}

        {/* Add course  */}
        {view === "add" && (
          <div className="card shadow p-4 mx-auto" style={{ maxWidth: "600px" }}>
            <h3 className="text-center mb-4">Add New Course</h3>

            <form onSubmit={submitCourse}>
              <div className="mb-3">
                <label className="form-label">Course Name</label>
                <input
                  className="form-control"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Fees</label>
                <input
                  type="number"
                  className="form-control"
                  value={fees}
                  onChange={(e) => setFees(e.target.value)}
                />
              </div>

              <div className="mb-3">
                  <label className="form-label">Start Date</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="yyyy-mm-dd"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
              </div>

              <div className="mb-3">
                  <label className="form-label">End Date</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="yyyy-mm-dd"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
              </div>


              <div className="mb-3">
                <label className="form-label">Video Expire Days</label>
                <input
                  type="number"
                  className="form-control"
                  value={videoExpireDays}
                  onChange={(e) => setVideoExpireDays(e.target.value)}
                />
              </div>

              <button className="btn btn-info w-100 text-white">
                Add Course
              </button>
            </form>
          </div>
        )}

        {/* View course  */}
        {view === "courses" && (
          <>
            <h3 className="text-center mb-3">All Courses</h3>

            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Course Name</th>
                  <th>Description</th>
                  <th>Fees</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {courses.map((c) => (
                  <tr key={c.course_id}>
                    <td>{c.course_id}</td>
                    <td>{c.course_name}</td>
                    <td>{c.description}</td>
                    <td>₹{c.fees}</td>
                    <td>{c.start_date?.slice(0, 10)}</td>
                    <td>{c.end_date?.slice(0, 10)}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm me-2"
                         onClick={() => handleEditCourse(c)}
                      >
                        Edit
                      </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteCourse(c.course_id)}
                  >
                      Delete
                </button>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

         {view === "editCourse" && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "80vh" }}
          >
            <div
              className="card shadow-lg p-4"
              style={{ width: "450px", borderRadius: "10px" }}
            >
              <h4 className="text-center mb-4">Edit Course</h4>

              <form onSubmit={submitUpdateCourse}>
                <div className="mb-3">
                  <label className="form-label">Course Name</label>
                  <input
                    className="form-control"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Fees</label>
                  <input
                    type="number"
                    className="form-control"
                    value={fees}
                    onChange={(e) => setFees(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Video Expire Days</label>
                  <input
                    type="number"
                    className="form-control"
                    value={videoExpireDays}
                    onChange={(e) => setVideoExpireDays(e.target.value)}
                  />
                </div>

                <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleEditCourse(c)}
                  >
                    Edit
            </button>

              </form>
            </div>
          </div>
        )}

        {/* Add video  */}
        {view === "addVideo" && (
          <div className="card shadow p-4 mx-auto" style={{ maxWidth: 500 }}>
            <h4 className="text-center mb-4">Add New Video</h4>

            <form onSubmit={submitVideo}>
              <select
                className="form-control mb-3"
                value={videoCourse}
                onChange={(e) => setVideoCourse(e.target.value)}
              >
                <option value="">Select Course</option>
                {courses.map((c) => (
                  <option key={c.course_id} value={c.course_id}>
                    {c.course_name}
                  </option>
                ))}
              </select>

              <input
                className="form-control mb-3"
                placeholder="Video Title"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
              />

              <input
                className="form-control mb-3"
                placeholder="YouTube URL"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
              />

              <textarea
                className="form-control mb-3"
                placeholder="Description"
                value={videoDesc}
                onChange={(e) => setVideoDesc(e.target.value)}
              />
              <input
                className="form-control mb-3"
                placeholder="Video Added Date "
                value={videodate}
                onChange={(e) => setVideodate(e.target.value)}
              />

              <button className="btn btn-primary w-100">Add Video</button>
            </form>
          </div>
        )}

          {/* View Videos  */}
          {view === "videos" && (       <>
            <h3 className="text-center mb-3">All Videos</h3>

            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Course</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>YouTube</th>
                  <th>Added At</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {videos.map((v) => (
                  <tr key={v.video_id}>
                    <td>{v.video_id}</td>
                    <td>{v.course_name}</td>
                    <td>{v.title}</td>
                    <td>{v.description}</td>
                    <td>
                      <a href={v.youtube_url} target="_blank" rel="noreferrer">
                        Open
                      </a>
                    </td>
                    <td>{v.added_at?.slice(0, 10)}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleEditVideo(v)}
                      >
                        Edit
                      </button>

                  <button 
                     className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteVideo(v.video_id)}
                  >
                     Delete
                </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

          {/* Edit Video  */}

          {view === "editVideo" && (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "80vh" }}
            >
              <div
                className="card shadow-lg p-4"
                style={{ width: "420px", borderRadius: "10px" }}
              >
                <h4 className="text-center mb-4">Edit Video</h4>

                <form onSubmit={submitUpdateVideo}>
                  <div className="mb-3">
                    <label className="form-label">Course</label>
                    <select
                      className="form-control"
                      value={videoCourse}
                      onChange={(e) => setVideoCourse(e.target.value)}
                    >
                      {courses.map((c) => (
                        <option key={c.course_id} value={c.course_id}>
                          {c.course_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Video Title</label>
                    <input
                      className="form-control"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">YouTube URL</label>
                    <input
                      className="form-control"
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={videoDesc}
                      onChange={(e) => setVideoDesc(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                          Update Video
                    </button>

                  
                </form>
              </div>
            </div>
          )}

            {/* View Students  */}
        {view === "students" && (
          <>
            <h3 className="text-center mb-3">All Students</h3>

            <div className="mb-3" style={{ maxWidth: "300px" }}>
              <label className="form-label">Filter by Course</label>
              <select
                className="form-control"
                value={selectedCourse}
                onChange={(e) => handleCourseFilter(e.target.value)}
              >
                <option value="">All Courses</option>
                {courses.map((c) => (
                  <option key={c.course_id} value={c.course_id}>
                    {c.course_name}
                  </option>
                ))}
              </select>
            </div>

            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Reg No</th>
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Mobile No</th>
                </tr>
              </thead>

              <tbody>
                {students.length > 0 ? (
                  students.map((s) => (
                    <tr key={s.reg_no}>
                      <td>{s.reg_no}</td>
                      <td>{s.name}</td>
                      <td>{s.email}</td>
                      <td>{s.course_name}</td>
                      <td>{s.mobile_no}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
}

export default Admin;
