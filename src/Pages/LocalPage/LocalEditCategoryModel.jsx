// EditCategoryModal.js
import React, { useState, useEffect } from 'react';

const EditCategoryModal = ({ isOpen, onClose, onSave, category }) => {
  const [name, setName] = useState('');
  const [perKm, setPerKm] = useState('');
  const [perHour, setPerHour] = useState('');
  const [rateFor80Km8Hours, setRateFor80Km8Hours] = useState('');
  const [rateFor120Km12Hours, setRateFor120Km12Hours] = useState('');

  useEffect(() => {
    if (category) {
      setName(category.category.name);
      setPerKm(category.perKm);
      setPerHour(category.perHour);
      setRateFor80Km8Hours(category.rateFor80Km8Hours);
      setRateFor120Km12Hours(category.rateFor120Km12Hours);
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...category,
      category: { name },
      perKm,
      perHour,
      rateFor80Km8Hours,
      rateFor120Km12Hours,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-5 rounded-md shadow-md">
        <h2 className="text-lg font-bold mb-4">Edit Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm">Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm">Per Km</label>
            <input
              type="number"
              value={perKm}
              onChange={(e) => setPerKm(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm">Per Hour</label>
            <input
              type="number"
              value={perHour}
              onChange={(e) => setPerHour(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm">Rate for 80Km/8Hours</label>
            <input
              type="number"
              value={rateFor80Km8Hours}
              onChange={(e) => setRateFor80Km8Hours(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm">Rate for 120Km/12Hours</label>
            <input
              type="number"
              value={rateFor120Km12Hours}
              onChange={(e) => setRateFor120Km12Hours(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 mr-2 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;
