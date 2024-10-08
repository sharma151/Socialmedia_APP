import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Pages/navbar";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Createpost from "./Components/Createpost";

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
                <Createpost />
              ) : (
                <p>Please login to access the home page.</p>
              )
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
