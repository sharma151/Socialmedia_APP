import { useState, useEffect } from "react";
import axios from "../services/Api";
import "../Styles/Post.scss";
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/social-media/posts");
        setPosts(response?.data?.data?.posts);
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
    <div className="posts">
      {/* <h2>All Posts</h2> */}
      <div className="posts-list">
        {posts.map((posts) => (
          <div key={posts.id} className="post-item">
            {posts?.author?.coverImage?.url && (
              <img
                key={posts?.id}
                src={posts?.author?.coverImage?.url}
                alt={posts.coverImage}
                className="coverimage"
              />
            )}

            <p className="Username">{posts?.author?.account?.username}</p>
            <div className="Name">
              <p className="FirstName">{posts?.author?.firstName}</p>
              <p className="LastName">{posts?.author?.lastName}</p>
            </div>
            <p className="content">{posts.content}</p>
            <div className="images">
              {posts?.images?.[0]?.url && (
                <img
                  src={posts?.images?.[0]?.url}
                  alt={posts.title}
                  className="post-image"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
