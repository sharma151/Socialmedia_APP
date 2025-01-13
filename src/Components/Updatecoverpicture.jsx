import { handleUpdateCoverImage } from "../services/Handleapi";
import { IoIosCamera } from "react-icons/io";
import { toast } from "react-toastify";
import "../Styles/Sass/Components/UpdateCoverImage.scss";

const UpdateCoverPage = ({ onUpdate, className }) => {
  
  const handleFileChange = async (e) => {
    const formData = new FormData();
    formData.append("coverImage", e.target.files[0]);
    try {
      const response = await handleUpdateCoverImage(formData);
      if (response) {
        toast.success("Coverpage updated successfully", response?.data);
        if (onUpdate) {
          onUpdate();
        }
      } else {
        toast.error("Failed to Update coverimage. Try again.");
      }
    } catch (error) {
      toast.error("Coverpage updating avatar", error);
    }
  };

  return (
    <div
      className={`updatecoverpage ${className}`}
      style={{ cursor: "pointer" }}
    >
      <input
        type="file"
        accept="image/*"
        id="Updatecover"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <label htmlFor="Updatecover" style={{ cursor: "pointer" }}>
        <IoIosCamera style={{ cursor: "pointer" }} />
        <p>Edit</p>
      </label>
    </div>
  );
};

export default UpdateCoverPage;
