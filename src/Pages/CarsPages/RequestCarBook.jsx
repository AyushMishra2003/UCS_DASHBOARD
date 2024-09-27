import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getCarBookingById, approveBooking, completeBooking, cancelBooking } from '../../Redux/Slices/carBookingSlice';
import { FaCar, FaArrowRight } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import HomeLayout from '../../Layouts/HomeLayouts';
import dayjs from 'dayjs';

const RequestCarBook = () => {
    const [loading, setLoading] = useState(true);
    const [loadingApprove, setLoadingApprove] = useState(false);
    const [loadingComplete, setLoadingComplete] = useState(false);
    const [loadingCancel, setLoadingCancel] = useState(false);
    const [driverDetails, setDriverDetails] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        carNumber: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const loadData = async () => {
        const response = await dispatch(getCarBookingById(id));
        setLoading(false);
    };

    const bookDetail = useSelector((state) => state.carBooking.bookingDetails);
    const adminId = useSelector((state) => state?.auth?.data?._id);

    useEffect(() => {
        loadData();
    }, [dispatch, id]);

    const handleApproveBooking = async () => {
        if (driverDetails.name && driverDetails.phoneNumber && driverDetails.email && driverDetails.carNumber) {
            setLoadingApprove(true);
            await dispatch(approveBooking({ id, adminId, driverDetails }));
            setLoadingApprove(false);
            navigate('/car-booking');
        } else {
            alert("Please fill in all driver details before approving the booking.");
        }
    };

    const handleCompleteBooking = async () => {
        setLoadingComplete(true);
        await dispatch(completeBooking({ id, adminId }));
        setLoadingComplete(false);
        navigate('/car-booking');
    };

    const handleCancelBooking = async () => {
        setLoadingCancel(true);
        await dispatch(cancelBooking({ id, adminId }));
        setLoadingCancel(false);
        navigate('/car-booking');
    };

    if (loading) {
        return (
            <HomeLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="w-full max-w-xl p-4 bg-white rounded-lg shadow-lg">
                        <Skeleton height={30} width="60%" />
                        <Skeleton height={200} className="my-4" />
                        <Skeleton height={30} width="80%" />
                        <Skeleton height={150} className="my-4" />
                    </div>
                </div>
            </HomeLayout>
        );
    }

    console.log(bookDetail);
    

    return (
        <HomeLayout>
            <div className="max-w-4xl p-6 mx-auto mt-8 bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <FaCar className="text-3xl text-blue-600" />
                        <h2 className="ml-3 text-2xl font-bold text-gray-800">{bookDetail.category}</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 text-sm font-medium text-white rounded-full ${bookDetail.isCancel ? 'bg-red-500' : 'bg-green-500'}`}>
                            {bookDetail.isCancel ? 'Cancelled' : 'Active'}
                        </span>
                        <span className={`px-3 py-1 text-sm font-medium text-white rounded-full ${bookDetail.isComplete ? 'bg-blue-500' : 'bg-yellow-500'}`}>
                            {bookDetail.isComplete ? 'Complete' : 'In Progress'}
                        </span>
                    </div>
                </div>

                <div className="mt-6 space-y-4 text-lg text-gray-700">
                    <p><strong>Trip Type:</strong> {bookDetail.tripType}</p>
                    <p><strong>From:</strong> {bookDetail.fromLocation}</p>
                    <p><strong>To:</strong> {bookDetail.toLocation}</p>
                    <p><strong>Price:</strong> ₹{bookDetail.price}</p>
                </div>

                <div className="mt-6 space-y-4 text-lg text-gray-700">
                    <h3 className="text-xl font-semibold text-gray-800">Driver Details:</h3>
                    {bookDetail.driverDetails ? (
                        <>
                            <p><strong>Name:</strong> {bookDetail.driverDetails.name}</p>
                            <p><strong>Email:</strong> {bookDetail.driverDetails.email}</p>
                            <p><strong>Phone Number:</strong> {bookDetail.driverDetails.phoneNumber}</p>
                            <p><strong>Car Number:</strong> {bookDetail.driverDetails.carNumber}</p>
                        </>
                    ) : (
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="Driver Name"
                                value={driverDetails.name}
                                onChange={(e) => setDriverDetails({ ...driverDetails, name: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Driver Phone Number"
                                value={driverDetails.phoneNumber}
                                onChange={(e) => setDriverDetails({ ...driverDetails, phoneNumber: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded"
                            />
                            <input
                                type="email"
                                placeholder="Driver Email"
                                value={driverDetails.email}
                                onChange={(e) => setDriverDetails({ ...driverDetails, email: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Car Number"
                                value={driverDetails.carNumber}
                                onChange={(e) => setDriverDetails({ ...driverDetails, carNumber: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded"
                            />
                        </div>
                    )}
                </div>

                <div className="mt-6 space-y-4 text-lg text-gray-700">
                    <h3 className="text-xl font-semibold text-gray-800">User Details:</h3>
                    {bookDetail.userId ? (
                        <>
                            <p><strong>Name:</strong> {bookDetail.userId.name}</p>
                            <p><strong>Email:</strong> {bookDetail.userId.email}</p>
                            <p><strong>Date:</strong> {bookDetail?.bookingDate}</p>
                            <p><strong>Time:</strong> {bookDetail?.bookingTime}</p>
                            <p><strong>Phone Number:</strong> {bookDetail.userId.phoneNumber}</p>
                            <p><strong>Phone Number:</strong> {bookDetail.userId.phoneNumber}</p>
                        </>
                    ) : (
                        <p>No user details available.</p>
                    )}
                </div>

                <div className="mt-6 text-sm text-gray-600 border-t pt-4">
                    <p><strong>Booking ID:</strong> {bookDetail._id}</p>
                    <p><strong>Created At:</strong> {dayjs(bookDetail.createdAt).format('DD-MM-YYYY HH:mm')}</p>
                    <p><strong>Updated At:</strong> {dayjs(bookDetail.updatedAt).format('DD-MM-YYYY HH:mm')}</p>
                </div>

                <div className="flex justify-between mt-6">
                    {!bookDetail.isComplete ? (
                        <button
                            className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-md shadow hover:bg-green-700"
                            onClick={handleApproveBooking}
                            disabled={loadingApprove}
                        >
                            {loadingApprove ? "Approving..." : "Approve Booking"}
                        </button>
                    ) : (
                        <button
                            className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-md shadow hover:bg-green-700"
                            onClick={handleCompleteBooking}
                            disabled={loadingComplete}
                        >
                            {loadingComplete ? "Completing..." : "Complete Booking"}
                        </button>
                    )}
                    <button
                        className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow hover:bg-red-700"
                        onClick={handleCancelBooking}
                        disabled={loadingCancel}
                    >
                        {loadingCancel ? "Cancelling..." : "Cancel Booking"}
                    </button>
                    <button
                        className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md shadow hover:bg-blue-700"
                        onClick={() => navigate('/car-booking')}
                    >
                        Back to Bookings <FaArrowRight className="inline ml-2" />
                    </button>
                </div>
            </div>
        </HomeLayout>
    );
}

export default RequestCarBook;
