import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const LeaveManagement = () => {
    const [leaves, setLeaves] = useState([]);
    const [show, setShow] = useState(false);
    const [newLeave, setNewLeave] = useState({ employeeName: '', leaveType: '', startDate: '', endDate: '', status: 'Pending' });
    const [editLeave, setEditLeave] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/leaves');
            setLeaves(response.data);
            setLoading(false);
        } catch (error) {
            setError('Error fetching leave requests');
            setLoading(false);
            console.error('Error fetching leave requests', error);
        }
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewLeave({ ...newLeave, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editLeave) {
                await axios.put(`http://localhost:5000/api/leaves/${editLeave._id}`, newLeave);
                setEditLeave(null);
            } else {
                await axios.post('http://localhost:5000/api/leaves', newLeave);
            }
            fetchLeaves();
            handleClose();
        } catch (error) {
            console.error('Error saving leave request', error);
        }
    };

    const handleEdit = (leave) => {
        setEditLeave(leave);
        setNewLeave({ employeeName: leave.employeeName, leaveType: leave.leaveType, startDate: leave.startDate, endDate: leave.endDate, status: leave.status });
        handleShow();
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/leaves/${id}`);
            fetchLeaves();
        } catch (error) {
            console.error('Error deleting leave request', error);
        }
    };

    return (
        <Container className="mt-5">
            <h2>Leave Management</h2>
            <Button variant="primary" onClick={handleShow}>Request Leave</Button>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <Table striped bordered hover className="mt-3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Employee Name</th>
                            <th>Leave Type</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaves.map((leave) => (
                            <tr key={leave._id}>
                                <td>{leave._id}</td>
                                <td>{leave.employeeName}</td>
                                <td>{leave.leaveType}</td>
                                <td>{leave.startDate}</td>
                                <td>{leave.endDate}</td>
                                <td>{leave.status}</td>
                                <td>
                                    <Button variant="info" size="sm" className="me-2" onClick={() => handleEdit(leave)}>Edit</Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(leave._id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editLeave ? 'Edit Leave Request' : 'Request Leave'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="employeeName">
                            <Form.Label>Employee Name</Form.Label>
                            <Form.Control type="text" name="employeeName" value={newLeave.employeeName} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="leaveType">
                            <Form.Label>Leave Type</Form.Label>
                            <Form.Control as="select" name="leaveType" value={newLeave.leaveType} onChange={handleChange} required>
                                <option value="">Select Leave Type</option>
                                <option value="Annual">Annual</option>
                                <option value="Sick">Sick</option>
                                <option value="Maternity">Maternity</option>
                                <option value="Paternity">Paternity</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="startDate">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control type="date" name="startDate" value={newLeave.startDate} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="endDate">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control type="date" name="endDate" value={newLeave.endDate} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="status">
                            <Form.Label>Status</Form.Label>
                            <Form.Control as="select" name="status" value={newLeave.status} onChange={handleChange} required>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            {editLeave ? 'Update' : 'Submit'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default LeaveManagement;
