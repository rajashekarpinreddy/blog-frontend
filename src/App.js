import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import BlogList from './components/Blog/BlogList';
import BlogEditor from './components/Blog/BlogEditor';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

const App = () => (
    <Router>
        <Navbar />
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} /> {/* Logout Route */}
            <Route path="/" element={<Home />} />
            <Route
                path="/blogs"
                element={
                    <PrivateRoute>
                        <BlogList />
                    </PrivateRoute>
                }
            />
            <Route
                path="/editor"
                element={
                    <PrivateRoute>
                        <BlogEditor />
                    </PrivateRoute>
                }
            />
        </Routes>
    </Router>
);

export default App;
