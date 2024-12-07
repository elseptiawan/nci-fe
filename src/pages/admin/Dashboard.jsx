import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Sidebar from '../../components/Sidebar';

const Dashboard = () => {
    return (
        <div className="d-flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div
                className="container-fluid"
                style={{ marginLeft: '250px', padding: '20px' }}
            >
                <h1>Welcome to the Admin Dashboard</h1>
                <p>This is the main content area where you can display your dashboard content.</p>

                <div className="row mt-4">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Users</h5>
                                <p className="card-text">Manage all registered users here.</p>
                                <a href="#users" className="btn btn-primary">
                                    Go to Users
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Reports</h5>
                                <p className="card-text">View system reports and analytics.</p>
                                <a href="#reports" className="btn btn-primary">
                                    View Reports
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Settings</h5>
                                <p className="card-text">Update system settings here.</p>
                                <a href="#settings" className="btn btn-primary">
                                    Go to Settings
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
