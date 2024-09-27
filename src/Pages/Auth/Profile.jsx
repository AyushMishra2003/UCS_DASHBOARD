import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import userImg from '../../assets/user.png';
import profileBg from '../../assets/profileBg.jpg';
import { FaCamera, FaBan } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { changePassword, editProfile, userProfile } from '../../Redux/Slices/AuthSlice';
import HomeLayout from '../../Layouts/HomeLayouts';

const Profile = () => {
    const [eye, setEye] = useState(true)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [image, setImage] = useState('');
    const [loaderActive, setLoaderActive] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [passwordCardActive, setPasswordCardActive] = useState(false)
    const data = useSelector((state) => state?.auth1?.data);
    const role = useSelector((state) => state?.auth1?.role);

    const [profileData, setProfileData] = useState({
        userRole: role || "",
        fullName: data?.fullName || "",
        email: data?.email || "",
        avatar: "",
        phoneNumber: data?.phoneNumber || "",
    });

    useEffect(() => {
        const hasChanged =
            profileData.userRole !== role ||
            profileData.fullName !== data?.fullName ||
            profileData.avatar !== '' ||
            profileData.phoneNumber !== data?.phoneNumber;

        setIsUpdated(hasChanged);
    }, [profileData, data]);

    function imgUpload(e) {
        e.preventDefault();
        const uploadedImg = e.target.files[0];

        if (uploadedImg) {
            setProfileData({
                ...profileData,
                avatar: uploadedImg,
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImg);
            fileReader.addEventListener('load', function () {
                setImage(this.result);
            });
        }
    }

    function handleInput(e) {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value,
        });
    }

    useEffect(() => {
        dispatch(userProfile());

    }, [])

    const handleFormInput = async (e) => {
        e.preventDefault();

        const { fullName, email, phoneNumber } = profileData;

        if (!fullName || !email || !phoneNumber) {
            return toast.error("All fields are required");
        }

        if (!email.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)) {
            return toast.error('Email is Invalid!');
        }

        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('phoneNumber', phoneNumber);
        formData.append('avatar', profileData.avatar);

        const response = await dispatch(editProfile([data?._id, formData]));

        if (response?.payload?.success) {
            toast.success("Updated!");
            setLoaderActive(false);
            dispatch(userProfile());
        }
    };

    const mainDiv = 'relative w-full max-w-md mt-5';
    const labelStyle = "absolute font-semibold px-1 z-[100] text-blue-500 transition-all duration-200 transform text-[0.8rem]  tracking-wide bg-white left-2 top-[-0.7rem]   peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[22px]";
    const inputStyle = "block px-4 py-[7px] pb-[5px] bg-white border-[0.5px] border-gray-300 rounded min-w-[18rem] w-[90vw] sm:max-w-[28rem] max-w-[25rem] focus:outline-none focus:ring-[0.5px] focus:ring-blue-500 font-semibold focus:border-blue-500 peer";
    const disabledInputStyle = "block px-4 py-[7px] pb-[5px] bg-gray-100 border-[0.5px] font-semibold  border-gray-300 rounded min-w-[18rem] w-[90vw] sm:max-w-[28rem] max-w-[25rem] cursor-not-allowed";


    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({
            ...passwordData,
            [name]: value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { oldPassword, newPassword, confirmNewPassword } = passwordData;

        if (!oldPassword || !newPassword || !confirmNewPassword) {
            setLoaderActive(false)
            return toast.error('Please fill in all fields');
        }

        if (newPassword !== confirmNewPassword) {
            setLoaderActive(false)
            return toast.error('Passwords do not match');
        }

        const response = await dispatch(changePassword(passwordData));

        if (response?.payload?.success) {
            setPasswordData({
                oldPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            });
            setLoaderActive(false)
            setPasswordCardActive(false)

        } else {
            setLoaderActive(false)
        }
    };

    const handleEyeClick = () => {
        setEye(!eye)
    }

    return (
        <HomeLayout>
            <div className='flex items-center justify-center min-w-full py-10 pb-20 bg-transparent '>

                <form noValidate onSubmit={handleFormInput} className='flex  shadow-[0px_3px_16px_-5px_#808080] flex-col items-start justify-center p-3 text-black bg-white rounded-lg'>
                    <div className='relative w-full mb-12'>
                        <img className='min-w-full h-[8rem] shadow-[0px_5px_15px_-5px_#808080] rounded object-cover' src={profileBg} alt="profile background" />
                        <div className='absolute bottom-[-1.8rem] left-4'>
                            <label htmlFor="image_uploads" className='cursor-pointer'>
                                {image ? (
                                    <img src={image} alt="" className='size-[6.5rem] border-[2px] border-[#FFB827] rounded-full' />
                                ) : (
                                    <img src={(!data?.avatar?.secure_url ? userImg : data?.avatar?.secure_url)} alt="" className='size-[6.5rem] border-[3px] bg-white border-white rounded-full shadow-[0px_5px_15px_-5px_#808080]' />
                                )}
                            </label>
                            <div className='relative'>
                                <input onChange={imgUpload} type="file" id='image_uploads' name='image_uploads' className='hidden' accept='.jpg, .jpeg, .png, .svg' />
                                <label htmlFor='image_uploads' className='p-2 bg-[#e6e6e6] rounded-full absolute bottom-1 right-0 w-fit cursor-pointer'>
                                    <FaCamera />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className='p-1'>
                        <div className={`${mainDiv}`}>
                            <label className={`${labelStyle}`} htmlFor="userRole">Username</label>
                            <div className="relative group">
                                <input className={`${disabledInputStyle}`} disabled name='userRole' id='userRole' type="text" value={profileData.userRole} onChange={handleInput} />
                                <div className="absolute hidden transform -translate-y-1/2 top-1/2 right-3 group-hover:flex">
                                    <FaBan className="text-red-500" title="This field is disabled" />
                                </div>
                            </div>
                        </div>

                        <div className={mainDiv}>
                            <div className="relative group">
                                <input
                                    disabled
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={profileData.email}
                                    onChange={handleInput}
                                    className={disabledInputStyle}
                                    placeholder=" "
                                />
                                <label htmlFor="email" className={labelStyle}>
                                    Email
                                </label>
                                <div className="absolute hidden transform -translate-y-1/2 top-1/2 right-3 group-hover:flex">
                                    <FaBan className="text-red-500" title="This field is disabled" />
                                </div>
                            </div>
                        </div>
                        <div className={`${mainDiv}`}>
                            <label className={`${labelStyle}`} htmlFor="phoneNumber">Phone number</label>
                            <input className={`${inputStyle}`} type="number" name='phoneNumber' id='phoneNumber' value={profileData.phoneNumber} onChange={handleInput} />
                        </div>
                        <div className={`${mainDiv}`}>
                            <label className={`${labelStyle}`} htmlFor="fullName">Full name</label>
                            <input className={`${inputStyle}`} type="text" name='fullName' id='fullName' value={profileData.fullName} onChange={handleInput} />
                        </div>
                        <button type='submit' onClick={() => setLoaderActive(true)} className={`p-2 px-4 mt-5 flex items-center justify-center text-white bg-gradient-to-r w-full from-[#1751fe] via-[#0074f9] transition-all duration-300 to-[#0199ff] lg:px-6 hover:shadow-[1px_1px_6px_-2px#808080] rounded text-[0.9rem] font-semibold ${!isUpdated && 'opacity-50 cursor-not-allowed'}`} disabled={!isUpdated}>
                            Update profile {loaderActive && <div className='ml-4 ease-in-out mt-1 size-[1.2rem] border-[2.4px] border-y-[#57575769] animate-spin rounded-full bottom-0'></div>}
                        </button>
                        <div onClick={() => setPasswordCardActive(true)} className='w-full mt-3 cursor-pointer bg-[#FF8900] rounded text-center text-white p-[5px]'>
                            Change Password
                        </div>
                    </div>
                </form>
                {passwordCardActive &&
                    <div className='fixed flex items-center justify-center z-[101] h-[100vh] top-0 w-full bg-[#070707d5] backdrop-blur-[3px]'>


                        <form onSubmit={handleSubmit} className="p-4 shadow-[0px_0px_40px_#000] relative space-y-6 bg-white rounded-lg">
                            <div className='absolute top-0 right-0 p-[0.3rem] overflow-hidden transition-all duration-300 hover:bg-red-600 text-white bg-blue-500 rounded-tr-lg text-[1.1rem] cursor-pointer' onClick={() => setPasswordCardActive(false)}>
                                <IoMdClose

                                    className=''
                                    size={20}
                                />
                            </div>
                            <h2 className="text-2xl font-semibold text-center text-gray-600 mb-9">Change Password</h2>
                            <div className={mainDiv}>
                                <label htmlFor="oldPassword" className={labelStyle}>Current Password</label>
                                <input
                                    type="password"
                                    name="oldPassword"
                                    id="oldPassword"
                                    className={`${inputStyle} w-[20rem]`}
                                    value={passwordData.oldPassword}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={`${mainDiv} relative`}>
                                <label htmlFor="newPassword" className={labelStyle}>New Password</label>
                                <input
                                    type={`${eye ? 'password' : 'text'}`}
                                    name="newPassword"
                                    id="newPassword"
                                    className={`${inputStyle} w-[20rem]`}

                                    value={passwordData.newPassword}
                                    onChange={handleInputChange}
                                />
                                <div className='absolute bottom-2 right-2' onClick={handleEyeClick}>
                                    {eye ? <VscEyeClosed /> :
                                        <VscEye />}
                                </div>
                            </div>
                            <div className={mainDiv}>
                                <label htmlFor="confirmNewPassword" className={labelStyle}>Confirm New Password</label>
                                <input
                                    type="password"
                                    name="confirmNewPassword"
                                    id="confirmNewPassword"
                                    className={`${inputStyle} w-[20rem]`}

                                    value={passwordData.confirmNewPassword}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button type='submit' onClick={() => setLoaderActive(true)} className={`p-2 px-4 mt-5 flex items-center justify-center text-white bg-gradient-to-r w-full from-[#1751fe] via-[#0074f9] transition-all duration-300 to-[#0199ff] lg:px-6 hover:shadow-[1px_1px_6px_-2px#808080] rounded text-[0.9rem] font-semibold `} >
                                Change Password {loaderActive && <div className='ml-4 ease-in-out mt-1 size-[1.2rem] border-[2.4px] border-y-[#57575769] animate-spin rounded-full bottom-0'></div>}
                            </button>
                        </form>
                    </div>}
            </div>
        </HomeLayout>
    );
};

export default Profile;