import { useDispatch, useSelector } from "react-redux";
import { createPost } from "@/Redux/Postslice";
import { useState } from "react";
import { IoImages } from "react-icons/io5";
import { toast } from "react-toastify";

const Createpost = ({ className, onUpdate }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.posts);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
    }
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();

    if (!image || !content) {
      toast.warn("Both an image and a caption are required.");
      return;
    }

    const formData = new FormData();
    formData.append("images", image);
    formData.append("content", content);

    dispatch(createPost(formData))
      .unwrap()
      .then(() => {
        toast.success("Post created successfully!");
        setContent("");
        setImage(null);
        setPreviewImage(null);
        if (onUpdate) onUpdate();
      })
      .catch((error) => {
        toast.error(error || "Failed to create post. Try again.");
      });
  };

  return (
    <div
      className={`Create-posts ${className} bg-[#242526] text-white rounded-lg p-4  shadow-md `}
    >
      <h2 className="text-lg font-semibold mb-3">Create a Post</h2>
      <form onSubmit={handlePostSubmit} className="space-y-4">
        {/* Textarea */}
        <div>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            autoComplete="off"
            rows="3"
            required
            className="w-full bg-[#3A3B3C] text-white p-3 rounded-md resize-none outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
        </div>

        {/* Image upload, preview, and post button */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          {/* Image Upload */}
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

          {/* Preview Image */}
          {previewImage && (
            <div className="w-full rounded-md overflow-hidden border border-gray-600 mt-2">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-60 object-cover"
              />
            </div>
          )}

          {/* Post Button */}
          <button
            type="submit"
            className="ml-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Createpost;
