// components/CoverImage.jsx
import { useContext } from "react";
import UpdateCoverPage from "@/Components/Updatecoverpicture";
import { LoggedinUserProfileData } from "@/Context/UpdateProfileContext";

const CoverImage = ({ coverImageUrl, onUpdate, userData }) => {
  const { loggedinUserprofileData } = useContext(LoggedinUserProfileData);
  return (
    <div className="relative w-full h-48 sm:h-64 lg:h-80">
      <img
        src={coverImageUrl}
        alt="Cover"
        className="w-full h-full object-cover"
      />
      {(!userData || userData._id === loggedinUserprofileData?._id) && (
        <UpdateCoverPage onUpdate={onUpdate} />
      )}
    </div>
  );
};

export default CoverImage;
