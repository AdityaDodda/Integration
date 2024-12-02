// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
import Navbar from './components/Navbar';
import CreateJob from './components/CreateJob';
import CreatePracticeQuestion from './components/CreatePracticeQuestion';
import GetJobs from './components/GetJobs';
import GetPracticeQuestions from './components/GetPracticeQuestions';
import GetCourses from './components/GetCourses';
import CourseAction from './components/CourseAction';
import BlogListing from './components/BlogListing';  // Add BlogListing component for student side
import CreateBlog from './components/CreateBlog';    // Add CreateBlog component for student side

const App = () => {
  const [userRole, setUserRole] = useState(null); // Keep track of user role

  // Check local storage for userRole on page load
  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role) {
      setUserRole(role);
    }
  }, []);

  // Handle login by setting the user role and storing in localStorage
  const handleLogin = (role) => {
    setUserRole(role);
    localStorage.setItem('userRole', role);  // Store user role in localStorage
  };

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Admin Routes */}
        {userRole === 'admin' && (
          <>
            <Route
              path="/admin-dashboard"
              element={
                <>
                  <Navbar userRole={userRole} />
                  <AdminDashboard />
                </>
              }
            />
            <Route
              path="/create-job"
              element={
                <>
                  <Navbar userRole={userRole} />
                  <CreateJob />
                </>
              }
            />
            <Route
              path="/create-practice-question"
              element={
                <>
                  <Navbar userRole={userRole} />
                  <CreatePracticeQuestion />
                </>
              }
            />
             <Route
              path="/course-action"
              element={
                <>
                  <Navbar userRole={userRole} />
                  <CourseAction />
                </>
              }
            />
            {/* Add other admin routes here */}
          </>
        )}

        {/* Student Routes */}
        {userRole === 'student' && (
          <>
            <Route
              path="/student-dashboard"
              element={
                <>
                  <Navbar userRole={userRole} />
                  <StudentDashboard />
                </>
              }
            />
            <Route
              path="/get-jobs"
              element={
                <>
                  <Navbar userRole={userRole} />
                  <GetJobs />
                </>
              }
            />
            <Route
              path="/get-practice-questions"
              element={
                <>
                  <Navbar userRole={userRole} />
                  <GetPracticeQuestions />
                </>
              }
            />
            <Route
              path="/get-courses"
              element={
                <>
                  <Navbar userRole={userRole} />
                  <GetCourses />
                </>
              }
            />
            <Route
              path="/blogs"
              element={
                <>
                  <Navbar userRole={userRole} />
                  <BlogListing /> {/* Blog Listing page for student */}
                </>
              }
            />
            <Route
              path="/create-blog"
              element={
                <>
                  <Navbar userRole={userRole} />
                  <CreateBlog /> {/* Create Blog page for student */}
                </>
              }
            />
          </>
        )}

        {/* Redirect to the correct dashboard if logged in */}
        <Route
          path="*"
          element={
            userRole ? <Navigate to={`/${userRole}-dashboard`} /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;