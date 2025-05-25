import { FaLock, FaUser, FaEye, FaRegEyeSlash } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import { IoIosMail } from "react-icons/io";
import { Handleregister } from "@/services/AuthService";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  const validateForm = () => {
    let isValid = true;
    if (!formData.username.trim()) {
      toast.error("Username is required");
      isValid = false;
    }
    if (!formData.email) {
      toast.error("Email is required");
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format");
      isValid = false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      isValid = false;
    } else if (!passwordRegex.test(formData.password)) {
      toast.error(
        "Password must be at least 8 characters long, contain an uppercase letter, and a number"
      );
      isValid = false;
    }
    if (!formData.role) {
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-lg w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Register
        </h2>
        <form onSubmit={Registerhandlesubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200">
              Username *
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                <FaUser />
              </span>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200">
              Email *
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                <IoIosMail />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200">
              Role *
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                <GrUserWorker />
              </span>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full appearance-none pl-10 pr-8 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="" disabled hidden>
                  Select a role
                </option>
                <option
                  className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white"
                  value="ADMIN"
                >
                  ADMIN
                </option>
                <option
                  className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white"
                  value="USER"
                >
                  USER
                </option>
              </select>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200">
              Password *
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                <FaLock />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-10 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition duration-200"
          >
            Register
          </button>

          <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
            Already have an account?
            <Link to="/" className="text-blue-600 hover:underline ml-1">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
