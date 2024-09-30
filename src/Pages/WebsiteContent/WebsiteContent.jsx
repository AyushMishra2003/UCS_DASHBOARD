import React, { useEffect, useState } from 'react'
import HomeLayout from '../../Layouts/HomeLayouts'
import { FaHome, FaPlaceOfWorship } from 'react-icons/fa'
import { MdContactPhone, MdOutlineRoundaboutRight, MdReviews } from 'react-icons/md'
import WebsiteContentCard from '../../Components/Cards/WebsiteContentCard'
import { GrGallery } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux'
import { getAllPages } from '../../Redux/Slices/dynamicSlice'
const WebsiteContent = () => {
    const list = [
        {
            name: "Home",
            link: "/website-content/home",
            icon: <FaHome />,
            color: 'bg-[#655CCE]',
            list: 'Hero section || History || Our team'

        },
        {
            name: "About",
            link: "/website-content/about",
            icon: <MdOutlineRoundaboutRight />,
            color: 'bg-[#EA5455]',
            list: 'Our mission || History || Our team'
        },
        {
            name: "Gallery",
            link: "/website-content/gallery",
            icon: <GrGallery />,
            color: 'bg-[#FF9F43]',
            list: 'Gallery'

        },
        {
            name: "Places",
            link: "/website-content/places",
            icon: <FaPlaceOfWorship />,
            color: 'bg-[#28C76F]',
            list: 'Popular places'

        },
        {
            name: "Contact",
            link: "/website-content/contact",
            icon: <MdContactPhone />,
            color: 'bg-[#FF9F43]',
            list: 'Social links || Contact List || Map'

        },
        {
            name: "Testimonial",
            link: "/website-content/testimonial",
            icon: <MdReviews />,
            color: 'bg-[#28C76F]',
            list: 'Reviews'

        }
    ]

    const dispatch=useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [preData,setPreData]=useState()


    const {dynamicPage,loading,error}=useSelector((state)=>state.dynamic)

    console.log(dynamicPage);

    const handleAddMainParent = () => {
        setPreData({})
        setIsModalOpen(true); // Open the modal when button is clicked
      };
    

    const fetchData=async()=>{
    console.log("hua");
    
       const response=await dispatch(getAllPages())
       console.log(response);
       
    }

    useEffect(()=>{
        fetchData()
    },[])

    return (
        <HomeLayout>
               <div className="container mx-auto p-4">
               <h1 className="text-2xl font-bold mb-4">
          Content Manager Related To {"Pages"}
        </h1>
        {/* <div className="flex justify-end mb-4">
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded"
            onClick={handleAddMainParent}
          >
            + Add New Section
          </button>
        </div> */}
            <div className='grid items-center justify-center grid-cols-1 gap-6 p-2 pt-6 pb-10 sm:p-4 md:p-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2'>

                {dynamicPage.map((data, index) => <WebsiteContentCard data={data} key={index + 1} />)}
            </div>
            </div>
            
        </HomeLayout>
    )
}

export default WebsiteContent
