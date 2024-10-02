import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeLayout from '../../Layouts/HomeLayouts';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const VendorDetails = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation
  const { state } = location || {};
  const { vendor } = state || {};

  // Function to handle going back to the previous page
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <HomeLayout>
      <div className="p-4">
        <div className="flex items-center mb-4">
          <button
            onClick={handleGoBack}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded"
          >
            <AiOutlineArrowLeft className="mr-2" size={20} />
            Back to Previous Page
          </button>
        </div>

        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Vendor Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Full Name:</h3>
              <p>{vendor?.fullName || 'N/A'}</p>
            </div>

            <div>
              <h3 className="font-semibold">Email:</h3>
              <p>{vendor?.email || 'N/A'}</p>
            </div>

            <div>
              <h3 className="font-semibold">Phone Number:</h3>
              <p>{vendor?.phoneNumber || 'N/A'}</p>
            </div>

            <div>
              <h3 className="font-semibold">City:</h3>
              <p>{vendor?.city || 'N/A'}</p>
            </div>

            <div className="col-span-1 sm:col-span-2">
              <h3 className="font-semibold">Description:</h3>
              <p>{vendor?.description || 'N/A'}</p>
            </div>

            <div>
              <h3 className="font-semibold">Created At:</h3>
              <p>{new Date(vendor?.createdAt).toLocaleString() || 'N/A'}</p>
            </div>

            <div>
              <h3 className="font-semibold">Updated At:</h3>
              <p>{new Date(vendor?.updatedAt).toLocaleString() || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default VendorDetails;
