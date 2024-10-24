import axios from "../services/Api";
import { IoIosCamera } from "react-icons/io";
import "../Styles/Updateavatar.scss";
import { toast } from "react-toastify";

const Updateavatar = ({ onUpdate }) => {
  const handleFileChange = (e) => {
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);

    const token = localStorage.getItem("AccessToken");
    axios
      .patch("/users/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Avatar updated successfully", response.data);
        toast.success("Avatar updated successfully", response.data);
        if (onUpdate) {
          onUpdate();
        }
      })
      .catch((error) => {
        console.error("Error updating avatar", error);
        toast.error("Error updating avatar", error);
      });
  };

  return (
    <div className="updateavatar">
      <input
        type="file"
        id="updateavatar"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <label htmlFor="updateavatar">
        <IoIosCamera size={25} />
      </label>
    </div>
  );
};

export default Updateavatar;
