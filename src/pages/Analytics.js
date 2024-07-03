import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

const Analytics = () => {
    // Sample data
    const analyticsData = [
        { title: 'Total Employees', value: 150 },
        { title: 'Average Salary', value: '$4,200' },
        { title: 'Departments', value: 5 },
    ];

    return (
        <Container className="mt-5">
            <h2>HR Analytics</h2>
            <Row>
                {analyticsData.map((data, index) => (
                    <Col key={index} sm={12} md={4}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>{data.title}</Card.Title>
                                <Card.Text>{data.value}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Analytics;
