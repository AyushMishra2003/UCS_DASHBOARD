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
    const [dropdownActive1, setDropdownActive1] = useState(false)
    const [dropdownActive2, setDropdownActive2] = useState(false)
    const [dropdownActive3, setDropdownActive3] = useState(false)
    const [dropdownActive4, setDropdownActive4] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const avatar = useSelector((state) => state?.auth?.data?.avatar);
    const fullName = useSelector((state) => state?.auth?.data?.fullName);

    const { role } = useSelector((state) => state.auth1)


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
                        {/* {role && role.lenght > 0 && */}
                            <div className='h-[82vh] overflow-y-scroll scrollbar scrollbar-none'>
                                {role.some(item => item.title === "dashboard") &&
                                    <li className='mt-4'>
                                        <NavLink to={'/'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                            <MdOutlineDashboard />
                                            Dashboard
                                        </NavLink>
                                    </li>
                                }

                                {role.some(item => item.title === "website content") &&
                                    <li>
                                        <NavLink to={'/website-content'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                            <MdContentPaste />
                                            Website content
                                        </NavLink>
                                    </li>
                                }

                                {role.some(item => item.title === "cab booking") &&

                                    <li className='relative'>
                                        <div onClick={() => setDropdownActive(!dropdownActive)} className={`${listStyle} cursor-pointer flex items-center justify-between`}>
                                            <div className='flex items-center justify-start gap-2'>
                                                <LuShoppingBag />    <span>Cab Booking</span>
                                            </div>
                                            {dropdownActive ? <RiArrowDownSLine className='text-[1.5rem] font-bold' />  : <RiArrowRightSLine className='text-[1.5rem] font-bold' />}
                                        </div>
                                        {dropdownActive && (
                                            <ul className='mt-2 ml-4'>
                                                <li>
                                                    <NavLink to={'/cab-booking/list'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                                        <FaCar />
                                                        Booking List
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/cab-booking/book'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                                        <FaCar />
                                                        Booking
                                                    </NavLink>
                                                </li>

                                            </ul>
                                        )}
                                    </li>
                                }

                                {role.some(item => item.title === "rate chart") &&

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
                                                    <NavLink to={'/rate-chart/oneway'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                                        <GiSunPriest />
                                                        One Way
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/rate-chart/local'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                                        <FaSailboat />
                                                        Local
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/rate-chart/round'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                                        <FaSailboat />
                                                        Round
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/rate-chart/airport'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                                        <FaSailboat />
                                                        Airpot
                                                    </NavLink>
                                                </li>

                                            </ul>
                                        )}
                                    </li>
                                }


                                {role.some(item => item.title === "operator") &&
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
                                                    <NavLink to={'/operator/add'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                                        <FaCar />
                                                        Add Operator
                                                    </NavLink>
                                                </li>

                                                <li>
                                                    <NavLink to={'/operator/role'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                                        <FaCar />
                                                        Role Management
                                                    </NavLink>
                                                </li>

                                            </ul>
                                        )}
                                    </li>
                                }

                                {role.some(item => item.title === "cab list") &&

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
                                                    <NavLink to={'/cab-list/add'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                                        <FaCar />
                                                        Add Cab List
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/cab-list/list'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                                        <FaCar />
                                                        View Cab List
                                                    </NavLink>
                                                </li>

                                            </ul>
                                        )}
                                    </li>
                                }

                                {role.some(item => item.title === "packages") &&

                                    <li className='relative'>
                                        <div onClick={() => setDropdownActive4(!dropdownActive4)} className={`${listStyle} cursor-pointer flex items-center justify-between`}>
                                            <div className='flex items-center justify-start gap-2'>
                                                <LuShoppingBag />    <span>Packages</span>
                                            </div>
                                            {dropdownActive4 ? <RiArrowDownSLine className='text-[1.5rem] font-bold' /> : <RiArrowRightSLine className='text-[1.5rem] font-bold' />}
                                        </div>
                                        {dropdownActive4 && (
                                            <ul className='mt-2 ml-4'>
                                                <li>
                                                    <NavLink to={'/packages/view'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                                        <FaCar />
                                                        View Package
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/packages/add'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                                        <FaCar />
                                                        Add Package
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/packages/query'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                                        <FaCar />
                                                        View Query
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/packages/setup'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                                        <FaCar />
                                                        Package Setup
                                                    </NavLink>
                                                </li>

                                            </ul>
                                        )}
                                    </li>

                                }

                                {role.some(item => item.title === "discount manager") &&
                                    <li>
                                        <NavLink to={'/discount-manager'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                            <FaSailboat />
                                            Discount Manager
                                        </NavLink>
                                    </li>
                                }

                                {role.some(item => item.title === "customer detail") &&
                                    <li>
                                        <NavLink to={'/customer-detail'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                            <MdBoy />
                                            Customer Details
                                        </NavLink>
                                    </li>
                                }

                                {role.some(item => item.title === "vendor list") &&
                                    <li>
                                        <NavLink to={'/vendor-list'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                            <FaPersonCircleQuestion />
                                            Vendor List
                                        </NavLink>
                                    </li>

                                }


                                {role.some(item => item.title === "inquiry list") &&
                                    <li>
                                        <NavLink to={'/inquiry-list'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                            <FaRegMessage />
                                            Inquiry List
                                        </NavLink>
                                    </li>
                                }

                                {role.some(item => item.title === "term condition") &&

                                    <li>
                                        <NavLink to={'/term-condition'} className={({ isActive }) => isActive ? activeListStyle : listStyle}>
                                            <CiViewList />
                                            Term & Condition
                                        </NavLink>
                                    </li>

                                }




                            </div>
                        
                    </ul>
                    <Link onClick={handleLogout} className='bg-[#FF4C51] transition-all duration-700 hover:bg-[#685ED4] border-none text-white flex items-center gap-2 pl-4 p-2 m-[0.4rem] ml-0 mr-3 rounded-r md:mr-4 font-semibold text-[1.02rem] tracking-wide'>
                        <CgLogOut className='text-[1.3rem] font-semibold' /> Logout
                    </Link>
                </header>
            </div>
        </>
    );
};

export default HomeLayout;
