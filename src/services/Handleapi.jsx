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
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const handleFetchallPost = async () => {
  try {
    const response = await apiClient.get(
      `/social-media/posts?page=1&limit=100`
    );
    return response;
  } catch (erro) {
    console.log(error);
  }
};

export const handleFetchpostByusername = async (userName) => {
  try {
    const response = await apiClient.get(
      `/social-media/posts/get/u/${userName}?page=1&limit=100`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const handleFetchuserData = async (username) => {
  try {
    const response = await apiClient.get(`/social-media/profile/u/${username}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const handleFetchMyprofile = async () => {
  try {
    const response = await apiClient.get("/social-media/profile");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const handleUpdateCoverImage = async (formData) => {
  try {
    const response = apiClient.patch(
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
  {
  }
};
