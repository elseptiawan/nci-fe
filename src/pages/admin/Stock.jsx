import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Sidebar from '../../components/Sidebar';
import Pagination from '../../components/Pagination';
import StockTable from '../../components/StockTable';

const Stock = () => {
    const token = localStorage.getItem('token');
    const [stocks, setStocks] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [currentWarehouse, setCurrentWarehouse] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch transaction data
    const fetchStocks = async (page = 1, search = '', warehouse = '') => {
        try {
            const response = await axios.get('stocks', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    page: page,  // Send the current page in the request
                    itemsPerPage: itemsPerPage,  // Send the number of items per page
                    search: search,
                    warehouse: warehouse
                },
            });
            setStocks(response.data.data.data);  // Adjust based on the API response structure
            setTotalPages(response.data.data.last_page);
        } catch (error) {
            console.error('Error fetching stocks:', error);
        }
    };

    const fetchData = async () => {
        try {
            const warehouseResponse = await axios.get('warehouses', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    itemsPerPage: 1000
                }
            });
            setWarehouses(warehouseResponse.data.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchStocks(currentPage, searchTerm, currentWarehouse);
    }, [currentPage, searchTerm, currentWarehouse]);

    return (
        <div className="d-flex">
            <Sidebar />
            <div
                className="container-fluid"
                style={{ marginLeft: '250px', padding: '20px' }}
            >
                <h1>Stocks</h1>

                <div className="form-group mb-3">
                    <select
                        id="transactionName"
                        className="form-control"
                        value={currentWarehouse}
                        onChange={(e) => setCurrentWarehouse(e.target.value)}
                    >
                        <option value="">Select Warehouse</option>
                        {warehouses.map((wh) => (
                            <option key={wh.id} value={wh.id}>
                                {wh.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Product..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}  // Update searchTerm state
                    />
                </div>

                <StockTable data={stocks} />

                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage} // Update currentPage when a page number is clicked
                />
            </div>
        </div>
    );
};

export default Stock;
