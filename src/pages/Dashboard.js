// import React from 'react';
// import { Container, Card, Row, Col } from 'react-bootstrap';

// const Dashboard = () => {
//     // Sample data for demonstration
//     const totalEmployees = 50;
//     const totalDepartments = 5;
//     const totalPayroll = 250000; // Total payroll amount for all employees

//     return (
//         <Container className="mt-5">
//             <h2>Dashboard</h2>
//             <Row className="mt-3">
//                 <Col md={4} className="mb-3">
//                     <Card>
//                         <Card.Body>
//                             <Card.Title>Total Employees</Card.Title>
//                             <Card.Text>{totalEmployees}</Card.Text>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//                 <Col md={4} className="mb-3">
//                     <Card>
//                         <Card.Body>
//                             <Card.Title>Total Departments</Card.Title>
//                             <Card.Text>{totalDepartments}</Card.Text>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//                 <Col md={4} className="mb-3">
//                     <Card>
//                         <Card.Body>
//                             <Card.Title>Total Payroll</Card.Title>
//                             <Card.Text>${totalPayroll}</Card.Text>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//             {/* Add more cards or charts to display additional insights */}
//         </Container>
//     );
// };

// export default Dashboard;


// import React from 'react';
// import './Dashboard.css';

// const Dashboard = () => {
//   const data = {
//     totalEmployees: 50,
//     departments: [
//       { name: 'HR', count: 10 },
//       { name: 'Engineering', count: 20 },
//       { name: 'Marketing', count: 10 },
//       { name: 'Sales', count: 10 }
//     ],
//     totalPayroll: 250000
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="card-container">
//         <div className="card">
//           <h2>Total Employees</h2>
//           <p>{data.totalEmployees}</p>
//         </div>
//         <div className="card">
//           <h2>Departments</h2>
//           <ul>
//             {data.departments.map((dept, index) => (
//               <li key={index}>
//                 {dept.name}: {dept.count}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="card">
//           <h2>Total Payroll</h2>
//           <p>${data.totalPayroll.toLocaleString()}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [totalDepartments, setTotalDepartments] = useState(0);
    const [totalPayroll, setTotalPayroll] = useState(0);
    const [employeeData, setEmployeeData] = useState(null);
    const [expenseData, setExpenseData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [employeesRes, departmentsRes, payrollRes] = await Promise.all([
                axios.get('http://localhost:5000/api/personnel'),
                axios.get('http://localhost:5000/api/departments'),
                axios.get('http://localhost:5000/api/payroll')
            ]);

            const totalEmployees = employeesRes.data.length;
            const totalDepartments = departmentsRes.data.length;
            const totalPayroll = payrollRes.data.reduce((sum, payroll) => sum + payroll.salary + payroll.bonuses - payroll.deductions, 0);

            setTotalEmployees(totalEmployees);
            setTotalDepartments(totalDepartments);
            setTotalPayroll(totalPayroll);

            const employeeCounts = departmentsRes.data.map(department => ({
                name: department.name,
                count: employeesRes.data.filter(employee => employee.department === department._id).length
            }));

            const employeeData = {
                labels: employeeCounts.map(item => item.name),
                datasets: [
                    {
                        data: employeeCounts.map(item => item.count),
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
                    }
                ]
            };

            const expenseData = {
                labels: ['Salary', 'Bonuses', 'Deductions'],
                datasets: [
                    {
                        data: [
                            payrollRes.data.reduce((sum, payroll) => sum + payroll.salary, 0),
                            payrollRes.data.reduce((sum, payroll) => sum + payroll.bonuses, 0),
                            payrollRes.data.reduce((sum, payroll) => sum + payroll.deductions, 0)
                        ],
                        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384']
                    }
                ]
            };

            setEmployeeData(employeeData);
            setExpenseData(expenseData);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    return (
        <Container className="mt-5">
            <h2>Dashboard</h2>
            <Row className="mt-3">
                <Col md={4} className="mb-3">
                    <Card>
                        <Card.Body>
                            <Card.Title>Total Employees</Card.Title>
                            <Card.Text>{totalEmployees}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-3">
                    <Card>
                        <Card.Body>
                            <Card.Title>Total Departments</Card.Title>
                            <Card.Text>{totalDepartments}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-3">
                    <Card>
                        <Card.Body>
                            <Card.Title>Total Payroll</Card.Title>
                            <Card.Text>${totalPayroll.toFixed(2)}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={6} className="mb-3">
                    <Card>
                        <Card.Body>
                            <Card.Title>Employees per Department</Card.Title>
                            {employeeData && <Pie data={employeeData} />}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mb-3">
                    <Card>
                        <Card.Body>
                            <Card.Title>Expenses Breakdown</Card.Title>
                            {expenseData && <Pie data={expenseData} />}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;