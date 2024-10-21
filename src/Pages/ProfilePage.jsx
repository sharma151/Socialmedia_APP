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
import { toast } from "react-toastify";
// import MyPosts from "../Components/myposts";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    bio: "",
    countryCode: "",
    dob: "",
    firstName: "",
    lastName: "",
    location: "",
    phoneNumber: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  // const [totalPages, setTotalPages] = useState(1);

  const fetchProfile = async () => {
    try {
      const response = await axios.get("/social-media/profile");
      setProfile(response?.data?.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setErrorMessage("Error fetching profile data.");
    }
  };

  const fetchMyPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/social-media/posts/get/my`);
      setPosts(response?.data?.data?.posts);
      // setTotalPages(response?.data?.data?.totalPages);
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
        {profile?.coverImage?.url && (
          <img
            key={profile?.id}
            src={profile?.coverImage?.url}
            alt={profile.coverImage}
            className="coverimage"
          />
        )}

        {profile?.account?.avatar?.url && (
          <img
            src={profile?.account?.avatar?.url}
            alt={profile?.posts?.avatar}
            className="avatar"
          />
        )}

        <div className="Name">
          <p> {profile?.firstName}</p>
          <p> {profile.lastName}</p>
        </div>
        <button className="Updateprofile" onClick={() => setShowModal(true)}>
          {" "}
          <MdModeEdit size={25} /> <p>Edit profile</p>
        </button>
      </div>

      <div className="profile-info">
        <div className="data">
          <p className="Bio">
            <FaUserAlt /> {profile.bio}
          </p>
          <p className="DOB">
            {/* <strong>Date of Birth:</strong> */}
            <FaBirthdayCake /> {new Date(profile.dob).toLocaleDateString()}
          </p>
          <p className="Location">
            <FaLocationDot /> {profile.location}
          </p>
          <p className="Phonenumber">
            <IoCall /> {profile.countryCode} {profile.phoneNumber}
          </p>
        </div>
      </div>

      <Createpost className="createpost" onUpdate={() => fetchProfile()} />
      {/* <MyPosts className="myposts" onUpdate={() => fetchProfile()} /> */}
      <Userpost className="myposts" posts={posts} />
      <UpdateCoverPage onUpdate={() => fetchProfile()} />
      <Updateavatar onUpdate={() => fetchProfile()} />
      {showModal && (
        <ProfileUpdate
          currentProfile={profile}
          closeModal={closeModal}
          onUpdate={() => fetchProfile()}
        />
      )}
    </div>
  );
};

export default ProfilePage;
