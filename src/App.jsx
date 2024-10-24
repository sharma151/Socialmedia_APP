import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Userpost from "./Components/Userpost";
import ProfilePage from "./Pages/ProfilePage";
import ProfileByUsername from "./Components/ProfilebyUsername";
import { AuthProvider } from "./Context/Authcontext";

const routes = [
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/home", element: <Home /> },
  { path: "/profile/:username", element: <ProfileByUsername /> },
  { path: "/posts", element: <Userpost /> },
  { path: "/profile-page", element: <ProfilePage /> },
];

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
