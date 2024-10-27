import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaLock, FaUser, FaEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../Styles/Registration.scss";
import { AuthContext } from "../Context/Authcontext";
import Navbar from "./navbar";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  const [errors, setErrors] = useState({});

  const usernameRegex = /^[a-zA-Z0-9]{4,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  const validateForm = () => {
    let validationErrors = {};

    // Username validation
    if (!formData.username) {
      validationErrors.username = "Username is required";
    } else if (!usernameRegex.test(formData.username)) {
      validationErrors.username =
        "Username must be at least 4 characters long and contain only letters and numbers";
    }

    // Password validation
    if (!formData.password) {
      validationErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      validationErrors.password =
        "Password must be at least 8 characters, contain an uppercase letter, a lowercase letter, a number, and a special character";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/users/login",
          formData
        );
        console.log("Login Successful", response.data);
        toast.success("Login Successful", response.data);
        localStorage.setItem("AccessToken", response?.data?.data?.accessToken);
        setIsAuthenticated(true);
        navigate("/home");
      } catch (error) {
        if (error.response) {
          const errorMessage =
            error.response?.data?.message || "Error during registration";
          console.error("Error during registration:", errorMessage);
          toast.error(errorMessage);
          isLoggedIn(false);
        } else {
          console.error("Network error or no response from the server");
          toast.error("Network error or server is down");
        }
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="loginform">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="Username">
            <label>Username:</label>
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
                <span style={{ color: "red" }}>{errors.username}</span>
              )}
            </div>
          </div>
          <div className="Password">
            <label>Password:</label>
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
                {showPassword ? <FaRegEyeSlash /> : <FaEye />}
              </span>
              {errors.password && (
                <span style={{ color: "white" }}>{errors.password}</span>
              )}
            </div>
          </div>

          <button type="submit">Login</button>
          <p>
            Don`t have an account?
            <Link to="/Register">
              <span>Register</span>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
