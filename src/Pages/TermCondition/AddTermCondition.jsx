import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTermandCondition, allTermandCondition } from '../../Redux/Slices/cityRateSlice';
import axios from 'axios';
import HomeLayout from '../../Layouts/HomeLayouts';

const AddTermCondition = () => {
  const [tripType, setTripType] = useState('');
  const [tC, setTC] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const data={
        tripType:tripType,
        tC:tC
    }

    console.log(data);

    const response=await dispatch(addTermandCondition({data}))

    setLoading(false)
    if(response?.payload){
      setTripType('')
      setTC('')
    }
  };

  return (
    <HomeLayout>
    <div className="container mx-auto p-6">
        <div className=''>
            <h2 className="text-2xl font-semibold text-center mb-6">Add Term and Condition</h2>
       
        </div>
  
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 space-y-4">
        <div>
          <label htmlFor="tripType" className="block text-gray-700 font-medium mb-2">
            Trip Type
          </label>
          <select
            id="tripType"
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white"
            required
          >
            <option value="" disabled>Select Trip Type</option>
            <option value="local">Local</option>
            <option value="airpot">Airport</option>
            <option value="round">Round</option>
            <option value="oneway">One Way</option>
          </select>
        </div>

        <div>
          <label htmlFor="tC" className="block text-gray-700 font-medium mb-2">
            Term and Condition
          </label>
          <textarea
            id="tC"
            value={tC}
            onChange={(e) => setTC(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-3 rounded-full border-t-2 border-b-2 border-white inline-block"
                viewBox="0 0 24 24"
              ></svg>
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </form>
    </div>
    </HomeLayout>
  );
};

export default AddTermCondition;
