import { IoIosCamera } from "react-icons/io";
import { useUpdateAvatar } from "@/core/Hooks/Api/userData";

const Updateavatar = ({ onUpdate }) => {
  const { mutate: updateAvatar, isPending } = useUpdateAvatar();

  const handleUpdateAvatarFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    updateAvatar(formData);
  };

  return (
    <div className="absolute bottom-0 right-0">
      <input
        type="file"
        id="updateavatar"
        accept="image/*"
        onChange={handleUpdateAvatarFileChange}
        className="hidden"
        disabled={isPending}
      />
      <label
        htmlFor="updateavatar"
        className={`flex items-center justify-center w-8 h-8 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer ${
          isPending ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <IoIosCamera className="text-gray-700 dark:text-gray-200 text-lg" />
      </label>
    </div>
  );
};

export default Updateavatar;
