import { useState } from "react";
import apiClient from "../services/Api";
import "../Styles/Createpost.scss";

const Createpost = () => {
  const [content, setcontent] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setErrorMessage("Please choose an image.");
      return;
    }

    const formData = new FormData();
    formData.append("images", image);
    formData.append("content", content);

    console.log(formData, image, content);

    try {
      const response = await apiClient.post("/social-media/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        setSuccessMessage("Post created successfully!");
        setErrorMessage("");
        setcontent("");
        setImage(null);
      } else {
        setErrorMessage("Failed to create post. Try again.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to create post. Try again."
      );
      setSuccessMessage("");
    }
  };

  return (
    <div className="Create-posts">
      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="content"
            value={content}
            onChange={(e) => setcontent(e.target.value)}
            placeholder="Write something..."
            autoComplete="off"
          />
        </div>
        <div>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Post</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default Createpost;
