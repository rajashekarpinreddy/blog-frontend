import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Remove the JWT token from localStorage
        localStorage.removeItem('token');

        // Redirect to the login page
        navigate('/login');
    }, [navigate]);

    return (
        <div className="container text-center mt-5">
            <h2>You have been logged out</h2>
            <p>Redirecting to login page...</p>
        </div>
    );
};

export default Logout;
