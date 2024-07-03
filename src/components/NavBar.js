import React, { useEffect, useState, useContext } from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideNavbar from './SideNavbar';
import './NavBar.css'; // Import CSS file
import NotificationContext from '../context/NotificationContext';
import { FaBell, FaSearch, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';

const NavBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { notificationCount, updateNotificationCount } = useContext(NotificationContext);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/notifications');
                updateNotificationCount(response.data.length);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, [updateNotificationCount]);

    const checkLoginStatus = () => {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedIn);

        const storedEmail = localStorage.getItem('userEmail');
        setUserEmail(storedEmail);
    };

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${searchQuery}`);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        setIsLoggedIn(false);
        setUserEmail('');
        navigate('/login');
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className="NavBar py-3">
                <Container>
                    <Button variant="outline-light" onClick={toggleSidebar} className="me-2">
                        ☰
                    </Button>
                    <Navbar.Brand href="/" className="d-flex align-items-center">
                        <img
                            src="/indianarmy.png"
                            height="50"
                            className="d-inline-block align-top me-2"
                            alt="Logo"
                        />
                        <span className="fs-4 text-light">Indian Army</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {/* Empty Nav for spacing */}
                        </Nav>
                        <Form className="d-flex align-items-center" onSubmit={handleSearchSubmit}>
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="form-control me-2"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <Button variant="outline-light" type="submit" className="btn">
                                <FaSearch />
                            </Button>
                        </Form>
                        <Nav className="ml-auto d-flex align-items-center">
                            {isLoggedIn ? (
                                <>
                                    <Nav.Link href="#" className="nav-link">{userEmail}</Nav.Link>
                                    <Button variant="link" onClick={handleLogout} className="nav-link ms-3">
                                        <FaSignOutAlt /> Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <LinkContainer to="/login">
                                        <Nav.Link className="nav-link"><FaSignInAlt /> Login</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/register">
                                        <Nav.Link className="nav-link"><FaUserPlus /> Register</Nav.Link>
                                    </LinkContainer>
                                </>
                            )}
                            <LinkContainer to="/notification">
                                <Nav.Link className="nav-link notification-link ms-3">
                                    <FaBell className="notification-icon" />
                                    {notificationCount > 0 && (
                                        <Badge pill bg="danger" className="notification-badge">
                                            {notificationCount}
                                        </Badge>
                                    )}
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <SideNavbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </>
    );
};

export default NavBar;
