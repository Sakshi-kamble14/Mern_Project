import React, { useEffect, useState } from "react";
import { getUserProfile, updateProfile } from "../services/userService";
import { toast } from "react-toastify";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const role = localStorage.getItem("role"); // admin | student

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const token = localStorage.getItem("token");
    const result = await getUserProfile(token);

    if (result.status === "success") {
      const user = result.data[0];
      setName(user.name);
      setEmail(user.email);
      setMobile(user.mobile);
    }
  };

  const update = async () => {
    const token = localStorage.getItem("token");
    const result = await updateProfile(token, mobile);

    if (result.status === "success") {
      toast.success("Profile Updated");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">
        {role === "admin" ? "Admin Profile" : "Student Profile"}
      </h3>

      <div className="mb-3">
        <label>Email</label>
        <input className="form-control" value={email} disabled />
      </div>

      <div className="mb-3">
        <label>Name</label>
        <input className="form-control" value={name} disabled />
      </div>

      <div className="mb-3">
        <label>Mobile</label>
        <input
          className="form-control"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
      </div>

      <button className="btn btn-success" onClick={update}>
        Update
      </button>
    </div>
  );
}

export default Profile;
