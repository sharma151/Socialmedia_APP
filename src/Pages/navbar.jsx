import { useState, useCallback, useContext, useRef, useEffect } from "react";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { LoggedinUserProfileData } from "@/Context/UpdateProfileContext";
import { IoGameController } from "react-icons/io5";
import { UsernameContext } from "@/Context/Setusername";
import { HiMiniUserGroup } from "react-icons/hi2";
import { AiOutlineClose } from "react-icons/ai";
import { Handlelogout } from "@/services/AuthService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/Context/Authcontext";
import { TbLogout } from "react-icons/tb";
import { LuMenu } from "react-icons/lu";
import { IoHome } from "react-icons/io5";
import { toast } from "react-toastify";
import { ThemeContext } from "@/Context/ThemeContext";
import { Link } from "react-router-dom";
import debounce from "lodash/debounce";
import axios from "@/services/Api";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { SetUserName } = useContext(UsernameContext);
  const { loggedinUserprofileData } = useContext(LoggedinUserProfileData);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    setIsMenuOpen((prevState) => !prevState);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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
    // <nav>
    //   {isAuthenticated ? (
    //     <div className="nav-content">
    //       <Link to="/" className="Logo" onClick={handleScrollToTop}>
    //         SS
    //       </Link>

    //       <button className="themebtn" onClick={toggleTheme}>
    //         {theme === "light" ? "☀️" : "🌙"}
    //       </button>

    //       <div className="hamburger-icon" onClick={toggleMenu}>
    //         <LuMenu color="white" size={28} />
    //       </div>

    //       {/* Search Form */}
    //       <form onSubmit={handleSearchSubmit} className="search-form">
    //         <div className="search-input-container">
    //           <input
    //             type="text"
    //             value={username}
    //             onChange={handleInputChange}
    //             placeholder="Enter username..."
    //             autoComplete="off"
    //           />
    //           {username && (
    //             <button
    //               type="button"
    //               onClick={handleClearSearch}
    //               className="clear-search-btn"
    //               aria-label="Clear search"
    //             >
    //               <AiOutlineClose size={18} />
    //             </button>
    //           )}
    //         </div>
    //       </form>

    //       {/* Regular Navigation Icons */}
    //       <div className="icons-div">
    //         <div className="icons">
    //           <Link to="/" onClick={handleScrollToTop}>
    //             <IoHome color="white" />
    //           </Link>
    //         </div>
    //         <div className="icons">
    //           <MdOutlineOndemandVideo color="white" />
    //         </div>
    //         <div className="icons">
    //           <HiMiniUserGroup color="white" />
    //         </div>
    //         <div className="icons">
    //           <IoGameController color="white" />
    //         </div>
    //       </div>

    //       <Link to="/profile-page">
    //         <div className="profileimg-navbar">
    //           {UserprofileData?.account?.avatar?.url && (
    //             <img
    //               src={UserprofileData?.account?.avatar?.url}
    //               alt={UserprofileData?.posts?.avatar}
    //             />
    //           )}
    //         </div>
    //       </Link>

    //       <button onClick={handleLogoutClick} className="logout-btn">
    //         <TbLogout size={20} />
    //         <span className="logout-log">Logout </span>
    //       </button>

    //       {/* Dropdown Menu */}
    //       {isMenuOpen && (
    //         <div className="dropdown-menu" ref={dropdownRef}>
    //           <Link className="dropdown-profile-name" to="/profile-page">
    //             <div className="dropdown-profileimg-navbar">
    //               {UserprofileData?.account?.avatar?.url && (
    //                 <img
    //                   src={UserprofileData?.account?.avatar?.url}
    //                   alt={UserprofileData?.posts?.avatar}
    //                 />
    //               )}
    //             </div>
    //             <span className="dropdown-username">
    //               {UserprofileData?.account?.username}
    //             </span>
    //           </Link>

    //           <form
    //             onSubmit={handleSearchSubmit}
    //             className="dropdown-search-form"
    //           >
    //             <div className="dropdown-search-input-container">
    //               <input
    //                 type="text"
    //                 value={username}
    //                 onChange={handleInputChange}
    //                 placeholder="Search user..."
    //                 autoComplete="off"
    //               />
    //             </div>
    //           </form>

    //           <button
    //             onClick={handleLogoutClick}
    //             className="dropdown-logout-btn"
    //           >
    //             <TbLogout size={20} />
    //             <span className="dropdown-logout-log">Logout </span>
    //           </button>
    //           <button className="dropdown-themebtn" onClick={toggleTheme}>
    //             {theme === "light" ? "🌙" : "☀️"}
    //           </button>
    //         </div>
    //       )}
    //     </div>
    //   ) : null}
    // </nav>
    <nav className="bg-[#242526] text-white shadow-sm sticky top-0 z-50 w-full">
      {isAuthenticated && (
        <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between h-14">
          {/* Left: Logo + Search */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-2xl font-bold text-white"
              onClick={handleScrollToTop}
            >
              SS
            </Link>

            <form onSubmit={handleSearchSubmit} className="hidden sm:block">
              <div className="flex items-center bg-[#3A3B3C] rounded-full px-3 py-1">
                <input
                  type="text"
                  value={username}
                  onChange={handleInputChange}
                  placeholder="Search..."
                  className="bg-transparent text-white placeholder-gray-400 outline-none w-40 sm:w-64"
                />
                {username && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="ml-2 text-gray-300 hover:text-white"
                    aria-label="Clear search"
                  >
                    <AiOutlineClose size={16} />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Center: Icon Nav */}
          <div className="hidden md:flex gap-6 items-center">
            <Link
              to="/"
              onClick={handleScrollToTop}
              className="p-2 hover:bg-[#3A3B3C] rounded-full"
            >
              <IoHome size={24} />
            </Link>
            <div className="p-2 hover:bg-[#3A3B3C] rounded-full cursor-pointer">
              <MdOutlineOndemandVideo size={24} />
            </div>
            <div className="p-2 hover:bg-[#3A3B3C] rounded-full cursor-pointer">
              <HiMiniUserGroup size={24} />
            </div>
            <div className="p-2 hover:bg-[#3A3B3C] rounded-full cursor-pointer">
              <IoGameController size={24} />
            </div>
          </div>

          {/* Right: Profile + Logout + Theme + Menu */}
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="hidden sm:inline text-lg">
              {theme === "light" ? "☀️" : "🌙"}
            </button>

            <Link to="/profile-page">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-400">
                {loggedinUserprofileData?.account?.avatar?.url && (
                  <img
                    src={loggedinUserprofileData?.account.avatar.url}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </Link>

            <button
              onClick={handleLogoutClick}
              className="text-sm flex items-center gap-1 hover:text-red-400"
            >
              <TbLogout size={18} />
            </button>

            {/* Mobile menu toggle */}
            <div className="md:hidden">
              <button onClick={toggleMenu}>
                <LuMenu size={24} />
              </button>
            </div>
          </div>

          {/* Mobile dropdown menu */}
          {isMenuOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-14 right-4 w-64 bg-[#3A3B3C] text-white rounded-md p-4 shadow-lg space-y-4"
            >
              <Link to="/profile-page" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  {loggedinUserprofileData?.account?.avatar?.url && (
                    <img
                      src={loggedinUserprofileData.account.avatar.url}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <span>{loggedinUserprofileData?.account?.username}</span>
              </Link>

              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  value={username}
                  onChange={handleInputChange}
                  placeholder="Search user..."
                  className="w-full px-3 py-2 rounded-md bg-[#4E4F50] text-white placeholder-gray-300"
                />
              </form>

              <div className="flex justify-between items-center">
                <button
                  onClick={handleLogoutClick}
                  className="flex items-center gap-2 hover:text-red-400"
                >
                  <TbLogout size={20} />
                  Logout
                </button>
                <button onClick={toggleTheme}>
                  {theme === "light" ? "🌙" : "☀️"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
