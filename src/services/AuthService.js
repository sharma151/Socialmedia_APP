import apiClient from "../services/Api";
import { toast } from "react-toastify";

export const Loginhandlesubmit = async (
  e,
  formData,
  setIsAuthenticated,
  navigate,
  validateForm
) => {
  e.preventDefault();
  if (validateForm()) {
    try {
      const response = await apiClient.post(
        "http://localhost:8080/api/v1/users/login",
        formData
      );
      toast.success("Login Successful", response.data);
      localStorage.setItem("AccessToken", response?.data?.data?.accessToken);
      setIsAuthenticated(true);
      navigate("/home");
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response?.data?.message || "Error during registration";
        toast.error(errorMessage);
      } else {
        toast.error("Network error or server is down");
      }
    }
  }
};

export const Registerhandlesubmit = async (e, formData,validateForm) => {
  e.preventDefault();
  if (validateForm()) {
    try {
      const response = await apiClient.post(
        "http://localhost:8080/api/v1/users/register",
        formData
      );
      toast("Registration Successful", response?.data);
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response?.data?.message || "Error during registration";

        toast.error(errorMessage);
      } else {
        toast.error("Network error or server is down");
      }
    }
  }
};
