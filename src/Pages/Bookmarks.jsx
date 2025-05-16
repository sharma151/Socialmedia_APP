import { handleFetchBookmarks } from "../services/Handleapi";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Userpost from "../Components/Userpost";
const Bookmarks = () => {
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await handleFetchBookmarks();
        setBookmarkedPosts(response || []);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
        toast.error("Failed to fetch bookmarks.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Bookmarked Posts
      </h1>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading bookmarks...</p>
      ) : bookmarkedPosts.length > 0 ? (
        <Userpost posts={bookmarkedPosts} />
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
