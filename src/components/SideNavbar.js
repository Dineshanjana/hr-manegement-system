import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav } from 'react-bootstrap';
import './SideNavbar.css'; 

const SideNavbar = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`side-navbar ${isOpen ? 'open' : ''}`}>
            <div className="side-navbar-header">
                <button className="close-btn" onClick={toggleSidebar}>×</button>
            </div>
            <Nav className="flex-column">
                <LinkContainer to="/" onClick={toggleSidebar}>
                    <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/dashboard" onClick={toggleSidebar}>
                    <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/personnel-list" onClick={toggleSidebar}>
                    <Nav.Link>Personnel</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/attendance-management" onClick={toggleSidebar}>
                    <Nav.Link>Attendance Management</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/course-list" onClick={toggleSidebar}>
                    <Nav.Link>Course List</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/add-personnel" onClick={toggleSidebar}>
                    <Nav.Link>Add Personnel</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/notification" onClick={toggleSidebar}>
                    <Nav.Link>Notifications</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/add-field" onClick={toggleSidebar}>
                    <Nav.Link>Add Column</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/postingform" onClick={toggleSidebar}>
                <Nav.Link>Add Posting</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/postings" onClick={toggleSidebar}>
                <Nav.Link>Postings</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/leaveform" onClick={toggleSidebar}>
                <Nav.Link>Leave</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/leavetable" onClick={toggleSidebar}>
                <Nav.Link>Leavetable</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/additionalcolumns" onClick={toggleSidebar}>
                <Nav.Link>Additional columns</Nav.Link>
                    </LinkContainer>
            </Nav>
        </div>
    );
};

export default SideNavbar;
