import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaCar, FaHotel, FaArrowDown, FaArrowRight } from "react-icons/fa";
import { HiOutlineXMark } from "react-icons/hi2";
import { CgLogOut } from "react-icons/cg";
import { logout } from '../Redux/Slices/LoginSlice';
import { MdContentPaste, MdOutlineSettings, MdOutlineDashboard } from 'react-icons/md';
import { RxHamburgerMenu } from "react-icons/rx";
import { RiGalleryFill, RiUserLocationFill } from "react-icons/ri";
import userImg from '../assets/user.png';
import { GiSunPriest } from "react-icons/gi";
import { PiUserList } from "react-icons/pi";
import { FaSailboat, FaCircle, FaPersonCircleQuestion } from "react-icons/fa6";
import { RiArrowRightSLine, RiArrowDownSLine } from "react-icons/ri";
import { LuShoppingBag } from "react-icons/lu";
import { FaRegMessage } from "react-icons/fa6";
import { MdBoy } from "react-icons/md";
import { CiViewList } from "react-icons/ci";

const HomeLayout = ({ children }) => {
    const [active, setActive] = useState(false);
    const [dropdownActive, setDropdownActive] = useState(false);
    const [dropdownActive1,setDropdownActive1]=useState(false)
    const [dropdownActive2,setDropdownActive2]=useState(false)
    const [dropdownActive3,setDropdownActive3]=useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const avatar = useSelector((state) => state?.auth?.data?.avatar);
    const fullName = useSelector((state) => state?.auth?.data?.fullName);

    const handleLogout = async () => {
        const response = await dispatch(logout());
        console.log(response);
        

        if (response?.payload?.success) {
            navigate('/login');
        }
    };

    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
            const hours = istTime.getHours();
            const minutes = istTime.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12; // Convert 24 hour format to 12 hour format
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
            setTime(formattedTime);
        };

        updateTime();
        const intervalId = setInterval(updateTime, 1000); // Update time every second

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    const listStyle = 'flex items-center justify-start gap-2 pl-4 p-2 m-[0.4rem] ml-0 mr-3 md:mr-4 rounded-r bg-[#3D4056] hover:bg-[#655CCE] hover:text-white transition-all duration-300 text-[#CBC8E0] font-semibold tracking-wide text-[1.02rem]';
    const activeListStyle = `${listStyle} bg-[#655CCE] text-white`;

    return (
        <>
            <div className='items-start h-[100vh] overflow-hidden md:flex md:flex-row-reverse bg-[#F7F6F9] z-20'>
                <div className='p-3 md:w-full md:p-4 md:px-6 z-10 '>
                    {/* <header className='flex items-center justify-between backdrop-blur-3xl relative z-[1000000] px-3 bg-[#ffffff] rounded-md p-2 md:w-full text-black shadow-[0px_0px_15px_#8080807e]'>
                        <div className='p-2 cursor-pointer md:hidden' onClick={() => setActive(true)}><RxHamburgerMenu className='text-[#535162fa] text-[1.5rem]' /></div>
                        <div className='hidden md:block'></div>
                        <p className=''>{time}</p>
                        <Link to={`/profile/${fullName}`} className='size-[2.6rem] rounded-full overflow-hidden bg-[#b0aaf7fa] border-[0.13rem] border-[#8e85f3a3]'>
                            <img src={avatar?.secure_url || userImg} className='w-[2.6rem]' alt="User Avatar" />
                        </Link>
                    </header> */}
                    <div className='h-[90vh] bg-[#F7F6F9] w-custom scrollbar scrollbar-none overflow-y-scroll'>
                        {children}
                    </div>
                </div>
                <header className={`z-[100000000] h-[100vh] overflow-hidden max-w-[15rem] min-w-[15rem] md:max-w-[16rem] md:min-w-[15.9rem]  bg-[#2f3349] absolute md:static top-0 ${active ? 'left-0' : 'left-[-35rem]'} transition-all duration-500`}>
                    <ul>
                        <li className='flex items-center justify-between p-3 border-b border-[#4f47a9a3] text-[#CBC8E0]'>
                            <Link to={'/'}>LOGO</Link>
                            <div className='p-[7px] md:hidden' onClick={() => setActive(false)}>
                                <HiOutlineXMark className='text-[1.5rem]' />
                            </div>
                        </li>
                        <div className='h-[82vh] overflow-y-scroll scrollbar scrollbar-none'>
                            <li className='mt-4'>
                                <NavLink to={'/'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <MdOutlineDashboard />
                                    Dashboard
                                </NavLink>
                            </li>
                            {/* <li>
                                <NavLink to={'/global-settings'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <MdOutlineSettings />
                                    Global settings
                                </NavLink>
                            </li> */}
                            <li>
                                <NavLink to={'/website-content'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <MdContentPaste />
                                    Website content
                                </NavLink>
                            </li>
                            {/* <li>
                                <NavLink to={'/gallery'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <RiGalleryFill />
                                    Gallery
                                </NavLink>
                            </li> */}
                            <li className='relative'>
                                <div onClick={() => setDropdownActive(!dropdownActive)} className={`${listStyle} cursor-pointer flex items-center justify-between`}>
                                    <div className='flex items-center justify-start gap-2'>
                                        <LuShoppingBag />    <span>Cab Booking</span>
                                    </div>
                                    {dropdownActive ? <RiArrowDownSLine className='text-[1.5rem] font-bold' /> : <RiArrowRightSLine className='text-[1.5rem] font-bold' />}
                                </div>
                                {dropdownActive && (
                                    <ul className='mt-2 ml-4'>
                                        <li>
                                            <NavLink to={'/car-booking'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                                <FaCar />
                                                 Booking List
                                            </NavLink>
                                        </li>
                                        <li>
                                <NavLink to={'/booking'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <FaCar />
                                     Booking
                                </NavLink>
                            </li>
                                      
                                    </ul>
                                )}
                            </li>

                            <li className='relative'>
                                <div onClick={() => setDropdownActive1(!dropdownActive1)} className={`${listStyle} cursor-pointer flex items-center justify-between`}>
                                    <div className='flex items-center justify-start gap-2'>
                                        <LuShoppingBag />    <span>Rate Chart</span>
                                    </div>
                                    {dropdownActive1 ? <RiArrowDownSLine className='text-[1.5rem] font-bold' /> : <RiArrowRightSLine className='text-[1.5rem] font-bold' />}
                                </div>
                                {dropdownActive1 && (
                                    <ul className='mt-2 ml-4'>
                                        <li>
                                <NavLink to={'/chart'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <GiSunPriest />
                                     One Way
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/localRateChart'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <FaSailboat />
                                     Local
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/round'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <FaSailboat />
                                     Round
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/airpotRate'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <FaSailboat />
                                     Airpot
                                </NavLink>
                            </li>
                                       
                                    </ul>
                                )}
                            </li>
                            
                            <li className='relative'>
                                <div onClick={() => setDropdownActive2(!dropdownActive2)} className={`${listStyle} cursor-pointer flex items-center justify-between`}>
                                    <div className='flex items-center justify-start gap-2'>
                                        <LuShoppingBag />    <span>Operator</span>
                                    </div>
                                    {dropdownActive2 ? <RiArrowDownSLine className='text-[1.5rem] font-bold' /> : <RiArrowRightSLine className='text-[1.5rem] font-bold' />}
                                </div>
                                {dropdownActive2 && (
                                    <ul className='mt-2 ml-4'>
                                         <li>
                                <NavLink to={'/operator'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <FaCar />
                                     View Operator
                                </NavLink>
                            </li> 
                            <li>
                                <NavLink to={'/add'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <FaCar />
                                    Add Operator
                                </NavLink>
                            </li>
                                       
                                    </ul>
                                )}
                            </li>

                            <li className='relative'>
                                <div onClick={() => setDropdownActive3(!dropdownActive3)} className={`${listStyle} cursor-pointer flex items-center justify-between`}>
                                    <div className='flex items-center justify-start gap-2'>
                                        <LuShoppingBag />    <span>Cab List</span>
                                    </div>
                                    {dropdownActive2 ? <RiArrowDownSLine className='text-[1.5rem] font-bold' /> : <RiArrowRightSLine className='text-[1.5rem] font-bold' />}
                                </div>
                                {dropdownActive3 && (
                                    <ul className='mt-2 ml-4'>
                                         <li>
                                <NavLink to={'/add/category'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <FaCar />
                                      Add Cab List
                                </NavLink>
                            </li> 
                            <li>
                                <NavLink to={'/category/list'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <FaCar />
                                      View Cab List
                                </NavLink>
                            </li>
                                       
                                    </ul>
                                )}
                            </li>
                            



                            {/* <li>
                                <NavLink to={'/'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <FaCar />
                                     Vendor List
                                </NavLink>
                            </li> */}
                            {/* <li>
                                <NavLink to={'/booking'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <FaCar />
                                     Booking
                                </NavLink>
                            </li> */}
                            {/* <li>
                                <NavLink to={'/operator'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <FaCar />
                                    Operator
                                </NavLink>
                            </li> */}
                      
                            <ul>
                            {/* <li>
                                <NavLink to={'/chart'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <GiSunPriest />
                                   Trip Distance List
                                </NavLink>
                            </li> */}
                            </ul>
                           
                            
                            {/* <li>
                                <NavLink to={'/hotels-list'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <FaHotel />
                                    Hotels list
                                </NavLink>
                            </li> */}
                            {/* <li>
                                <NavLink to={'/guider-list'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <RiUserLocationFill />
                                    Guider list
                                </NavLink>
                            </li> */}
                            {/* <li>
                                <NavLink to={'/users-list'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <PiUserList />
                                    Operator list
                                </NavLink>
                            </li> */}
                               {/* <li>
                                <NavLink to={'/category/list'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <FaSailboat />
                                     Cab List
                                </NavLink>
                            </li> */}
                            <li>
                                <NavLink to={'/discount'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <FaSailboat />
                                     Discount Manager
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/customer'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <MdBoy/>
                                     Customer Details
                                </NavLink>
                            </li>
                            {/* <li>
                                <NavLink to={'/category/list'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <FaSailboat />
                                       CAR LIST
                                </NavLink>
                            </li> */}
                            {/* <li>
                                <NavLink to={'/localRateChart'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <FaSailboat />
                                     Local Rate
                                </NavLink>
                            </li> */}
                         
                        
                            {/* <li>
                                <NavLink to={'/localcategory'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <FaSailboat />
                                     Local Category
                                </NavLink>
                            </li> */}
                            {/* <li>
                                <NavLink to={'/city/search'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <FaSailboat />
                                     Local Search
                                </NavLink>
                            </li> */}
                               <li>
                                <NavLink to={'/vendor'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <FaPersonCircleQuestion />
                                    Vendor List
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/inquiry'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <FaRegMessage/>
                                    Inquiry List
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to={'/view/term/condition'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <CiViewList/>
                                    Term & Condition
                                </NavLink>
                            </li>

                            {/* <li>
                                <NavLink to={'/add/term/condition'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                    <FaRegMessage/>
                                    Add Term & Condition
                                </NavLink>
                            </li> */}

                        </div>
                    </ul>
                    <Link  onClick={handleLogout} className='bg-[#FF4C51] transition-all duration-700 hover:bg-[#685ED4] border-none text-white flex items-center gap-2 pl-4 p-2 m-[0.4rem] ml-0 mr-3 rounded-r md:mr-4 font-semibold text-[1.02rem] tracking-wide'>
                        <CgLogOut className='text-[1.3rem] font-semibold' /> Logout
                    </Link>
                </header>
            </div>
        </>
    );
};

export default HomeLayout;
