import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDiscounts, addDiscount, updateDiscount, changeDiscountStatus, deleteDiscount } from '../Redux/Slices/discountSlice';
import { FaEdit, FaCheckCircle, FaTimesCircle, FaPlus } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import HomeLayout from '../Layouts/HomeLayouts';
import DiscountModal from './DiscountModel';

const DiscountManager = () => {
    const dispatch = useDispatch();
    const { discounts, loading, error } = useSelector((state) => state.discounts);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({
        id: null,
        tripType: '',
        discountValue: 0,
        discountType: 1, // Default to percentage
        discountApplication: 1, // Default to next booking
        expiryDate: '', // Initialize expiryDate
        expiryTime: '', // Initialize 
        discountLimit:0
    });

    useEffect(() => {
        dispatch(fetchDiscounts());
    }, [dispatch]);

    const handleOpenModal = (discount = {}) => {
        setModalData({
            id: discount._id || null,
            tripType: discount.tripType || '',
            discountValue: discount.discountValue || 1,
            discountType: [1, 2].includes(discount.discountType) ? discount.discountType : 1, // Ensure valid enum value
            discountApplication: [1, 2].includes(discount.discountApplication) ? discount.discountApplication : 1, // Ensure valid enum value
            expiryDate: discount.expiryDate ? discount.expiryDate.substring(0, 10) : '', // Use substring to show YYYY-MM-DD
            expiryTime: discount.expiryTime || '', // Initialize expiryTime
            discountLimit:discount.discountLimit || ''
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalData({
            id: null,
            tripType: '',
            discountValue: 0,
            discountType: 1, // Default to percentage
            discountApplication: 1, // Default to next booking
            expiryDate: '', // Reset expiryDate
            expiryTime: '', // Reset expiryTime,
            discountLimit:''
        });
    };

    const handleSaveDiscount = async () => {
        const { id, tripType, discountValue, discountType, discountApplication, expiryDate, expiryTime,discountLimit } = modalData;

        // Ensure discountType and discountApplication are valid
        if (![1, 2].includes(discountType)) {
            console.error('Invalid discountType');
            return;
        }
        if (![1, 2].includes(discountApplication)) {
            console.error('Invalid discountApplication');
            return;
        }

        const updateData = {
            tripType,
            discountValue,
            discountType,
            discountApplication,
            expiryDate,  
            expiryTime, 
            discountLimit
        };

        if (id) {
            // Update existing discount
            const response = await dispatch(updateDiscount({ id, updateData })).unwrap();
            if (response?.payload) {
                setModalData({
                    id: null,
                    tripType: '',
                    discountValue: 0,
                    discountType: 1, // Default to percentage
                    discountApplication: 1, // Default to next booking
                    expiryDate: '', // Reset expiryDate
                    expiryTime: '', // Reset expiryTime,
                    discountLimit:''
                });
                await dispatch(fetchDiscounts());
            }
        } else {
            // Add new discount
            dispatch(addDiscount(updateData));
        }
        handleCloseModal();
    };

    const handleUpdateDiscount = (id) => {
        const discount = discounts.find(d => d._id === id);
        handleOpenModal(discount);
    };

    const handleChangeStatus = (id, active) => {
        dispatch(changeDiscountStatus({ id, active }));
    };
    const handledelete = async(id) => {
        console.log("delete discount is");
        
        const response=await dispatch(deleteDiscount({ id}));
        console.log(response);
        
        if (response?.payload) {
            await dispatch(fetchDiscounts());
        }
    };

    if (loading) return(
        <HomeLayout>
            <p>Loading...</p>
        </HomeLayout>
    );
    if (error) return <div>Error: {error.message}</div>;



    return (
        <HomeLayout>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Discount Manager</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-blue-500 text-white p-2 rounded mb-4 flex items-center"
                >
                    <FaPlus className="mr-2" /> Add New Discount
                </button>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl mb-2">Discount List</h2>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200 border-b">
                                <th className="p-2 text-left">Trip Type</th>
                                <th className="p-2 text-left">Discount</th>
                                <th className="p-2 text-left">Discount Type</th>
                                <th className="p-2 text-left">Booking Type</th>
                                <th className="p-2 text-left">Expiry Date</th>
                                <th className="p-2 text-left">Expiry Time</th>
                                <th className="p-2 text-left">Vocher Code</th>
                                <th className="p-2 text-left">Discount Limit</th>
                                <th className="p-2 text-left">Status</th>
                                <th className="p-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {discounts.map((discount) => (
                                <tr key={discount._id} className="border-b">
                                    <td className="p-2">{discount.tripType}</td>
                                    <td className="p-2">
                                        {discount.discountType === 1
                                            ? `${discount.discountValue}%`
                                            : `${discount.discountValue}Rs`}
                                    </td>
                                    <td className="p-2">
                                        {discount.discountType === 1 ? "Percentage" : "Fixed Amount"}
                                    </td>
                                    <td className="p-2">
                                        {discount.discountApplication === 1
                                            ? "Next Booking"
                                            : "Current Booking"}
                                    </td>
                                    <td className="p-2">
                                        {discount.expiryDate.substring(0,10)}
                                    </td>
                                    <td className="p-2">
                                        {discount.expiryTime}
                                    </td>
                                    <td className="p-2">
                                        {discount.voucherCode}
                                    </td>
                                    <td className="p-2">
                                        {discount.discountLimit}
                                    </td>
                                    <td>
                                        {discount?.active ? "Active" : "Not Active"}
                                    </td>
                                    <td className="p-2 text-center">
                                        <button
                                            onClick={() => handleUpdateDiscount(discount._id)}
                                            className="bg-yellow-500 text-white p-1 rounded mx-1"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleChangeStatus(discount._id, !discount.active)}
                                            className={`p-1 rounded mx-1 ${discount.active ? 'bg-red-500' : 'bg-green-500'}`}
                                        >
                                            {discount.active ? <FaTimesCircle /> : <FaCheckCircle />}
                                        </button>
                                        <button
                                            onClick={() => handledelete(discount._id)}
                                            className="bg-yellow-500 text-white p-1 rounded mx-1"
                                        >
                                            <MdDelete/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal for adding/updating discount */}
                <DiscountModal
                    showModal={showModal}
                    modalData={modalData}
                    setModalData={setModalData}
                    handleSaveDiscount={handleSaveDiscount}
                    handleCloseModal={handleCloseModal}
                />
            </div>
        </HomeLayout>
    );
};

export default DiscountManager;
