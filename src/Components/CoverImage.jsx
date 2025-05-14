// components/CoverImage.jsx
import React from "react";
import UpdateCoverPage from "../Components/Updatecoverpicture";

const CoverImage = ({ coverImageUrl, onUpdate }) => {
  return (
    <div
      className="w-full h-60 sm:h-72 md:h-80 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${coverImageUrl})` }}
    >
      <div className="absolute bottom-4 right-4">
        <UpdateCoverPage onUpdate={onUpdate} />
      </div>
    </div>
  );
};

export default CoverImage;
