import React, { useState } from 'react';
import { Table, Button, Container, Form } from 'react-bootstrap';
import './AttendanceManagement.css';


const AttendanceManagement = () => {
    // Sample attendance data
    const [attendanceRecords, setAttendanceRecords] = useState([
        { id: 1, employeeName: 'John Doe', date: '2024-06-01', status: 'Present' },
        { id: 2, employeeName: 'Jane Smith', date: '2024-06-01', status: 'Absent' },
    ]);

    const [newRecord, setNewRecord] = useState({ employeeName: '', date: '', status: 'Present' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewRecord({ ...newRecord, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setAttendanceRecords([...attendanceRecords, { ...newRecord, id: attendanceRecords.length + 1 }]);
    };

    return (
        <Container className="mt-5">
            <h2>Attendance Management</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="employeeName">
                    <Form.Label>Employee Name</Form.Label>
                    <Form.Control type="text" name="employeeName" value={newRecord.employeeName} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" name="date" value={newRecord.date} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="status">
                    <Form.Label>Status</Form.Label>
                    <Form.Control as="select" name="status" value={newRecord.status} onChange={handleChange} required>
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="On Leave">On Leave</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Add Record
                </Button>
            </Form>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Employee Name</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceRecords.map((record) => (
                        <tr key={record.id}>
                            <td>{record.id}</td>
                            <td>{record.employeeName}</td>
                            <td>{record.date}</td>
                            <td>{record.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default AttendanceManagement;
