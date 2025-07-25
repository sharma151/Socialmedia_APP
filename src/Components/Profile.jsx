import { LoggedinUserProfileData } from "@/Context/UpdateProfileContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { loggedinUserprofileData } = useContext(LoggedinUserProfileData);

  return (
    <Link to="/profile-page">
      <div className="relative bg-white dark:bg-neutral-900 rounded-xl shadow-md pt-16 pb-6 px-4 text-center text-black dark:text-white mb-3">
        {loggedinUserprofileData?.account?.avatar?.url && (
          <img
            src={loggedinUserprofileData?.account?.avatar?.url}
            alt={`${loggedinUserprofileData?.firstName} ${loggedinUserprofileData?.lastName}`}
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 h-20 w-20 rounded-full border-4 border-white dark:border-neutral-900 object-cover aspect-square shadow-md"
          />
        )}

        <div className="mt-4 space-y-1">
          <h2 className="text-lg md:text-xl font-semibold truncate">
            {loggedinUserprofileData?.firstName || "John"}{" "}
            {loggedinUserprofileData?.lastName || "Doe"}
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 line-clamp-2">
            {loggedinUserprofileData?.bio?.trim() || "No bio available."}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Profile;
