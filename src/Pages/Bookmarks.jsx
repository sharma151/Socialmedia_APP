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
    // <div>
    //   <h6>Bookmarks</h6>
    //   {bookmarks ? (
    //     <Userpost posts={bookmarks} />
    //   ) : (
    //     <p>Error Fetching Bookmarks</p>
    //   )}
    // </div>
    <>
      <Userpost posts={bookmarkedPosts} />
    </>
  );
};

export default Bookmarks;
