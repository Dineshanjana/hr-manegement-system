import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Tab, Nav, Table, Card, Button } from 'react-bootstrap';
import AddCourseForm from './AddCourseForm'; // Adjust the path as per your project structure

const PersonnelDetails = () => {
  const { service_number } = useParams();
  const [personnel, setPersonnel] = useState({});
  const [columns, setColumns] = useState([]);
  const [wifeColumns, setWifeColumns] = useState([]);
  const [childColumns, setChildColumns] = useState([]);
  const [courses, setCourses] = useState([]);
  const [postings, setPostings] = useState([]);
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);
  const [showTabs, setShowTabs] = useState(true);
  const [wifeData, setWifeData] = useState([]);
  const [childData, setChildData] = useState([]);

  useEffect(() => {
    fetchPersonnelDetails();
    fetchColumns();
    fetchwifeColumns();
    fetchchildColumns();
    fetchCourses();
    fetchPostings();
  }, [service_number]);

  const fetchPersonnelDetails = async () => {
    try {
      const response = await axios.get(`/personnel/Details/${service_number}`);
      setPersonnel(response.data[0]); // Assuming response.data is an array with one object
    } catch (error) {
      console.error('Error fetching personnel details:', error);
    }
  };

  const fetchColumns = async () => {
    try {
      const response = await axios.get('/personnel/columns');
      setColumns(response.data.map((col) => col.Field));
    } catch (error) {
      console.error('Error fetching columns:', error);
    }
  };

  const fetchwifeColumns = async () => {
    try {
      const response = await axios.get('/personnel/columswife');
      setwifeColumns(response.data.map((col) => col.Field));
    } catch (error) {
      console.error('Error fetching columns:', error);
    }
  };

  const fetchchildColumns = async () => {
    try {
      const response = await axios.get('/personnel/columnschild');
      setchildColumns(response.data.map((col) => col.Field));
    } catch (error) {
      console.error('Error fetching columns:', error);
    }
  };


  

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`/getpersonnelcourses/${service_number}`);
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };


  const fetchPostings = async () => {
    try {
      const response = await axios.get(`/postings/${service_number}`);
      setPostings(response.data);
    } catch (error) {
      console.error('Error fetching postings:', error);
    }
  };

  const fetchWifeData = async () => {
    try {
      const response = await axios.get(`/personnel/getwife/${service_number}`);
      setWifeData(response.data);
      setWifeColumns(Object.keys(response.data[0] || {}));
    } catch (error) {
      console.error('Error fetching wife data:', error);
    }
  };

  const fetchChildData = async () => {
    try {
      const response = await axios.get(`/personnel/getchild/${service_number}`);
      setChildData(response.data);
      setChildColumns(Object.keys(response.data[0] || {}));
    } catch (error) {
      console.error('Error fetching child data:', error);
    }
  };

  const toggleAddCourseForm = () => {
    setShowAddCourseForm(!showAddCourseForm);
  };

  const toggleTabsVisibility = () => {
    setShowTabs(!showTabs);
  };

  const handleTabSelect = (key) => {
    if (key === 'wife') {
      fetchWifeData();
    } else if (key === 'child') {
      fetchChildData();
    }
  };

  return (
    <Container fluid className="py-4">
      {/* Toggle Tabs Button */}
      <div className="text-right mb-3">
        <Button variant="outline-primary" onClick={toggleTabsVisibility}>
          {showTabs ? 'Hide Tabs' : 'Show Tabs'}
        </Button>
      </div>

      {/* Tabs and Content */}
      {showTabs && (
        <Tab.Container id="personnel-details-tabs" defaultActiveKey="personnel" onSelect={handleTabSelect}>
          <Row>
            <Col sm={2}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="personnel">Personnel Details</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="wife">Wife Details</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="child">Child Details</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="courses">Courses</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="postings">Postings</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                <Tab.Pane eventKey="personnel">
                  <Card className="shadow-sm mb-4">
                    <Card.Header as="h5" className="bg-primary text-white text-center py-3">
                      Personnel Details
                    </Card.Header>
                    <Card.Body>
                      <Table striped bordered hover responsive className="table custom-table">
                        <thead>
                          <tr>
                            <th colSpan="2" className="text-center">Personnel Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {columns.map((column) => (
                            <tr key={column}>
                              <td>
                                <strong>{column}</strong>
                              </td>
                              <td>{personnel[column]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
                <Tab.Pane eventKey="wife">
                  <Card className="shadow-sm mb-4">
                    <Card.Header as="h5" className="bg-primary text-white text-center py-3">
                      Wife Details
                    </Card.Header>
                    <Card.Body>
                      <Table striped bordered hover responsive className="table custom-table">
                        <thead>
                          <tr>
                            <th colSpan="2" className="text-center">Wife Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {wifeColumns.map((column) => (
                            <tr key={`wife_${column}`}>
                              <td>
                                <strong>{column}</strong>
                              </td>
                              <td>{wifeData[0]?.[column]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
                <Tab.Pane eventKey="child">
                  <Card className="shadow-sm mb-4">
                    <Card.Header as="h5" className="bg-primary text-white text-center py-3">
                      Child Details
                    </Card.Header>
                    <Card.Body>
                      <Table striped bordered hover responsive className="table custom-table">
                        <thead>
                          <tr>
                            <th colSpan="2" className="text-center">Child Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {childColumns.map((column) => (
                            <tr key={`child_${column}`}>
                              <td>
                                <strong>{column}</strong>
                              </td>
                              <td>{childData[0]?.[column]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
                <Tab.Pane eventKey="courses">
                  <Card className="shadow-sm mb-4">
                    <Card.Header as="h5" className="bg-primary text-white text-center py-3">
                      Courses
                    </Card.Header>
                    <Card.Body>
                      <Table striped bordered hover responsive className="table custom-table">
                        <thead>
                          <tr>
                            <th>Course Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Grade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {courses.map((course, index) => (
                            <tr key={index}>
                              <td>{course.course_name}</td>
                              <td>{course.start_date}</td>
                              <td>{course.end_date}</td>
                              <td>{course.grade}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      <div className="text-center mt-3">
                        <Button variant="primary" onClick={toggleAddCourseForm}>
                          Add Course
                        </Button>
                      </div>
                      {showAddCourseForm && (
                        <AddCourseForm
                          serviceNumber={service_number}
                          courses={courses}
                          onClose={toggleAddCourseForm}
                        />
                      )}
                    </Card.Body>
                  </Card>
                </Tab.Pane>
                <Tab.Pane eventKey="postings">
                  <Card className="shadow-sm mb-4">
                    <Card.Header as="h5" className="bg-primary text-white text-center py-3">
                      Postings
                    </Card.Header>
                    <Card.Body>
                      <Table striped bordered hover responsive className="table custom-table">
                        <thead>
                          <tr>
                            <th>Posted To</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Number of Days</th>
                            <th>Prefix Date</th>
                            <th>Suffix Date</th>
                            <th>Remarks</th>
                            <th>Reported On Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {postings.map((posting, index) => (
                            <tr key={index}>
                              <td>{posting.posted_to}</td>
                              <td>{posting.start_date}</td>
                              <td>{posting.end_date}</td>
                              <td>{posting.no_of_days}</td>
                              <td>{posting.prefix_date}</td>
                              <td>{posting.suffix_date}</td>
                              <td>{posting.remarks}</td>
                              <td>{posting.reported_on_date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      )}

      {/* All Sections Together */}
      <div className={!showTabs ? 'mt-4' : 'd-none'}>
        <Card className="shadow-sm mb-4">
          <Card.Header as="h5" className="bg-primary text-white text-center py-3">
            Personnel Details
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover responsive className="table custom-table">
              <thead>
                <tr>
                  <th colSpan="2" className="text-center">Personnel Details</th>
                </tr>
              </thead>
              <tbody>
                {columns.map((column) => (
                  <tr key={column}>
                    <td>
                      <strong>{column}</strong>
                    </td>
                    <td>{personnel[column]}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <Card className="shadow-sm mb-4">
          <Card.Header as="h5" className="bg-primary text-white text-center py-3">
            Wife Details
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover responsive className="table custom-table">
              <thead>
                <tr>
                  <th colSpan="2" className="text-center">Wife Details</th>
                </tr>
              </thead>
              <tbody>
                {wifeColumns.map((column) => (
                  <tr key={`wife_${column}`}>
                    <td>
                      <strong>{column}</strong>
                    </td>
                    <td>{wifeData[0]?.[column]}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <Card className="shadow-sm mb-4">
          <Card.Header as="h5" className="bg-primary text-white text-center py-3">
            Child Details
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover responsive className="table custom-table">
              <thead>
                <tr>
                  <th colSpan="2" className="text-center">Child Details</th>
                </tr>
              </thead>
              <tbody>
                {childColumns.map((column) => (
                  <tr key={`child_${column}`}>
                    <td>
                      <strong>{column}</strong>
                    </td>
                    <td>{childData[0]?.[column]}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <Card className="shadow-sm mb-4">
          <Card.Header as="h5" className="bg-primary text-white text-center py-3">
            Courses
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover responsive className="table custom-table">
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index}>
                    <td>{course.course_name}</td>
                    <td>{course.start_date}</td>
                    <td>{course.end_date}</td>
                    <td>{course.grade}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-center mt-3">
              <Button variant="primary" onClick={toggleAddCourseForm}>
                Add Course
              </Button>
            </div>
            {showAddCourseForm && (
              <AddCourseForm
                serviceNumber={service_number}
                courses={courses}
                onClose={toggleAddCourseForm}
              />
            )}
          </Card.Body>
        </Card>
        <Card className="shadow-sm mb-4">
          <Card.Header as="h5" className="bg-primary text-white text-center py-3">
            Postings
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover responsive className="table custom-table">
              <thead>
                <tr>
                  <th>Posted To</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Number of Days</th>
                  <th>Prefix Date</th>
                  <th>Suffix Date</th>
                  <th>Remarks</th>
                  <th>Reported On Date</th>
                </tr>
              </thead>
              <tbody>
                {postings.map((posting, index) => (
                  <tr key={index}>
                    <td>{posting.posted_to}</td>
                    <td>{posting.start_date}</td>
                    <td>{posting.end_date}</td>
                    <td>{posting.no_of_days}</td>
                    <td>{posting.prefix_date}</td>
                    <td>{posting.suffix_date}</td>
                    <td>{posting.remarks}</td>
                    <td>{posting.reported_on_date}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default PersonnelDetails;
