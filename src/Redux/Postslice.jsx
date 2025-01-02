import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Handlecreatepost } from "../services/Handleapi";

// Async thunk for creating a post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await Handlecreatepost(formData);
      if (response.status === 201) {
        return response.data;
      } else {
        return rejectWithValue("Failed to create post.");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred."
      );
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;
