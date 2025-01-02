import apiClient from "./Api";
import { toast } from "react-toastify";

export const Handlecreatepost = async (formData) => {
  try {
    const response = await apiClient.post("/social-media/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    toast.error(error);
  }
};

export const HandleDeletePost = async (_id) => {
  try {
    const response = await apiClient.delete(`/social-media/posts/${_id}`);
    return response?.status;
  } catch (error) {
    toast.error("Failed to delete the post.", error);
  }
};

export const handleFetchmyPost = async () => {
  try {
    const response = await apiClient.get(
      `/social-media/posts/get/my?page=1&limit=100`
    );
    return response?.data?.data?.posts;
  } catch (error) {
    console.log(error);
  }
};

export const handleFetchallPost = async () => {
  try {
    const response = await apiClient.get(
      `/social-media/posts?page=1&limit=100`
    );
    return response?.data?.data?.posts;
  } catch (error) {
    console.log(error);
  }
};

export const handleFetchpostByusername = async (userName) => {
  try {
    const response = await apiClient.get(
      `/social-media/posts/get/u/${userName}?page=1&limit=100`
    );
    return response?.data?.data?.posts;
  } catch (error) {
    console.log(error);
  }
};

export const handleFetchuserData = async (username) => {
  try {
    const response = await apiClient.get(`/social-media/profile/u/${username}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleFetchMyprofile = async () => {
  try {
    const response = await apiClient.get("/social-media/profile");

    return response?.data?.data;
  } catch (error) {
    console.log(error);
    // toast.error(error?.response?.data?.statusCode);
  }
};

export const handleUpdateCoverImage = async (formData) => {
  try {
    const response = await apiClient.patch(
      "/social-media/profile/cover-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const handleUpdateAvatar = async (formData) => {
  try {
    const response = await apiClient.patch("/users/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const handleUpdateProfile = async (profileData) => {
  try {
    const response = await apiClient.patch(
      "/social-media/profile",
      profileData
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const handleLikePost = async (_id) => {
  try {
    const response = await apiClient.post(`/social-media/like/post/${_id}`);

    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleSetBookmarks = async (_id) => {
  try {
    const response = await apiClient.post(`/social-media/bookmarks/${_id}`);
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleFetchBookmarks = async () => {
  try {
    const response = await apiClient.get(
      "/social-media/bookmarks?page=1&limit=100"
    );
    console.log(response);
    return response?.data?.data?.bookmarkedPosts;
  } catch (error) {
    console.log(error);
  }
};

export const handleRandomusers = async () => {
  try {
    const response = await apiClient.get("/public/randomusers");
    return response?.data?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
