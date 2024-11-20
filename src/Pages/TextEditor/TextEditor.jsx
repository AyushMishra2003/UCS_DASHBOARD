import { Description } from '@mui/icons-material';
import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles for the editor
import { useDispatch } from 'react-redux'; // Import useDispatch from Redux
import { addChild, addSections, getSections } from '../../Redux/Slices/dynamicSlice';

const TextEditor = ({ onClose, initialData, saveData,page,child }) => { // Set a default value for initialData
  const [editorContent, setEditorContent] = useState(initialData.content || '');
  const [title, setTitle] = useState(initialData.title || '');
  const oldTitle=initialData?.title
  const [category, setCategory] = useState(initialData.category || 'Azolla Benefits');
  const [customField1, setCustomField1] = useState(initialData.customField1 || '');
  // const [customField2, setCustomField2] = useState(initialData.customField2 || '');
  // const [ordering, setOrdering] = useState(initialData.ordering || 0);
  const [attachment, setAttachment] = useState(null);
  const quillRef = useRef(); // Create a reference for ReactQuill
  const dispatch = useDispatch(); // Initialize dispatch from Redux

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleAttachmentChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  // const handleOrderingChange = (e) => {
  //   setOrdering(e.target.value);
  // };

  const handleSave = async() => {
    let data = {
      title,
      category,
      page,
      description: editorContent,
      customField1,
      // customField2,
      // ordering,
      photo:attachment,
    };

    // Dispatch the updated data
    console.log(data);

    let response

    if(child){
      const update="ayush"
      console.log(Object.keys(initialData));
      let isTrue=false

      if(Object.keys(initialData).length!=0){
         isTrue=true  
      }

      console.log("child is",child)
      console.log("old title is",oldTitle)

      if(isTrue){
        response=await dispatch(addChild({data,child,update,oldTitle}));
      }else{
        response=await dispatch(addChild({data,child}));
      }
  
    }else{
      // (Object.keys(myEmptyObj).length)
      const update="ayush"
      console.log(initialData);

      console.log(Object.keys(initialData));
      let isTrue=false

      if(Object.keys(initialData).length!=0){
         isTrue=true  
      }
      
      
      
      if(isTrue){
        response=await dispatch(addSections({data,update,oldTitle}));
      }else{
        response=await dispatch(addSections({data}));
      }
  
    }
    console.log(response);

    if(response?.payload){
    
      onClose();
    }
    

    // Optionally close the editor after saving
   
  };


 
   

  return (
    <div className='relative bg-black full h-full z-50 border border-red-500'>
    <div className="absolute  bg-black z-50 w-full h-full flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full relative top-[0.2rem] overflow-y-auto max-h-[85vh]" >
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
          onClick={onClose} // Use the prop to close modal
        >
          &#x2715;
        </button>

        <h2 className="text-2xl font-bold mb-4">Edit Description 3423</h2>

        <div className="mb-4 bg-white text-black">
          <label className="block text-gray-700 mb-2">Category</label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="w-full p-2 border rounded bg-white"
          >
            <option value="page">{page}</option>
            {/* <option value="page">{page}</option> */}
            {/* <option value="Paddy Cultivation">Paddy Cultivation</option> */}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter Title"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Custom Field </label>
          <input
            type="text"
            value={customField1}
            onChange={(e) => setCustomField1(e.target.value)}
            placeholder="Enter Custom Field "
            className="w-full p-2 border rounded"
          />
        </div>

        {/* <div className="mb-4">
          <label className="block text-gray-700 mb-2">Custom Field 2</label>
          <input
            type="text"
            value={customField2}
            onChange={(e) => setCustomField2(e.target.value)}
            placeholder="Enter Custom Field 2"
            className="w-full p-2 border rounded"
          />
        </div> */}
{/* 
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Ordering</label>
          <input
            type="number"
            value={ordering}
            onChange={handleOrderingChange}
            className="w-full p-2 border rounded"
          />
        </div> */}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Attachment (JPG/PNG)</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleAttachmentChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <ReactQuill
          ref={quillRef}
          value={editorContent}
          onChange={handleEditorChange}
          modules={modules}
          className="h-60"
        />

        <div className="flex justify-between mt-[4rem]">
          <button
            onClick={handleSave} // Call the handleSave function on click
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            onClick={onClose} // Use the prop to close modal
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default TextEditor;
