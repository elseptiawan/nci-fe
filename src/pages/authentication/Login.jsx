import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import { isLoggedIn } from '../../utils/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn()) {
            // If logged in, redirect to the Product page
            navigate('/product');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try { 
            const response = await axios.post('login', {
                email,
                password,
            });

            // Login successful
            setMessageType('success');
            setMessage('Login successful!');
            localStorage.setItem('token', response.data.data.token); // Save token to local storage
            setTimeout(() => {
                navigate('/product'); // Navigate to the dashboard route
            }, 1000);
        } catch (error) {
            // Handle errors
            if (error.response) {
                // Server responded with a status other than 200 range
                setMessageType('error');
                setMessage(error.response.data.message || 'Login failed. Please try again.');
            } else {
                // Network or other errors
                setMessageType('error');
                setMessage('An error occurred. Please try again later.');
            }
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="text-center">Login</h3>
                            
                            {/* Display Message */}
                            {message && (
                                <div
                                    className={`alert ${
                                        messageType === 'success' ? 'alert-success' : 'alert-danger'
                                    }`}
                                    role="alert"
                                >
                                    {message}
                                </div>
                            )}
                            
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Login
                                </button>
                            </form>
                            <div className="text-center mt-3">
                                <a href="/register" className="text-decoration-none">
                                    Register
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
