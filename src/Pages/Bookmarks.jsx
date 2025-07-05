import Userpost from "@/Components/Userpost";
import { useBookmarkedPosts } from "@/core/Hooks/Api/userData";
const Bookmarks = () => {
  const {
    data: bookmarkedPost,
    isLoading: loading,
    refetch: fetchBookmarks,
  } = useBookmarkedPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Bookmarked Posts
      </h1>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading bookmarks...</p>
      ) : bookmarkedPost.length > 0 ? (
        <Userpost posts={bookmarkedPost} />
      ) : (
        <div className="flex flex-col items-center justify-center h-60 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 bg-gray-50 dark:bg-gray-800">
          <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
            No bookmarks yet
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            You can bookmark posts to see them here later.
          </p>
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
