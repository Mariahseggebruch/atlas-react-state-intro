import React, { useEffect, useState } from 'react';
import { CourseContext } from './CourseContext';

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);   


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

  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle order
    } else {
      setSortBy(column);
      setSortOrder('asc'); // Reset order for new column
    }
  };

  const sortedCourses = courses.slice().sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'trimester':
        comparison = a.trimester.localeCompare(b.trimester);
        break;
      case 'courseNumber':
        comparison = a.courseNumber.localeCompare(b.courseNumber);
        break;
      case 'courseName':
        comparison = a.courseName.localeCompare(b.courseName);
        break;
      case 'semesterCredits':
        comparison = a.semesterCredits - b.semesterCredits;
        break;
      case 'totalClockHours':
        comparison = a.totalClockHours - b.totalClockHours;
        break;
      default:
        break;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const filteredCourses = sortedCourses.filter((course) => {
    const searchTermLowerCase = searchText.toLowerCase();
    return (
      course.courseNumber.toLowerCase().includes(searchTermLowerCase) ||
      course.courseName.toLowerCase().includes(searchTermLowerCase)
    );
  });

  const pageSize = 5; // Number of courses to show per page
  const totalPages = Math.ceil(filteredCourses.length / pageSize); // Calculate total pages

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const   
 startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredCourses.length);
  const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

  return (
    <CourseContext.Consumer>
      {({ enrolledCourses, enrollCourse, dropCourse }) => (
        <div className="school-catalog">
          <h1>School Catalog ({enrolledCourses.length} Courses Enrolled)</h1>
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={handleSearchChange}
          />
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort('trimester')}>
                  Trimester
                </th>
                <th onClick={() => handleSort('courseNumber')}>
                  Course Number
                </th>
                <th onClick={() => handleSort('courseName')}>
                  Course Name
                </th>
                <th onClick={() => handleSort('semesterCredits')}>
                  Semester Credits
                </th>
                <th onClick={() => handleSort('totalClockHours')}>
                  Total Clock Hours
                </th>
                <th>Enroll</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCourses.map((course) => (
                <tr key={course.id}>
                  <td>{course.trimester}</td>
                  <td>{course.courseNumber}</td>
                  <td>{course.courseName}</td>
                  <td>{course.semesterCredits}</td>
                  <td>{course.totalClockHours}</td>
                  <td>
                    <button
                      onClick={() =>
                        enrolledCourses.some(
                          (enrolled) => enrolled.courseNumber === course.courseNumber
                        )
                          ? dropCourse(course.courseNumber)
                          : enrollCourse(course)
                      }
                    >
                      {enrolledCourses.some(
                        (enrolled) => enrolled.courseNumber === course.courseNumber
                      )
                        ? 'Drop'
                        : 'Enroll'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button disabled={currentPage === 1} onClick={handlePrevious}>
              Previous
            </button>
            <button disabled={currentPage === totalPages} onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      )}
    </CourseContext.Consumer>
  );
}
