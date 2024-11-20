import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import HomeLayout from '../../Layouts/HomeLayouts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { addPackage } from '../../Redux/Slices/packageSlice';

const PackageSetup = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [basicDetails, setBasicDetails] = useState({
      packageName: '',
      fromDate: new Date(), // Initialize with current date
      toDate: new Date(),   // Initialize with current date
      duration: '',
      rate: '',
      location: '',
      mainPhoto: null,
    });
    const [inclusive, setInclusive] = useState('');
    const [exclusive, setExclusive] = useState('');
    const [bookingPolicy, setBookingPolicy] = useState('');
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);

    const [includeDetails, setIncludeDetails] = useState({
      hotelIncluded: false,
      mealIncluded: false,
      dummyOption: false
    });


    console.log(includeDetails);
    
   
    const dispatch=useDispatch()


    
    const handleTabChange = (index) => setActiveTab(index);
    
    const handleBasicDetailsChange = (e) => {
      setBasicDetails({
        ...basicDetails,
        [e.target.name]: e.target.value,
      });
    };
    
    const handlePhotosChange = (e) => {
      const files = Array.from(e.target.files);
      setPhotos([...photos, ...files]);  // Adding new photos to the existing list
    };
    
    const handleMainPhotoChange = (e) => {
      const file = e.target.files[0];
      setBasicDetails({ ...basicDetails, mainPhoto: file });
    };
    
    const handleDateChange = (name, date) => {
      setBasicDetails({
        ...basicDetails,
        [name]: date,
      });
    };
    
    const handleDeletePhoto = (index) => {
      const updatedPhotos = photos.filter((_, i) => i !== index);
      setPhotos(updatedPhotos);
    };
    
    const handleEditPhoto = (index) => {
      // Here you can add your photo editing logic if needed, 
      // for now we'll just log the index to show the image being selected for editing.
      console.log('Edit photo:', photos[index]);
    };
    
    const [dayWiseData, setDayWiseData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3; // Show 3 days per page
    
    // Add date and content for each day
    const handleAddDayWise = () => {
      const newDay = { date: new Date(), content: '' };  // Initialize with current date
      setDayWiseData([...dayWiseData, newDay]);
    };
    
    const handleDayWiseChange = (index, value) => {
      const newDayWiseData = [...dayWiseData];
      newDayWiseData[index].content = value;
      setDayWiseData(newDayWiseData);
    };
    
    // Add date change functionality for day-wise content
    const handleDayDateChange = (index, date) => {
      const newDayWiseData = [...dayWiseData];
      newDayWiseData[index].date = date;
      setDayWiseData(newDayWiseData);
    };
    
    const handleDeleteDay = (index) => {
      const newDayWiseData = dayWiseData.filter((_, i) => i !== index);
      setDayWiseData(newDayWiseData);
    };
    
    const handlePageChange = ({ selected }) => {
      setCurrentPage(selected);
    };
    
    const handleEditDay = (index) => {
      // Add logic to edit day-wise content
      console.log('Edit day:', dayWiseData[index]);
    };


    // Submit button
    const handleSubmit = async() => {
      const formData = new FormData(); // Use FormData for handling files

      setLoading(true)
  
      // Add basic details
      formData.append('packageName', basicDetails.packageName);
      formData.append('dateFrom', basicDetails.fromDate.toISOString());
      formData.append('dateTo', basicDetails.toDate.toISOString());
      formData.append('duration', basicDetails.duration);
      formData.append('rate', basicDetails.rate);
      formData.append('location', basicDetails.location);
  
      // Add main photo
      if (basicDetails.mainPhoto) {
          formData.append('mainPhoto', basicDetails.mainPhoto);
      }
  
      // Add multiple photos
      photos.forEach((photo, index) => {
          formData.append(`photos`, photo);
      });
  
      // Add inclusions and exclusions
      formData.append('inclusive', inclusive);
      formData.append('exclusive', exclusive);
  
      // Add booking policy
      formData.append('bookingPolicy', bookingPolicy);
  
      // Add terms and conditions (if it's the same as booking policy, this can be adjusted)
      formData.append('termsAndCondition', bookingPolicy);
  
      // Add day-wise data
      dayWiseData.forEach((day, index) => {
          formData.append(`dayWise[${index}][date]`, day.date.toISOString());
          formData.append(`dayWise[${index}][content]`, day.content);
      });


        // Add included details as an array
  const includedDetailsArray = [];
  if (includeDetails.hotelIncluded) includedDetailsArray.push('hotelIncluded');
  if (includeDetails.mealIncluded) includedDetailsArray.push('mealIncluded');
  if (includeDetails.dummyOption) includedDetailsArray.push('dummyOption');

  // Append the array of included details
  formData.append('includedPackages', JSON.stringify(includedDetailsArray));
    
      console.log(formData);
     
      const response=await dispatch(addPackage(formData))

      setLoading(false)
      
      console.log(response);
      

      
      
    };
  



  return (
    <HomeLayout>
      <div className="container mx-auto p-6">

        <h1 className='text-center mb-10 text-black font-bold text-4xl'>PACKAGE ADDED </h1>
        {/* Tabs */}
        <div className="flex space-x-4 mb-6 mx-auto items-center justify-center py-2">
          {['Basic Details', 'Photos', 'Inclusive', 'Exclusive Terms', 'Booking Policy', 'Terms and Conditions', 'Day Wise','Submit Button'].map((tab, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-md shadow-lg transition ${
                activeTab === index
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => handleTabChange(index)}
            >
              {tab}
            </button>
          ))}
        </div>


        {/* Tab Content */}
        {activeTab === 0 && (
  <div className="space-y-6 border-2 border-gray-300 p-6 max-w-4xl mx-auto mt-10">
    {/* Package Name and Date */}
    <div className="flex space-x-6">
      <div className="w-1/2">
        <label>Package Name</label>
        <input
          type="text"
          name="packageName"
          value={basicDetails.packageName}
          onChange={handleBasicDetailsChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter package name"
        />
      </div>

      <div className="w-1/2">
        <label>Date</label>
        <div className="flex space-x-4">
          {/* From Date */}
          <DatePicker
            selected={basicDetails.fromDate}
            onChange={(date) => handleDateChange('fromDate', date)}
            className="w-full p-2 border border-gray-300 rounded-md"
            dateFormat="yyyy-MM-dd"
          />

          {/* To Date */}
          <DatePicker
            selected={basicDetails.toDate}
            onChange={(date) => handleDateChange('toDate', date)}
            className="w-full p-2 border border-gray-300 rounded-md"
            dateFormat="yyyy-MM-dd"
          />
        </div>
      </div>
    </div>

    {/* Duration and Rate */}
    <div className="flex space-x-6">
      <div className="w-1/2">
        <label>Duration (in days)</label>
        <input
          type="number"
          name="duration"
          value={basicDetails.duration}
          onChange={handleBasicDetailsChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="e.g., 7"
        />
      </div>

      <div className="w-1/2">
        <label>Rate</label>
        <input
          type="number"
          name="rate"
          value={basicDetails.rate}
          onChange={handleBasicDetailsChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="e.g., 1000"
        />
      </div>
    </div>

    {/* Location and Main Photo */}
    <div className="flex space-x-6">
      <div className="w-1/2">
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={basicDetails.location}
          onChange={handleBasicDetailsChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter location"
        />
      </div>

      <div className="w-1/2">
        <label>Main Photo</label>
        <input
          type="file"
          onChange={handleMainPhotoChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>

    

    {/* Predefined Options */}
    {/* Hotel Included */}
    <div className="flex items-center space-x-2 bg-white max-w-fit">
        <input
          type="checkbox"
          name="hotelIncluded"
          checked={includeDetails.hotelIncluded}
          onChange={() => setIncludeDetails({
            ...includeDetails,
            hotelIncluded: !includeDetails.hotelIncluded
          })}
          className="h-5 w-5 text-red-500 border-2 border-gray-300 rounded-sm focus:ring-0"
        />
        <label className='bg-white'>Hotel Included</label>
      </div>

      {/* Meal Included */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="mealIncluded"
          checked={includeDetails.mealIncluded}
          onChange={() => setIncludeDetails({
            ...includeDetails,
            mealIncluded: !includeDetails.mealIncluded
          })}
          className="h-5 w-5"
        />
        <label>Meal Included</label>
      </div>

      {/* Dummy Option */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="dummyOption"
          checked={includeDetails.dummyOption}
          onChange={() => setIncludeDetails({
            ...includeDetails,
            dummyOption: !includeDetails.dummyOption
          })}
          className="h-5 w-5"
        />
        <label>Dummy Option</label>
      </div>




  </div>
          )}


        {/* Photos Tab */}
        {activeTab === 1 && (
          <div className="mt-4 max-w-4xl mx-auto">
            <label>Upload Photos</label>
            <input
              type="file"
              multiple
              onChange={handlePhotosChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            
            {/* Button to add more photos */}
            <button
              type="button"
              onClick={() => document.querySelector('input[type="file"]').click()}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Add More Photos
            </button>

            {/* Display the uploaded photos */}
            {photos.length > 0 && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-4">Uploaded Photos</h2>
                <div className="grid grid-cols-3 gap-4">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Uploaded Photo ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <div className="absolute top-0 right-0 p-2 bg-black bg-opacity-50">
                        <button
                          onClick={() => handleDeletePhoto(index)}
                          className="text-white mr-2"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleEditPhoto(index)}
                          className="text-white"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Other Tabs */}
        {activeTab === 2 && (
          <div className="mt-4 max-w-4xl mx-auto">
            <label>Inclusive</label>
            <ReactQuill value={inclusive} onChange={setInclusive} className="w-full" />
          </div>
        )}

        {activeTab === 3 && (
          <div className="mt-4 max-w-4xl mx-auto">
            <label>Exclusive</label>
            <ReactQuill value={exclusive} onChange={setExclusive} className="w-full" />
          </div>
        )}

        {activeTab === 4 && (
          <div className="mt-4 max-w-4xl mx-auto">
            <label>Booking Policy</label>
            <ReactQuill value={bookingPolicy} onChange={setBookingPolicy} className="w-full" />
          </div>
        )}


{activeTab === 5 && (
          <div className="mt-4 max-w-4xl mx-auto">
            <label>Term and Conditions</label>
            <ReactQuill value={bookingPolicy} onChange={setBookingPolicy} className="w-full" />
          </div>
        )}


{activeTab === 6 && (
  <div className="space-y-4 max-w-5xl mx-auto">
    {/* Add Day Wise Button */}
    <button
      onClick={handleAddDayWise}
      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
    >
      Add Day
    </button>

    {/* Day-wise content and date */}
    <div className="space-y-6">
  {dayWiseData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((day, index) => (
    <div key={index} className="bg-white p-4 rounded-lg shadow-lg space-y-4">
      {/* Container for date and content */}
      <div className="flex items-start space-x-6">
        {/* Date Input Section */}
        <div className="flex flex-col items-start space-y-4 w-[30%]">
          <input
            type="date"
            value={day.date.toISOString().split('T')[0]} // Display date in YYYY-MM-DD format
            onChange={(e) => handleDayDateChange(index, new Date(e.target.value))}
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
          />

          {/* Delete Button */}
          <button
            onClick={() => handleDeleteDay(index)}
            className="bg-red-500 w-fit text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Delete
          </button>
        </div>

        {/* React Quill Editor Section */}
        <div className="w-[65%]">
          <ReactQuill
            value={day.content}
            onChange={(value) => handleDayWiseChange(index, value)} // Update day content
            placeholder="Enter day content"
            className="rounded-lg p-3 border focus:ring-2 focus:ring-blue-500"
            style={{ 
              maxHeight: '200px', // Set the max height
              overflowY: 'auto',   // Enable vertical scroll
            }}
          />
        </div>
      </div>
    </div>
  ))}
</div>


    {/* Pagination */}
    <div className="flex justify-between items-center">
      <button
        onClick={() => handlePageChange({ selected: currentPage - 1 })}
        disabled={currentPage === 0}
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
      >
        Prev
      </button>
      <button
        onClick={() => handlePageChange({ selected: currentPage + 1 })}
        disabled={(currentPage + 1) * itemsPerPage >= dayWiseData.length}
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
      >
        Next
      </button>
    </div>
  </div>
)}

       {/* Submit Button in the Last Tab */}
       {activeTab === 7 && (
            <div className="mt-6 flex justify-center">
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                onClick={() => handleSubmit()}
              >
                {loading ? (
        <div className="w-6 h-6 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>  // Spinner
      ) : (
        "Submit Package" 
      )}

                
              </button>
            </div>
          )}




      </div>
    </HomeLayout>
  );
};

export default PackageSetup;
