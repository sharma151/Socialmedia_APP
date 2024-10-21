import Createpost from "../Components/Createpost";
import Userpost from "../Components/Userpost";
import Profile from "../Components/Profile";

const Home = () => {
  return (
    <>
      <Createpost />
      <Userpost endpoints={`/social-media/posts?page=1&limit=10'`} />
      <Profile />
    </>
  );
};

export default Home;
