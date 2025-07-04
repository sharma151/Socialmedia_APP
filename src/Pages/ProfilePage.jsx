import { LoggedinUserProfileData } from "@/Context/UpdateProfileContext";
import { useContext } from "react";
import Createpost from "@/Components/Createpost";
import Userpost from "@/Components/Userpost";
import ProfileDetail from "../Components/Profiledetail";
import CoverImage from "@/Components/CoverImage";
import ProfileAvatar from "@/Components/ProfileAvatar";
import { useMyPosts, useMyProfile } from "@/core/Hooks/Api/userData";

const ProfilePage = () => {
  // const { loggedinUserprofileData } = useContext(LoggedinUserProfileData);
  // const { firstName, lastName } = loggedinUserprofileData || {};
  const { data: myPosts, isLoading, isError, error } = useMyPosts();
  const { data: myprofile, refetch: fetchProfile } = useMyProfile();

  return (
    <div className="ProfilePage">
      <>
        <div className="bg-gray-100 dark:bg-gray-800 pb-6">
          <CoverImage coverImageUrl={myprofile?.coverImage?.url} />
          <div className="relative max-w-6xl mx-auto -mt-20 px-4 sm:px-6 lg:px-8">
            <ProfileAvatar
              avatarUrl={myprofile?.account?.avatar?.url}
              name={`${myprofile?.firstName || ""} ${myprofile?.lastName || ""}`}
              username={myprofile?.account?.username || ""}
            />
          </div>
        </div>

        {/* Main profile content layout */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Profile Detail */}
          <div className="col-span-1">
            <ProfileDetail UserprofileData={myprofile} />
          </div>

          {/* Right - Create Post & Posts */}
          <div className="col-span-1 lg:col-span-2 space-y-4">
            <Createpost
              className="profilepage-createpost"
              onUpdate={() => fetchMyPosts()}
            />
            <Userpost
              className="Getmyposts"
              onUpdate={() => fetchMyPosts()}
              posts={myPosts}
            />
          </div>
        </div>
      </>
    </div>
  );
};

export default ProfilePage;
