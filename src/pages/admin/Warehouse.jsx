import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import Sidebar from '../../components/Sidebar';
import Table from '../../components/Table';
import MasterModal from '../../components/MasterModal';
import Pagination from '../../components/Pagination';

const Warehouse = () => {
    const [warehouses, setWarehouses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [currentWarehouse, setCurrentWarehouse] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch Warehouses from API
    const fetchWarehouses = async (page = 1, search = '') => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`warehouses`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    page: currentPage,  // Send the current page in the request
                    itemsPerPage: itemsPerPage,  // Send the number of items per page
                    search: searchTerm
                },
            });
            setWarehouses(response.data.data.data); // Adjust to match API response structure
            setTotalPages(response.data.data.last_page);
        } catch (error) {
            console.error('Error fetching warehouses:', error);
        }
    };

    useEffect(() => {
        fetchWarehouses(currentPage, searchTerm);
    }, [currentPage, searchTerm]);

    // Handle Add New Warehouse
    const handleAdd = () => {
        setModalTitle('Add New Warehouse');
        setCurrentWarehouse(null); // Clear the current warehouse for adding new one
        setIsModalOpen(true);
    };

    // Handle Edit Warehouse
    const handleEdit = (warehouse) => {
        setModalTitle('Edit Warehouse');
        setCurrentWarehouse(warehouse); // Set current warehouse for editing
        setIsModalOpen(true);
    };

    // Handle Save (Add or Edit Warehouse)
    const handleSave = async (name) => {
        try {
            const token = localStorage.getItem('token');
            if (currentWarehouse) {
                // Edit existing warehouse
                console.log(currentWarehouse.id);
                await axios.put(`warehouses/${currentWarehouse.id}`, { name }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                // Add new warehouse
                await axios.post(`warehouses`, { name }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
            fetchWarehouses(currentPage, searchTerm); // Refresh the warehouse list
        } catch (error) {
            console.error('Error saving warehouse:', error);
        }
    };
    

    // Handle Delete Warehouse
    const handleDelete = async (warehouse) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete "${warehouse.name}"?`);
        if (confirmDelete) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`warehouses/${warehouse.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                fetchWarehouses(currentPage, searchTerm); // Refresh the warehouse list
            } catch (error) {
                console.error('Error deleting warehouse:', error);
            }
        }
    };

    return (
        <div className="d-flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div
                className="container-fluid"
                style={{ marginLeft: '250px', padding: '20px' }}
            >
                <h1>Warehouse</h1>

                {/* Add Warehouse Button */}
                <div className="mb-3">
                    <button
                        className="btn btn-primary"
                        onClick={handleAdd}
                    >
                        Add New Warehouse
                    </button>
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Warehouse..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}  // Update searchTerm state
                    />
                </div>

                {/* Warehouse Table */}
                <Table 
                    data={warehouses}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage} // Update currentPage when a page number is clicked
                />

                {/* Modal for Adding/Editing Warehouse */}
                <MasterModal
                    show={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                    title={modalTitle}
                    field="Warehouse Name"
                    initialValue={currentWarehouse?.name || ''}
                />
            </div>
        </div>
    );
};

export default Warehouse;
