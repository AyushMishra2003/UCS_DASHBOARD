import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaArrowRightArrowLeft, FaCar } from 'react-icons/fa6';
import { MdCall } from 'react-icons/md';
import dayjs from 'dayjs';
import { getCarBookings } from '../../Redux/Slices/carBookingSlice'; // Updated import path
import HomeLayout from '../../Layouts/HomeLayouts';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import image from '../../assets/pq.jpeg'

const SkeletonLoader = () => {
    return (
        <div className='flex flex-wrap justify-center gap-4'>
            {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className='flex cursor-pointer rounded-sm sm:justify-between sm:min-w-[38rem] sm:flex-row shadow-[0px_0px_5px_#808080] overflow-hidden flex-col items-start sm:w-[65vw] w-[90vw] md:w-[63vw] lg:w-[58vw] xl:w-[50rem] min-w-[19.7rem]'>
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

const CompleteBooking = () => {
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterTime, setFilterTime] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orderData = useSelector((state) => state.carBooking.bookings) || [];

    console.log(orderData);

    const loadData = async () => {
        setLoading(true);
        await dispatch(getCarBookings());
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    console.log(orderData);
    

    const getTimeFilteredData = () => {
        const now = dayjs();
        let filteredData = orderData;

        // Filter for completed bookings
        filteredData = orderData.filter(order => order.isComplete);

        // Additional filtering based on time
        switch (filterTime) {
            case 'Last Week':
                filteredData = filteredData.filter(order => dayjs(order.createdAt).isAfter(now.subtract(1, 'week')));
                break;
            case 'Last Month':
                filteredData = filteredData.filter(order => dayjs(order.createdAt).isAfter(now.subtract(1, 'month')));
                break;
            case 'Last 3 Months':
                filteredData = filteredData.filter(order => dayjs(order.createdAt).isAfter(now.subtract(3, 'month')));
                break;
            case 'Last 6 Months':
                filteredData = filteredData.filter(order => dayjs(order.createdAt).isAfter(now.subtract(6, 'month')));
                break;
            case 'Last Year':
                filteredData = filteredData.filter(order => dayjs(order.createdAt).isAfter(now.subtract(1, 'year')));
                break;
            default:
                filteredData = filteredData;
        }

        if (filterStatus !== 'All') {
            filteredData = filteredData.filter(order => order.status === filterStatus);
        }

        if (searchTerm) {
            filteredData = filteredData.filter(order =>
                order.driverDetails.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return filteredData;
    };

    const filteredOrderData = getTimeFilteredData().slice().reverse(); // Create a copy and reverse it
    const totalPages = Math.ceil(filteredOrderData.length / itemsPerPage);

    const paginatedData = filteredOrderData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <HomeLayout>
            <div className='flex flex-col xl:flex-row items-center justify-between gap-4 sm:p-3 p-1 py-3 mt-4 bg-white rounded shadow-[0px_0px_10px_#8080807e]'>
                <div className='flex flex-col w-full'>
                    <label className='mb-1 text-black'>Search by Name</label>
                    <input
                        type='text'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='bg-white shadow-[0px_0px_15px_#95959577_inset] outline-none text-black rounded p-2 xl:w-[20rem] w-full'
                        placeholder='Search by name'
                    />
                </div>
                <div className='flex justify-between w-full '>
                    <div className='flex flex-col '>
                        <label className='mb-1 text-black'>Status</label>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className='bg-white shadow-[0px_0px_15px_#95959577_inset] outline-none text-black rounded p-2'
                        >
                            <option value='All'>All</option>
                            <option value='Pending'>Pending</option>
                            <option value='Completed'>Completed</option>
                            <option value='Cancelled'>Cancelled</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-1 text-black'>Time</label>
                        <select
                            value={filterTime}
                            onChange={(e) => setFilterTime(e.target.value)}
                            className='bg-white shadow-[0px_0px_15px_#95959577_inset] outline-none text-black rounded p-2'
                        >
                            <option value='All'>All</option>
                            <option value='Last Week'>Last Week</option>
                            <option value='Last Month'>Last Month</option>
                            <option value='Last 3 Months'>Last 3 Months</option>
                            <option value='Last 6 Months'>Last 6 Months</option>
                            <option value='Last Year'>Last Year</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='w-full'>
                {loading ? (
                    <SkeletonLoader />
                ) : (
                    <div className='flex flex-wrap justify-center gap-4 pt-[3rem]'>
                        {paginatedData.length === 0 ? (
                            <div className='flex items-center justify-center w-full text-lg font-semibold text-gray-500'>No bookings found</div>
                        ) : (
                            paginatedData.map((booking) => (
                                <div
                                    key={booking._id}
                                    className='flex cursor-pointer rounded-sm sm:justify-between sm:min-w-[38rem] sm:flex-row shadow-[0px_0px_5px_#808080] overflow-hidden flex-col items-start sm:w-[65vw] w-[90vw] md:w-[63vw] lg:w-[58vw] xl:w-[50rem] min-w-[19.7rem] '
                                    onClick={() => navigate(`/carBookings/${booking._id}`)}
                                >
                                    <div className='flex items-center gap-2 p-4 md:gap-3 lg:gap-4'>
                                        <img src={image} alt='image' className='w-[8.3rem] h-[6.4rem] lg:w-[9rem]' />
                                        <div className='text-[0.9rem] font-semibold'>
                                            <p className='text-[0.9rem] lg:text-[1rem] text-black'>{booking.driverDetails.name}</p>
                                            <p className='text-[0.8rem] lg:text-[0.9rem] text-black'>{booking?.driverDetails?.phoneNumber}</p>
                                            <p className='text-[0.75rem] lg:text-[0.85rem] text-gray-500'>{booking.pickUpDate}</p>
                                        </div>
                                    </div>
                                    <div className='w-full text-[0.95rem] sm:w-[17.5rem] md:w-[18.5rem] xl:w-[23rem] sm:pr-2'>
                                        <div className='flex items-center justify-between w-full p-1 border-t'>
                                            <span className='text-[0.8rem] lg:text-[0.9rem] text-gray-500'>From</span>
                                            <span className='text-[0.8rem] lg:text-[0.9rem] text-black'>{booking.fromLocation}</span>
                                        </div>
                                        <div className='flex items-center justify-between w-full p-1 border-t'>
                                            <span className='text-[0.8rem] lg:text-[0.9rem] text-gray-500'>To</span>
                                            <span className='text-[0.8rem] lg:text-[0.9rem] text-black'>{booking.toLocation
                                            }</span>
                                        </div>
                                        <div className='flex items-center justify-between w-full p-1 border-t'>
                                            <span className='text-[0.8rem] lg:text-[0.9rem] text-gray-500'>Amount</span>
                                            <span className='text-[0.8rem] lg:text-[0.9rem] text-black'>₹{booking.price}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
            <div className='flex items-center justify-center w-full mt-4'>
                <button
                    className={`p-2 text-lg rounded-l-md ${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'} `}
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    <GrFormPrevious />
                </button>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-4 py-2 mx-1 text-sm rounded ${currentPage === index + 1 ? 'bg-gray-300' : 'bg-white hover:bg-gray-100'}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className={`p-2 text-lg rounded-r-md ${currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'} `}
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    <GrFormNext />
                </button>
            </div>
        </HomeLayout>
    );
};

export default CompleteBooking;
