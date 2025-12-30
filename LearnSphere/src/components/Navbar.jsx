import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { LoginContext } from "../App";

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
    // <nav className="navbar navbar-expand-lg bg-info">
    //   <div className="container-fluid">
    //     <Link className="navbar-brand text-white fw-bold" to="/">
    //       Student Portal
    //     </Link>
     <div>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark" >
  <Link className="navbar-brand" to="/home">Student Portal</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <Link className="nav-link" to="/home" > Home </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/profile" >  about </Link>
      </li>
     
        <li className="nav-item">
        <Link className="nav-link" >  My Courses </Link>
      </li>

    
    </ul>

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
    </nav>
    </div>
  );
}

export default Navbar;
