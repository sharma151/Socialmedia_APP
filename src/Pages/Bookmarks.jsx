// import { AuthContext } from "../Context/Authcontext";
// import { useContext } from "react";
import { useState, useEffect } from "react";
import Userpost from "../Components/Userpost";
import "../Styles/Bookmarks.scss";
import { toast } from "react-toastify";
import { handleFetchBookmarks } from "../services/Handleapi";

const Bookmarks = () => {
  // const { bookmarks } = useContext(AuthContext);

  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await handleFetchBookmarks();
        setBookmarkedPosts(response);

        console.log(response);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
        toast.error("Failed to fetch bookmarks.");
      }
    };

    fetchBookmarks();
  }, []);

  return (
    <>
      <Userpost posts={bookmarkedPosts} />
    </>
  );
};

export default Bookmarks;
