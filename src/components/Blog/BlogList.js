import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BlogList.css';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/blogs', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBlogs(response.data);
        };
        fetchBlogs();
    }, []);

    return (
        <div className="container mt-5">
            <h3 className="mb-4">My Blogs</h3>
            <ul className="list-group">
                {blogs.map((blog) => (
                    <li key={blog._id} className="list-group-item d-flex justify-content-between align-items-center">
                        <Link to={`/blogs/${blog._id}`} className="text-decoration-none text-dark">
                            <i className="bi bi-journal-text me-2"></i>
                            {blog.title}
                        </Link>
                        <span className="badge bg-primary rounded-pill">{blog.likes} Likes</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogList;
