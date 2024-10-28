import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser, updateUser } from '../../Redux/Slices/discountSlice';
// import { updateUser } from '../../Redux/Slices/discountSlice';

const EditCustomer = ({ user, onClose }) => {
  const dispatch = useDispatch();
  
  console.log(user);
  
  const [formData, setFormData] = useState({
    name: user.name || '',
    phoneNumber: user.phoneNumber || '',
    isVerify: user.isVerify || false,
    id:user._id
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  console.log(formData);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(formData);
        const response=await dispatch(updateUser(formData))
        console.log(response);
        if(response?.payload){
          dispatch(getUser());
            onClose(); // Close the form on successful update
        }
        
    //   await dispatch(updateUser({ id: user.id, ...formData }));
   
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 border border-red-500">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="isVerify"
              name="isVerify"
              checked={formData.isVerify}
              onChange={handleChange}
              className="mr-2 bg-white"
            />
            <label htmlFor="isVerify" className="text-gray-700 text-sm font-bold">
              Verified
            </label>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCustomer
