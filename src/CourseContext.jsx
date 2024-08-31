import React, { createContext, useState } from 'react';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const   
 [enrolledCourses, setEnrolledCourses] = useState([]);

  const enrollCourse = (course) => {
    setEnrolledCourses((prevEnrolledCourses) => [...prevEnrolledCourses, course]);
  };

  const dropCourse = (course) => {
    setEnrolledCourses((prevEnrolledCourses) =>
      prevEnrolledCourses.filter((c) => c !== course)
    );
  };

  return ( // Closing curly brace added here
    <CourseContext.Provider value={{ enrolledCourses, enrollCourse, dropCourse }}>
      {children}
    </CourseContext.Provider>
  );
};
