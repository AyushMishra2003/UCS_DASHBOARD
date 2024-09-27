// EditDiscountModal.js
import React, { useEffect, useState } from 'react';

const EditDiscountModal = ({ showModal, modalData, setModalData, handleSaveDiscount, handleCloseModal }) => {
    const [expiryDate, setExpiryDate] = useState(modalData.expiryDate ? modalData.expiryDate.split('T')[0] : '');

    useEffect(() => {
        // Update state when modalData changes
        setExpiryDate(modalData.expiryDate ? modalData.expiryDate.split('T')[0] : '');
    }, [modalData.expiryDate]);

    if (!showModal) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setModalData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleDateChange = (e) => {
        setExpiryDate(e.target.value);
        setModalData(prevState => ({ ...prevState, expiryDate: e.target.value }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Edit Discount</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSaveDiscount(); }}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Discount Value</label>
                        <input
                            type="number"
                            name="discountValue"
                            value={modalData.discountValue}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter discount value"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Discount Type</label>
                        <select
                            name="discountType"
                            value={modalData.discountType}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value={1}>Percentage</option>
                            <option value={2}>Fixed Amount</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Discount Application</label>
                        <select
                            name="discountApplication"
                            value={modalData.discountApplication}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value={1}>Next Booking</option>
                            <option value={2}>Current Booking</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Expiry Date</label>
                        <input
                            type="date"
                            name="expiryDate"
                            value={expiryDate}
                            onChange={handleDateChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleCloseModal}
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditDiscountModal;
