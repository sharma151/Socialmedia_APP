// src/components/Register.js
import { useState } from "react";
import axios from "axios";
import { FaLock, FaUser, FaEye, FaRegEyeSlash } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { GrUserWorker } from "react-icons/gr";
import "../Styles/Registration.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
          <div className="username-input-container">
            <span className="UserIcon">
              <FaUser />
            </span>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
        </div>
        <div className="Email">
          <label>Email:</label>
          <div className="Email-input-container">
            <span className="Mailicon">
              <IoIosMail />
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
        </div>
        <div className="Role">
          <label>Role</label>
          <div className="role-input-container">
            <span className="RoleIcon">
              <GrUserWorker />
            </span>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
        </div>
        <div className="Password">
          <label>Password </label>
          <div className="password-input-container">
            <span className="lock">
              <FaLock />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              autoComplete="off"
              onChange={handleChange}
              required
            />
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaRegEyeSlash /> : <FaEye />}{" "}
              {/* Use any icon library or emoji */}
            </span>
          </div>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
