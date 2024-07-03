import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import axios from 'axios';

const WifeForm = ({ wifeData, setWifeData }) => {
    const [wifeFormFields, setWifeFormFields] = useState([]);
    const [showAddFieldModal, setShowAddFieldModal] = useState(false);
    const [newFieldName, setNewFieldName] = useState('');
    const [newFieldType, setNewFieldType] = useState('text');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchWifeFormFields = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/wifeFormFields');
                setWifeFormFields(response.data);
            } catch (error) {
                console.error('Error fetching wife form fields', error);
                setError('Failed to fetch wife form fields. Please try again later.');
            }
        };

        fetchWifeFormFields();
    }, []);

    const handleWifeChange = (e) => {
        const { name, value, type, checked } = e.target;
        setWifeData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleAddWifeField = async () => {
        try {
            const newField = { fieldName: newFieldName, fieldType: newFieldType };
            const response = await axios.post('http://localhost:5000/api/wifeFormFields', newField);
            setWifeFormFields((prevFields) => [...prevFields, response.data]);
            setShowAddFieldModal(false);
            setNewFieldName('');
            setNewFieldType('text');
        } catch (error) {
            console.error('Error adding new field', error);
            setError('Failed to add new field. Please try again later.');
        }
    };

    return (
        <div className="wife-details">
            <h3>Wife Details</h3>
            {wifeFormFields.map((field) => (
                <Form.Group className="form-group" controlId={field.fieldName} key={field._id}>
                    <Form.Label>{field.fieldName}</Form.Label>
                    {field.fieldType === 'text' && (
                        <Form.Control
                            type="text"
                            name={field.fieldName}
                            value={wifeData[field.fieldName] || ''}
                            onChange={handleWifeChange}
                        />
                    )}
                    {field.fieldType === 'email' && (
                        <Form.Control
                            type="email"
                            name={field.fieldName}
                            value={wifeData[field.fieldName] || ''}
                            onChange={handleWifeChange}
                        />
                    )}
                    {field.fieldType === 'date' && (
                        <Form.Control
                            type="date"
                            name={field.fieldName}
                            value={wifeData[field.fieldName] || ''}
                            onChange={handleWifeChange}
                        />
                    )}
                    {field.fieldType === 'textarea' && (
                        <Form.Control
                            as="textarea"
                            name={field.fieldName}
                            rows={3}
                            value={wifeData[field.fieldName] || ''}
                            onChange={handleWifeChange}
                        />
                    )}
                    {field.fieldType === 'checkbox' && (
                        <Form.Check
                            type="checkbox"
                            name={field.fieldName}
                            checked={wifeData[field.fieldName] || false}
                            onChange={handleWifeChange}
                            label={field.fieldName}
                        />
                    )}
                </Form.Group>
            ))}
            <Button variant="secondary" onClick={() => setShowAddFieldModal(true)}>
                Add Wife Field
            </Button>

            <Modal show={showAddFieldModal} onHide={() => setShowAddFieldModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Field</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Field Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={newFieldName}
                            onChange={(e) => setNewFieldName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Field Type</Form.Label>
                        <Form.Control
                            as="select"
                            value={newFieldType}
                            onChange={(e) => setNewFieldType(e.target.value)}
                        >
                            <option value="text">Text</option>
                            <option value="email">Email</option>
                            <option value="date">Date</option>
                            <option value="textarea">Textarea</option>
                            <option value="checkbox">Checkbox</option>
                        </Form.Control>
                    </Form.Group>
                    {error && <Alert variant="danger">{error}</Alert>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddFieldModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddWifeField}>
                        Add Field
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default WifeForm;
