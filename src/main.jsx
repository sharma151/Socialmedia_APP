import { ToastContainer } from "react-toastify";
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import "./Styles/Sass/Base/Reset.scss";
import { Provider } from "react-redux";
import store from "../src/Redux/Store.js";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <Provider store={store}>
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
    </Provider>
  // </StrictMode>
);
