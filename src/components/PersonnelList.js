//src\components\PersonnelList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Container, Row, Col, Tabs, Tab } from 'react-bootstrap';

const PersonnelList = () => {
  const [personnel, setPersonnel] = useState([]);
  const [columns, setColumns] = useState([]);
  const [wifecolums, setWifeColumns] = useState([]);
  const [childcolumns, setchildColumns] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    fetchPersonnel();
    fetchColumns();
    fetchwifeColumns();
    fetchchildColumns();
  }, []);

  const fetchPersonnel = async () => {
    try {
      const response = await axios.get('/personnel');
      setPersonnel(response.data);
      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.error('Error fetching personnel:', error);
      setLoading(false); // Ensure loading state is updated even on error
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
  

  const fetchwifeColumns = async () =>{
    try{
      const response = await axios.get('/personnel/columnswife');
      setWifeColumns(response.data.map(col => col.Field));
    }
    catch(error)
    {
      console.error('Error Fetching for wife columns', error);
    }
  };

  const fetchchildColumns = async () =>{
    try{
      const response = await axios.get('/personnel/columnschild');
      setchildColumns(response.data.map(col => col.Field));
    }
    catch(error)
    {
      console.error('Error Fetching for child columns', error);
    }
  };

  const handleFullDetails = (service_number) => {
    navigate(`/personnelDetails/${service_number}`);
  };

  // Show loading message or indicator when data is being fetched
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container fluid>
      <Row className="justify-content-center my-4">
        <Col xs={12}>
          <h1 className="text-center">Personnel List</h1>
          <Tabs defaultActiveKey="PersonnelDetails" className="mb-3">
            <Tab eventKey="PersonnelDetails" title="Personnel Details">
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
            </Tab>
            <Tab eventKey="WifeDetails" title="Wife Details">
            <div className="table-responsive">
                <Table striped bordered hover>
                  <thead className="thead-dark">
                    <tr>
                      <th>Full Details</th>
                      {wifecolums.map((wifecolumn) => (
                        <th key={wifecolumn}>{wifecolumn}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </Table>
              </div>
            </Tab>
            <Tab eventKey="ChildDetails" title="Child Details">
            <div className="table-responsive">
                <Table striped bordered hover>
                  <thead className="thead-dark">
                    <tr>
                      <th>Full Details</th>
                      {childcolumns.map((childcolumn) => (
                        <th key={childcolumn}>{childcolumn}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </Table>
              </div>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default PersonnelList;
