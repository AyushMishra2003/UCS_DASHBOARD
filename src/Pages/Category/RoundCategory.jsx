import React, { useEffect, useState } from 'react';
import HomeLayout from '../../Layouts/HomeLayouts';
import { useDispatch, useSelector } from 'react-redux';
import { addLocalCity, addLocalRate, deleteLocalCity, deleteLocalRate, fetchLocalRates, updateLocalRate } from '../../Redux/Slices/LocalSlice';
import { useNavigate } from 'react-router-dom';
import { addRoundRate, deleteRoundCity, deleteRoundRate, fetchRoundRates, updateRoundRate } from '../../Redux/Slices/AirpotSlice';
import { getCategory } from '../../Redux/Slices/CategorySlice';
import RoundCategoryModal from './RoundCategoryModel';

const RoundCategory = () => {
  const dispatch = useDispatch();
  const { categoryList } = useSelector((state) => state.category);
  const { roundRates, loading, error } = useSelector((state) => state.airpot);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [newCityName, setNewCityName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    await dispatch(getCategory("round"));
  };

  useEffect(() => {
    fetchData();
    dispatch(fetchRoundRates());
  }, [dispatch]);

  const handleAddCity = async () => {
    const data = { cityName: newCityName };
    const response = await dispatch(addRoundRate(data));
    if (response?.payload) {
      setNewCityName("");
      dispatch(fetchRoundRates());
    }
  };

  const handleAddCategory = async (category) => {
    const data = { cityName: selectedCity, ...category };
    console.log(data);
    
    const response = await dispatch(addRoundRate(data));
    if (response?.payload) {
      dispatch(fetchRoundRates());
    }
  };

  const handleEditCategory = (category) => {
    setIsEdit(true);
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleSaveCategory = async (updatedCategory) => {
    const response = await dispatch(updateRoundRate({ ...updatedCategory, cityName: selectedCity }));
    if (response?.payload) {
      dispatch(fetchRoundRates());
    }
    setIsEdit(false);
    setEditingCategory(null);
    setIsModalOpen(false);
  };

  const handleDeleteCategory = async (cityName, category) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (!confirmDelete) return;
    const data = { cityName, category };
    console.log(data);
    
    const response = await dispatch(deleteRoundRate(data));
    if (response?.payload) {
      dispatch(fetchRoundRates());
    }
  };

  const handleDeleteCity = async (cityName) => {

    console.log(cityName);
    
    const confirmDelete = window.confirm("Are you sure you want to delete City?");
    if (!confirmDelete) return;
    const response = await dispatch(deleteRoundCity(cityName));
    if (response?.payload) {
      dispatch(fetchRoundRates());
    }
  };

  const cityDetails = roundRates.find((city) => city.cityName === selectedCity);

  return (
    <HomeLayout>
      <div className="p-4">
        <div className='flex justify-between'>
          <h1 className="text-xl font-bold mb-4">Round City Rates</h1>
          <button className='px-8 py-2 bg-[#3B82F6] text-[#fff] rounded-md' onClick={() => navigate("/localcategory")}>View Category</button>
        </div>

        <div className="flex items-center mb-4 space-x-4 pt-[2rem]">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="border p-2 flex-1"
          >
            <option value="">Select a City</option>
            {roundRates.map((city) => (
              <option key={city._id} value={city.cityName}>
                {city.cityName}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={newCityName}
            onChange={(e) => setNewCityName(e.target.value)}
            placeholder="New City Name"
            className="border p-2 flex-1"
          />
          <button
            onClick={handleAddCity}
            className="bg-green-500 text-white p-2 rounded"
          >
            Add New City
          </button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        {selectedCity && cityDetails && (
          <div>
            <div className="flex items-center text-2xl mb-4 space-x-4">
              <p className='text-black font-semibold'>{cityDetails?.cityName}</p>
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setEditingCategory(null);
                }}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Add Category
              </button>
            </div>

            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Per Km</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Extra Km</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cityDetails.rates.map((rate) => (
                  <tr key={rate._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{rate?.category?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{rate.perKm}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{rate.extraKm}</td>
                    <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                      <button
                        onClick={() => handleEditCategory(rate)}
                        className="bg-yellow-500 text-white p-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(selectedCity, rate.category.name)}
                        className="bg-red-500 text-white p-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={() => handleDeleteCity(selectedCity)}
              className="bg-red-500 text-white p-2 rounded mt-4"
            >
              Delete City
            </button>
          </div>
        )}

<RoundCategoryModal
  isOpen={isModalOpen}
  onClose={() => {
    setIsModalOpen(false);
    setIsEdit(false);
    setEditingCategory(null);
  }}
  onAddCategory={(category) => {
    if (isEdit) {
      handleSaveCategory({ ...editingCategory, ...category });
    } else {
      handleAddCategory(category);
    }
  }}
  selectedCity={selectedCity}
  categoryData={editingCategory} // Pass the editingCategory data
  editingCategory={editingCategory}
/>

      </div>
    </HomeLayout>
  );
};

export default RoundCategory;
