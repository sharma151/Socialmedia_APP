import { useContext } from "react";
import { FaGifts } from "react-icons/fa";
import { LoggedinUserProfileData } from "../Context/UpdateProfileContext";

const Birthday = () => {
  const { loggedinUserprofileData } = useContext(LoggedinUserProfileData);

  const formatBirthdate = (dob) => {
    if (!dob) return "Date not available";

    const date = new Date(dob);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    const daySuffix = (day) => {
      if (day >= 11 && day <= 13) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${daySuffix(day)} ${month} ${year}`;
  };

  const formattedDOB = formatBirthdate(loggedinUserprofileData?.dob);
  return (
    <>
      <div className="bg-gray-100 p-4 rounded-md mb-3">
        <p className="font-semibold mb-2">Birthday</p>
        <div className="flex items-center gap-2 font-medium text-gray-700">
          <FaGifts size={22} />
          <span>{formattedDOB}</span>
        </div>
      </div>
    </>
  );
};

export default Birthday;
