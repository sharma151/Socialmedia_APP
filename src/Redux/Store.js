import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./Postslice";

const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});

export default store;
