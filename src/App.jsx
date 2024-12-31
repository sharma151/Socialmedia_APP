import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UpdateProfileContextProvider } from "./Context/UpdateProfileContext";
import { AuthProvider } from "./Context/Authcontext";
import ProfileByUsername from "./Components/ProfilebyUsername";
import ProtectedRoute from "./Components/ProtectedRoute";
import ProfilePage from "./Pages/ProfilePage";
import Bookmarks from "./Pages/Bookmarks";
import Register from "./Pages/Register";
import Userpost from "./Components/Userpost";
import Layout from "./Layouts/Layout";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import "./App.css";
import Pagenotfound from "./Pages/Pagenotfound";
import Usernotfound from "./Pages/Usernotfound";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route
                element={
                  <UpdateProfileContextProvider>
                    <Layout />
                  </UpdateProfileContextProvider>
                }
              >
                <Route path="/" element={<Home />} />
                <Route path="/Bookmarks" element={<Bookmarks />} />

                <Route
                  path="/profile/:username"
                  element={<ProfileByUsername />}
                />
                <Route path="/Error" element={<Pagenotfound />}></Route>
                <Route path="/posts" element={<Userpost />} />
                <Route path="/usernotfound" element={<Usernotfound />}></Route>
                <Route path="/profile-page" element={<ProfilePage />} />
                <Route path="*" element={<Pagenotfound />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
