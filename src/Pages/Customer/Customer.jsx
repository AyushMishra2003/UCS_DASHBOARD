import React, { useEffect, useState } from 'react';
import HomeLayout from '../../Layouts/HomeLayouts';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../Redux/Slices/discountSlice';
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import EditCustomer from './EditCustomer';

const Customer = () => {
  const { loading, users, error } = useSelector((state) => state.discounts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // For filtering by name
  const [searchEmail, setSearchEmail] = useState(''); // For filtering by email
  const [searchPhone, setSearchPhone] = useState(''); // For filtering by phone
  const [isVerifiedFilter, setIsVerifiedFilter] = useState(''); // For filtering by verification status
  const [currentPage, setCurrentPage] = useState(1); // For pagination

  const usersPerPage = 10; // Number of users per page

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const handleEditClick = (user) => {
    setEditingUser(user);
  };

  const handleCloseEditForm = () => {
    setEditingUser(null);
  };

  // Filter logic based on name, email, phone number, and isVerified
  const filteredUsers = users
    ?.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      user.email.toLowerCase().includes(searchEmail.toLowerCase()) &&
      user.phoneNumber.includes(searchPhone) &&
      (isVerifiedFilter === '' || user.isVerify.toString() === isVerifiedFilter)
    );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers?.length / usersPerPage);

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-4">
        <HomeLayout>
          <p>Loading...</p>
        </HomeLayout>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-4">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <HomeLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Customer List</h1>

        {/* Filter Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Filter by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="text"
            placeholder="Filter by Email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="text"
            placeholder="Filter by Phone Number"
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2"
          />
          <select
            value={isVerifiedFilter}
            onChange={(e) => setIsVerifiedFilter(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 bg-white"
          >
            <option value="">Filter by Verified Status</option>
            <option value="true">Verified</option>
            <option value="false">Not Verified</option>
          </select>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 border-b border-gray-300">
                <th className="py-3 px-6 text-left text-gray-700">Name</th>
                <th className="py-3 px-6 text-left text-gray-700">Email</th>
                <th className="py-3 px-6 text-left text-gray-700">Phone Number</th>
                <th className="py-3 px-6 text-left text-gray-700">Password</th>
                <th className="py-3 px-6 text-left text-gray-700">Verified</th>
                <th className="py-3 px-6 text-left text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers && currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-6">{user.name}</td>
                    <td className="py-4 px-6">{user.email}</td>
                    <td className="py-4 px-6">{user.phoneNumber}</td>
                    <td className="py-4 px-6">{user.password}</td>
                    <td className="py-4 px-6">{user.isVerify ? 'Yes' : 'No'}</td>
                    <td className="py-4 px-6 flex space-x-2">
                      <button
                        onClick={() => handleEditClick(user)}
                        className="text-green-600 hover:text-green-800 font-medium"
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/customer/detail', { state: { ...user } });
                        }}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        <FaRegEye />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 px-6 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 mx-1 border ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 border-gray-300'
                } rounded`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}

        {editingUser && (
          <EditCustomer user={editingUser} onClose={handleCloseEditForm} />
        )}
      </div>
    </HomeLayout>
  );
};

export default Customer;
