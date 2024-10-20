import { useEffect, useState } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import axios from "../services/Api";
import { toast } from "react-toastify";


const MyPosts = ({ className, onUpdate }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMyPosts = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("AccessToken");
      const response = await axios.get(
        `/social-media/posts/get/my?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts(response?.data?.data?.posts);
      setTotalPages(response?.data?.data?.totalPages);
      setLoading(false);
      if (onUpdate) {
        onUpdate();
      }
    } catch (err) {
      toast("Failed to fetch posts.", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts(page);
  }, [page]);

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={`posts ${className}`}>
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

      <div className="pagination-controls">
        <button onClick={handlePrevious} disabled={page === 1}>
          <GrFormPrevious size={25} />
        </button>
        <span>
          {" "}
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={page === totalPages}>
          <GrFormNext size={25} />
        </button>
      </div>
    </div>
  );
};

export default MyPosts;
