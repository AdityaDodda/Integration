import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/blogs/${id}`).then((res) => setBlog(res.data));
  }, [id]);

  const submitComment = () => {
    axios
      .post(`http://localhost:5000/blogs/${id}/comments`, { comment })
      .then((res) => {
        setBlog(res.data);
        setComment('');
      });
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div>
      <h1>{blog.title}</h1>
      {blog.imageUrl && <img src={`http://localhost:5000${blog.imageUrl}`} alt={blog.title} />}
      {blog.sections.map((section, index) => (
        <div key={index}>
          <h2>{section.sectionTitle}</h2>
          <p dangerouslySetInnerHTML={{ __html: section.sectionContent }} />
        </div>
      ))}
      <h3>Comments</h3>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment" />
      <button onClick={submitComment}>Submit Comment</button>
    </div>
  );
}

export default BlogDetails;