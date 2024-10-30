import { useState } from "react";
import apiClient from "../services/Api";
import "../Styles/Createpost.scss";
import { IoImages } from "react-icons/io5";
import { toast } from "react-toastify";

const Createpost = ({ className, onUpdate }) => {
  const [content, setcontent] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast("Please choose an image.");
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
        toast.success("Post created successfully!");
        setcontent("");
        setImage(null);
        setPreviewImage(null);
        if (onUpdate) {
          onUpdate();
        }
      } else {
        toast.error("Failed to create post. Try again.");
      }
    } catch (error) {
      toast(
        error.response?.data?.message || "Failed to create post. Try again."
      );
    }
  };

  return (
    <div className={`Create-posts ${className}`}>
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
            id="input"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <label htmlFor="input" className="custom-file-upload">
            <IoImages size={25} />
          </label>
          <div className="previewImage">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <p></p>
            )}
          </div>
          <button type="submit">Post</button>
        </div>
      </form>
    </div>
  );
};

export default Createpost;
