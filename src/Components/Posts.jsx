import { useState, useEffect } from "react";
import axios from "../services/Api";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/social-media/posts");
        setPosts(response.data.posts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setErrorMessage("Failed to fetch posts. Please try again later.");
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (errorMessage) {
    return <p style={{ color: "red" }}>{errorMessage}</p>;
  }

  return (
    <div className="Posts">
      <h2>All Posts</h2>
      <div className="posts-list">
        {posts.map((posts) => (
          <div key={posts._id} className="post-item">
            <h3>{posts.title}</h3>
            <p>{posts.content}</p>
            {posts.images && (
              <img
                src={posts.images}
                alt={posts.title}
                className="post-image"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
