import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategoryList, getCategory, updateCategoryList } from '../../Redux/Slices/CategorySlice';
import HomeLayout from '../../Layouts/HomeLayouts';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

const CategoryList = () => {
  const dispatch = useDispatch();
  
  const [tripType, setTripType] = useState('local');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null); 
  const [selectedPhoto, setSelectedPhoto] = useState(null); // New state for photo upload

  const { categoryList, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategory(tripType));
  }, [dispatch, tripType]);

  const handleTripTypeChange = (e) => {
    setTripType(e.target.value);
  };

  const handleEdit = (category) => {
    setEditCategory(category);
    setSelectedPhoto(null);  // Reset selected photo when editing a new category
    setShowModal(true);
  };

  const handleDelete = async(categoryId) => {
    console.log(`Deleting category: ${categoryId}`);
    const response=await dispatch(deleteCategoryList({categoryId,tripType}))
    dispatch(getCategory(tripType))
  };

  const closeModal = () => {
    setShowModal(false);
    setEditCategory(null);
    setSelectedPhoto(null);  // Reset selected photo on modal close
  };

  const handleUpdateCategory = async() => {
    const updatedCategory = {
      ...editCategory,
      photo: selectedPhoto ? selectedPhoto : editCategory.photo,  // Retain original photo if no new one is selected
    };
    setIsLoading(true); // Start loading

    console.log('Updating category:', updatedCategory);
    const response=await dispatch(updateCategoryList({updatedCategory,tripType}))
    console.log(response);
    if(response?.payload){
      closeModal(); // Close modal after update
      setIsLoading(false); // Start loading
      dispatch(getCategory(tripType));
    }
    

  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setSelectedPhoto(file);  // Update with the new selected photo
  };

  return (
    <HomeLayout>
      <div className='pt-[3rem]'>
        <div className='flex justify-between items-center'>
          <div className="mb-4">
            <label className="block font-medium mb-2">Filter by Trip Type:</label>
            <select
              value={tripType}
              onChange={handleTripTypeChange}
              className="border px-4 py-2 rounded"
            >
              <option value="oneway">Oneway</option>
              <option value="local">Local</option>
              <option value="round">Round</option>
              <option value="airpot">Airpot</option>
            </select>
          </div>
          <div>
            <Link to={"/add/category"} className='px-2 py-2 border-none bg-white text-black'>
              Add Category
            </Link>
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Photo</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Seats</th>
                <th className="py-2 px-4 border">Bags</th>
                <th className="py-2 px-4 border">AC Available</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categoryList.map((category) => (
                <tr key={category._id}>
                  <td className="py-2 px-4 border">
                    <img
                      src={category.photo?.secure_url || 'placeholder.jpg'}
                      alt={category.name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="py-2 px-4 border">{category.name}</td>
                  <td className="py-2 px-4 border">{category.numberOfSeats}</td>
                  <td className="py-2 px-4 border">{category.numberOfBags}</td>
                  <td className="py-2 px-4 border">{category.acAvailable ? 'Yes' : 'No'}</td>
                  <td className="py-2 px-4 border flex space-x-4">
                    <FiEdit
                      className="text-blue-500 cursor-pointer hover:text-blue-700"
                      size={20}
                      onClick={() => handleEdit(category)}
                    />
                    <FiTrash
                      className="text-red-500 cursor-pointer hover:text-red-700"
                      size={20}
                      onClick={() => handleDelete(category._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Modal for Editing Category */}
        {showModal && (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-4 rounded-lg shadow-lg w-[400px] max-h-[500px] overflow-y-auto"> {/* Medium width and height */}
      <h2 className="text-xl font-bold mb-3">Edit Category</h2> {/* Adjusted for medium modal */}

      <div className="mb-3">
        <label className="block mb-1 text-sm">Name:</label>
        <input
          type="text"
          value={editCategory?.name || ''}
          onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
          className="border w-full px-3 py-2 rounded text-sm"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 text-sm">Seats:</label>
        <input
          type="number"
          value={editCategory?.numberOfSeats || ''}
          onChange={(e) => setEditCategory({ ...editCategory, numberOfSeats: e.target.value })}
          className="border w-full px-3 py-2 rounded text-sm"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 text-sm">Bags:</label>
        <input
          type="number"
          value={editCategory?.numberOfBags || ''}
          onChange={(e) => setEditCategory({ ...editCategory, numberOfBags: e.target.value })}
          className="border w-full px-3 py-2 rounded text-sm"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 text-sm">AC Available:</label>
        <select
          value={editCategory?.acAvailable || false}
          onChange={(e) => setEditCategory({ ...editCategory, acAvailable: e.target.value === 'true' })}
          className="border w-full px-3 py-2 rounded text-sm"
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>

      {/* Current Photo */}
      <div className="mb-3">
        <label className="block mb-1 text-sm">Current Photo:</label>
        <img
          src={editCategory?.photo?.secure_url || 'placeholder.jpg'}
          alt="Current Photo"
          className="w-24 h-24 object-cover rounded"
        />
      </div>

      {/* Upload New Photo */}
      <div className="mb-3">
        <label className="block mb-1 text-sm">Upload New Photo:</label>
        <input
          type="file"
          onChange={handlePhotoChange}
          className="border w-full px-3 py-2 rounded text-sm"
        />
        {selectedPhoto && (
          <img
            src={URL.createObjectURL(selectedPhoto)}
            alt="New Photo Preview"
            className="w-24 h-24 object-cover rounded mt-2"
          />
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-3">
        <button
          className="px-3 py-2 bg-gray-500 text-white rounded text-sm"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
      className={`px-3 py-2 ${isLoading ? 'bg-gray-500' : 'bg-blue-500'} text-white rounded text-sm flex items-center justify-center`}
      onClick={handleUpdateCategory}
      disabled={isLoading} // Disable the button while loading
    >
      {isLoading ? (
        <FaSpinner className="animate-spin mr-2" /> // Spinner with spinning animation
      ) : 'Update'}
      {isLoading && 'Updating...'}
    </button>
      </div>
    </div>
  </div>
)}

      </div>
    </HomeLayout>
  );
};

export default CategoryList;
