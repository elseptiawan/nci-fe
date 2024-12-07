import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const StockTable = ({ data }) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>Warehouse</th>
                        <th>Product</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td>{row.warehouse.name}</td>
                                <td>{row.product.name}</td>
                                <td>{row.qty}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No stocks available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default StockTable;
