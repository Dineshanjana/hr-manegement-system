import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                const response = await axios.post('http://localhost:5000/users/logout');
                console.log('Logout Successful:', response.data);

                // Remove login status from localStorage
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userEmail');

                toast.success('Logout successful!');
                setTimeout(() => {
                    navigate('/login'); // Navigate to '/login' after logout
                }, 2000); // Wait for 2 seconds before navigating
            } catch (error) {
                console.error('Logout Error:', error);
                toast.error('Logout failed');
            }
        };

        handleLogout();
    }, [navigate]);

    return (
        <div>
            <ToastContainer />
            <p>Logging out...</p>
            {/* Optionally, you can show a loading indicator or message */}
        </div>
    );
};

export default Logout;
