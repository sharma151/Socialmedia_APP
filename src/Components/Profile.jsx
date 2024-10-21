import { useState, useEffect } from "react";
import axios from "../services/Api";
import "../Styles/Profile.scss";
import { Link } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState({
    avatar: "",
    bio: "",
    countryCode: "",
    dob: "",
    firstName: "",
    lastName: "",
    location: "",
    phoneNumber: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/social-media/profile");
        setProfile(response?.data?.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setErrorMessage("Error fetching profile data.");
      }
    };
    fetchProfile();
  }, []);

  return (
    <Link to={"/profile-page"}>
      <div className="Profile">
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {profile?.account?.avatar?.url && (
          <img
            src={profile?.account?.avatar?.url}
            alt={profile?.posts?.avatar}
            className="avatar"
          />
        )}
        <div className="profile-info">
          <div className="data">
            <div className="name">
              <p>{profile?.firstName}</p>
              <p>{profile.lastName}</p>
            </div>
            <p className="Bio">{profile.bio}</p>
            {/* <p>
            <strong>Date of Birth:</strong>{" "}
            {new Date(profile.dob).toLocaleDateString()}
          </p>
          <p>
            <strong>Location:</strong> {profile.location}
          </p>
          <p>
            <strong>Phone Number:</strong> {profile.countryCode}{" "}
            {profile.phoneNumber}
          </p> */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Profile;
