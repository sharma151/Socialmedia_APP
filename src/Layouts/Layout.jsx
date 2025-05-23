import { Outlet } from "react-router-dom";
import Navbar from "@/Pages/Navbar";
import { Setusername } from "@/Context/Setusername";

function Layout() {
  return (
    <div>
      <Setusername>
        <Navbar />
        <div className="content">
          <Outlet />
        </div>
      </Setusername>
    </div>
  );
}

export default Layout;
