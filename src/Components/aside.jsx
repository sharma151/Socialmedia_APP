import { UpdatedataContext } from "../Context/UpdateProfileContext";
import { GoProjectSymlink } from "react-icons/go";
import { BsBookmarksFill } from "react-icons/bs";
import { SiYoutubemusic } from "react-icons/si";
import { MdEmojiEvents } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaGlobeAsia } from "react-icons/fa";
import { useContext } from "react";
import { MdGroups } from "react-icons/md";
import { Link } from "react-router-dom";


const aside = ({ className }) => {
  const { UserprofileData } = useContext(UpdatedataContext);

  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate(`/profile-page`);
  };
  return (
    <>
      <div className={`aside ${className}`}>
        <div
          className="profile"
          onClick={() => handleProfileClick()}
          style={{ cursor: "pointer" }}
        >
          <div className="profileimg">
            {UserprofileData?.account?.avatar?.url && (
              <img
                src={UserprofileData?.account?.avatar?.url}
                alt={UserprofileData?.posts?.avatar}
              />
            )}
          </div>
          <div className="Name">
            <p> {UserprofileData?.firstName}</p>
            <p> {UserprofileData?.lastName}</p>
          </div>
        </div>
        <Link to="/Bookmarks" className="bookmarks">
          <BsBookmarksFill size={25} />
          <p>Saved</p>
        </Link>
        <div className="groups">
          <MdGroups size={25} />
          <p>groups</p>
        </div>
        <div className="website" style={{ cursor: "pointer" }}>
          <FaGlobeAsia size={25} />
          <a href="http://sauravsharma.vercel.app" target="_blank">
            <p>Website</p>
          </a>
        </div>
        <div className="projects" style={{ cursor: "pointer" }}>
          <GoProjectSymlink size={25} />
          <a href="https://yodorawebsite.netlify.app/" target="_blank">
            <p>projects</p>
          </a>
        </div>
        <div className="music" style={{ cursor: "pointer" }}>
          <SiYoutubemusic size={25} />
          <a href="https://music.youtube.com/" target="_blank">
            <p>Youtube Music</p>
          </a>
        </div>
        <div className="music" style={{ cursor: "pointer" }}>
          <MdEmojiEvents size={25} />
          <a href="https://music.youtube.com/" target="_blank">
            <p>Events</p>
          </a>
        </div>
      </div>
    </>
  );
};

export default aside;
