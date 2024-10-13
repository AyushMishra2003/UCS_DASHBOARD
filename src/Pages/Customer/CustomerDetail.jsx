import React, { useEffect, useState } from 'react';
import HomeLayout from '../../Layouts/HomeLayouts';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userHistory } from '../../Redux/Slices/discountSlice';
import { FaDownload } from "react-icons/fa6";
import { invoice } from '../../Redux/Slices/carBookingSlice';
import CarOrders from '../CarsPages/CarOrders';
import { fill } from 'lodash';


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
    return  <HomeLayout>
       <p>Loading...</p>
    </HomeLayout>
  }

  if (error) {
    return <HomeLayout>
       <p>Error....</p>
    </HomeLayout>
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

       <div>

        <CarOrders data={filteredHistory}/>


      </div>

  );
};

export default CustomerDetail;
