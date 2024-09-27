import React, { useEffect, useState } from "react";
import HomeLayout from '../Layouts/HomeLayouts';
import {
    Stepper,
    Step,
    StepLabel,
    Button,
    Box,
    createTheme,
    ThemeProvider
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { createGlobalSettingsData, getGlobalSettingsData } from "../Redux/Slices/AuthSlice";
import { toast } from "sonner";



const theme = createTheme({
    components: {
        MuiStepper: {
            styleOverrides: {
                root: {
                    '.MuiStepLabel-root': {
                        color: '#655CCE',
                    },
                    '.MuiStepConnector-line': {
                        backgroundColor: '#655CCE',
                    },
                    '.MuiStepIcon-root': {
                        color: '#655CCE',
                    },
                    '.MuiStepIcon-active': {
                        color: '#655CCE',
                    },
                    '.MuiStepIcon-completed': {
                        color: '#655CCE',
                    },
                },
            },
        },
    },
});


const mainDiv = 'relative w-full mt-5';
const labelStyle = "absolute font-semibold px-1 z-[100] text-[#655CCE] transition-all duration-200 transform text-[0.8rem] tracking-wide bg-white left-2 top-[-0.7rem] peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[22px]";
const inputStyle = "block text-black font-normal px-4 py-[7px] pb-[5px] bg-white border-[0.5px] border-gray-300 rounded w-full focus:outline-none focus:ring-[0.5px] focus:ring-blue-500  focus:border-blue-500 peer";

const Step1 = ({ formData, handleChange }) => (
    <div className="w-full">
        <div className="flex flex-col w-full gap-4 sm:flex-row">
            <div className={mainDiv}>
                <label className={labelStyle}>Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputStyle}
                />
            </div>
            <div className={mainDiv}>
                <label className={labelStyle}>Website URL</label>
                <input
                    type="text"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    className={inputStyle}
                />
            </div>
        </div>
        <div className={mainDiv}>
            <label className={labelStyle}>Address</label>
            <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={inputStyle}
                rows={3}
            />
        </div>
        <div className="flex flex-col w-full gap-4 sm:flex-row">
            <div className={mainDiv}>
                <label className={labelStyle}>Phone Number 1</label>
                <input
                    type="text"
                    name="phone1"
                    value={formData.phone1}
                    onChange={handleChange}
                    className={inputStyle}
                />
            </div>
            <div className={mainDiv}>
                <label className={labelStyle}>Phone Number 2</label>
                <input
                    type="text"
                    name="phone2"
                    value={formData.phone2}
                    onChange={handleChange}
                    className={inputStyle}
                />
            </div>
        </div>
        <div className="flex flex-col w-full gap-4 sm:flex-row">
            <div className={mainDiv}>
                <label className={labelStyle}>Email 1</label>
                <input
                    type="email"
                    name="email1"
                    value={formData.email1}
                    onChange={handleChange}
                    className={inputStyle}
                />
            </div>
            <div className={mainDiv}>
                <label className={labelStyle}>Email 2</label>
                <input
                    type="email"
                    name="email2"
                    value={formData.email2}
                    onChange={handleChange}
                    className={inputStyle}
                />
            </div>
        </div>
        <div className="flex flex-col w-full gap-4 sm:flex-row">
            <div className={mainDiv}>
                <label className={labelStyle}>Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={inputStyle}
                />
            </div>
            <div className={mainDiv}>
                <label className={`${labelStyle} mt-[0.8rem] flex items-center justify-center text-[1.1rem] ml-[-0.4rem] h-[90%] rounded`}>Logo</label>
                <Button sx={{ backgroundColor: '#655CCE' }}
                    variant="contained"
                    component="label"
                    startIcon={<PhotoCamera />}
                    className="w-full bg-[#655CCE] mt-1"
                >
                    Upload
                    <input
                        type="file"
                        hidden
                        name="logo"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </Button>
                {formData.logo && (
                    <label htmlFor="logo">
                        <img
                            src={formData?.logo || URL.createObjectURL(formData.logo)}
                            alt="Logo Preview"
                            className="absolute left-0 object-cover mt-2 border-2 border-black rounded shadow-lg top- size-16"
                        />
                    </label>
                )}
            </div>
        </div>
    </div>
);

const Step2 = ({ formData, handleChange }) => (
    <Box>
        <div className="space-y-4">
            <div className={mainDiv}>
                <label className={labelStyle}>LinkedIn</label>
                <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className={inputStyle}
                />
            </div>
            <div className={mainDiv}>
                <label className={labelStyle}>Facebook</label>
                <input
                    type="url"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    className={inputStyle}
                />
            </div>
            <div className={mainDiv}>
                <label className={labelStyle}>Instagram</label>
                <input
                    type="url"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    className={inputStyle}
                />
            </div>
            <div className={mainDiv}>
                <label className={labelStyle}>WhatsApp Number</label>
                <input
                    type="text"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className={inputStyle}
                />
            </div>
            <div className={mainDiv}>
                <label className={labelStyle}>Google Map Iframe</label>
                <textarea
                    name="googleMap"
                    value={formData.googleMap}
                    onChange={handleChange}
                    className={inputStyle}
                    rows={3}
                />
            </div>
        </div>
    </Box>
);

