import { FaBirthdayCake, FaUserAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { IoCall } from "react-icons/io5";
import { toast } from "react-toastify";
import Userpost from "../Components/Userpost";
import "../Styles/ProfilePage.scss";
import {
  handleFetchpostByusername,
  handleFetchuserData,
} from "../services/Handleapi";

const GetProfileByUsername = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [userNamepost, setUserNamePost] = useState([]);

  const fetchUserData = async () => {
    try {
      const response = await handleFetchuserData(username);
      setUserData(response);
    } catch (error) {
      toast.error("Error fetching user data:", error);
    }
  };

  const fetchpostByUsername = async () => {
    try {
      const response = await handleFetchpostByusername(username);
      setUserNamePost(response);
    } catch (error) {
      toast.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchpostByUsername();
  }, [username]);

  return (
    <div className="ProfilePage">
      <div className="Images">
        {userData?.data?.coverImage?.url && (
          <img
            key={userData?.id}
            src={userData?.data?.coverImage?.url}
            alt={userData?.data?.coverImage}
            className="coverimage"
          />
        )}

        {userData?.data?.account?.avatar?.url && (
          <img
            src={userData?.data?.account?.avatar?.url}
            alt={userData?.data?.account?.avatar}
            className="avatar"
          />
        )}

        <div className="Name">
          <h1>{userData?.data?.account?.username}</h1>
          <p> {userData?.data?.firstName}</p>
          <p> {userData?.data?.lastName}</p>
        </div>
      </div>

      <div className="profile-info">
        <div className="data">
          <p className="Bio">
            <FaUserAlt /> {userData?.data?.bio}
          </p>
          <p className="DOB">
            {/* <strong>Date of Birth:</strong> */}
            <FaBirthdayCake />{" "}
            {new Date(userData?.data?.dob).toLocaleDateString()}
          </p>
          <p className="Location">
            <FaLocationDot /> {userData?.data?.location}
          </p>
          <p className="Phonenumber">
            <IoCall /> {userData?.data?.countryCode}{" "}
            {userData?.data?.phoneNumber}
          </p>
        </div>
      </div>

      <Userpost posts={userNamepost} className="GetuserprofilebyUsername" />
    </div>
  );
};

export default GetProfileByUsername;
