import { useState, useEffect } from "react";
import axios from "../services/Api";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

import "../Styles/Post.scss";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPosts = async (page = 1, limit = 20) => {
    try {
      setLoading(true);

      const response = await axios.get(
        `/social-media/posts?page=${page}&limit=${limit}'`
      );
      setPosts(response?.data?.data?.posts);
      setTotalPages(response?.data?.data?.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setErrorMessage("Failed to fetch posts. Please try again later.");
      setLoading(false);
    }
  };

  const handleDeletePost = async (_id) => {
    try {
      // Make DELETE request to delete the post by id
      const response = await axios.delete(`/social-media/posts/${_id}`);
      setPosts((prevPosts) => prevPosts.filter((posts) => posts._id !== _id));

      if (response.status === 200) {
        toast.success("Post deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete the post.");
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1); // Decrease page number
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1); // Increase page number
    }
  };

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <div className="posts">
      {/* <h2>All Posts</h2> */}
      <div className="posts-list">
        {posts.map((posts) => (
          <div key={posts._id} className="post-item">
            {posts?.author?.account?.avatar?.url && (
              <img
                key={posts?.id}
                src={posts?.author?.account?.avatar?.url}
                alt={posts?.avatar}
                className="avatar"
              />
            )}

            <p className="Username">{posts?.author?.account?.username}</p>
            <div className="Name">
              <p className="FirstName">{posts?.author?.firstName}</p>
              <p className="LastName">{posts?.author?.lastName}</p>
            </div>
            <button
              className="delete-btn"
              onClick={() =>
                handleDeletePost(
                  posts._id,
                  posts?.author?.account?.avatar?.username
                )
              }
            >
              <MdDelete size={25} />
            </button>
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
      <div className="pagination-controls">
        <button onClick={handlePrevious} disabled={page === 1}>
          <GrFormPrevious size={25} />
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={page === totalPages}>
          <GrFormNext size={25} />
        </button>
      </div>
    </div>
  );
};

export default Posts;
