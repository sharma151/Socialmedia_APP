// src/components/Login.js
import { useState } from "react";
import axios from "axios";
import "../Pages/Registration.scss";

const Login = () => {
 
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
        "http://localhost:8080/api/v1/users/login",
        formData
      );
      console.log("Login Successful", response.data);
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  return (
    <div className="loginform">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="Username">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className="Password">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
