import { Description } from '@mui/icons-material';
import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState, Modifier } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useDispatch } from 'react-redux';
import { addChild, addSections } from '../../Redux/Slices/dynamicSlice';

const TextEditor = ({ onClose, initialData, page, child }) => {
  const contentBlock = htmlToDraft(initialData.content || '');
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));
  const [title, setTitle] = useState(initialData.title || '');
  const oldTitle = initialData?.title;
  const [category, setCategory] = useState(initialData.category || 'Azolla Benefits');
  const [customField1, setCustomField1] = useState(initialData.customField1 || '');
  const [attachment, setAttachment] = useState(null);
  const dispatch = useDispatch();
  const [spinLoading, setSpinLoading] = useState(false);

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  // Function to insert a basic 3x3 table
  const insertTable = () => {
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    
    const tableHTML = `
      <table border="1" style="width:100%; border-collapse: collapse;">
        <tr>
          <td>Row 1, Col 1</td>
          <td>Row 1, Col 2</td>
          <td>Row 1, Col 3</td>
        </tr>
        <tr>
          <td>Row 2, Col 1</td>
          <td>Row 2, Col 2</td>
          <td>Row 2, Col 3</td>
        </tr>
        <tr>
          <td>Row 3, Col 1</td>
          <td>Row 3, Col 2</td>
          <td>Row 3, Col 3</td>
        </tr>
      </table>
    `;

    const newContentState = Modifier.insertText(
      currentContent,
      selection,
      tableHTML
    );

    const newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');
    setEditorState(newEditorState);
  };

  const handleSave = async () => {
    const contentHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    let data = {
      title,
      category,
      page,
      description: contentHtml,
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

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[60%] relative overflow-y-auto max-h-[85vh]">
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

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Attachment (JPG/PNG)</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => setAttachment(e.target.files[0])}
            className="w-full p-2 border rounded"
          />
        </div>

        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName="border rounded"
          editorClassName="p-2"
          toolbarClassName="border-b"
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
            blockType: {
              inDropdown: true,
              options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
            },
          }}
        />

        <button
          onClick={insertTable}
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          Insert Table
        </button>

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
