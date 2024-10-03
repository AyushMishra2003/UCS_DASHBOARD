import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSpecificSection } from '../../Redux/Slices/dynamicSlice'
import { useLocation } from 'react-router-dom'
import HomeLayout from '../../Layouts/HomeLayouts'
import TextEditor from '../TextEditor/TextEditor'
import { FaEdit } from 'react-icons/fa'

const WebsiteMoreDetails = () => {
  
    const dispatch=useDispatch()
    const location=useLocation()
    const { specificSection, loading, error } = useSelector((state) => state.dynamic);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { state } = location || {};
    const { section } = state || {};
    const [preData,setPreData]=useState()


    
  
    const fetchData=async()=>{
        const data={
            pageName:section?.page,
            sectionTitle:section?.title
        }
       const response=await  dispatch(getSpecificSection(data))
       console.log(response);
       
    }

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
    

    useEffect(()=>{
         fetchData()
    },[])

    console.log(specificSection);

    const handleAddMainParent = () => {
        setPreData({})
        setIsModalOpen(true); // Open the modal when button is clicked
      };
    
      const closeModal = () => {
        fetchData()
        setIsModalOpen(false); // Close modal function
        
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
      


    const renderSections = () => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;
    
        return specificSection.map((section, index) => (
          <tr key={index} className="border-b">
            <td className="px-4 py-2 text-center">{index + 1}</td>
            <td className="px-4 py-2">{section.title}</td>
            <td className="px-4 py-2">{truncateDescription(section.description, 100)}</td>
            <td className="px-4 py-2 text-center">
              {section?.photo ? (
                <img src={section?.photo?.secure_url} alt={section.title} className="w-20 h-20 object-cover" />
              ) : (
                <p>No Image</p>
              )}
            </td>
            <td className="px-4 py-2 text-center flex gap-3">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => handleAddNew(section)}
              >
                <FaEdit/>
              </button>
              {/* <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => handleView(section)}
              >
                View More
              </button> */}
            </td>
          </tr>
        ));
      };

      console.log(section);
      

  return (
    <HomeLayout>
       {/* <div>WebsiteMoreDetails</div> */}
       <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
         Child Content Manager Related To  {section?.title}
        </h1>
        <div className="flex justify-end mb-4">
          <button
            className="bg-[#22C55E] text-white px-4 py-2 rounded"
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
          <TextEditor onClose={closeModal}    initialData={preData} page={section?.title} child={section?._id} /> // Pass the close function as prop
        )}
      </div>
    </HomeLayout>
  )
}

export default WebsiteMoreDetails