import { useState, useEffect, useCallback, useContext } from "react";
import { UpdatedataContext } from "../Context/UpdateProfileContext";
import { UsernameContext } from "../Context/Setusername";
import { FaGifts } from "react-icons/fa";
import { toast } from "react-toastify";
import Createpost from "@/Components/Createpost";
import debounce from "lodash/debounce";
import Userpost from "@/Components/Userpost";
import Profile from "@/Components/Profile";
// import "../Styles/Sass/Pages/Home.scss";
import Aside from "@/Components/aside";
import Suggestions from "@/Components/Suggestions";
import InfiniteScroll from "react-infinite-scroll-component";
// import Loader from "@/assets/Loader";
import apiClient from "@/services/Api";
import {
  handleFetchallPost,
  handleFetchpostByusername,
} from "../services/Handleapi";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { UserName } = useContext(UsernameContext);
  const { UserprofileData } = useContext(UpdatedataContext);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState();
  const [totalPosts, setTotalPost] = useState();

  const fetchAllPosts = async () => {
    setLoading(true);
    try {
      const response = await handleFetchallPost();
      const sortedPosts = response.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(sortedPosts);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch posts. Please try again later.");
    }
  };

  const debounceFetchPostByUsername = useCallback(
    debounce(async (userName) => {
      try {
        const response = await handleFetchpostByusername(userName);
        if (response) {
          setPosts(response);
        } else {
          setPosts([]);
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
      debounceFetchPostByUsername(UserName);
    } else {
      fetchAllPosts();
    }
  }, [UserName]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [posts]);

  const fetchMoreData = async () => {
    try {
      if (page <= 1) {
        setHasMore(false);
        return;
      }
      const response = await handleFetchallPost(page - 1);

      if (response.length > 0) {
        const sortedPosts = response.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts((prevPosts) => [...prevPosts, ...sortedPosts]);
        setPage((prevPage) => prevPage - 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching more posts:", error);
    }
  };

  useEffect(() => {
    const initializePosts = async () => {
      try {
        const totalPageResponse = await apiClient.get(`/social-media/posts`);
        const initialPage = totalPageResponse?.data?.data?.totalPages;
        setTotalPost(totalPageResponse?.data?.data?.totalPosts);
        setPage(initialPage);
        const response = await handleFetchallPost(initialPage);
        const sortedPosts = response.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error initializing posts:", error);
      }
    };

    initializePosts();
  }, []);

  const onCreateSuceess = async () => {
    setLoading(true);

    try {
      let newPage = page;
      if (totalPosts % 10 == 0) newPage = page + 1;
      const response = await handleFetchallPost(newPage);
      const sortedPosts = response.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setPosts(sortedPosts);
      setPage(newPage);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch posts. Please try again later.");
    }
  };

  const onDeleteSuccess = async () => {
    setLoading(true);
    try {
      let newPage = page;
      console.log("ondeletecalled", totalPosts, totalPosts % 10 == 0);
      if (totalPosts % 10 == 0) newPage = page - 1;
      const response = await handleFetchallPost(newPage);
      const sortedPosts = response.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setPosts(sortedPosts);
      setPage(newPage);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch posts. Please try again later.");
    }
  };

  return (
    <>
      <div className="flex gap-6 p-6 min-h-screen">
        {/* Left Aside */}
        <Aside className="w-60" />

        {/* Middle column */}
        <div className="flex flex-col flex-1 gap-6 max-w-3xl">
          {/* Both will have equal width because they take full width of parent */}
          <Createpost className="w-[94%] mx-auto" onUpdate={onCreateSuceess} />
          <Userpost
            className="w-full"
            posts={posts}
            onUpdate={fetchAllPosts}
            onDeleteSuccess={onDeleteSuccess}
          />
        </div>

        {/* Right column */}
        <div className="w-72 mt-6 flex flex-col gap-6">
          <Profile className="w-full" />
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="font-semibold mb-2">Birthday</p>
            <div className="flex items-center gap-2 font-medium text-gray-700">
              <FaGifts size={22} />
              <span>{formattedDOB}</span>
            </div>
          </div>
          <Suggestions className="w-full" />
        </div>
      </div>
    </>
  );
};

export default Home;
