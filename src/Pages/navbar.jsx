import { Link } from "react-router-dom";
import { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/Authcontext";
import axios from "../services/Api";
import debounce from "lodash/debounce";
import "../Styles/Navbar.scss";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { UsernameContext } from "../Context/Setusername";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [suggestions, setSuggestions] = useState();
  const [error, setError] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { SetUserName } = useContext(UsernameContext);
  const navigate = useNavigate();

  const debouncedFetchUsernames = useCallback(
    debounce(async (searchQuery) => {
      try {
        const response = await axios.get(
          `social-media/profile/u/${searchQuery}`
        );

        if (response?.data?.data) {
          // console.log(response?.data?.data?.account?.username);
          // work to be continued
          setSuggestions(response?.data?.data?.account);
          setError("");
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching user suggestions:", error);
        setSuggestions([]);
      }
    }, 700),
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
    SetUserName(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!error) {
      navigate(`/profile/${username}`);
    }
  };

  // const handleSuggestionClick = (suggestion) => {
  //   setUsername(suggestion);
  //   setSuggestions([]);
  //   setError("");
  //   navigate(`/profile/${suggestion?.account?.username}`);
  // };

  window.addEventListener("beforeunload", () => {
    handleLogout();
  });
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
      <ul>
        {isAuthenticated ? (
          <>
            <Link to="/home" className="home">
              HOME
            </Link>
            <Link to="/Bookmarks" className="bookmarks">
              Bookmarks
              <PiBookmarkSimpleBold />
            </Link>
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                value={username}
                onChange={handleInputChange}
                placeholder="Enter username"
                autoComplete="off"
              />

              {/* {Array.isArray(suggestions) && suggestions.length > 0 && (
                <ul className="dropdown">
                  {suggestions?.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
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
