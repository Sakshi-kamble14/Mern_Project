import React, { createContext, useState } from "react";
import { Route, Routes, Navigate } from "react-router";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import CourseInfo from "./pages/courseInfo"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Registertocourse from "./pages/Registertocourse"

export const LoginContext = createContext();

function App() {
  // const [loginStatus , setLoginStatus] = useState(false)
  // const [role , setRole] = useState(false)
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
        <Routes>
          <Route path="/*" element={<Login />} />
           <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
          {/* protecting the routes */}
         <Route path="/Home" element={loginStatus ? <Home /> : <Navigate to = '/' />} />
          <Route path="/courseInfo" element={loginStatus ? <CourseInfo /> : <Navigate to="/" />} />
          <Route path="/user/registertocourse/:course_id" element={loginStatus ? <Registertocourse /> : <Navigate to="/" />}/>
          {/* <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/register" element={<Register />} /> */}

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
