import { useState, useEffect, useCallback, useContext } from "react";
import { UpdatedataContext } from "../Context/UpdateProfileContext";
import { UsernameContext } from "../Context/Setusername";
import { FaGifts } from "react-icons/fa";
import { toast } from "react-toastify";
import Createpost from "../Components/Createpost";
import debounce from "lodash/debounce";
import Userpost from "../Components/Userpost";
import Profile from "../Components/Profile";
import Loader from "../assets/Loader";
import "../Styles/Sass/Pages/Home.scss";
import Aside from "../Components/aside";
import Suggestions from "../Components/Suggestions";
import {
  handleFetchallPost,
  handleFetchpostByusername,
} from "../services/Handleapi";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { UserName } = useContext(UsernameContext);
  const { UserprofileData } = useContext(UpdatedataContext);

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
      <div className="maincontainer">
        <Aside className="Homepage-Aside" />

        <div className="middle-div">
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
              <Userpost
                className="Getallpost"
                posts={posts}
                onUpdate={() => {
                  fetchallPosts();
                }}
              />
            </>
          )}
        </div>
        <div className="right-div">
          <Profile className="homepage-Profile" />
          <div className="birthday">
            <p>Birthday</p>
            <div className="birthdate">
              <FaGifts size={22} />
              <span>{formattedDOB}</span>
            </div>
          </div>
          <Suggestions className="Homepage-Suggestions" />
        </div>
      </div>
    </>
  );
};

export default Home;
