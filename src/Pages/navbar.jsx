import { Link } from "react-router-dom";
import "../Pages/Navbar.scss";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex justify-center gap-8">
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
