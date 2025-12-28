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
    <nav className="navbar navbar-expand-lg bg-info">
      <div className="container-fluid">
        <Link className="navbar-brand text-white fw-bold" to="/">
          Student Portal
        </Link>

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
  );
}

export default Navbar;
