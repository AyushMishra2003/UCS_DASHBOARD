import React from 'react'
import HomeLayout from '../../Layouts/HomeLayouts'
import { FaHome, FaPlaceOfWorship } from 'react-icons/fa'
import { MdContactPhone, MdOutlineRoundaboutRight, MdReviews } from 'react-icons/md'
import WebsiteContentCard from '../../Components/Cards/WebsiteContentCard'
import { GrGallery } from "react-icons/gr";
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

    return (
        <HomeLayout>
            <div className='grid items-center justify-center grid-cols-1 gap-6 p-2 pt-6 pb-10 sm:p-4 md:p-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2'>

                {list.map((data, index) => <WebsiteContentCard data={data} key={index + 1} />)}
            </div>
        </HomeLayout>
    )
}

export default WebsiteContent
