import { UpdatedataContext } from "../Context/UpdateProfileContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "../Styles/Sass/Components/Profile.scss";

const Profile = ({ className }) => {
  const { UserprofileData } = useContext(UpdatedataContext);

  return (
    <div className={`profile ${className}`}>
      <Link to={"/profile-page"}>
        {/* optionalchaining */}
        <div className="Profile-img">
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
    </div>
  );
};

export default Profile;
