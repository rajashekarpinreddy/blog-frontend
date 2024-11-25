import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    // If token is not present, redirect to login
    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;
