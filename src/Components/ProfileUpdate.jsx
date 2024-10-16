import { useState, useEffect } from "react";
import axios from "../services/Api";
import "../Styles/ProfileUpdate.scss";

const ProfileUpdate = () => {
  const [profileData, setProfileData] = useState({
    bio: "",
    countryCode: "",
    dob: "",
    firstName: "",
    lastName: "",
    location: "",
    phoneNumber: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/social-media/profile");
        setProfileData(response.data);
      } catch (error) {
        setErrorMessage("Error fetching profile data.");
        console.error("Error details:", error);
      }
    };
    fetchProfile();
  }, []);

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch("/social-media/profile", profileData);
      if (response.status === 200) {
        setSuccessMessage("Profile updated successfully!");
        setErrorMessage("");
      }
    } catch (error) {
      setErrorMessage("Failed to update profile. Try again.");
      setSuccessMessage("");
      console.error("Error details:", error);
    }
  };

  return (
    <div className="ProfileUpdate">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="fName">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={profileData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="lName">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={profileData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Bio</label>
          <textarea
            name="bio"
            value={profileData.bio}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Country Code</label>
          <input
            type="text"
            name="countryCode"
            value={profileData.countryCode}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={profileData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* <div>
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={new Date(profileData.dob)}
            onChange={handleInputChange}
            required
          />
        </div> */}
        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={profileData.location}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default ProfileUpdate;
