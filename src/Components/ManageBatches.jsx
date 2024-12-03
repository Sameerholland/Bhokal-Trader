import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddCourseAsync, AddedCourse } from "../Features/Course/CourseSlice";
import { useNavigate } from "react-router-dom";
import "../Css/ManageVideos.css";

const AddCourse = () => {
  const [Image, setImage] = useState(null);
  const [course, setCourse] = useState({
    Name: "",
    duration: "",
    price: "",
    recorded: false,
    live: false,
    demo: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const CourseAdded = useSelector(AddedCourse);

  const validate = () => {
    const newErrors = {};
    if (!course.Name) newErrors.name = "Course name is required";
    if (!course.duration) newErrors.duration = "Duration is required";
    if (!course.price || isNaN(course.price) || course.price <= 0)
      newErrors.price = "Enter a valid price";
    if (!Image) newErrors.image = "Thumbnail image is required";
    return newErrors;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      setErrors({ ...errors, image: "File size exceeds 5MB" });
    } else {
      setImage(file);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourse({ ...course, [name]: type === "checkbox" ? checked : value });
  };

  const checkAdded = () => {
    if (CourseAdded === true) {
      setLoading(false);
      setSuccessMessage("Course Added Successfully!");
      navigate("/");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      setSuccessMessage("");
      const formdata = new FormData();
      formdata.append("file", Image);
      formdata.append("Name", course.Name);
      formdata.append("duration", course.duration);
      formdata.append("recorded", course.recorded);
      formdata.append("live", course.live);
      formdata.append("demo", course.demo);
      formdata.append("price", course.price);

      dispatch(AddCourseAsync(formdata));
      setTimeout(checkAdded, 1000);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="content">
      <h2>Add Course</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="Name"
          placeholder="Course Name"
          value={course.Name}
          onChange={handleChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}

        <input
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={handleImageChange}
        />
        {errors.image && <span className="error">{errors.image}</span>}

        <input
          type="text"
          name="duration"
          placeholder="Duration"
          value={course.duration}
          onChange={handleChange}
        />
        {errors.duration && <span className="error">{errors.duration}</span>}

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={course.price}
          onChange={handleChange}
        />
        {errors.price && <span className="error">{errors.price}</span>}

        <label>
          <input
            type="checkbox"
            name="recorded"
            checked={course.recorded}
            onChange={handleChange}
          />
          Recorded Video
        </label>
        <label>
          <input
            type="checkbox"
            name="live"
            checked={course.live}
            onChange={handleChange}
          />
          Live Classes
        </label>
        <label>
          <input
            type="checkbox"
            name="demo"
            checked={course.demo}
            onChange={handleChange}
          />
          Demo Class
        </label>

        {/* {loading && <div className="loading">Adding course...</div>}
        {successMessage && <div className="success">{successMessage}</div>} */}

        <button type="submit" disabled={loading}>
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
