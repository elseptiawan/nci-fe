import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const TransactionModal = ({ show, onClose, onSave }) => {
    const [user, setUser] = useState('');
    const [product, setProduct] = useState('');
    const [warehouse, setWarehouse] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [warehouses, setWarehouses] = useState([]);

    // Fetch users, products, and warehouses from the API
    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            
            // Fetch users
            const usersResponse = await axios.get('users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(usersResponse.data.data);

            // Fetch products
            const productResponse = await axios.get('products', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProducts(productResponse.data.data.data);

            // Fetch warehouses
            const warehouseResponse = await axios.get('warehouses', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setWarehouses(warehouseResponse.data.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (show) {
            fetchData();
        }
    }, [show]);

    const handleSave = () => {
        if (user && product && warehouse && transactionType && quantity) {
            onSave({ user, product, warehouse, transactionType, quantity });
            setUser('');
            setProduct('');
            setWarehouse('');
            setTransactionType('');
            setQuantity('');
            onClose();
        } else {
            alert('Please fill in all fields');
        }
    };

    if (!show) return null;

    return (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <button
                        type="button"
                        className="btn-close position-absolute top-0 end-0 m-2"
                        onClick={onClose}
                        aria-label="Close"
                    ></button>
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Transaction</h5>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group mb-3">
                                <label htmlFor="transactionName">User</label>
                                <select
                                    id="transactionName"
                                    className="form-control"
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                >
                                    <option value="">Select User</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="product">Product</label>
                                <select
                                    id="product"
                                    className="form-control"
                                    value={product}
                                    onChange={(e) => setProduct(e.target.value)}
                                >
                                    <option value="">Select Product</option>
                                    {products.map((prod) => (
                                        <option key={prod.id} value={prod.id}>
                                            {prod.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="warehouse">Warehouse</label>
                                <select
                                    id="warehouse"
                                    className="form-control"
                                    value={warehouse}
                                    onChange={(e) => setWarehouse(e.target.value)}
                                >
                                    <option value="">Select Warehouse</option>
                                    {warehouses.map((wh) => (
                                        <option key={wh.id} value={wh.id}>
                                            {wh.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="transactionType">Transaction Type</label>
                                <select
                                    id="transactionType"
                                    className="form-control"
                                    value={transactionType}
                                    onChange={(e) => setTransactionType(e.target.value)}
                                >
                                    <option value="">Select Type</option>
                                    <option value="in">Pembelian</option>
                                    <option value="out">Penjualan</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="quantity">Quantity</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Close
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleSave}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionModal;
