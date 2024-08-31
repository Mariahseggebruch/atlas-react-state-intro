import React, { createContext, useState } from 'react';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const   
 [enrolledCourses, setEnrolledCourses] = useState([]);

  const enrollCourse = (course) => {
    if (!enrolledCourses.some(({ courseNumber }) => courseNumber === course.courseNumber)) {
      setEnrolledCourses((prevEnrolledCourses) => [...prevEnrolledCourses, course]);
    }
  };

  const dropCourse = (courseNumber) => {
    setEnrolledCourses((prevEnrolledCourses) =>
      prevEnrolledCourses.filter(({ courseNumber: c }) => c !== courseNumber)
    );
  };

  return (
    <CourseContext.Provider
      value={{ enrolledCourses, enrollCourse, dropCourse }}
    >
      {children}
    </CourseContext.Provider>
  );
};
