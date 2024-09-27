import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaArrowRightArrowLeft, FaCar } from 'react-icons/fa6';
import { MdCall } from 'react-icons/md';
import dayjs from 'dayjs';
import { getBoatBookings, getCarBookings } from '../../Redux/Slices/ListSlice';
import HomeLayout from '../../Layouts/HomeLayouts';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

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

const BoatOrders = () => {
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterTime, setFilterTime] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orderData = useSelector((state) => state?.list?.boatBooking) || [];

    const loadData = async () => {
        setLoading(true);
        await dispatch(getBoatBookings());
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
                            <option value="Late">Late</option>
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
                    paginatedData.map((data) => (
                        <div
                            key={data?._id}
                            className={`flex cursor-pointer  lg:justify-between lg:min-w-[38rem] lg:flex-row overflow-hidden flex-col items-start md:w-[50vw] sm:w-[65vw] w-[90vw]  lg:w-[50vw] xl:w-[50rem] min-w-[18rem] rounded-lg shadow-md border-r-4 ${data.status === 'Completed' ? 'border-green-500' : data.status === 'Picked up' || data.status === 'On the way' ? 'border-orange-500' : data.status === 'Cancelled' || data.status === "Late" ? 'border-red-500' : 'border-blue-500'}`}
                            onClick={(e) => {
                                if (e.target.closest('.otp-container')) return;
                                navigate(`/boat-book-detail/${data?._id}`);
                            }}
                        >
                            <div className='flex items-center gap-2 text-black md:gap-3 lg:gap-4'>
                                <div>
                                    <img className='w-[8.3rem] h-[6.4rem] lg:w-[9rem] object-cover' src={data?.boatData?.proofFiles[3]?.fileUrl} alt="" />
                                </div>
                                <div className='text-[0.9rem] font-semibold'>
                                    <h3 className='flex items-center gap-3'><FaCar />{data?.fullName}</h3>
                                    <h3 className='flex items-center gap-3'><MdCall />{data?.phoneNumber}</h3>
                                    <h3 className='flex items-center gap-3 mt-3'>
                                        <div className={`ml-[1.2px] ${data?.status === "Cancelled" && 'bg-red-500'} ${data?.status === "On the way" && 'bg-orange-500'} ${data?.status === "Picked up" && 'bg-yellow-500'} ${data?.status === "Dropped" && 'bg-green-500'} rounded-full size-3`}></div>{data?.status}
                                    </h3>
                                </div>
                            </div>
                            <div className='w-full text-[0.95rem] text-black sm:w-full lg:w-[18rem] md:w-full xl:w-[23rem] sm:pr-2'>
                                <div className='flex items-center justify-between w-full p-1 border-t'>
                                    <h3>{data?.area}</h3>

                                </div>
                                <div className='flex items-center justify-between w-full p-1 border-t'>
                                    <h3>{data?.orderDate}</h3>
                                    <h3>{data?.orderTime}</h3>
                                </div>
                                <div className='flex items-center justify-between w-full p-1 border-t'>
                                    <h3>Arrival time : {data?.arrivalTime}</h3>
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

export default BoatOrders;
