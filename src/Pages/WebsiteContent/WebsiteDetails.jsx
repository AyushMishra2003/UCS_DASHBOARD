import React, { useEffect, useState } from 'react';
import HomeLayout from '../../Layouts/HomeLayouts';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSections, modelOpen } from '../../Redux/Slices/dynamicSlice';
import TextEditor from '../TextEditor/TextEditor';

const WebsiteDetails = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { sections=[], loading, error } = useSelector((state) => state.dynamic);
  const [preData,setPreData]=useState()

  useEffect(() => {
    dispatch(getSections(name));
  }, [dispatch]);

  const handleAddMainParent = () => {
    setPreData({})
    setIsModalOpen(true); // Open the modal when button is clicked
  };

  const closeModal = async () => {
    console.log("Fetching latest sections...");
    
    try {
      // Dispatch the action to fetch the latest sections
      const response = await dispatch(getSections(name)).unwrap();
      
      // Log the response to confirm if the latest sections are fetched
      console.log("Latest sections fetched: ", response);
      
      // Close the modal only after fetching the sections successfully
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error fetching sections:", error);
    }
  };
  

  const truncateDescription = (htmlString, maxLength = 100) => {
    // Create a temporary element to convert the HTML to plain text
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlString;

    // Get the plain text content and slice it to the desired length
    const plainText = tempElement.textContent || tempElement.innerText || '';
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + '...'
      : plainText;
  };


  const handleAddNew = (section) => {
    console.log("handle add new ");
    setPreData({
      title: section.title,
      content: section.description, // Assuming description is the content you want to edit
      category: section.category || 'Azolla Benefits', // Set a default category if necessary
      customField1: section.customField1 || '', // Include any other fields if necessary
      attachment: section.image || null // If the image is part of the data
    });
    setIsModalOpen(true); // Open the modal with predefined values
  };

  const handleView = (section) => {
    navigate('/website-content/child', { state: { section } });
  };

  const renderSections = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    if(sections.length===0){
      return <p>No Data Found</p>
    }

    return sections.map((section, index) => (
      <tr key={index} className="border-b">
        <td className="px-4 py-2 text-center">{index + 1}</td>
        <td className="px-4 py-2">{section.title}</td>
        <td className="px-4 py-2">{truncateDescription(section.description, 100)}</td>
        <td className="px-4 py-2 text-center">
          {section.image ? (
            <img src={section.image} alt={section.title} className="w-20 h-20 object-cover" />
          ) : (
            <p>No Image</p>
          )}
        </td>
        <td className="px-4 py-2 text-center flex gap-3">
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => handleAddNew(section)}
          >
            Edit
          </button>
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => handleView(section)}
          >
            View More
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <HomeLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          Content Manager Related To {name.toUpperCase()}
        </h1>
        <div className="flex justify-end mb-4">
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded"
            onClick={handleAddMainParent}
          >
            + Add New Section
          </button>
        </div>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Sr. No.</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>{renderSections()}</tbody>
        </table>
        {isModalOpen && (
          <TextEditor onClose={()=>closeModal()}    initialData={preData} page={name} /> // Pass the close function as prop
        )}
      </div>
    </HomeLayout>
  );
};

export default WebsiteDetails;
