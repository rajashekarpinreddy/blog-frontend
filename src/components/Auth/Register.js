import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/auth/register', formData);
            alert('Registration successful! Please login.');
        } catch (error) {
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-5">
            <h3>Register</h3>
            <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                    type="text"
                    name="username"
                    className="form-control"
                    value={formData.username}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
        </form>
    );
};

export default Register;
