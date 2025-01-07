import axios from "axios";
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

// Intercept responses to handle token refresh
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error is due to an expired token and it's not a retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get the refresh token from localStorage
        const refreshToken = localStorage.getItem("RefreshToken");

        if (!refreshToken) {
          // No refresh token available, handle accordingly
          console.error("No refresh token available");
          return Promise.reject(error);
        }

        // Request a new access token
        const { data } = await axios.post(
          `${import.meta.env.VITE_REACT_APP_API_URL}/users/refresh-token`,
          { token: refreshToken }
        );

        // Store the new access token and retry the failed request
        localStorage.setItem("AccessToken", data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        // Optionally, log the user out or redirect to login
        localStorage.removeItem("AccessToken");
        localStorage.removeItem("RefreshToken");
        return Promise.reject(refreshError);
      }
    }

    // If the error is not due to token expiration or retry fails
    return Promise.reject(error);
  }
);

export default apiClient;
