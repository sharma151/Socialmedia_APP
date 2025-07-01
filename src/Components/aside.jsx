import { LoggedinUserProfileData } from "@/Context/UpdateProfileContext";
import { GoProjectSymlink } from "react-icons/go";
import { BsBookmarksFill } from "react-icons/bs";
import { SiYoutubemusic } from "react-icons/si";
import { MdEmojiEvents, MdGroups } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { FaGlobeAsia } from "react-icons/fa";
import { useContext } from "react";

const Aside = ({ className }) => {
  const { loggedinUserprofileData } = useContext(LoggedinUserProfileData);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile-page");
  };

  const baseItemClass =
    "flex items-center gap-2 p-2 m-1 rounded-md text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer";

  return (
    <div className={`w-max ${className}`}>
      {/* Profile Section */}
      <div className={`${baseItemClass}`} onClick={handleProfileClick}>
        <div className="w-10 h-10 rounded-full overflow-hidden">
          {loggedinUserprofileData?.account?.avatar?.url && (
            <img
              src={loggedinUserprofileData?.account.avatar.url}
              alt="Profile Avatar"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="flex gap-2 text-sm font-normal font-sans">
          <p>{loggedinUserprofileData?.firstName}</p>
          <p>{loggedinUserprofileData?.lastName}</p>
        </div>
      </div>

      {/* Saved Bookmarks */}
      <Link to="/Bookmarks" className={`${baseItemClass} no-underline`}>
        <BsBookmarksFill size={25} />
        <p className="text-sm font-sans pt-0.5">Saved</p>
      </Link>

      {/* Groups */}
      <div className={baseItemClass}>
        <MdGroups size={25} />
        <p className="text-sm font-sans pt-0.5">Groups</p>
      </div>

      {/* Website */}
      <div className={baseItemClass}>
        <FaGlobeAsia size={25} />
        <a
          href="http://sauravsharma.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline text-black dark:text-white"
        >
          <p className="text-sm font-sans pt-0.5">Website</p>
        </a>
      </div>

      {/* Projects */}
      <div className={baseItemClass}>
        <GoProjectSymlink size={25} />
        <a
          href="https://yodorawebsite.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline text-black dark:text-white"
        >
          <p className="text-sm font-sans pt-0.5">Projects</p>
        </a>
      </div>

      {/* Youtube Music */}
      <div className={baseItemClass}>
        <SiYoutubemusic size={25} />
        <a
          href="https://music.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline text-black dark:text-white"
        >
          <p className="text-sm font-sans pt-0.5">Youtube Music</p>
        </a>
      </div>

      {/* Events */}
      <div className={baseItemClass}>
        <MdEmojiEvents size={25} />
        <a
          href="https://music.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline text-black dark:text-white"
        >
          <p className="text-sm font-sans pt-0.5">Events</p>
        </a>
      </div>
    </div>
  );
};

export default Aside;
