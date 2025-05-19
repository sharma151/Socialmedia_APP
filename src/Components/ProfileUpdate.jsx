import { useState, useEffect, useContext } from "react";
import { handleUpdateProfile } from "@/services/Handleapi";
import { UpdatedataContext } from "@/Context/UpdateProfileContext";
import { toast } from "react-toastify";

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

    if (!/^\d{10}$/.test(profileData?.phoneNumber)) {
      toast.error("Phone number must be exactly 10 digits.");
      isValid = false;
    }

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
    if (!validateForm()) return;

    try {
      const response = await handleUpdateProfile(profileData);
      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        setUserProfileData(profileData);
        handleCloseModal();
      }
    } catch (error) {
      toast.error("Failed to update profile. Try again.");
      console.error("Error details:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    closeModal();
  };

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <>
      {/* {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={handleCloseModal}
        ></div>
      )} */}

      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 h-[70%] mt-30">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-xl p-6 relative z-50">
          <div className="flex items-center justify-between border-b border-gray-300 dark:border-gray-700 pb-4 mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Update Profile
            </h2>
            {/* <button
              onClick={handleCloseModal}
              className="text-red-500 hover:text-red-700"
            >
              <IoIosCloseCircleOutline size={32} />
            </button> */}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={profileData?.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={profileData?.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
                Bio
              </label>
              <textarea
                name="bio"
                value={profileData?.bio}
                onChange={handleInputChange}
                className="w-full px-3 py-2 h-24 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                  value={profileData?.countryCode}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={profileData?.phoneNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                    ? new Date(profileData?.dob).toISOString().split("T")[0]
                    : ""
                }
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={profileData?.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
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
      </div>
    </>
  );
};

export default ProfileUpdate;
