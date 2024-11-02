import Userpost from "../Components/Userpost";
import { useContext } from "react";
import { AuthContext } from "../Context/Authcontext";
import "../Styles/Bookmarks.scss";

const Bookmarks = () => {
  const { bookmarks } = useContext(AuthContext);
  console.log(bookmarks);
  return (
    <div>
      <h6>Bookmarks</h6>
      {bookmarks ? (
        <Userpost posts={bookmarks} />
      ) : (
        <p>Error Fetching Bookmarks</p>
      )}
    </div>
  );
};

export default Bookmarks;
