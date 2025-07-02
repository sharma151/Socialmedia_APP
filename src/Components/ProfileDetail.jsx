import { FaBirthdayCake, FaUserAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import React, { useContext, useState } from "react";
import { LoggedinUserProfileData } from "@/Context/UpdateProfileContext";
import ProfileUpdate from "./ProfileUpdate";
import Modal from "@/Modals/Modal";

const ProfileDetail = ({ UserprofileData }) => {
  const { bio, dob, location, countryCode, phoneNumber, account } =
    UserprofileData || {};
  const { loggedinUserprofileData } = useContext(LoggedinUserProfileData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full max-w-2xl p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800 dark:text-white">
        Profile Details
      </h2>

      <div className="space-y-4 text-gray-700 dark:text-gray-300">
        {/* Bio */}
        <div className="flex items-center gap-3">
          <FaUserAlt className="text-blue-600 dark:text-blue-400" />
          <span>{bio || "No bio available"}</span>
        </div>

        {/* DOB */}
        <div className="flex items-center gap-3">
          <FaBirthdayCake className="text-pink-500" />
          <span>
            {dob ? new Date(dob).toLocaleDateString() : "Not specified"}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-3">
          <FaLocationDot className="text-red-500" />
          <span>{location || "No location specified"}</span>
        </div>

        {/* Phone Number */}
        <div className="flex items-center gap-3">
          <IoCall className="text-green-600" />
          <span>
            {countryCode} {phoneNumber}
          </span>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3">
          <IoIosMail className="text-yellow-600" />
          <span>{account?.email || "No email available"}</span>
        </div>

        {/* Edit Profile Button */}
        {(!UserprofileData ||
          UserprofileData?._id === loggedinUserprofileData?._id) && (
          <div className="pt-4">
            <button
              // onClick={() => setShowModal(true)}
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Edit Profile
            </button>
          </div>
        )}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ProfileUpdate closeModal={() => setIsModalOpen(false)} />
        </Modal>
      </div>
    </div>
  );
};

export default ProfileDetail;
