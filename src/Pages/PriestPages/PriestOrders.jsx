import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdCall } from 'react-icons/md';
import dayjs from 'dayjs';
import { FaLocationDot } from 'react-icons/fa6';

import { getCarBookings, getPriestBookings } from '../../Redux/Slices/ListSlice';
import HomeLayout from '../../Layouts/HomeLayouts';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { GiSunPriest } from "react-icons/gi";

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

const PriestOrders = () => {
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterTime, setFilterTime] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orderData = useSelector((state) => state?.list?.priestBooking) || [];

    const loadData = async () => {
        setLoading(true);
        await dispatch(getPriestBookings());
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const getTimeFilteredData = () => {
        const now = dayjs();
        let filteredData = orderData;

        switch (filterTime) {
            case 'Last Week':
                filteredData = orderData.filter(order => dayjs(order.orderDate).isAfter(now.subtract(1, 'week')));
                break;
            case 'Last Month':
                filteredData = orderData.filter(order => dayjs(order.orderDate).isAfter(now.subtract(1, 'month')));
                break;
            case 'Last 3 Months':
                filteredData = orderData.filter(order => dayjs(order.orderDate).isAfter(now.subtract(3, 'month')));
                break;
            case 'Last 6 Months':
                filteredData = orderData.filter(order => dayjs(order.orderDate).isAfter(now.subtract(6, 'month')));
                break;
            case 'Last Year':
                filteredData = orderData.filter(order => dayjs(order.orderDate).isAfter(now.subtract(1, 'year')));
                break;
            default:
                filteredData = orderData;
        }

        if (filterStatus !== 'All') {
            filteredData = filteredData.filter(order => order.status === filterStatus);
        }

        if (searchTerm) {
            filteredData = filteredData.filter(order =>
                order.fullName.toLowerCase().includes(searchTerm.toLowerCase())
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
                            className='bg-[#fff] shadow-[0px_0px_15px_#95959577_inset] outline-none text-black rounded p-2 sm:w-[12rem] w-[7rem]'
                        >
                            <option value="All">All</option>
                            <option value="On the way">On the way</option>
                            <option value="Picked up">Picked up</option>
                            <option value="Dropped">Dropped</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div className='flex flex-col '>
                        <label className='mb-1 text-black'>Show:</label>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                            className='bg-white shadow-[0px_0px_15px_#95959577_inset] outline-none text-black rounded p-2 sm:w-[5rem] w-[3.95rem]'
                        >
                            <option value={10}>10</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                    <div className='flex flex-col '>
                        <label className='mb-1 text-black'>Time</label>
                        <select
                            value={filterTime}
                            onChange={(e) => setFilterTime(e.target.value)}
                            className='bg-[#fff] shadow-[0px_0px_15px_#95959577_inset] outline-none text-black rounded p-2 sm:w-[12rem] w-[7.4rem]'
                        >
                            <option value="All">All</option>
                            <option value="Last Week">Last Week</option>
                            <option value="Last Month">Last Month</option>
                            <option value="Last 3 Months">Last 3 Months</option>
                            <option value="Last 6 Months">Last 6 Months</option>
                            <option value="Last Year">Last Year</option>
                        </select>
                    </div>


                </div>
            </div>
            <div className='flex flex-col items-center gap-4 mt-4 '>
                {loading ? (
                    <SkeletonLoader />
                ) : paginatedData && paginatedData.length > 0 ? (
                    paginatedData.map((order) => (
                        <div
                            key={order._id}
                            className={`flex flex-col w-full  md:max-w-[44rem] p-4 text-black bg-white rounded-lg shadow-md border-l-4 ${order.status === 'Completed' ? 'border-green-500' : order.status === 'Started' || order.status === 'Booked' ? 'border-orange-500' : order.status === 'Cancelled' ? 'border-red-500' : 'border-blue-500'}`}
                            onClick={() => navigate(`/priest-book-detail/${order._id}`)}
                        >
                            <div className='flex flex-col items-start justify-between sm:flex-row'>
                                <div className='flex items-center mb-4'>
                                    <GiSunPriest className='mr-4 text-[3.5rem] text-orange-600' />
                                    <div>
                                        <h2 className='text-xl font-semibold'>{order?.priestData?.fullName || 'Priest Name'}</h2>
                                        <h3>{order?.poojaName}</h3>
                                        <div className='text-sm text-gray-600'>
                                            <div><strong>Booking Date:</strong> {order?.orderDate || 'N/A'}</div>
                                            <div><strong>Booking time:</strong> {order?.orderTime || 'N/A'}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex items-center mb-2 text-sm'>
                                    <h3 className='flex items-center gap-3 mt-3'>
                                        <div className={`ml-[1.2px] ${order?.status === 'Cancelled' && 'bg-red-500'} ${order?.status === 'Booked' && 'bg-orange-500'} ${order?.status === 'Started' && 'bg-yellow-500'} ${order?.status === 'Completed' && 'bg-green-500'} rounded-full size-3`}></div>{order?.status}
                                    </h3>
                                </div>
                            </div>
                            <div className='flex flex-col justify-between gap-4 sm:items-end sm:flex-row'>
                                <div>
                                    <div className='flex items-center mb-2 text-sm'>
                                        <FaLocationDot className='mr-2' />
                                        <span><strong>Location:</strong> {order?.location || 'N/A'}</span>
                                    </div>
                                    <div className='flex items-center mb-2 text-sm'>
                                        <MdCall className='mr-2' />
                                        <span><strong>Customer Contact:</strong> {order?.phoneNumber || 'N/A'}</span>
                                    </div>
                                </div>
                                <div className='flex mb-[7px] flex-col justify-between '>


                                </div>

                            </div>
                        </div>
                    ))
                ) : (
                    <div>No orders found.</div>
                )}
                <div className="flex sm:w-[65vw] w-[90vw] md:w-[50vw] lg:w-[58vw]  xl:w-[50rem] min-w-[19.7rem] items-center justify-between mt-2 bg-[#353a51] text-white rounded overflow-hidden shadow-[0px_6px_10px_#8080807e]">
                    <button
                        className='flex items-center justify-center bg-[#7367F0] p-3'
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                        <GrFormPrevious className='text-[1.4rem] mt-1' /> Previous
                    </button>
                    <span className='font-semibold '>Page {currentPage} of {totalPages}</span>
                    <button
                        className='flex items-center justify-center bg-[#7367F0] p-3'

                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                        Next <GrFormNext className='text-[1.4rem] mt-1' />
                    </button>
                </div>
            </div>
        </HomeLayout>
    );
}

export default PriestOrders;
