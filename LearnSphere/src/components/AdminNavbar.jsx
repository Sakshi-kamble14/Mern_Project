import React from "react";
import { Link } from "react-router";

function AdminNavbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link className="nav-link text-white fw-semibold" to="/admin">
              Dashboard
            </Link>
          </li>

          <li className="nav-item dropdown">
            <span
              className="nav-link dropdown-toggle text-white fw-semibold"
              data-bs-toggle="dropdown"
            >
              Courses
            </span>
            <ul className="dropdown-menu">
              <li><span className="dropdown-item">Add Course</span></li>
              <li><span className="dropdown-item">View Courses</span></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <span
              className="nav-link dropdown-toggle text-white fw-semibold"
              data-bs-toggle="dropdown"
            >
              Videos
            </span>
            <ul className="dropdown-menu">
              <li><span className="dropdown-item">Upload Video</span></li>
              <li><span className="dropdown-item">View Videos</span></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <span
              className="nav-link dropdown-toggle text-white fw-semibold"
              data-bs-toggle="dropdown"
            >
              Students
            </span>
            <ul className="dropdown-menu">
              <li><span className="dropdown-item">View Students</span></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default AdminNavbar;
