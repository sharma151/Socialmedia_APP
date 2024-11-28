import { handleUpdateAvatar } from "../services/Handleapi";
import { IoIosCamera } from "react-icons/io";
import { toast } from "react-toastify";
import "../Styles/Updateavatar.scss";

const Updateavatar = ({ onUpdate }) => {
  
  const handleUpdateAvatarFileChange = async (e) => {
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);

    try {
      const response = await handleUpdateAvatar(formData);
      if (response) {
        toast.success("Avatar updated successfully", response.data);
        if (onUpdate) {
          onUpdate();
        }
      } else {
        toast.error("Failed to Update coverimage. Try again.");
      }
    } catch (error) {
      toast.error("Error updating avatar", error);
    }
  };

  return (
    <div className="updateavatar">
      <input
        type="file"
        id="updateavatar"
        accept="image/*"
        onChange={handleUpdateAvatarFileChange}
        style={{ display: "none" }}
      />
      <label htmlFor="updateavatar">
        <IoIosCamera size={25} />
      </label>
    </div>
  );
};

export default Updateavatar;
