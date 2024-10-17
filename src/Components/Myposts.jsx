import { useEffect, useState } from "react";
import axios from "../services/Api";

const MyPosts = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyPosts = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        `/social-media/posts/get/my?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts(response?.data?.data?.posts);
    } catch (err) {
      setError("Failed to fetch posts.");
      {
        console.log(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={`posts ${props.className}`}>
      {/* <h2>All Posts</h2> */}
      <div className="posts-list">
        {posts.map((posts) => (
          <div key={posts.id} className="post-item">
            {/* Display avatar */}
            {posts?.author?.account?.avatar?.url && (
              <img
                src={posts?.author?.account?.avatar?.url}
                alt="User Avatar"
                className="avatar"
              />
            )}

            {/* Display username */}
            <p className="Username">{posts?.author?.account?.username}</p>

            {/* Display first and last name */}
            <div className="Name">
              <p className="FirstName">{posts?.author?.firstName}</p>
              <p className="LastName">{posts?.author?.lastName}</p>
            </div>

            {/* Display post content */}
            <p className="content">{posts.content}</p>

            {/* Display post image */}
            <div className="images">
              {posts?.images?.[0]?.url && (
                <img
                  src={posts.images[0].url}
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

export default MyPosts;
