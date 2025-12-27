import React, { createContext, useState } from 'react'
import { Route, Routes } from 'react-router'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Register from './pages/Register'

export const LoginContext = createContext()

function App() {
  const [loginStatus, setLoginStatus] = useState(false)

  return (
    <>
      <LoginContext.Provider value={{ loginStatus, setLoginStatus }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register/>}/>

          <Route
            path='/dashboard'
            element={
              
                <Dashboard />
              
            }
          />
        </Routes>
      </LoginContext.Provider>

      <ToastContainer />
    </>
  )
}

export default App
