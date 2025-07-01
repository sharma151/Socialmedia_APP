import { useState } from "react";
import { toast } from "react-toastify";
import { useMyProfile, useUpdateProfile } from "@/core/Hooks/Api/userData";

const ProfileUpdate = ({ closeModal }) => {
  const { data: myprofile } = useMyProfile();

  const [profileData, setProfileData] = useState({
    bio: myprofile?.bio || "",
    countryCode: myprofile?.countryCode || "",
    dob: myprofile?.dob || "",
    firstName: myprofile?.firstName || "",
    lastName: myprofile?.lastName || "",
    location: myprofile?.location || "",
    phoneNumber: myprofile?.phoneNumber || "",
  });

  const updateProfile = useUpdateProfile();

  const validateForm = () => {
    let isValid = true;

    if (!/^\d{10}$/.test(profileData.phoneNumber)) {
      toast.error("Phone number must be exactly 10 digits.");
      isValid = false;
    }

    const wordCount = profileData.bio.trim().split(/\s+/).length;
    if (wordCount > 50) {
      toast.error("Bio must not exceed 50 words.");
      isValid = false;
    }

    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    updateProfile.mutate(profileData);
    closeModal();
  };

  return (
    <div
      className="overflow-y-auto max-w-lg mx-auto  shadow-2xl bg-gray-800 p-5 border rounded-xl max-h-[80vh] "
      style={{ scrollbarWidth: "none" }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Update Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={profileData.firstName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={profileData.lastName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
            Bio
          </label>
          <textarea
            name="bio"
            value={profileData.bio}
            onChange={handleInputChange}
            className="w-full px-3 py-2 h-24 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
              Country Code
            </label>
            <input
              type="text"
              name="countryCode"
              value={profileData.countryCode}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={profileData.phoneNumber}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={
              profileData.dob
                ? new Date(profileData.dob).toISOString().split("T")[0]
                : ""
            }
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={profileData.location}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition duration-200"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdate;
