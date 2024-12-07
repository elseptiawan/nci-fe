import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TransactionTable = ({ data }) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Warehouse</th>
                        <th>Product</th>
                        <th>Transaction Type</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td>{row.user.name}</td>
                                <td>{row.warehouse.name}</td>
                                <td>{row.product.name}</td>
                                <td>{row.transaction_type === 'out' ? 'Penjualan' : 'Pembelian'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No transactions available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;
