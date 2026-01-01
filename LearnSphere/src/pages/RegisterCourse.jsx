import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { registerToCourse, getCourseById } from "../services/courseService";

const Registertocourse = () => {
  const { course_id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [course, setCourse] = useState(null);
  const [student, setStudent] = useState({
    name: "",
    email: "",
    mobile_no: "",
    course_id: course_id
  });

  // fetch course details using service
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getCourseById(course_id, token);
        setCourse(response.data[0]);
      } catch (err) {
        alert("Invalid course");
        navigate("/");
      }
    };

    fetchCourse();
  }, [course_id, token, navigate]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerToCourse(
        course.course_id,
        student,
        token
      );

      alert(response.message || "Registered Successfully");
      navigate("/My_Registered_course");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  if (!course) return null;

  return (
    <div className="card p-4" style={{ maxWidth: "400px", margin: "auto" }}>
      <h4 className="text-center mb-3">Register to Course</h4>

      <p><b>Course Name:</b> {course.course_name}</p>
      <p><b>Fees:</b> ₹{course.fees}</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="form-control mb-2"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="form-control mb-2"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="mobile_no"
          placeholder="Mobile Number"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />

        <button className="btn btn-info w-100">
          Register
        </button>
      </form>
    </div>
  );
};

export default Registertocourse;
