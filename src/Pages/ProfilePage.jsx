import { useState, useEffect } from "react";
import axios from "../services/Api";
import "../Styles/ProfilePage.scss";
import { FaBirthdayCake, FaUserAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import Createpost from "../Components/Createpost";
import UpdateCoverPage from "../Components/Updatecoverpicture";
import Updateavatar from "../Components/Updateavatar";
import ProfileUpdate from "../Components/ProfileUpdate";
import Userpost from "../Components/Userpost";
import { IoIosMail } from "react-icons/io";
import { UpdatedataContext } from "../Context/UpdateProfileContext";
import { useContext } from "react";

import { toast } from "react-toastify";

const ProfilePage = () => {
  const { UserprofileData, setUserProfileData } = useContext(UpdatedataContext);
  const [profileImages, setprofileImages] = useState({
    avatar: "",
    coverImage: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get("/social-media/profile");
      setprofileImages(response?.data?.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setErrorMessage("Error fetching profile data.");
    }
  };

  const fetchMyPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/social-media/posts/get/my?page=1&limit=100`
      );
      const sortedPosts = response?.data?.data?.posts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(sortedPosts);
      setLoading(false);
    } catch (err) {
      toast("Failed to fetch posts.", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchMyPosts();
  }, []);

  return (
    <div className="ProfilePage">
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <div className="Images">
        {profileImages?.coverImage?.url && (
          <img
            key={profileImages?.id}
            src={profileImages?.coverImage?.url}
            alt={profileImages?.coverImage}
            className="coverimage"
          />
        )}

        {profileImages?.account?.avatar?.url && (
          <img
            src={profileImages?.account?.avatar?.url}
            alt={profileImages?.posts?.avatar}
            className="avatar"
          />
        )}

        <div className="Name">
          <p> {UserprofileData?.firstName}</p>
          <p> {UserprofileData?.lastName}</p>
          <h1>{UserprofileData?.account?.username}</h1>
        </div>
        <button className="Updateprofile" onClick={() => setShowModal(true)}>
          {" "}
          <MdModeEdit size={25} /> <p>Edit profile</p>
        </button>
      </div>

      <div className="profile-info">
        <div className="data">
          <p className="Bio">
            <FaUserAlt  /> {UserprofileData?.bio}
          </p>
          <p className="DOB">
            {/* <strong>Date of Birth:</strong> */}
            <FaBirthdayCake  />{" "}
            {new Date(UserprofileData?.dob).toLocaleDateString()}
          </p>
          <p className="Location">
            <FaLocationDot /> {UserprofileData?.location}
          </p>
          <p className="Phonenumber">
            <IoCall  /> {UserprofileData?.countryCode}{" "}
            {UserprofileData?.phoneNumber}
          </p>
          <p className="Mail">
            <IoIosMail  size={15}className="emailicons" /> {UserprofileData?.account?.email}
          </p>
        </div>
      </div>

      <Createpost className="createpost" onUpdate={() => fetchMyPosts()} />

      <Userpost
        className="myposts"
        onUpdate={() => fetchMyPosts()}
        posts={posts}
      />
      <UpdateCoverPage onUpdate={() => fetchProfile()} />
      <Updateavatar onUpdate={() => fetchProfile()} />
      {showModal && (
        <ProfileUpdate
          // currentProfile={profile}
          closeModal={closeModal}
          onUpdate={() => fetchProfile()}
        />
      )}
    </div>
  );
};

export default ProfilePage;
