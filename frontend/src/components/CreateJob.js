// src/components/CreateJob.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateJob = () => {
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState({
    title: '',
    description: '',
    location: '',
    tags: '',
    jobType: 'Full-time',
    applyLink: '', // New field for the Apply Link
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tagsArray = jobDetails.tags.split(',').map((tag) => tag.trim());
      await axios.post('http://localhost:5000/api/jobs', {
        ...jobDetails,
        tags: tagsArray,
      });
      navigate('/admin-dashboard'); // Redirect after successful job post
    } catch (err) {
      console.error('Error posting job:', err);
    }
  };

  return (
    <div>
      <h1>Post a New Job</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={jobDetails.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={jobDetails.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={jobDetails.location}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={jobDetails.tags}
          onChange={handleChange}
          required
        />
        <select
          name="jobType"
          value={jobDetails.jobType}
          onChange={handleChange}
          required
        >
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>
        <input
          type="url"
          name="applyLink"
          placeholder="Apply Link"
          value={jobDetails.applyLink}
          onChange={handleChange}
          required
        />
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default CreateJob;