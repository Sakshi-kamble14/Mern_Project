import React, { createContext, useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import CourseInfo from "./pages/courseInfo";
import My_Registered_course from "./pages/My_Registered_course";
import { Navigate, Route, Routes } from "react-router";
import Registertocourse from './pages/RegisterCourse';


export const LoginContext = createContext();

function App() {
  const [loginStatus, setLoginStatus] = useState(
    !!localStorage.getItem("token")
  );

  const [role, setRole] = useState(localStorage.getItem("role"));
  const [email,setEmail]=useState(localStorage.getItem('email'))

  return (
    <>
      <LoginContext.Provider
        value={{ loginStatus, setLoginStatus, role, setRole }}
      >
        <Navbar />

        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* USER ROUTES */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/courseInfo/:course_id" element={<CourseInfo />} />

          <Route
              path="/registertocourse/:course_id"
              element={loginStatus ? <Registertocourse /> : <Navigate to="/login" />}
            />


          <Route
            path="/My_Registered_course"
            element={
              loginStatus ? <My_Registered_course /> : <Navigate to="/login" />
            }
          />
       


          {/* ADMIN PROTECTED ROUTE */}
          <Route
            path="/admin"
            element={
              loginStatus && role === "admin" ? (
                <Admin />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </LoginContext.Provider>

      <ToastContainer />
    </>
  );
}

export default App;
