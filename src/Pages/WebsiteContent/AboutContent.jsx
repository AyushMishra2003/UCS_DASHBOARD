import React, { useEffect, useState } from 'react';
import HomeLayout from '../../Layouts/HomeLayouts';
import { FaArrowLeft, FaArrowRight, FaCamera, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { createAboutSettingsData, getAboutSettingsData } from '../../Redux/Slices/AuthSlice';
import { toast } from 'sonner';

const icons = {
    mission: '🚀',
    story: '📖',
    team: '👥',
};

const AboutContent = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [expandedStory, setExpandedStory] = useState(1);
    const [expandedTeam, setExpandedTeam] = useState(1);
    const dispatch = useDispatch();

    const loadData = () => {
        dispatch(getAboutSettingsData());
    };

    const aboutData = useSelector((state) => state?.auth?.aboutSettingsData);


    useEffect(() => {
        loadData();
    }, []);

    const [formData, setFormData] = useState({
        missionImage: aboutData?.missionImage?.secure_url || '',
        missionDescription1: aboutData?.missionDescription1 || '',
        missionDescription2: aboutData?.missionDescription2 || '',
        story1: { year: aboutData?.stories[0]?.year || '', description: aboutData?.stories[0]?.description || '' },
        story2: { year: aboutData?.stories[1]?.year || '', description: aboutData?.stories[1]?.description || '' },
        story3: { year: aboutData?.stories[2]?.year || '', description: aboutData?.stories[2]?.description || '' },
        team1: { image: aboutData?.team1?.image?.secure_url || '', name: aboutData?.team1?.name || '', role: aboutData?.team1?.role || '' },
        team2: { image: aboutData?.team2?.image?.secure_url || '', name: aboutData?.team2?.name || '', role: aboutData?.team2?.role || '' },
        team3: { image: aboutData?.team3?.image?.secure_url || '', name: aboutData?.team3?.name || '', role: aboutData?.team3?.role || '' },
    });


    const [missionImagePreview, setMissionImagePreview] = useState(null);
    const [teamImagePreviews, setTeamImagePreviews] = useState({
        team1: null,
        team2: null,
        team3: null,
    });

    useEffect(() => {
        if (aboutData) {
            setFormData({
                missionImage: aboutData.missionImage.secure_url || '',
                missionDescription1: aboutData.missionDescription1 || '',
                missionDescription2: aboutData.missionDescription2 || '',
                story1: { year: aboutData?.stories[0]?.year || '', description: aboutData?.stories[0]?.description || '' },
                story2: { year: aboutData.stories[1]?.year || '', description: aboutData.stories[1]?.description || '' },
                story3: { year: aboutData.stories[2]?.year || '', description: aboutData.stories[2]?.description || '' },
                team1: { image: aboutData?.team1?.image?.secure_url || '', name: aboutData?.team1?.name || '', role: aboutData?.team1?.role || '' },
                team2: { image: aboutData?.team2?.image?.secure_url || '', name: aboutData?.team2?.name || '', role: aboutData?.team2?.role || '' },
                team3: { image: aboutData?.team3?.image?.secure_url || '', name: aboutData?.team3?.name || '', role: aboutData?.team3?.role || '' },
            });
            setMissionImagePreview(aboutData.missionImage.secure_url || null);
            setTeamImagePreviews({
                team1: aboutData?.team1?.image?.secure_url || null,
                team2: aboutData?.team2?.image?.secure_url || null,
                team3: aboutData?.team3?.image?.secure_url || null,
            });
        }
    }, [aboutData]);

    const handleNext = () => {
        if (currentStep < 3 && validateForm()) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleStepClick = (step) => {
        if (validateForm()) {
            setCurrentStep(step);
        }
    };

    const toggleTeam = (teamNumber) => {
        setExpandedTeam(teamNumber === expandedTeam ? 1 : teamNumber);
    };

    const handleChange = (e, section, field) => {
        if (section.startsWith('team') && field === 'image') {
            const file = e.target.files[0];
            if (file) {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    [section]: {
                        ...prevFormData[section],
                        image: file
                    }
                }));
                setTeamImagePreviews(prevPreviews => ({
                    ...prevPreviews,
                    [section]: URL.createObjectURL(file)
                }));
            }
        } else if (section === 'missionImage') {
            const file = e.target.files[0];
            if (file) {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    missionImage: file
                }));
                setMissionImagePreview(URL.createObjectURL(file));
            }
        } else if (field) {
            setFormData(prevFormData => ({
                ...prevFormData,
                [section]: {
                    ...prevFormData[section],
                    [field]: e.target.value
                }
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [section]: e.target.value
            }));
        }
    };

    const validateForm = () => {
        // Add validation logic here as needed
        return true;
    };

    const handleSubmit = async (e) => {
        if (e) {
            e.preventDefault();

        }

        const formDataToSend = new FormData();

        // Mission Image
        if (formData.missionImage instanceof File) {
            formDataToSend.append('missionImage', formData.missionImage);
        } else {
            formDataToSend.append('missionImage', formData.missionImage); // Preserve existing image if no new file is provided
        }

        // Mission Descriptions
        formDataToSend.append('missionDescription1', formData.missionDescription1);
        formDataToSend.append('missionDescription2', formData.missionDescription2);

        // Stories
        for (let i = 1; i <= 3; i++) {
            formDataToSend.append(`stories[${i - 1}][year]`, formData[`story${i}`].year);
            formDataToSend.append(`stories[${i - 1}][description]`, formData[`story${i}`].description);
        }

        // Team
        for (let i = 1; i <= 3; i++) {
            if (formData[`team${i}`].image instanceof File) {
                formDataToSend.append(`team${i}[image]`, formData[`team${i}`].image);
            } else {
                formDataToSend.append(`team${i}[image]`, aboutData?.[`team${i}`]?.image?.secure_url || ''); // Preserve existing image if no new file is provided
            }

            formDataToSend.append(`team${i}[name]`, formData[`team${i}`].name);
            formDataToSend.append(`team${i}[role]`, formData[`team${i}`].role);
        }

        try {
            const response = await dispatch(createAboutSettingsData(formDataToSend));

            if (response?.payload?.success) {
                loadData();
                if (currentStep === 3) {
                    toast.success('Form submitted successfully!');

                }
            }
        } catch (error) {
            toast.error('Error submitting form, please try again.');
        }
    };

    const triggerFileInput = (inputId) => {
        document.getElementById(inputId).click();
    };

    const toggleStory = (storyNumber) => {
        setExpandedStory(storyNumber === expandedStory ? 1 : storyNumber);
    };




    return (
        <HomeLayout>
            <div className="w-[98%] p-4 pt-2 mx-auto bg-white my-6 shadow-[0px_0px_8px_-3px_#808080] rounded-md">
                {/* Step Navigation with Icons and Numbers */}
                <div className="flex justify-around mb-4">
                    {[
                        { label: 'Our Mission', icon: icons.mission },
                        { label: 'Our Story', icon: icons.story },
                        { label: 'Our Team', icon: icons.team }
                    ].map((step, index) => {
                        const stepNumber = index + 1;
                        return (
                            <button
                                key={index}
                                onClick={() => handleStepClick(stepNumber)}
                                className={`flex flex-col items-center px-4 py-2 font-semibold border-b-4 rounded-b ${currentStep === stepNumber ? 'border-[#655CCE] text-[#655CCE]' : 'border-transparent'
                                    }`}
                            >
                                <span className="text-[1.3rem]">{step.icon}</span>
                                <span>{`${stepNumber}. ${step.label}`}</span>
                            </button>
                        );
                    })}
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Step Content */}
                    {currentStep === 1 && (
                        <div className="space-y-4">
                            <div className="flex flex-col items-center justify-center p-4 mb-2 bg-[#655CCE] shadow-[0px_0px_25px_-10px_#000_inset] rounded sm:flex-row">
                                {missionImagePreview ? (
                                    <div onClick={() => triggerFileInput('missionImageInput')} className="relative cursor-pointer">
                                        <img
                                            src={missionImagePreview}
                                            alt="Mission Preview"
                                            className="size-[9rem] sm:size-[10rem] md:size-[11rem] lg:size-[13rem] border rounded shadow "
                                        />
                                        <div className="absolute flex items-center justify-center p-[0.6rem] text-white bg-black rounded-full bg-opacity-80 right-[-10px] top-[-10px]">
                                            <span className="text-lg"><FaCamera /></span>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => triggerFileInput('missionImageInput')}
                                        className="flex items-center justify-center size-[9rem] sm:size-[10rem] md:size-[11rem] lg:size-[13rem] p-4 text-white bg-[#2F3349] border rounded shadow cursor-pointer "
                                    >
                                        <span className="mr-2 text-[1.3rem]"><FaCamera /></span>
                                        <span className=''>Upload</span>
                                    </button>
                                )}
                                <input
                                    id="missionImageInput"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleChange(e, 'missionImage')}
                                />
                            </div>
                            <div className="space-y-2">
                                <textarea
                                    className="block w-full p-2 bg-gray-100 border border-[#8681c6] rounded outline-none h-[6rem] resize-none"
                                    placeholder="Mission Description 1"
                                    value={formData.missionDescription1}
                                    onChange={(e) => handleChange(e, 'missionDescription1')}
                                />
                                <textarea
                                    className="block w-full p-2 bg-gray-100 border border-[#8681c6] rounded outline-none h-[6rem] resize-none"
                                    placeholder="Mission Description 2"
                                    value={formData.missionDescription2}
                                    onChange={(e) => handleChange(e, 'missionDescription2')}
                                />
                            </div>
                        </div>
                    )}
                    {currentStep === 2 && (
                        <div className="space-y-4">
                            {[1, 2, 3].map((num) => (
                                <div key={num} className="flex flex-col gap-2 bg-white rounded-lg shadow">
                                    <div
                                        onClick={() => toggleStory(num)}
                                        className={`flex text-white items-center transition-all duration-300 hover:bg-[#3D4056] justify-between p-4 py-3 rounded border-b cursor-pointer ${expandedStory === num ? 'bg-[#2F3349]' : 'bg-[#655CCE] text-white'}`}
                                    >
                                        <span className="font-semibold">{`Story ${num}`}</span>
                                        {expandedStory === num ? <FaChevronUp /> : <FaChevronDown />}
                                    </div>
                                    {expandedStory === num && (
                                        <div className="p-4 space-y-2">
                                            <input
                                                type="text"
                                                className="block w-full p-2 bg-gray-100 border border-[#8681c6] rounded outline-none"
                                                placeholder={`Year ${num}`}
                                                value={formData[`story${num}`].year}
                                                onChange={(e) => handleChange(e, `story${num}`, 'year')}
                                            />
                                            <textarea
                                                className="block w-full p-2 bg-gray-100 border border-[#8681c6] rounded outline-none h-[6rem] resize-none"
                                                placeholder={`Story ${num}`}
                                                value={formData[`story${num}`].description}
                                                onChange={(e) => handleChange(e, `story${num}`, 'description')}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    {currentStep === 3 && (
                        <div className="space-y-2">
                            {['team1', 'team2', 'team3'].map((teamKey, index) => {
                                const teamNumber = index + 1;
                                return (
                                    <div key={teamKey} className="space-y-2 bg-white rounded-lg shadow ">
                                        <div
                                            onClick={() => toggleTeam(teamNumber)}
                                            className={`flex items-center justify-between p-4 py-3 rounded border-b cursor-pointer ${expandedTeam === teamNumber ? 'bg-[#2F3349] text-white' : 'bg-[#655CCE] text-white'}`}
                                        >
                                            <span className="font-semibold">{`Team Member ${teamNumber}`}</span>
                                            {expandedTeam === teamNumber ? <FaChevronUp /> : <FaChevronDown />}
                                        </div>
                                        {expandedTeam === teamNumber && (
                                            <div className="px-4 pb-4 space-y-2 ">
                                                <div className="flex bg-[#655CCE] shadow-[0px_0px_25px_-10px_#000_inset] p-4 rounded flex-col items-center justify-center">
                                                    {teamImagePreviews[`team${teamNumber}`] ? (
                                                        <div onClick={() => triggerFileInput(`teamImageInput${teamNumber}`)} className="relative cursor-pointer">
                                                            <img
                                                                src={teamImagePreviews[`team${teamNumber}`]}
                                                                alt={`Team ${teamNumber} Preview`}
                                                                className="size-[7rem] sm:size-[8rem] md:size-[9rem] lg:size-[10rem] border rounded shadow"
                                                            />
                                                            <div className="absolute flex items-center justify-center p-[0.6rem] text-white bg-black rounded-full bg-opacity-80 right-[-10px] top-[-10px]">
                                                                <span className="text-lg"><FaCamera /></span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            onClick={() => triggerFileInput(`teamImageInput${teamNumber}`)}
                                                            className="flex items-center justify-center size-[7rem] sm:size-[8rem] md:size-[9rem] lg:size-[10rem]  p-4 text-white bg-[#2F3349] border rounded shadow cursor-pointer"
                                                        >
                                                            <span className="mr-2 text-[1.3rem]"><FaCamera /></span>
                                                            <span className=''>Upload</span>
                                                        </button>
                                                    )}
                                                    <input
                                                        id={`teamImageInput${teamNumber}`}
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => handleChange(e, `team${teamNumber}`, 'image')}
                                                    />
                                                </div>
                                                <input
                                                    type="text"
                                                    className="block w-full p-2 bg-gray-100 border border-[#8681c6] rounded outline-none"

                                                    placeholder={`Team Name ${teamNumber}`}
                                                    value={formData[`team${teamNumber}`].name}
                                                    onChange={(e) => handleChange(e, `team${teamNumber}`, 'name')}
                                                />
                                                <input
                                                    type="text"
                                                    className="block w-full p-2 bg-gray-100 border border-[#8681c6] rounded outline-none"

                                                    placeholder={`Team Role ${teamNumber}`}
                                                    value={formData[`team${teamNumber}`].role}
                                                    onChange={(e) => handleChange(e, `team${teamNumber}`, 'role')}
                                                />
                                            </div>
                                        )}
                                    </div>)
                            }
                            )
                            }
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-6">
                        <button onClick={handleBack} disabled={currentStep === 1} className="flex items-center justify-center gap-3 px-6 py-2 text-white bg-gray-500 rounded shadow">
                            <FaArrowLeft /> Back
                        </button>
                        {currentStep === 3 ? (
                            <button type="submit" className="px-4 py-2 text-white bg-[#655CCE] rounded shadow">
                                Submit
                            </button>
                        ) : (
                            <button onClick={handleNext} disabled={currentStep === 3} className="flex items-center justify-center gap-3 px-6 py-2 text-white bg-[#655CCE] rounded shadow">
                                Next <FaArrowRight />
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </HomeLayout>
    );
};

export default AboutContent;