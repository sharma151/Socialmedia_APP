import { Outlet } from "react-router-dom";
import Navbar from "../Pages/navbar";

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
