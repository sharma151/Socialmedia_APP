import axios from "../services/Api";
import { IoIosCamera } from "react-icons/io";
import "../Styles/UpdateCoverImage.scss";

const UpdateCoverPage = () => {
  const handleFileChange = (e) => {
    const formData = new FormData();
    formData.append("coverImage", e.target.files[0]);

    const token = localStorage.getItem("AccessToken");

    axios
      .patch("/social-media/profile/cover-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Avatar updated successfully", response.data);
      })
      .catch((error) => {
        console.error("Error updating avatar", error);
      });
  };

  return (
    <div className="updatecoverpage">
      <input
        type="file"
        accept="image/*"
        id="Updatecover"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <label htmlFor="Updatecover">
        <IoIosCamera size={30} />
        <p>Update CoverPage</p>
      </label>
    </div>
  );
};

export default UpdateCoverPage;
