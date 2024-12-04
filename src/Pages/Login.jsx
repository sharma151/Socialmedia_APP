import { FaLock, FaUser, FaEye, FaRegEyeSlash } from "react-icons/fa";
import { useState, useContext } from "react";
import { Handlelogin } from "../services/AuthService";
import { AuthContext } from "../Context/Authcontext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../Styles/Login.scss";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { setIsAuthenticated } = useContext(AuthContext);
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

  const usernameRegex = /^[a-zA-Z0-9]{4,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  const validateForm = () => {
    let isValid = true;

    // Username validation
    if (!formData.username) {
      toast.error("Username is required");
      isValid = false;
    } else if (!usernameRegex.test(formData.username)) {
      toast.error(
        "Username must be at least 4 characters long and contain only letters and numbers"
      );
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      toast.error("Password is required");
      isValid = false;
    } else if (!passwordRegex.test(formData.password)) {
      toast.error(
        "Password must be at least 8 characters, contain an uppercase letter, a lowercase letter, a number, and a special character"
      );
      isValid = false;
    }

    return isValid;
  };

  const Loginhandlesubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await Handlelogin(formData);
        const accessToken = response;
        if (accessToken) {
          localStorage.setItem("AccessToken", accessToken);
          setIsAuthenticated(true);
          toast.success("Logged in successfully!");
          navigate("/");
        } else {
          toast.error("Login failed. Please check your credentials.");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="loginform">
        <h2>Login</h2>
        <form onSubmit={(e) => Loginhandlesubmit(e)}>
          <div className="Username">
            <label>Username : *</label>
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
            <label>Password : *</label>
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
