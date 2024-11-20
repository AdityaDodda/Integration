import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JobBoard from './components/job-board/JobBoard';
import PostJobForm from './components/job-board/PostJobForm';
import BlogList from './components/blog-platform/BlogList';
import BlogDetails from './components/blog-platform/BlogDetails';
import CreateBlog from './components/blog-platform/CreateBlog';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Practice from './components/Practice';
import './styles.css';

const App = () => {
  return (
    <Router>
    <Navbar />
    <Routes>
      {/* Home route */}
      <Route path="/" element={<Home />} />

      {/* Practice route */}
      <Route path='/practice' element={<Practice />} />

      {/* Job Board routes */}
      <Route path="/job-board" element={<JobBoard />} />
      <Route path="/post-job" element={<PostJobForm />} />

      {/* Blog Platform routes */}
      <Route path="/blog-platform" element={<BlogList />} />
      <Route path="/blogs/:id" element={<BlogDetails />} />
      <Route path="/create" element={<CreateBlog />} />
    </Routes>
  </Router>
  );
};

export default App;