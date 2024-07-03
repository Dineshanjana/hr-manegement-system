import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PostingTable = () => {
    const [postings, setPostings] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedPosting, setSelectedPosting] = useState(null);

    useEffect(() => {
        axios.get('/postings')
            .then(response => {
                setPostings(response.data);
            })
            .catch(error => {
                console.error('Error fetching postings:', error);
                alert(`Error fetching postings: ${error.message}`);
            });
    }, []);

    const handleShow = (posting) => {
        setSelectedPosting(posting);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedPosting({
            ...selectedPosting,
            [name]: value
        });
    };

    const handleUpdate = () => {
        const formattedPosting = {
            ...selectedPosting,
            start_date: selectedPosting.start_date ? selectedPosting.start_date.split('T')[0] : null,
            end_date: selectedPosting.end_date ? selectedPosting.end_date.split('T')[0] : null,
            prefix_date: selectedPosting.prefix_date ? selectedPosting.prefix_date.split('T')[0] : null,
            suffix_date: selectedPosting.suffix_date ? selectedPosting.suffix_date.split('T')[0] : null,
            reporting_date: selectedPosting.reporting_date ? selectedPosting.reporting_date.split('T')[0] : null
        };

        axios.put(`/postings/${selectedPosting.personnel_id}`, formattedPosting)
            .then(response => {
                setPostings(postings.map(post => (post.personnel_id === selectedPosting.personnel_id ? formattedPosting : post)));
                setShow(false);
            })
            .catch(error => {
                console.error('Error updating posting:', error);
                alert(`Error updating posting: ${error.message}`);
            });
    };

    return (
        <Container>
            <h2 className="my-4">Postings</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Personnel ID</th>
                        <th>Name</th>
                        <th>Posted To</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Number of Days</th>
                        <th>Prefix Date</th>
                        <th>Suffix Date</th>
                        <th>Remarks</th>
                        <th>Reported Back</th>
                        <th>Reporting Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {postings.map((posting, index) => (
                        <tr key={index}>
                            <td>{posting.personnel_id}</td>
                            <td>{posting.name}</td>
                            <td>{posting.posted_to}</td>
                            <td>{posting.start_date}</td>
                            <td>{posting.end_date}</td>
                            <td>{posting.no_of_days}</td>
                            <td>{posting.prefix_date}</td>
                            <td>{posting.suffix_date}</td>
                            <td>{posting.remarks}</td>
                            <td>{posting.reported_back}</td>
                            <td>{posting.reporting_date}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleShow(posting)}>Update</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Posting</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedPosting && (
                        <Form>
                            <Form.Group>
                                <Form.Label>Posted To</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="posted_to" 
                                    value={selectedPosting.posted_to} 
                                    onChange={handleChange} 
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    name="start_date" 
                                    value={selectedPosting.start_date ? selectedPosting.start_date.split('T')[0] : ''} 
                                    onChange={handleChange} 
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>End Date</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    name="end_date" 
                                    value={selectedPosting.end_date ? selectedPosting.end_date.split('T')[0] : ''} 
                                    onChange={handleChange} 
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Number of Days</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    name="no_of_days" 
                                    value={selectedPosting.no_of_days} 
                                    onChange={handleChange} 
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Prefix Date</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    name="prefix_date" 
                                    value={selectedPosting.prefix_date ? selectedPosting.prefix_date.split('T')[0] : ''} 
                                    onChange={handleChange} 
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Suffix Date</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    name="suffix_date" 
                                    value={selectedPosting.suffix_date ? selectedPosting.suffix_date.split('T')[0] : ''} 
                                    onChange={handleChange} 
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Remarks</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="remarks" 
                                    value={selectedPosting.remarks} 
                                    onChange={handleChange} 
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Reported Back</Form.Label>
                                <Form.Control 
                                    as="select" 
                                    name="reported_back" 
                                    value={selectedPosting.reported_back} 
                                    onChange={handleChange}
                                >
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Reporting Date</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    name="reporting_date" 
                                    value={selectedPosting.reporting_date ? selectedPosting.reporting_date.split('T')[0] : ''} 
                                    onChange={handleChange} 
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleUpdate}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default PostingTable;
