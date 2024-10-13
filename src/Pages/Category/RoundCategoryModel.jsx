import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const RoundCategoryModal = ({ isOpen, onClose, onAddCategory, editingCategory, categoryData }) => {
  const { categoryList } = useSelector((state) => state.category);
  
  const [selectedCategory, setSelectedCategory] = useState('');
  const [perKm, setPerKm] = useState('');
  const [extraKm, setExtraKm] = useState(''); // Change here
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingCategory && categoryData) {
      setSelectedCategory(categoryData.category.name); // Adjusted based on the category structure
      setPerKm(categoryData.perKm);
      setExtraKm(categoryData.extraKm); // Set the extraKm for autofill
    } else {
      resetForm();
    }
  }, [editingCategory, categoryData, isOpen]);

  const resetForm = () => {
    setSelectedCategory('');
    setPerKm('');
    setExtraKm(''); // Reset extraKm
    setError('');
  };

  const handleSubmit = () => {
    setError('');
    
    // Validate input fields
    if (!selectedCategory) {
      setError('Category is required!');
      return;
    }
    if (!perKm) {
      setError('Per Km is required!');
      return;
    }

    const categoryDataToSubmit = {
      category: selectedCategory,
      perKm,
      extraKm, // Include extraKm in the submission
    };
    
    onAddCategory(categoryDataToSubmit);
    onClose();
    resetForm();
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-md">
        <h2 className="text-lg font-bold mb-4">{editingCategory ? 'Edit Category' : 'Add Category'}</h2>
        
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={`border p-2 w-full mb-2 bg-white ${!selectedCategory && error && 'border-red-500'}`}
          aria-label="Select Category"
        >
          <option value="" disabled>Select Category</option>
          {categoryList.map((category, index) => (
            <option key={index} value={category.name}>{category.name}</option>
          ))}
        </select>
        {!selectedCategory && error && <p className="text-red-500">Category is required!</p>}

        <input
          type="number"
          value={perKm}
          onChange={(e) => setPerKm(e.target.value)}
          placeholder="Per Km"
          className={`border p-2 w-full mb-2 ${!perKm && error && 'border-red-500'}`}
          aria-label="Per Km"
        />
        
        <input
          type="number"
          value={extraKm}
          onChange={(e) => setExtraKm(e.target.value)} // Change here
          placeholder="Extra Km"
          className={`border p-2 w-full mb-2 ${!extraKm && error && 'border-red-500'}`} // Change here
          aria-label="Extra Km"
        />
        {!perKm && error && <p className="text-red-500">Per Km is required!</p>}

        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white p-2 rounded"
          >
            {editingCategory ? 'Save Changes' : 'Add Category'}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black p-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoundCategoryModal;
