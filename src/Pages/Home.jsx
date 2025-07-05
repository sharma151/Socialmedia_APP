import { useContext } from "react";
import { toast } from "react-toastify";
import { LoggedinUserProfileData } from "../Context/UpdateProfileContext";
import { UsernameContext } from "../Context/Setusername";
import Createpost from "@/Components/Createpost";
import Userpost from "@/Components/Userpost";
import Profile from "@/Components/Profile";
import Aside from "@/Components/aside";
import Suggestions from "@/Components/Suggestions";
import { useAllPosts, useUserPosts } from "@/core/Hooks/Api/userData";
import Birthday from "@/Components/Birthday";

const Home = () => {
  const { UserName } = useContext(UsernameContext);

  const page = 1;
  const limit = 10;

  const {
    data: allPosts,
    isLoading: isAllPostsLoading,
    isError: isAllPostsError,
    error: allPostsError,
  } = useAllPosts(page, limit);

  const {
    data: searchedPosts,
    isLoading: isSearchedPostsLoading,
    isError: isSearchedPostsError,
    error: searchedPostsError,
  } = useUserPosts(UserName, {
    enabled: !!UserName,
  });

  const isLoading = UserName ? isSearchedPostsLoading : isAllPostsLoading;
  const isError = UserName ? isSearchedPostsError : isAllPostsError;
  const error = UserName ? searchedPostsError : allPostsError;
  const posts = UserName ? searchedPosts : allPosts;

  if (isError) {
    toast.error(`Failed to load posts: ${error.message || error}`);
  }

  return (
    <div className="flex gap-6 p-6 min-h-screen">
      {/* Left Sidebar */}
      <Aside className="w-60  hidden sm:hidden lg:block" />

      {/* Center Content */}
      <div className="flex flex-col flex-1 gap-6 max-w-3xl">
        <Createpost className="w-[94%] mx-auto" />
        <Userpost className="w-full" posts={posts} isLoading={isLoading} />
      </div>

      {/* Right Sidebar */}
      <div className="w-72 mt-6 flex-col  hidden sm:hidden md:block">
        <Profile className="w-full" />
        <Birthday className="w-full " />
        <Suggestions className="w-full" />
      </div>
    </div>
  );
};

export default Home;
