import React, { useState, useEffect } from 'react';

const TripTypes = ["Airport Trip", "Round Trip", "One-Way Trip", "Local Trip"];

const DiscountModal = ({ showModal, modalData, setModalData, handleSaveDiscount, handleCloseModal }) => {
    const [isPercentage, setIsPercentage] = useState(modalData.discountType === 1);
    const [isCurrentBooking, setIsCurrentBooking] = useState(modalData.discountApplication === 2);

    useEffect(() => {
        setIsPercentage(modalData.discountType === 1);
        setIsCurrentBooking(modalData.discountApplication === 2);
    }, [modalData.discountType, modalData.discountApplication]);

    const handleTimeChange = (e) => {
        const value = e.target.value;
        setModalData({ ...modalData, expiryTime: value });
    };

    const generateTimeOptions = () => {
        const times = [];
        for (let hour = 1; hour <= 12; hour++) {
            ['AM', 'PM'].forEach(period => {
                times.push(`${hour}:00 ${period}`);
            });
        }
        return times;
    };

    return (
        showModal && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white p-6 rounded shadow-lg w-full max-w-md mx-auto z-60 md:max-w-lg lg:max-w-xl">
                    <h2 className="text-xl mb-4 text-center">{modalData.id ? 'Edit Discount' : 'Add Discount'}</h2>

                    {/* Conditionally render Trip Type Selection */}
                    {!modalData.id && (
                        <div className="mb-4">
                            <label className="block text-gray-700">Trip Type</label>
                            <select
                                value={modalData.tripType}
                                onChange={(e) => setModalData({ ...modalData, tripType: e.target.value })}
                                className="w-full border border-gray-300 p-2 rounded bg-white"
                                required
                            >
                                <option value="">Select Trip Type</option>
                                {TripTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Discount Value */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Discount Value</label>
                        <input
                            type="number"
                            value={modalData.discountValue || ''} // Empty string if undefined
                            onChange={(e) => setModalData({ ...modalData, discountValue: e.target.value })}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                            placeholder={isPercentage ? "Enter percentage" : "Enter amount"}
                        />
                    </div>


                    <div className="mb-4">
                        <label className="block text-gray-700">Discount Limit</label>
                        <input
                            type="number"
                            value={modalData.discountLimit || ''} // Empty string if undefined
                            onChange={(e) => setModalData({ ...modalData, discountLimit: e.target.value })}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                            placeholder={"Enter Discount Limit"}
                        />
                    </div>

                    {/* Discount Type */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Discount Type</label>
                        <select
                            value={modalData.discountType}
                            onChange={(e) => {
                                const value = parseInt(e.target.value, 10);
                                setModalData({ ...modalData, discountType: value });
                                setIsPercentage(value === 1);
                            }}
                            className="w-full border border-gray-300 p-2 rounded bg-white"
                            required
                        >
                            <option value={1}>Percentage</option>
                            <option value={2}>Fixed Amount</option>
                        </select>
                    </div>

                    {/* Booking Type */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Booking Type</label>
                        <select
                            value={modalData.discountApplication}
                            onChange={(e) => {
                                const value = parseInt(e.target.value, 10);
                                setModalData({ ...modalData, discountApplication: value });
                                setIsCurrentBooking(value === 2);
                            }}
                            className="w-full border border-gray-300 p-2 rounded bg-white"
                            required
                        >
                            <option value={1}>Next Booking</option>
                            <option value={2}>Current Booking</option>
                        </select>
                    </div>

                    {/* Expiry Date */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Expiry Date</label>
                        <input
                            type="date"
                            value={modalData.expiryDate || ''} // Empty string if undefined
                            onChange={(e) => setModalData({ ...modalData, expiryDate: e.target.value })}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>

                    {/* Expiry Time */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Expiry Time</label>
                        <select
                            value={modalData.expiryTime || ''} // Empty string if undefined
                            onChange={handleTimeChange}
                            className="w-full border border-gray-300 p-2 rounded  bg-white"
                            required
                        >
                            <option value="">Select Time</option>
                            {generateTimeOptions().map((time) => (
                                <option key={time} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={handleSaveDiscount}
                            className="bg-blue-500 text-white p-2 rounded mr-2"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCloseModal}
                            className="bg-gray-500 text-white p-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default DiscountModal;
