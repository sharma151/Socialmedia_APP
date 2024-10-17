import { useState } from "react";
import axios from "../services/Api";

const Updateavatar = () => {
  const [avatar, setavatarImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setavatarImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!avatar) {
      setMessage("Please select an image file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", avatar);

    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("AccessToken");

      await axios.patch("/users/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("avatar image updated successfully!");
    } catch (error) {
      console.error("Error updating avatar image", error);

      setMessage("Failed to update the avatar image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="updateavatar">
      <form onSubmit={handleSubmit}>
        <div className="input">
          <input
            type="file"
            accept="image/*"
            id="fileInput"
            onChange={handleFileChange}
          />
        </div>

        <button className="button" type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Edit avatar"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Updateavatar;
