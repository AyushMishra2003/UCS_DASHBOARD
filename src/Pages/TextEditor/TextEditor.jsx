import { Description } from '@mui/icons-material';
import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles for the editor
import { useDispatch } from 'react-redux'; // Import useDispatch from Redux
import { addChild, addSections, getSections } from '../../Redux/Slices/dynamicSlice';

const TextEditor = ({ onClose, initialData, saveData, page, child }) => { // Set a default value for initialData
  const [editorContent, setEditorContent] = useState(initialData.content || '');
  const [title, setTitle] = useState(initialData.title || '');
  const oldTitle = initialData?.title;
  const [category, setCategory] = useState(initialData.category || 'Azolla Benefits');
  const [customField1, setCustomField1] = useState(initialData.customField1 || '');
  const [attachment, setAttachment] = useState(null);
  const quillRef = useRef(); // Create a reference for ReactQuill
  const dispatch = useDispatch(); // Initialize dispatch from Redux

  const [spinLoading,setSpinLoading]=useState(false)

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

  const handleSave = async () => {
    let data = {
      title,
      category,
      page,
      description: editorContent,
      customField1,
      photo: attachment,
    };

    let response;

    setSpinLoading(true)

    if (child) {
      const update = "ayush";
      let isTrue = Object.keys(initialData).length !== 0;

      if (isTrue) {
        response = await dispatch(addChild({ data, child, update, oldTitle }));
      } else {
        response = await dispatch(addChild({ data, child }));
      }

    } else {
      const update = "ayush";
      let isTrue = Object.keys(initialData).length !== 0;

      if (isTrue) {
        response = await dispatch(addSections({ data, update, oldTitle }));
      } else {
        response = await dispatch(addSections({ data }));
      }
    }

    setSpinLoading(false)

    if (response?.payload) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[60%] relative overflow-y-auto max-h-[85vh]">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
          onClick={onClose} // Use the prop to close modal
        >
          &#x2715;
        </button>

        <h2 className="text-2xl font-bold mb-4">Edit Description123</h2>

        <div className="mb-4 bg-white text-black">
          <label className="block text-gray-700 mb-2">Category</label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="w-full p-2 border rounded bg-white"
          >
            <option value="page">{page}</option>
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
          <label className="block text-gray-700 mb-2">Custom Field</label>
          <input
            type="text"
            value={customField1}
            onChange={(e) => setCustomField1(e.target.value)}
            placeholder="Enter Custom Field"
            className="w-full p-2 border rounded"
          />
        </div>

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
          className="h-60 overflow-y-auto" // Fixed height with scrollable content
        />

        <div className="flex justify-between gap-4 mt-6"> {/* Added gap between buttons */}
        <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center"
        disabled={spinLoading} // Disable the button while loading
      >
        {spinLoading ? (
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
            Saving...
          </div>
        ) : (
          "Save"
        )}
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
  );
};

export default TextEditor;
