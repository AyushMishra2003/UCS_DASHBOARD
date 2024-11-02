import React, { useState } from 'react';
import HomeLayout from '../../Layouts/HomeLayouts';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editTermandCondition } from '../../Redux/Slices/cityRateSlice';
import { data } from 'autoprefixer';


const EditTermCondition = () => {
    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Destructure the item and selectedTripType from state
    const { item, selectedTripType } = state;

    // Set up local state for the form input
    const [termConditionText, setTermConditionText] = useState(item.text);
    const [loading, setLoading] = useState(false); // New loading state

    // Handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        // Prepare the data to be updated
        const updatedData = {
            tripType: selectedTripType,
            tcId: item._id,
            tC: termConditionText
        };
        console.log(updatedData);
        

        const response=await dispatch(editTermandCondition({data:updatedData}))
        setLoading(false)

        if(response?.payload){
            navigate("/view/term/condition")
        }       
    };

    return (
        <HomeLayout>
            <div className="container mx-auto p-6 max-w-lg">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Edit Term and Condition</h1>
                
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
                    <div className="mb-6">
                        <label htmlFor="termCondition" className="block text-sm font-medium text-gray-700 mb-2">Term Condition</label>
                        <textarea
                            id="termCondition"
                            value={termConditionText}
                            onChange={(e) => setTermConditionText(e.target.value)}
                            rows="6"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 transition duration-200 ease-in-out p-2"
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className={`w-full py-2 px-4 ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                        disabled={loading} // Disable the button while loading
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0114.73-4.59A6.95 6.95 0 0012 4a6.96 6.96 0 00-6.93 6.08C4.17 10.1 4 10.05 4 10v2c0 .05.17.1.07.92A7 7 0 014 12z"/>
                                </svg>
                                Updating...
                            </div>
                        ) : (
                            'Update Term Condition'
                        )}
                    </button>
                </form>
            </div>
        </HomeLayout>
    );
};

export default EditTermCondition;
