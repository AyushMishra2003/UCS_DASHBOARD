import React, { useEffect, useState } from 'react';
import HomeLayout from '../../Layouts/HomeLayouts';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userHistory } from '../../Redux/Slices/discountSlice';
import { FaDownload } from "react-icons/fa6";
import { invoice } from '../../Redux/Slices/carBookingSlice';


const CustomerDetail = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const { history, loading, error } = useSelector((state) => state.discounts);

  const [currentBookingIndex, setCurrentBookingIndex] = useState(0);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [filterQuery, setFilterQuery] = useState('');

  useEffect(() => {
    if (state && state._id) {
      dispatch(userHistory(state._id));
    }
  }, [dispatch, state]);

  useEffect(() => {
    setFilteredHistory(history);
  }, [history]);

  const handleNext = () => {
    if (currentBookingIndex < filteredHistory.length - 1) {
      setCurrentBookingIndex(currentBookingIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentBookingIndex > 0) {
      setCurrentBookingIndex(currentBookingIndex - 1);
    }
  };

  const handleFilter = (e) => {
    setFilterQuery(e.target.value);
    if (e.target.value) {
      const filtered = history.filter(
        (booking) =>
          booking.bookingId.includes(e.target.value) ||
          new Date(booking.bookingDate).toLocaleDateString().includes(e.target.value)
      );
      setFilteredHistory(filtered);
      setCurrentBookingIndex(0); // reset to first result
    } else {
      setFilteredHistory(history);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500 py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">Error: {error.message}</div>;
  }
  
  const downloadInvoice = async (id) => {
    console.log("Download invoice");
    console.log(id);
    

    const response = await dispatch(invoice(id));  // API call to get binary data
    console.log(response);

    if (response.payload) {
        // Convert the binary data to a Blob
        const blob = new Blob([response.payload], { type: 'application/pdf' });

        // Create a link element
        const link = document.createElement('a');
        
        // Create a URL for the Blob and set it as the href attribute
        link.href = window.URL.createObjectURL(blob);
        
        // Set the download attribute with a filename
        link.download = `invoice_${id}.pdf`;
        
        // Append the link to the body (required for Firefox)
        document.body.appendChild(link);
        
        // Programmatically trigger the download
        link.click();
        
        // Remove the link from the DOM
        document.body.removeChild(link);
    }
};
  const currentBooking = filteredHistory[currentBookingIndex];

  return (
    <HomeLayout>
      <div className="container mx-auto p-4">
        <div  className='flex items-center justify-between'>
          <h1 className="text-3xl font-bold mb-6">Customer Details</h1>
          <button onClick={()=>downloadInvoice(currentBooking._id)}><FaDownload/></button>
        </div>
       

        <div className="mb-4">
          <input
            type="text"
            value={filterQuery}
            onChange={handleFilter}
            placeholder="Filter by Booking ID or Date"
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
        </div>

        {currentBooking ? (
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
            <div>
               <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
            </div>
      
            <div className="mb-4 p-4 border-b border-gray-300">
              <h3 className="text-xl font-semibold">Booking ID: {currentBooking.bookingId}</h3>
              <p><strong>Trip Type:</strong> {currentBooking?.tripType}</p>
              <p><strong>From Location:</strong> {currentBooking?.fromLocation}</p>
              <p><strong>Pickup Address:</strong> {currentBooking?.pickupAddress}</p>
              <p><strong>Drop Address:</strong> {currentBooking?.dropAddress}</p>
              <p><strong>Category:</strong> {currentBooking?.category}</p>
              <p><strong>Actual Price:</strong> ${currentBooking?.actualPrice}</p>
              <p><strong>Discount Value:</strong> ${currentBooking?.discountValue}</p>
              <p><strong>Total Price:</strong> ${currentBooking?.totalPrice}</p>
              <p><strong>Status:</strong> {currentBooking?.status}</p>
              <p><strong>Pickup Date:</strong> {new Date(currentBooking.pickupDate).toLocaleDateString()}</p>
              <p><strong>Pickup Time:</strong> {currentBooking.pickupTime}</p>
              <p><strong>Booking Date:</strong> {new Date(currentBooking.bookingDate).toLocaleDateString()}</p>
              <p><strong>Booking Time:</strong> {currentBooking.bookingTime}</p>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrevious}
                disabled={currentBookingIndex === 0}
                className={`px-4 py-2 bg-blue-500 text-white rounded ${currentBookingIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={currentBookingIndex === filteredHistory.length - 1}
                className={`px-4 py-2 bg-blue-500 text-white rounded ${currentBookingIndex === filteredHistory.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <p>No booking history available.</p>
        )}
      </div>
    </HomeLayout>
  );
};

export default CustomerDetail;
