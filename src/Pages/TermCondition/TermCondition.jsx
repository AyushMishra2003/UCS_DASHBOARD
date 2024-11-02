import React, { useEffect, useState } from 'react';
import HomeLayout from '../../Layouts/HomeLayouts';
import { useDispatch, useSelector } from 'react-redux';
import { allTermandCondition, deleteTermandCondition } from '../../Redux/Slices/cityRateSlice';
import { FaEye } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

const TermCondition = () => {
  const { termandCondition, loading, error } = useSelector((state) => state.cityRates);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedTripType, setSelectedTripType] = useState('local'); // Default to 'local'

  const dispatch = useDispatch();
  const navigate=useNavigate()
    

  // Fetch the terms and conditions data from the API
  const fetchData = async () => {
    await dispatch(allTermandCondition());
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  // Filter data based on selected trip type dynamically
  useEffect(() => {
    if (termandCondition) {
      const matchedTripType = termandCondition.find(
        (item) => item.tripType === selectedTripType
      );
      setFilteredData(matchedTripType ? matchedTripType.tC : []);
    }
  }, [termandCondition, selectedTripType]);

  // Handle trip type change
  const handleTripTypeChange = (tripType) => {
    setSelectedTripType(tripType);
  };

  // Handler for "View" action
  const handleView = (item) => {  
    navigate('/edit/term/condition', { state: { item,selectedTripType}});
     
  };

  // Handler for "Delete" action
  const handleDelete = async (item) => {
    const confirm=window.confirm("Are you sure,you want to delete")
    if(confirm){
    const data = {
      tripType: selectedTripType,
      tcId: item._id,
    };

    const response = await dispatch(deleteTermandCondition({data}));
    if (response?.payload?.success) {
      // Refresh data after successful deletion
      fetchData();
    }
}
  };

  return (
    <HomeLayout>
      <div className="container mx-auto p-4">
        <div className='flex items-center justify-center gap-4 pb-6'>
          <h2 className="text-2xl font-semibold text-center">Terms and Conditions</h2>
          <Link to={"/add/term/condition"}>
            <button className='w-6 h-6 text-white rounded-full bg-blue-500'>+</button>
          </Link>
        </div>

        {/* Trip Type Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {['local', 'airpot', 'round', 'oneway'].map((type) => (
            <button
              key={type}
              onClick={() => handleTripTypeChange(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium
                ${selectedTripType === type ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}
              `}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        {/* Table Display */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-gray-700 font-medium">ID</th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-gray-700 font-medium">Description</th>
                <th className="px-6 py-3 border-b border-gray-200 text-center text-gray-700 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-6 py-4 border-b border-gray-200">{index + 1}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{item?.text}</td>
                  <td className="px-6 py-4 border-b border-gray-200 text-center flex items-center justify-center gap-4">
                    <button
                      onClick={() => handleView(item)}
                      className="px-3 py-1 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </HomeLayout>
  );
};

export default TermCondition;
