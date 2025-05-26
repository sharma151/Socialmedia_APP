import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { handleFetchallPost } from "@/services/Handleapi";
// import { UsernameContext } from "@/Context/Setusername";
// import { useContext } from "react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Handlecreatepost } from "@/services/Handleapi";
import { HandleDeletePost } from "@/services/Handleapi";
import { handleFetchuserData } from "@/services/Handleapi";
import { handleFetchpostByusername } from "@/services/Handleapi";

export const usePostsByUsername = (username) => {
  return useQuery({
    queryKey: ["posts", "user", username],
    queryFn: () => handleFetchpostByusername(username),
    enabled: !!username, // Only run if username exists
    staleTime: 1000 * 60,
  });
};

export const usePaginatedPosts = () => {
  return useInfiniteQuery({
    queryKey: ["posts", "all"],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await handleFetchallPost(pageParam);
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.length < 10) return undefined; // assuming 10 per page
      return allPages.length + 1;
    },
    enabled: true,
    staleTime: 1000 * 60,
  });
};

// handle Create post hook
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: Handlecreatepost,
    onSuccess: () => {
      toast.success("Post created successfully!");
      queryClient.invalidateQueries({ queryKey: ["posts", "all"] });
      queryClient.invalidateQueries({ queryKey: ["posts", "me"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to create post.");
    },
  });
};

// handle delete post hook

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: HandleDeletePost,
    onSuccess: () => {
      toast.success("Post deleted successfully!");

      // ✅ Refetch both feeds after deletion
      queryClient.invalidateQueries({ queryKey: ["posts", "all"] }); // Home page
      queryClient.invalidateQueries({ queryKey: ["posts", "me"] }); // Profile page
    },
    onError: (error) => {
      toast.error("Failed to delete post.");
    },
  });
};

// handle fetch user data by username
export const useUserProfile = (username) => {
  return useQuery({
    queryKey: ["user-profile", username],
    queryFn: () => handleFetchuserData(username).then((res) => res.data),
    enabled: !!username,
  });
};

// handle fetch user posts by username
export const useUserPosts = (username) => {
  return useQuery({
    queryKey: ["user-posts", username],
    queryFn: () => handleFetchpostByusername(username),
    enabled: !!username,
  });
};
