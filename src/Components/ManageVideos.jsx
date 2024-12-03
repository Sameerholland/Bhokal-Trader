import React, { useState } from "react";
import axios from "axios";
import '../Css/ManageVideos.css'

const AddVideo = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [format, setFormat] = useState('');
  const [duration, setDuration] = useState('');
  const [courseId, setCourseId] = useState('');
  const [video, setVideo] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Video name is required";
    if (!number) newErrors.number = "Video number is required";
    if (!format) newErrors.format = "Video format is required";
    if (!duration) newErrors.duration = "Duration is required";
    if (!courseId) newErrors.courseId = "Course ID is required";
    if (!video) newErrors.video = "Video file is required";
    else if (!video.name.endsWith('.mp4')) newErrors.video = "Only MP4 format is allowed";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      setSuccess(false);

      let formData = new FormData();
      formData.append("file", video);
      formData.append('name', name);
      formData.append('number', number);
      formData.append('duration', duration);
      formData.append('courseId', courseId);
      formData.append('format',format )

      try {
        await axios.post(`http://localhost:8000/class/add-class`, formData);
        setSuccess(true);
        // Reset form after successful submission
        setName('');
        setNumber('');
        setFormat('');
        setDuration('');
        setCourseId('');
        setVideo(null);
      } catch (error) {
        console.error("There was an error uploading the video!", error);
        setErrors({ submit: "There was an error submitting the form." });
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="content">
      <h2>Add Video</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Video Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div>
          <input
            type="text"
            name="number"
            placeholder="Video Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
          {errors.number && <span className="error">{errors.number}</span>}
        </div>
        <div>
          <input
            type="text"
            name="format"
            placeholder="Format"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            required
          />
          {errors.format && <span className="error">{errors.format}</span>}
        </div>
        <div>
          <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
          {errors.duration && <span className="error">{errors.duration}</span>}
        </div>
        <div>
          <input
            type="text"
            name="courseId"
            placeholder="Course ID"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
          />
          {errors.courseId && <span className="error">{errors.courseId}</span>}
        </div>
        <div>
          <input
            type="file"
            name="videoFile"
            accept=".mp4"
            onChange={(e) => setVideo(e.target.files[0])}
            required
          />
          {errors.video && <span className="error">{errors.video}</span>}
        </div>
        {loading && <div className="loading">Uploading...</div>}
        {success && <div className="success">Video added successfully!</div>}
        {errors.submit && <div className="error">{errors.submit}</div>}
        <button type="submit" disabled={loading}>Add Video</button>
      </form>
    </div>
  );
};

export default AddVideo;
