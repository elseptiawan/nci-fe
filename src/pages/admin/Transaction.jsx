import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Sidebar from '../../components/Sidebar';
import Pagination from '../../components/Pagination';
import TransactionTable from '../../components/TransactionTable';
import TransactionModal from '../../components/TransactionModal';

const Transaction = () => {
    const token = localStorage.getItem('token');
    const [transactions, setTransactions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch transaction data
    const fetchTransactions = async (page = 1, search = '') => {
        try {
            const response = await axios.get('transactions', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    page: currentPage,  // Send the current page in the request
                    itemsPerPage: itemsPerPage,  // Send the number of items per page
                    search: searchTerm
                },
            });
            setTransactions(response.data.data.data);  // Adjust based on the API response structure
            setTotalPages(response.data.data.last_page);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const handleSaveTransaction = async ({user, product, warehouse, transactionType, quantity}) => {
        // Add logic to save the transaction data
        try {
            await axios.post(
                'transactions',
                {
                    user_id: user,
                    product_id: product,
                    warehouse_id: warehouse,
                    transaction_type: transactionType,
                    quantity: quantity,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            // Refresh the transaction list (you can include pagination or search logic)
            fetchTransactions(currentPage, searchTerm);
    
            // Show a success message
            alert('Transaction saved successfully!');
        } catch (error) {
            console.error('Error saving transaction:', error);
    
            // Display an error message
            if (error.response && error.response.data && error.response.data.message) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                alert('An unexpected error occurred. Please try again.');
            }
        }
    };

    useEffect(() => {
        fetchTransactions(currentPage, searchTerm);
    }, [currentPage, searchTerm]);

    return (
        <div className="d-flex">
            <Sidebar />
            <div
                className="container-fluid"
                style={{ marginLeft: '250px', padding: '20px' }}
            >
                <h1>Transactions</h1>

                

                <div className="mb-3">
                    <button
                        className="btn btn-primary"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add New Transaction
                    </button>
                </div>

                <TransactionModal
                    show={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveTransaction}
                />

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Product..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}  // Update searchTerm state
                    />
                </div>

                <TransactionTable data={transactions} />

                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage} // Update currentPage when a page number is clicked
                />
            </div>
        </div>
    );
};

export default Transaction;
