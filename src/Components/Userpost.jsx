import { useState, useEffect } from "react";
import axios from "../services/Api";
// import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

import "../Styles/Post.scss";

const Posts = ({ className, posts }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState();
  // const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);

  const handleDeletePost = async (_id) => {
    try {
      // Make DELETE request to delete the post by id
      const response = await axios.delete(`/social-media/posts/${_id}`);

      if (response.status === 200) {
        toast.success("Post deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete the post.");
    }
  };

  //   useEffect(() => {
  //     Posts(page);
  //   }, [page]);

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <div className={`posts ${className}`}>
      {/* <h2>All Posts</h2> */}
      <div className="posts-list">
        {posts.map((post) => (
          <div key={post._id} className="post-item">
            {post?.author?.account?.avatar?.url && (
              <img
                key={post?.id}
                src={post?.author?.account?.avatar?.url}
                alt={post?.avatar}
                className="avatar"
              />
            )}

            <p className="Username">{post?.author?.account?.username}</p>
            <div className="Name">
              <p className="FirstName">{post?.author?.firstName}</p>
              <p className="LastName">{post?.author?.lastName}</p>
              <p className="createdAt">{post?.createdAt}</p>
            </div>
            <button
              className="delete-btn"
              onClick={() =>
                handleDeletePost(
                  post._id,
                  post?.author?.account?.avatar?.username
                )
              }
            >
              <MdDelete size={25} />
            </button>
            <p className="content">{post.content}</p>
            <div className="images">
              {post?.images?.[0]?.url && (
                <img
                  src={post?.images?.[0]?.url}
                  alt={post.title}
                  className="post-image"
                />
              )}
            </div>
          </div>
        ))}
      </div>
      {/* <div className="pagination-controls">
        <button onClick={handlePrevious} disabled={page === 1}>
          <GrFormPrevious size={25} />
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={page === totalPages}>
          <GrFormNext size={25} />
        </button>
      </div> */}
    </div>
  );
};

export default Posts;
