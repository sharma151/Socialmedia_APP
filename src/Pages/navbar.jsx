import { useState, useCallback, useContext, useRef, useEffect } from "react";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { UpdatedataContext } from "../Context/UpdateProfileContext";
import { IoGameController } from "react-icons/io5";
import { UsernameContext } from "../Context/Setusername";
import { HiMiniUserGroup } from "react-icons/hi2";
import { AiOutlineClose } from "react-icons/ai";
import { Handlelogout } from "../services/AuthService";
import { AuthContext } from "../Context/Authcontext";
import { useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { LuMenu } from "react-icons/lu";
import { IoHome } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import debounce from "lodash/debounce";
import axios from "../services/Api";
import "../Styles/Sass/Components/Navbar.scss";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { SetUserName } = useContext(UsernameContext);
  const { UserprofileData } = useContext(UpdatedataContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const debouncedFetchUsernames = useCallback(
    debounce(async (searchQuery) => {
      try {
        if (searchQuery.trim() === "") {
          navigate("/");
          return;
        }
        await axios.get(`social-media/profile/u/${searchQuery}`);
      } catch (error) {
        navigate("/usernotfound");
      }
    }, 700),
    [navigate]
  );

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    SetUserName(value);
    debouncedFetchUsernames(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === "") {
      navigate("/");
    } else {
      navigate(`/profile/${username}`);
    }
  };

  const handleClearSearch = () => {
    setUsername("");
    SetUserName("");
    navigate("/");
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  useEffect(() => {
    closeMenu();
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav>
      {isAuthenticated ? (
        <div className="nav-content">
          <Link to="/" className="Logo" onClick={handleScrollToTop}>
            SS
          </Link>

          <div className="hamburger-icon" onClick={toggleMenu}>
            <LuMenu color="white" size={28} />
          </div>

          {/* Search Form */}
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

          {/* Regular Navigation Icons */}
          <div className="icons-div">
            <div className="icons">
              <Link to="/" onClick={handleScrollToTop}>
                <IoHome color="white" />
              </Link>
            </div>
            <div className="icons">
              <MdOutlineOndemandVideo color="white" />
            </div>
            <div className="icons">
              <HiMiniUserGroup color="white" />
            </div>
            <div className="icons">
              <IoGameController color="white" />
            </div>
          </div>

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

          <button onClick={handleLogoutClick} className="logout-btn">
            <TbLogout size={20} />
            <span className="logout-log">Logout </span>
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="dropdown-menu" ref={dropdownRef}>
             
             <Link className="dropdown-profile-name" to="/profile-page">
                <div className="dropdown-profileimg-navbar">
                  {UserprofileData?.account?.avatar?.url && (
                    <img
                      src={UserprofileData?.account?.avatar?.url}
                      alt={UserprofileData?.posts?.avatar}
                    />
                  )}
                </div>
                <span className="dropdown-username">
                  {UserprofileData?.account?.username}
                </span>
              </Link>
             
              <form
                onSubmit={handleSearchSubmit}
                className="dropdown-search-form"
              >
                <div className="dropdown-search-input-container">
                  <input
                    type="text"
                    value={username}
                    onChange={handleInputChange}
                    placeholder="Search user..."
                    autoComplete="off"
                  />
                </div>
              </form>

             

              <button
                onClick={handleLogoutClick}
                className="dropdown-logout-btn"
              >
                <TbLogout size={20} />
                <span className="dropdown-logout-log">Logout </span>
              </button>
            </div>
          )}
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
