import React from 'react'
import deniedImg from '../../assets/deniedImg.png'
import bgShape from '../../assets/bgShape.png'
import { useNavigate } from 'react-router-dom'
const DeniedPage = () => {

    const navigate = useNavigate()

    return (
        <div className='flex flex-col justify-between h-screen'>
            <div className='flex flex-col items-center'>
                <h1 className='text-[5.8rem] leading-[5.8rem] mb-1 font-semibold text-[#444050]'>401</h1>
                <h3 className='text-[1.5rem] mb-1 text-[#444050] font-semibold'>You are not authorized 🔐</h3>
                <p className='text-[#6D6B77] text-center'>You don&apos;t have permission to access this page. Go Home!</p>
                <button onClick={() => navigate("/")} className='bg-[#7367F0] hover:bg-[#5d53ce] transition-all duration-500 font-semibold mt-6 text-white p-[6px] px-[17px] shadow-[0px_5px_16px_-4px_#808080] rounded'>Back to home</button>
            </div>
            <div className='relative flex items-center justify-center'>
                <img className='h-[64vh]' src={deniedImg} alt="Denied vector" />
                <img className='absolute h-[40vh] bottom-0 w-full' src={bgShape} alt="Denied vector" />
            </div>
        </div>
    )
}

export default DeniedPage
