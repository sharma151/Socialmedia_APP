// src/Pages/Register.js
import { FaLock, FaUser, FaEye, FaRegEyeSlash } from "react-icons/fa";
import { Handleregister } from "../services/AuthService";
import { GrUserWorker } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { IoIosMail } from "react-icons/io";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../Styles/Registration.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  const validateForm = () => {
    let isValid = true;

    // Username validation
    if (!formData?.username.trim()) {
      toast.error("Username is required");
      isValid = false;
    }

    // Email validation
    if (!formData?.email) {
      toast.error("Email is required");
      isValid = false;
    } else if (!emailRegex.test(formData?.email)) {
      toast.error("Invalid email format");
      isValid = false;
    }

    // Password validation
    if (!formData?.password) {
      toast.error("Password is required");
      isValid = false;
    } else if (!passwordRegex.test(formData?.password)) {
      toast.error(
        "Password must be at least 8 characters long, contain an uppercase letter, and a number"
      );
      isValid = false;
    }

    // Role validation
    if (!formData?.role) {
      toast.error("Role is required");
      isValid = false;
    }

    return isValid;
  };

  const Registerhandlesubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await Handleregister(formData);
        toast.success("User Successfully Registered", response);
        navigate("/");
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="Registerform">
      <h2>Register</h2>
      <form
        onSubmit={(e) => {
          Registerhandlesubmit(e);
        }}
      >
        <div className="Username">
          <label>Username *</label>
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
          <label>Email *</label>
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
          <label>Role *</label>
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
              <option className="value" value="" disabled hidden>
                Select a role
              </option>
              <option value="ADMIN">ADMIN</option>
              <option value="USER">USER</option>
            </select>
          </div>
        </div>
        <div className="Password">
          <label>Password * </label>
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
        <p>
          Already have an account?
          <Link to="/">
            <span style={{ textDecoration: "none" }}>LogIn</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
