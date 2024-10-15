import { useState, useEffect } from "react";
import axios from "../services/Api";

const Profile = () => {
  const [profile, setProfile] = useState({
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
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setErrorMessage("Error fetching profile data.");
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="Profile">
      <h2>User Profile</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div className="profile-info">
        <p>
          <strong>First Name:</strong> {profile.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {profile.lastName}
        </p>
        <p>
          <strong>Bio:</strong> {profile.bio}
        </p>
        <p>
          <strong>Date of Birth:</strong>{" "}
          {new Date(profile.dob).toLocaleDateString()}
        </p>
        <p>
          <strong>Location:</strong> {profile.location}
        </p>
        <p>
          <strong>Phone Number:</strong> {profile.countryCode}{" "}
          {profile.phoneNumber}
        </p>
      </div>
    </div>
  );
};

export default Profile;
