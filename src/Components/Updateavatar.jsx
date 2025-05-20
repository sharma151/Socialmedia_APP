import { handleUpdateAvatar } from "@/services/Handleapi";
import { IoIosCamera } from "react-icons/io";
import { toast } from "react-toastify";

const Updateavatar = ({ onUpdate }) => {
  const handleUpdateAvatarFileChange = async (e) => {
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);

    try {
      const response = await handleUpdateAvatar(formData);
      if (response) {
        toast.success("Avatar updated successfully");
        if (onUpdate) {
          onUpdate();
        }
      } else {
        toast.error("Failed to update avatar. Try again.");
      }
    } catch (error) {
      toast.error("Error updating avatar");
    }
  };

  return (
    <div className="absolute bottom-0 right-0">
      <input
        type="file"
        id="updateavatar"
        accept="image/*"
        onChange={handleUpdateAvatarFileChange}
        className="hidden"
      />
      <label
        htmlFor="updateavatar"
        className="flex items-center justify-center w-8 h-8 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
      >
        <IoIosCamera className="text-gray-700 dark:text-gray-200 text-lg" />
      </label>
    </div>
  );
};

export default Updateavatar;
