import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../Redux/Postslice";
import { useState } from "react";
import { IoImages } from "react-icons/io5";
import { toast } from "react-toastify";
import "../Styles/Sass/Components/Createpost.scss";

const Createpost = ({ className, onUpdate }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.posts);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
    }
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();

    if (!image || !content) {
      toast.warn("Both an image and a caption are required.");
      return;
    }

    const formData = new FormData();
    formData.append("images", image);
    formData.append("content", content);

    dispatch(createPost(formData))
      .unwrap()
      .then(() => {
        toast.success("Post created successfully!");
        setContent("");
        setImage(null);
        setPreviewImage(null);
        if (onUpdate) onUpdate();
      })
      .catch((error) => {
        toast.error(error || "Failed to create post. Try again.");
      });
  };

  return (
    <div className={`Create-posts ${className}`}>
      <h2>Create a Post</h2>
      <form onSubmit={handlePostSubmit}>
        <div>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            autoComplete="off"
            rows="3"
            required
          />
        </div>
        <div className="input-buttons">
          <input
            type="file"
            id="input"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <label htmlFor="input" className="custom-file-upload">
            <IoImages />
          </label>
          {previewImage && (
            <div className="previewImage">
              <img
                src={previewImage}
                alt="Preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          )}
          <button
            type="submit"
            className="createpost-button"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Createpost;




