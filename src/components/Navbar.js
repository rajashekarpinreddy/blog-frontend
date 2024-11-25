import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    // Check if the user is logged in
    const isLoggedIn = !!localStorage.getItem('token'); // Returns true if token exists
    console.log(`loggedin: ${isLoggedIn}`)

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                {/* Navbar brand */}
                <Link className="navbar-brand" to="/">Blog Generator</Link>

                {/* Navigation links */}
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        {isLoggedIn ? (
                            <>
                                {/* Links visible only when logged in */}
                                <li className="nav-item">
                                    <Link className="nav-link" to="/blogs">My Blogs</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/editor">New Blog</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/logout">Logout</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                {/* Links visible only when not logged in */}
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
