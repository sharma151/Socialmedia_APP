import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Userpost from "@/Components/Userpost";
import CoverImage from "@/Components/CoverImage";
import ProfileAvatar from "@/Components/ProfileAvatar";

import {
  handleFetchpostByusername,
  handleFetchuserData,
} from "../services/Handleapi";
import ProfileDetail from "./Profiledetail";

const GetProfileByUsername = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [userNamepost, setUserNamePost] = useState([]);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await handleFetchuserData(username);
      if (response) {
        setUserData(response?.data);
      } else {
        navigate("/usernotfound");
      }
    } catch (error) {
      if (error?.response?.data?.statusCode === 404) {
        navigate("/usernotfound");
      } else {
        toast.error(`Error fetching user data: ${error.message}`);
      }
    }
  };

  // console.log("searcheduserdata", userData);

  const fetchpostByUsername = async () => {
    try {
      const response = await handleFetchpostByusername(username);
      if (response) {
        setUserNamePost(response);
      } else {
        navigate("/usernotfound");
      }
    } catch (error) {
      if (error?.response?.data?.statusCode === 404) {
        navigate("/usernotfound");
      } else {
        toast.error("Error fetching user data:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchpostByUsername();
  }, [username]);

  return (
    <>
      <div className="ProfilePage">
        <div className="bg-gray-100 dark:bg-gray-800 pb-6">
          <CoverImage
            coverImageUrl={userData?.coverImage?.url || ""}
            onUpdate={() => fetchProfile()}
            userData={userData}
          />
          <div className="relative max-w-6xl mx-auto -mt-20 px-4 sm:px-6 lg:px-8">
            <ProfileAvatar
              avatarUrl={userData?.account?.avatar?.url || ""}
              name={`${userData?.firstName || ""} ${userData?.lastName || ""}`}
              username={userData?.account?.username || ""}
              onUpdate={() => fetchProfile()}
            />
          </div>
        </div>

        <div className="profilepage-body max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Profile Detail - Left 2/5 on large screens */}
            <div className="w-full lg:w-2/5">
              <ProfileDetail UserprofileData={userData} />
            </div>

            {/* User Posts - Right 3/5 on large screens */}
            <div className="w-full lg:w-3/5">
              <Userpost
                className="Getmyposts"
                onUpdate={() => fetchMyPosts()}
                posts={userNamepost}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetProfileByUsername;
