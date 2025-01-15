import { handleFetchmyPost, handleFetchMyprofile } from "../services/Handleapi";
import { FaBirthdayCake, FaUserAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { UpdatedataContext } from "../Context/UpdateProfileContext";
import { FaLocationDot } from "react-icons/fa6";
import { useContext } from "react";
import { IoIosMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { toast } from "react-toastify";
import UpdateCoverPage from "../Components/Updatecoverpicture";
import ProfileUpdate from "../Components/ProfileUpdate";
import Updateavatar from "../Components/Updateavatar";
import Createpost from "../Components/Createpost";
import Userpost from "../Components/Userpost";
import Loader from "../assets/Loader";


const ProfilePage = () => {
  const { UserprofileData } = useContext(UpdatedataContext);
  const [profileImages, setprofileImages] = useState({
    avatar: "",
    coverImage: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const fetchProfile = async () => {
    try {
      const response = await handleFetchMyprofile();
      setprofileImages(response);
    } catch (error) {
      toast.error("Error fetching profile:", error);
      setErrorMessage("Error fetching profile data.");
    }
  };

  const fetchMyPosts = async () => {
    try {
      const response = await handleFetchmyPost();
      const sortedPosts = response.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(sortedPosts);
    } catch (err) {
      toast("Failed to fetch posts.", err);
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([fetchProfile(), fetchMyPosts()]);
  };

  useEffect(() => {
    fetchAllData();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="ProfilePage">
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {loading ? (
        <Loader className="Profilepage-loader" />
      ) : (
        <>
          <div className="Images">
            <div
              className="coverimage"
              style={{
                backgroundImage: `url(${profileImages?.coverImage?.url || ""})`,
                backgroundSize: "100% 100%",
                overflow: "hidden",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="update-coverpage">
                <UpdateCoverPage onUpdate={() => fetchProfile()} />
              </div>
            </div>

            <div className="avatar_name">
              <div
                className="avatar"
                style={{
                  backgroundImage: `url(${
                    profileImages?.account?.avatar?.url || ""
                  })`,
                  backgroundSize: "100% 100%",
                  backgroundPosition: "center",
                }}
              >
                <div className="update-avatar">
                  <Updateavatar onUpdate={() => fetchProfile()} />
                </div>
              </div>
              <div className="Name">
                <p>
                  {" "}
                  {UserprofileData?.firstName}
                  {UserprofileData?.lastName}
                </p>

                <h1>{UserprofileData?.account?.username}</h1>
              </div>
            </div>
          </div>
          <div className="profilepage-body">
            <div className="profilepage-info">
              <h4>Profile Details</h4>
              <div className="data">
                <div className="Bio">
                  <span>
                    <FaUserAlt className="Bio-icon" />
                  </span>{" "}
                  {UserprofileData?.bio}
                </div>
                <div className="DOB">
                  {/* <strong>Date of Birth:</strong> */}
                  <span className="birthday-icon">
                    <FaBirthdayCake />
                  </span>{" "}
                  {new Date(UserprofileData?.dob).toLocaleDateString()}
                </div>
                <div className="Location">
                  <span className="location-icon">
                    <FaLocationDot />{" "}
                  </span>
                  {UserprofileData?.location}
                </div>
                <div className="Phonenumber">
                  <span className="phone">
                    <IoCall />{" "}
                  </span>
                  {UserprofileData?.countryCode} {UserprofileData?.phoneNumber}
                </div>
                <div className="Mail">
                  <span className="emailicons">
                    <IoIosMail />
                  </span>{" "}
                  {UserprofileData?.account?.email}
                </div>
                <button
                  className="Updateprofile"
                  onClick={() => setShowModal(true)}
                >
                  {/* <MdModeEdit size={25} /> */}
                  <p>Edit profile</p>
                </button>
              </div>
            </div>

            <div className="profile-data">
              <Createpost
                className="profilepage-createpost"
                onUpdate={() => fetchMyPosts()}
              />

              <Userpost
                className="Getmyposts"
                onUpdate={() => fetchMyPosts()}
                posts={posts}
              />
            </div>
          </div>

          {showModal && (
            <ProfileUpdate
              // currentProfile={profile}
              closeModal={closeModal}
              onUpdate={() => fetchProfile()}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProfilePage;
