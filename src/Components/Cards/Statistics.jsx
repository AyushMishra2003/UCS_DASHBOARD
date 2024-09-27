import React from 'react';
import { IoCarSportOutline } from "react-icons/io5";
import HorizontalBar from './HorizontalBar'; // Adjust the path as needed

// Utility function for formatting numbers
const formatNumber = (num) => {
    if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(1) + 'M';
    } else if (num >= 1_000) {
        return (num / 1_000).toFixed(1) + 'K';
    } else {
        return num.toString();
    }
};

const CarStatistics = () => {
    // Temporary data for car statistics
    const totalCustomers = 1200;
    const totalOngoingBookings = 85;
    const totalCancelledBookings = 20;
    const totalCompletedBookings = 650;
    const totalUpcomingBookings = 45;

    // Data for the horizontal bar chart
    const labels = ['Total Customers', 'Ongoing Bookings', 'Cancelled Bookings', 'Completed Bookings', 'Upcoming Bookings'];
    const data = [totalCustomers, totalOngoingBookings, totalCancelledBookings, totalCompletedBookings, totalUpcomingBookings];
    const colors = ['#00a5bb', '#e61e24', '#ff5900', '#00b753', '#655CCE'];

    return (
        <div className='flex flex-col justify-between gap-[1.1rem] lg:flex-row'>
            <div className='p-4 w-full bg-white rounded-md shadow-[0px_0px_12px_-5px_#808080]'>
                <h1 className='text-[1.2rem] mb-4 font-semibold text-[#5F54D5]'>Car Statistics</h1>
                <div className='grid justify-between grid-cols-2 gap-4 lg:grid-cols-2 xl:grid-cols-3 sm:grid-cols-3'>
                    <div className='flex items-center gap-4 w-fit'>
                        <div className='bg-[#D6F4F8] w-fit p-[10px] rounded-md'>
                            <IoCarSportOutline className='text-[#00a5bb] text-[1.25rem]' />
                        </div>
                        <div className='mb-[7px]'>
                            <p className='font-semibold text-[1.35rem] text-[#353535]'>{formatNumber(totalCustomers)}</p>
                            <p className='text-[0.82rem] font-semibold text-[#737373]'>Total Customers</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 w-fit'>
                        <div className='bg-[#FFE2E3] w-fit p-[10px] rounded-md'>
                            <IoCarSportOutline className='text-[#e61e24] text-[1.25rem]' />
                        </div>
                        <div className='mb-[7px]'>
                            <p className='font-semibold text-[1.35rem] text-[#353535]'>{formatNumber(totalOngoingBookings)}</p>
                            <p className='text-[0.82rem] font-semibold text-[#737373]'>Ongoing Bookings</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 w-fit'>
                        <div className='bg-[#ffebd8] w-fit p-[10px] rounded-md'>
                            <IoCarSportOutline className='text-[#ff5900] text-[1.25rem]' />
                        </div>
                        <div className='mb-[7px]'>
                            <p className='font-semibold text-[1.35rem] text-[#353535]'>{formatNumber(totalCancelledBookings)}</p>
                            <p className='text-[0.82rem] font-semibold text-[#737373]'>Cancelled Bookings</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 w-fit'>
                        <div className='bg-[#DDF6E8] w-fit p-[10px] rounded-md'>
                            <IoCarSportOutline className='text-[#00b753] text-[1.25rem]' />
                        </div>
                        <div className='mb-[7px]'>
                            <p className='font-semibold text-[1.35rem] text-[#353535]'>{formatNumber(totalCompletedBookings)}</p>
                            <p className='text-[0.82rem] font-semibold text-[#737373]'>Completed Bookings</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 w-fit'>
                        <div className='bg-[#E9E7FD] w-fit p-[10px] rounded-md'>
                            <IoCarSportOutline className='text-[#655CCE] text-[1.25rem]' />
                        </div>
                        <div className='mb-[7px]'>
                            <p className='font-semibold text-[1.35rem] text-[#353535]'>{formatNumber(totalUpcomingBookings)}</p>
                            <p className='text-[0.82rem] font-semibold text-[#737373]'>Upcoming Bookings</p>
                        </div>
                    </div>
                </div>
                <HorizontalBar labels={labels} data={data} colors={colors} />
            </div>
        </div>
    );
};

export default CarStatistics;
