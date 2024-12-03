import React, { useEffect, useState } from 'react';
import StudentCard from './subComponet/UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { AllStudent, GetAllStudentASync } from '../Features/Users/UserSlice';

export default function Users() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const Students = useSelector(AllStudent); // Assuming 'users' is your slice in the state
  
  // Fetch student data when component mounts
  useEffect(() => {
    dispatch(GetAllStudentASync()).finally(() => setLoading(false));// Dispatch action to load students
  }, [dispatch]);

  if (loading) return <p>Loading students...</p>;


  
  if (!Students || Students.length === 0) {
    return <p>No students found.</p>; // Show a message when no students are available
  }

  return (
    <div>
      {Students.map((item) => (
        <StudentCard key={item.id} student={item} /> // Add unique 'key' prop
      ))}
    </div>
  );
}
