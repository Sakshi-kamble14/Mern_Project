import { useEffect, useState } from "react"
import {registercourse} from "../services/courseServices"
import { useNavigate, useParams } from "react-router"

function Registertocourse() {
  const navigate = useNavigate();

const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [courseid,setCourseid] = useState(null)
const [mobile_no,setMobile] = useState('')
useEffect(() => {
  const token = sessionStorage.getItem("token")
  const storedCourseId = localStorage.getItem("course_id");
  if (!token) {
    alert("Please login first")
    navigate("/login")
    return
  }

  if(!storedCourseId){
    navigate("/home");
  }else{
    setCourseid(storedCourseId);
  }
},[navigate]);

const handleSubmit = async (e) => {
  e.preventDefault();

 const data = { course_id : courseid,name,email, mobile_no };
    const result = await registercourse(data);
  console.log(result);

    if (result.status === "success") {
      alert("Registration successful!");
      localStorage.removeItem("course_id");
      navigate("/home");
    } else {
      alert("Registration failed!");
    }
  };

 

  return <>
     <form onSubmit={handleSubmit} className="mt-3">
           <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="container w-50 border p-4 rounded shadow">
        <div className="mt-3 mb-3">
              <h1 style={{textAlign:"center"}}>Resister</h1>
            <label htmlFor="inputName" className="form-label">Name</label>
            <input
                type="text"
                className="form-control"
                id="inputName"
                placeholder="Full Name"
                onChange={e => setName(e.target.value)}
                required
            />
        </div>

        <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">Email</label>
            <input
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
                required
            />
        </div>

        <div className="mb-3">
            <label htmlFor="inputMobile" className="form-label">Mobile</label>
            <input
                type="tel"
                className="form-control"
                id="inputMobile"
                placeholder="Mobile number"
                onChange={e => setMobile(e.target.value)}
                required
            />

             <button type="submit">Register</button>
        </div>
           
</div>
</div>
</form>
  </>
}

export default Registertocourse
