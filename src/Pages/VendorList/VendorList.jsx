import React, { useEffect, useState } from 'react';
import HomeLayout from '../../Layouts/HomeLayouts';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVendor, getVendor } from '../../Redux/Slices/dynamicSlice';
import { AiOutlineEye, AiOutlineDelete } from 'react-icons/ai';
import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const VendorList = () => {
  const dispatch = useDispatch();
  const { vendorList = [], loading, error } = useSelector((state) => state.dynamic); // Default to an empty array
  const navigate=useNavigate()

  const [filteredVendors, setFilteredVendors] = useState([]);
  const [search, setSearch] = useState({
    city: '',
    email: '',
    phoneNumber: '',
  });

  // Fetch vendor data
  const fetchData = async () => {
    const response = await dispatch(getVendor());
    console.log(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Filter vendors based on search inputs
    setFilteredVendors(
      vendorList.filter((vendor) =>
        vendor.city.toLowerCase().includes(search.city.toLowerCase()) &&
        vendor.email.toLowerCase().includes(search.email.toLowerCase()) &&
        vendor.phoneNumber.includes(search.phoneNumber)
      )
    );
  }, [search, vendorList]);

  const handleSearchChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async(id) => {
    // Logic for deleting the vendor
    const isConfirmed = window.confirm('Are you sure you want to delete this vendor?');

    if(isConfirmed){
    const response=await dispatch(deleteVendor(id))
    if(response?.payload){
       fetchData()
    }
  }
  };

  const handleViewMore = (id) => {
    // Logic for viewing more details
    console.log('View more vendor with id:', id);
  };

  return (
    <HomeLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Vendor List</h1>

        {/* Filter Section */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            name="city"
            value={search.city}
            onChange={handleSearchChange}
            placeholder="Filter by City"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            name="email"
            value={search.email}
            onChange={handleSearchChange}
            placeholder="Filter by Email"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            name="phoneNumber"
            value={search.phoneNumber}
            onChange={handleSearchChange}
            placeholder="Filter by Phone Number"
            className="border border-gray-300 p-2 rounded"
          />
        </div>

        {/* Add Vendor Button */}
        <div className="flex justify-end mb-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded flex items-center"  onClick={() => navigate('/vendor/add')}>
            <FiPlus className="mr-2" />
            Add Vendor
          </button>
        </div>

        {/* Vendor List Table */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading vendor list</p>
        ) : (
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="w-full bg-gray-200 text-left">
                <th className="p-2 border">Full Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Phone Number</th>
                <th className="p-2 border">City</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.map((vendor) => (
                <tr key={vendor._id} className="border-b">
                  <td className="p-2 border">{vendor.fullName}</td>
                  <td className="p-2 border">{vendor.email}</td>
                  <td className="p-2 border">{vendor.phoneNumber}</td>
                  <td className="p-2 border">{vendor.city}</td>
                  <td className="py-2 px-4 border-b">
                      {vendor?.description.length > 50 ? `${vendor?.description.substring(0, 50)}...` : vendor?.description}
                    </td>
                  {/* <td className="p-2 border">{vendor.description}</td> */}
                  <td className="p-2 border">
                    <button
                    //   onClick={() => handleViewMore(vendor._id)}
                      className="text-blue-500 mr-2"
                      onClick={() => navigate('/vendor/details', { state: { vendor } })}
                    >
                      <AiOutlineEye size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(vendor._id)}
                      className="text-red-500"
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </HomeLayout>
  );
};

export default VendorList;
