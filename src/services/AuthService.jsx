import apiClient from "./Api";
import { toast } from "react-toastify";

export const Handlelogin = async (formData) => {
  try {
    console.log("Sending login", formData);
    const response = await apiClient.post("/users/login", formData);
    console.log("Login response:", response?.data?.data?.accessToken);
    return response?.data?.data?.accessToken;
  } catch (error) {
    toast.error(
      error.response?.data?.message || error.message,
      "Login failed. Please try again."
    );
  }
};

export const Handleregister = async (formData) => {
  try {
    const response = await apiClient.post(
      "http://localhost:8080/api/v1/users/register",
      formData
    );
    return response?.data?.message;
  } catch (error) {
    toast.error("Network error or server is down", error);
  }
};

export const Handlelogout = async () => {
  try {
    const response = await apiClient.post(`/users/logout`);
    return response;
  } catch (error) {
    toast.error("Failed to logout User. Please try again later.", error);
  }
};
