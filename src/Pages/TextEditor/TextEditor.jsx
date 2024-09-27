import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles for the editor
import HomeLayout from '../../Layouts/HomeLayouts';

const TextEditor = () => {
  const [editorContent, setEditorContent] = useState('');

  // Define the toolbar modules for ReactQuill
  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image', 'video'],
      ['clean'], // Add a clear formatting button
    ],
  };

  // Load content from localStorage when the component mounts
  useEffect(() => {
    const savedContent = localStorage.getItem('editorContent');
    if (savedContent) {
      setEditorContent(savedContent);
    }
  }, []);

  // Function to handle saving content to localStorage
  const saveContentToLocalStorage = () => {
    localStorage.setItem('editorContent', editorContent);
    alert('Content saved to localStorage!');
  };

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  console.log(editorContent);
  

  return (
    <HomeLayout>
      <div className="text-editor">
        <ReactQuill
          value={editorContent}
          onChange={handleEditorChange}
          theme="snow"
          placeholder="Start typing..."
          modules={modules} // Pass the modules to ReactQuill for toolbar customization
        />
        <button
          className="mt-4 bg-blue-500 text-white p-2 rounded"
          onClick={saveContentToLocalStorage}
        >
          Save Content to LocalStorage
        </button>
        <div className="mt-4">
          <strong>Preview:</strong>
          <div dangerouslySetInnerHTML={{ __html: editorContent }} />
        </div>
      </div>
    </HomeLayout>
  );
};

export default TextEditor;
