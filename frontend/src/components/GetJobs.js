// src/components/GetJobs.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <h1>Available Jobs</h1>
      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job._id}>
              <h2>{job.title}</h2>
              <p>{job.description}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Job Type:</strong> {job.jobType}</p>
              <a href={job.applyLink} target="_blank" rel="noopener noreferrer">Apply here</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetJobs;