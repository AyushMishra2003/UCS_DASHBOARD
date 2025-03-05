import React, { useEffect, useState } from 'react';
import HomeLayout from '../Layouts/HomeLayouts';
import { useDispatch, useSelector } from 'react-redux';
import { getCarBookings } from '../Redux/Slices/carBookingSlice';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Home = () => {
  const [loading, setLoading] = useState(true);

  // State for Ongoing Bookings Filters
  const [startDateOngoing, setStartDateOngoing] = useState(null);
  const [endDateOngoing, setEndDateOngoing] = useState(null);
  const [tripTypeOngoing, setTripTypeOngoing] = useState('');
  const [ongoingPage, setOngoingPage] = useState(0);

  // State for Upcoming Bookings Filters
  const [startDateUpcoming, setStartDateUpcoming] = useState(null);
  const [endDateUpcoming, setEndDateUpcoming] = useState(null);
  const [tripTypeUpcoming, setTripTypeUpcoming] = useState('');
  const [upcomingPage, setUpcomingPage] = useState(0);

  // State for Bookings without Driver Details
  const [tripTypeNoDriver, setTripTypeNoDriver] = useState('');
  const [bookingStatusNoDriver, setBookingStatusNoDriver] = useState('ongoing');
  const [noDriverPage, setNoDriverPage] = useState(0);

  const dispatch = useDispatch();
  const orderData = useSelector((state) => state.carBooking.bookings) || [];

  const loadData = async () => {
    setLoading(true);
    await dispatch(getCarBookings());
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter by date and trip type
  const filterBookings = (data, startDate, endDate, tripType) => {
    return data.filter((booking) => {
      const bookingPickupDate = moment(booking.pickupDate);
      const isStartDateMatch = startDate ? bookingPickupDate.isSameOrAfter(startDate) : true;
      const isEndDateMatch = endDate ? bookingPickupDate.isSameOrBefore(endDate) : true;
      const isTripTypeMatch = tripType ? booking.tripType === tripType : true;
      return isStartDateMatch && isEndDateMatch && isTripTypeMatch;
    });
  };

  const ongoingBookings = filterBookings(
    orderData.filter((booking) => booking.status === 'ongoing'),
    startDateOngoing,
    endDateOngoing,
    tripTypeOngoing
  );

  const upcomingBookings = filterBookings(
    orderData.filter((booking) => booking.status === 'confirmed'),
    startDateUpcoming,
    endDateUpcoming,
    tripTypeUpcoming
  );

  // Filter bookings without driver details
  const noDriverBookings = orderData.filter((booking) => {
    return !booking.driverDetails || Object.keys(booking.driverDetails).length === 0;
  });


  const filteredNoDriverBookings = filterBookings(
    noDriverBookings.filter((booking) => 
      (booking.status === bookingStatusNoDriver || bookingStatusNoDriver === '') // Filter by booking status
    ),
    null,
    null,
    tripTypeNoDriver
  );

  // Pagination settings (showing 3 items per page)
  const itemsPerPage = 3; // Change to 3 items per page
  const ongoingPageCount = Math.ceil(ongoingBookings.length / itemsPerPage);
  const upcomingPageCount = Math.ceil(upcomingBookings.length / itemsPerPage);
  const noDriverPageCount = Math.ceil(filteredNoDriverBookings.length / itemsPerPage);


  

  return (
    <HomeLayout>
      <div className='flex flex-col items-center m-4 mt-5 text-black'>
        <div className='flex justify-between items-start'>
          {/* Ongoing Bookings Section */}
          <div className=' w-1/2 p-4 border rounded-lg bg-white shadow-lg'>
            <h2 className='text-2xl font-bold mb-4'>Ongoing Bookings</h2>
            <div className='flex gap-4 mb-4'>
              <div>
                <label>From:</label>
                <DatePicker
                  selected={startDateOngoing}
                  onChange={(date) => setStartDateOngoing(date)}
                  className='p-2 border rounded'
                  placeholderText='Start Date'
                />
              </div>
              <div>
                <label>To:</label>
                <DatePicker
                  selected={endDateOngoing}
                  onChange={(date) => setEndDateOngoing(date)}
                  className='p-2 border rounded'
                  placeholderText='End Date'
                />
              </div>
              <div>
                <label>Trip Type:</label>
                <select
                  value={tripTypeOngoing}
                  onChange={(e) => setTripTypeOngoing(e.target.value)}
                  className='p-2 border rounded bg-white'
                >
                  <option value=''>All</option>
                  <option value='Airport Trip'>Airport Trip</option>
                  <option value='Round'>Round</option>
                  <option value='One-Way Trip'>One-Way Trip</option>
                  <option value='Local'>Local</option>
                </select>
              </div>
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : ongoingBookings.length === 0 ? (
              <p>No Ongoing Bookings Found</p>
            ) : (
              ongoingBookings.slice(ongoingPage * itemsPerPage, (ongoingPage + 1) * itemsPerPage).map((booking) => (
                <div key={booking.bookingId} className='mb-4 border-b pb-4'>
                  <p><strong>Booking ID:</strong> {booking.bookingId}</p>
                  <p><strong>Trip Type:</strong> {booking.tripType}</p>
                  <p><strong>Pickup Date:</strong> {moment(booking.pickupDate).format('LLL')}</p>
                </div>
              ))
            )}

            <div className='flex justify-between mt-4'>
              <button
                className={`py-2 px-4 rounded-lg bg-blue-500 text-white ${ongoingPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => ongoingPage > 0 && setOngoingPage(ongoingPage - 1)}
                disabled={ongoingPage === 0}
              >
                Previous
              </button>
              <button
                className={`py-2 px-4 rounded-lg bg-blue-500 text-white ${ongoingPage >= ongoingPageCount - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => ongoingPage < ongoingPageCount - 1 && setOngoingPage(ongoingPage + 1)}
                disabled={ongoingPage >= ongoingPageCount - 1}
              >
                View More
              </button>
            </div>
          </div>

          {/* Upcoming Bookings Section */}
          <div className='w-1/2 p-4 border rounded-lg bg-white shadow-lg'>
            <h2 className='text-2xl font-bold mb-4'>Upcoming Bookings</h2>
            <div className='flex gap-4 mb-4'>
              <div>
                <label>From:</label>
                <DatePicker
                  selected={startDateUpcoming}
                  onChange={(date) => setStartDateUpcoming(date)}
                  className='p-2 border rounded'
                  placeholderText='Start Date'
                />
              </div>
              <div>
                <label>To:</label>
                <DatePicker
                  selected={endDateUpcoming}
                  onChange={(date) => setEndDateUpcoming(date)}
                  className='p-2 border rounded'
                  placeholderText='End Date'
                />
              </div>
              <div>
                <label>Trip Type:</label>
                <select
                  value={tripTypeUpcoming}
                  onChange={(e) => setTripTypeUpcoming(e.target.value)}
                  className='p-2 border rounded bg-white'
                >
                  <option value=''>All</option>
                  <option value='Airport Trip'>Airport Trip</option>
                  <option value='Round'>Round</option>
                  <option value='One-Way Trip'>One-Way Trip</option>
                  <option value='Local'>Local</option>
                </select>
              </div>
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : upcomingBookings.length === 0 ? (
              <p>No Upcoming Bookings Found</p>
            ) : (
              upcomingBookings.slice(upcomingPage * itemsPerPage, (upcomingPage + 1) * itemsPerPage).map((booking) => (
                <div key={booking.bookingId} className='mb-4 border-b pb-4'>
                  <p><strong>Booking ID:</strong> {booking.bookingId}</p>
                  <p><strong>Trip Type:</strong> {booking.tripType}</p>
                  <p><strong>Pickup Date:</strong> {moment(booking.pickupDate).format('LLL')}</p>
                </div>
              ))
            )}

            <div className='flex justify-between mt-4'>
              <button
                className={`py-2 px-4 rounded-lg bg-blue-500 text-white ${upcomingPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => upcomingPage > 0 && setUpcomingPage(upcomingPage - 1)}
                disabled={upcomingPage === 0}
              >
                Previous
              </button>
              <button
                className={`py-2 px-4 rounded-lg bg-blue-500 text-white ${upcomingPage >= upcomingPageCount - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => upcomingPage < upcomingPageCount - 1 && setUpcomingPage(upcomingPage + 1)}
                disabled={upcomingPage >= upcomingPageCount - 1}
              >
                View More
              </button>
            </div>
          </div>
        </div>

        {/* Bookings Without Driver Details Section */}
        <div className='w-full p-4 border rounded-lg bg-white shadow-lg mt-5'>
          <h2 className='text-2xl font-bold mb-4'>Bookings Without Driver Details</h2>
          <div className='flex gap-4 mb-4'>
            <div>
              <label>Trip Type:</label>
              <select
                value={tripTypeNoDriver}
                onChange={(e) => setTripTypeNoDriver(e.target.value)}
                className='p-2 border rounded bg-white'
              >
                <option value=''>All</option>
                <option value='Airport Trip'>Airport Trip</option>
                <option value='Round'>Round</option>
                <option value='One-Way Trip'>One-Way Trip</option>
                <option value='Local'>Local</option>
              </select>
            </div>
            <div>
              <label>Booking Status:</label>
              <select
                value={bookingStatusNoDriver}
                onChange={(e) => setBookingStatusNoDriver(e.target.value)}
                className='p-2 border rounded bg-white'
              >
                <option value='ongoing'>Ongoing</option>
                <option value='confirmed'>Confirmed</option>
              </select>
            </div>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : filteredNoDriverBookings.length === 0 ? (
            <p>No Bookings Found</p>
          ) : (
            filteredNoDriverBookings.slice(noDriverPage * itemsPerPage, (noDriverPage + 1) * itemsPerPage).map((booking) => (
              <div key={booking.bookingId} className='mb-4 border-b pb-4'>
                <p><strong>Booking ID:</strong> {booking.bookingId}</p>
                <p><strong>Trip Type:</strong> {booking.tripType}</p>
                <p><strong>Pickup Date:</strong> {moment(booking.pickupDate).format('LLL')}</p>
              </div>
            ))
          )}

          <div className='flex justify-between mt-4'>
            <button
              className={`py-2 px-4 rounded-lg bg-blue-500 text-white ${noDriverPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => noDriverPage > 0 && setNoDriverPage(noDriverPage - 1)}
              disabled={noDriverPage === 0}
            >
              Previous
            </button>
            <button
              className={`py-2 px-4 rounded-lg bg-blue-500 text-white ${noDriverPage >= noDriverPageCount - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => noDriverPage < noDriverPageCount - 1 && setNoDriverPage(noDriverPage + 1)}
              disabled={noDriverPage >= noDriverPageCount - 1}
            >
              View More
            </button>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Home;
