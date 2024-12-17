import React, { useEffect, useState } from 'react';
import HomeLayout from '../../Layouts/HomeLayouts';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllInquiry, deleteInquiry, getInquiry } from '../../Redux/Slices/dynamicSlice';
import { FaTrashAlt, FaEye } from 'react-icons/fa'; // Importing icons for view and delete
import { useNavigate } from 'react-router-dom';
import { getPackageQuery } from '../../Redux/Slices/packageSlice';

const PackageQuery = () => {
  const dispatch = useDispatch();
  const { inquiryList = [], loading, error } = useSelector((state) => state.dynamic); // Default to an empty array

  const {queryData}=useSelector((state)=>state.package)
  const navigate = useNavigate();

  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [filterByEmail, setFilterByEmail] = useState('');
  const [filterByPhone, setFilterByPhone] = useState(''); // New state for phone number filter
  const [filterByDate, setFilterByDate] = useState('');

  // Fetch inquiries
  const fetchData = async () => {
    await dispatch(getInquiry());
  };

  const fetchPackage = async () => {
    await dispatch(getPackageQuery());
  };

  // Filter inquiries based on email, phone number, and date
  useEffect(() => {
    let filtered = inquiryList || [];

    if (filterByEmail) {
      filtered = filtered.filter((inquiry) => inquiry.email.includes(filterByEmail));
    }

    if (filterByPhone) {
      filtered = filtered.filter((inquiry) => inquiry.phoneNumber.includes(filterByPhone)); // Filtering by phone number
    }

    if (filterByDate) {
      filtered = filtered.filter((inquiry) => inquiry.createdAt.startsWith(filterByDate));
    }

    setFilteredInquiries(filtered);
  }, [filterByEmail, filterByPhone, filterByDate, inquiryList]); // Include filterByPhone in the dependency array

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchPackage()
  }, []);

  const handleDeleteAll = async () => {
    if (window.confirm("Are you sure you want to delete all inquiries?")) {
      const response = await dispatch(deleteAllInquiry());
      if (response?.payload) {
        fetchData(); 
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      const response = await dispatch(deleteInquiry(id));
      if (response?.payload) {
        fetchData();
      }
    }
  };

  if (error) {
    return <p>Error...</p>;
  }

  if (loading) {
    return (
      <div>
        <HomeLayout>
          <p>Loading.....</p>
        </HomeLayout>
      </div>
    );
  }

  console.log("package data is",queryData);
  

  return (
    <HomeLayout>
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4"> Package Inquiries</h1>

        {/* Filter section */}

 

        {/* Inquiry Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Full Name</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Phone Number</th>
                <th className="py-2 px-4 border-b text-left">Adult</th>
                <th className="py-2 px-4 border-b text-left">Childern</th>
                <th className="py-2 px-4 border-b text-left">Infants</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {queryData.length > 0 ? (
                queryData.map((inquiry) => (
                  <tr key={inquiry._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b text-ellipsis whitespace-nowrap overflow-hidden max-w-xs">
                      {inquiry?.name}
                    </td>
                    <td className="py-2 px-4 border-b">{inquiry?.email}</td>
                    <td className="py-2 px-4 border-b">{inquiry?.mobile}</td>
                    <td className="py-2 px-4 border-b">{inquiry?.adults}</td>
                    <td className="py-2 px-4 border-b">{inquiry?.children}</td>
                    <td className="py-2 px-4 border-b">{inquiry?.infants}</td>
               
                    <td className="py-2 px-4 border-b flex items-center space-x-4">
                      {/* View More */}
                      <button className="text-blue-500 text-xl" onClick={() => navigate('/inquiry/detail', { state: { inquiry } })}>
                        <FaEye />
                      </button>
                      {/* Delete */}
                      <button className="text-red-500 text-xl" onClick={() => handleDelete(inquiry._id)}>
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-2 px-4 border-b text-center">
                    No inquiries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </HomeLayout>
  );
};

export default PackageQuery;
