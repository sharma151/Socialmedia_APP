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
    <div className="flex w-full max-w-5xl h-[90vh] bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
      {/* Left: Image - 2/3 width */}
      <div className="w-2/3 bg-black flex items-center justify-center">
        {post?.images?.[0]?.url ? (
          <img
            src={post.images[0].url}
            alt="modal-img"
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <div className="text-white text-center">No Image</div>
        )}
      </div>

      {/* Right: Content - 1/3 width */}
      <div className="w-1/3 flex flex-col p-6 overflow-y-auto text-black dark:text-white">
        {/* Author Info */}
        <div className="flex items-center gap-3 mb-4">
          {post?.author?.account?.avatar?.url && (
            <img
              src={post.author.account.avatar.url}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
              onClick={() =>
                navigate(`/profile/${post.author.account.username}`)
              }
            />
          )}
          <div>
            <p
              className="font-bold cursor-pointer hover:underline"
              onClick={() =>
                navigate(`/profile/${post.author.account.username}`)
              }
            >
              {post?.author?.firstName} {post?.author?.lastName}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(post.createdAt)}
            </p>
          </div>
        </div>

        {/* Post Content */}
        <div className="flex-1 overflow-y-auto mb-4">
          <p className="text-base break-words whitespace-pre-line">
            {post?.content}
          </p>
        </div>

        {/* Like & Bookmark */}
        <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-4">
          <button
            onClick={() => onLike(post._id)}
            className="flex items-center gap-1 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            {post?.isLiked ? (
              <BiSolidLike size={24} className="text-blue-600 dark:text-blue-400" />
            ) : (
              <BiLike size={24} />
            )}
            <span>{post?.likes}</span>
          </button>
          <button
            onClick={() => onBookmark(post._id)}
            className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
          >
            {post?.isBookmarked ? (
              <PiBookmarkSimpleFill
                size={24}
                className="text-yellow-500 dark:text-yellow-400"
              />
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
