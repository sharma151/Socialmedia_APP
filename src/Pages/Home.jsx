import Createpost from "../Components/Createpost";

import Userpost from "../Components/Userpost";
import Profile from "../Components/Profile";
import { useState, useEffect } from "react";
import axios from "../services/Api";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchallPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/social-media/posts?page=1&limit=100`);
      // console.log(response.data.data.posts);
      const sortedPosts = response?.data?.data?.posts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(sortedPosts);
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
