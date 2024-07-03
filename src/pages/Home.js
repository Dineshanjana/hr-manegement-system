import React, { useState } from 'react';
import { Card, ListGroup, Form, Button } from 'react-bootstrap';
import './Home.css';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');

    const addTask = () => {
        if (task) {
            setTasks([...tasks, task]);
            setTask('');
        }
    };

    const handleTaskChange = (e) => {
        setTask(e.target.value);
    };

    const personnelData = {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-01-01',
        rank: 'Sergeant',
        contactInfo: '123-456-7890',
        serviceNumber: '123456',
        branch: 'Army',
        unit: 'Infantry',
        enlistmentDate: '2010-06-01',
        dischargeDate: '2020-06-01',
        married: true,
        hasChildren: true,
        numberOfChildren: 2,
        aadhaarNumber: '1234-5678-9101',
        pancardNumber: 'ABCDE1234F',
        address: '123 Main St, City, Country',
        photo: 'https://via.placeholder.com/150',
        emailId: 'john.doe@example.com',
        bloodGroup: 'O+',
        courses: [
            { courseId: '1', name: 'Basic Training', startDate: '2010-07-01', completionDate: '2010-09-01', grade: 'A' },
            { courseId: '2', name: 'Advanced Infantry', startDate: '2011-01-01', completionDate: '2011-03-01', grade: 'B' },
        ],
    };

    const latestNews = [
        "Army announces new training program starting next month.",
        "Annual military exercises to be held in August.",
        "New uniform regulations have been released.",
    ];

    const eventCalendar = [
        { event: "Basic Training Begins", date: "2024-07-01" },
        { event: "Advanced Infantry Training", date: "2024-08-15" },
        { event: "Annual Military Exercises", date: "2024-09-10" },
    ];

    return (
        <div className="home-page">
            <Card className="welcome-card">
                <Card.Header> Welcome</Card.Header>
                <Card.Body>
                    <Card.Title>Welcome, {personnelData.rank} {personnelData.firstName} {personnelData.lastName}!</Card.Title>
                    <Card.Text>
                        We are glad to have you here. Please find your personal information and tasks below.
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card className="personnel-card">
                <Card.Header>Personnel Information</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item><strong>First Name:</strong> {personnelData.firstName}</ListGroup.Item>
                    <ListGroup.Item><strong>Last Name:</strong> {personnelData.lastName}</ListGroup.Item>
                    <ListGroup.Item><strong>Date of Birth:</strong> {personnelData.dateOfBirth}</ListGroup.Item>
                    <ListGroup.Item><strong>Rank:</strong> {personnelData.rank}</ListGroup.Item>
                    <ListGroup.Item><strong>Contact Info:</strong> {personnelData.contactInfo}</ListGroup.Item>
                    <ListGroup.Item><strong>Service Number:</strong> {personnelData.serviceNumber}</ListGroup.Item>
                    <ListGroup.Item><strong>Branch:</strong> {personnelData.branch}</ListGroup.Item>
                    <ListGroup.Item><strong>Unit:</strong> {personnelData.unit}</ListGroup.Item>
                    <ListGroup.Item><strong>Enlistment Date:</strong> {personnelData.enlistmentDate}</ListGroup.Item>
                    <ListGroup.Item><strong>Discharge Date:</strong> {personnelData.dischargeDate}</ListGroup.Item>
                    <ListGroup.Item><strong>Married:</strong> {personnelData.married ? 'Yes' : 'No'}</ListGroup.Item>
                    <ListGroup.Item><strong>Has Children:</strong> {personnelData.hasChildren ? 'Yes' : 'No'}</ListGroup.Item>
                    {personnelData.hasChildren && (
                        <ListGroup.Item><strong>Number of Children:</strong> {personnelData.numberOfChildren}</ListGroup.Item>
                    )}
                    <ListGroup.Item><strong>Aadhaar Number:</strong> {personnelData.aadhaarNumber}</ListGroup.Item>
                    <ListGroup.Item><strong>PAN Card Number:</strong> {personnelData.pancardNumber}</ListGroup.Item>
                    <ListGroup.Item><strong>Address:</strong> {personnelData.address}</ListGroup.Item>
                    <ListGroup.Item><strong>Email ID:</strong> {personnelData.emailId}</ListGroup.Item>
                    <ListGroup.Item><strong>Blood Group:</strong> {personnelData.bloodGroup}</ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Courses:</strong>
                        <ul>
                            {personnelData.courses.map((course, index) => (
                                <li key={index}>
                                    <strong>Course:</strong> {course.name}, <strong>Start Date:</strong> {course.startDate}, <strong>Completion Date:</strong> {course.completionDate}, <strong>Grade:</strong> {course.grade}
                                </li>
                            ))}
                        </ul>
                    </ListGroup.Item>
                </ListGroup>
            </Card>

            <Card className="todo-card">
                <Card.Header>To-Do List</Card.Header>
                <ListGroup variant="flush">
                    {tasks.map((task, index) => (
                        <ListGroup.Item key={index}>{task}</ListGroup.Item>
                    ))}
                </ListGroup>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="formTask">
                            <Form.Control
                                type="text"
                                placeholder="Enter a new task"
                                value={task}
                                onChange={handleTaskChange}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={addTask}>
                            Add Task
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

            <div className="news-calendar-container">
                <Card className="news-card">
                    <Card.Header>Latest News</Card.Header>
                    <ListGroup variant="flush">
                        {latestNews.map((news, index) => (
                            <ListGroup.Item key={index}>{news}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card>

                <Card className="calendar-card">
                    <Card.Header>Event Calendar</Card.Header>
                    <ListGroup variant="flush">
                        {eventCalendar.map((event, index) => (
                            <ListGroup.Item key={index}>
                                <strong>Event:</strong> {event.event}, <strong>Date:</strong> {event.date}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card>
            </div>
        </div>
    );
};

export default Home;
