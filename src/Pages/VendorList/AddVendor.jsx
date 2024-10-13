import React, { useState } from 'react';
import HomeLayout from '../../Layouts/HomeLayouts';
import { useDispatch } from 'react-redux';
import { addVendor } from '../../Redux/Slices/dynamicSlice';
import { useNavigate } from 'react-router-dom';

const AddVendor = () => {
  // State to store form input values
  const [vendorData, setVendorData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    city: '',
    description: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData({
      ...vendorData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can now send `vendorData` to your backend or handle it as needed
    console.log(vendorData);
    const response = await dispatch(addVendor(vendorData));
    console.log(response);

    if (response?.payload?.
      success) {
      navigate("/vendor");
    }
  };

  return (
    <HomeLayout>
      <div className="p-6 bg-gray-100 flex justify-center items-center">
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded w-full max-w-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Add Vendor</h1>
          
          {/* Row for Full Name, Email, Phone Number, and City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={vendorData.fullName}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300  bg-white"
                placeholder="Enter full name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={vendorData.email}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded bg-white"
                placeholder="Enter email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={vendorData.phoneNumber}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded bg-white"
                placeholder="Enter phone number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={vendorData.city}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded bg-white"
                placeholder="Enter city"
                required
              />
            </div>
          </div>

          {/* Description Textarea */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-black">Description</label>
            <textarea
              name="description"
              value={vendorData.description}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded bg-white"
              placeholder="Enter description"
              rows="5"
              required
            />
          </div>

          {/* Button Container */}
          <div className="flex justify-between">
            {/* Previous Button */}
            <button 
              type="button" 
              onClick={() => navigate(-1)} // Navigate to the previous page
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Previous Page
            </button>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Vendor
            </button>
          </div>
        </form>
      </div>
    </HomeLayout>
  );
};

export default AddVendor;
