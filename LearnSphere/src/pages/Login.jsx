import { useContext, useState } from "react";
import { loginUser } from "../services/userService";
import { toast } from "react-toastify";
import { LoginContext } from "../App";
import "../styles/login.css";
import { Link, useNavigate } from "react-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setLoginStatus, setRole } = useContext(LoginContext);

  const signin = async () => {
    if (!email) {
      toast.warn("Email must be entered");
      return;
    }

    if (!password) {
      toast.warn("Password must be entered");
      return;
    }

    const result = await loginUser(email, password);

    if (result.status === "success") {
      const { token, role } = result.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      setLoginStatus(true);
      setRole(role);

      toast.success("Login successful");

      navigate(role === "admin" ? "/admin" : "/");
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card card shadow-lg p-4">
        <h2 className="text-center mb-4">Login</h2>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-success w-100 mb-3" onClick={signin}>
          Sign In
        </button>

        <div className="text-center">
          Don’t have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}
