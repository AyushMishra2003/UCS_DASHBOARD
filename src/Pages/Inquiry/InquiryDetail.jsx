import React from 'react';
import HomeLayout from '../../Layouts/HomeLayouts'
import { useLocation, useNavigate } from 'react-router-dom';

const InquiryDetail = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation
  const { state } = location || {};
  const { inquiry } = state || {};

  if (!inquiry) {
    return (
      <HomeLayout>
        <div className="p-4">
          <p className="text-center text-gray-500">No inquiry details available</p>
        </div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg sm:mt-[5rem]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-600">Inquiry Details</h2>
          
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)} // Navigate back to the previous page
            className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition"
          >
            Previous Page
          </button>
        </div>

        {/* Inquiry Information */}
        <div className="space-y-6">
          {/* Full Name */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-700">Full Name:</h3>
            <p className="text-gray-900">{inquiry.fullName}</p>
          </div>

          {/* Email */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-700">Email:</h3>
            <p className="text-gray-900">{inquiry.email}</p>
          </div>

          {/* Phone Number */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-700">Phone Number:</h3>
            <p className="text-gray-900">{inquiry.phoneNumber}</p>
          </div>

          {/* Message */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-700">Message:</h3>
            <p className="text-gray-900">{inquiry.message}</p>
          </div>

          {/* Updated At */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-700">Message Date:</h3>
            <p className="text-gray-900">{new Date(inquiry.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default InquiryDetail;
