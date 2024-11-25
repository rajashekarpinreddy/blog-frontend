import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [blogs, setBlogs] = useState([]);

    // Check user login status
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            fetchUserBlogs();
        }
    }, []);

    // Fetch the user's blogs
    const fetchUserBlogs = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/blogs', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    // Delete a blog post
    const deleteBlog = async (blogId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/blogs/${blogId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBlogs(blogs.filter((blog) => blog._id !== blogId));
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Welcome to Blog Generator</h1>
            {isLoggedIn ? (
                <>
                    <div className="text-center my-4">
                        <Link to="/editor" className="btn btn-primary btn-lg">
                            Write a New Blog Post
                        </Link>
                    </div>
                    <h3>Your Blogs</h3>
                    <ul className="list-group mt-3">
                        {blogs.map((blog) => (
                            <li key={blog._id} className="list-group-item d-flex justify-content-between align-items-center">
                                <span>{blog.title}</span>
                                <div>
                                    <Link to={`/blogs/${blog._id}`} className="btn btn-outline-info btn-sm me-2">
                                        View
                                    </Link>
                                    <Link to={`/editor/${blog._id}`} className="btn btn-outline-warning btn-sm me-2">
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => deleteBlog(blog._id)}
                                        className="btn btn-outline-danger btn-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <div className="text-center">
                    <p className="lead mt-3">Log in to create and manage your blogs.</p>
                    <Link to="/login" className="btn btn-primary btn-lg">
                        Log In
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Home;
