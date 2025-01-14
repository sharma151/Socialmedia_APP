import { Link } from "react-router-dom";

const Usernotfound = () => {
  return (
    <div className="user-not-found">
      <div className="content">
        <img
          src="../src/assets/usernotfound.png"
          alt="User Not Found"
          className="image"
        />
        <h1>Oops! User Not Found</h1>
        <p>
          The user you're looking for doesn't exist or may have been removed.
        </p>
        <Link to="/" className="home-link">
          Go Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Usernotfound;
