import { useState } from "react";
import axios from "axios";
import { FaLock, FaUser, FaEye, FaRegEyeSlash } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import "../Pages/Registration.scss";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
        "http://localhost:8080/api/v1/users/login",
        formData
      );
      console.log("Login Successful", response.data);

      
      localStorage.setItem("AccessToken", response?.data?.data?.accessToken);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error during login", error);
      setErrorMessage("Login failed, please try again.");
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
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
          </div>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
