// components/CoverImage.jsx
import { useContext } from "react";
import UpdateCoverPage from "@/Components/Updatecoverpicture";
import { UpdatedataContext } from "@/Context/UpdateProfileContext";

const CoverImage = ({ coverImageUrl, onUpdate, userData }) => {
  const { UserprofileData } = useContext(UpdatedataContext);
  console.log("userprofiledata", UserprofileData);
  console.log("userdata", userData);
  return (
    <div className="relative w-full h-48 sm:h-64 lg:h-80">
      <img
        src={coverImageUrl}
        alt="Cover"
        className="w-full h-full object-cover"
      />
      {/* {UserprofileData?._id === userData?._id && ( */}
      <>
        <UpdateCoverPage onUpdate={onUpdate} />
      </>
      {/* )} */}
    </div>
  );
};

export default CoverImage;
