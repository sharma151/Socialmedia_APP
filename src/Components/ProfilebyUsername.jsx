import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Userpost from "@/Components/Userpost";
import CoverImage from "@/Components/CoverImage";
import ProfileAvatar from "@/Components/ProfileAvatar";
import ProfileDetail from "@/Components/Profiledetail";
import { useUserProfile } from "@/core/Hooks/Api/userData";
import { useUserPosts } from "@/core/Hooks/Api/userData";

const GetProfileByUsername = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const {
    data: searchedUserData,
    isError: isUserError,
    error: userError,
  } = useUserProfile(username);

  const {
    data: searchedUserNamePost,
    isError: isPostsError,
    error: postsError,
  } = useUserPosts(username);

  // Error handling and redirection
  if (isUserError) {
    if (userError?.response?.data?.statusCode === 404) {
      navigate("/usernotfound");
    } else {
      toast.error(`Error fetching user data: ${userError.message}`);
    }
  }

  if (isPostsError) {
    if (postsError?.response?.data?.statusCode === 404) {
      navigate("/usernotfound");
    } else {
      toast.error(`Error fetching posts: ${postsError.message}`);
    }
  }

  return (
    <div className="ProfilePage">
      <div className="bg-gray-100 dark:bg-gray-800 pb-6">
        <CoverImage
          coverImageUrl={searchedUserData?.coverImage?.url}
          userData={searchedUserData}
        />
        <div className="relative max-w-6xl mx-auto -mt-20 px-4 sm:px-6 lg:px-8">
          <ProfileAvatar
            avatarUrl={searchedUserData?.account?.avatar?.url}
            name={`${searchedUserData?.firstName || ""} ${
              searchedUserData?.lastName || ""
            }`}
            username={searchedUserData?.account?.username || ""}
            userData={searchedUserData}
          />
        </div>
      </div>

      <div className="profilepage-body max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/5">
            <ProfileDetail UserprofileData={searchedUserData} />
          </div>
          <div className="w-full lg:w-3/5">
            <Userpost
              className="Getmyposts"
              onUpdate={() => {}}
              posts={searchedUserNamePost}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetProfileByUsername;
