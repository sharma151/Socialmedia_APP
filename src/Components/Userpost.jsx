import { PiBookmarkSimpleBold, PiBookmarkSimpleFill } from "react-icons/pi";
import { useState, useContext, useEffect } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { UpdatedataContext } from "../Context/UpdateProfileContext";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import Modal from "../Modals/Modal";
import usePostActions from "../Hooks/usePostActions";
import "../Styles/Sass/Components/Post.scss";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

const Posts = ({ className, posts, onDeleteSuccess }) => {
  const { UserprofileData } = useContext(UpdatedataContext);
  const [userposts, setUserposts] = useState(posts);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const { handleLikePostSubmit, handleBookmarkClick, handleDeletePostSubmit } =
    usePostActions(
      userposts,
      setUserposts,
      selectedPost,
      setSelectedPost,
      onDeleteSuccess
    );

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  useEffect(() => {
    setUserposts(posts);
  }, [posts]);

  return (
    <div className={`posts ${className}`} id="scrollableDiv">
      <div className="posts-list">
        {userposts.map((post) => (
          <div key={post?._id} className="post-item">
            {post?.author?.account?.avatar?.url && (
              <img
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
              <hr />
              <p className="createdAt">{formatDate(post?.createdAt)}</p>
            </div>
            <hr className="underline" />

            {UserprofileData?._id === post?.author?._id && (
              <button
                className="delete-btn"
                onClick={() => handleDeletePostSubmit(post?._id)}
              >
                <MdDelete />
              </button>
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
                {post?.isLiked ? <BiSolidLike /> : <BiLike />}
                <span className="like-count">{post?.likes}</span>
              </button>
              <button
                className="bookmark"
                onClick={() => handleBookmarkClick(post?._id)}
              >
                {post?.isBookmarked ? (
                  <PiBookmarkSimpleFill />
                ) : (
                  <PiBookmarkSimpleBold />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedPost && (
          <div className="main-modal">
            <div className="modal-post-image">
              <img
                src={selectedPost?.images?.[0]?.url}
                alt={selectedPost?.images?.[0]?.url}
              />
            </div>
            <div className="modal-postdetails">
              <div className="modal-head">
                <div className="modal-post-admin-avatar">
                  {selectedPost?.author?.account?.avatar?.url && (
                    <img
                      src={selectedPost?.author?.account?.avatar?.url}
                      alt={selectedPost?.avatar}
                      onClick={() =>
                        navigate(
                          `/profile/${selectedPost?.author?.account?.username}`
                        )
                      }
                      style={{ cursor: "pointer" }}
                      className="modal-avatar"
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
                  <p className="FullName">
                    {selectedPost?.author?.firstName}{" "}
                    {selectedPost?.author?.lastName}
                  </p>
                  <p className="modal-post-createdAt">
                    {formatDate(selectedPost?.createdAt)}
                  </p>
                </div>
              </div>
              <p className="modal-comment">{selectedPost?.content}</p>
              <div className="modal-post-buttons">
                <button
                  onClick={() => handleLikePostSubmit(selectedPost?._id)}
                  className="modal-Like-dislike"
                  style={{ cursor: "pointer" }}
                >
                  {selectedPost?.isLiked ? (
                    <BiSolidLike size={27} />
                  ) : (
                    <BiLike size={27} />
                  )}
                  <span className="modal-like-count">{selectedPost.likes}</span>
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
