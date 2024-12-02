// src/components/BlogListing.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlogListing = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(response.data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <h1>Blog Listings</h1>
      {blogs.length === 0 ? (
        <p>No blogs available</p>
      ) : (
        <ul>
          {blogs.map((blog) => (
            <li key={blog._id}>
              <h2>{blog.title}</h2>
              <p>{blog.sections[0]?.sectionContent}</p>
              {/* You can display more sections as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogListing;