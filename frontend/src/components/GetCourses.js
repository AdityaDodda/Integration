import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetCourses = () => {
  const [year, setYear] = useState('1'); // Default Year 1
  const [semester, setSemester] = useState('1'); // Default Semester 1
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch courses from the backend API
  const fetchCourses = async (year, semester) => {
    setLoading(true);
    try {
      const response = await axios.get('/api/courses', {
        params: { year, sem: semester },
      });
      setCourses(response.data); // Set the courses data to state
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch courses whenever year or semester changes
  useEffect(() => {
    fetchCourses(year, semester);
  }, [year, semester]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Available Courses</h2>

      {/* Year and Semester Dropdown */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>Year and Semester:</label>
        <select
          value={`${year}-${semester}`}
          onChange={(e) => {
            const [selectedYear, selectedSemester] = e.target.value.split('-');
            setYear(selectedYear);
            setSemester(selectedSemester);
          }}
        >
          <option value="1-1">Year 1, Semester 1</option>
          <option value="1-2">Year 1, Semester 2</option>
          <option value="2-1">Year 2, Semester 3</option>
          <option value="2-2">Year 2, Semester 4</option>
          <option value="3-1">Year 3, Semester 5</option>
          <option value="3-2">Year 3, Semester 6</option>
          <option value="4-1">Year 4, Semester 7</option>
          <option value="4-2">Year 4, Semester 8</option>
        </select>
      </div>

      {/* Display loading message */}
      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <div>
          {courses.length === 0 ? (
            <p>No courses found for the selected year and semester.</p>
          ) : (
            <div>
              {courses.map((course) => (
                <div
                  key={course.course_code}
                  style={{
                    border: '1px solid #ccc',
                    padding: '10px',
                    marginBottom: '10px',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  <h3>{course.courses}</h3>
                  <p>
                    <strong>Course Code:</strong> {course.course_code}
                  </p>
                  <p>
                    <strong>Credits:</strong> {course.credits}
                  </p>
                  <p>
                    <strong>Description:</strong> {course.course_description}
                  </p>
                  {course.plink && (
                    <p>
                      <strong>Project Link:</strong>{' '}
                      <a
                        href={course.plink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {course.pname || 'View Project'}
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GetCourses;