import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';

const PersonnelList = () => {
  const [personnel, setPersonnel] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPersonnel = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/personnel');
        setPersonnel(response.data);
      } catch (error) {
        console.error('Error fetching personnel:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonnel();
  }, []);

  const handleFullDetails = (personnelId) => {
    navigate(`/personnelDetails/${personnelId}`);
  };

  const renderTableHeader = () => {
    if (personnel.length === 0) return null;
    const headers = Object.keys(personnel[0]);
    return (
      <tr>
        {headers.map((key) => (
          <th key={key} style={{ textAlign: 'center' }}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </th>
        ))}
        <th>Actions</th>
      </tr>
    );
  };

  const displayValue = (value) => {
    return typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value;
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col md={10}>
          <h2 className="text-center mb-4">Personnel List</h2>
          {loading ? (
            <div className="text-center">
              <i className="fas fa-spinner fa-spin" /> Loading...
            </div>
          ) : (
            <Table striped bordered hover responsive>
              <thead>{renderTableHeader()}</thead>
              <tbody>
                {personnel.map((person) => (
                  <tr key={person.personnel_id}>
                    {Object.values(person).map((value, idx) => (
                      <td key={idx} style={{ textAlign: 'center' }}>
                        {displayValue(value)}
                      </td>
                    ))}
                    <td style={{ textAlign: 'center' }}>
                      <Button variant="info" onClick={() => handleFullDetails(person.personnel_id)}>
                        Full Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PersonnelList;
