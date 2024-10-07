// src/components/Register.js
import { useState } from "react";
import axios from "axios";
import "../Components/Registration.scss";

const Register = () => {
  // Updated form data to include 'role'
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/users/register",
        formData
      );
      console.log("Registration Successful", response.data);
    } catch (error) {
      console.error("Error during registration", error);
    }
  };

  return (
    <div className="Registerform">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="Username">
          <label>Username :</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className="Email">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className="Role">
          <label>Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className="Password">
          <label>Password </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
