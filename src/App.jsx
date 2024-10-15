import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Pages/navbar";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import ProfileUpdate from "./Components/ProfileUpdate";
import Posts from "./Components/Posts";

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
          <Route path="/Profileupdate" element={<ProfileUpdate />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
