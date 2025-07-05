import { FaLock, FaUser, FaEye, FaRegEyeSlash } from "react-icons/fa";
import { useState, useContext } from "react";
import { Handlelogin } from "@/services/AuthService";
import { AuthContext } from "@/Context/Authcontext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { setIsAuthenticated } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const usernameRegex = /^[a-zA-Z0-9]{4,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  const validateForm = () => {
    let isValid = true;

    if (!formData.username) {
      toast.error("Username is required");
      isValid = false;
    } else if (!usernameRegex.test(formData.username)) {
      toast.error(
        "Username must be at least 4 characters long and contain only letters and numbers"
      );
      isValid = false;
    }

    if (!formData.password) {
      toast.error("Password is required");
      isValid = false;
    } else if (!passwordRegex.test(formData.password)) {
      toast.error(
        "Password must include upper/lowercase, number, and special character"
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
        const accessToken = response?.accessToken;
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-5xl">
        {/* Left Side Branding */}
        <div className="w-full lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left px-6">
          <h1 className="text-5xl font-bold text-blue-600 mb-4">vibeflow</h1>
          <p className="text-2xl text-gray-700 max-w-md">
            Connect with friends and the world around you on VibeFlow.
          </p>
        </div>

        {/* Right Side Login Form */}
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <form onSubmit={Loginhandlesubmit} className="space-y-5">
            <div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Email or phone number"
                className="w-full px-4 py-3 border rounded-lg outline-none text-gray-700"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-lg outline-none text-gray-700"
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 text-gray-400 cursor-pointer"
              >
                {showPassword ? <FaRegEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold text-lg"
            >
              Log In
            </button>

            <div className="text-center">
              <Link
                to="/forgot-password"
                className="text-blue-600 text-sm hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <hr className="my-4" />

            <Link
              to="/Register"
              className="w-full inline-block text-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold"
            >
              Create new account
            </Link>

            {/* <p className="text-center text-sm text-gray-600 mt-4">
              <span className="font-semibold">Create a Page</span> for a
              celebrity, brand or business.
            </p> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
