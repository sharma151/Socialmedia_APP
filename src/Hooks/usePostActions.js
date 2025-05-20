// hooks/usePostActions.js
import { toast } from "react-toastify";
import {
  handleSetBookmarks,
  HandleDeletePost,
  handleLikePost,
  // handleFetchallPost,
} from "@/services/Handleapi";

const usePostActions = (
  posts,
  setUserposts,
  selectedPost,
  setSelectedPost,
  onDeleteSuccess
) => {
  const handleLikePostSubmit = async (_id) => {
    try {
      const response = await handleLikePost(_id);

      setUserposts((prevPosts) =>
        prevPosts.map((post) => {
          if (post._id === _id) {
            return {
              ...post,
              isLiked: response.isLiked,
              likes: response.isLiked ? post.likes + 1 : post.likes - 1,
            };
          }
          return post;
        })
      );

      if (selectedPost && selectedPost._id === _id) {
        setSelectedPost((prev) => ({
          ...prev,
          isLiked: response.isLiked,
          likes: response.isLiked ? prev.likes + 1 : prev.likes - 1,
        }));
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleBookmarkClick = async (_id) => {
    try {
      const response = await handleSetBookmarks(_id);
      const updatedPosts = posts.map((post) => {
        if (post?._id === _id) {
          return {
            ...post,
            isBookmarked: response?.isBookmarked,
          };
        }
        return post;
      });

      setUserposts(updatedPosts);

      if (selectedPost && selectedPost._id === _id) {
        setSelectedPost((prev) => ({
          ...prev,
          isBookmarked: response?.isBookmarked,
        }));
      }

      toast.success(
        response?.isBookmarked ? "Bookmarked Successfully" : "Bookmark Removed"
      );
    } catch (error) {
      console.error("Error handling bookmarks:", error);
    }
  };

  const handleDeletePostSubmit = async (_id) => {
    try {
      const response = await HandleDeletePost(_id);
      if (response === 200) {
        toast.success("Post deleted successfully");
        onDeleteSuccess();
        // setUserposts((prevPosts) =>
        //   prevPosts.filter((post) => post._id !== _id)
        // );
        // handleFetchallPost();
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete the post.");
    }
  };

  return {
    handleLikePostSubmit,
    handleBookmarkClick,
    handleDeletePostSubmit,
  };
};

export default usePostActions;
