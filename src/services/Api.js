import axios from "axios";
import { toast } from "react-toastify";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercept requests to include the access token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("AccessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercept responses to handle token expiration and invalid tokens
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    // Handle token expired or invalid (401)
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Prevent infinite retry loops
      originalRequest._retry = true;

      // Clear the invalid token
      localStorage.removeItem("AccessToken");

      // Show error message
      toast.error("Your session has expired. Please log in again.");

      // Redirect to login page
      // Use window.location.replace() to prevent back navigation to protected pages
      setTimeout(() => {
        window.location.replace("/login");
      }, 1000); // Small delay to allow toast to be seen

      return Promise.reject(error);
    }

    // Handle other errors
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        "An unexpected error occurred";
      toast.error(errorMessage);
    } else if (error.request) {
      toast.error("No response received from server. Please try again.");
    } else {
      toast.error("An error occurred. Please try again.");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
