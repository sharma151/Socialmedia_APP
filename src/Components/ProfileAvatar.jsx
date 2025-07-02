// eslint-disable-next-line import/no-unresolved
import Updateavatar from "@/Components/Updateavatar";
import React, { useContext } from "react";
import { LoggedinUserProfileData } from "@/Context/UpdateProfileContext";

const ProfileAvatar = ({ avatarUrl, name, username, userData }) => {
  const { loggedinUserprofileData } = useContext(LoggedinUserProfileData);
  return (
    <div className="relative flex flex-col sm:flex-row items-center sm:items-end sm:space-x-4 px-4 sm:px-8 -mt-16 sm:-mt-20">
      {/* Outer wrapper without overflow-hidden */}
      <div className="relative w-32 h-32 sm:w-36 sm:h-36">
        {/* Avatar image inside a rounded container */}
        <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-900">
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Camera icon positioned slightly outside top-right */}
        {(!userData || userData._id === loggedinUserprofileData?._id) && (
          <div className="absolute bottom-2 right-2">
            <Updateavatar />
          </div>
        )}
      </div>

      {/* Name and username */}
      <div className="mt-4 sm:mt-0 text-center sm:text-left">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {name}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">{username}</p>
      </div>
    </div>
  );
};

export default ProfileAvatar;
