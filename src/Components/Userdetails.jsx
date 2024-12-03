import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AllCourses } from "../Features/Course/CourseSlice";
import { AddStudentAsync } from "../Features/Users/UserSlice";

const AddUser = () => {
  const dispatch = useDispatch();
  const allCourse = useSelector(AllCourses); // Get all courses from the Redux store
  
  const [courses, setCourses] = useState([]);

  // Fetch course IDs once all courses are available
  useEffect(() => {
    if (allCourse?.courses) {
      setCourses(Object.values(allCourse.courses).map(course => course.Id)); // Extract course IDs
    }
  }, [allCourse]);

  const [user, setUser] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
    courseId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch action to add student with user data
    dispatch(AddStudentAsync({
      Name: user.name,
      Contact_Number: user.contact,
      email: user.email,
      password: user.password,
      Course_Id: user.courseId,
    }));
  };

  return (
    <div className="content">
      <h2>Add User</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={user.contact}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={user.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <select
          name="courseId"
          value={user.courseId}
          onChange={handleChange}
          required
        >
          <option value="">Select Course ID</option>
          {courses.length > 0 ? (
            courses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))
          ) : (
            <option>Loading Courses...</option> // Display loading state if courses are not loaded yet
          )}
        </select>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
