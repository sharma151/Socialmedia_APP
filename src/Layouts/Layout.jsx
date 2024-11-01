import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Navbar";

function Layout() {
  return (
    <div>
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
