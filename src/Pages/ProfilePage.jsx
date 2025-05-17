import { handleFetchmyPost, handleFetchMyprofile } from "../services/Handleapi";
import { useState, useEffect } from "react";
import { UpdatedataContext } from "@/Context/UpdateProfileContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import ProfileUpdate from "@/Components/ProfileUpdate";
import Createpost from "@/Components/Createpost";
import Userpost from "@/Components/Userpost";
import ProfileDetail from "../Components/Profiledetail";
import CoverImage from "@/Components/CoverImage";
import ProfileAvatar from "@/Components/ProfileAvatar";
import Modal from "@/Modals/Modal";

const ProfilePage = () => {
  const { UserprofileData } = useContext(UpdatedataContext);
  const [profileImages, setprofileImages] = useState({
    avatar: "",
    coverImage: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  // const closeModal = () => setShowModal(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <div className="ProfilePage">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {/* {loading ? (
        <Loader className="Profilepage-loader" />
      ) : ( */}
      <>
        <div className="bg-gray-100 dark:bg-gray-800 pb-6">
          <CoverImage
            coverImageUrl={profileImages?.coverImage?.url || ""}
            onUpdate={() => fetchProfile()}
          />
          <div className="relative max-w-6xl mx-auto -mt-20 px-4 sm:px-6 lg:px-8">
            <ProfileAvatar
              avatarUrl={profileImages?.account?.avatar?.url || ""}
              name={`${UserprofileData?.firstName || ""} ${
                UserprofileData?.lastName || ""
              }`}
              username={UserprofileData?.account?.username || ""}
              onUpdate={() => fetchProfile()}
            />
          </div>
        </div>

        {/* Main profile content layout */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Profile Detail */}
          <div className="col-span-1">
            <ProfileDetail
              setIsModalOpen={setIsModalOpen}
              UserprofileData={UserprofileData}
            />
          </div>

          {/* Right - Create Post & Posts */}
          <div className="col-span-1 lg:col-span-2 space-y-4">
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

        {/* Modal for profile update */}
        {/* {showModal && ( */}
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ProfileUpdate
            closeModal={showModal}
            onUpdate={() => fetchProfile()}
          />
        </Modal>
        {/* )} */}
      </>
      {/* )} */}
    </div>
  );
};

export default ProfilePage;
