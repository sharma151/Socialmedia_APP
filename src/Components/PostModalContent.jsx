import { BiLike, BiSolidLike } from "react-icons/bi";
import { PiBookmarkSimpleBold, PiBookmarkSimpleFill } from "react-icons/pi";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

const PostModalContent = ({ post, onLike, onBookmark, navigate }) => {
  if (!post) return null;

  return (
    // <div className="flex w-full max-w-4xl h-[90vh] bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-xl">
    <div className="flex w-full max-w-4xl bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-xl">
      {/* Left: Image */}
      <div className="flex-1 bg-black flex items-center justify-center">
        <img
          src={post?.images?.[0]?.url}
          alt="modal-img"
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Right: Content */}
      <div className="w-full md:max-w-sm flex flex-col justify-between p-6 overflow-y-auto text-black dark:text-white">
        <div>
          {/* Author Info */}
          <div className="flex items-center gap-3 mb-4">
            {post?.author?.account?.avatar?.url && (
              <img
                src={post?.author?.account?.avatar?.url}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
                onClick={() =>
                  navigate(`/profile/${post?.author?.account?.username}`)
                }
              />
            )}
            <div>
              <p
                className="font-bold cursor-pointer"
                onClick={() =>
                  navigate(`/profile/${post?.author?.account?.username}`)
                }
              >
                {post?.author?.firstName} {post?.author?.lastName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(post?.createdAt)}
              </p>
            </div>
          </div>

          {/* Content */}
          <p className="text-base mb-4 break-words">{post?.content}</p>
        </div>

        {/* Like & Bookmark */}
        <div className="flex justify-between items-center border-t pt-4 mt-4">
          <button
            onClick={() => onLike(post?._id)}
            className="flex items-center gap-1 text-blue-600 dark:text-blue-400"
          >
            {post?.isLiked ? <BiSolidLike size={24} /> : <BiLike size={24} />}
            <span>{post?.likes}</span>
          </button>
          <button
            onClick={() => onBookmark(post?._id)}
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
  );
};

export default PostModalContent;
