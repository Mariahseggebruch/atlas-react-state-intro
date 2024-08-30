import React, { useEffect, useState } from 'react';

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/courses.json');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange   
 = (event) => {
    setSearchText(event.target.value.toLowerCase());   
 // Convert to lowercase for case-insensitive search
  };

  const filteredCourses = courses.filter((course) => {
    const searchTermLowerCase = searchText.toLowerCase();
    return (
      course.courseNumber.toLowerCase().includes(searchTermLowerCase) ||
      course.courseName.toLowerCase().includes(searchTermLowerCase)
    );
  }); //task 2 end, can push after fixing project 1

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input type="text" placeholder="Search" />
      <table>
        <thead>
          <tr>
            <th>Trimester</th>
            <th>Course Number</th>
            <th>Courses Name</th>
            <th>Semester Credits</th>
            <th>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
        {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.trimester}</td>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>{course.semesterCredits}</td>
              <td>{course.totalClockHours}</td>
              <td>
              <button>Enroll</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
}
