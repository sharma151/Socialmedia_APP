import { Link } from "react-router-dom";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import "../Styles/Navbar.scss";

const Navbar = () => {
  const [username, setUsername] = useState("");

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/social-media/profile/u/${username}`
      );
      console.log("User Profile Data:", response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
    <nav>
      <ul>
        <input
          type="text"
          value={username}
          onChange={handleInputChange}
          placeholder="Enter username"
        />
        <button onClick={fetchUserProfile}>
          <IoSearch size={18} />
        </button>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
