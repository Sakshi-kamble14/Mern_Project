import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router'
import { LoginContext } from '../App'

function Navbar() {
  const navigate = useNavigate()
  const { loginStatus, setLoginStatus } = useContext(LoginContext)

  const logout = () => {
    setLoginStatus(false)
    navigate("/")
  }

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Student Portal</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
          </ul>

          {/* RIGHT SIDE */}
          {!loginStatus ? (
            <button className="btn btn-outline-light" onClick={() => navigate("/login")}>
              Login
            </button>
          ) : (
            <div className="dropdown">
              <button className="btn btn-outline-light dropdown-toggle" data-bs-toggle="dropdown">
                Admin
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button className="dropdown-item" onClick={() => navigate("/dashboard")}>
                    Dashboard
                  </button>
                </li>
                <li>
                  <button className="dropdown-item text-danger" onClick={logout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
