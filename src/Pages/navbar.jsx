import { useState, useCallback, useContext } from "react";
import { UpdatedataContext } from "../Context/UpdateProfileContext";
import { UsernameContext } from "../Context/Setusername";
import { Handlelogout } from "../services/AuthService";
import { AuthContext } from "../Context/Authcontext";
import { useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai"; // Import close icon
import debounce from "lodash/debounce";
import axios from "../services/Api";
import "../Styles/Navbar.scss";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { SetUserName } = useContext(UsernameContext);
  const { UserprofileData } = useContext(UpdatedataContext);
  const navigate = useNavigate();

  const debouncedFetchUsernames = useCallback(
    debounce(async (searchQuery) => {
      try {
        await axios.get(`social-media/profile/u/${searchQuery}`);
      } catch (error) {
        toast.error("Error fetching user ", error);
      }
    }, 700),
    []
  );

  const handleInputChange = (e) => {
    debouncedFetchUsernames(e.target.value);
    setUsername(e.target.value);
    SetUserName(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/profile/${username}`);
  };

  const handleClearSearch = () => {
    setUsername("");
    SetUserName("");
  };

  const handleLogoutClick = async () => {
    const success = await Handlelogout();
    if (success) {
      localStorage.removeItem("AccessToken");
      setIsAuthenticated(false);
      toast.success("Logged out successfully");
      navigate("/login");
    } else {
      toast.error("Logout failed");
    }
  };

  return (
    <nav>
      <ul>
        {isAuthenticated ? (
          <>
            <Link to="/" className="home">
              HOME
            </Link>

            <Link to="/profile-page">
              <div className="profileimg-navbar">
                {UserprofileData?.account?.avatar?.url && (
                  <img
                    src={UserprofileData?.account?.avatar?.url}
                    alt={UserprofileData?.posts?.avatar}
                  />
                )}
              </div>
            </Link>
            <form onSubmit={handleSearchSubmit} className="search-form">
              <div className="search-input-container">
                <input
                  type="text"
                  value={username}
                  onChange={handleInputChange}
                  placeholder="Enter username..."
                  autoComplete="off"
                />
                {username && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="clear-search-btn"
                    aria-label="Clear search"
                  >
                    <AiOutlineClose size={18} />
                  </button>
                )}
              </div>
            </form>
            <button onClick={handleLogoutClick} className="logout-btn">
              <TbLogout size={20} />
              <span className="logout-log">Logout </span>
            </button>
          </>
        ) : null}
      </ul>
    </nav>
  );
};

export default Navbar;
