import React, { useEffect, useState } from "react";
import HomeLayout from "../../Layouts/HomeLayouts";
import { useDispatch, useSelector } from "react-redux";
import { getPackageCategory, getPackageInclude } from "../../Redux/Slices/packageSlice";

const DemoPackages = () => {
  const { packageInclude, packageCategory, error } = useSelector((state) => state.package);
  const dispatch = useDispatch();

  const [checkedItems, setCheckedItems] = useState([]); // State to store selected items
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category

  // Fetch package includes
  const fetchInclude = async () => {
    await dispatch(getPackageInclude());
  };

  // Fetch package categories
  const fetchData = async () => {
    await dispatch(getPackageCategory());
  };

  useEffect(() => {
    fetchInclude();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckboxChange = (item) => {
    setCheckedItems((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item) // Remove if already checked
        : [...prev, item] // Add if not already checked
    );
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value); // Update selected category
  };

  return (
    <HomeLayout>
      <div>
        <h2 className="text-lg font-bold">Package Includes</h2>
        {error && <p className="text-red-500">Error: {error}</p>}

        {/* Dropdown for selecting a category */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Select a Category:
          </label>
          <select
            id="category"
            className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">-- Select a Category --</option>
            {packageCategory?.map((category) => (
              <option key={category._id} value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        {/* Package Includes */}
        <div className="space-y-2">
          {packageInclude?.map((include, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                id={`include-${index}`}
                className="mr-2"
                checked={checkedItems.includes(include.includeName)}
                onChange={() => handleCheckboxChange(include.includeName)}
              />
              <label htmlFor={`include-${index}`} className="text-sm">
                {include.includeName}
              </label>
            </div>
          ))}
        </div>

        {/* Display selected category */}
        {selectedCategory && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Selected Category:</h3>
            <p className="text-sm">{selectedCategory}</p>
          </div>
        )}

        {/* Display checked items */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Selected Includes:</h3>
          <ul className="list-disc pl-5">
            {checkedItems.map((item, index) => (
              <li key={index} className="text-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </HomeLayout>
  );
};

export default DemoPackages;
