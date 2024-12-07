import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from './auth';

const RequireAuth = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn()) {
            // Redirect to the login page if the user is not logged in
            navigate('/login');
        }
    }, [navigate]);

    // Render children if logged in
    return isLoggedIn() ? children : null;
};

export default RequireAuth;
