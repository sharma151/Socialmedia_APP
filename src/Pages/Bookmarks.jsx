import { handleFetchBookmarks } from "../services/Handleapi";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Userpost from "../Components/Userpost";
import "../Styles/Sass/Pages/Bookmarks.scss";
const Bookmarks = () => {


  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await handleFetchBookmarks();
        console.log(response);
        setBookmarkedPosts(response);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
        toast.error("Failed to fetch bookmarks.");
      }
    };

    fetchBookmarks();
  }, []);

  return (
    <>
      <Userpost posts={bookmarkedPosts} className="Bookmarks-posts" />
    </>
  );
};

export default Bookmarks;
