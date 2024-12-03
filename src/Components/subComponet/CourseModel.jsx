import React from 'react';
import '../../Css/Coursecard.css'; // Importing CSS for styling the card
import {useNavigate, useNavigation} from 'react-router-dom'

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  if (!course) return null; // Early return in case course data is missing

  const { Thumbnail, Name, numberOfVideos, numberOfStudents } = course; // Destructure course for easy access

  return (
    <div className="course-card">
      {/* Thumbnail */}
      <div className="course-card-thumbnail">
        <img 
          src={Thumbnail || 'default-thumbnail.jpg'} // Fallback if Thumbnail is missing
          alt={`Thumbnail of ${Name}`} // Improve accessibility with course name
        />
      </div>

      {/* Course Details */}
      <div className="course-card-details">
        <h3 className="course-title">{Name}</h3>
        {numberOfVideos && (
          <p><strong>Videos:</strong> {numberOfVideos}</p>
        )}
        {numberOfStudents && (
          <p><strong>Students:</strong> {numberOfStudents}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="course-card-buttons">
        <button className="btn-view" onClick={()=> navigate('/dashboard/courses/videos',{state:{Id:course.Id}})}> View All Videos</button>
        <button className="btn-update">Update</button>
      </div>
    </div>
  );
};

export default CourseCard;
