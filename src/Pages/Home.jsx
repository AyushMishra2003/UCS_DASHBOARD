import React, { useState } from 'react'
import CalendarCom from '../Components/CalendarCom'
import HomeLayout from '../Layouts/HomeLayouts'
import Statistics from '../Components/Cards/Statistics'
import MonthlyPaymentsChart from '../Components/Cards/MonthlyPaymentsChart'
import BookingsRevenueChart from '../Components/Cards/BookingsRevenueChart'


const Home = () => {

    return (
        <HomeLayout>
            <div className='m-[0.4rem] mt-5 text-black'>
                <div className='flex flex-col justify-between lg:flex-row'>
                    <div className='lg:w-[49.3%]'>
                        <MonthlyPaymentsChart />

                    </div>
                    <div className='lg:w-[49.3%]'>

                        <BookingsRevenueChart />
                    </div>
                </div>
                {/* <CalendarCom /> */}
                <Statistics />
            </div>
        </HomeLayout>
    )
}

export default Home
