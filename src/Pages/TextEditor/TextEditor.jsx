import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles for the editor
import HomeLayout from '../../Layouts/HomeLayouts';

const TextEditor = () => {
  const [editorContent, setEditorContent] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Azolla Benefits');
  const [customField1, setCustomField1] = useState('');
  const [customField2, setCustomField2] = useState('');
  const [ordering, setOrdering] = useState(0);
  const [attachment, setAttachment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const quillRef = useRef(); // Create a reference for ReactQuill

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

  useEffect(() => {
    const savedContent = localStorage.getItem('editorContent');
    const savedTitle = localStorage.getItem('editorTitle');
    if (savedContent) {
      setEditorContent(savedContent);
    }
    if (savedTitle) {
      setTitle(savedTitle);
    }
  }, []);

  const saveContentToLocalStorage = () => {
    localStorage.setItem('editorContent', editorContent);
    localStorage.setItem('editorTitle', title);
    alert('Content saved to localStorage!');
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

  const handleOrderingChange = (e) => {
    setOrdering(e.target.value);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Apply H1 format to selected text
  const handleApplyH1 = () => {
    const quill = quillRef.current.getEditor(); // Accessing the Quill instance
    const range = quill.getSelection();

    if (range) {
      quill.formatText(range.index, range.length, { header: 1 });
    }
  };

  return (
    <HomeLayout>
      <div className="text-editor mx-auto max-w-4xl p-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Preview Section</h2>
          <strong>Title:</strong> {title || 'No Title'}
          <br />
          <strong>Custom Field 1:</strong> {customField1 || 'No Custom Field 1'}
          <br />
          <strong>Custom Field 2:</strong> {customField2 || 'No Custom Field 2'}
          <br />
          <strong>Ordering:</strong> {ordering || 0}
          <br />
          <strong>Attachment:</strong> {attachment ? attachment.name : 'No file uploaded'}
          <br />
          <div dangerouslySetInnerHTML={{ __html: editorContent }} />
        </div>

        <button
          className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
          onClick={toggleModal}
        >
          Edit Description
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full relative" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
              <button
                className="absolute top-3 right-3 text-gray-600 hover:text-black"
                onClick={toggleModal}
              >
                &#x2715;
              </button>

              <h2 className="text-2xl font-bold mb-4">Edit Description</h2>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Category</label>
                <select
                  value={category}
                  onChange={handleCategoryChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="Azolla Benefits">Azolla Benefits</option>
                  <option value="Paddy Cultivation">Paddy Cultivation</option>
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
                <label className="block text-gray-700 mb-2">Custom Field 1</label>
                <input
                  type="text"
                  value={customField1}
                  onChange={(e) => setCustomField1(e.target.value)}
                  placeholder="Enter Custom Field 1"
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Custom Field 2</label>
                <input
                  type="text"
                  value={customField2}
                  onChange={(e) => setCustomField2(e.target.value)}
                  placeholder="Enter Custom Field 2"
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Ordering</label>
                <input
                  type="number"
                  value={ordering}
                  onChange={handleOrderingChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Attachment (JPG/PNG)</label>
                <input
                  type="file"
                  onChange={handleAttachmentChange}
                  accept="image/png, image/jpeg"
                  className="w-full p-2 border rounded"
                />
              </div>

              <label className="block text-gray-700 mb-2">Description</label>
              <ReactQuill
                ref={quillRef} // Use ref for accessing the Quill instance
                value={editorContent}
                onChange={handleEditorChange}
                theme="snow"
                placeholder="Start typing description..."
                modules={modules}
                style={{ height: '200px', overflowY: 'auto' }}
              />

              <button onClick={handleApplyH1} className="mt-2 bg-blue-500 text-white p-2 rounded">
                Apply H1 to Selected Text
              </button>

              <button
                className="mt-4 bg-blue-500 text-white p-2 rounded"
                onClick={saveContentToLocalStorage}
              >
                Save Content to LocalStorage
              </button>
            </div>
          </div>
        )}
      </div>
    </HomeLayout>
  );
};

export default TextEditor;
