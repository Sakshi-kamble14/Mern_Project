import React from "react";

function AdminNavbar({ onDashboard, onViewCourses, onAddCourse,onAddVideo,onViewVideos,onViewStudents }) {
  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <ul className="navbar-nav mx-auto">

      {/* Dashboard  */}
          <li className="nav-item">
            <button
              className="nav-link text-white fw-semibold btn btn-link"
              onClick={onDashboard}
            >
              Dashboard
            </button>
          </li>

      {/* Courses  */}
          <li className="nav-item dropdown">
            <span
              className="nav-link dropdown-toggle text-white fw-semibold"
              data-bs-toggle="dropdown"
            >
              Courses
            </span>

            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  onClick={onAddCourse}
                >
                  Add Course
                </button>
              </li>

              <li>
                <button
                  className="dropdown-item"
                  onClick={onViewCourses}
                >
                  View Courses
                </button>
              </li>
            </ul>
          </li>

      {/* Videos  */}
           <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle text-white fw-semibold"
                data-bs-toggle="dropdown"
              >
                Videos
              </span>

              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item" onClick={onAddVideo}>
                    Add Video
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={onViewVideos}>
                    View Videos
                  </button>
                </li>
              </ul>
            </li>   

      {/* Students  */}
            <li className="nav-item dropdown">
            <span
              className="nav-link dropdown-toggle text-white fw-semibold"
              data-bs-toggle="dropdown"
            >
              Students
            </span>

            <ul className="dropdown-menu">
              
              <li>
                <button
                  className="dropdown-item"
                  onClick={onViewStudents}
                >
                  View Students
                </button>
              </li>
            </ul>
          </li>   
        </ul>
      </div>
    </nav>
  );
}

export default AdminNavbar;
