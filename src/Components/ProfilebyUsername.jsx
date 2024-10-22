import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/Api";
import "../Styles/ProfilePage.scss";

const GetProfileByUsername = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/social-media/profile/u/${username}`);
        setUserData(response?.data);
        console.log(response?.data?.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [username]);

  return (
    <div className="ProfilePage">
      {/* {userData ? (
        <div>
          <h1>{userData?.data?.account?.username}</h1>
          <p>{userData?.data?.account?.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )} */}

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
    </div>
  );
};

export default GetProfileByUsername;
