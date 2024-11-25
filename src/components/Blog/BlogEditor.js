import React, { useState } from 'react';
import axios from 'axios';
import './BlogEditor.css';

const BlogEditor = () => {
    const [formData, setFormData] = useState({
        title: '',
        tone: '',
        wordCount: 500,
        content: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGenerate = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/blogs/generate', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFormData({ ...formData, content: response.data.content });
        } catch (error) {
            alert('Error generating blog post.');
        }
    };

    return (
        <div className="container mt-5">
            <h3>Create Blog Post</h3>
            <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Tone</label>
                <input
                    type="text"
                    name="tone"
                    className="form-control"
                    value={formData.tone}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Word Count</label>
                <input
                    type="number"
                    name="wordCount"
                    className="form-control"
                    value={formData.wordCount}
                    onChange={handleChange}
                />
            </div>
            <button onClick={handleGenerate} className="btn btn-primary me-2">Generate</button>
            <textarea
                className="form-control mt-3"
                rows="10"
                value={formData.content}
                readOnly
            />
        </div>
    );
};

export default BlogEditor;
