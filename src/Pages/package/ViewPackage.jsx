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
                            navigate(`/add/package`, { state: { ...pkg } })
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
