import { configureStore } from "@reduxjs/toolkit";
import studentreducer from "./Features/Users/UserSlice";
import Videoreducer from "./Features/Videos/VideosSlice";
import Coursereducer from "./Features/Course/CourseSlice";
import AuthSlice from "./Features/Auth/AuthSlice";

export const store = configureStore({
  reducer:{student: studentreducer,
  video: Videoreducer,
  Course: Coursereducer,
  Auth: AuthSlice,
  }
});
