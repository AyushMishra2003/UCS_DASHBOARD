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

const CarRequest = () => {
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

    const getTimeFilteredData = () => {
        const now = dayjs();
        let filteredData = orderData;
    
        // Filter by time
        switch (filterTime) {
            case 'Last Week':
                filteredData = orderData.filter(order => dayjs(order.createdAt).isAfter(now.subtract(1, 'week')));
                break;
            case 'Last Month':
                filteredData = orderData.filter(order => dayjs(order.createdAt).isAfter(now.subtract(1, 'month')));
                break;
            case 'Last 3 Months':
                filteredData = orderData.filter(order => dayjs(order.createdAt).isAfter(now.subtract(3, 'month')));
                break;
            case 'Last 6 Months':
                filteredData = orderData.filter(order => dayjs(order.createdAt).isAfter(now.subtract(6, 'month')));
                break;
            case 'Last Year':
                filteredData = orderData.filter(order => dayjs(order.createdAt).isAfter(now.subtract(1, 'year')));
                break;
            default:
                filteredData = orderData;
        }
    
        // Filter by status (where status is false)
        // filteredData = filteredData.filter(order => !order.status);
        filteredData = filteredData.filter(order => 
            order?.status === false && 
            order?.isComplete === false
        );

        console.log(filteredData);
        
    
        // Filter by search term
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
                                    onClick={() => navigate(`approvedbooking/${booking._id}`)}
                                >
                                     {/* <div className='w-[8.3rem] h-[6.4rem] lg:w-[9rem]'>
                                            <img src={image} alt='Car Placeholder' className='w-full h-full object-cover' />
                                        </div> */}
                                    <div className='flex items-center gap-2 p-4 md:gap-3 lg:gap-4'>
                                        <div className='w-[8.3rem] h-[6.4rem] lg:w-[9rem] bg-gray-300'>
                                        <img src={image} alt='Car Placeholder' className='w-full h-full object-cover' />
                                        </div>
                                        <div className='text-[0.9rem] font-semibold'>
                                            <div>{booking.category || 'N/A'}</div>
                                            <div>{booking?.tripType || 'N/A'}</div>
                                            <div>{dayjs(booking.date || '0000-00-00').format('DD MMM YYYY')}</div>
                                        </div>
                                    </div>
                                    <div className='w-full text-[0.95rem] sm:w-[17.5rem] md:w-[18.5rem] xl:w-[23rem] sm:pr-2'>
                                        <div className='flex items-center justify-between w-full p-1 border-t'>
                                            <div className='text-gray-700'>{booking.fromLocation || 'N/A'}</div>
                                            <div className='text-gray-700'>{booking.toLocation || 'N/A'}</div>
                                        </div>
                                        <div className='flex items-center justify-between w-full p-1 border-t'>
                                            <div className='text-gray-700'>{booking.status || 'N/A'}</div>
                                            <div className='text-gray-700'>{dayjs(booking.time || '0000-00-00').format('HH:mm') || '00:00'}</div>
                                            <div className='text-gray-700'>{booking.isComplete?"Complete":"Not Compelet"}</div>
                                        </div>
                                        <div className='flex items-center justify-between w-full p-1 border-t'>
                                            <div className='text-gray-700'>Rs{booking.price || 'N/A'}</div>
                                            <div className='text-gray-700'>{booking._id || 'N/A'}</div>
                                            
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            <div className='flex justify-between items-center my-4'>
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className='px-4 py-2 bg-gray-300 rounded text-white disabled:opacity-50'
                >
                    <GrFormPrevious />
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className='px-4 py-2 bg-gray-300 rounded text-white disabled:opacity-50'
                >
                    <GrFormNext />
                </button>
            </div>
        </HomeLayout>
    );
};

export default CarRequest;
