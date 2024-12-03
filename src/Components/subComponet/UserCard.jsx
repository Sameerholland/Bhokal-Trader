import React from 'react';
import '../../Css/usercard.css';

const StudentCard = ({ student }) => {
  return (
    <div className="student-card">
      <div className="student-details">
        <h3 className="student-name">{student.Name}</h3>
        <p><strong>Contact Number:</strong> {student.Contact_Number}</p>
        <p><strong>Email:</strong> {student.email_address}</p>
        <p><strong>Student ID:</strong> {student.Id}</p>
        <p><strong>Course ID:</strong> {student.Course_Id}</p>
      </div>
      <button className="update-btn">Update</button>
    </div>
  );
}

export default StudentCard;
