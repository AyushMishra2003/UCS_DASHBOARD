import React, { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import HomeLayout from '../../Layouts/HomeLayouts';
import { FaCircle } from 'react-icons/fa';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';

// Temporary data
const operators = [
    { id: '1', fullName: 'John Doe', email: 'john@example.com', phoneNumber: '1234567890', status: 'active' },
    { id: '2', fullName: 'Jane Smith', email: 'jane@example.com', phoneNumber: '2345678901', status: 'inactive' },
    { id: '3', fullName: 'Mike Johnson', email: 'mike@example.com', phoneNumber: '3456789012', status: 'active' },
    { id: '4', fullName: 'Emily Davis', email: 'emily@example.com', phoneNumber: '4567890123', status: 'inactive' },
    { id: '5', fullName: 'Chris Brown', email: 'chris@example.com', phoneNumber: '5678901234', status: 'active' },
    // Add more users as needed
];

const UsersList = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const filteredOperators = operators.filter(operator => 
        operator.fullName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (statusFilter ? operator.status === statusFilter : true)
    );

    useEffect(() => {
        setTotalPages(Math.ceil(filteredOperators.length / itemsPerPage));
    }, [filteredOperators, itemsPerPage]);

    const handleSearch = useCallback(
        debounce((query, status) => {
            setSearchQuery(query);
            setStatusFilter(status);
            setCurrentPage(1);
        }, 300),
        []
    );

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const paginatedOperators = filteredOperators.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <HomeLayout>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-4 p-3 mt-4 bg-white rounded shadow-[0px_0px_10px_#8080807e]'>
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value, statusFilter)}
                    className="bg-white shadow-[0px_0px_15px_#95959577_inset] outline-none text-black rounded p-2 lg:w-[20rem] w-full"
                />
                <div className='flex items-center justify-between w-full lg:w-fit lg:gap-2 xl:gap-10'>
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
            <div className='mt-2 overflow-x-scroll scrollbar  scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-track-gray-50 scrollbar-thumb-gray-200 scrollbar-thin md:w-custom shadow-[0px_0px_10px_#8080807e]'>
                <div className='flex flex-col items-center justify-center gap-[2.5px] min-w-[55.5rem]'>
                    <div className='flex items-center relative justify-between w-full gap-3 bg-[#353a51] rounded-t text-white px-3 py-4 lg:px-6 font-semibold mb-[0.5px]'>
                        <p className='min-w-[3rem] text-center'>S.no</p>
                        <div className='min-w-[13rem] lg:min-w-[15rem] line-clamp-1'>
                            <p>Name</p>
                        </div>
                        <div className='min-w-[13rem] lg:min-w-[15rem] truncate line-clamp-1'>
                            <p>Email</p>
                        </div>
                        <p className='min-w-[7.5rem]  text-center'>Phone number</p>
                        <p className='min-w-[3.3rem] sticky px-2 right-0 bg-[#353a51]  text-center'>Status</p>
                    </div>
                    {loading ? (
                        Array.from({ length: itemsPerPage }).map((_, index) => (
                            <div key={index} className='flex items-center justify-between w-full gap-3 px-3 py-3 text-black bg-white'>
                                <p className='min-w-[3rem] text-center'><Skeleton /></p>
                                <div className='min-w-[13rem] lg:min-w-[15rem] line-clamp-1'>
                                    <p><Skeleton /></p>
                                </div>
                                <div className='min-w-[13rem] lg:min-w-[15rem] truncate line-clamp-1'>
                                    <p><Skeleton /></p>
                                </div>
                                <div className='flex items-center gap-2 min-w-[6.8rem]'>
                                    <Skeleton width={70} />
                                </div>
                                <div className='min-w-[3.3rem] flex items-center justify-center'>
                                    <Skeleton width={24} height={24} />
                                </div>
                            </div>
                        ))
                    ) : (
                        paginatedOperators.map((operator, index) => (
                            <div key={operator.id} className='relative flex items-center justify-between w-full gap-3 px-3 py-3 text-black bg-white'>
                                <p className='min-w-[3rem] text-center'>{(currentPage - 1) * itemsPerPage + index + 1}.</p>
                                <div className='min-w-[13rem] lg:min-w-[15rem] line-clamp-1'>
                                    <p>{operator.fullName}</p>
                                </div>
                                <div className='min-w-[13rem] lg:min-w-[15rem] truncate line-clamp-1'>
                                    <p>{operator.email}</p>
                                </div>
                                <div className='min-w-[7rem] truncate line-clamp-1'>
                                    <p>{operator.phoneNumber}</p>
                                </div>
                                <div className='min-w-[3.3rem] flex items-center justify-center'>
                                    <FaCircle className={`text-[1.45rem] ${operator.status === 'active' ? 'text-green-500' : 'text-red-500'}`} />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className="flex items-center justify-between mt-2 bg-[#353a51] text-white rounded overflow-hidden shadow-[0px_6px_10px_#8080807e]">
                <button
                    className='flex items-center justify-center bg-[#7367F0] p-3'
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                    <GrFormPrevious className='text-[1.4rem] mt-1' /> Previous
                </button>
                <span className='font-semibold '>Page {currentPage} of {totalPages}</span>
                <button
                    className='flex items-center justify-center bg-[#7367F0] p-3'
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}>
                    Next <GrFormNext className='text-[1.4rem] mt-1' />
                </button>
            </div>
        </HomeLayout>
    );
};

export default UsersList;
