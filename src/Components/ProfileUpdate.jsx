import { IoIosCloseCircleOutline } from "react-icons/io";
import { useState, useEffect } from "react";
import { handleUpdateProfile } from "../services/Handleapi";
import { UpdatedataContext } from "../Context/UpdateProfileContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import "../Styles/Sass/Components/ProfileUpdate.scss";

const ProfileUpdate = ({ closeModal }) => {
  const { UserprofileData, setUserProfileData } = useContext(UpdatedataContext);
  const [profileData, setProfileData] = useState({
    bio: UserprofileData?.bio || "",
    countryCode: UserprofileData?.countryCode || "",
    dob: UserprofileData?.dob || "",
    firstName: UserprofileData?.firstName || "",
    lastName: UserprofileData?.lastName || "",
    location: UserprofileData?.location || "",
    phoneNumber: UserprofileData?.phoneNumber || "",
  });

  const [isModalOpen, setIsModalOpen] = useState(true);

  const validateForm = () => {
    let isValid = true;

    // Validate phone number
    if (!/^\d{10}$/.test(profileData?.phoneNumber)) {
      toast.error("Phone number must be exactly 10 digits.");
      isValid = false;
    }

    // Validate bio
    const wordCount = profileData?.bio.trim().split(/\s+/).length;
    if (wordCount > 50) {
      toast.error("Bio must not exceed 50 words.");
      isValid = false;
    }

    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }
    try {
      const response = await handleUpdateProfile(profileData);
      if (response.status === 200) {
        toast("Profile updated successfully!");
        setUserProfileData(profileData);
        closeModal(); // Close modal on success
        setIsModalOpen(false); // Reset modal state
      }
    } catch (error) {
      toast("Failed to update profile. Try again.");
      console.error("Error details:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    closeModal();
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = ""; 
    }

    // Cleanup when component unmounts or modal closes
    return () => {
      document.body.style.overflow = ""; // Ensure scrolling is restored
    };
  }, [isModalOpen]);

  return (
    <>
      {isModalOpen && (
        <div className="wrapper" onClick={handleCloseModal}></div>
      )}
      <div className="ProfileUpdate">
        <div className="head">
          <h2>Update Profile</h2>
          <button id="close" onClick={handleCloseModal}></button>
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
                value={profileData?.firstName}
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
                value={profileData?.lastName}
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
              value={profileData?.bio}
              onChange={handleInputChange}
            />
          </div>
          <div className="countrycode">
            <label>Country Code : </label>
            <input
              type="text"
              name="countryCode"
              value={profileData?.countryCode}
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
              value={profileData?.phoneNumber}
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
                  ? new Date(profileData?.dob).toISOString().split("T")[0]
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
              value={profileData?.location}
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
