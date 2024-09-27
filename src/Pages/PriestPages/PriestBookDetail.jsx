import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { toast } from 'sonner';
import { GiSunPriest } from 'react-icons/gi';
import { TiTick } from 'react-icons/ti';
import { RxCross2 } from 'react-icons/rx';
import { getPriestOrderDetail } from '../../Redux/Slices/ListSlice';
import HomeLayout from '../../Layouts/HomeLayouts';

const PriestBookDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const loadData = async () => {
        await dispatch(getPriestOrderDetail(id));
    };

    const bookDetail = useSelector((state) => state?.list?.singlePriestData);

    useEffect(() => {
        loadData();
    }, []);

    const rowStyle = 'flex items-center mb-2 text-sm justify-between ';

    return (
        <HomeLayout>

            <div className="flex items-center justify-center py-6 lg:py-16 bg-[#efefef]">
                <div
                    className={`flex flex-col md:max-w-[28rem] sm:w-[80vw] w-[95vw]  text-black lg:max-w-[45rem] p-1  overflow-hidden bg-white rounded-lg shadow-lg border-b-4 ${bookDetail?.status === 'Completed' ? 'border-green-500' : bookDetail?.status === 'Started' || bookDetail?.status === 'Booked' ? 'border-orange-500' : bookDetail?.status === 'Cancelled' ? 'border-red-500' : 'border-blue-500'}`}
                >
                    <div className="p-2 px-4 bg-gradient-to-r from-green-200 to-green-100">
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                            <div className="flex items-center mb-4 lg:mb-0">
                                <GiSunPriest className="mr-4 text-4xl text-orange-600" />
                                <div>
                                    <h2 className="text-2xl font-semibold">{bookDetail?.priestData?.fullName || 'Priest Name'}</h2>
                                    <h3 className="text-lg">{bookDetail?.poojaName}</h3>
                                </div>
                            </div>
                            <div className="flex flex-col items-center w-full sm:w-fit lg:items-end">

                            </div>

                        </div>
                    </div>

                    <div className="flex flex-col justify-between p-4 text-black lg:flex-row">

                        <div className="flex lg:w-[48%] flex-col">
                            <h3 className="mb-1 text-xl font-semibold">Pandit Ji Information</h3>
                            <p className={rowStyle}><span className="font-semibold">Name:</span> {bookDetail?.priestData?.fullName}</p>
                            <p className={rowStyle}><span className="font-semibold">Phone Number:</span> {bookDetail?.priestData?.phoneNumber}</p>
                            <p className={rowStyle}><span className="font-semibold">Email:</span> {bookDetail?.priestData?.email}</p>
                            <p className={rowStyle}><span className="font-semibold">Age:</span> {bookDetail?.priestData?.age} years</p>
                            <p className={rowStyle}><span className="font-semibold">Experience:</span> {bookDetail?.priestData?.experience} years</p>
                        </div>


                        <div className="flex lg:w-[45%] flex-col">
                            <h3 className="mb-1 text-xl font-semibold">Order Information</h3>
                            <div className="flex flex-col">
                                <p className={rowStyle}><span className="font-semibold">Location:</span> {bookDetail?.location}</p>
                                <p className={rowStyle}><span className="font-semibold">Order Date:</span> {bookDetail?.orderDate}</p>
                                <p className={rowStyle}><span className="font-semibold">Order Time:</span> {bookDetail?.orderTime}</p>
                                <p className={rowStyle}><span className="font-semibold">Customer Name:</span> {bookDetail?.fullName}</p>
                                <p className={rowStyle}><span className="">{bookDetail?.phoneNumber}</span> {bookDetail?.alternateNumber}</p>



                            </div>
                        </div>


                    </div>
                    <div className="p-2 px-4 bg-gradient-to-r from-green-200 to-green-100">
                        <div className='flex justify-between items center'>
                            <div className={rowStyle}>
                                <span className="font-semibold text-[1.1rem]">Samagri:</span>
                                <span>{bookDetail?.samagri ? <TiTick className="text-green-500 text-[1.1rem]" /> : <RxCross2 className="text-red-500 text-[1.1rem]" />}</span>
                            </div>
                            <div className="px-4 ">
                                <h3 className="flex items-center text-[1.1rem] font-semibold">
                                    <div className={`ml-2 size-3 rounded-full ${bookDetail?.status === 'Cancelled' ? 'bg-red-500' : bookDetail?.status === 'Booked' ? 'bg-orange-500' : bookDetail?.status === 'Picked up' ? 'bg-yellow-500' : bookDetail?.status === 'Dropped' ? 'bg-green-500' : ''}`}></div>
                                    <span className="ml-2">{bookDetail?.status}</span>
                                </h3>
                            </div>
                        </div>
                        <p className='flex items-center justify-between text-[1.15rem] bg-[#f6f6f6ec] p-1 px-3 rounded font-semibold '><span className="">Total Price:</span> <span><strike className="pr-2">{bookDetail?.originalPrice}</strike> &#8377; {bookDetail?.totalPrice}</span></p>
                    </div>

                </div>
            </div>
        </HomeLayout>
    );
};

export default PriestBookDetails;
