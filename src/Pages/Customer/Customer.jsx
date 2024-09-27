import React, { useEffect, useState } from 'react';
import HomeLayout from '../../Layouts/HomeLayouts';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../Redux/Slices/discountSlice';
import { FaRegEdit } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'; // Assuming you are using react-router for navigation
import EditCustomer from './EditCustomer';

const Customer = () => {
  const { loading, users, error } = useSelector((state) => state.discounts);
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const handleEditClick = (user) => {
    
    setEditingUser(user);
  };

  const handleCloseEditForm = () => {
    setEditingUser(null);
  };

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-4">
        <p>Loading...</p>
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
              {users && users.length > 0 ? (
                users.map((user) => (
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
                        <FaRegEdit/>
                      </button>
                      <button
                          onClick={(e) => { e.stopPropagation(); navigate('/customer/detail', { state: { ...user } }) }}
                         className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                       <FaRegEye/>
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
        {editingUser && (
          <EditCustomer
            user={editingUser}
            onClose={handleCloseEditForm}
          />
        )}
      </div>
    </HomeLayout>
  );
};

export default Customer;
