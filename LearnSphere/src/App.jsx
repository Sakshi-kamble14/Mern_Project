import React, { createContext, useState } from "react";
import { Route, Routes, Navigate } from "react-router";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

export const LoginContext = createContext();

function App() {
  const [loginStatus, setLoginStatus] = useState(
    !!localStorage.getItem("token")
  );

  const [role, setRole] = useState(
    localStorage.getItem("role")
  );

  return (
    <>
      <LoginContext.Provider
        value={{ loginStatus, setLoginStatus, role, setRole }}
      >
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ADMIN PROTECTED ROUTE */}
          <Route
            path="/admin"
            element={
              loginStatus && role === "admin"
                ? <Admin />
                : <Navigate to="/login" />
            }
          />
        </Routes>
      </LoginContext.Provider>

      <ToastContainer />
    </>
  );
}

export default App;
