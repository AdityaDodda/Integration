import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs');
        setJobs(response.data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.description.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase()) ||
      job.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <h1>Job Board</h1>
      <Link to="/post-job">
        <button>Post a Job</button>
      </Link>
      <input
        type="text"
        placeholder="Search jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredJobs.map((job) => (
          <li key={job._id}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>Location: {job.location}</p>
            <p>Tags: {job.tags.join(', ')}</p>
            <p>Type: {job.jobType}</p>
            <a href={job.applyLink} target="_blank" rel="noopener noreferrer">
              Apply Here
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobBoard;