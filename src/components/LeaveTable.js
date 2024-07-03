import React, { useState, useEffect } from 'react';
import { Table, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';
import './LeaveTable.css'; // Adjust the path based on your project structure

const LeaveTable = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [approvedData, setApprovedData] = useState([]);
  const [absentData, setAbsentData] = useState([]);

  useEffect(() => {
    fetchLeaveData();
  }, []);

  const fetchLeaveData = async () => {
    try {
      const response = await axios.get('/api/leave'); // Replace with your endpoint
      const data = response.data;

      // Set the overall leaveData
      setLeaveData(data);

      // Filter data by status
      const pending = data.filter(entry => entry.status === 'pending');
      const approved = data.filter(entry => entry.status === 'approved');
      const absent = data.filter(entry => entry.status === 'absent');

      // Set individual filtered data
      setPendingData(pending);
      setApprovedData(approved);
      setAbsentData(absent);
    } catch (error) {
      console.error('Error fetching leave data:', error);
    }
  };

  const shouldReportToday = () => {
    const today = new Date().toISOString().split('T')[0];

    // Ensure leaveData is updated before filtering
    return leaveData.filter(entry =>
      entry.reporting_date === today ||
      (new Date(entry.start_date) <= new Date(today) && new Date(entry.end_date) >= new Date(today))
    );
  };

  const shouldHaveReported = () => {
    const today = new Date().toISOString().split('T')[0];

    // Ensure leaveData is updated before filtering
    return leaveData.filter(entry =>
      new Date(entry.reporting_date) < new Date(today) && entry.reported_back === 'no'
    );
  };

  return (
    <div className="LeaveTable">
      <Tabs defaultActiveKey="all-leave" className="Tabs">
        <Tab eventKey="all-leave" title="All Leave">
          <Table striped bordered hover className="Table">
            <thead>
              <tr>
                <th>Leave ID</th>
                <th>Name</th>
                <th>Service Number</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Reporting Date</th>
              </tr>
            </thead>
            <tbody>
              {leaveData.map(entry => (
                <tr key={entry.leave_id}>
                  <td>{entry.leave_id}</td>
                  <td>{entry.first_name} {entry.last_name}</td>
                  <td>{entry.service_number}</td>
                  <td>{entry.start_date}</td>
                  <td>{entry.end_date}</td>
                  <td>{entry.status}</td>
                  <td>{entry.reporting_date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="pending" title="Pending">
          <Table striped bordered hover className="Table">
            <thead>
              <tr>
                <th>Leave ID</th>
                <th>Name</th>
                <th>Service Number</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Reporting Date</th>
              </tr>
            </thead>
            <tbody>
              {pendingData.map(entry => (
                <tr key={entry.leave_id}>
                  <td>{entry.leave_id}</td>
                  <td>{entry.first_name} {entry.last_name}</td>
                  <td>{entry.service_number}</td>
                  <td>{entry.start_date}</td>
                  <td>{entry.end_date}</td>
                  <td>{entry.status}</td>
                  <td>{entry.reporting_date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="approved" title="Approved">
          <Table striped bordered hover className="Table">
            <thead>
              <tr>
                <th>Leave ID</th>
                <th>Name</th>
                <th>Service Number</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Reporting Date</th>
              </tr>
            </thead>
            <tbody>
              {approvedData.map(entry => (
                <tr key={entry.leave_id}>
                  <td>{entry.leave_id}</td>
                  <td>{entry.first_name} {entry.last_name}</td>
                  <td>{entry.service_number}</td>
                  <td>{entry.start_date}</td>
                  <td>{entry.end_date}</td>
                  <td>{entry.status}</td>
                  <td>{entry.reporting_date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="absent" title="Absent">
          <Table striped bordered hover className="Table">
            <thead>
              <tr>
                <th>Leave ID</th>
                <th>Name</th>
                <th>Service Number</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Reporting Date</th>
              </tr>
            </thead>
            <tbody>
              {absentData.map(entry => (
                <tr key={entry.leave_id}>
                  <td>{entry.leave_id}</td>
                  <td>{entry.first_name} {entry.last_name}</td>
                  <td>{entry.service_number}</td>
                  <td>{entry.start_date}</td>
                  <td>{entry.end_date}</td>
                  <td>{entry.status}</td>
                  <td>{entry.reporting_date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="today" title="Should Report Today">
          <Table striped bordered hover className="Table">
            <thead>
              <tr>
                <th>Leave ID</th>
                <th>Name</th>
                <th>Service Number</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Reporting Date</th>
              </tr>
            </thead>
            <tbody>
              {shouldReportToday().map(entry => (
                <tr key={entry.leave_id}>
                  <td>{entry.leave_id}</td>
                  <td>{entry.first_name} {entry.last_name}</td>
                  <td>{entry.service_number}</td>
                  <td>{entry.start_date}</td>
                  <td>{entry.end_date}</td>
                  <td>{entry.status}</td>
                  <td>{entry.reporting_date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="missed" title="Should Have Reported">
          <Table striped bordered hover className="Table">
            <thead>
              <tr>
                <th>Leave ID</th>
                <th>Name</th>
                <th>Service Number</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Reporting Date</th>
              </tr>
            </thead>
            <tbody>
              {shouldHaveReported().map(entry => (
                <tr key={entry.leave_id}>
                  <td>{entry.leave_id}</td>
                  <td>{entry.first_name} {entry.last_name}</td>
                  <td>{entry.service_number}</td>
                  <td>{entry.start_date}</td>
                  <td>{entry.end_date}</td>
                  <td>{entry.status}</td>
                  <td>{entry.reporting_date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </div>
  );
};

export default LeaveTable;
