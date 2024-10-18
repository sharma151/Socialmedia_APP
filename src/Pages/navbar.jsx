import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { IoSearch } from "react-icons/io5";
import axios from "../services/Api";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";
import "../Styles/Navbar.scss";
import { toast } from "react-toastify";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(""); // New state for error message
  const navigate = useNavigate();

  // Debounced function to fetch usernames
  const debouncedFetchUsernames = useCallback(
    debounce(async (searchQuery) => {
      try {
        const response = await axios.get(
          `social-media/profile/u/${searchQuery}`
        );

        if (response.data.length > 0) {
          setSuggestions(response.data); // Assuming response contains a list of similar usernames
          setError(""); // Clear error if users are found
        } else {
          setSuggestions([]);
          toast("User found");
        }
      } catch (error) {
        console.error("Error fetching user suggestions:", error);
        setSuggestions([]);
        if (error.response && error.response.status === 404) {
          toast.error("User not found");
        } else {
          setError("An error occurred while fetching data");
        }
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (username) {
      debouncedFetchUsernames(username);
    } else {
      setSuggestions([]);
      setError(""); // Clear error when input is empty
    }
  }, [username, debouncedFetchUsernames]);

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!error) {
      navigate(`/profile/${username}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setUsername(suggestion.username);
    setSuggestions([]);
    setError(""); // Clear error on suggestion click
    navigate(`/profile/${suggestion.username}`);
  };

  return (
    <nav>
      <ul>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={username}
            onChange={handleInputChange}
            placeholder="Enter username"
            autoComplete="off"
          />
          {/* <button type="submit" onSubmit={handleSuggestionClick}>
            <IoSearch size={18} />
          </button> */}

          {/* Show dropdown suggestions if available */}
          {suggestions.length > 0 && (
            <ul className="dropdown">
              {suggestions.map((user, index) => (
                <li key={index} onClick={() => handleSuggestionClick(user)}>
                  {user.username}
                </li>
              ))}
            </ul>
          )}

          {/* Show error message if user is not found */}
          {error && <div className="error-message">{error}</div>}
        </form>

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
