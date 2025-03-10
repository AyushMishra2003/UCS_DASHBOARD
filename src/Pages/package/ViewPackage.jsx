import React, { useEffect, useState } from 'react';
import HomeLayout from '../../Layouts/HomeLayouts';
import { useDispatch, useSelector } from 'react-redux';
import { deletePackage, getPackage } from '../../Redux/Slices/packageSlice';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 5; // Items per page for pagination

const ViewPackage = () => {
  const { packageData, loading, error } = useSelector((state) => state.package);
  const dispatch = useDispatch();
  const navigate=useNavigate()

  // Local state for filtering and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isIncludeModalOpen, setIsIncludeModalOpen] = useState(false);
  const [isIncludeEdit, setIsIncludeEdit] = useState(false);
  const [includeName, setIncludeName] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [visibilityOption, setVisibilityOption] = useState("");
  const [spinloading, setSpinloading] = useState(false);

  const fetchData = async () => {
    await dispatch(getPackage());
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter the package data based on the search term
  const filteredData = packageData?.filter((pkg) =>
    pkg.packageName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil((filteredData?.length || 0) / ITEMS_PER_PAGE);

  // Paginate the filtered data
  const paginatedData = filteredData?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handle changing pages
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };


  const handleDeletePackage=async(data)=>{
    const isConfirm=window.confirm("Are you sure,You want to delete Package")

    if(isConfirm){
      const response=await dispatch(deletePackage(data?._id))
      fetchData()
    }
     
  }

    // Function to toggle modal visibility
    const toggleIncludeModal = () => {
      setIsIncludeModalOpen((prev) => !prev);
      // Optionally reset modal state when closing
      if (isIncludeModalOpen) {
        setIncludeName("");
        setSelectedOption("");
        setVisibilityOption("");
        setIsIncludeEdit(false);
      }
    };
  
    // Function to handle add or edit actions
    const handleAddInclude = () => {
      setSpinloading(true);
  
      // Mock API call or logic for handling add/edit
      setTimeout(() => {
        if (isIncludeEdit) {
          console.log("Edit Test:", {
            name: includeName,
            option: selectedOption,
            visibility: visibilityOption,
          });
        } else {
          console.log("Add Test:", {
            name: includeName,
            option: selectedOption,
            visibility: visibilityOption,
          });
        }
  
        // Reset loading spinner and close modal
        setSpinloading(false);
        toggleIncludeModal();
      }, 1000);
    };

  

  return (
    <HomeLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">View Packages</h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by Package Name..."
            className="w-full md:w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">Error loading packages.</div>
        ) : paginatedData && paginatedData.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
            {/* Table */}
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Photo</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Package Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Rate (₹)</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Duration (Days)</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((pkg) => (
                  <tr key={pkg._id} className="hover:bg-gray-100 cursor-pointer">
                    <td className="border border-gray-300 px-4 py-2">
                      <img
                        src={pkg.mainPhoto?.secure_url}
                        alt={pkg.packageName}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{pkg.packageName}</td>
                    <td className="border border-gray-300 px-4 py-2">{pkg.rate}</td>
                    <td className="border border-gray-300 px-4 py-2">{pkg.duration}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"         onClick={() =>
                            navigate(`/packages/add`, { state: { ...pkg } })
                          } >
                          <FaEdit />
                        </button>
                        
                        <button
                          className="p-2 rounded bg-red-500 text-white hover:bg-red-600 transition" onClick={()=>handleDeletePackage(pkg)}>
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>


            {isIncludeModalOpen && (
  <div className="fixed top-0 left-0 z-[80] w-full h-full flex justify-center items-center bg-black bg-opacity-50 overflow-x-hidden overflow-y-auto" role="dialog">
    <div className="bg-white border shadow-sm rounded-xl w-full max-w-lg pointer-events-auto transition-all ease-out duration-500 mt-7 opacity-100 sm:mx-auto">
      <div className="flex justify-between items-center py-3 px-4 border-b">
        <h3 className="font-bold text-gray-800">{isIncludeEdit ? 'Edit Visible' : 'Add Visible'}</h3>
        <button onClick={toggleIncludeModal} className="w-8 h-8 inline-flex justify-center items-center rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200">
          <span className="sr-only">Close</span>
          <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div className="p-4">
   
        {/* Dropdown Section */}
        <label className="block text-sm font-medium mb-2 text-black mt-4">Select Option</label>
        <select
          className="py-3 px-4 block w-full border border-black rounded-lg text-sm text-black bg-white"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="" disabled>Select an option</option>
          <option value="home">Home</option>
          <option value="topDestination">Top Destination</option>
          <option value="showBoth">Show Both</option>
        </select>

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={toggleIncludeModal} className="py-2 px-3 text-sm font-medium rounded-lg bg-white text-gray-800">Cancel</button>
          <button onClick={handleAddInclude} className="py-2 px-3 text-sm font-medium rounded-lg bg-blue-600 text-white">
            {spinloading ? (
              <div className="w-6 h-6 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
            ) : (
              isIncludeEdit ? 'Save Changes' : 'Change Status'
            )}
          </button>
        </div>
      </div>
    </div>
  </div> 
)}


            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`p-2 bg-gray-300 text-gray-700 rounded ${
                  currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'
                }`}
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 bg-gray-300 text-gray-700 rounded ${
                  currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600">No packages available.</div>
        )}
      </div>
    </HomeLayout>
  );
};

export default ViewPackage;
