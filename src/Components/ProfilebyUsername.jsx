import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/Api";
import "../Styles/ProfilePage.scss";
import { FaBirthdayCake, FaUserAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import Userpost from "../Components/Userpost";
import { toast } from "react-toastify";

const GetProfileByUsername = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [userNamepost, setUserNamePost] = useState([]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/social-media/profile/u/${username}`);
      setUserData(response?.data);
    } catch (error) {
      toast.error("Error fetching user data:", error);
    }
  };

  const fetchpostByUsername = async () => {
    try {
      const response = await axios.get(
        `/social-media/posts/get/u/${username}?page=1&limit=100`
      );
      setUserNamePost(response?.data?.data?.posts);
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
