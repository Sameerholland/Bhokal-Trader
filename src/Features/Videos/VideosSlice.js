import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddVideos } from "./VideosAPI";

const initialState = {
   Status: 'idle', // Fixed typo: 'idl' to 'idle'
   video: '',
   error: ''
};

// Async thunk for adding video
export const AddVideoAsync = createAsyncThunk(
   'video/add',
   async (userdata, { rejectWithValue }) => {
      try {
         console.log("Add Video API called", userdata);
         const response = await AddVideos(userdata);
         return response.data;
      } catch (error) {
         // Return the error message for rejected state
         return rejectWithValue(error.message || 'Failed to add video');
      }
   }
);

const VideoSlice = createSlice({
   name: "video",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(AddVideoAsync.pending, (state) => {
            state.Status = 'pending';
         })
         .addCase(AddVideoAsync.fulfilled, (state, actions) => {
            state.Status = 'idle';
            state.video = actions.payload;
            state.error = ''; // Reset error on successful addition
         })
         .addCase(AddVideoAsync.rejected, (state, action) => {
            state.Status = 'idle';
            state.error = action.payload; // Set error message if request fails
         });
   }
});

// Selector for accessing the video data
export const Videoadded = (state) => state.video.video;

// Selector for accessing the status of the add video operation
export const VideoStatus = (state) => state.video.Status;

// Selector for accessing any errors
export const VideoError = (state) => state.video.error;

export default VideoSlice.reducer;
