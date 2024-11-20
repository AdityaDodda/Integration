// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/practice">Practice</Link></li>
        <li><Link to="/job-board">Jobs</Link></li>
        <li><Link to="/blog-platform">Blogs</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;