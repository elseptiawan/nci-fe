import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import Sidebar from '../../components/Sidebar';
import Table from '../../components/Table';
import MasterModal from '../../components/MasterModal';
import Pagination from '../../components/Pagination';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [currentProduct, setCurrentProduct] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;
    const [searchTerm, setSearchTerm] = useState('');

    const fetchProducts = async (page = 1, search = '') => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('products', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    page: page,  // Send the current page in the request
                    itemsPerPage: itemsPerPage,  // Send the number of items per page
                    search: search
                },
            });
            setProducts(response.data.data.data);
            setTotalPages(response.data.data.last_page);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts(currentPage, searchTerm);
    }, [currentPage, searchTerm]);

    const handleAdd = () => {
        setModalTitle('Add New Product');
        setCurrentProduct(null);
        setIsModalOpen(true);
    };

    const handleEdit = (product) => {
        setModalTitle('Edit Product');
        setCurrentProduct(product);
        setIsModalOpen(true);
    };

    const handleSave = async (name) => {
        try {
            const token = localStorage.getItem('token');
            if (currentProduct) {
                // Edit existing product
                console.log(currentProduct);
                await axios.put(`products/${currentProduct.id}`, { name }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                // Add new product
                await axios.post('products', { name }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
            fetchProducts(currentPage, searchTerm); // Refresh the product list
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    const handleDelete = async (product) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete "${product.name}"?`);
        if (confirmDelete) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`products/${product.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                fetchProducts(currentPage, searchTerm); // Refresh the product list
            } catch (error) {
                console.error('Error deleting product:', error);
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
                <h1>Product</h1>

                <div className="mb-3">
                    <button
                        className="btn btn-primary"
                        onClick={handleAdd}
                    >
                        Add New Product
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

                <Table 
                    data={products}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage} // Update currentPage when a page number is clicked
                />

                <MasterModal
                    show={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                    title={modalTitle}
                    field="Product Name"
                    initialValue={currentProduct?.name || ''}
                />
            </div>
        </div>
    );
}

export default Product;
