import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Userpost from "./Components/Userpost";
import ProfilePage from "./Pages/ProfilePage";
import ProfileByUsername from "./Components/ProfilebyUsername";
import { AuthProvider } from "./Context/Authcontext";
import Layout from "./Layouts/Layout";
import ProtectedRoute from "./Components/ProtectedRoute";
import Bookmarks from "./Pages/Bookmarks";
import { UpdateProfileContextProvider } from "./Context/UpdateProfileContext";

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
                <Route path="/posts" element={<Userpost />} />
                <Route path="/profile-page" element={<ProfilePage />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
