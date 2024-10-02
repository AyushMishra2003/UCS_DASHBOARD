import React from 'react';
import HomeLayout from '../../Layouts/HomeLayouts';
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
          <p>No inquiry details available</p>
        </div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <div className="p-4 max-w-2xl mx-auto bg-white shadow-md rounded-lg sm:mt-[5rem]">
        <h2 className="text-2xl font-bold mb-4">Inquiry Details</h2>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous page
          className="mb-4 text-blue-500"
        >
         Previous Page
        </button>
        
        {/* Full Name */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Full Name:</h3>
          <p className="text-gray-700">{inquiry.fullName}</p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Email:</h3>
          <p className="text-gray-700">{inquiry.email}</p>
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Phone Number:</h3>
          <p className="text-gray-700">{inquiry.phoneNumber}</p>
        </div>

        {/* Message */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Message:</h3>
          <p className="text-gray-700">{inquiry.message}</p>
        </div>

        {/* Updated At */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Message Date:</h3>
          <p className="text-gray-700">{new Date(inquiry.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
    </HomeLayout>
  );
};

export default InquiryDetail;
