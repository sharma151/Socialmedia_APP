import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { IoSearch } from "react-icons/io5";
import axios from "../services/Api";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";
import "../Styles/Navbar.scss";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [suggestions, setSuggestions] = useState();
  const [error, setError] = useState(""); // New state for error message
  const navigate = useNavigate();

  // Debounced function to fetch usernames
  const debouncedFetchUsernames = useCallback(
    debounce(async (searchQuery) => {
      try {
        const response = await axios.get(
          `social-media/profile/u/${searchQuery}`
        );

        if (response.data) {
          setSuggestions(response.data);
          setError("");
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching user suggestions:", error);
        setSuggestions([]);
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (username) {
      debouncedFetchUsernames(username);
    } else {
      setSuggestions([]);
      setError("");
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
    setError("");
    navigate(`/profile/${suggestions?.data?.account?.username}`);
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
          {/* Show dropdown suggestions if available */}
          {suggestions?.data && (
            <ul className="dropdown">
              <li onClick={() => handleSuggestionClick(suggestions?.data)}>
                {suggestions?.data?.account?.username}
              </li>
            </ul>
          )}

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
