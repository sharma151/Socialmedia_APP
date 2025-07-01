import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  Handlecreatepost,
  handleFetchuserData,
  handleFetchpostByusername,
  handleFetchMyPost,
  handleFetchallPost,
  handleFetchMyprofile,
  handleRandomusers,
  handleFetchBookmarks,
  handleUpdateAvatar,
  handleUpdateCoverImage,
  handleUpdateProfile,
} from "@/services/Handleapi";

import { HandleForgotPassword } from "@/services/AuthService";

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

// handle fetch user posts by username
export const useUserPosts = (username, delay = 5000) => {
  return useQuery({
    queryKey: ["user-posts", username],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, delay)); // Debounce here
      return handleFetchpostByusername(username);
    },
    enabled: !!username,
  });
};

// handle fetch all posts
export const useAllPosts = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["posts", "all", page, limit],
    queryFn: async () => {
      const response = await handleFetchallPost();

      // Sort posts by latest (newest first)
      const sortedPosts = response.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      return sortedPosts;
    },
    keepPreviousData: true,
  });
};

// handle fetch My posts
export const useMyPosts = () => {
  return useQuery({
    queryKey: ["posts", "me"],
    queryFn: async () => {
      const response = await handleFetchMyPost();
      const sortedPosts = response.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      return sortedPosts;
    },
  });
};

//handle fetch my profile
export const useMyProfile = () => {
  return useQuery({
    queryKey: ["my-profile"],
    queryFn: handleFetchMyprofile,
    staleTime: 1000 * 60, // 1 minute
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

//handle fetch Bookmarked posts
export const useBookmarkedPosts = () => {
  return useQuery({
    queryKey: ["bookmarked-posts"],
    queryFn: handleFetchBookmarks,
    staleTime: 1000 * 60 * 5, // 5 minutes
    onError: (error) => {
      toast.error(`Failed to load bookmarked posts: ${error.message}`);
    },
  });
};

//handle update profile avatar
export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleUpdateAvatar,

    onSuccess: (data) => {
      toast.success("Avatar updated successfully!");

      // Optionally refetch or invalidate user profile cache
      queryClient.invalidateQueries({
        queryKey: ["my-profile"], // Replace with your actual key
      });
    },

    onError: (error) => {
      console.error("Error updating avatar:", error);
      toast.error("Failed to update avatar. Please try again.");
    },
  });
};

//handle update cover image
export const useUpdateCoverImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleUpdateCoverImage,

    onSuccess: (data) => {
      toast.success("Cover image updated successfully!");

      // Optionally refetch or invalidate user profile cache
      queryClient.invalidateQueries({
        queryKey: ["my-profile"], // Replace with your actual key
      });
    },

    onError: (error) => {
      console.error("Error updating cover image:", error);
      toast.error("Failed to update cover image. Please try again.");
    },
  });
};

//handle fetch Random user profile
export const useRandomUserProfile = () => {
  return useQuery({
    queryKey: ["random-user-profile"],
    queryFn: handleRandomusers,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

//handle forgot password
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: HandleForgotPassword,
  });
};

// handle update profile
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleUpdateProfile,
    onSuccess: (data) => {
      // Optional: Show a success toast, refetch profile data, etc.
      console.log("Profile updated successfully", data);
      queryClient.invalidateQueries({
        queryKey: ["my-profile"], // Replace with your actual key
      });
    },
    onError: (error) => {
      // Optional: Show an error toast
      console.error("Failed to update profile:", error);
    },
  });
};
