import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { handleFetchallPost } from "@/services/Handleapi";
// import { UsernameContext } from "@/Context/Setusername";
// import { useContext } from "react";

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
