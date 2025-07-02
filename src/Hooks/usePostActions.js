import { toast } from "react-toastify";
import {
  handleSetBookmarks,
  HandleDeletePost,
  handleLikePost,
} from "@/services/Handleapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePostActions = () => {
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: handleLikePost,
    onMutate: async (_id) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousPosts = queryClient.getQueryData(["posts"]);
      const previousPost = queryClient.getQueryData(["post", _id]);

      // Optimistically update
      queryClient.setQueriesData(["posts"], (old) =>
        old?.map((post) =>
          post._id === _id
            ? {
                ...post,
                isLiked: !post.isLiked,
                likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              }
            : post
        )
      );

      queryClient.setQueryData(["post", _id], (oldPost) =>
        oldPost
          ? {
              ...oldPost,
              isLiked: !oldPost.isLiked,
              likes: oldPost.isLiked ? oldPost.likes - 1 : oldPost.likes + 1,
            }
          : oldPost
      );

      return { previousPosts, previousPost };
    },
    onError: (err, _id, context) => {
      queryClient.setQueryData(["posts"], context?.previousPosts);
      queryClient.setQueryData(["post", _id], context?.previousPost);
      toast.error("Failed to like post");
    },
    onSuccess: (response) => {
      // Optionally validate or log if needed
    },
  });

  const bookmarkMutation = useMutation({
    mutationFn: handleSetBookmarks,
    onMutate: async (_id) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousPosts = queryClient.getQueryData(["posts"]);
      const previousPost = queryClient.getQueryData(["post", _id]);

      queryClient.setQueriesData(["posts"], (old) =>
        old?.map((post) =>
          post._id === _id
            ? { ...post, isBookmarked: !post.isBookmarked }
            : post
        )
      );

      queryClient.setQueryData(["post", _id], (oldPost) =>
        oldPost ? { ...oldPost, isBookmarked: !oldPost.isBookmarked } : oldPost
      );

      return { previousPosts, previousPost };
    },
    onError: (err, _id, context) => {
      queryClient.setQueryData(["posts"], context?.previousPosts);
      queryClient.setQueryData(["post", _id], context?.previousPost);
      toast.error("Failed to update bookmark");
    },
    onSuccess: (response) => {
      toast.success(
        response?.isBookmarked ? "Bookmarked!" : "Bookmark removed"
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: HandleDeletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["profilePosts"] });
      toast.success("Post deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete post");
    },
  });

  return {
    handleLikePostSubmit: (_id) => likeMutation.mutate(_id),
    handleBookmarkClick: (_id) => bookmarkMutation.mutate(_id),
    handleDeletePostSubmit: (_id) => deleteMutation.mutate(_id),
  };
};

export default usePostActions;
