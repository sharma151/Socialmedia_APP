import { useState } from "react";
import axios from "../services/Api";
import { IoIosCamera } from "react-icons/io";
import "../Styles/UpdateCoverImage.scss";

const UpdateCoverPage = () => {
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coverImage) {
      setMessage("Please select an image file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("coverImage", coverImage);

    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("AccessToken");

      await axios.patch("/social-media/profile/cover-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Cover image updated successfully!");
    } catch (error) {
      console.error("Error updating cover image", error);

      setMessage("Failed to update the cover image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="updatecoverpage">
      <form onSubmit={handleSubmit}>
        <div className="input">
          <input
            type="file"
            accept="image/*"
            id="fileInput"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
        <label htmlFor="fileInput" className="custom-file-upload">
          <IoIosCamera size={30} />
        </label>
        <button className="button" type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Edit Cover Photo"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateCoverPage;
