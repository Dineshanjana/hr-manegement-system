import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddCourseForm = ({ serviceNumber, onClose }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [grade, setGrade] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/getcourses');
        console.log('Fetched courses:', response.data);
        setCourses(response.data); // Assuming response.data is an array of course objects with id and name
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCourse || !startDate || !endDate || !grade) {
      alert('Please fill in all fields');
      return;
    }

    try {
      console.log('Submitting with course details:', {
        serviceNumber,
        courseId: selectedCourse,
        startDate,
        endDate,
        grade,
      });
      const courseData = {
        serviceNumber,
        courseId: selectedCourse,
        startDate,
        endDate,
        grade,
      };
      const response = await axios.post('/addcourses', courseData);
      console.log('Course added successfully:', response.data);
      onClose(); // Closing modal after successful submission
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  if (loading) {
    return <p>Loading courses...</p>;
  }

  return (
    <div className="add-course-form">
      <h3>Add Course</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="course">Course:</label>
          <select id="course" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="grade">Grade:</label>
          <input
            type="text"
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Course
        </button>
      </form>
      <button className="btn btn-secondary mt-2" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default AddCourseForm;
