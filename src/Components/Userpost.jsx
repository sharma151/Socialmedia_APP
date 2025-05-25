import { PiBookmarkSimpleBold, PiBookmarkSimpleFill } from "react-icons/pi";
import { useState, useContext, useEffect } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { UpdatedataContext } from "@/Context/UpdateProfileContext";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import Modal from "@/Modals/Modal";
import usePostActions from "@/Hooks/usePostActions";
import PostModalContent from "@/Components/PostModalContent";

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
    <div className={`w-full max-w-2xl mx-auto ${className}`} id="scrollableDiv">
      <div className="space-y-6">
        {userposts.map((post) => (
          <div
            key={post?._id}
            className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md rounded-lg overflow-hidden"
          >
            <div className="flex items-center gap-4 p-4">
              {post?.author?.account?.avatar?.url && (
                <img
                  src={post?.author?.account?.avatar?.url}
                  alt="avatar"
                  onClick={() =>
                    navigate(`/profile/${post?.author?.account?.username}`)
                  }
                  className="w-12 h-12 rounded-full object-cover cursor-pointer"
                />
              )}
              <div>
                <p
                  onClick={() =>
                    navigate(`/profile/${post?.author?.account?.username}`)
                  }
                  className="font-bold text-lg capitalize cursor-pointer"
                >
                  {post?.author?.account?.username}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {post?.author?.firstName} {post?.author?.lastName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(post?.createdAt)}
                </p>
              </div>
              {UserprofileData?._id === post?.author?._id && (
                <button
                  className="ml-auto text-red-600 hover:text-red-800"
                  onClick={() => handleDeletePostSubmit(post?._id)}
                >
                  <MdDelete size={24} />
                </button>
              )}
            </div>
            <div className="px-4 pb-4">
              <p className="text-base mb-2 capitalize">{post?.content}</p>
              {post?.images?.[0]?.url && (
                <img
                  src={post?.images?.[0]?.url}
                  alt="post"
                  className="w-full max-h-[400px] object-cover rounded-md cursor-pointer"
                  onClick={() => handlePostClick(post)}
                />
              )}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleLikePostSubmit(post?._id)}
                  className="flex items-center gap-1 text-blue-600 dark:text-blue-400"
                >
                  {post?.isLiked ? (
                    <BiSolidLike size={24} />
                  ) : (
                    <BiLike size={24} />
                  )}
                  <span>{post?.likes}</span>
                </button>
                <button
                  onClick={() => handleBookmarkClick(post?._id)}
                  className="text-yellow-500 dark:text-yellow-400"
                >
                  {post?.isBookmarked ? (
                    <PiBookmarkSimpleFill size={24} />
                  ) : (
                    <PiBookmarkSimpleBold size={24} />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedPost && (
          <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
            <div className="flex-shrink-0 w-full md:w-1/2">
              <img
                src={selectedPost?.images?.[0]?.url}
                alt="modal-img"
                className="object-cover w-full h-full max-h-[400px]"
              />
            </div>
            <div className="p-4 w-full md:w-1/2 text-gray-900 dark:text-white">
              <div className="flex items-center gap-3 mb-4">
                {selectedPost?.author?.account?.avatar?.url && (
                  <img
                    src={selectedPost?.author?.account?.avatar?.url}
                    alt="avatar"
                    className="w-12 h-12 rounded-full object-cover cursor-pointer"
                    onClick={() =>
                      navigate(`/profile/${selectedPost?.author?.account?.username}`)
                    }
                  />
                )}
                <div>
                  <p className="font-bold text-lg capitalize cursor-pointer">
                    {selectedPost?.author?.firstName} {selectedPost?.author?.lastName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(selectedPost?.createdAt)}
                  </p>
                </div>
              </div>
              <p className="text-base mb-4 capitalize">{selectedPost?.content}</p>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleLikePostSubmit(selectedPost?._id)}
                  className="flex items-center gap-1 text-blue-600 dark:text-blue-400"
                >
                  {selectedPost?.isLiked ? (
                    <BiSolidLike size={24} />
                  ) : (
                    <BiLike size={24} />
                  )}
                  <span>{selectedPost?.likes}</span>
                </button>
                <button
                  onClick={() => handleBookmarkClick(selectedPost?._id)}
                  className="text-yellow-500 dark:text-yellow-400"
                >
                  {selectedPost?.isBookmarked ? (
                    <PiBookmarkSimpleFill size={24} />
                  ) : (
                    <PiBookmarkSimpleBold size={24} />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal> */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <PostModalContent
          post={selectedPost}
          onLike={handleLikePostSubmit}
          onBookmark={handleBookmarkClick}
          navigate={navigate}
        />
      </Modal>
    </div>
  );
};

export default Posts;
