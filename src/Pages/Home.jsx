import { useState, useEffect, useCallback, useContext } from "react";
import { UpdatedataContext } from "../Context/UpdateProfileContext";
import { GoProjectSymlink } from "react-icons/go";
import { BsBookmarksFill } from "react-icons/bs";
import { UsernameContext } from "../Context/Setusername";
import { SiYoutubemusic } from "react-icons/si";
import { MdEmojiEvents } from "react-icons/md";
import { FaGlobeAsia } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { FaGifts } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Createpost from "../Components/Createpost";
import debounce from "lodash/debounce";
import Userpost from "../Components/Userpost";
import Profile from "../Components/Profile";
import Loader from "../assets/Loader";
import "../Styles/Home.scss";
import {
  handleFetchallPost,
  handleFetchpostByusername,
  handleRandomusers,
} from "../services/Handleapi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { UserName } = useContext(UsernameContext);
  const { UserprofileData } = useContext(UpdatedataContext);
  const [randomUsers, setrandomUsers] = useState([]);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/profile-page`);
  };

  const fetchRandomUsers = async () => {
    try {
      const response = await handleRandomusers();
      setrandomUsers(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchallPosts = async () => {
    setLoading(true);
    try {
      const response = await handleFetchallPost();
      const sortedPosts = response.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(sortedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to fetch posts. Please try again later.");
    }
  };

  const debouncefetchpostByUsername = useCallback(
    debounce(async (userName) => {
      try {
        const response = await handleFetchpostByusername(userName);
        const posts = response;
        if (posts) {
          setPosts(posts);
        } else {
        }
      } catch (error) {
        toast.error(`Error fetching user data: ${error.message || error}`);
      }
    }, 1000),
    []
  );

  const formatBirthdate = (dob) => {
    if (!dob) return "Date not available"; // Handle missing or undefined DOB

    const date = new Date(dob);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    // Add suffix for the day
    const daySuffix = (day) => {
      if (day >= 11 && day <= 13) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${daySuffix(day)} ${month} ${year}`;
  };

  const formattedDOB = formatBirthdate(UserprofileData?.dob);

  useEffect(() => {
    fetchRandomUsers();
  }, []);

  useEffect(() => {
    if (UserName) {
      debouncefetchpostByUsername(UserName);
    } else {
      fetchallPosts();
    }
  }, [UserName]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [posts]);

  return (
    <>
      <div className="aside">
        <div
          className="profile"
          onClick={() => handleProfileClick()}
          style={{ cursor: "pointer" }}
        >
          <div className="profileimg">
            {UserprofileData?.account?.avatar?.url && (
              <img
                src={UserprofileData?.account?.avatar?.url}
                alt={UserprofileData?.posts?.avatar}
              />
            )}
          </div>
          <div className="Name">
            <p> {UserprofileData?.firstName}</p>
            <p> {UserprofileData?.lastName}</p>
          </div>
        </div>
        <Link to="/Bookmarks" className="bookmarks">
          <BsBookmarksFill size={25} />
          <p>Saved</p>
        </Link>
        <div className="groups">
          <MdGroups size={25} />
          <p>groups</p>
        </div>
        <div className="website" style={{ cursor: "pointer" }}>
          <FaGlobeAsia size={25} />
          <a href="http://sauravsharma.vercel.app" target="_blank">
            <p>Website</p>
          </a>
        </div>
        <div className="projects" style={{ cursor: "pointer" }}>
          <GoProjectSymlink size={25} />
          <a href="https://yodorawebsite.netlify.app/" target="_blank">
            <p>projects</p>
          </a>
        </div>
        <div className="music" style={{ cursor: "pointer" }}>
          <SiYoutubemusic size={25} />
          <a href="https://music.youtube.com/" target="_blank">
            <p>Youtube Music</p>
          </a>
        </div>
        <div className="music" style={{ cursor: "pointer" }}>
          <MdEmojiEvents size={25} />
          <a href="https://music.youtube.com/" target="_blank">
            <p>Events</p>
          </a>
        </div>
      </div>

      <Createpost
        className="Homepage-createpost"
        onUpdate={() => {
          fetchallPosts();
        }}
      />
      {loading ? (
        <Loader className="homeloader" />
      ) : (
        <>
          <Profile  className="homepage-Profile"/>
          <Userpost
            className="Getallpost"
            posts={posts}
            onUpdate={() => {
              fetchallPosts();
            }}
          />
        </>
      )}
      <div className="birthday">
        <p>Birthday</p>
        <div className="birthdate">
          <FaGifts size={22} />
          <span>{formattedDOB}</span>
        </div>
      </div>

      <div className="suggestions">
        <p>Suggestions</p>
        <div className="usertiles">
          {randomUsers?.map((user) => (
            <div key={user.id} className="user-tile">
              <div className="icons">
                {user?.picture?.medium && (
                  <img
                    src={user?.picture?.medium}
                    alt={user?.picture?.medium}
                  />
                )}
              </div>
              <div className="suggestionname">
                {user?.name?.first} {user?.name?.last}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
