import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { getCarBookings } from '../../Redux/Slices/carBookingSlice'; // Updated import path
import HomeLayout from '../../Layouts/HomeLayouts';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const SkeletonLoader = () => {
    return (
        <div className='flex flex-wrap justify-center gap-4'>
            {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className='flex cursor-pointer rounded-sm shadow-[0px_0px_5px_#808080] overflow-hidden'>
                    <div className='flex items-center gap-2 p-4 md:gap-3 lg:gap-4'>
                        <div className='w-[8.3rem] h-[6.4rem] lg:w-[9rem] bg-gray-300 animate-pulse'></div>
                        <div className='text-[0.9rem] font-semibold'>
                            <div className='h-4 mb-2 bg-gray-300 animate-pulse'></div>
                            <div className='h-4 mb-2 bg-gray-300 animate-pulse'></div>
                            <div className='h-4 mb-2 bg-gray-300 animate-pulse'></div>
                        </div>
                    </div>
                    <div className='w-full text-[0.95rem] sm:w-[17.5rem] md:w-[18.5rem] xl:w-[23rem] sm:pr-2'>
                        <div className='flex items-center justify-between w-full p-1 border-t'>
                            <div className='h-4 bg-gray-300 animate-pulse w-[40%]'></div>
                            <div className='h-4 bg-gray-300 animate-pulse w-[10%]'></div>
                            <div className='h-4 bg-gray-300 animate-pulse w-[40%]'></div>
                        </div>
                        <div className='flex items-center justify-between w-full p-1 border-t'>
                            <div className='h-4 bg-gray-300 animate-pulse w-[40%]'></div>
                            <div className='h-4 bg-gray-300 animate-pulse w-[20%]'></div>
                        </div>
                        <div className='flex items-center justify-between w-full p-1 border-t'>
                            <div className='h-4 bg-gray-300 animate-pulse w-[50%]'></div>
                            <div className='h-4 bg-gray-300 animate-pulse w-[40%]'></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const CarOrders = ({data}) => {
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterTripType, setFilterTripType] = useState('All');
    const [filterDateFrom, setFilterDateFrom] = useState('');
    const [filterDateTo, setFilterDateTo] = useState('');
    const [searchCustomerPhone, setSearchCustomerPhone] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let orderData = useSelector((state) => state.carBooking.bookings) || [];

    const loadData = async () => {
        setLoading(true);
        await dispatch(getCarBookings());
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, [dispatch]);

    const getFilteredData = () => {
        let filteredData = orderData;
    
        // Filter by status
        if (filterStatus !== 'All') {
            filteredData = filteredData.filter(order => order.status === filterStatus);
        }
    
        // Filter by trip type
        if (filterTripType !== 'All') {
            filteredData = filteredData.filter(order => order.tripType === filterTripType);
        }
    
        // Filter by booking date range
        if (filterDateFrom) {
            filteredData = filteredData.filter(order => dayjs(order.bookingDate).isSame(dayjs(filterDateFrom), 'day') || dayjs(order.bookingDate).isAfter(dayjs(filterDateFrom), 'day'));
        }
        if (filterDateTo) {
            filteredData = filteredData.filter(order => dayjs(order.bookingDate).isSame(dayjs(filterDateTo), 'day') || dayjs(order.bookingDate).isBefore(dayjs(filterDateTo), 'day'));
        }
    
        // Filter by customer email search term
        if (searchCustomerPhone) {
            filteredData = filteredData.filter(order =>
                order.userId?.phoneNumber.includes(searchCustomerPhone)
            );
        }
    
        return filteredData;
    };
    
    const filteredOrderData = getFilteredData().slice().reverse(); 
    const totalPages = Math.ceil(filteredOrderData.length / itemsPerPage);

    const paginatedData = filteredOrderData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleViewDetails = (bookingId) => {
        navigate(`/carBookings/${bookingId}`);
    };

     
    console.log(orderData);


    console.log(data);

    if(data){
        orderData=data
    }
    
    
    

    return (
        <HomeLayout>
            <div className='flex flex-col xl:flex-row items-start justify-between gap-4 p-4 mt-4 bg-white rounded shadow-[0px_0px_10px_#8080807e]'>
                <div className='flex flex-col w-full xl:w-1/2'>
                    <label className='mb-1 text-black'>Search by Phone Number</label>
                    <input
                        type='text'
                        value={searchCustomerPhone}
                        onChange={(e) => setSearchCustomerPhone(e.target.value)}
                        className='bg-white shadow-[0px_0px_15px_#95959577_inset] outline-none text-black rounded p-2 w-full'
                        placeholder='Search by Phone Number'
                    />
                </div>
                <div className='flex flex-col w-full xl:w-1/2'>
                    <label className='mb-1 text-black'>Status</label>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className='bg-white shadow-[0px_0px_15px_#95959577_inset] outline-none text-black rounded p-2 w-full'
                    >
                        <option value='All'>All</option>
                        <option value='pending'>Pending</option>
                        <option value='confirmed'>Confirmed</option>
                        <option value='cancelled'>Cancelled</option>
                        <option value='complete'>Complete</option>
                    </select>
                </div>
                <div className='flex flex-col w-full xl:w-1/2'>
                    <label className='mb-1 text-black'>Trip Type</label>
                    <select
                        value={filterTripType}
                        onChange={(e) => setFilterTripType(e.target.value)}
                        className='bg-white shadow-[0px_0px_15px_#95959577_inset] outline-none text-black rounded p-2 w-full'
                    >
                        <option value='All'>All</option>
                        <option value='Airport Trip'>Airport Trip</option>
                        <option value='Round Trip'>Round Trip</option>
                        <option value='One-Way Trip'>One-Way Trip</option>
                        <option value='Local Trip'>Local Trip</option>
                    </select>
                </div>
                <div className='flex flex-col w-full xl:w-1/2'>
                    <label className='mb-1 text-black'>Booking Date From</label>
                    <input
                        type='date'
                        value={filterDateFrom}
                        onChange={(e) => setFilterDateFrom(e.target.value)}
                        className='bg-white shadow-[0px_0px_15px_#95959577_inset] outline-none text-black rounded p-2 w-full'
                    />
                </div>
                <div className='flex flex-col w-full xl:w-1/2'>
                    <label className='mb-1 text-black'>Booking Date To</label>
                    <input
                        type='date'
                        value={filterDateTo}
                        onChange={(e) => setFilterDateTo(e.target.value)}
                        className='bg-white shadow-[0px_0px_15px_#95959577_inset] outline-none text-black rounded p-2 w-full'
                    />
                </div>
            </div>
            <div className='mt-4'>
                {loading ? (
                    <SkeletonLoader />
                ) : (
                    <div className='overflow-x-auto'>
                        <table className='min-w-full bg-white border border-gray-200'>
                            <thead>
                                <tr className='bg-gray-100 border-b'>
                                    <th className='py-2 px-4 border-r'>Booking ID</th>
                                    <th className='py-2 px-4 border-r'>Customer</th>
                                    <th className='py-2 px-4 border-r'>From Location</th>
                                    <th className='py-2 px-4 border-r'>To Location</th>
                                    <th className='py-2 px-4 border-r'>City</th>
                                    <th className='py-2 px-4 border-r'>Airport Address</th>
                                    <th className='py-2 px-4 border-r'>Booking Date</th>
                                    <th className='py-2 px-4 border-r'>Trip Type</th>
                                    <th className='py-2 px-4 border-r'>Status</th>
                                    <th className='py-2 px-4'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.length > 0 ? (
                                    paginatedData.map((booking) => (
                                        <tr key={booking._id} className='border-b'>
                                            <td className='py-2 px-4 border-r'>{booking.bookingId}</td>
                                            <td className='py-2 px-4 border-r'>{booking.userId?.email || 'N/A'}</td>
                                            <td className='py-2 px-4 border-r'>{booking?.fromLocation?booking.fromLocation:"---"}</td>
                                            <td className='py-2 px-4 border-r'>{booking?.toLocation?booking.toLocation:"---"}</td>
                                            <td className='py-2 px-4 border-r'>{booking?.cityName?booking.cityName:"---"}</td>
                                            <td className='py-2 px-4 border-r'>{booking?.airpotAddress?booking.airpotAddress:"---"}</td>
                                            <td className='py-2 px-4 border-r'>{dayjs(booking.bookingDate).format('DD-MM-YYYY')}</td>
                                            <td className='py-2 px-4 border-r'>{booking.tripType}</td>
                                            <td className='py-2 px-4 border-r'>{booking.status}</td>
                                            <td className='py-2 px-4'>
                                                <button
                                                    onClick={() => handleViewDetails(booking._id)}
                                                    className='bg-blue-500 text-white py-1 px-3 rounded'
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan='8' className='py-4 text-center'>No Data Available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className='flex items-center justify-between mt-4'>
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className='bg-gray-300 text-black py-2 px-4 rounded disabled:opacity-50'
                            >
                                <GrFormPrevious />
                            </button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className='bg-gray-300 text-black py-2 px-4 rounded disabled:opacity-50'
                            >
                                <GrFormNext />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </HomeLayout>
    );
};

export default CarOrders;
