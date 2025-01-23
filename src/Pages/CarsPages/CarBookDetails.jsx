import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    getCarBookingById,
    completeBooking,
    cancelBooking,
    addDriverDetails,
    updateRate,
    invoice,
    // updateDriverDetails, // Added for editing driver details
    // removeDriverDetails,
} from '../../Redux/Slices/carBookingSlice';
import { FaCar, FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import HomeLayout from '../../Layouts/HomeLayouts';
import dayjs from 'dayjs';
import { FaRegEdit } from "react-icons/fa";
import { set } from 'mongoose';
import { FaDownload } from "react-icons/fa6";

const CarBookDetails = () => {
    const [loading, setLoading] = useState(true);
    const [showAddDriver, setShowAddDriver] = useState(false);
    const [editDriver, setEditDriver] = useState(null); // For editing driver details
    const [driverDetails, setDriverDetails] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        carNumber: ''
    });

    const [currentStep, setCurrentStep] = useState(1);

    const nextStep = () => {
        setCurrentStep(prevStep => Math.min(prevStep + 1, 3));
    };

    const prevStep = () => {
        setCurrentStep(prevStep => Math.max(prevStep - 1, 1));
    };


    const toggleSection=(step)=>{
        setCurrentStep(step)
    }


    const [extraRates, setExtraRates] = useState();
    const [extraHour,setExtraHour]=useState()
    const [description,setDescription]=useState()
    const [isEditingRates, setIsEditingRates] = useState(false);
    const [isUpdatingRates, setIsUpdatingRates] = useState(false);
    const [isCancellingBooking, setIsCancellingBooking] = useState(false);
    const [isCompletingBooking, setIsCompletingBooking] = useState(false);

    const [isloading,setIsLoading]=useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const loadData = async () => {
        await dispatch(getCarBookingById(id));
        setLoading(false);
    };

    const bookDetail = useSelector((state) => state.carBooking.bookingDetails);
    const adminId = useSelector((state) => state?.auth?.data?._id);

    useEffect(() => {
        loadData();
    }, [dispatch, id]);

    useEffect(() => {
        if (bookDetail && bookDetail.driverDetails) {
            setDriverDetails(bookDetail.driverDetails);
        }
        if (bookDetail && bookDetail.extraRates) {
            setExtraRates(bookDetail.extraRates);
        }
    }, [bookDetail]);

    const handleApproveBooking = async () => {
        await dispatch(completeBooking({ id, adminId, extraRates }));
        navigate('/car-booking');
    };

    const handleAddDriverDetails = async () => {
        setIsLoading(true)
        const response=await dispatch(addDriverDetails({ id, driverDetails }));
        
        setShowAddDriver(false);
        setDriverDetails({
            name: '',
            email: '',
            phoneNumber: '',
            carNumber: ''
        })
        setIsLoading(false)
        loadData(); // Refresh data after adding driver details
    };

    const handleUpdateDriverDetails = async () => {
        await dispatch(updateDriverDetails({ id, driverId: editDriver._id, driverDetails }));
        setEditDriver(null);
        setShowAddDriver(false);
        loadData(); // Refresh data after updating driver details
    };

    const handleCancelBooking = async () => {
        setIsCancellingBooking(true);
        await dispatch(cancelBooking({ id, adminId }));
        setIsCancellingBooking(false);
        loadData();
    };

    const handleRemoveDriverDetails = async (driverId) => {
        await dispatch(removeDriverDetails({ id, driverId }));
        setShowAddDriver(false);
        loadData(); // Refresh data after removing driver details
    };

    const handleCompleteBooking = async () => {
        setIsCompletingBooking(true);
        console.log(extraRates,extraHour,description);
        
        await dispatch(completeBooking({ id, extraRates ,extraHour,description}));
        setIsCompletingBooking(false);
        loadData();
    };

    const handleRate = async () => {
        setIsUpdatingRates(true);
        console.log(extraRates,extraHour,description);
        
        await dispatch(updateRate({ id, extraRates ,extraHours:extraHour,description}));
        setIsUpdatingRates(false);
        loadData();
    };

    const downloadInvoice = async (id) => {
        console.log("Download invoice");
    
        const response = await dispatch(invoice(id));  // API call to get binary data
        console.log(response);
    
        if (response.payload) {
            // Convert the binary data to a Blob
            const blob = new Blob([response.payload], { type: 'application/pdf' });
    
            // Create a link element
            const link = document.createElement('a');
            
            // Create a URL for the Blob and set it as the href attribute
            link.href = window.URL.createObjectURL(blob);
            
            // Set the download attribute with a filename
            link.download = `invoice_${id}.pdf`;
            
            // Append the link to the body (required for Firefox)
            document.body.appendChild(link);
            
            // Programmatically trigger the download
            link.click();
            
            // Remove the link from the DOM
            document.body.removeChild(link);
        }
    };
    
    



    if (loading) {
        return (
            <HomeLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
                        <Skeleton height={30} width="60%" />
                        <Skeleton height={200} className="my-4" />
                        <Skeleton height={30} width="80%" />
                        <Skeleton height={150} className="my-4" />
                    </div>
                </div>
            </HomeLayout>
        );
    }

    const isBookingCancelled = bookDetail.status === "cancelled";
    const isBookingConfirmed = bookDetail.status === 'confirmed';
    const isBookingComplete = bookDetail.status === "complete";




    

    return (
        <HomeLayout>
          <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          
          <div className="flex items-center justify-center space-x-4 mb-6">
                <button
                    onClick={() => toggleSection(1)}
                    className={`px-4 py-2 text-sm font-bold text-white rounded-full ${currentStep === 1 ? 'bg-blue-600' : 'bg-gray-500'}`}
                >
                    1
                </button>
                <button
                    onClick={() => toggleSection(2)}
                    className={`px-4 py-2 text-sm font-bold text-white rounded-full ${currentStep === 2 ? 'bg-blue-600' : 'bg-gray-500'}`}
                >
                    2
                </button>
                <button
                    onClick={() => toggleSection(3)}
                    className={`px-4 py-2 text-sm font-bold text-white rounded-full ${currentStep === 3 ? 'bg-blue-600' : 'bg-gray-500'}`}
                >
                    3
                </button>
        </div>


            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <FaCar className="text-4xl text-blue-600" />
                    <h2 className="text-3xl font-bold text-gray-800">{bookDetail.category}</h2>
                </div>
                <div className="flex items-center space-x-2">
                    <span className={`px-4 py-1 text-sm font-medium text-white rounded-full ${bookDetail.status === "cancelled" ? 'bg-red-500' : 'bg-green-500'}`}>
                        {bookDetail.status}
                    </span>
                </div>
            </div>

            {/* Step-based content */}
            {currentStep === 1 && (
         <div className="bg-gray-50 p-4 border border-gray-300 rounded-lg shadow-sm">
            <div className='flex items-center justify-between' >
              <h3 className="text-xl font-semibold mb-4">Booking Details</h3>
               <FaEdit/>
            </div>
      
         <p><strong>Trip Type:</strong> {bookDetail.tripType}</p>
        {bookDetail.tripType==="One-Way Trip" && <p><strong>From:</strong> {bookDetail?.fromLocation}</p> }
         {bookDetail.tripType==="One-Way Trip" && <p><strong>To:</strong> {bookDetail?.toLocation}</p>  }
         {bookDetail.tripType==="Local Trip" && <p><strong>City Name:</strong > {bookDetail?.cityName}</p>}
         <p><strong>Pickup Address:</strong> {bookDetail?.pickupAddress}</p>
         <p><strong>Drop Address:</strong> {bookDetail?.dropAddress}</p>
         <p><strong>Pickup Date:</strong> {dayjs(bookDetail?.pickupDate).format('DD-MM-YYYY')}</p>
         <p><strong>Pickup Time:</strong> {bookDetail?.pickupTime}</p>
         <p><strong>Booking Date:</strong> {dayjs(bookDetail?.bookingDate).format('DD-MM-YYYY')}</p>
         <p><strong>Booking Time:</strong> {bookDetail?.bookingTime}</p>
         <p><strong>Booking ID:</strong> {bookDetail?.bookingId}</p>
         </div>
            )}

            {currentStep === 3 && (
                <div>
                <div className="bg-gray-50 p-4 border border-gray-300 rounded-lg shadow-sm ">
                    <div className='flex items-center justify-between'>
                       <h3 className="text-xl font-semibold mb-4">Pricing Details</h3>
                       <button onClick={()=>downloadInvoice(bookDetail._id)}><FaDownload/></button>
                    </div>
         
                <p><strong>Category:</strong> {bookDetail?.category}</p>
                <p><strong>Actual Price:</strong> ₹{bookDetail?.actualPrice}</p>
                <p><strong>Discount:</strong> ₹{bookDetail?.discountValue}</p>
                <p><strong>Total Price:</strong> ₹{bookDetail?.totalPrice}</p>
                <p><strong>Extra KM:</strong> {bookDetail?.extraKm}</p>
                <p><strong>Extra Price:</strong> ₹{bookDetail?.extraPrice}</p>
                <p><strong>User Email:</strong> {bookDetail?.userId?.email}</p>
                <p><strong>User Phone Number:</strong> {bookDetail?.userId?.phoneNumber}</p>
                <p><strong>Customer Name:</strong> {bookDetail?.userId?.name}</p>
            </div>
             {/* Extra Rates Input */}
             {!isBookingCancelled && (
                <div className="mb-6 bg-gray-50 p-4 border border-gray-300 rounded-lg shadow-sm">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Extra Kilometer:</label>
                    <input
                        type="number"
                        className="p-3 border border-gray-300 rounded w-full mb-4"
                        placeholder="Enter extra Kilometer"
                        value={extraRates}
                        onChange={(e) => setExtraRates(Number(e.target.value))}
                    />
                    {isBookingComplete && (
                        <button
                            className={`w-full px-4 py-2 text-sm font-semibold text-white ${isUpdatingRates ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} rounded-md shadow`}
                            onClick={handleRate}
                            disabled={isUpdatingRates}
                        >
                            {isUpdatingRates ? 'Updating...' : 'Update Kilometer'}
                        </button>
                    )}
                </div>
                 


            )}
              {!isBookingCancelled && (
                <div className="mb-6 bg-gray-50 p-4 border border-gray-300 rounded-lg shadow-sm">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Extra Hours:</label>
                    <input
                        type="number"
                        className="p-3 border border-gray-300 rounded w-full mb-4"
                        placeholder="Enter extra Kilometer"
                        value={extraHour}
                        onChange={(e) => setExtraHour(Number(e.target.value))}
                    />
                    {isBookingComplete && (
                        <button
                            className={`w-full px-4 py-2 text-sm font-semibold text-white ${isUpdatingRates ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} rounded-md shadow`}
                            onClick={handleRate}
                            disabled={isUpdatingRates}
                        >
                            {isUpdatingRates ? 'Updating...' : 'Update Kilometer'}
                        </button>
                    )}
                </div>
            


            )}
              {!isBookingCancelled && (
                <div className="mb-6 bg-gray-50 p-4 border border-gray-300 rounded-lg shadow-sm">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Extra Description:</label>
                    <input
                        type="text"
                        className="p-3 border border-gray-300 rounded w-full mb-4"
                        placeholder="Enter Descirptions"
                        value={description}
                        onChange={(e) =>setDescription((e.target.value))}
                    />
                    {isBookingComplete && (
                        <button
                            className={`w-full px-4 py-2 text-sm font-semibold text-white ${isUpdatingRates ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} rounded-md shadow`}
                            onClick={handleRate}
                            disabled={isUpdatingRates}
                        >
                            {isUpdatingRates ? 'Updating...' : 'Update Kilometer'}
                        </button>
                    )}
                </div>
            


            )}
             <div className="flex justify-end space-x-4">
                    {!isBookingCancelled && !isBookingComplete && (
                        <button
                            className={`px-4 py-2 text-sm font-semibold text-white ${isCompletingBooking ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} rounded-md shadow`}
                            onClick={handleCompleteBooking}
                            disabled={isCompletingBooking}
                        >
                            {isCompletingBooking ? 'Completing...' : 'Complete Booking'}
                        </button>
                    )}
                    {!isBookingCancelled && !isBookingComplete && (
                        <button
                            className={`px-4 py-2 text-sm font-semibold text-white ${isCancellingBooking ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'} rounded-md shadow`}
                            onClick={handleCancelBooking}
                            disabled={isCancellingBooking}
                        >
                            {isCancellingBooking ? 'Cancelling...' : 'Cancel Booking'}
                        </button>
                    )}
            </div>
            </div>
            )}

            {currentStep === 2 && (
             <div className="bg-gray-50 p-4 border border-gray-300 rounded-lg shadow-sm mb-6">
             <h3 className="text-xl font-semibold mb-4">Driver Details</h3>
             {bookDetail?.status==="confirmed" &&
             <button
                 className="px-4 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-md shadow mb-4 flex items-center"
                 onClick={() => setShowAddDriver(true)}
             >
                 <FaPlus className="mr-2" /> Add Driver
             </button>
         }
             {bookDetail.driverDetails?.length > 0 ? (
                 <table className="w-full border-collapse border border-gray-300">
                     <thead>
                         <tr>
                             <th className="border border-gray-300 p-2 text-left">Name</th>
                             <th className="border border-gray-300 p-2 text-left">Email</th>
                             <th className="border border-gray-300 p-2 text-left">Phone Number</th>
                             <th className="border border-gray-300 p-2 text-left">Car Number</th>
                             <th className="border border-gray-300 p-2 text-left">Active</th>
                             <th className="border border-gray-300 p-2 text-left">Actions</th>
                         </tr>
                     </thead>
                     <tbody>
                         {bookDetail.driverDetails.map((driver) => (
                             <tr key={driver._id}>
                                 <td className="border border-gray-300 p-2">{driver.name}</td>
                                 <td className="border border-gray-300 p-2">{driver.email}</td>
                                 <td className="border border-gray-300 p-2">{driver.phoneNumber}</td>
                                 <td className="border border-gray-300 p-2">{driver.carNumber}</td>
                                 <td className="border border-gray-300 p-2">{driver.isActive?"Active":"Not Active"}</td>
                                 {bookDetail?.status==="confirmed" ?
                                 <td className="border border-gray-300 p-2 flex space-x-2">
                                     <button
                                         className="text-blue-600 hover:text-blue-800"
                                         onClick={() => {
                                             setEditDriver(driver);
                                             setDriverDetails({
                                                 name: driver.name,
                                                 email: driver.email,
                                                 phoneNumber: driver.phoneNumber,
                                                 carNumber: driver.carNumber,
                                             });
                                             setShowAddDriver(true);
                                         }}
                                     >
                                         <FaEdit />
                                     </button>
                                     <button
                                         className="text-red-600 hover:text-red-800"
                                         onClick={() => handleRemoveDriverDetails(driver._id)}
                                     >
                                         <FaTrash />
                                     </button>
                                 </td>
                                 :<p>No Action</p> }
                             </tr>
                         ))}
                     </tbody>
                 </table>
             ) : (
                 <p>No driver details available.</p>
             )}
         </div>
            )}

             {showAddDriver && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                            <h2 className="text-2xl font-bold mb-4">{editDriver ? 'Edit Driver' : 'Add Driver'}</h2>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    editDriver ? handleUpdateDriverDetails() : handleAddDriverDetails();
                                }}
                            >
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                    <input
                                        type="text"
                                        className="p-3 border border-gray-300 rounded w-full"
                                        value={driverDetails.name}
                                        onChange={(e) => setDriverDetails({ ...driverDetails, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        className="p-3 border border-gray-300 rounded w-full"
                                        value={driverDetails.email}
                                        onChange={(e) => setDriverDetails({ ...driverDetails, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="p-3 border border-gray-300 rounded w-full"
                                        value={driverDetails.phoneNumber}
                                        onChange={(e) => setDriverDetails({ ...driverDetails, phoneNumber: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Car Number</label>
                                    <input
                                        type="text"
                                        className="p-3 border border-gray-300 rounded w-full"
                                        value={driverDetails.carNumber}
                                        onChange={(e) => setDriverDetails({ ...driverDetails, carNumber: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="flex justify-end">
                                <button
                            type="submit"
                            disabled={isloading}
                            className={` px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow ${isloading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'} transition duration-300 flex items-center justify-center`}
                        >
                            {isloading ? (
                                <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 8 8v-4a4 4 0 1 0-4-4V4a8 8 0 0 1-4 8z"></path>
                                </svg>
                            ) : ' Add or Update'}
                        </button>
                                    {/* <button
                                        type="submit"
                                        className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow"
                                    >
                                        {editDriver ? 'Update Driver' : 'Add Driver'}
                                    </button> */}
                                    <button
                                        type="button"
                                        className="ml-4 px-4 py-2 text-sm font-semibold text-white bg-gray-600 hover:bg-gray-700 rounded-md shadow"
                                        onClick={() => setShowAddDriver(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
             )}
           

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-2">
                {currentStep > 1 && <button onClick={prevStep} className="px-4 py-2 bg-[#b9c1d0] rounded">Previous</button>}
                {currentStep < 3 && <button onClick={nextStep} className="px-4 py-2 bg-blue-600 text-white rounded">Next</button>}
            </div>
        </div>
        </HomeLayout>
    );
};

export default CarBookDetails;
