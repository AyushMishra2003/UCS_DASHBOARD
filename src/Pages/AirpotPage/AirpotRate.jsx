import React, { useEffect, useState } from 'react';
import HomeLayout from '../../Layouts/HomeLayouts';
import { useDispatch, useSelector } from 'react-redux';
import { addAirpotRate, deleteAirpotRate, fetchAirpotRates, updateAirpotRate } from '../../Redux/Slices/AirpotSlice';
import { getCategory } from '../../Redux/Slices/CategorySlice';

const AirportRate = () => {
  const dispatch = useDispatch();
  const { loading, error, airpotRates } = useSelector((state) => state.airpot);
  const { categoryList } = useSelector((state) => state.category);

  const [selectedCityId, setSelectedCityId] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [editingRateId, setEditingRateId] = useState(null);
  const [newRate, setNewRate] = useState({
    kilometer: '',
    rate: '',
    extra: '',
  });
  const [newCity, setNewCity] = useState('');

  useEffect(() => {
    dispatch(getCategory("airpot"));
    dispatch(fetchAirpotRates());
  }, [dispatch]);

  const handleSaveRate = async (rateId) => {
    const selectedCity = airpotRates.find(city => city._id === selectedCityId);
    const selectedCategory = categoryList.find(category => category._id === selectedCategoryId);

   console.log(selectedCategory);
   

    const updatedRate = {
      cityName: selectedCity?.cityName,
      categoryId: selectedCategory?._id,
      kilometer: newRate.kilometer,
      rate: newRate.rate,
      extra: newRate.extra,
    };

    console.log(updatedRate);
    

    const response = await dispatch(updateAirpotRate(updatedRate));
    if (response?.payload) {
      resetEditing();
      dispatch(fetchAirpotRates());
      
    }
  };

  const handleEditRate = (rate) => {
    setEditingRateId(rate.kilometer);
    console.log(rate);
    
    setNewRate({
      kilometer: rate.kilometer,
      rate: rate.rate,
      extra: rate.extra,
    });
  };

  const resetEditing = () => {
    setEditingRateId(null);
    setNewRate({ kilometer: '', rate: '', extra: '' });
  };

  const handleDeleteRate = async (rate) => {
    const selectedCity = airpotRates.find(city => city._id === selectedCityId);
    const selectedCategory = categoryList.find(category => category._id === selectedCategoryId);

    const data = {
      cityName: selectedCity.cityName,
      categoryId: selectedCategory._id,
      kilometer: rate.kilometer,
    };

    const response = await dispatch(deleteAirpotRate(data));
    if (response?.payload) {
      dispatch(fetchAirpotRates());
    }
  };

  const handleAddRate = async () => {
    const selectedCity = airpotRates.find(city => city._id === selectedCityId);
    const selectedCategory = categoryList.find(category => category._id === selectedCategoryId);

    const data = {
      ...newRate,
      vehicleId: selectedCategory?._id,
      cityName: selectedCity?.cityName,
      category: selectedCategory?.name,
    };

    const response = await dispatch(addAirpotRate(data));
    if (response?.payload) {
      setNewRate({ kilometer: '', rate: '', extra: '' });
      dispatch(fetchAirpotRates());
    }
  };

  const handleAddCity = async () => {
    if (newCity.trim() !== '') {
      const data = { cityName: newCity };
      const response = await dispatch(addAirpotRate(data));
      if (response?.payload) {
        setNewCity('');
        dispatch(fetchAirpotRates());
      }
    }
  };

  const handleCityChange = (e) => {
    setSelectedCityId(e.target.value);
    setSelectedCategoryId('');
  };

  const handleCategoryChange = (e) => {
    setSelectedCategoryId(e.target.value);
  };

  const selectedCity = airpotRates.find(city => city._id === selectedCityId);
  const selectedRates = selectedCity?.rates.find(category => category._id === selectedCategoryId)?.rates || [];

  return (
    <HomeLayout>
      <div className="p-4">
        <h1 className="text-xl font-bold">Airport Rates for City</h1>

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        <h2 className="text-2xl mb-4">Select City</h2>
        <div className='flex items-center justify-between'>
          <select value={selectedCityId} onChange={handleCityChange} className="border p-2 mb-4 bg-white">
            <option value="">Select a city</option>
            {airpotRates.map(city => (
              <option key={city._id} value={city._id}>
                {city.cityName}
              </option>
            ))}
          </select>

          <div className="flex space-x-4 items-center mb-4">
            <input
              type="text"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              placeholder="Add new city"
              className="border p-2"
            />
            <button onClick={handleAddCity} className="bg-blue-500 text-white p-2 rounded">
              Add City
            </button>
          </div>
        </div>

        {selectedCityId && (
          <>
            <h2 className="text-2xl mb-4">Select Category</h2>
            <select value={selectedCategoryId} onChange={handleCategoryChange} className="border p-2 mb-4 bg-white">
              <option value="">Select a category</option>
              {categoryList.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>

            <h2 className="text-2xl mb-4">Rates for Selected Category</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kilometer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Extra</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedRates.map((rate) => (
                  <tr key={rate._id}>
                    {editingRateId === rate.kilometer ? (
                      <>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={newRate.kilometer}
                            onChange={(e) => setNewRate({ ...newRate, kilometer: e.target.value })}
                            className="border p-1"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={newRate.rate}
                            onChange={(e) => setNewRate({ ...newRate, rate: e.target.value })}
                            className="border p-1"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={newRate.extra}
                            onChange={(e) => setNewRate({ ...newRate, extra: e.target.value })}
                            className="border p-1"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleSaveRate(rate._id)}
                            className="bg-green-500 text-white p-1 rounded"
                          >
                            Save
                          </button>
                          <button onClick={resetEditing} className="bg-gray-500 text-white p-1 rounded ml-2">
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4">{rate.kilometer}</td>
                        <td className="px-6 py-4">{rate.rate}</td>
                        <td className="px-6 py-4">{rate.extra}</td>
                        <td className="px-6 py-4 flex space-x-2">
                          <button
                            onClick={() => handleEditRate(rate)}
                            className="bg-blue-500 text-white p-1 rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteRate(rate)}
                            className="bg-red-500 text-white p-1 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 className="text-2xl mb-4">Add New Rate</h2>
            <div className="flex space-x-4 mb-4">
  <select
    value={newRate.kilometer}
    onChange={(e) => setNewRate({ ...newRate, kilometer: e.target.value })}
    className="border p-2 bg-white"
  >
    <option value="" disabled>
      Select Kilometer
    </option>
    <option value="30">30</option>
    <option value="45">45</option>
    <option value="50">50</option>
    <option value="70">70</option>
  </select>

  <input
    type="text"
    value={newRate.rate}
    onChange={(e) => setNewRate({ ...newRate, rate: e.target.value })}
    placeholder="Rate"
    className="border p-2"
  />

  <input
    type="text"
    value={newRate.extra}
    onChange={(e) => setNewRate({ ...newRate, extra: e.target.value })}
    placeholder="Extra"
    className="border p-2"
  />

  <button onClick={handleAddRate} className="bg-blue-500 text-white p-2 rounded">
    Add Rate
  </button>
</div>

          </>
        )}
      </div>
    </HomeLayout>
  );
};

export default AirportRate;
