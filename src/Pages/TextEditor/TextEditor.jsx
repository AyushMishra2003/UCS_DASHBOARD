import React, { useState } from 'react';
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { useDispatch } from 'react-redux';
import { addChild, addSections } from '../../Redux/Slices/dynamicSlice';
import draftToHtml from 'draftjs-to-html';

const TextEditor = ({ onClose, initialData, page, child }) => {
  const [editorContent, setEditorContent] = useState(initialData.content || "");
  const [title, setTitle] = useState(initialData.title || '');
  const oldTitle = initialData?.title;
  const [category, setCategory] = useState(initialData.category || 'Azolla Benefits');
  const [customField1, setCustomField1] = useState(initialData.customField1 || '');
  const [attachment, setAttachment] = useState(null);
  const dispatch = useDispatch();
  const [spinLoading, setSpinLoading] = useState(false);

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
    setSpinLoading(true);

    if (child) {
      const update = "ayush";
      response = Object.keys(initialData).length !== 0
        ? await dispatch(addChild({ data, child, update, oldTitle }))
        : await dispatch(addChild({ data, child }));
    } else {
      const update = "ayush";
      response = Object.keys(initialData).length !== 0
        ? await dispatch(addSections({ data, update, oldTitle }))
        : await dispatch(addSections({ data }));
    }


    setSpinLoading(false);
    if (response?.payload) {
      onClose();
    }
  };


  console.log(editorContent);





  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[60%] relative overflow-y-auto max-h-[90vh]">
        <button className="absolute top-3 right-3 text-gray-600 hover:text-black" onClick={onClose}>
          &#x2715;
        </button>
        <h2 className="text-2xl font-bold mb-4">Edit Description</h2>

        <div className="mb-4 bg-white text-black">
          <label className="block text-gray-700 mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            onChange={(e) => setTitle(e.target.value)}
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

        <div className="mb-4 border border-blue-500">
          <label className="block text-gray-700 mb-2">Attachment (JPG/PNG)</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => setAttachment(e.target.files[0])}
            className="w-full p-2 border rounded"
          />
        </div>


        <SunEditor
          setContents={editorContent}
          onChange={(content) => {
            console.log("onchange maui", content);

            // SunEditor से content को raw format में लें और सीधे save करें
            setEditorContent(content);
          }}
          className="border border-red-500 min-h-[40rem]"
          setOptions={{
            height: "400px", // ✅ Editor ki height badha di
            minHeight: "300px", // ✅ Minimum height set kar di
            buttonList: [
              ["undo", "redo"], // Undo/Redo
              ["bold", "underline", "italic", "strike"], // Text Formatting
              ["font", "fontSize", "formatBlock"], // ✅ Font Customization
              ["fontColor", "hiliteColor"], // ✅ Text Color & Background Color
              ["align", "list", "lineHeight"], // Text Alignment & Spacing
              ["table"], // ✅ Insert & Edit Table
              ["link"], // ✅ Hyperlink Support (Internal & External Links)
              ["image", "video"], // ✅ Media Support
              ["codeView"], // View HTML Code
            ],
            linkProtocol: "", // ✅ Disable default "http://"
            // attributesWhitelist: {
            //   a: "href target title class download", // ✅ Allow custom attributes
            // },
            addTagsWhitelist: "a[href]", // Allow href attribute explicitly
            sanitize: false, // Disable automatic sanitization
            defaultTag: "div",
          }}
        />



        <div className="flex justify-between gap-4 mt-6">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center"
            disabled={spinLoading}
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
            onClick={onClose}
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
