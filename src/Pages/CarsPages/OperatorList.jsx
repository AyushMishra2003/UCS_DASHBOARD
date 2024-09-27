import React, { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import HomeLayout from '../../Layouts/HomeLayouts';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye } from 'react-icons/fa';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getOperators, changeStatus } from '../../Redux/Slices/OperaotSlice';

const OperatorList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const list = useSelector((state) => state?.operator?.operators) || [];
    const loading = useSelector((state) => state?.operator?.loading);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    // Fetch data when component mounts or dependencies change
    useEffect(() => {
        const loadData = async () => {
            try {
                const params = { page: currentPage, limit: itemsPerPage };
                const response = await dispatch(getOperators(params)).unwrap();
                setTotalPages(response.totalPages);
            } catch (error) {
                console.error(error);
            }
        };

        loadData();
    }, [currentPage, itemsPerPage, dispatch]);

    // Debounced search handler
    const handleSearch = useCallback(
        debounce((query) => {
            setSearchQuery(query);
            setCurrentPage(1); // Reset to first page when searching
        }, 300),
        []
    );

    // Handle items per page change
    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when items per page changes
    };

    // Handle status change
    const handleStatusChange = async (id, currentStatus, email) => {
        const newStatus = !currentStatus; // Toggle status
        console.log(email);
        
        try {
            await dispatch(changeStatus({email })).unwrap();
            toast.success('Status updated!');
            // You might want to reload the data after changing the status
            dispatch(getOperators({ page: currentPage, limit: itemsPerPage }));
            sendStatusChangeEmail(email, newStatus); // Replace with your actual email sending function
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    // Simulated email sending function
    const sendStatusChangeEmail = (email, status) => {
        console.log(`Sending email to ${email} about status change to ${status ? 'Active' : 'Inactive'}`);
        // Implement your email sending logic here
    };

    // Frontend filtering logic
    const filteredList = list?.filter((data) => {
        const name = data?.name || ''; // Default to empty string if name is undefined
        const matchesSearchQuery = name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatusFilter = statusFilter === '' || data?.status.toString() === statusFilter;
        return matchesSearchQuery && matchesStatusFilter;
    });

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <HomeLayout>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-4 p-3 mt-4 bg-white rounded shadow-[0px_0px_10px_#8080807e]'>
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="bg-white shadow-[0px_0px_15px_#95959577_inset] outline-none text-black rounded p-2 lg:w-[20rem] w-full"
                />
                <div className='flex items-center justify-between w-full lg:w-fit lg:gap-2 xl:gap-10'>
                    <div>
                        <label htmlFor="" className='text-black text-[1.1rem] mr-2'>Status:</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-[#fff] shadow-[0px_0px_15px_#95959577_inset] outline-none text-black rounded p-2 sm:w-[9rem] w-[5.6rem]"
                        >
                            <option value="">All</option>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="" className='text-black text-[1.1rem] mr-2'>Show:</label>
                        <select
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                            className="bg-white shadow-[0px_0px_15px_#95959577_inset] outline-none text-black rounded p-2 sm:w-[6rem] w-[4rem]"
                        >
                            <option value={10}>10</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='mt-2 overflow-x-scroll scrollbar scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-track-gray-50 scrollbar-thumb-gray-200 scrollbar-thin md:w-custom shadow-[0px_0px_10px_#00000029]'>
                <table className='min-w-full'>
                    <thead>
                        <tr>
                            <th className='border-b-2 border-gray-300 p-2 text-left'>Name</th>
                            <th className='border-b-2 border-gray-300 p-2 text-left'>Email</th>
                            <th className='border-b-2 border-gray-300 p-2 text-left'>Status</th>
                            <th className='border-b-2 border-gray-300 p-2 text-left'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredList?.length ? (
                            filteredList.map((data) => (
                                <tr key={data?.id}>
                                    <td className='border-b border-gray-300 p-2'>{data?.name}</td>
                                    <td className='border-b border-gray-300 p-2'>{data?.email}</td>
                                    <td className='border-b border-gray-300 p-2'>
                                        <span
                                            className={`inline-block w-3 h-3 rounded-full ${
                                                data?.status ? 'bg-green-500' : 'bg-red-500'
                                            }`}
                                        ></span>
                                        {data?.status ? 'Active' : 'Inactive'}
                                    </td>
                                    <td className='border-b border-gray-300 p-2'>
                                        <button
                                            onClick={() => handleStatusChange(data?.id, data?.status, data?.email)}
                                            className='text-blue-500 hover:underline'
                                        >
                                            {data?.status ? 'Deactivate' : 'Activate'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className='border-b border-gray-300 p-2 text-center'>
                                    No Operators Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className='flex items-center justify-between mt-4'>
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className='text-blue-500 hover:underline'
                >
                    <GrFormPrevious />
                </button>
                <span className='text-black'>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className='text-blue-500 hover:underline'
                >
                    <GrFormNext />
                </button>
            </div>
        </HomeLayout>
    );
};

export default OperatorList;
