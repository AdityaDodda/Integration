import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/blogs').then((res) => setBlogs(res.data));
  }, []);

  return (
    <div>
      <h1>Blog List</h1>
      <button onClick={() => navigate('/create')}>Create Blog</button>
      {blogs.map((blog) => (
        <div key={blog._id}>
          <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
          {blog.imageUrl && <img src={`http://localhost:5000${blog.imageUrl}`} alt={blog.title} width="100" />}
        </div>
      ))}
    </div>
  );
}

export default BlogList;