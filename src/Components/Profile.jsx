import { UpdatedataContext } from "../Context/UpdateProfileContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "../Styles/Profile.scss";

const Profile = () => {
  const { UserprofileData } = useContext(UpdatedataContext);

  return (
    <Link to={"/profile-page"}>
      {/* optionalchaining */}
      <div className="Profile">
        {UserprofileData?.account?.avatar?.url && (
          <img
            src={UserprofileData?.account?.avatar?.url}
            alt={UserprofileData?.posts?.avatar}
            className="avatar"
          />
        )}
        <div className="profile-info">
          <div className="data">
            <div className="name">
              <p>
                {UserprofileData?.firstName} {UserprofileData?.lastName}
              </p>
            </div>
            <p className="Bio">{UserprofileData?.bio}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Profile;
