import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRates, addRate, updateRate, deleteRate } from '../../Redux/Slices/cityRateSlice';
import { toast } from 'sonner';
import HomeLayout from '../../Layouts/HomeLayouts';
import { getCategory } from '../../Redux/Slices/CategorySlice';

const CityRateList = () => {
    const dispatch = useDispatch();
    const { rates = [], loading, error } = useSelector(state => state.cityRates);


    
    const { categoryList } = useSelector((state) => state.category);



    const [newRate, setNewRate] = useState({ fromCity: '', toCity: '', rate: '', category: '', extraKm: '' });
    const [editRate, setEditRate] = useState(null);
    const [selectedFromCity, setSelectedFromCity] = useState('');
    const [selectedToCity, setSelectedToCity] = useState('');
    const [isAddLocationModalOpen, setIsAddLocationModalOpen] = useState(false);
    const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
    const [isEditCategoryRateModalOpen, setIsEditCategoryRateModalOpen] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [newLocation, setNewLocation] = useState({ fromCity: '', toCity: '' });
    const [active,setActive]=useState(false)

    const fetchData = async () => {
        await dispatch(getCategory("oneway"));
    };

    useEffect(() => {
        fetchData();
        dispatch(fetchRates());
        setActive(false)
    }, [dispatch,active]);

    const handleAddRate = () => {
        console.log(newRate);
        
        dispatch(addRate(newRate))
            .unwrap()
            .then(() => {
                setNewRate({ fromCity: '', toCity: '', rate: '', category: '', extraInfo: '' });
                toast.success("Rate added successfully!");
                dispatch(fetchRates());
                setIsAddLocationModalOpen(false);
            })
            .catch(() => {
                toast.error("Failed to add rate.");
            });
    };

    const handleAddCategoryRate = () => {
        if (selectedFromCity && selectedToCity) {
            dispatch(addRate({ 
                fromCity: selectedFromCity, 
                toCity: selectedToCity, 
                category: newRate.category, 
                rate: newRate.rate, 
                extraKm: newRate.extraKm // Include the extra info here
            }))
            .unwrap()
            .then(() => {
                setNewRate({ fromCity: '', toCity: '', rate: '', category: '', extra: '' });
                dispatch(fetchRates());
                toast.success("Category and rate added successfully!");
                setIsAddCategoryModalOpen(false);
            })
            .catch(() => {
                toast.error("Failed to add category and rate.");
            });
        } else {
            toast.error("Please select both From City and To City.");
        }
    };

    const handleDeleteRate=async(fromCity,toCity,category)=>{

  

        const response=await dispatch(deleteRate({fromCity,toCity,category}))
        console.log(response);
        dispatch(fetchRates())
        
        
        
    }

    const handleEditCategoryRate = (fromCity, toCity, category, rate,extraKm) => {
        setEditRate({ fromCity, toCity, category, rate ,extraKm});
        setIsEditCategoryRateModalOpen(true); // Open the modal for editing
    };


    // const handleDeleteRate=()=>{
    //     try{
         
    //     }catch(error)
    // }
   
    console.log(rates);
    


    const filteredRates = (rates || [])?.filter(rate =>
        (!selectedFromCity || rate.fromCity === selectedFromCity) &&
        (!selectedToCity || rate.toCity === selectedToCity)
    );

    // Check if a rate is selected
    const isRateSelected = filteredRates.length > 0;

    if (error) return <div className="text-center text-red-600">{error}</div>;
    if (loading) return <div className="text-center text-blue-600">Loading...</div>;

    console.log(filteredRates);
    

    return (
        <HomeLayout>
            <div className="p-6 max-w-5xl mx-auto bg-gray-50 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">City Rate List</h1>
                 <div className='flex items-center justify-between'>
                    <div className="mb-6 flex space-x-4">
                    <select
                        value={selectedFromCity}
                        onChange={(e) => setSelectedFromCity(e.target.value)}
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select From City</option>
                        {[...new Set(rates.map(rate => rate.fromCity))].map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                        ))}
                    </select>
                    <select
                        value={selectedToCity}
                        onChange={(e) => setSelectedToCity(e.target.value)}
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select To City</option>
                        {[...new Set(rates.map(rate => rate.toCity))].map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                        ))}
                    </select>
                    </div>
                    <button
                    onClick={() => setIsAddLocationModalOpen(true)}
                    className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200 mb-6"
                >
                    Add New Location
                </button>
                 </div>
                {/* Filters */}
              

                {/* Add New Location Button */}
               

                {/* Add Category Rate Button (conditionally shown) */}
                {isRateSelected && (
                    <button
                        onClick={() => setIsAddCategoryModalOpen(true)}
                        className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200 mb-6"
                    >
                        Add Category Rate
                    </button>
                )}

                {/* Rate Chart */}
                <div>
                    {filteredRates.length > 0 ? (
                        filteredRates.map(rate => (
                            <div key={`${rate.fromCity}-${rate.toCity}`} className="mb-6">
                                <h3 className="text-xl font-bold mb-2 text-gray-700">
                                    {rate.fromCity} to {rate.toCity}
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
                                        <thead className="bg-gray-100 text-gray-600">
                                            <tr>
                                                <th className="border p-3 text-left">Category</th>
                                                <th className="border p-3 text-left">Rate</th>
                                                <th className="border p-3 text-left">Extra</th>
                                                <th className="border p-3 text-left">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(rate.rates || []).map(categoryRate => (
                                                <tr
                                                    key={categoryRate.category}
                                                    className={`hover:bg-gray-50 ${editRate && editRate.category === categoryRate.category ? 'bg-blue-50' : ''}`}
                                                >
                                                    <td className="border p-3">{categoryRate.category.name}</td>
                                                    <td className="border p-3">{categoryRate.rate}</td>
                                                    <td className="border p-3">{categoryRate.extraKm
                                                    }</td>
                                                    <td className="border p-3 flex space-x-2">
                                                        <button
                                                         onClick={() => handleEditCategoryRate(rate.fromCity, rate.toCity, categoryRate.category.name, categoryRate.rate,categoryRate.extraKm)}
                                                            className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 transition duration-200"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteRate(rate.fromCity, rate.toCity, categoryRate.category._id)}
                                                            className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition duration-200"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-600">No rates available</div>
                    )}
                </div>

                {/* Add Location Modal */}
                {isAddLocationModalOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Location</h2>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">From City</label>
                                <input
                                    type="text"
                                    value={newRate.fromCity}
                                    onChange={(e) => setNewRate({ ...newRate, fromCity: e.target.value })}
                                    className="border border-gray-300 p-3 rounded-md w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">To City</label>
                                <input
                                    type="text"
                                    value={newRate.toCity}
                                    onChange={(e) => setNewRate({ ...newRate, toCity: e.target.value })}
                                    className="border border-gray-300 p-3 rounded-md w-full"
                                />
                            </div>
                            <button
                                onClick={handleAddRate}
                                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                            >
                                Add Rate
                            </button>
                            <button
                                onClick={() => setIsAddLocationModalOpen(false)}
                                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200 ml-2"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {/* Add Category Rate Modal */}
                {isAddCategoryModalOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Category Rate</h2>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Select Category</label>
                                <select
                                    value={newRate.category}
                                    onChange={(e) => setNewRate({ ...newRate, category: e.target.value })}
                                    className="border border-gray-300 p-3 rounded-md w-full"
                                >
                                    <option value="">Select Category</option>
                                    {categoryList.map((category, index) => (
                                        <option key={index} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Rate</label>
                                <input
                                    type="number"
                                    value={newRate.rate}
                                    onChange={(e) => setNewRate({ ...newRate, rate: e.target.value })}
                                    className="border border-gray-300 p-3 rounded-md w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Extra Km 123</label>
                                <input
                                    type="number"
                                    value={newRate.extraKm}
                                    onChange={(e) => setNewRate({ ...newRate, extraKm: e.target.value })}
                                    className="border border-gray-300 p-3 rounded-md w-full"
                                />
                            </div>
                            <button
                                onClick={handleAddCategoryRate}
                                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                            >
                                Add Rate
                            </button>
                            <button
                                onClick={() => setIsAddCategoryModalOpen(false)}
                                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200 ml-2"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}


{isEditCategoryRateModalOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Category Rate 124</h2>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Category</label>
                                <input
                                    type="text"
                                    value={editRate.category}
                                    onChange={(e) => setEditRate({ ...editRate, category: e.target.value })}
                                    className="border border-gray-300 p-3 rounded-md w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Rate</label>
                                <input
                                    type="text"
                                    value={editRate.rate}
                                    onChange={(e) => setEditRate({ ...editRate, rate: e.target.value })}
                                    className="border border-gray-300 p-3 rounded-md w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Extra Km</label>
                                <input
                                    type="text"
                                    value={editRate.extraKm}
                                    onChange={(e) => setEditRate({ ...editRate, extraKm: e.target.value })}
                                    className="border border-gray-300 p-3 rounded-md w-full"
                                />
                            </div>
                            <button
                                onClick={() => {
                                     console.log(editRate);
                                     
                                    const response=dispatch(updateRate(editRate));
                                     setActive(true)
                                     setIsEditCategoryRateModalOpen(false);
                                   
                                        
                                    
                                    
                                    // toast.success("Category rate updated successfully!");
                                   
                                }}
                                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                            >
                                Update Rate
                            </button>
                            <button
                                onClick={() => setIsEditCategoryRateModalOpen(false)}
                                className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 transition duration-200 ml-2"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}


            </div>
        </HomeLayout>
    );
};

export default CityRateList;
