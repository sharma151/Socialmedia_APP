import { toast } from "react-toastify";
import apiClient from "@/services/Api";

export const Handlelogin = async (formData) => {
  try {
    const response = await apiClient.post("/users/login", formData);

    return response?.data?.data;
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
    return response;
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