const Step3 = ({ formData, handleChange }) => (
    <Box>
        <div className="flex flex-col gap-1">
            <div className={mainDiv}>
                <label htmlFor="icon" className={`${labelStyle} mt-[0.8rem] flex items-center justify-center text-[1.1rem] ml-[-0.4rem] h-[90%] rounded`}>Icon</label>
                <Button sx={{ backgroundColor: "#655CCE" }}
                    variant="contained"
                    component="label"
                    startIcon={<PhotoCamera />}
                    className="w-full"
                >
                    Upload
                    <input
                        type="file"
                        hidden
                        name="icon"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </Button>
                {formData.icon && (
                    <img
                        src={formData?.icon}
                        alt="Icon Preview"
                        className="absolute bottom-0 right-0 object-cover w-16 h-16 mt-2 border-2 border-black rounded"
                    />
                )}
            </div>
            <div className={mainDiv}>
                <label className={labelStyle}>Website Title</label>
                <input
                    type="text"
                    name="seoTitle"
                    value={formData.seoTitle}
                    onChange={handleChange}
                    className={inputStyle}
                />
            </div>

            <div className={mainDiv}>
                <label className={labelStyle}>Author Name</label>
                <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className={inputStyle}
                />
            </div>
            <div className={mainDiv}>
                <label className={labelStyle}>Keywords (comma separated)</label>
                <input
                    type="text"
                    name="keywords"
                    value={formData.keywords}
                    onChange={handleChange}
                    className={inputStyle}
                />
            </div>
            <div className={mainDiv}>
                <label className={labelStyle}>Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={inputStyle}
                    rows={4}
                />
            </div>
        </div>
    </Box>
);

const GlobalSettingsPage = () => {
    const [activeStep, setActiveStep] = useState(0);

    const dispatch = useDispatch()

    const websiteData = useSelector((state) => state?.auth?.globalSettingsData)


    const loadData = () => {
        // dispatch(getGlobalSettingsData())
    }

    useEffect(() => {
        loadData()
    }, [])

    console.log(websiteData)

    const [formData, setFormData] = useState({
        name: websiteData?.name || "",
        url:  "www.ucscab.com",
        address: websiteData?.address || "",
        phone1:  "8115544102",
        phone2:  "6388291292",
        email1: "ucs@gmail.com",
        email2:  "ucssupport@gmail.com",
        title:  "ucs Cab",
        logo: websiteData?.logo?.secure_url || null,
        linkedin: websiteData?.linkedin || "",
        facebook: websiteData?.facebook || "",
        instagram: websiteData?.instagram || "",
        whatsapp: websiteData?.whatsapp || "",
        googleMap: websiteData?.googleMap || "",
        icon: websiteData?.icon?.secure_url || null,
        seoTitle: websiteData?.seoTitle || "",
        author: websiteData?.author || "",
        keywords: websiteData?.keywords || "",
        description: websiteData?.description || "",
    });

    useEffect(() => {
        setFormData({
            name: websiteData?.name || "",
            url: websiteData?.url || "",
            address: websiteData?.address || "",
            phone1: websiteData?.phone1 || "",
            phone2: websiteData?.phone2 || "",
            email1: websiteData?.email1 || "",
            email2: websiteData?.email2 || "",
            title: websiteData?.title || "",
            logo: websiteData?.logo?.secure_url || null,
            linkedin: websiteData?.linkedin || "",
            facebook: websiteData?.facebook || "",
            instagram: websiteData?.instagram || "",
            whatsapp: websiteData?.whatsapp || "",
            googleMap: websiteData?.googleMap || "",
            icon: websiteData?.icon?.secure_url || null,
            seoTitle: websiteData?.seoTitle || "",
            author: websiteData?.author || "",
            keywords: websiteData?.keywords || "",
            description: websiteData?.description || "",
        });
    }, [websiteData])

    const steps = ["Basic Info", "Social Media", "SEO Settings"];

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };


    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const handleSubmit = async (e, isFinalStep = false) => {
        if (e) e.preventDefault(); // Prevent default form submission

        const form = new FormData();

        // Append all form data to FormData object
        Object.entries(formData).forEach(([key, value]) => {
            form.append(key, value);
        });

        try {
            const response = await dispatch(createGlobalSettingsData(form));
            console.log(response)
            if (response?.payload?.success) {
                toast.success("Settings saved successfully!");
                loadData()
                // Only proceed if this is not the final step
                if (!isFinalStep) {
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                }
            } else {
                toast.error("Error saving settings");
            }
        } catch (error) {
            toast.error("Failed to submit form:", error);
        }
    };


    return (
        <HomeLayout>
            <div className="p-6  py-4 my-6 mt-4 bg-white w-[97%] lg:w-[90%] shadow-[0px_0px_15px_-3px_#808080] m-[0_auto] rounded-md">

                <div className="text-[1.7rem] text-center font-semibold text-black">Master Setup</div>
                <ThemeProvider theme={theme}>
                    <Stepper activeStep={activeStep} className="py-5">
                        {steps.map((label, index) => (
                            <Step key={label} onClick={() => setActiveStep(index)}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </ThemeProvider>

                <div>
                    <form onSubmit={handleSubmit}>
                        {activeStep === 0 && <Step1 formData={formData} handleChange={handleChange} />}
                    </form>
                    {activeStep === 1 && <Step2 formData={formData} handleChange={handleChange} />}
                    {activeStep === 2 && <Step3 formData={formData} handleChange={handleChange} />}
                </div>

                <div className="flex justify-between w-full pt-4">
                    <button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className="px-5 py-[2px] text-white capitalize bg-[#FF4C51] rounded-md hover:bg-[#cf3238]"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        onClick={(e) => handleSubmit(e, activeStep === steps.length - 1)}
                        className="px-5 py-2 text-white capitalize bg-[#655CCE] rounded-md hover:bg-blue-700"
                    >
                        {activeStep === steps.length - 1 ? "Submit" : "Next"}
                    </button>
                </div>
            </div>
        </HomeLayout>
    );
};

export default GlobalSettingsPage;
