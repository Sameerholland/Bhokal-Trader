import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddStudent, GetAllStudents } from "./UserAPI";

const initialState = {
  Status: "idl",
  addedStudent: "",  // Renamed for consistency
  allStudents: "",   // Renamed for consistency
  error: "",         // Added for error handling
};

export const AddStudentAsync = createAsyncThunk(
  "student/add",
  async (userdata, { rejectWithValue }) => {
    try {
      console.log(userdata);
      const response = await AddStudent(userdata);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add student");
    }
  }
);

export const GetAllStudentASync = createAsyncThunk(
  'student/all',
  async (userdata, { rejectWithValue }) => {
    try {
      const response = await GetAllStudents(userdata);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch students");
    }
  }
);

const StudentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddStudentAsync.pending, (state) => {
        state.Status = "pending";
      })
      .addCase(AddStudentAsync.fulfilled, (state, actions) => {
        state.Status = "idl";
        state.addedStudent = actions.payload;  // Corrected to match state property
      })
      .addCase(AddStudentAsync.rejected, (state, actions) => {
        state.Status = "idl";
        state.error = actions.payload || "Something went wrong while adding student.";
      })
      .addCase(GetAllStudentASync.pending, (state) => {
        state.Status = "pending";
      })
      .addCase(GetAllStudentASync.fulfilled, (state, actions) => {
        state.Status = "idl";
        state.allStudents = actions.payload;  // Corrected to match state property
      })
      .addCase(GetAllStudentASync.rejected, (state, actions) => {
        state.Status = "idl";
        state.error = actions.payload || "Something went wrong while fetching students.";
      });
  },
});

export const AddedStudent = (state) => state.student.addedStudent; // Corrected property name
export const AllStudent = (state) => state.student.allStudents.students; // Corrected property name

export default StudentSlice.reducer;
