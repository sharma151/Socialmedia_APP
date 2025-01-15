import { useEffect, useState, useContext } from "react";
import { FaBirthdayCake, FaUserAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IoCall } from "react-icons/io5";
import { toast } from "react-toastify";
import Userpost from "../Components/Userpost";

import {
  handleFetchpostByusername,
  handleFetchuserData,
} from "../services/Handleapi";

const GetProfileByUsername = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [userNamepost, setUserNamePost] = useState([]);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await handleFetchuserData(username);
      if (response) {
        setUserData(response);
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
        <div className="Images">
          <div
            className="coverimage"
            style={{
              backgroundImage: `url(${userData?.data?.coverImage?.url || ""})`,
              backgroundSize: "100% 100%",
              overflow: "hidden",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>

          <div className="avatar_name">
            <div
              className="avatar"
              style={{
                backgroundImage: `url(${
                  userData?.data?.account?.avatar?.url || ""
                })`,
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="Name">
              <p>
                {" "}
                {userData?.data?.firstName}
                {userData?.data?.lastName}
              </p>

              <h1>{userData?.data?.account?.username}</h1>
            </div>
          </div>
        </div>
        <div className="profilepage-body">
          <div className="profilepage-info">
            <h4>Profile Details</h4>
            <div className="data">
              <div className="Bio">
                <span>
                  <FaUserAlt className="Bio-icon" />
                </span>{" "}
                {userData?.data?.bio}
              </div>
              <div className="DOB">
                <span className="birthday-icon">
                  <FaBirthdayCake />
                </span>{" "}
                {new Date(userData?.data?.dob).toLocaleDateString()}
              </div>
              <div className="Location">
                <span className="location-icon">
                  <FaLocationDot />{" "}
                </span>
                {userData?.data?.location}
              </div>
              <div className="Phonenumber">
                <span className="phone">
                  <IoCall />{" "}
                </span>
                {userData?.data?.countryCode} {userData?.data?.phoneNumber}
              </div>
            </div>
          </div>

          <Userpost
            className="Getmyposts"
            onUpdate={() => fetchMyPosts()}
            posts={userNamepost}
          />
        </div>
      </div>
    </>
  );
};

export default GetProfileByUsername;
