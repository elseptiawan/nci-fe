import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MasterModal = ({ show, onClose, onSave, title, field, initialValue }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (show) {
            setName(initialValue || ''); // Pre-fill input for editing or reset for adding
        }
    }, [show, initialValue]);

    const handleSave = () => {
        onSave(name);
        setName(''); // Clear input field
        onClose();   // Close the modal
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
                        <h5 className="modal-title">{title}</h5>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSave}>
                            <div className="form-group">
                                <label htmlFor="productName">{field}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="productName"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
}

export default MasterModal;
