import React, { useState } from 'react';
import axios from 'axios';

const CourseAction = () => {
  const [courseCode, setCourseCode] = useState('');
  const [courseDetails, setCourseDetails] = useState({
    courses: '',
    year: '',
    sem: '',
    credits: '',
    course_description: '',
    pname: '',
    plink: ''
  });
  const [statusMessage, setStatusMessage] = useState('');

  // Add course function
  const addCourse = async () => {
    if (!validateCourseDetails()) return;

    try {
      const { data } = await axios.post('/api/courses/add', courseDetails);
      setStatusMessage(`Course "${data.course.courses}" added successfully!`);
      clearForm();
    } catch (error) {
      setStatusMessage('Error adding course. Please check the input fields.');
      console.error(error);
    }
  };

  // Update course function
  const updateCourse = async () => {
    if (!courseCode || !validateCourseDetails()) return;

    try {
      const { data } = await axios.put(`/api/courses/update/${courseCode}`, courseDetails);
      setStatusMessage(`Course "${data.course.courses}" updated successfully!`);
      clearForm();
    } catch (error) {
      setStatusMessage('Error updating course. Ensure course code exists.');
      console.error(error);
    }
  };

  // Delete course function
  const deleteCourse = async () => {
    if (!courseCode) {
      setStatusMessage('Please enter a course code to delete.');
      return;
    }

    try {
      await axios.delete(`/api/courses/delete/${courseCode}`);
      setStatusMessage('Course deleted successfully!');
      clearForm();
    } catch (error) {
      setStatusMessage('Error deleting course. Ensure course code exists.');
      console.error(error);
    }
  };

  // Handle input changes for course details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails({ ...courseDetails, [name]: value });
  };

  // Validate course details to ensure all fields are filled
  const validateCourseDetails = () => {
    const requiredFields = ['courses', 'year', 'sem', 'credits', 'course_description', 'pname', 'plink'];
    for (let field of requiredFields) {
      if (!courseDetails[field]) {
        setStatusMessage(`Please fill all fields before submitting.`);
        return false;
      }
    }
    return true;
  };

  // Clear the form fields after success or failure
  const clearForm = () => {
    setCourseDetails({
      courses: '',
      year: '',
      sem: '',
      credits: '',
      course_description: '',
      pname: '',
      plink: ''
    });
    setCourseCode('');
  };

  return (
    <div>
      <h2>Manage Courses</h2>

      {/* Course Code */}
      <div>
        <label>Course Code:</label>
        <input
          type="text"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          placeholder="Enter course code"
        />
      </div>

      {/* Add Course Form */}
      <div>
        <h3>Add Course</h3>
        <input
          type="text"
          name="courses"
          value={courseDetails.courses}
          onChange={handleInputChange}
          placeholder="Course Name"
        />
        <input
          type="number"
          name="year"
          value={courseDetails.year}
          onChange={handleInputChange}
          placeholder="Year"
        />
        <input
          type="number"
          name="sem"
          value={courseDetails.sem}
          onChange={handleInputChange}
          placeholder="Semester"
        />
        <input
          type="number"
          name="credits"
          value={courseDetails.credits}
          onChange={handleInputChange}
          placeholder="Credits"
        />
        <input
          type="text"
          name="course_description"
          value={courseDetails.course_description}
          onChange={handleInputChange}
          placeholder="Course Description"
        />
        <input
          type="text"
          name="pname"
          value={courseDetails.pname}
          onChange={handleInputChange}
          placeholder="Professor Name"
        />
        <input
          type="text"
          name="plink"
          value={courseDetails.plink}
          onChange={handleInputChange}
          placeholder="Professor Link"
        />
        <button onClick={addCourse}>Add Course</button>
      </div>

      {/* Update Course Form */}
      <div>
        <h3>Update Course</h3>
        <button onClick={updateCourse}>Update Course</button>
      </div>

      {/* Delete Course Form */}
      <div>
        <h3>Delete Course</h3>
        <button onClick={deleteCourse}>Delete Course</button>
      </div>

      {/* Status Message */}
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default CourseAction;