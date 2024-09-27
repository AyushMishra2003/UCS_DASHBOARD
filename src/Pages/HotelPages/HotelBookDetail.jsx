import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { toast } from 'sonner';
import { GiSunPriest } from 'react-icons/gi';
import { TiCancel, TiTick } from 'react-icons/ti';
import { RxCross2 } from 'react-icons/rx';
import { MdCall, MdOutlineFreeBreakfast } from 'react-icons/md';
import { FaHotel, FaLocationDot, FaUser } from 'react-icons/fa6';
import { IoBed } from 'react-icons/io5';
import { getHotelOrderDetail } from '../../Redux/Slices/ListSlice';
import HomeLayout from '../../Layouts/HomeLayouts';

const HotelBookDetail = () => {
    const [otpValues, setOtpValues] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [hotelMainImage, setHotelMainImage] = useState('');

    const loadData = async () => {
        await dispatch(getHotelOrderDetail(id));
    };

    const bookDetail = useSelector((state) => state?.list?.singleHotelData);
    console.log(bookDetail)

    useEffect(() => {
        if (bookDetail?.hotelData?.proofFiles?.length > 0) {
            setHotelMainImage(bookDetail?.hotelData.proofFiles[0].fileUrl);
        }
    }, [bookDetail]);

    const handleHotelImageClick = (image, index) => {
        setHotelMainImage(image);
    };


    useEffect(() => {
        loadData();
    }, []);

    if (!bookDetail) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }



    return (
        <HomeLayout>
            <div className='py-10 bg-[#f7f7f7] flex flex-col items-center justify-center'>
                <div className='flex flex-wrap items-center justify-center gap-1'>
                    <div
                        className='bg-white lg:h-[28rem]  pb-2 h-[27rem] flex flex-col md:border-b-[6px] lg:hover:border-b-[0.5px] border-blue-500  min-w-[19.5rem] text-black max-w-[21rem] w-[90vw] hover:from-[#f3fbff] cursor-pointer transition-all duration-500 hover:bg-gradient-to-b hover:to-[#f8fafc] rounded-xl shadow-[0px_5px_10px_-6px_#808080] overflow-hidden'
                    >
                        <div className='w-full'>
                            <img
                                src={hotelMainImage}
                                alt="Hotel Main"
                                className='h-[12rem]  w-full object-cover transition-all duration-500 animate-fadeIn'
                            />
                            <div className='flex justify-between bg-[#eeeeef] p-2'>
                                {bookDetail?.hotelData?.proofFiles?.slice(0, 2).map((file, index) => (
                                    <img
                                        key={index}
                                        src={file.fileUrl}
                                        alt={`Hotel Proof ${index + 1}`}
                                        className={`h-[3rem] w-[23%] rounded object-cover cursor-pointer transition-all duration-300 ${hotelMainImage === file.fileUrl ? 'border-2 border-blue-500 shadow-lg transform scale-105' : ''}`}
                                        onClick={() => handleHotelImageClick(file.fileUrl, index)}
                                    />
                                ))}
                                {bookDetail?.roomData?.roomImage?.slice(0, 2).map((file, index) => (
                                    <img
                                        key={index}
                                        src={file.fileUrl}
                                        alt={`Hotel Proof ${index + 1}`}
                                        className={`h-[3rem] w-[23%] rounded object-cover cursor-pointer transition-all duration-300 ${hotelMainImage === file.fileUrl ? 'border-2 border-blue-500 shadow-lg transform scale-105' : ''}`}
                                        onClick={() => handleHotelImageClick(file.fileUrl, index)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className='flex flex-col justify-between px-3 md:gap-4 md:flex-row'>
                            <div className='lg:w-[25rem]'>

                                <div className='flex items-end gap-1 mt-3'>

                                    <h2 className='flex text-[1.2rem] items-center gap-2 font-semibold '><FaHotel />{bookDetail?.hotelData?.hotelName}</h2>
                                </div>
                                <h2 className='text-[0.9rem] text-[#383838] font-semibold'>Room type - {bookDetail?.roomData?.roomType}</h2>
                                <div className='flex items-center justify-between mt-1'>
                                    <h1 className='flex text-[0.85rem] lg:text-[0.95rem] font-semibold items-center text-[#555555] justify-center gap-1'><FaLocationDot className='text-black' />{bookDetail?.hotelData?.address}</h1>
                                </div>

                                <div className='flex flex-wrap items-start gap-1 mt-2 ml-2 '>
                                    <div className='flex items-center justify-center gap-1 mr-6  text-[#444444] text-[0.9rem] font-semibold'>
                                        <IoBed className='text-black-500 text-[1.2rem]' />
                                        {bookDetail?.roomData?.roomType === "PREMIUM_DELUXE" ? "Maharaja Bed" :
                                            bookDetail?.roomData?.roomType === "SINGLE" ? "Single Bed" : "Double Bed"}
                                    </div>
                                    <div className='flex items-center justify-center gap-1  mr-4 text-[#444444] text-[0.9rem] font-semibold'>
                                        <FaUser className='mx-[2.5px] text-black-500' />
                                        {bookDetail?.roomData?.roomType === "PREMIUM_DELUXE" ? `Max ${bookDetail?.roomData?.capacity} guests` :
                                            bookDetail?.roomData?.roomType === "SINGLE" ? `Max ${bookDetail?.roomData?.capacity} guests` : `Max ${bookDetail?.roomData?.capacity} guests`}
                                    </div>

                                    {bookDetail?.roomData?.amenities.includes("Breakfast") && (
                                        <div className='flex items-center justify-center gap-1 text-[#444444] text-[0.9rem] font-semibold'>
                                            <MdOutlineFreeBreakfast className='text-black-500 text-[1.2rem]' />
                                            {bookDetail?.roomData.roomType === "PREMIUM_DELUXE" ? "Free Breakfast + 1 meal" :
                                                bookDetail?.roomData.roomType === "SINGLE" ? "Free Breakfast" : "Free Breakfast"}
                                        </div>
                                    )}
                                    {bookDetail?.roomData?.courtyardView &&
                                        <div className='flex items-center justify-center gap-1  mr-6 text-[#444444] text-[0.9rem] font-semibold'>
                                            <img src="https://gos3.ibcdn.com/roomViewIcon-1678093525.png" className='w-[1rem] mx-[2px]' alt="" />
                                            Courtyard View
                                        </div>}
                                    <div className='flex items-center justify-center gap-1  text-[#444444] text-[0.9rem] font-semibold'>
                                        <MdCall className=' text-[1.3rem] text-black-500' />
                                        {bookDetail?.hotelData?.phoneNumber}
                                    </div>
                                </div>




                            </div>

                        </div>
                    </div>
                    <div
                        className='h-[27rem] lg:h-[28rem]  flex flex-col md:border-b-[6px] lg:hover:border-b-[0.5px] bg-[#f5f5f5] border-blue-500  min-w-[19.5rem] text-black justify-between max-w-[21rem] w-[90vw]  cursor-pointer transition-all duration-500 hover:bg-gradient-to-b  rounded-xl shadow-[0px_5px_10px_-6px_#808080] overflow-hidden'
                    >
                        <div className='flex items-center justify-center bg-[#eaebff] shadow-[0px_5px_8px_-4px_#808080] font-semibold'>
                            {bookDetail?.status === "CHECK_OUT" &&
                                <p className='py-[9px] text-center text-white bg-gradient-to-r w-full from-[#1751fe] via-[#0074f9] transition-all duration-300 to-[#0199ff]'>COMPLETED</p>

                            }
                            {bookDetail?.status === "CANCELLED" &&
                                <p className='py-[9px] text-center text-white bg-gradient-to-r w-full from-[#1751fe] via-[#0074f9] transition-all duration-300 to-[#0199ff]'>Booking Cancelled</p>}

                            {bookDetail?.status === 'CONFIRMED' && (

                                <h3 className='py-[7px] text-center text-white bg-gradient-to-r w-full from-[#1751fe] via-[#0074f9] transition-all duration-300 to-[#0199ff] p-1'>Check-in OTP - {bookDetail?.checkInOTP}</h3>
                            )}

                            {bookDetail?.status === 'CHECK_IN' && (

                                <h3 className='py-[7px] text-center text-white bg-gradient-to-r w-full from-[#1751fe] via-[#0074f9] transition-all duration-300 to-[#0199ff] p-1'>Check-out OTP - {bookDetail?.checkOutOTP}</h3>
                            )}


                        </div>
                        <div className="flex flex-col gap-1 p-3 pt-1">
                            <h1 className="text-[1.28rem] font-semibold ">Booking details</h1>
                            <div className='flex items-center gap-1 mb-1'>
                                <div>
                                    <div className='w-[2.2rem] h-[4px] rounded-full bg-black'></div>
                                </div>
                                <div>
                                    <div className='w-[1rem] h-[4px] rounded-full bg-black'></div>
                                </div>
                                <div>
                                    <div className='size-[4px] rounded-full bg-black'></div>
                                </div>
                            </div>
                            <p className='block text-sm font-medium text-gray-800'>Full Name : <span className='text-gray-600'>{bookDetail?.fullName}</span></p>

                            <p className='block text-sm font-medium text-gray-800'>Phone Number : <span className='text-gray-600'>{bookDetail?.phoneNumber} || {bookDetail?.alternateNumber}</span></p>



                            <p className='block text-sm font-medium text-gray-800'>Number of Children : <span className='text-gray-600'>{bookDetail?.children}</span></p>

                            <p className='block text-sm font-medium text-gray-800'>Number of adults : <span className='text-gray-600'>{bookDetail?.adults}</span></p>

                            <p className='block text-sm font-medium text-gray-800'>Check In : <span className='text-gray-600'>{bookDetail?.checkIn}</span></p>

                            <p className='block text-sm font-medium text-gray-800'>Check Out : <span className='text-gray-600'>{bookDetail?.checkOut}</span></p>

                            {bookDetail?.food &&
                                <p className='block text-sm font-medium text-gray-800'>Extra foods : <span className='text-gray-600'>{bookDetail?.food}</span></p>
                            }
                            <p className='block text-sm font-medium text-gray-800'>Total rooms : <span className='text-gray-600'>{bookDetail?.totalRoom} room</span></p>

                            <p className='block text-sm font-medium text-gray-800'>Total nights : <span className='text-gray-600'>{bookDetail?.totalNight} night</span></p>


                        </div>

                        <div className='flex items-center justify-between pt-1  my-2 shadow-[0px_-3px_5px_-3px_#808080] px-4 font-medium text-gray-800  text-md'>Total bill :
                            <div className='flex items-center '>
                                <div className='text-[0.8rem] ml-6 mr-1 relative'>&#8377;{bookDetail?.priceBeforeDis}
                                    <div className='w-[2rem] absolute top-[10px] right-[px] rotate-[-13deg] h-[1.5px] bg-red-500'>

                                    </div>
                                </div>
                                <span className='text-gray-600'>&#8377;{bookDetail?.totalAmt}</span>
                            </div>
                        </div>


                    </div>
                </div>


            </div >
        </HomeLayout>
    );
};

export default HotelBookDetail;
