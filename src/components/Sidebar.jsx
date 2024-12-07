import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
    return (
        <div
            className="bg-dark text-white p-3 vh-100"
            style={{ width: '250px', position: 'fixed' }}
        >
            <h3 className="text-center">Admin Panel</h3>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <a href="/" className="nav-link text-white">
                        Dashboard
                    </a>
                </li>
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
        </div>
    );
}

export default Sidebar;
