import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getBoatOrderDetail, getCarOrderDetail } from '../../Redux/Slices/ListSlice';
import { FaArrowRight, FaArrowRightArrowLeft } from 'react-icons/fa6';
import { MdOutlineAirlineSeatReclineExtra } from 'react-icons/md';
import { toast } from 'sonner';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import HomeLayout from '../../Layouts/HomeLayouts';

const BoatBookDetails = () => {
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const loadData = async () => {
        await dispatch(getBoatOrderDetail(id));
        setLoading(false);
    };




    const bookDetail = useSelector((state) => state?.list?.singleBoatData) || {}
    console.log(bookDetail)
    useEffect(() => {
        loadData();
    }, []);

    if (loading) {
        return (
            <HomeLayout>
                <div className="flex items-center justify-center py-6 lg:py-16">

                    <div className="overflow-hidden text-black bg-white rounded-lg sm:w-[50vw] w-[58vw] shadow-[0px_0px_5px_#808080] lg:w-[80vw] lg:max-w-[42rem] xl:w-[55rem] min-w-[19.7rem]">
                        <div className="flex flex-col lg:items-end bg-gradient-to-b from-[#d0f7e6] via-[#dcfced] to-[#f2fef8e7] lg:flex-row lg:justify-between">
                            <div className="flex flex-col justify-center">
                                <h2 className="my-1 lg:mb-5 text-[1.3rem] text-center font-semibold">
                                    <Skeleton width={200} />
                                </h2>
                                <Skeleton height={200} width="100%" />
                            </div>
                            <div className='p-2 lg:pb-0 lg:w-[24rem]'>
                                <Skeleton height={50} width="100%" />
                                <div className='my-3 lg:mb-1'>
                                    <h3 className="flex justify-between p-2 mb-2 text-xl font-semibold lg:mb-1">
                                        Driver Information
                                    </h3>
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <div key={index} className='flex items-center justify-between p-1 border-t'>
                                            <Skeleton width={150} />
                                            <Skeleton width={150} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='p-2 bg-[#f9fffb]'>
                            <h3 className="flex items-center justify-between mt-4 mb-2 text-xl font-semibold">
                                Order Information
                            </h3>
                            <div className='flex flex-col lg:flex-row lg:justify-between'>
                                <div className='lg:w-[48%]'>
                                    {Array.from({ length: 4 }).map((_, index) => (
                                        <div key={index} className='flex items-center justify-between w-full p-1 border-t'>
                                            <Skeleton width={150} />
                                            <Skeleton width={150} />
                                        </div>
                                    ))}
                                </div>
                                <div className='lg:w-[48%]'>
                                    {Array.from({ length: 4 }).map((_, index) => (
                                        <div key={index} className='flex items-center justify-between p-1 border-t'>
                                            <Skeleton width={150} />
                                            <Skeleton width={150} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </HomeLayout>
        );
    }

    const {

        boatData,
        orderDate,
        orderTime,
        fullName,
        originalPrice,
        totalPrice,
        pickLocation,
        dropLocation,
        fareType,
        phoneNumber,
        alternateNumber,
        numberOfMales,
        numberOfFemales,
        arrivalTime,
        area,
        numberOfChildren,
        returnTrip,
        status
    } = bookDetail;

    const vehicleImage = boatData?.proofFiles[3]?.fileUrl || ''; // Ensure it doesn't break if proofFiles is missing

    const rowStyle = 'flex items-center justify-between p-1 border-t';

    return (
        <HomeLayout>
            <div className="flex items-center justify-center py-6 lg:py-16">
                <div className="overflow-hidden text-black bg-white rounded-lg sm:w-[50vw] w-[58vw] shadow-[0px_0px_5px_#808080] lg:w-[80vw] lg:max-w-[42rem]  xl:w-[55rem] min-w-[19.7rem]">
                    <div className="flex flex-col lg:items-end via-[#dcfced] from-[#d0f7e6] bg-gradient-to-b to-[#f2fef8e7] lg:flex-row lg:justify-between">
                        <div className="flex flex-col justify-center">
                            <h2 className="my-1 lg:mb-5 text-[1.3rem] text-center font-semibold">Arrival time : {arrivalTime}</h2>
                            <img src={vehicleImage} alt="Vehicle" className="object-cover w-full lg:w-[22rem] lg:h-[12.8rem] lg:rounded-l-none lg:rounded-r-lg rounded-lg rounded-b-none" />
                        </div>
                        <div className='p-2 lg:pb-0 lg:w-[24rem]'>


                            <div className='my-3 lg:mb-1'>
                                <h3 className="flex justify-between p-2 mb-2 text-xl font-semibold lg:mb-1">Driver Information
                                    <h2 className='flex items-center gap-1'><MdOutlineAirlineSeatReclineExtra />{boatData?.servicesData?.seatingCap}</h2>
                                </h3>
                                <p className={rowStyle}><span className="font-semibold text-[0.95rem]">Name:</span> {boatData.fullName}</p>
                                <p className={rowStyle}><span className="font-semibold text-[0.95rem]">Phone Number:</span> {boatData.phoneNumber}</p>
                                <p className={rowStyle}><span className="font-semibold text-[0.95rem]">Email:</span> {boatData.email}</p>
                                <p className={rowStyle}><span className="font-semibold text-[0.95rem]">Age:</span> {boatData.age} years</p>
                                <p className={rowStyle}><span className="font-semibold text-[0.95rem]">Experience:</span> {boatData.experience} years</p>
                            </div>
                        </div>
                    </div>
                    <div className='p-2 bg-[#f9fffb]'>
                        <h3 className="flex items-center justify-between mt-4 mb-2 text-xl font-semibold">Order Information
                            <div className='flex items-center gap-1 text-[0.95rem] font-normal'>
                                <div className={`ml-[1.2px] ${status === "Cancelled" && 'bg-red-500'} ${status === "On the way" && 'bg-orange-500'} ${status === "Picked up" && 'bg-yellow-500'} ${status === "Dropped" && 'bg-green-500'} rounded-full size-3`}></div>{status}
                            </div>
                        </h3>
                        <div className='flex flex-col lg:flex-row lg:justify-between'>
                            <div className='lg:w-[48%]'>
                                <div className='flex items-center justify-between w-full p-1 border-t '>
                                    <h3>{area}</h3>

                                </div>
                                <div className='flex items-center justify-between w-full p-1 border-t '>
                                    <h3>{orderDate}</h3>
                                    <h3>{orderTime}</h3>
                                </div>
                                <p className={rowStyle}><span className="font-semibold text-[0.95rem]">Customer Name:</span> {fullName}</p>
                                <p className={rowStyle}><span className="font-semibold text-[0.95rem]">Phone Number:</span> {phoneNumber}</p>
                            </div>
                            <div className='lg:w-[48%]'>
                                <p className={rowStyle}><span className="font-semibold text-[0.95rem]">Alternate Number:</span> {alternateNumber}</p>
                                <p className={rowStyle}><span className="font-semibold text-[0.95rem]">Fare Type:</span> {fareType}</p>
                                <div className={rowStyle}><p><span className="font-semibold text-[0.95rem]">No. of Males:</span> {numberOfMales}</p>
                                    <p><span className="font-semibold text-[0.95rem]">Females:</span> {numberOfFemales}</p>
                                    <p><span className="font-semibold text-[0.95rem]">Children:</span> {numberOfChildren}</p>
                                </div>
                                <p className={rowStyle}><span className="font-semibold text-[0.95rem]">Total Price:</span> <p><strike className="pr-2">{originalPrice}</strike> &#8377; {totalPrice} </p></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
};

export default BoatBookDetails;
