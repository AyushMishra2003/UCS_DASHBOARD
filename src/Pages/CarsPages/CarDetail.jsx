import React, { useEffect, useState } from 'react';
import HomeLayout from '../../Layouts/HomeLayouts';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDriverDetail, updateDriverStatus } from '../../Redux/Slices/ListSlice';
import { toast } from 'sonner';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaEye, FaCheck, FaTimes } from 'react-icons/fa'; // Import icons

const CarDetail = () => {
    const [loaderActive, setLoaderActive] = useState(false);
    const [viewingImage, setViewingImage] = useState(null);
    const [statusUpdated, setStatusUpdated] = useState(false);
    const [currentStep, setCurrentStep] = useState(1); // State for tracking form steps

    const driverData = useSelector((state) => state?.list?.driverDetail);
    const dispatch = useDispatch();
    const { id } = useParams();

    const loadData = () => {
        setLoaderActive(true);
        dispatch(getDriverDetail(id)).finally(() => setLoaderActive(false));
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (statusUpdated) {
            loadData();
            setStatusUpdated(false);
        }
    }, [statusUpdated]);

    const handleStatusChange = async (driverId, status) => {
        try {
            await dispatch(updateDriverStatus({ id: driverId, status })).unwrap();
            setStatusUpdated(true);
            toast.success("Status updated!");
        } catch (error) {
            toast.error("Failed to update status!");
        }
    };

    const mainDiv = 'flex flex-col gap-2';
    const labelStyle = "text-sm text-gray-400 font-medium";
    const inputStyle = 'border border-blue-500 w-full rounded-md px-3 py-2 bg-gray-800 text-white';

    const renderImageButton = (label, fileUrl, key) => (
        <div className='flex flex-col gap-1' key={key}>
            <button
                type="button"
                className='bg-blue-600 hover:bg-blue-800 text-white flex items-center justify-center rounded-md py-2 px-4 font-semibold'
                onClick={() => setViewingImage(fileUrl)}
            >
                <FaEye className='mr-2' /> View {label}
            </button>
        </div>
    );

    const vehicleImageFile = driverData?.proofFiles?.find(file => file.fileName === 'vehicleImage');
    const otherFiles = driverData?.proofFiles?.filter(file => file.fileName !== 'vehicleImage') || [];

    const renderBookingDetails = () => (
        <div>
            <h2 className='text-xl font-semibold'>Booking Details</h2>
            {/* Add booking fields here */}
            <div className='flex items-center gap-4'>
                <button type="button" onClick={() => setCurrentStep(2)} className='bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded'>
                    Next: Driver Details
                </button>
            </div>
        </div>
    );

    const renderDriverDetails = () => (
        <div>
            <h2 className='text-xl font-semibold'>Driver Details</h2>
            <div className={mainDiv}>
                <label className={labelStyle} htmlFor="fullName">Full Name</label>
                <input readOnly className={inputStyle} name='fullName' value={driverData?.fullName || ''} id='fullName' type="text" />
            </div>
            <div className={mainDiv}>
                <label className={labelStyle} htmlFor="email">Email</label>
                <input readOnly className={inputStyle} type="email" name='email' value={driverData?.email || ''} id='email' />
            </div>
            {/* Add more driver fields as needed */}
            <div className='flex items-center gap-4'>
                <button type="button" onClick={() => setCurrentStep(1)} className='bg-gray-600 hover:bg-gray-800 text-white py-2 px-4 rounded'>
                    Back
                </button>
                <button type="button" onClick={() => setCurrentStep(3)} className='bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded'>
                    Next: Pricing Details
                </button>
            </div>
        </div>
    );

    const renderPricingDetails = () => (
        <div>
            <h2 className='text-xl font-semibold'>Pricing Details</h2>
            {/* Add pricing fields here */}
            <div className='flex items-center gap-4'>
                <button type="button" onClick={() => setCurrentStep(2)} className='bg-gray-600 hover:bg-gray-800 text-white py-2 px-4 rounded'>
                    Back
                </button>
                <button type="button" onClick={() => handleStatusChange(driverData.id, 'active')} className='bg-green-600 hover:bg-green-800 text-white py-2 px-4 rounded'>
                    Confirm Booking
                </button>
            </div>
        </div>
    );

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return renderBookingDetails();
            case 2:
                return renderDriverDetails();
            case 3:
                return renderPricingDetails();
            default:
                return null;
        }
    };

    return (
        <HomeLayout>
            {loaderActive ? (
                <SkeletonTheme baseColor="#2F3349" highlightColor="#3D4056">
                    <div className='flex items-center justify-center'>
                        <Skeleton height={400} width={300} />
                    </div>
                </SkeletonTheme>
            ) : (
                <div className='flex items-center justify-center'>
                    <form className='p-6 bg-gray-800 text-white rounded-md shadow-md my-12 flex flex-col gap-4'>
                        {renderCurrentStep()}
                    </form>
                </div>
            )}
            {viewingImage && (
                <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50'>
                    <div className='relative bg-white p-4 rounded-md shadow-lg'>
                        <button
                            type="button"
                            className='absolute top-2 right-2 text-gray-600'
                            onClick={() => setViewingImage(null)}
                        >
                            <FaTimes size={20} />
                        </button>
                        <img src={viewingImage} alt="Document" className='max-w-full max-h-[80vh]' />
                    </div>
                </div>
            )}
        </HomeLayout>
    );
};

export default CarDetail;
