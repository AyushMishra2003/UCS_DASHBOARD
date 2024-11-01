import React, { useState } from 'react';
import { FaArrowRight, FaArrowLeft, FaSpinner } from 'react-icons/fa'; // Import spinner icon
import { AiOutlineCloudUpload } from 'react-icons/ai';
import HomeLayout from '../../Layouts/HomeLayouts';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../Redux/Slices/CategorySlice';
import { Link, useNavigate } from 'react-router-dom';

const AddCategoryForm = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1); // Step control
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    photo: null,
    name: '',
    numberOfSeats: '',
    acAvailable: true,
    numberOfBags: '',
    tripType: 'local',
  });

  const handleNextStep = () => setStep(step + 1);
  const handlePrevStep = () => setStep(step - 1);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setIsLoading(true); // Start loading
    const response = await dispatch(addCategory(formData));
    console.log(response);
    setIsLoading(false); // Stop loading

    setFormData({
      photo: null,
      name: '',
      numberOfSeats: '',
      acAvailable: false,
      numberOfBags: '',
      tripType: 'local',
    });

    navigate("/category/list");
  };

  return (
    <HomeLayout>
      <Link to={"/category/list"} className='flex items-end justify-end mt-6 px-4 py-2 bg-white text-black border border-gray-300 rounded hover:bg-gray-100 transition'>
        VIEW CATEGORY
      </Link>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg pt-2 mt-4 ">
        <h2 className="text-2xl font-bold mb-6">Add Category</h2>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="transition-opacity duration-300 ease-in-out">
              <div className="mb-4">
                <label className="block font-medium mb-2">Car Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-2">Number of Seats</label>
                <input
                  type="number"
                  name="numberOfSeats"
                  value={formData.numberOfSeats}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-2">Number of Bags</label>
                <input
                  type="number"
                  name="numberOfBags"
                  value={formData.numberOfBags}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4 flex items-center">
                <label className="mr-4 font-medium">AC Available</label>
                <input
                  type="checkbox"
                  name="acAvailable"
                  checked={formData.acAvailable}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      acAvailable: !formData.acAvailable,
                    })
                  }
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>

              <div className="mb-6">
                <label className="block font-medium mb-2">Upload Photo</label>
                <label className="flex items-center justify-center w-full border-2 border-dashed p-6 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition">
                  <AiOutlineCloudUpload className="text-3xl mr-2 text-gray-400" />
                  <input type="file" name="photo" onChange={handleFileChange} className="hidden" />
                  <span className="text-gray-600">{formData.photo ? formData.photo.name : 'Choose a file...'}</span>
                </label>
              </div>

              <button
                type="button"
                onClick={handleNextStep}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center transition"
              >
                Next Step <FaArrowRight className="ml-2" />
              </button>
            </div>
          )}

          {/* Step 2: Trip Details */}
          {step === 2 && (
            <div className="transition-opacity duration-300 ease-in-out">
              <div className="mb-4">
                <label className="block font-medium mb-2">Trip Type</label>
                <select
                  name="tripType"
                  value={formData.tripType}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="local">Local</option>
                  <option value="round">Round</option>
                  <option value="airpot">Airpot</option>
                  <option value="oneway">Oneway</option>
                </select>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center transition"
                >
                  <FaArrowLeft className="mr-2" />
                  Previous Step
                </button>

                <button
                  type="submit"
                  className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center transition`}
                  disabled={isLoading} // Disable the button while loading
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" /> {/* Spinner with animation */}
                      Submitting...
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </HomeLayout>
  );
};

export default AddCategoryForm;
