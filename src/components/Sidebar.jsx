import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from local storage
        navigate('/login'); // Redirect to the login page
    };
    return (
        <div
            className="bg-dark text-white p-3 vh-100"
            style={{ width: '250px', position: 'fixed' }}
        >
            <h3 className="text-center">Admin Panel</h3>
            <ul className="nav flex-column">
                {/* <li className="nav-item">
                    <a href="/" className="nav-link text-white">
                        Dashboard
                    </a>
                </li> */}
                <li className="nav-item">
                    <a href="/product" className="nav-link text-white">
                        Product
                    </a>
                </li>
                <li className="nav-item">
                    <a href="/warehouse" className="nav-link text-white">
                        Warehouse
                    </a>
                </li>
                <li className="nav-item">
                    <a href="/transaction" className="nav-link text-white">
                        Transaction
                    </a>
                </li>
                <li className="nav-item">
                    <a href="/stock" className="nav-link text-white">
                        Stock
                    </a>
                </li>
            </ul>

            <button
                className="btn btn-danger w-100 mt-3"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
}

export default Sidebar;
