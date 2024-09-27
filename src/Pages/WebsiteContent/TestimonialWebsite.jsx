import React, { useEffect, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import HomeLayout from '../../Layouts/HomeLayouts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createTestimonial, deleteTestimonialData, getTestimonialData } from '../../Redux/Slices/AuthSlice';
import { toast } from 'sonner';
import { MdDelete } from 'react-icons/md';

const TestimonialWebsite = () => {
    const [loaderActive, setLoaderActive] = useState(false)
    const [deleteLoaderActive, setDeleteLoaderActive] = useState(false)
    const [viewActive, setViewActive] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const testimonialData = useSelector((state) => state?.auth?.testimonialData)

    const loadData = () => {
        dispatch(getTestimonialData())
    }

    useEffect(() => {
        loadData()
    }, [])

    const [formData, setFormData] = useState({
        reviewerImage: null,
        servicesUsed: '',
        reviewText: ''
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            reviewerImage: file
        });
        setImagePreview(URL.createObjectURL(file));
    };

    const handleDelete = async (id) => {
        const response = await dispatch(deleteTestimonialData(id))

        if (response?.payload?.success) {
            toast.success("Removed successfully!")
            loadData()
        } else {
            setDeleteLoaderActive(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { servicesUsed, reviewText, reviewerImage } = formData

        if (reviewerImage === null) {
            setLoaderActive(false)
            return toast.error('Upload the image!')
        }

        if (!servicesUsed || !reviewText) {
            setLoaderActive(false)
            return toast.error('All fields are required!')
        }

        const sendFormData = new FormData()

        sendFormData.append('servicesUsed', servicesUsed)
        sendFormData.append('reviewText', reviewText)
        sendFormData.append('reviewerImage', reviewerImage)

        const response = await dispatch(createTestimonial(sendFormData))


        if (response?.payload?.success) {
            toast.success("Created successfully!")
            setLoaderActive(false)
            loadData()
            setFormData({
                reviewerImage: null,
                servicesUsed: '',
                reviewText: ''
            })
            setImagePreview(null)
        } else {
            setLoaderActive(false)
        }

    };

    const inputContainerClass = "flex flex-col items-center p-3 border border-gray-300 rounded w-full shadow-sm bg-[#2F3349]";
    const inputClass = "w-full p-2 resize-none border-none bg-white text-black outline-none rounded";

    return (
        <HomeLayout>
            {viewActive ?
                <div className='flex flex-col items-center justify-center gap-3'>
                    <div className="w-[98%] flex pl-0 items-center justify-between py-2 px-2  m-[0_auto]  my-6 mb-2 bg-[#2F3349] rounded-md shadow-[0px_0px_15px_-6px_#808080]">
                        <h1 className='text-[1rem] px-4 text-white font-semibold tracking-wide bg-[#655CCE] text-center rounded-r p-2 border-[#655CCE]'>
                            All Testimonial
                        </h1>
                        <button onClick={() => setViewActive(false)} className='bg-[#FF4C51] text-white p-2 px-4 rounded'>
                            Add testimonial
                        </button>

                    </div>

                    {testimonialData?.map((data, ind) => {
                        return (
                            <div key={ind + 1} className='w-[98%] overflow-hidden relative rounded shadow-[0px_0px_15px_-6px_#808080] gap-1 lg:gap-6 px-8 p-4 bg-white flex flex-col items-center justify-center lg:flex-row'>
                                <div onClick={() => handleDelete(data?._id)} className='absolute top-0 cursor-pointer transition-all duration-300  shadow-[0px_0px_15px_-3px_#808080]  hover:bg-[#FF4C51] right-0 text-white p-[0.4rem] bg-[#2F3349]'>
                                    <MdDelete className='text-[1.3rem]' />
                                </div>
                                <img
                                    className='size-[7rem] rounded-full border-gray-700 border-4 shadow-[0px_0px_8px_#808080]'
                                    src={data?.reviewerImage?.secure_url} alt={data?.service} />
                                <div className='lg:w-full'>
                                    <h2 className='text-[#5c5c5c] font-semibold text-[1.1rem]'>{data?.servicesUsed}</h2>
                                    <p className='text-[0.98rem] text-black'>{data?.reviewText}</p>
                                </div>
                            </div>
                        )
                    })}
                </div> :
                <div className="w-[98%] pt-4 px-[2vw] py-6  m-[0_auto] mb-12  my-6 bg-white rounded-md shadow-[0px_0px_15px_-6px_#808080]">
                    <div className='flex items-center justify-between w-full mb-8'>
                        <h1 className='text-[1.5rem] font-semibold text-[#655CCE] text-center  border-b-[3.5px] rounded-b border-[#655CCE]'>
                            Add Testimonial
                        </h1>
                        <button onClick={() => setViewActive(true)} className='bg-[#FF4C51] text-white p-2 px-4 rounded'>
                            View all testimonials
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">


                        <div className='flex flex-col w-full lg:flex-row'>
                            <div className={`${inputContainerClass} lg:w-fit`}>

                                {imagePreview ? (
                                    <div onClick={() => document.getElementById('reviewerImage').click()} className="relative cursor-pointer">
                                        <img
                                            src={imagePreview}
                                            alt="Reviewer Preview"
                                            className="size-[9rem] sm:size-[10rem] lg:min-w-[12rem] lg:size-[12rem] border rounded shadow "
                                        />
                                        <div className="absolute flex items-center justify-center p-[0.6rem] text-white bg-black rounded-full bg-opacity-80 right-[-10px] top-[-10px]">
                                            <span className="text-lg"><FaCamera /></span>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => document.getElementById('reviewerImage').click()}
                                        className="flex items-center justify-center size-[9rem] sm:size-[10rem] lg:min-w-[12rem] lg:size-[12rem] p-4 text-white bg-[#2F3349] border rounded shadow cursor-pointer"
                                    >
                                        <span className="mr-2 text-[1.3rem]"><FaCamera /></span>
                                        <span>Upload</span>
                                    </button>
                                )}
                                <input
                                    type="file"
                                    id="reviewerImage"
                                    name="reviewerImage"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>

                            <div className='w-full'>
                                {/* Services Used Dropdown */}
                                <div className={inputContainerClass}>

                                    <select
                                        name="servicesUsed"
                                        value={formData.servicesUsed}
                                        onChange={handleChange}
                                        className={inputClass}
                                    >
                                        <option value="">Select a Service</option>
                                        <option value="Service 1">Service 1</option>
                                        <option value="Service 2">Service 2</option>
                                        <option value="Service 3">Service 3</option>
                                    </select>
                                </div>

                                {/* Review Text Area */}
                                <div className={inputContainerClass}>

                                    <textarea
                                        name="reviewText"
                                        placeholder="Write your review here..."
                                        value={formData.reviewText}
                                        onChange={handleChange}
                                        className={`${inputClass} h-32`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end w-full pt-3">
                            <button onClick={() => setLoaderActive(true)}
                                type="submit"
                                className={'px-6 py-2 flex items-center justify-center gap-8 text-white transition bg-[#655CCE] rounded min-w-[13rem] shadow-lg hover:bg-[#FF4C51]'}
                            >
                                Submit
                                {
                                    loaderActive &&
                                    <div className='rounded-full border-[3px] border-y-gray-800 animate-spin ease-in-out border-gray-300 size-5'></div>
                                }
                            </button>
                        </div>
                    </form>
                </div>}
        </HomeLayout>
    );
};

export default TestimonialWebsite;
