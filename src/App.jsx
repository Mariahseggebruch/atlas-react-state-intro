import React from 'react';
import Header from './Header';
import SchoolCatalog from './SchoolCatalog';
import ClassSchedule from './ClassSchedule';
import { CourseProvider } from './CourseContext'; // Import CourseProvider

export default function App() {
  return (
    <div>
      <CourseProvider>
        <Header />
        <SchoolCatalog />
        <ClassSchedule />
      </CourseProvider>
    </div>
  );
}
