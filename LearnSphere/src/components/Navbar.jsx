import React, { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import { Link, useNavigate } from "react-router";

function Navbar() {
  const navigate = useNavigate();
  const { loginStatus, setLoginStatus, role, setRole } =
    useContext(LoginContext);

  const logout = () => {
    localStorage.clear();
    setLoginStatus(false);
    setRole(null);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          Student Portal
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* LEFT SIDE LINKS */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            {/* STUDENT LINKS */}
            {loginStatus && role === "student" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/My_Registered_course">
                    My Courses
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
              </>
            )}

            {/* ADMIN LINKS */}
            {loginStatus && role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Admin Dashboard
                </Link>
              </li>
            )}
          </ul>

          {/* RIGHT SIDE */}
          <ul className="navbar-nav ms-auto">
            {!loginStatus ? (
              <li className="nav-item">
                <button
                  className="btn btn-outline-light"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  {role}
                </button>

                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button className="dropdown-item" onClick={logout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
