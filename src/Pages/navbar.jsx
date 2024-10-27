import { Link } from "react-router-dom";
import { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/Authcontext";
import axios from "../services/Api";
import debounce from "lodash/debounce";
import "../Styles/Navbar.scss";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [suggestions, setSuggestions] = useState();
  const [error, setError] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const debouncedFetchUsernames = useCallback(
    debounce(async (searchQuery) => {
      try {
        const response = await axios.get(
          `social-media/profile/u/${searchQuery}`
        );

        if (response.data) {
          console.log(response.data);
          // work to be continued
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
    setUsername(suggestion.account?.username);
    setSuggestions([]);
    setError("");
    navigate(`/profile/${suggestion.account?.username}`);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`/users/logout`);
      localStorage.removeItem("AccessToken");
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      console.error("Error logging out", error);
      toast.error("Failed to logout User. Please try again later.");
    }
  };

  return (
    <nav>
      <Link to="/home" className="home">
        HOME
      </Link>
      <ul>
        {isAuthenticated ? (
          <>
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                value={username}
                onChange={handleInputChange}
                placeholder="Enter username"
                autoComplete="off"
              />

              {/* {suggestions.length > 0 && (
                <ul className="dropdown">
                  {suggestions?.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion.account?.username}
                    </li>
                  ))}
                </ul>
              )} */}

              {error && <div className="error-message">{error}</div>}
            </form>

            <button onClick={handleLogout} className="logout">
              Logout
            </button>
          </>
        ) : (
          <li>
            <Link to="/Register">Register</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
