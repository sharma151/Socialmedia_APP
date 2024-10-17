import { useState } from "react";
import axios from "../services/Api";
import "../Styles/ProfileUpdate.scss";
import { toast } from "react-toastify";
import { IoIosCloseCircleOutline } from "react-icons/io";

const ProfileUpdate = ({ closeModal, currentProfile }) => {
  const [profileData, setProfileData] = useState({
    bio: currentProfile?.bio || "",
    countryCode: currentProfile?.countryCode || "",
    dob: currentProfile?.dob || "",
    firstName: currentProfile?.firstName || "",
    lastName: currentProfile?.lastName || "",
    location: currentProfile?.location || "",
    phoneNumber: currentProfile?.phoneNumber || "",
  });

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
        toast("Profile updated successfully!");
      }
    } catch (error) {
      toast("Failed to update profile. Try again.");

      console.error("Error details:", error);
    }
  };

  return (
    <>
      <div className="wrapper" onClick={closeModal}></div>
      <div className="ProfileUpdate">
        <div className="head">
          <h2>Update Profile</h2>
          <button id="close" onClick={closeModal}></button>
          <label htmlFor="close">
            <IoIosCloseCircleOutline size={35} />
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="Name">
            <div className="fName">
              <label>First Name : </label>
              <input
                type="text"
                name="firstName"
                value={profileData.firstName}
                onChange={handleInputChange}
                autoComplete="off"
                required
              />
            </div>
            <div className="lName">
              <label>Last Name : </label>
              <input
                type="text"
                name="lastName"
                value={profileData.lastName}
                onChange={handleInputChange}
                autoComplete="off"
                required
              />
            </div>
          </div>
          <div className="Bio">
            <label>Bio : </label>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleInputChange}
            />
          </div>
          <div className="countrycode">
            <label>Country Code : </label>
            <input
              type="text"
              name="countryCode"
              value={profileData.countryCode}
              autoComplete="off"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="Pnumber">
            <label>Phone Number : </label>
            <input
              type="text"
              name="phoneNumber"
              value={profileData.phoneNumber}
              onChange={handleInputChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="DOB">
            <label>Date of Birth </label>
            <input
              type="date"
              name="dob"
              autoComplete="off"
              value={
                profileData.dob
                  ? new Date(profileData.dob).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="Location">
            <label>Location </label>
            <input
              type="text"
              name="location"
              value={profileData.location}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </div>
          <button className="update-btn" type="submit">
            Update Profile
          </button>
        </form>
      </div>
    </>
  );
};

export default ProfileUpdate;
