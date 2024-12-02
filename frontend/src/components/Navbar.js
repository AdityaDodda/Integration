// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ userRole }) => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {userRole === 'admin' ? (
          <>
            <li><Link to="/create-job">Create Job</Link></li>
            <li><Link to="/create-practice-question">Create Practice Question</Link></li>
            <li><Link to="/course-actions">Course Actions</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/get-jobs">Get Jobs</Link></li>
            <li><Link to="/get-practice-questions">Get Practice Questions</Link></li>
            <li><Link to="/get-courses">Get Courses</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;