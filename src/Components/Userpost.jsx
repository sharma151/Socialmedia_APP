import { PiBookmarkSimpleBold, PiBookmarkSimpleFill } from "react-icons/pi";
import { useState, useContext, useEffect } from "react";
import { UpdatedataContext } from "../Context/UpdateProfileContext";
import { MdDelete } from "react-icons/md";
import { BiLike, BiSolidLike } from "react-icons/bi";
import Modal from "../Modals/Modal";
import { toast } from "react-toastify";
import {
  handleSetBookmarks,
  HandleDeletePost,
  handleLikePost,
} from "../services/Handleapi";
import "../Styles/Sass/Components/Post.scss";
import { useNavigate } from "react-router-dom";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

const Posts = ({ className, posts, onUpdate }) => {
  const { UserprofileData } = useContext(UpdatedataContext);
  const [userposts, setUserposts] = useState(posts);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const Handledeletepostsubmit = async (e, _id) => {
    e.preventDefault();
    try {
      const response = await HandleDeletePost(_id);
      if (response === 200) {
        toast.success("Post deleted successfully");
        if (onUpdate) {
          onUpdate();
        }
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete the post.");
    }
  };

  // const handleLikePostSubmit = async (_id) => {
  //   try {
  //     const response = await handleLikePost(_id);
  //     const updatedPosts = userposts.map((post) => {
  //       if (post._id === _id) {
  //         return {
  //           ...post,
  //           isLiked: response.isLiked,
  //           likes: response.isLiked ? post.likes + 1 : post.likes - 1,
  //         };
  //       }
  //       return post;
  //     });

  //     setUserposts(updatedPosts);

  //     // Update the selectedPost if the modal is open and the post matches
  //     if (selectedPost && selectedPost._id === _id) {
  //       setSelectedPost((prev) => ({
  //         ...prev,
  //         isLiked: response.isLiked,
  //         likes: response.isLiked ? prev.likes + 1 : prev.likes - 1,
  //       }));
  //     }
  //   } catch (error) {
  //     console.error("Error liking post:", error);
  //   }
  // };

  const handleLikePostSubmit = async (_id) => {
    try {
      // Disable the like button for this post to prevent rapid clicks
      setUserposts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === _id ? { ...post, isUpdating: true } : post
        )
      );

      const response = await handleLikePost(_id); // Call API to toggle like

      setUserposts((prevPosts) =>
        prevPosts.map((post) => {
          if (post._id === _id) {
            return {
              ...post,
              isLiked: response.isLiked, // Update like status
              likes: response.isLiked ? post.likes + 1 : post.likes - 1, // Adjust likes
              isUpdating: false, // Re-enable button
            };
          }
          return post;
        })
      );

      // Update the selectedPost if the modal is open and the post matches
      if (selectedPost && selectedPost._id === _id) {
        setSelectedPost((prev) => ({
          ...prev,
          isLiked: response.isLiked,
          likes: response.isLiked ? prev.likes + 1 : prev.likes - 1,
        }));
      }
    } catch (error) {
      console.error("Error liking post:", error);

      // Re-enable the like button and revert state on failure
      setUserposts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === _id ? { ...post, isUpdating: false } : post
        )
      );
    }
  };

  const handleBookmarkClick = async (_id) => {
    try {
      const response = await handleSetBookmarks(_id);
      const updatedPosts = userposts.map((post) => {
        if (post?._id === _id) {
          return {
            ...post,
            isBookmarked: response?.isBookmarked,
          };
        }
        return post;
      });

      setUserposts(updatedPosts);

      // Update the selectedPost if the modal is open and the post matches
      if (selectedPost && selectedPost._id === _id) {
        setSelectedPost((prev) => ({
          ...prev,
          isBookmarked: response?.isBookmarked,
        }));
      }

      // Show toast notifications
      if (response?.isBookmarked) {
        toast.success("Bookmarked Successfully");
      } else {
        toast.info("Bookmark Removed");
      }
    } catch (error) {
      console.error("Error handling bookmarks:", error);
    }
  };

  useEffect(() => {
    setUserposts(posts);
  }, [posts]);

  return (
    <div className={`posts ${className}`}>
      <div className="posts-list">
        {userposts.map((post) => (
          <div key={post?._id} className="post-item">
            {post?.author?.account?.avatar?.url && (
              <img
                // key={post?.id}
                src={post?.author?.account?.avatar?.url}
                alt={post?.avatar}
                onClick={() =>
                  navigate(`/profile/${post?.author?.account?.username}`)
                }
                style={{ cursor: "pointer" }}
                className="avatar"
              />
            )}

            <p
              className="Username"
              onClick={() =>
                navigate(`/profile/${post?.author?.account?.username}`)
              }
              style={{ cursor: "pointer" }}
            >
              {post?.author?.account?.username}
            </p>
            <div
              className="Name"
              onClick={() =>
                navigate(`/profile/${post?.author?.account?.username}`)
              }
              style={{ cursor: "pointer" }}
            >
              <p className="FullName">
                {post?.author?.firstName} {post?.author?.lastName}
              </p>
              <hr/>
              <p className="createdAt">{formatDate(post?.createdAt)}</p>
              
            </div>
            <hr className="underline"/> 
            {UserprofileData?._id === post?.author?._id && (
              <>
                <button
                  className="delete-btn"
                  onClick={(e) => Handledeletepostsubmit(e, post?._id)}
                >
                  <MdDelete />
                </button>
              </>
            )}
            
            

            <p className="content">{post?.content}</p>
            <div className="images">
              {post?.images?.[0]?.url && (
                <img
                  src={post?.images?.[0]?.url}
                  alt={post.title}
                  className="post-image"
                  onClick={() => handlePostClick(post)}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
            <div className="Post-buttons">
              <button
                onClick={() => handleLikePostSubmit(post?._id)}
                className="Like-dislike"
                style={{ cursor: "pointer" }}
              >
                {post?.isLiked ? (
                  <BiSolidLike  />
                ) : (
                  <BiLike  />
                )}
                <span className="like-count">{post?.likes}</span>
              </button>
              <button
                className="bookmark"
                onClick={() => handleBookmarkClick(post?._id)}
              >
                {post?.isBookmarked ? (
                  <PiBookmarkSimpleFill  />
                ) : (
                  <PiBookmarkSimpleBold  />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals UI starts here */}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedPost && (
          <div className="main-modal">
            <div className="modal-post-image">
              <img
                src={selectedPost?.images?.[0]?.url}
                alt={selectedPost?.images?.[0]?.url}
              />
            </div>

            <div className="postdetails">
              <div className="head">
                <div className="post-admin-avatar">
                  {selectedPost?.author?.account?.avatar?.url && (
                    <img
                      key={selectedPost?.id}
                      src={selectedPost?.author?.account?.avatar?.url}
                      alt={selectedPost?.avatar}
                      onClick={() =>
                        navigate(
                          `/profile/${selectedPost?.author?.account?.username}`
                        )
                      }
                      style={{ cursor: "pointer" }}
                      className="avatar"
                    />
                  )}
                </div>
                <div
                  className="Name"
                  onClick={() =>
                    navigate(
                      `/profile/${selectedPost?.author?.account?.username}`
                    )
                  }
                  style={{ cursor: "pointer" }}
                >
                  <p className="FirstName">{selectedPost?.author?.firstName}</p>
                  <p className="LastName">{selectedPost?.author?.lastName}</p>
                </div>
                <p className="createdAt">
                  {formatDate(selectedPost?.createdAt)}
                </p>
              </div>
              <p className="content">{selectedPost?.content}</p>
              <div className="post-buttons">
                <button
                  onClick={() => handleLikePostSubmit(selectedPost?._id)}
                  className="Like-dislike"
                  style={{ cursor: "pointer" }}
                >
                  {selectedPost?.isLiked ? (
                    <BiSolidLike size={27} />
                  ) : (
                    <BiLike size={27} />
                  )}
                  <span className="like-count">{selectedPost.likes}</span>
                </button>

                <button
                  className="bookmark"
                  onClick={() => handleBookmarkClick(selectedPost?._id)}
                >
                  {selectedPost?.isBookmarked ? (
                    <PiBookmarkSimpleFill size={27} />
                  ) : (
                    <PiBookmarkSimpleBold size={27} />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Posts;
