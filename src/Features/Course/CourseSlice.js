import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddCourse, getAllCources } from "./CourseAPI";

const initialState = {
  Status: "idl",
  addedCourse:false,
  courses: "",
  error: "",
};

export const AddCourseAsync = createAsyncThunk(
  "course/add",
  async (userdata) => {
    const response = await AddCourse(userdata);
    return response.data;
  }
);

export const GetAllCourseAsync = createAsyncThunk("course/get",
  async ()=>{
    const response = await getAllCources();
    return response.data;
  }
);

const CourseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddCourseAsync.pending, (state) => {
        state.Status = "pending";
      })
      .addCase(AddCourseAsync.fulfilled, (state, actions) => {
        state.Status = "idl";
        state.addedCourse = true;
      })
      .addCase(GetAllCourseAsync.pending,(state)=>{
        state.Status = 'pending';
        
      })
      .addCase(GetAllCourseAsync.fulfilled,(state,actions)=>{
        state.Status ='idl';
        state.courses = actions.payload;
      })
  },
});

export const AddedCourse = (state) => state.Course.addedCourse;
export const AllCourses = (state)=> state.Course.courses

export default CourseSlice.reducer;
