// src/components/Register.js
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
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
  const [errors, setErrors] = useState({});

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  const validateForm = () => {
    let validationErrors = {};

    if (!formData.username.trim()) {
      validationErrors.username = "Username is required";
    }

    if (!formData.email) {
      validationErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      validationErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      validationErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      validationErrors.password =
        "Password must be at least 8 characters long, contain an uppercase letter, and a number";
    }

    if (!formData.role) {
      validationErrors.role = "Role is required";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/users/register",
          formData
        );
        console.log("Registration Successful", response?.data);
        toast("Registration Successful", response?.data);
      } catch (error) {
        if (error.response) {
          const errorMessage =
            error.response?.data?.message || "Error during registration";
          console.error("Error during registration:", errorMessage);
          toast.error(errorMessage);
        } else {
          console.error("Network error or no response from the server");
          toast.error("Network error or server is down");
        }
      }
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
            {errors.username && (
              <span style={{ color: "white" }}>{errors.username}</span>
            )}
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
            {errors.email && (
              <span style={{ color: "white" }}>{errors.email}</span>
            )}
          </div>
        </div>
        <div className="Role">
          <label>Role</label>
          <div className="role-input-container">
            <span className="RoleIcon">
              <GrUserWorker />
            </span>
            <select
              name="role"
              className="Role"
              value={formData.role}
              onChange={handleChange}
              autoComplete="off"
              required
            >
              <option className=" value" value="">
                Select a role
              </option>
              <option value="ADMIN">ADMIN</option>
              <option value="USER">USER</option>
            </select>
            {errors.role && (
              <span style={{ color: "white" }}>{errors.role}</span>
            )}
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
            {errors.password && (
              <span style={{ color: "white" }}>{errors.password}</span>
            )}
          </div>
        </div>

        <button type="submit">Register</button>
        <p>
          Already have an account?
          <Link to="/">
            <span>LogIn</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
