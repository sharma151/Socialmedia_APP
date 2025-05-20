import { handleUpdateCoverImage } from "@/services/Handleapi";
import { IoIosCamera } from "react-icons/io";
import { toast } from "react-toastify";

const UpdateCoverPage = ({ onUpdate, className = "" }) => {
  const handleFileChange = async (e) => {
    const formData = new FormData();
    formData.append("coverImage", e.target.files[0]);

    try {
      const response = await handleUpdateCoverImage(formData);
      if (response) {
        toast.success("Cover image updated successfully");
        onUpdate?.();
      } else {
        toast.error("Failed to update cover image. Try again.");
      }
    } catch {
      toast.error("Error updating cover image");
    }
  };

  return (
    <div className={`absolute bottom-4 right-4 z-10 ${className}`}>
      <input
        type="file"
        accept="image/*"
        id="Updatecover"
        onChange={handleFileChange}
        className="hidden"
      />
      <label
        htmlFor="Updatecover"
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-sm font-medium text-gray-800 dark:text-gray-200 transition-all"
        title="Edit Cover Photo"
      >
        <IoIosCamera className="text-lg" />
        Edit cover photo
      </label>
    </div>
  );
};

export default UpdateCoverPage;
