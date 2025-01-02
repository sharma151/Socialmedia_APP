import "../Styles/Sass/Pages/Usernotfound.scss";
import { Link } from "react-router-dom";

const Pagenotfound = () => {
  return (
    <div className="user-not-found">
      <div className="content">
        <img
          src="../src/assets/page not found.png"
          alt="User Not Found"
          className="image"
        />
        <h1>Oops! Page Not Found</h1>
        <p>The page you're looking doesn't exist or may have been removed.</p>
        <Link to="/" className="home-link">
          Go Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Pagenotfound;
