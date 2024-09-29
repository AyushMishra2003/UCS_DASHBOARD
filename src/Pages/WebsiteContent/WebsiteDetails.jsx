import React, { useEffect } from 'react';
import HomeLayout from '../../Layouts/HomeLayouts';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSections } from '../../Redux/Slices/dynamicSlice';

const WebsiteDetails = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { sections, loading, error } = useSelector((state) => state.dynamic);
  
  useEffect(() => {
    dispatch(getSections(name));
  }, [dispatch, name]);

  const handleAddMainParent = () => {
    navigate('/text-editor'); // Navigate to TextEditor page
  };

  const renderSections = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return sections.map((section, index) => (
      <tr key={index} className="border-b">
        <td className="px-4 py-2 text-center">{index + 1}</td>
        <td className="px-4 py-2">{section.title}</td>
        {/* <td className="px-4 py-2 text-center">{section.ordering}</td> */}
        {/* <td className="px-4 py-2 text-center">{section.lastUpdated}</td>
        <td className="px-4 py-2 text-center">{section.isMaster ? 'YES' : 'NO'}</td>
        <td className="px-4 py-2 text-center">{section.status}</td> */}
       <td className="px-4 py-2">{section.description}</td>
        <td className="px-4 py-2 text-center">
          {section.image ? <img src={section.image} alt={section.title} className="w-20 h-20 object-cover" /> : <p>No Image..</p>}
        </td>
        <td className="px-4 py-2 text-center">{section.feature ? 'YES' : 'NO'}</td>
        <td className="px-4 py-2 text-center">
          <button className="bg-blue-500 text-white px-2 py-1 rounded">Add New</button>
        </td>
      </tr>
    ));
  };

  return (
    <HomeLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Content Manager Related To {name.toUpperCase()}</h1>
        <div className="flex justify-end mb-4">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={handleAddMainParent}>+ Add Main Parent</button>
        </div>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Sr. No.</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Description</th>
              {/* <th className="px-4 py-2 border">Last Updated</th>
              <th className="px-4 py-2 border">Is Master</th>
              <th className="px-4 py-2 border">Status</th> */}
              <th className="px-4 py-2 border">Img</th>
              {/* <th className="px-4 py-2 border">Feature</th> */}
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {renderSections()}
          </tbody>
        </table>
      </div>
    </HomeLayout>
  );
};

export default WebsiteDetails;
