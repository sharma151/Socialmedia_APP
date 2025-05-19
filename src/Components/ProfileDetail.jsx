import { FaBirthdayCake, FaUserAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";

const ProfileDetail = ({ setIsModalOpen, UserprofileData }) => {
  return (
    <div className="w-full max-w-2xl p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800 dark:text-white">
        Profile Details
      </h2>

      <div className="space-y-4 text-gray-700 dark:text-gray-300">
        {/* Bio */}
        <div className="flex items-center gap-3">
          <FaUserAlt className="text-blue-600 dark:text-blue-400" />
          <span>{UserprofileData?.bio || "No bio available"}</span>
        </div>

        {/* DOB */}
        <div className="flex items-center gap-3">
          <FaBirthdayCake className="text-pink-500" />
          <span>
            {UserprofileData?.dob
              ? new Date(UserprofileData.dob).toLocaleDateString()
              : "Not specified"}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-3">
          <FaLocationDot className="text-red-500" />
          <span>{UserprofileData?.location || "No location specified"}</span>
        </div>

        {/* Phone Number */}
        <div className="flex items-center gap-3">
          <IoCall className="text-green-600" />
          <span>
            {UserprofileData?.countryCode} {UserprofileData?.phoneNumber}
          </span>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3">
          <IoIosMail className="text-yellow-600" />
          <span>{UserprofileData?.account?.email || "No email available"}</span>
        </div>

        {/* Edit Profile Button */}
        <div className="pt-4">
          <button
            // onClick={() => setShowModal(true)}
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
