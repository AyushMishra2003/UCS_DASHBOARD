import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdCall } from 'react-icons/md';
import dayjs from 'dayjs';
import guiderIcon from "../../assets/guiderIcon.png"
import { FaArrowRight, FaBowlFood, FaHotel, FaLocationDot, FaUser } from 'react-icons/fa6';
import { MdFilterList, MdOutlineFreeBreakfast } from 'react-icons/md';
import { IoBed } from 'react-icons/io5';
import { getCarBookings, getGuiderBookings, getHotelBookings, getPriestBookings } from '../../Redux/Slices/ListSlice';
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

const HotelOrders = () => {
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterTime, setFilterTime] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [currentRoomIndex, setCurrentRoomIndex] = useState(null);
    const [hotelMainImage, setHotelMainImage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const hotelData = useSelector((state) => state?.list?.hotelBooking) || [];

    const loadData = async () => {
        setLoading(true);
        await dispatch(getHotelBookings());
        setLoading(false);
    };

    console.log(hotelData)

    useEffect(() => {
        hotelData.forEach((room) => {
            setHotelMainImage(room.roomData?.roomImage[0].fileUrl);
        });

    }, [hotelData]);


    const handleRoomImage = (url, index) => {
        setHotelMainImage(url);
        setCurrentRoomIndex(index);
    };

    useEffect(() => {
        loadData();
    }, []);

    const getTimeFilteredData = () => {
        const now = dayjs();
        let filteredData = hotelData;

        switch (filterTime) {
            case 'Last Week':
                filteredData = hotelData.filter(order => dayjs(order.orderDate).isAfter(now.subtract(1, 'week')));
                break;
            case 'Last Month':
                filteredData = hotelData.filter(order => dayjs(order.orderDate).isAfter(now.subtract(1, 'month')));
                break;
            case 'Last 3 Months':
                filteredData = hotelData.filter(order => dayjs(order.orderDate).isAfter(now.subtract(3, 'month')));
                break;
            case 'Last 6 Months':
                filteredData = hotelData.filter(order => dayjs(order.orderDate).isAfter(now.subtract(6, 'month')));
                break;
            case 'Last Year':
                filteredData = hotelData.filter(order => dayjs(order.orderDate).isAfter(now.subtract(1, 'year')));
                break;
            default:
                filteredData = hotelData;
        }

        if (filterStatus !== 'All') {
            filteredData = filteredData.filter(order => order.status === (filterStatus).toUpperCase());
        }

        if (searchTerm) {
            filteredData = filteredData.filter(order =>
                order?.roomData?.roomType.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return filteredData;
    };

    const filteredOrderData = getTimeFilteredData().slice().reverse(); // Create a copy and reverse it
    const totalPages = Math.ceil(filteredOrderData.length / itemsPerPage);

    const paginatedData = filteredOrderData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    console.log(paginatedData)

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
                            <option value="Confirmed">Confirmed</option>
                            <option value="CHECK_IN">Check-in</option>
                            <option value="CHECK_OUT">Check-out</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div className='flex flex-col '>
                        <label className='mb-1 text-black'>Show:</label>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                            className='bg-white shadow-[0px_0px_15px_#95959577_inset] outline-none text-black rounded p-2 sm:w-[4.5rem] w-[3.95rem]'
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
                            className='bg-[#fff] shadow-[0px_0px_15px_#95959577_inset] outline-none text-black rounded p-2 sm:w-[10rem] w-[7.4rem]'
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
                    paginatedData.map((room, index) => (
                        <div
                            key={room.id}
                            onClick={() => navigate(`/hotel-book-detail/${room._id}`)}
                            className='bg-white mb-2 mx-0 px-0 flex flex-col lg:border-r-[6px] lg:hover:border-r-[0.5px] pb-0 border-blue-500 min-w-[16.5rem] text-black max-w-[22rem] sm:max-w-[37rem] md:max-w-[30rem] lg:max-w-[45rem] w-[90vw] hover:from-[#f3fbff] cursor-pointer transition-all duration-500 hover:bg-gradient-to-b hover:to-[#f8fafc] rounded-xl shadow-[0px_5px_10px_-6px_#808080] overflow-hidden'
                        >
                            <div className='flex flex-col sm:flex-row'>
                                <div className="w-full sm:max-w-[19rem] md:max-w-[13.5rem] lg:max-w-[19rem]">
                                    <img
                                        src={currentRoomIndex === index ? hotelMainImage : room?.roomData?.roomImage[0].fileUrl}
                                        alt="Hotel Main"
                                        className="h-[12rem] md:h-[10rem] w-full object-cover transition-all duration-500 animate-fadeIn"
                                    />
                                    <div className="flex justify-between bg-[#eeeeef] p-2 h-full">
                                        {room?.roomData?.roomImage.slice(0, 4).map((file, imgIndex) => (
                                            <img
                                                key={imgIndex}
                                                src={file.fileUrl}
                                                alt={`Hotel Proof ${imgIndex + 1}`}
                                                className={`h-[3rem] w-[23%] rounded object-cover cursor-pointer transition-all duration-300 ${hotelMainImage === file.fileUrl && currentRoomIndex === index
                                                    ? 'border-2 border-blue-500 shadow-lg transform scale-105'
                                                    : ''
                                                    }`}
                                                onClick={() => handleRoomImage(file.fileUrl, index)}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className='flex flex-col justify-between px-3 pb-2 lg:gap-4 lg:flex-row'>
                                    <div className='lg:w-[19rem]'>

                                        <div className='flex items-center justify-between mt-3'>

                                            <h2 className='flex text-[1.2rem] items-center gap-2 font-semibold '><FaHotel />{room?.hotelData?.hotelName}</h2>
                                        </div>
                                        <h2 className='flex text-[0.8rem] text-[#515151]  items-center gap-2 font-semibold '>{room?.roomData?.roomType}</h2>
                                        <div className='flex items-center justify-between mt-1'>
                                            <h1 className='flex text-[0.85rem] lg:text-[0.95rem] font-semibold items-center text-[#555555] justify-center gap-1'><FaLocationDot className='text-black' />{room?.hotelData?.address}</h1>
                                        </div>

                                        <div className='flex flex-col items-start gap-[2px] my-1 mt-2 ml-2 sm:flex-wrap lg:flex-col'>
                                            <div className='flex items-start justify-center gap-4'>
                                                <div className='flex items-center justify-center gap-1  text-[#444444] text-[0.9rem] font-semibold'>
                                                    <IoBed className='text-black-500 text-[1.2rem]' />
                                                    {room?.roomData?.roomType === "PREMIUM_DELUXE" ? "Maharaja Bed" :
                                                        room?.roomType === "SINGLE" ? "Single Bed" : "Double Bed"}
                                                </div>
                                                <div className='flex items-center justify-center gap-1  text-[#444444] text-[0.9rem] font-semibold'>
                                                    <FaUser className='mx-[2.5px] text-black-500' />
                                                    {Number(room?.adults) + Number(room?.children)} Guest
                                                </div>
                                            </div>
                                            {room?.roomData?.courtyardView &&
                                                <div className='flex items-center justify-center gap-1  text-[#444444] text-[0.9rem] font-semibold'>
                                                    <img src="https://gos3.ibcdn.com/roomViewIcon-1678093525.png" className='w-[1rem] mx-[2px]' alt="" />
                                                    Courtyard View
                                                </div>}

                                            {room?.food &&
                                                <div className='flex items-center justify-center gap-1  text-[#444444] text-[0.9rem] font-semibold'>
                                                    <FaBowlFood className=' text-[1.1rem] text-black-500' />
                                                    {room?.food}
                                                </div>}
                                            <div className='flex gap-6 text-[0.9rem] font-semibold text-[#555555]'>
                                                <p>{room?.checkIn}</p>-
                                                <p>{room?.checkOut}</p>
                                            </div>
                                        </div>




                                    </div>
                                    <div className='flex items-center justify-between mt-1 w-full border-t lg:py-4 lg:pl-2 lg:border-t-0 lg:border-l lg:ml-2 lg:flex-col lg:w-[8rem]'>

                                        <div className='flex flex-col items-center justify-center text-[0.9rem] font-semibold text-[#777777]'>
                                            <div>{room?.totalRoom} Room</div>
                                            <div>{room?.status}</div>
                                        </div>

                                        <div className='flex flex-col items-center justify-center relative top-[-6px]'>
                                            <p className='text-[0.7rem] flex flex-col top-3 items-center font-semibold text-[#505050] relative'>&#8377;{room?.priceBeforeDis}
                                                <p className='h-[1.15px] w-[2.4rem] rotate-[-8deg] absolute top-2 bg-red-600'></p>
                                            </p>
                                            <span className='text-[1.2rem] relative top-2 font-semibold text-[#19B56F]'>&#8377; {room?.totalAmt}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex  items-center justify-center bg-[#f1f2ff] font-semibold'>

                                {room?.status === "CHECK_OUT" &&
                                    <p className='py-[9px] text-center text-white bg-gradient-to-r w-full from-[#1751fe] via-[#0074f9] transition-all duration-300 to-[#0199ff]'>COMPLETED</p>

                                }

                                {room?.status === 'CHECK_IN' && (

                                    <h3 className='py-[7px] text-center text-white bg-gradient-to-r w-full from-[#1751fe] via-[#0074f9] transition-all duration-300 to-[#0199ff] p-1'>Check-out OTP - {room?.checkOutOTP}</h3>
                                )}

                                {room?.status === "CANCELLED" &&
                                    <p className='py-[9px] text-center text-white bg-gradient-to-r w-full from-[#1751fe] via-[#0074f9] transition-all duration-300 to-[#0199ff]'>Booking Cancelled</p>}

                                {room?.status === 'CONFIRMED' && (

                                    <h3 className='py-[7px] text-center text-white bg-gradient-to-r w-full from-[#1751fe] via-[#0074f9] transition-all duration-300 to-[#0199ff] p-1'>Check-in OTP - {room?.checkInOTP}</h3>
                                )}

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

export default HotelOrders;
