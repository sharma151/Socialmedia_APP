import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Pages/navbar";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Myposts from "./Components/Myposts";
import Posts from "./Components/Posts";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  const isAuthenticated = !!localStorage.getItem("AccessToken");

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Home />
              ) : (
                <p>Please login to access the home page.</p>
              )
            }
          />
          <Route path="/Posts" element={<Posts />} />
          <Route path="/myposts" element={<Myposts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile-page" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
