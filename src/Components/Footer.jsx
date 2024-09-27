import React, { useEffect } from 'react'
import {
    BsFacebook,
    BsInstagram,
    BsLinkedin,
    BsTwitter,
    BsWhatsapp
} from 'react-icons/bs'

import { MdKeyboardDoubleArrowRight, MdOutlineSmartphone } from "react-icons/md";
import { CiClock1 } from "react-icons/ci";
import { IoMdMail } from "react-icons/io";

import { Link } from 'react-router-dom'
import { FaLocationDot } from 'react-icons/fa6';


const Footer = () => {

    const listStyle = "text-[0.95rem] hover:pl-2 flex items-center gap-1 hover:bg-clip-text hover:text-white hover:bg-[linear-gradient(to_right,#16BB84,#FF8900)] font-semibold  text-[#CFCCE4] transition-all duration-300 ease-in-out"
    const contactStyle = "text-[0.95rem] flex items-start sm:items-center lg:items-start gap-1 hover:bg-clip-text hover:text-white hover:bg-[linear-gradient(to_right,#16BB84,#FF8900)] font-semibold  text-[#CFCCE4] "

    const year = new Date().getFullYear()


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    return (
        <footer className='text-white bg-gradient-to-b from-[#2F3349] to-[#2F3349]'>
            {/* <img src={footerImg} alt="" className='absolute h-full w-[100vw]' /> */}
            <div className='flex  relative flex-col xl:flex-row p-[2.5rem_1rem] md:p-[2.5_5rem] gap-8 xl:justify-around'>
                <div className='flex flex-col gap-2'>
                    <Link to="/" className='mb-3'><img className='w-[5rem]' alt="" src={''} />LOGO</Link>
                    <p className='leading-6 xl:w-[23rem] w-full'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique illo molestiae mollitia odio minus vel? Doloremque nam beatae nemo laborum quam iure nesciunt ducimus eius. Quia eius impedit quidem ducimus dicta, sunt veniam maiores corrupti dolor, optio facilis accusamus eos earum. Est perferendis aperiam nostrum voluptate dolores vel odit blanditiis.</p>
                    <div className='flex gap-4 mt-3'>
                        <a href="" className='text-[20px]'><BsLinkedin /></a>
                        <Link to="" target='_blank' className='text-[20px]'><BsFacebook /></Link>
                        <Link to={'https://wa.me/6207234759?text=Hello'} target='_blank' className='text-[20px]'><BsWhatsapp /></Link>
                        <a href="" className='text-[20px]'><BsInstagram /></a>
                        <a href="" className='text-[20px]'><BsTwitter /></a>
                    </div>
                </div>
                <div className='flex flex-col justify-between gap-8 md:gap-6 md:flex-row'>
                    <div className='flex flex-col w-[80vw] md:w-[60%] gap-8 sm:flex-row sm:justify-between md:gap-6 lg:gap-10'>
                        <div className='w-[80vw] sm:w-[50%] md:w-[14rem]'>
                            <div>
                                <p className='text-[1.09rem] font-[600]'>ABOUT US</p>
                                <p className='w-[80vw] sm:w-[80%] md:w-[12rem] lg:w-[15rem] m-[9px_0] h-[3.4px] bg-[linear-gradient(to_right,#35C8F2,#27B872)] rounded-md'></p>
                            </div>
                            <div className='flex flex-col gap-4 mt-6 '>
                                <Link to={'/'} className={listStyle}><MdKeyboardDoubleArrowRight />Our Portfolio</Link>
                                <Link to={'/'} className={listStyle}><MdKeyboardDoubleArrowRight />Company</Link>
                                <Link to='/our-services' className={listStyle}><MdKeyboardDoubleArrowRight />Services</Link>

                                <Link to={'/'} className={listStyle}><MdKeyboardDoubleArrowRight />Blog</Link>
                                <Link to='/contact' className={listStyle}><MdKeyboardDoubleArrowRight />Contact</Link>

                            </div>
                        </div>
                        <div className='w-ful sm:w-[50%] md:w-[14rem] '>
                            <div>
                                <p className='text-[1.09rem] font-[600]'>OUR SERVICES</p>
                                <p className='w-[80vw] sm:w-[80%] lg:w-[15rem] md:w-[12rem] m-[9px_0] h-[3.4px] bg-[linear-gradient(to_right,#35C8F2,#27B872)] rounded-md'></p>
                            </div>
                            <div className='flex flex-col gap-4 mt-6 '>
                                <Link to={'/service3'} className={listStyle}><MdKeyboardDoubleArrowRight />Get a guider</Link>
                                <Link to={'/service9'} className={listStyle}><MdKeyboardDoubleArrowRight />Temple visit</Link>
                                <Link to={'/service2'} className={listStyle}><MdKeyboardDoubleArrowRight />Book boats</Link>
                                <Link to={'/service11'} className={listStyle}><MdKeyboardDoubleArrowRight />Book car</Link>
                                <Link to={'/service4'} className={listStyle}><MdKeyboardDoubleArrowRight />Book hotel</Link>


                            </div>
                        </div>
                    </div>
                    <div className='md:w-[16rem] w-[80vw]'>
                        <div>
                            <p className='text-[1.09rem] font-[600]'>CONTACT US</p>
                            <p className='w-[80vw] md:w-[16rem] m-[9px_0] h-[3.4px] bg-[linear-gradient(to_right,#35C8F2,#27B872)] rounded-md'></p>
                        </div>
                        <div className='flex flex-col gap-4 mt-6 '>
                            <Link to={'/'} className={`${contactStyle} lg:items-center`}><CiClock1 />time</Link>
                            <Link to={'/'} className={`${contactStyle} lg:items-center`}><MdOutlineSmartphone />+91 6207234759</Link>
                            <Link to={'/'} className={`${contactStyle} lg:items-center`}><IoMdMail />info@name.in</Link>
                            <Link to={'/'} className={`${contactStyle} lg:items-center`}><FaLocationDot /> Varanasi, India</Link>
                            <Link to={'/'} className={`${contactStyle} md:items-start`}><FaLocationDot className='md:text-[1.7rem] text-[1rem] items-center' />Lorem ipsum dolor sit amet.</Link>
                        </div>
                    </div>
                </div>

            </div>
            <div className='text-center text-white text-[1.05rem] font-[600] p-3 bg-gradient-to-r from-[#0C1015] via-[#183134] to-[#0C1015] '><span >&#169;</span> {year} | Copyright <span className='bg-clip-text text-transparent bg-[linear-gradient(to_right,#35C8F2,#27B872)]'>Name</span> - All Rights Reserved</div>
        </footer >

    )
}

export default Footer