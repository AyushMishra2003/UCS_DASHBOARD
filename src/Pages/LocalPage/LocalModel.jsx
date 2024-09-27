import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const LocalCategoryModal = ({ isOpen, onClose, onAddCategory, selectedCity, data, editingCategory }) => {
  const [perKm, setPerKm] = useState('');
  const [perHour, setPerHour] = useState('');
  const [rateFor80Km8Hours, setRateFor80Km8Hours] = useState('');
  const [rateFor120Km12Hours, setRateFor120Km12Hours] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState('');

  // Effect to populate fields when editing an existing category
  useEffect(() => {
    if (editingCategory) {
      setSelectedCategory(editingCategory.category);
      setPerKm(editingCategory.perKm);
      setPerHour(editingCategory.perHour);
      setRateFor80Km8Hours(editingCategory.rateFor80Km8Hours);
      setRateFor120Km12Hours(editingCategory.rateFor120Km12Hours);
    } else {
      resetForm();
    }
  }, [editingCategory]);

  const resetForm = () => {
    setSelectedCategory('');
    setPerKm('');
    setPerHour('');
    setRateFor80Km8Hours('');
    setRateFor120Km12Hours('');
    setError('');
  };

  const handleSubmit = () => {
    console.log('Selected City:', selectedCity); // Debug log
    console.log('Selected Category:', selectedCategory); // Debug log

    // Validation checks
    if (!selectedCity) {
      setError('City Name is required!');
      return;
    }
    if (!selectedCategory) {
      setError('Category is required!');
      return;
    }
    if (!perKm || !perHour || !rateFor80Km8Hours || !rateFor120Km12Hours) {
      setError('All fields are required!');
      return;
    }

    const categoryData = {
      cityName: selectedCity,
      category: selectedCategory,
      perKm: parseFloat(perKm),
      perHour: parseFloat(perHour),
      rateFor80Km8Hours: parseFloat(rateFor80Km8Hours),
      rateFor120Km12Hours: parseFloat(rateFor120Km12Hours),
    };

    onAddCategory(categoryData, editingCategory); // Pass editingCategory for updating
    resetForm(); // Reset the form after submission
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>

        {error && <p className="text-red-500">{error}</p>} {/* Error message */}

        <div className="mb-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border p-2 w-full mb-2"
            aria-label="Select Category"
          >
            <option value="">Select a Category</option>
            {data.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={perKm}
            onChange={(e) => setPerKm(e.target.value)}
            placeholder="Per Km"
            className="border p-2 w-full mb-2"
            aria-label="Per Km"
          />
          <input
            type="number"
            value={perHour}
            onChange={(e) => setPerHour(e.target.value)}
            placeholder="Per Hour"
            className="border p-2 w-full mb-2"
            aria-label="Per Hour"
          />
          <input
            type="number"
            value={rateFor80Km8Hours}
            onChange={(e) => setRateFor80Km8Hours(e.target.value)}
            placeholder="Rate for 80Km/8Hours"
            className="border p-2 w-full mb-2"
            aria-label="Rate for 80Km/8Hours"
          />
          <input
            type="number"
            value={rateFor120Km12Hours}
            onChange={(e) => setRateFor120Km12Hours(e.target.value)}
            placeholder="Rate for 120Km/12Hours"
            className="border p-2 w-full mb-4"
            aria-label="Rate for 120Km/12Hours"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-500 text-white p-2 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white p-2 rounded"
            disabled={!selectedCategory || !perKm || !perHour || !rateFor80Km8Hours || !rateFor120Km12Hours}
          >
            {editingCategory ? 'Update Category' : 'Add Category'}
          </button>
        </div>
      </div>
    </div>
  );
};

LocalCategoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddCategory: PropTypes.func.isRequired,
  selectedCity: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  editingCategory: PropTypes.shape({
    category: PropTypes.string,
    perKm: PropTypes.number,
    perHour: PropTypes.number,
    rateFor80Km8Hours: PropTypes.number,
    rateFor120Km12Hours: PropTypes.number,
  }),
};

export default LocalCategoryModal;
