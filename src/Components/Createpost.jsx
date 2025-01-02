import { UpdatedataContext } from "../Context/UpdateProfileContext";
import { Handlecreatepost } from "../services/Handleapi";
import { useContext, useState } from "react";
import { IoImages } from "react-icons/io5";
import { toast } from "react-toastify";
import "../Styles/Sass/Components/Createpost.scss";

const Createpost = ({ className, onUpdate }) => {
  const [content, setcontent] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const { UserprofileData } = useContext(UpdatedataContext);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
    }
  };

  const Createposthandlesubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast("Please choose an image.");
      return;
    }
    if (!content) {
      toast("Caption required");
      return;
    }
    const formData = new FormData();
    formData.append("images", image);
    formData.append("content", content);

    try {
      const response = await Handlecreatepost(formData);
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
      <form
        onSubmit={(e) => {
          Createposthandlesubmit(e);
        }}
      >
        <div>
          <textarea
            type="text"
            id="content"
            value={content}
            onChange={(e) => setcontent(e.target.value)}
            placeholder={`What's on your mind, ${UserprofileData?.firstName}?`}
            autoComplete="off"
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
