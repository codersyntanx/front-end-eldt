import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('https://server-of-united-eldt.vercel.app/courses')
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  return (
    <div>
      <div className="main-contain-regist">
        <div className="card-head">Registration</div>
        <div className='lesson_bar'></div>
        <div className="card-body">
   

        </div>
        </div>
        </div>
  );
};

export default CourseList;
