import React, { useState } from 'react';
import axios from 'axios';
import HomeLayout from '../../../Layouts/HomeLayouts';
import { useDispatch, useSelector } from 'react-redux';
import { specificCityRate } from '../../../Redux/Slices/cityRateSlice';
import { duration } from '@mui/material';

const BookingForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedRate, setSelectedRate] = useState(null);
    const dispatch=useDispatch()
    const [locations, setLocations] = useState({
        from: ["Dehradun", "Balliya", "Varanasi", "Delhi"],
        to: ["Delhi", "Varanasi", "Dehradun", "Balliya"]
    });

    const { allrates}=useSelector((state)=>state.cityRates)

    console.log("rate is ",allrates);
    

    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        fromLocation: '',
        toLocation: '',
        tripType: 'One-Way Trip',
        category: '',
        pickupDate: '',
        pickupHour: '01',
        pickupMinute: '00',
        pickupTimeAmPm: 'AM',
        name: '',
        email: '',
        phoneNumber: '',
        pickupAddress: '',
        dropAddress: '',
        paymentMode: '10',
        distance:0
    });
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleRateSelection = (category, rateType) => {
        setSelectedRate({ category, rateType });
        setFormData(prevFormData => ({
            ...prevFormData,
            category,
            duration: rateType
        }));
    };

    // Fetch categories based on trip type
    const fetchCategories = async () => {
        try {
            // const response = await axios.get(`http://localhost:5000/api/v1/chart/${formData.tripType}`, {
            //     params: {
            //         fromLocation: formData.fromLocation,
            //         toLocation: formData.toLocation
            //     }
            // });

            console.log(formData);
            let data
            let name
            
            if(formData.tripType==="One-Way Trip"){
             data={
                "fromCity":formData.fromLocation,
                "toCity":formData.toLocation
            }
            name="oneway"
            }
            if(formData.tripType==="Local"){
                data={
                    "cityName":formData.cityName
                }
                name="local"

            }
            console.log(data);
            

            const response=await dispatch(specificCityRate({name,data}))

            console.log(response);
            
            if(response?.payload){
                console.log(response?.payload?.data);
                
                 setCategories(response?.payload?.data);
                 console.log(categories);
                 
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };


    const handleSelectCategory=(cat)=>{
        setFormData(prevFormData => ({
            ...prevFormData,
            category: cat.category
        }));
        setSelectedRate(null);
        // formData.distance=cat.
        
    }

    // Proceed to the next step
    const handleNext = async () => {
        if (currentStep === 1) {
            await fetchCategories();
            setCurrentStep(2);
        } else if (currentStep === 2) {
            setCurrentStep(3);
        } else {
            handleSubmit();
        }
    };

    // Go back to previous step
    const handleBack = () => {
        setCurrentStep(prevStep => prevStep - 1);
    };

    // Submit booking form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedPickupTime = formatPickupTime(formData.pickupHour, formData.pickupMinute, formData.pickupTimeAmPm);

        setLoading(true);

        console.log(formData);
        

        try {
            if(formData.tripType==="One-Way Trip"){
                console.log("kya hua re aaya ki nahi");
                
            await axios.post('http://localhost:5000/api/v1/oneway/booking', { 
                ...formData, 
                pickupTime: formattedPickupTime
            });
        } 
        if(formData.tripType==="Local"){
            await axios.post('http://localhost:5000/api/v1/oneway/booking/trip/local', { 
                ...formData, 
                pickupTime: formattedPickupTime
            }); 
        }

            setLoading(false);
            setShowPopup(true);
            setFormData({
                fromLocation: '',
                toLocation: '',
                tripType: 'One-Way Trip',
                category: '',
                pickupDate: '',
                pickupHour: '01',
                pickupMinute: '00',
                pickupTimeAmPm: 'AM',
                name: '',
                email: '',
                phoneNumber: '',
                pickupAddress: '',
                dropAddress: '',
                paymentMode: '10'
            });
            setCurrentStep(1); // Reset to first step
        } catch (error) {
            setLoading(false);
            console.error("Error submitting booking:", error);
        }
    };

    // Format pickup time
    const formatPickupTime = (hour, minute, amPm) => {
        const formattedHour = hour.padStart(2, '0');
        const formattedMinute = minute.padStart(2, '0');
        return `${formattedHour}:${formattedMinute} ${amPm}`;
    };
   
   console.log(categories);

   
   

    return (
        <HomeLayout>
            <div className="p-4 sm:p-8 bg-[#e0d4d4] min-h-screen flex items-center justify-center">
                <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-indigo-600 p-4 text-white text-center">
                        <h2 className="text-2xl font-semibold">Book Your Trip</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="p-4">
                        {currentStep === 1 && (
                            <>
                                {/* Trip Type and Location */}
                                <div className="flex flex-col mb-4">
                                    <label className="text-gray-700 font-semibold mb-1">Trip Type</label>
                                    <select
                                        name="tripType"
                                        value={formData.tripType}
                                        onChange={handleChange}
                                        className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                                        required
                                    >
                                        <option value="One-Way Trip">One-Way Trip</option>
                                        <option value="Round Trip">Round Trip</option>
                                        <option value="Local">Local</option>
                                        <option value="Airport Trip">Airport Trip</option>
                                    </select>
                                </div>

                                {formData.tripType !== 'Local' && (
                                    <>
                                        <div className="flex flex-col mb-4">
                                            <label className="text-gray-700 font-semibold mb-1">From Location</label>
                                            <select
                                                name="fromLocation"
                                                value={formData.fromLocation}
                                                onChange={handleChange}
                                                className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                                                required
                                            >
                                                <option value="">Select From Location</option>
                                                {locations.from.map((loc) => (
                                                    <option key={loc} value={loc}>
                                                        {loc}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="flex flex-col mb-4">
                                            <label className="text-gray-700 font-semibold mb-1">To Location</label>
                                            <select
                                                name="toLocation"
                                                value={formData.toLocation}
                                                onChange={handleChange}
                                                className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                                                required
                                            >
                                                <option value="">Select To Location</option>
                                                {locations.to.map((loc) => (
                                                    <option key={loc} value={loc}>
                                                        {loc}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </>
                                )}

                                {formData.tripType === 'Local' && (
                                    <div className="flex flex-col mb-4">
                                        <label className="text-gray-700 font-semibold mb-1">City Name</label>
                                        <input
                                            type="text"
                                            name="cityName"
                                            value={formData.cityName || ''}
                                            onChange={handleChange}
                                            className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                                            required
                                        />
                                    </div>
                                )}

                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-indigo-700 transition duration-300"
                                >
                                    Next
                                </button>
                            </>
                        )}

{currentStep === 2 && (
    <>
        {/* Categories List */}
        <div className="mb-4">
            <label className="text-gray-700 font-semibold mb-1">Select Category</label>
            {categories.length > 0 ? (
                <div className="space-y-4">
                    {categories.map((cat) => (
                        <div 
                            key={cat.category} 
                            className={`flex flex-col border p-2 rounded-lg shadow-sm mb-4 transition duration-300 ${
                                formData.category === cat.category ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'
                            }`}
                        >
                            <div>
                                <p className="font-semibold">{cat.category}</p>
                                {formData.tripType === 'Local' ? (
                                    <div className="space-y-2 mt-2">
                                        <button
                                            type="button"
                                            onClick={() => handleRateSelection(cat.category, '80Km/8Hours')}
                                            className={`block w-full px-4 py-2 mb-2 rounded-lg shadow-sm transition duration-300 ${
                                                selectedRate?.category === cat.category && selectedRate.rateType === '80Km/8Hours' 
                                                    ? 'bg-green-500 text-white scale-105' 
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                        >
                                            Rate for 80Km/8Hours: {cat.rate.rateFor80Km8Hours}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleRateSelection(cat.category, '100Km/10Hours')}
                                            className={`block w-full px-4 py-2 rounded-lg shadow-sm transition duration-300 ${
                                                selectedRate?.category === cat.category && selectedRate.rateType === '100Km/10Hours' 
                                                    ? 'bg-green-500 text-white scale-105' 
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                        >
                                            Rate for 100Km/10Hours: {cat.rate.rateFor100Km10Hours}
                                        </button>
                                    </div>
                                ) : (
                                    <p className="text-gray-600">Rate: {cat.rate}</p>
                                )}
                            </div>

                            {/* Category Selection Button */}
                           
                            <button
                                type="button"
                                onClick={() => handleSelectCategory(cat)}
                                className={`mt-2 px-4 py-2 rounded-lg shadow-sm transition duration-300 ${
                                    formData.category === cat.category 
                                        ? 'bg-blue-500 text-white'  // Background color when selected
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                {formData.category === cat.category ? 'Category Selected' : 'Select Category'}
                            </button>
                            {/* <p>{cat.category}</p>
                            <p>{formData.category}</p> */}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No categories available</p>
            )}
        </div>

        <button
            type="button"
            onClick={handleBack}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-700 transition duration-300 mr-2"
        >
            Back
        </button>

        <button
            type="button"
            onClick={handleNext}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-indigo-700 transition duration-300"
        >
            Next
        </button>
    </>
)}






                        {currentStep === 3 && (
                            <>
                                {/* Customer Details */}
                                <div className="flex flex-col mb-4">
                                    <label className="text-gray-700 font-semibold mb-1">Pickup Date</label>
                                    <input
                                        type="date"
                                        name="pickupDate"
                                        value={formData.pickupDate}
                                        onChange={handleChange}
                                        className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                                        required
                                    />
                                </div>

                                <div className="flex mb-4">
                                    <div className="flex flex-col mr-2">
                                        <label className="text-gray-700 font-semibold mb-1">Pickup Hour</label>
                                        <input
                                            type="number"
                                            name="pickupHour"
                                            min="1"
                                            max="12"
                                            value={formData.pickupHour}
                                            onChange={handleChange}
                                            className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col mr-2">
                                        <label className="text-gray-700 font-semibold mb-1">Pickup Minute</label>
                                        <input
                                            type="number"
                                            name="pickupMinute"
                                            min="0"
                                            max="59"
                                            value={formData.pickupMinute}
                                            onChange={handleChange}
                                            className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="text-gray-700 font-semibold mb-1">AM/PM</label>
                                        <select
                                            name="pickupTimeAmPm"
                                            value={formData.pickupTimeAmPm}
                                            onChange={handleChange}
                                            className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                                            required
                                        >
                                            <option value="AM">AM</option>
                                            <option value="PM">PM</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex flex-col mb-4">
                                    <label className="text-gray-700 font-semibold mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col mb-4">
                                    <label className="text-gray-700 font-semibold mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col mb-4">
                                    <label className="text-gray-700 font-semibold mb-1">Phone Number</label>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col mb-4">
                                    <label className="text-gray-700 font-semibold mb-1">Pickup Address</label>
                                    <input
                                        type="text"
                                        name="pickupAddress"
                                        value={formData.pickupAddress}
                                        onChange={handleChange}
                                        className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                                        required
                                    />
                                </div>

                                {formData.tripType !== 'Airpot' && (
                                    <div className="flex flex-col mb-4">
                                        <label className="text-gray-700 font-semibold mb-1">Drop Address</label>
                                        <input
                                            type="text"
                                            name="dropAddress"
                                            value={formData.dropAddress}
                                            onChange={handleChange}
                                            className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                                            required
                                        />
                                    </div>
                                )}

                                <div className="flex flex-col mb-4">
                                    <label className="text-gray-700 font-semibold mb-1">Payment Mode</label>
                                    <select
                                        name="paymentMode"
                                        value={formData.paymentMode}
                                        onChange={handleChange}
                                        className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                                        required
                                    >
                                        <option value="10">10% Payment</option>
                                        <option value="100">100% Payment</option>
                                    </select>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-700 transition duration-300 mr-2"
                                >
                                    Back
                                </button>

                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-indigo-700 transition duration-300"
                                >
                                    Submit
                                </button>
                            </>
                        )}
                    </form>
                </div>
            </div>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold">Booking Confirmed!</h3>
                        <p>Your booking has been successfully confirmed.</p>
                        <button
                            onClick={() => setShowPopup(false)}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-indigo-700 transition duration-300 mt-2"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </HomeLayout>
    );
};

export default BookingForm;
