import { useState } from "react";
import { IoImages } from "react-icons/io5";
import { toast } from "react-toastify";
import { useCreatePost } from "@/core/Hooks/Api/userData"; // path may vary

const Createpost = ({ className, onUpdate }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const createPost = useCreatePost();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(file ? URL.createObjectURL(file) : null);
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
      setImage(null);
      setPreviewImage(null);
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
          placeholder="What's on your mind?"
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
            <div className="w-full rounded-md overflow-hidden border border-gray-600 mt-2">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-60 object-cover"
              />
            </div>
          )}

          <button
            type="submit"
            className="ml-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
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
