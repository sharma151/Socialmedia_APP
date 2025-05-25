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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Sign In
        </h2>
        <form onSubmit={Loginhandlesubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1 text-gray-600">Username</label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-600">Password</label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full outline-none bg-transparent"
              />
              <span
                onClick={togglePasswordVisibility}
                className="cursor-pointer ml-2"
              >
                {showPassword ? <FaRegEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-300"
          >
            Login
          </button>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span>or</span>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
            onClick={() => toast.info("Google login not implemented.")}
          >
            <FcGoogle size={20} />
            <span>Continue with Google</span>
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?
            <Link to="/Register" className="text-blue-600 hover:underline ml-1">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
