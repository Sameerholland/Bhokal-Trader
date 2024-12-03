import React, { useEffect } from 'react';
import CourseCard from './subComponet/CourseModel';
import '../Css/Coursecard.css';
import { useDispatch, useSelector } from 'react-redux';
import { AllCourses, GetAllCourseAsync } from '../Features/Course/CourseSlice';

export default function Course() {
  const dispatch = useDispatch();
  const Courses = useSelector(AllCourses);
  console.log(Courses.courses ,)

  useEffect(() => {
    if (!Courses || Courses.length === 0) {
      dispatch(GetAllCourseAsync()); // Fetch courses if they haven't been fetched already
    }
  }, [dispatch, Courses]);

  return (
    <div>
      <div className="app-container">
        {Courses && Courses && Courses.courses.length > 0 ? (
          Courses.courses.map((item) => (
            <CourseCard key={item.id} course={item} />
          ))
        ) : (
          <p>No courses available at the moment.</p>
        )}
      </div>
    </div>
  );
}
