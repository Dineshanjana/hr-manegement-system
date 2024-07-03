import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Container, Collapse, Card } from 'react-bootstrap';
import CourseAddForm from './CourseAddForm';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [personnel, setPersonnel] = useState([]);
  const [open, setOpen] = useState(false);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);

  useEffect(() => {
    axios.get('/courses')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  const fetchPersonnel = (courseId) => {
    axios.get(`/courses/${courseId}/personnel`)
      .then(response => {
        setPersonnel(response.data);
        setSelectedCourse(courseId);
        setOpen(!open);
      })
      .catch(error => {
        console.error('Error fetching personnel:', error);
      });
  };

  const handleShowAddCourseModal = () => setShowAddCourseModal(true);
  const handleCloseAddCourseModal = () => setShowAddCourseModal(false);

  return (
    <Container>
      <h1 className="my-4 text-center">Course List</h1>
      <Button variant="success" onClick={handleShowAddCourseModal} className="mb-3">
        Add Course
      </Button>
      <Table striped bordered hover responsive className="text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Duration</th>
            <th>Personnel Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <React.Fragment key={course.id}>
              <tr>
                <td>{course.name}</td>
                <td>{course.duration}</td>
                <td>{course.personnel_count}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => fetchPersonnel(course.id)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                  >
                    Personnel
                  </Button>
                </td>
              </tr>
              {selectedCourse === course.id && (
                <tr>
                  <td colSpan="4">
                    <Collapse in={open}>
                      <div>
                        <Card>
                          <Card.Body>
                            <Table striped bordered hover responsive className="text-center">
                              <thead>
                                <tr>
                                  <th>Service Number</th>
                                  <th>First Name</th>
                                  <th>Last Name</th>
                                  <th>Start Date</th>
                                  <th>End Date</th>
                                  <th>Grade</th>
                                </tr>
                              </thead>
                              <tbody>
                                {personnel.map(person => (
                                  <tr key={person.service_number}>
                                    <td>{person.service_number}</td>
                                    <td>{person.first_name}</td>
                                    <td>{person.last_name}</td>
                                    <td>{person.start_date}</td>
                                    <td>{person.end_date}</td>
                                    <td>{person.grade}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </Card.Body>
                        </Card>
                      </div>
                    </Collapse>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
      <CourseAddForm show={showAddCourseModal} handleClose={handleCloseAddCourseModal} />
    </Container>
  );
};

export default CourseList;
