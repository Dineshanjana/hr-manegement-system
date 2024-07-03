import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseForm = ({ personnelId, onClose }) => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    courseId: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/personnel-courses', {
        ...formData,
        personnel_id: personnelId, // Assuming backend expects personnel_id
      });
      alert('Course added successfully!');
      onClose(); // Close the CourseForm
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <div>
      <label>
        Course:
        <select name="courseId" value={formData.courseId} onChange={handleChange}>
          <option value="">Select a course</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      </label>
    </div>
    <div>
      <label>
        Start Date:
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
      </label>
    </div>
    <div>
      <label>
        End Date:
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
      </label>
    </div>
    <button type="submit">Add Course</button>
    <button type="button" onClick={onClose}>Cancel</button>
  </form>
);
};

export default CourseForm;
