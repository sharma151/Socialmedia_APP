import { ToastContainer } from "react-toastify";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import "./Styles/Sass/Base/Reset.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </StrictMode>
);
