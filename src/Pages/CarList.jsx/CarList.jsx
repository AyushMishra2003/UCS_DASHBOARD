import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import car1 from '../../assets/pq.jpeg'
import { MdAirlineSeatReclineExtra, MdArrowLeft, MdKeyboardArrowRight, MdLocalParking, MdLuggage } from 'react-icons/md';
import { TbAirConditioning } from 'react-icons/tb';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { getTCDetails } from '../../Redux/Slices/localTripSlice';
import { GiGasPump, GiTakeMyMoney } from 'react-icons/gi';
import { SiToll } from 'react-icons/si';
import { IoDocumentText } from 'react-icons/io5';
import { FaLocationDot, FaXmark } from 'react-icons/fa6';
import MainForm from '../../Components/MainForm';
import { ShieldCheckIcon, UserGroupIcon, BriefcaseIcon, TruckIcon, CurrencyRupeeIcon, BoltIcon } from '@heroicons/react/24/outline'; // Importing Heroicons
import { LuLuggage } from 'react-icons/lu'
import { MdCarRental, MdContactSupport } from 'react-icons/md'
import { FaIndianRupeeSign, FaTriangleExclamation } from 'react-icons/fa6'
import { IoIosInformationCircleOutline } from 'react-icons/io'
import HomeLayout from '../../Layouts/HomeLayouts';
const CarList = () => {
    const [modifyActive, setModifyActive] = useState(false)

    const [active, setActive] = useState(1);
    const dispatch = useDispatch()
    const [detailsActive, setDetailsActive] = useState()
    const navigate = useNavigate()
    const location = useLocation()
    const [pickupCity, setPickupCity] = useState('')
    const [filteredData, setFilteredData] = useState({})
    const data = location.state

    const tcData = useSelector((state) => state?.localTrip?.tcData)
    console.log(tcData)
    const tc = tcData?.tC?.map(data => data?.text)

    console.log(tc)

    console.log(data)
    console.log(active)
    console.log(filteredData?.rates)

    const pickupDate = data?.pickupDate
    const pickupTime = data?.pickupTime
    const tripType = data?.tripType

    useEffect(() => {
        setPickupCity(data?.city)
        const filteredCityData = data?.cabData?.allCityRate?.filter(cityRate => cityRate?.cityName === pickupCity);
        setFilteredData(...filteredCityData)
        if (tripType === "Local") {
            const data = {
                tripType: "local"
            }
            dispatch(getTCDetails(data))
        }
    }, [pickupCity])

    useEffect(() => {
        setModifyActive(false)
    }, [location.state])

    const handleBook = (data) => {

        console.log(data)

        if (!pickupDate) {
            return toast.error("Pickup date is required")
        }

        if (!pickupTime) {
            return toast.error("Pickup time is required")
        }

        if (tripType === "Local") {
            navigate('/book-cab', {
                state: {
                    cabData: data,
                    pickupCity: pickupCity,
                    pickupDate: pickupDate,
                    pickupTime: pickupTime,
                    tripType: tripType,
                    tcData: tc,
                    selectedType: active === 1 ? "8 hrs | 80 km" : "12 hrs | 120 km",
                    totalPrice: active === 1 ? data?.rateFor80Km8Hours : data?.rateFor120Km12Hours
                }
            })
        }
    }


    const formatPickupDate = (dateString) => {
        // Create a new Date object directly from the "yyyy-mm-dd" string
        const dateObject = new Date(dateString);

        // Use Intl.DateTimeFormat to get the weekday
        const weekday = new Intl.DateTimeFormat('en-GB', {
            weekday: 'short',
        }).format(dateObject);

        // Use Intl.DateTimeFormat to get the rest of the date (day, month, year)
        const dateWithoutWeekday = new Intl.DateTimeFormat('en-GB', {
            month: 'short',
            day: 'numeric',
        }).format(dateObject);

        // Extract the year directly from the dateObject
        const year = dateObject.getFullYear();

        // Combine the weekday, the formatted date, and the year with commas
        return `${weekday}, ${dateWithoutWeekday}, ${year}`;
    };

    return (
        <HomeLayout>
        <div className=' bg-lightSky min-h-[90vh]'>
            {/* <div className='flex flex-row items-center bg-[#dfdfdf] py-4 justify-between px-[0.4rem] pl-6 sm:flex-row sm:px-10 gap-4' >
                <div className='flex flex-col items-center justify-center md:flex-row md:gap-8'>

                    <div className='flex flex-col relative items-start text-[1rem]'>
                        <div className='absolute top-[0.45rem] md:hidden text-light left-[-1.3rem] text-[0.85rem] flex items-center justify-center flex-col'>
                            <div className='rotate-[180deg] mr-[0.01px]  size-[0.7rem] border-light border-[0.2rem] rounded-full' ></div>
                            <div className='h-[0.75rem] border-dashed border-r-[1.3px] mr-[0.17rem] border-light w-1'>
                            </div>
                            <FaLocationDot className='ml-[0.05rem]' />
                        </div>
                        <div className='items-center justify-center gap-4 md:flex'>

                            <div className='items-center justify-center gap-1 md:flex'>
                                <div className='rotate-[180deg] mr-[0.01px]  size-[0.7rem] border-light border-[0.2rem] hidden md:block rounded-full' ></div>
                                <h2 className='font-semibold tracking-wide'>{pickupCity.split(',')[0]}</h2>
                            </div>
                            <MdKeyboardArrowRight className='hidden text-[1.3rem] md:block' />
                            <div className='items-center justify-center gap-1 md:flex'>

                                <FaLocationDot className='ml-[0.05rem] text-[0.85rem] text-light hidden md:block' />

                                <h2 className='font-semibold tracking-wide'> {pickupCity.split(',')[0]}
                                </h2>
                            </div>
                        </div>


                    </div>
                    <p className='text-[0.78rem] md:mt-[0.15rem] sm:text-[0.9rem] font-[500]'>
                        ({tripType} trip)
                    </p>
                </div>
                <div className='flex flex-col items-center justify-center gap-2 md:flex-row'>
                    <p className='text-[0.85rem]  sm:text-[1rem]'>{formatPickupDate(pickupDate)}
                        <span> {pickupTime}</span>
                    </p>
                    <button className='text-white bg-main p-[0.2rem] text-[0.9rem] font-semibold px-4 rounded' onClick={() => setModifyActive(true)}>Modify</button>
                </div>
            </div >
            {modifyActive &&
                <div className='fixed top-0 left-0 z-10 flex flex-col items-center justify-center w-full h-screen bg-dark bg-opacity-70'>

                    <div className='w-fit h-fit'>
                        <MainForm mainActive={2} mainDate={pickupDate} mainTime={pickupTime} pickupData={pickupCity} />
                        <button className='bg-white relative bottom-10 text-main rounded-md font-semibold text-[0.95rem] pl-2 px-4 p-[0.25rem] mx-4 flex items-center justify-center' onClick={() => setModifyActive(false)}>
                            <MdArrowLeft className='text-[1.5rem] tracking-wide' />
                            Back
                        </button>
                    </div>
                </div>} */}
            <div className="flex rounded-md my-2 max-w-[26rem] mx-auto overflow-hidden backdrop-blur-sm bg-[#00000033] text-[0.9rem] font-semibold ">
                <button
                    onClick={() => setActive(1)}
                    className={`py-[0.3rem] w-full px-2 border-[0.3px] border-[#808080] rounded-l-md border-r-none transition-all duration-300 ease-in-out transform ${active === 1 ? 'bg-main text-white shadow-lg' : 'bg-lightSky text-black hover:bg-[#f0f4f8] hover:text-main scale-100'
                        }`}
                >
                    8 hrs | 80 km
                </button>

                <button
                    onClick={() => setActive(2)}
                    className={`py-[0.3rem] px-2 rounded-r-md w-full border-[0.3px] border-[#808080] transition-all duration-300 ease-in-out transform ${active === 2 ? 'bg-main text-white shadow-lg' : 'bg-lightSky text-black hover:bg-[#f0f4f8] scale-100 hover:text-main'
                        }`}
                >12 hrs | 120 km
                </button>
            </div>
            <div className='flex flex-col py-10  px-[5vw] sm:px-[7vw] md:px-[9vw] lg:px-[11vw] items-center justify-center gap-6'>
                {
                    active === 1 ?
                        filteredData && filteredData?.rates?.length === 0 ?
                            <p>No Cabs available to this city right now</p> :
                            filteredData?.rates?.map((data, index) => {
                                return <div key={index} className="flex  hover:shadow-none transition-all duration-300 flex-col max-w-[27rem] sm:max-w-[55rem] w-full overflow-hidden border-main border rounded-lg shadow-md">

                                    <div className='flex flex-col items-center justify-between w-full mx-auto bg-white border-b sm:flex-row'>
                                        {/* Left section */}
                                        <div className="flex items-start justify-between w-full pr-3 border-b sm:w-fit">


                                            {/* Car image and details */}

                                            <img src={data?.category?.photo?.secure_url || car1} alt={`car ${index + 1}`}
                                                className='max-w-[7.8rem] min-w-[7.8rem] min-h-[5.3rem] max-h-[5.3rem] object-cover sm:max-h-[6rem] sm:min-h-[6rem] sm:min-w-[9.9rem] sm:max-w-[9.8rem]'

                                            />


                                            <div className="w-full ml-2 sm:hidden">
                                                <div className="block sm:text-left">
                                                    <h2 className="mb-1 text-[1.4rem] font-semibold line-clamp-1">{data?.category?.name}</h2>

                                                </div>
                                                <div className="flex justify-between sm:flex-col sm:w-[13rem] max-w-[14.5rem] items-center gap-3">
                                                    <div className='flex flex-col items-center'>
                                                        <div className="flex items-center mr-2 text-[1.1rem] font-bold text-gray-800">
                                                            <FaIndianRupeeSign className="w-4 h-4 mt-1 text-gray-800 " /> {data?.rateFor80Km8Hours}
                                                        </div>
                                                        <p className='text-[0.78rem] font-semibold'>Upto 80 km</p>
                                                    </div>
                                                    <button onClick={() => handleBook(data)} className="px-2 text-[0.9rem] font-semibold py-[0.35rem] mt-1 text-white bg-black transition rounded-md shadow bg-main">
                                                        Book Now
                                                    </button>
                                                </div>
                                            </div>

                                        </div>

                                        {/* Right section */}
                                        <div className='w-full sm:max-w-[70%] pl-2'>

                                            <div className="hidden text-center sm:block sm:text-left">
                                                <h2 className="mb-2 text-2xl font-semibold">{data?.category?.name}</h2>

                                            </div>

                                            <div className="flex flex-wrap items-center mt-4 sm:flex-row text-[0.9rem] sm:mt-0 font-semibold font-sans mb-2">
                                                {/* Info */}
                                                <div className="flex items-center gap-1 mb-1 mr-4 sm:mr-6">
                                                    <MdCarRental className="w-4 h-4 mb-[0.12rem]" /> {/* Heroicons TruckIcon */}
                                                    <span>{data?.category?.acAvailable ? "AC" : "NON AC"}</span>
                                                </div>
                                                <div className="flex items-center gap-1 mb-1 mr-4 sm:mr-6">
                                                    <UserGroupIcon className="w-4 h-4 mb-[0.12rem]" /> {/* Heroicons UserGroupIcon */}
                                                    <span>{data?.category?.numberOfSeats} seats</span>
                                                </div>
                                                <div className="flex items-center gap-1 mb-1 mr-4 sm:mr-6">
                                                    <LuLuggage className="w-4 h-4 mb-[0.12rem]" /> {/* Heroicons BriefcaseIcon */}
                                                    <span>{data?.category?.numberOfBags} luggage</span>
                                                </div>
                                                <div className="flex items-center gap-1 mr-4 sm:mr-6">
                                                    <BoltIcon className="w-4 h-4 mb-[0.12rem]" /> {/* Heroicons LightningBoltIcon */}
                                                    <span>After 80 Km &#8377; {data?.perKm}/km</span>
                                                </div>
                                                <div className="flex items-center gap-1 mr-4 sm:mr-6">
                                                    <BoltIcon className="w-4 h-4 mb-[0.12rem]" /> {/* Heroicons LightningBoltIcon */}
                                                    <span>After 8 hr &#8377; {data?.perHour}/hr</span>
                                                </div>

                                            </div>
                                        </div>
                                        {/* Price and button */}
                                        <div className="hidden sm:flex sm:flex-col  min-w-[9rem] max-w-[9rem]  items-center ">

                                            <div>
                                                <div className="flex items-center text-2xl font-bold text-gray-800">
                                                    <FaIndianRupeeSign className="w-4 h-4 mt-1 text-gray-800 " /> {data?.rateFor80Km8Hours}
                                                </div>
                                                <p className='text-[0.8rem] font-semibold'>Upto 80 km</p>
                                            </div>
                                            <button onClick={() => handleBook(data)} className="px-4 py-[0.35rem] mt-1 text-white bg-black transition rounded-md shadow bg-main">
                                                Book Now
                                            </button>
                                        </div>
                                    </div>

                                    <div className='flex items-center justify-between gap-2 p-3 pl-1 sm:pl-4 text-[0.85rem] sm:text-[0.95rem] font-semibold text-main'>
                                        {/* Safety icon */}
                                        <div className='flex gap-2'>
                                            <div onClick={() => setDetailsActive(`2.${index}`)} className="flex cursor-pointer items-center p-[0.15rem] pr-1 sm:px-3 sm:pl-2 bg-red-100 border border-red-500 rounded">
                                                <div className="p-1 rounded-full">
                                                    <FaTriangleExclamation className="w-4 h-4 text-red-600" />
                                                </div>
                                                <span className="text-gray-700 ">Exclusions</span>
                                            </div>
                                            <div onClick={() => setDetailsActive(`3.${index}`)} className="flex cursor-pointer items-center p-[0.15rem] px-[0.4rem] pl-[0.1rem] bg-green-100 border border-green-500 rounded">
                                                <div className="p-1 rounded-full">
                                                    <IoIosInformationCircleOutline className="w-4 h-4 text-green-600" />
                                                </div>
                                                <span className="text-gray-700">T&C</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-[0.15rem] pr-2 sm:px-3 cursor-pointer sm:pl-2 bg-blue-50 border border-main rounded">
                                            <div className="p-1 rounded-full">
                                                <MdContactSupport className="w-4 h-4 text-main" />
                                            </div>
                                            <span className="text-gray-700">24/7 support</span>
                                        </div>

                                    </div>
                                    <div className='block text-[#0f0f0f] '>
                                        {detailsActive === `3.${index}` &&
                                            <div className='text-[0.8rem] p-2 py-4 relative'>
                                                <div className='absolute text-main right-3 top-3' onClick={() => setDetailsActive(0)}><FaXmark /></div>
                                                <h3 className='text-[0.9rem] font-semibold '>Terms and Conditions</h3>
                                                {tc?.map((t, i) => (
                                                    <li key={i} className='pl-2 mt-1 list-disc'>{t}</li>
                                                ))}
                                            </div>
                                        }
                                        {detailsActive === `2.${index}` &&
                                            <div className='text-[0.8rem] p-2 py-4 flex items-start justify-start w-full flex-wrap gap-4
                                                 relative'>
                                                <div className='absolute text-main right-3 top-3' onClick={() => setDetailsActive(0)}><FaXmark /></div>

                                                <div className='flex items-center gap-2'>
                                                    <div className='p-[6px] border-[0.1px] border-black rounded-full size-fit'>
                                                        <GiTakeMyMoney className='text-[1.1rem]' />
                                                    </div>
                                                    <p>Pay &#8377; {data?.perKm}/km after 80 km</p>
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                    <div className='p-[5.5px] border-[0.1px] border-black rounded-full size-fit'>
                                                        <MdLocalParking className='text-[1.15rem]' />

                                                    </div>
                                                    <p>Parking</p>
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                    <div className='p-[6px] border-[0.1px] border-black rounded-full size-fit'>
                                                        <GiTakeMyMoney className='text-[1.1rem]' />

                                                    </div>

                                                    <p>Pay &#8377; {data?.perHour}/hr after 8 hr</p>
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                    <div className='p-[3px] border-[0.1px] border-black rounded-full size-fit'>
                                                        <SiToll className='text-[1.4rem]' />

                                                    </div>

                                                    <p>Toll/State tax</p>
                                                </div>

                                            </div>}
                                        {detailsActive === `1.${index}` &&
                                            <div className='text-[0.8rem] p-2 py-4 flex flex-wrap items-center justify-center gap-6 relative'>
                                                <div className='absolute text-main right-3 top-3' onClick={() => setDetailsActive(0)}><FaXmark /></div>

                                                <div className='flex items-center gap-2'>
                                                    <div className='p-[6px] border-[0.1px] border-black rounded-full size-fit'>
                                                        <IoDocumentText className='text-[1.1rem]' />
                                                    </div>
                                                    <p>GST charges (5%)</p>
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                    <div className='p-[6px] border-[0.1px] border-black rounded-full size-fit'>
                                                        <GiGasPump className='text-[1.1rem]' />

                                                    </div>

                                                    <p>Base Fare</p>
                                                </div>
                                                {/* <div className='flex items-center gap-2'>
                                                        <div className='p-[3px] border-[0.1px] border-black rounded-full size-fit'>
                                                            <SiToll className='text-[1.4rem]' />

                                                        </div>

                                                        <p>Toll/State tax</p>
                                                    </div> */}

                                            </div>}
                                    </div>
                                </div>

                            }) :
                        filteredData && filteredData?.rates?.length === 0 ?
                            <p>No Cabs available to this city right now</p> :
                            filteredData?.rates?.map((data, index) => {
                                return <div key={index} className="flex  hover:shadow-none transition-all duration-300 flex-col max-w-[27rem] sm:max-w-[55rem] w-full overflow-hidden border-main border rounded-lg shadow-md">
                                    <div className='flex flex-col items-center justify-between w-full mx-auto bg-white border-b sm:flex-row'>
                                        {/* Left section */}
                                        <div className="flex items-start justify-between w-full pr-3 border-b sm:w-fit">


                                            {/* Car image and details */}

                                            <img src={data?.category?.photo?.secure_url || car1} alt={`car ${index + 1}`}
                                                className='max-w-[7.8rem] min-w-[7.8rem] min-h-[5.3rem] max-h-[5.3rem] object-cover sm:max-h-[6rem] sm:min-h-[6rem] sm:min-w-[9.9rem] sm:max-w-[9.8rem]'

                                            />


                                            <div className="w-full ml-2 sm:hidden">
                                                <div className="block sm:text-left">
                                                    <h2 className="mb-1 text-[1.4rem] font-semibold line-clamp-1">{data?.category?.name}</h2>

                                                </div>
                                                <div className="flex justify-between sm:flex-col sm:w-[13rem] max-w-[14.5rem] items-center gap-3">
                                                    <div className='flex flex-col items-center'>
                                                        <div className="flex items-center mr-2 text-[1.1rem] font-bold text-gray-800">
                                                            <FaIndianRupeeSign className="w-4 h-4 mt-1 text-gray-800 " /> {data?.rateFor120Km12Hours}
                                                        </div>
                                                        <p className='text-[0.78rem] font-semibold'>Upto 120 km</p>
                                                    </div>
                                                    <button onClick={() => handleBook(data)} className="px-2 text-[0.9rem] font-semibold py-[0.35rem] mt-1 text-white transition rounded-md shadow bg-main">
                                                        Book Now
                                                    </button>
                                                </div>
                                            </div>

                                        </div>

                                        {/* Right section */}
                                        <div className='w-full sm:max-w-[70%] pl-2'>

                                            <div className="hidden text-center sm:block sm:text-left">
                                                <h2 className="mb-2 text-2xl font-semibold">{data?.category?.name}</h2>

                                            </div>

                                            <div className="flex flex-wrap items-center mt-4 sm:flex-row text-[0.9rem] sm:mt-0 font-semibold font-sans mb-2">
                                                {/* Info */}
                                                <div className="flex items-center gap-1 mb-1 mr-4 sm:mr-6">
                                                    <MdCarRental className="w-4 h-4 mb-[0.12rem]" /> {/* Heroicons TruckIcon */}
                                                    <span>{data?.category?.acAvailable ? "AC" : "NON AC"}</span>
                                                </div>
                                                <div className="flex items-center gap-1 mb-1 mr-4 sm:mr-6">
                                                    <UserGroupIcon className="w-4 h-4 mb-[0.12rem]" /> {/* Heroicons UserGroupIcon */}
                                                    <span>{data?.category?.numberOfSeats} seats</span>
                                                </div>
                                                <div className="flex items-center gap-1 mb-1 mr-4 sm:mr-6">
                                                    <LuLuggage className="w-4 h-4 mb-[0.12rem]" /> {/* Heroicons BriefcaseIcon */}
                                                    <span>{data?.category?.numberOfBags} luggage</span>
                                                </div>
                                                <div className="flex items-center gap-1 mr-4 sm:mr-6">
                                                    <BoltIcon className="w-4 h-4 mb-[0.12rem]" /> {/* Heroicons LightningBoltIcon */}
                                                    <span>After 120 Km &#8377; {data?.perKm}/km</span>
                                                </div>
                                                <div className="flex items-center gap-1 mr-4 sm:mr-6">
                                                    <BoltIcon className="w-4 h-4 mb-[0.12rem]" /> {/* Heroicons LightningBoltIcon */}
                                                    <span>After 12 hr &#8377; {data?.perHour}/hr</span>
                                                </div>

                                            </div>
                                        </div>
                                        {/* Price and button */}
                                        <div className="hidden sm:flex sm:flex-col  min-w-[9rem] max-w-[9rem]  items-center ">

                                            <div>
                                                <div className="flex items-center text-2xl font-bold text-gray-800">
                                                    <FaIndianRupeeSign className="w-4 h-4 mt-1 text-gray-800 " /> {data?.rateFor120Km12Hours}
                                                </div>
                                                <p className='text-[0.8rem] font-semibold'>Upto 120 km</p>
                                            </div>
                                            <button onClick={() => handleBook(data)} className="px-4 py-[0.35rem] mt-1 text-white transition rounded-md shadow bg-main">
                                                Book Now
                                            </button>
                                        </div>
                                    </div>

                                    <div className='flex items-center justify-between gap-2 p-3 pl-1 sm:pl-4 text-[0.85rem] sm:text-[0.95rem] font-semibold text-main'>
                                        {/* Safety icon */}
                                        <div className='flex gap-2'>
                                            <div onClick={() => setDetailsActive(`2.${index}`)} className="flex cursor-pointer  items-center p-[0.15rem] pr-1 sm:px-3 sm:pl-2 bg-red-100 border border-red-500 rounded">
                                                <div className="p-1 rounded-full">
                                                    <FaTriangleExclamation className="w-4 h-4 text-red-600" />
                                                </div>
                                                <span className="text-gray-700 ">Exclusions</span>
                                            </div>
                                            <div onClick={() => setDetailsActive(`3.${index}`)} className="flex cursor-pointer items-center p-[0.15rem] px-[0.4rem] pl-[0.1rem] bg-green-100 border border-green-500 rounded">
                                                <div className="p-1 rounded-full">
                                                    <IoIosInformationCircleOutline className="w-4 h-4 text-green-600" />
                                                </div>
                                                <span className="text-gray-700">T&C</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-[0.15rem] pr-2 sm:px-3 cursor-pointer sm:pl-2 bg-blue-50 border border-main rounded">
                                            <div className="p-1 rounded-full">
                                                <MdContactSupport className="w-4 h-4 text-main" />
                                            </div>
                                            <span className="text-gray-700">24/7 support</span>
                                        </div>

                                    </div>
                                    <div className='block text-[#0f0f0f] '>
                                        {detailsActive === `3.${index}` &&
                                            <div className='text-[0.8rem] p-2 py-4 relative'>
                                                <div className='absolute text-main right-3 top-3' onClick={() => setDetailsActive(0)}><FaXmark /></div>
                                                <h3 className='text-[0.9rem] font-semibold '>Terms and Conditions</h3>
                                                {tc?.map((t, i) => (
                                                    <li key={i} className='pl-2 mt-1 list-disc'>{t}</li>
                                                ))}
                                            </div>
                                        }
                                        {detailsActive === `2.${index}` &&
                                            <div className='text-[0.8rem] p-2 py-4 flex items-start justify-start w-full flex-wrap gap-4
                                             relative'>
                                                <div className='absolute text-main right-3 top-3' onClick={() => setDetailsActive(0)}><FaXmark /></div>

                                                <div className='flex items-center gap-2'>
                                                    <div className='p-[6px] border-[0.1px] border-black rounded-full size-fit'>
                                                        <GiTakeMyMoney className='text-[1.1rem]' />
                                                    </div>
                                                    <p>Pay &#8377; {data?.perKm}/km after 120 km</p>
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                    <div className='p-[5.5px] border-[0.1px] border-black rounded-full size-fit'>
                                                        <MdLocalParking className='text-[1.15rem]' />

                                                    </div>
                                                    <p>Parking</p>
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                    <div className='p-[6px] border-[0.1px] border-black rounded-full size-fit'>
                                                        <GiTakeMyMoney className='text-[1.1rem]' />

                                                    </div>

                                                    <p>Pay &#8377; {data?.perHour}/hr after 12 hr</p>
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                    <div className='p-[3px] border-[0.1px] border-black rounded-full size-fit'>
                                                        <SiToll className='text-[1.4rem]' />

                                                    </div>

                                                    <p>Toll/State tax</p>
                                                </div>

                                            </div>}
                                        {detailsActive === `1.${index}` &&
                                            <div className='text-[0.8rem] p-2 py-4 flex flex-wrap items-center justify-center gap-6 relative'>
                                                <div className='absolute text-main right-3 top-3' onClick={() => setDetailsActive(0)}><FaXmark /></div>

                                                <div className='flex items-center gap-2'>
                                                    <div className='p-[6px] border-[0.1px] border-black rounded-full size-fit'>
                                                        <IoDocumentText className='text-[1.1rem]' />
                                                    </div>
                                                    <p>GST charges (5%)</p>
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                    <div className='p-[6px] border-[0.1px] border-black rounded-full size-fit'>
                                                        <GiGasPump className='text-[1.1rem]' />

                                                    </div>

                                                    <p>Base Fare</p>
                                                </div>
                                                {/* <div className='flex items-center gap-2'>
                                                    <div className='p-[3px] border-[0.1px] border-black rounded-full size-fit'>
                                                        <SiToll className='text-[1.4rem]' />

                                                    </div>

                                                    <p>Toll/State tax</p>
                                                </div> */}

                                            </div>}
                                    </div>
                                </div>

                            })

                }
            </div>
        </div >
        </HomeLayout>
    )
}

export default CarList