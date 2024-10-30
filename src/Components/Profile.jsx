import { useState } from "react";
import "../Styles/Profile.scss";
import { Link } from "react-router-dom";
import { UpdatedataContext } from "../Context/UpdateProfileContext";
import { useContext } from "react";

const Profile = () => {
  const { UserprofileData } = useContext(UpdatedataContext);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <Link to={"/profile-page"}>
      <div className="Profile">
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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
              <p>{UserprofileData?.firstName}</p>
              <p>{UserprofileData?.lastName}</p>
            </div>
            <p className="Bio">{UserprofileData?.bio}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Profile;
