import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Custom styles if any

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handle input field changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            // Make an API call to the login endpoint
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);

            // Save the JWT token in localStorage
            localStorage.setItem('token', response.data.token);

            // Redirect to the Home page
            navigate('/');
        } catch (err) {
            // Handle errors (e.g., invalid credentials)
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Something went wrong. Please try again.');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="text-center">Log In</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="form-control"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Log In</button>
                </form>
                <p className="text-center mt-3">
                    Don't have an account? <a href="/register">Register here</a>.
                </p>
            </div>
        </div>
    );
};

export default Login;
