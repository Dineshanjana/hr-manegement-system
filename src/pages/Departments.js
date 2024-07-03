import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import './Department.css';


const Departments = () => {
    const [departments, setDepartments] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newDepartmentName, setNewDepartmentName] = useState('');

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/departments');
            setDepartments(response.data);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    const handleAddDepartment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/departments', {
                name: newDepartmentName
            });
            setDepartments([...departments, response.data]);
            setNewDepartmentName('');
            setShowAddModal(false);
        } catch (error) {
            console.error('Error adding department:', error);
        }
    };

    return (
        <Container className="mt-5">
            <h2>Department Management</h2>
            <Button variant="primary" onClick={() => setShowAddModal(true)} className="mb-3">
                Add Department
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((department) => (
                        <tr key={department._id}>
                            <td>{department._id}</td>
                            <td>{department.name}</td>
                            <td>
                                <Button variant="primary" size="sm" className="me-2">Edit</Button>
                                <Button variant="danger" size="sm">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for adding department */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Department</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formDepartmentName">
                        <Form.Label>Department Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={newDepartmentName}
                            onChange={(e) => setNewDepartmentName(e.target.value)}
                            placeholder="Enter department name"
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleAddDepartment}>Add Department</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Departments;
