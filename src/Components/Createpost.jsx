import { useState, useRef, useContext } from "react";
import { IoImages, IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { useCreatePost } from "@/core/Hooks/Api/userData"; // path may vary
import { LoggedinUserProfileData } from "@/Context/UpdateProfileContext";

const Createpost = ({ className, onUpdate }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const { loggedinUserprofileData } = useContext(LoggedinUserProfileData);
  const { username } = loggedinUserprofileData?.account || {};
  const createPost = useCreatePost();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (!image || !content) {
      toast.warn("Both an image and a caption are required.");
      return;
    }

    const formData = new FormData();
    formData.append("images", image);
    formData.append("content", content);

    try {
      await createPost.mutateAsync(formData);
      setContent("");
      handleRemoveImage();
      if (onUpdate) onUpdate();
    } catch (err) {
      // handled in useMutation onError
    }
  };

  return (
    <div
      className={`Create-posts ${className} bg-[#242526] text-white rounded-lg p-4 shadow-md`}
    >
      <h2 className="text-lg font-semibold mb-3">Create a Post</h2>
      <form onSubmit={handlePostSubmit} className="space-y-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`What's on your mind ? ${username}`}
          rows="3"
          required
          className="w-full bg-[#3A3B3C] text-white p-3 rounded-md resize-none outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <input
              type="file"
              id="input"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <label
              htmlFor="input"
              className="cursor-pointer text-blue-400 hover:text-blue-300 text-xl"
              title="Add Photo"
            >
              <IoImages />
            </label>
          </div>

          {previewImage && (
            <div className="relative w-full mt-2 max-w-[120px]">
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-80 text-xs cursor-pointer"
                aria-label="Remove Preview"
              >
                <IoClose size={16} />
              </button>
              <img
                src={previewImage}
                alt="Preview"
                className="w-[120px] h-[120px] rounded-md object-cover border border-gray-300"
              />
            </div>
          )}

          <button
            type="submit"
            className="ml-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            disabled={createPost.isPending}
          >
            {createPost.isPending ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Createpost;
