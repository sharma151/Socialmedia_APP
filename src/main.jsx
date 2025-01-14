import { ToastContainer } from "react-toastify";
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "../src/Redux/Store.js";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./Styles/Sass/Styles.scss";

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
