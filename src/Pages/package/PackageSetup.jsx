import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import HomeLayout from '../../Layouts/HomeLayouts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { RxCross1 } from "react-icons/rx";
import { addPackage, getPackageCategory, getPackageInclude, getPackageTag, updatePackage } from '../../Redux/Slices/packageSlice';
import { MdDelete } from 'react-icons/md';
import { Toaster, toast } from 'sonner'
import { useLocation } from 'react-router-dom';

const PackageSetup = () => {
    const [activeTab, setActiveTab] = useState(0);
    

    const location=useLocation()

    const {state}=location

    console.log("state is",state);
  
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
    const [termConditon,setTermCondition]=useState('')
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [checkedItems, setCheckedItems] = useState([]); // State to store selected items
    const [selectedCategories, setSelectedCategories] = useState([]); // State for selected categories\
    const [tagData,setTagData]=useState([])  
    const [customValue, setCustomValue] = useState("");
    const [selectedValue, setSelectedValue] = useState("");
    const [destinationType, setDestinationType] = useState("");
    const [routes,setRoutes]=useState([])
    
  


    const fetchInclude = async () => {
      await dispatch(getPackageInclude());
    };
  

    const [includeDetails, setIncludeDetails] = useState({
      hotelIncluded: false,
      mealIncluded: false,
      dummyOption: false
    });


  
    const { packageCategory, packageInclude, packageTag, error } = useSelector((state) => state.package);



    const handleSelectChange = (event) => {
      console.log(event);
      
      const value = event.target.value;
      if (value === "custom") {
        setSelectedValue(""); // Clear the selected value
      } else {
        setSelectedValue(value);
        setCustomValue(""); // Clear the custom value
      }
    };
  
    const handleCustomInputChange = (event) => {
      setCustomValue(event.target.value);
      setSelectedValue(""); // Clear the selected value
    };
  
    
  
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
   
    // const handleCategoryChange = (e) => {
    //   setSelectedCategory(e.target.value); // Update selected category
    // };
   
    const handleDestinationTypeChange = (e) => {
      setDestinationType(e.target.value);
    };
  

    // Submit button
    const handleSubmit = async () => {
      setLoading(true)
      const formData = new FormData();
    
      // Add basic fields to FormData
      formData.append('packageName', basicDetails.packageName);
      formData.append('dateFrom', basicDetails.fromDate.toISOString());
      formData.append('dateTo', basicDetails.toDate.toISOString());
      formData.append('duration', basicDetails.duration);
      formData.append('rate', basicDetails.rate);
      formData.append('location', basicDetails.location);
    
      // Add mainPhoto to FormData (check if file exists)
      if (basicDetails.mainPhoto instanceof File) {
        formData.append('mainPhoto', basicDetails.mainPhoto);
      }
    
      // Add photos to FormData (check if array is valid and contains files)
      if (Array.isArray(photos) && photos.length > 0) {
        photos.forEach((photo) => {
          if (photo instanceof File) {
            formData.append('photos', photo); // Multer will handle multiple files
          }
        });
      }
    
      // Add other fields like inclusive, exclusive, etc.
      formData.append('inclusive', inclusive);
      formData.append('exclusive', exclusive);
      formData.append('bookingPolicy', bookingPolicy);
      formData.append('termsAndCondition', termConditon);
      formData.append('rateBy',customValue)
      formData.append('destinationType',destinationType)


      formData.append('routes',JSON.stringify(routes))
  
       
    
      // Add day-wise data to FormData
      dayWiseData.forEach((day, index) => {
        formData.append(`dayWise[${index}][date]`, index+1);
        formData.append(`dayWise[${index}][content]`, day.content);
      });

        // Prepare the included items array similar to your example
  const includedDetailsArray = [];
  checkedItems.forEach((item) => {
    includedDetailsArray.push(item); // Add checked items to the array
  });

  const categoriesDetails=[]
  
  selectedCategories.forEach((item)=>{
    categoriesDetails.push(item)
  })

   
  const packageTag=[]

  tagData.forEach((item)=>{
      packageTag.push(item)
  })




  // Append the array of included items to FormData
   
 
  

  formData.append('includedPackages', JSON.stringify(includedDetailsArray));
  formData.append('categories', JSON.stringify(categoriesDetails));
  formData.append("packageTag",JSON.stringify(tagData))
    
      try {
        // Call your API
        const response = state
          ? await dispatch(updatePackage({ formData, id: state._id }))
          : await dispatch(addPackage(formData));

          console.log("submit response is",response);
           
          
          
          if(response?.payload?.package){
                setBasicDetails({
                  packageName: '',
                  fromDate: new Date(), // Initialize with current date
                  toDate: new Date(),   // Initialize with current date
                  duration: '',
                  rate: '',
                  location: '',
                  mainPhoto: null,
                }
            )
            setInclusive('')
            setExclusive('')
            setBookingPolicy('')
            setTermCondition('')
            setPhotos([])
            setIncludeDetails([])
            setCheckedItems([])
            setSelectedCategories([])
            setTagData([])
            

          }

    
        console.log('Response:', response);
        setActiveTab(0)
      } catch (error) {
        console.error('Error while submitting:', error);
      }
      setLoading(false)

    };
  

    const fetchData = async () => {
      const response = await dispatch(getPackageCategory());
 
    };

      // Function to handle adding a new route
  const addRoute = (newRoute) => {
    if (routes.length < 4 && newRoute.trim() !== '') {
      setRoutes((prevRoutes) => [...prevRoutes, newRoute.trim()]);
    }
  };

    // Function to handle removing a route
    const removeRoute = (index) => {
      const updatedRoutes = routes.filter((_, i) => i !== index);
      setRoutes(updatedRoutes);
    };
     
     
     // JSX remains the same
     
     const [selectedInclude, setSelectedInclude] = useState(null);

     const handleCheckboxChange1 = (includeName) => {
       setSelectedInclude((prev) => (prev === includeName ? null : includeName));
     };
   
     const handleSave = () => {
       // Dispatch action or API call to save selectedInclude
       console.log("Selected Include:", selectedInclude);
       dispatch({
         type: "SAVE_SELECTED_INCLUDE",
         payload: selectedInclude,
       });
     };
    

     useEffect(() => {
      fetchInclude();
    }, []);
  
    const handleCheckboxChange = (item) => {
      setCheckedItems((prev) =>
        prev.includes(item)
          ? prev.filter((i) => i !== item) // Remove if already checked
          : [...prev, item] // Add if not already checked
      );
    };

    const handleCheckboxTag = (item) => {
      setTagData((prev) =>
        prev.includes(item)
          ? prev.filter((i) => i !== item) // Remove if already checked
          : [...prev, item] // Add if not already checked
      );
    };
   
     
    const handlePackageTag=async()=>{
        const response=await dispatch(getPackageTag())
    }


    useEffect(()=>{
          fetchData()
    },[])

    useEffect(()=>{
    fetchInclude()
    },[])

    useEffect(()=>{
        handlePackageTag() 
    },[])


      // Pre-fill logic
  useEffect(() => {
    if (state) {
      // Set form fields with state data if available
      setBasicDetails({
        packageName: state.packageName || '',
        fromDate: new Date(state.dateFrom) || new Date(),
        toDate: new Date(state.dateTo) || new Date(),
        duration: state.duration || '',
        rate: state.rate || '',
        location: state.location || '',
        mainPhoto: state.mainPhoto || null,
      });

      setInclusive(state.inclusive || '');
      setExclusive(state.exclusive || '');
      setBookingPolicy(state.bookingPolicy || '');
      setTermCondition(state.termsAndCondition || '');
      setPhotos(state.photos || []);
      setSelectedCategories(state?.categoriesDetails || []);
      setCheckedItems(state?.includedDetails || []);
      setTagData(state?.packageTagDetail || []);
      if (Array.isArray(state.dayWise)) {
        const formattedDayWise = state.dayWise.map((day) => ({
          date: new Date(day.date), // Convert date strings to Date objects
          content: day.description || '', // Default to empty string if no content
        }));
        setDayWiseData(formattedDayWise);
      }
      setCustomValue(state?.rateBy || "")
      setDestinationType(state?.destinationType || "")
      setRoutes(state?.routesDetail || [])
    }
  }, [state]);


  console.log("routes is ",routes);
  



  return (
    <HomeLayout>
      <div className=" mx-auto">

        <h1 className='text-center mb-10 text-black font-bold text-4xl'>PACKAGE ADDED </h1>

        <div className="flex items-center justify-center space-x-4 mb-6 mx-auto py-2 border-b-2 border-[#e9dddd]">
  {[
    'Basic Details',
    'Photos',
    'Inclusive',
    'Exclusive',
    'Booking Policy',
    'Terms and Conditions',
    'Day Wise',
    'Routes',
    'Submit'
  ].map((tab, index, array) => (
    <React.Fragment key={index}>
      {/* Tab Button */}
      <button
        className={`relative z-10 px-3 py-1.5 rounded-full text-center transition text-sm font-medium truncate ${
          activeTab === index
            ? 'bg-blue-500 text-white shadow-md'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
        }`}
        onClick={() => handleTabChange(index)}
        style={{ minWidth: '80px', maxWidth: '120px' }} // Ensures uniform size
      >
        {tab}
      </button>

      {/* Connector for all but last tab */}
      {index < array.length - 1 && (
        <div className="flex-grow flex items-center space-x-1">
          <span className="h-1.5 w-1.5 rounded-full bg-gray-400"></span>
          <span className="flex-grow border-dotted border-t border-gray-400"></span>
          <span className="h-1.5 w-1.5 rounded-full bg-gray-400"></span>
        </div>
      )}
    </React.Fragment>
  ))}
        </div>


       <div className='container mx-auto '>
   

        {/* Tab Content */}
        {activeTab === 0 && (
    <div className="space-y-8 border-2 border-gray-300 p-8 max-w-5xl mx-auto mt-10 bg-white rounded-md shadow-md">
    {/* Package Name and Date */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Package Name</label>
        <input
          type="text"
          name="packageName"
          value={basicDetails.packageName}
          onChange={handleBasicDetailsChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter package name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <div className="flex space-x-4">
          {/* From Date */}
          <DatePicker
            selected={basicDetails.fromDate}
            onChange={(date) => handleDateChange('fromDate', date)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            dateFormat="yyyy-MM-dd"
          />
          {/* To Date */}
          <DatePicker
            selected={basicDetails.toDate}
            onChange={(date) => handleDateChange('toDate', date)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            dateFormat="yyyy-MM-dd"
          />
        </div>
      </div>
    </div>
  
    {/* Duration and Rate */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Duration (in days)</label>
        <input
          type="number"
          name="duration"
          value={basicDetails.duration}
          onChange={handleBasicDetailsChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="e.g., 7"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Rate</label>
        <input
          type="number"
          name="rate"
          value={basicDetails.rate}
          onChange={handleBasicDetailsChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="e.g., 1000"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Main Photo</label>
        <input
          type="file"
          onChange={handleMainPhotoChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
    </div>
  
    {/* Includes, Tags, and Categories */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div>
        <h2 className="text-md font-semibold text-gray-800 mb-3">Selected Includes</h2>
        {error && <p className="text-red-500 mb-2">Error: {error}</p>}
        <div className="grid grid-cols-1 gap-2">
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
      </div>
  
   {/* Tag Name */}
<div>
  <h2 className="text-md font-semibold">Select Tag-</h2>
  {error && <p className="text-red-500">Error: {error}</p>}

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"> {/* Adjusted for two columns */}
    {packageTag?.map((include, index) => (
      <div key={index} className="flex items-center">
        <input
          type="checkbox"
          id={`include-${index}`}
          className="mr-2"
          checked={tagData.includes(include.tagName)}
          onChange={() => handleCheckboxTag(include.tagName)}
        />
        <label htmlFor={`include-${index}`} className="text-sm">
          {include.tagName}
        </label>
      </div>
    ))}
  </div>
</div>

  
      <div>
        <h2 className="text-md font-semibold text-gray-800 mb-3">Select Categories</h2>
        <div className="grid grid-cols-1 gap-2">
          {packageCategory?.map((category) => (
            <div key={category._id} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${category._id}`}
                className="mr-2"
                value={category.categoryName}
                checked={selectedCategories.includes(category.categoryName)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCategories([...selectedCategories, category.categoryName]);
                  } else {
                    setSelectedCategories(
                      selectedCategories.filter((cat) => cat !== category.categoryName)
                    );
                  }
                }}
              />
              <label htmlFor={`category-${category._id}`} className="text-sm">
                {category.categoryName}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  
    {/* Rate Selection */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <div className="space-y-4">
  <h2 className="text-md font-semibold">Select Package Rate By:</h2>
  <div className="flex flex-col space-y-2">
    {/* Input with Suggestions */}
    <input
      type="text"
      list="rateSuggestions"
      placeholder="e.g., per person, per day"
      value={customValue}
      onChange={handleCustomInputChange}
      className="w-full p-2 border border-gray-300 rounded-md"
    />
    <datalist id="rateSuggestions">
      <option value="per person" />
      <option value="per day" />
      <option value="per trip" />
    </datalist>
  </div>

  <div className="mt-2">
    <h3 className="text-sm font-semibold">Selected Rate:</h3>
    <p className="text-gray-700">
      {customValue || "None selected"}
    </p>
  </div>
</div>

<div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Destination Type
      </label>
      <select
        value={destinationType}
        onChange={handleDestinationTypeChange}
        className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring focus:ring-blue-300"
      >
        <option value="">Select an option</option>
        <option value="home">Home</option>
        <option value="topDestination">Top Destination</option>
        <option value="both">Both</option>
      </select>

      <div className="mt-4">
        <h3 className="text-sm font-semibold">Selected Destination Type:</h3>
        <p className="text-gray-700">
          {destinationType || "No destination type selected"}
        </p>
      </div>
    </div>


    </div>
  
    {/* Navigation Buttons */}
    <div className="flex justify-between mt-6">
      <button
        disabled={activeTab === 0}
        onClick={() => setActiveTab(activeTab - 1)}
        className={`px-6 py-2 rounded-md ${
          activeTab === 0
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Previous
      </button>
      <button
        onClick={() => setActiveTab(activeTab + 1)}
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Next
      </button>
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
            src={photo instanceof Blob ? URL.createObjectURL(photo) : photo?.secure_url}
            alt={`Uploaded Photo ${index + 1}`}
            className="w-full h-32 object-cover rounded-md"
          />
          <div className="absolute top-0 right-0 p-2 bg-black bg-opacity-50">
            <button
              onClick={() => handleDeletePhoto(index)}
              className="text-white mr-2"
            >
              <MdDelete className="text-red-500 text-2xl" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
             )}

             {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              disabled={activeTab === 0}
              onClick={() => setActiveTab(activeTab - 1)}
              className={`px-6 py-2 rounded-md ${
                activeTab === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => setActiveTab(activeTab + 1)}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Next
            </button>
          </div>

          </div>
        )}

        {/* Other Tabs */}
        {activeTab === 2 && (
          <div className="mt-4 max-w-4xl mx-auto">
            <label>Inclusive</label>
            <ReactQuill value={inclusive} onChange={setInclusive} className="w-full" />
            {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              disabled={activeTab === 0}
              onClick={() => setActiveTab(activeTab - 1)}
              className={`px-6 py-2 rounded-md ${
                activeTab === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => setActiveTab(activeTab + 1)}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Next
            </button>
          </div>
          </div>
          
        )}

        {activeTab === 3 && (
          <div className="mt-4 max-w-4xl mx-auto">
            <label>Exclusive</label>
            <ReactQuill value={exclusive} onChange={setExclusive} className="w-full" />
             {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              disabled={activeTab === 0}
              onClick={() => setActiveTab(activeTab - 1)}
              className={`px-6 py-2 rounded-md ${
                activeTab === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => setActiveTab(activeTab + 1)}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Next
            </button>
          </div>
          </div>
        )}

        {activeTab === 4 && (
          <div className="mt-4 max-w-4xl mx-auto">
            <label>Booking Policy</label>
            <ReactQuill value={bookingPolicy} onChange={setBookingPolicy} className="w-full" />
            {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              disabled={activeTab === 0}
              onClick={() => setActiveTab(activeTab - 1)}
              className={`px-6 py-2 rounded-md ${
                activeTab === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => setActiveTab(activeTab + 1)}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Next
            </button>
          </div>
          </div>
        )}


         {activeTab === 5 && (
          <div className="mt-4 max-w-4xl mx-auto">
            <label>Term and Conditions</label>
            <ReactQuill value={termConditon} onChange={setTermCondition} className="w-full" />
            {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              disabled={activeTab === 0}
              onClick={() => setActiveTab(activeTab - 1)}
              className={`px-6 py-2 rounded-md ${
                activeTab === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => setActiveTab(activeTab + 1)}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Next
            </button>
          </div>  
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
      {dayWiseData
        .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
        .map((day, index) => {
          const actualIndex = currentPage * itemsPerPage + index + 1; // Absolute day number
          return (
            <div key={actualIndex} className="bg-white p-4 rounded-lg shadow-lg space-y-4">
              {/* Container for date and content */}
              <div className="flex items-start space-x-6">
                {/* Day Number Section */}
                <div className="flex flex-col items-start space-y-4 w-[30%]">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700">Day:</label>
                    <input
                      type="number"
                      value={actualIndex} // Shows the absolute day number
                      readOnly
                      className="text-gray-700 bg-gray-100 px-2 py-1 rounded-md w-16 text-center"
                    />
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteDay(currentPage * itemsPerPage + index)} // Pass the correct index
                    className="bg-red-500 w-fit text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>

                {/* React Quill Editor Section */}
                <div className="w-[65%]">
                  <ReactQuill
                    value={day.content}
                    onChange={(value) =>
                      handleDayWiseChange(currentPage * itemsPerPage + index, value) // Update content
                    }
                    placeholder="Enter day content"
                    className="rounded-lg p-3 border focus:ring-2 focus:ring-blue-500"
                    style={{
                      maxHeight: '200px', // Set the max height
                      overflowY: 'auto', // Enable vertical scroll
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
    </div>

    {/* Day-wise Navigation */}
    <div className="flex justify-between mt-6">
      {/* Previous Day Button */}
      <button
        onClick={() => {
          if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
          }
        }}
        className={`px-4 py-2 bg-gray-200 text-sm rounded-md hover:bg-gray-300 ${
          currentPage === 0 ? 'cursor-not-allowed text-gray-500' : 'text-gray-700'
        }`}
        disabled={currentPage === 0}
      >
        Previous Day
      </button>

      {/* Next Day Button */}
      <button
        onClick={() => {
          if ((currentPage + 1) * itemsPerPage < dayWiseData.length) {
            setCurrentPage(currentPage + 1);
          }
        }}
        className={`px-4 py-2 bg-gray-200 text-sm rounded-md hover:bg-gray-300 ${
          (currentPage + 1) * itemsPerPage >= dayWiseData.length ? 'cursor-not-allowed text-gray-500' : 'text-gray-700'
        }`}
        disabled={(currentPage + 1) * itemsPerPage >= dayWiseData.length}
      >
        Next Day
      </button>
    </div>

    {/* Pagination (Previous and Next Page) */}
    <div className="flex  justify-between mt-6">
      <div>
        
      </div>
    

      <button
              disabled={activeTab === 0}
              onClick={() => setActiveTab(activeTab - 1)}
              className={`px-6 py-2 rounded-md ${
                activeTab === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => setActiveTab(activeTab + 1)}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Next
            </button>
    </div>
  </div>
        )}

        {activeTab===7 && (
      <div className='px-10'>
      <p>Routes</p>

      {/* Input and button to add a new route */}
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          id="newRoute"
          className="p-2 border rounded-md"
          placeholder="Enter route"
          maxLength={100}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addRoute(e.target.value);
              e.target.value = ''; // Clear input field after adding route
            }
          }}
        />
        <button
          onClick={() => {
            const newRoute = document.getElementById('newRoute').value;
            addRoute(newRoute);
            document.getElementById('newRoute').value = ''; // Clear input field
          }}
          disabled={routes.length >= 4}
          className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
        >
          Add Route
        </button>
      </div>

      {/* Displaying added routes */}
      <div>
        <h3 className="font-semibold text-lg">Added Routes:</h3>
        <ul className="space-y-2">
          {routes.map((route, index) => (
            <li key={index} className="flex space-x-4 items-center text-md text-black">
              <span>{route}</span>
              <button
                onClick={() => removeRoute(index)}
                className="text-red-500 hover:text-red-700 border border-red-500 px-[0.2rem] py-[0.2rem]"
              >
                <RxCross1/>
              </button>
            </li>
          ))}
        </ul>
        {routes.length >= 4 && (
          <p className="text-red-500 mt-2">You can only add up to 4 routes.</p>
        )}
      </div>
    </div>
        )}



       {/* Submit Button in the Last Tab */}
       {activeTab === 8 && (
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




      </div>
    </HomeLayout>
  );
};

export default PackageSetup;

