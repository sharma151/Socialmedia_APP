import Createpost from "../Components/Createpost";
import Userpost from "../Components/Userpost";
import Profile from "../Components/Profile";
import { useState, useEffect } from "react";
import axios from "../services/Api";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const fetchallPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/social-media/posts?page=1&limit=100`);
      setPosts(response?.data?.data?.posts);
      setTotalPages(response?.data?.data?.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setErrorMessage("Failed to fetch posts. Please try again later.");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchallPosts();
  }, []);

  return (
    <>
      <Createpost
        onUpdate={() => {
          fetchallPosts();
        }}
      />
      <Userpost posts={posts} />
      <Profile />
    </>
  );
};

export default Home;
