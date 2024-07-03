// src/components/PersonnelList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';

const PersonnelList = () => {
  const [personnel, setPersonnel] = useState([]);
  const [columns, setColumns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPersonnel();
    fetchColumns();
  }, []);

  const fetchPersonnel = async () => {
    try {
      const response = await axios.get('/personnel');
      setPersonnel(response.data);
    } catch (error) {
      console.error('Error fetching personnel:', error);
    }
  };

  const fetchColumns = async () => {
    try {
      const response = await axios.get('/personnel/columns');
      setColumns(response.data.map(col => col.Field));
    } catch (error) {
      console.error('Error fetching columns:', error);
    }
  };

  const handleFullDetails = (service_number) => {
    navigate(`/personnelDetails/${service_number}`);
  };

  return (
    <Container fluid>
      <Row className="justify-content-center my-4">
        <Col xs={12}>
          <h1 className="text-center">Personnel List</h1>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead className="thead-dark">
                <tr>
                  <th>Full Details</th>
                  {columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {personnel.map((person) => (
                  <tr key={person.personnel_id}>
                    <td>
                      <Button variant="primary" onClick={() => handleFullDetails(person.service_number)}>
                        Full Details
                      </Button>
                    </td>
                    {columns.map((column) => (
                      <td key={column}>{person[column]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PersonnelList;
