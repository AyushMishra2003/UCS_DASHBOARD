import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategory, editCategory, getCategory} from '../../Redux/Slices/LocalSlice';
import HomeLayout from '../../Layouts/HomeLayouts';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Icons for Edit and Delete
import { AiOutlinePlus } from 'react-icons/ai'; // Icon for Add

const LocalCategory = () => {
  const dispatch = useDispatch();
  const { categoryList, loading, error } = useSelector((state) => state.localCity);

  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [editingCategory, setEditingCategory] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false); // State to toggle form visibility

  const fetchData = async () => {
    await dispatch(getCategory());
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const handleEdit = (category) => {
    setEditingCategory(category);
    setNewCategory({ name: category.name, description: category.description });
    setIsFormVisible(true); // Show the form when editing
  };

  const handleDelete = async (categoryId) => {
    console.log("category id is",categoryId);
    
    const response=await dispatch(deleteCategory(categoryId));
    console.log(response);
    
    fetchData(); // Refresh the list after deletion
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (editingCategory) {
      // Editing existing category
    //   await dispatch(editCategory({ id: editingCategory.id, ...newCategory }));
      const data=({ id: editingCategory.id, ...newCategory })
       console.log(data);
       console.log(editingCategory._id);
        
       const response = await dispatch(editCategory({ id: editingCategory._id, data }));

       console.log(response);
       
       
       
      setEditingCategory(null); // Reset after editing
    } else {
      // Adding new category
      console.log(newCategory);
      
      const response=await dispatch(addCategory(newCategory));
      if(response?.payload){
        setIsFormVisible(false); // Show the form when editing
        setNewCategory({ name:"", description:""});
        fetchData()
      }
      
    }
    setNewCategory({ name: '', description: '' }); // Reset form after action
    setIsFormVisible(false); // Hide the form after adding/editing
    fetchData(); // Refresh the list after adding
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible); // Toggle form visibility when clicking "Add Category"
    setEditingCategory(null); // Reset editing state
    setNewCategory({ name: '', description: '' }); // Reset form fields
  };

  return (
    <HomeLayout>
      <h2 className="text-2xl font-bold mb-4">Manage Local Categories</h2>

      {/* Button to show/hide the Add/Edit form */}
      <button
        onClick={toggleFormVisibility}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center mb-6"
      >
        <AiOutlinePlus className="mr-2" />
        {isFormVisible ? 'Close Form' : 'Add Category'}
      </button>

      {/* Add/Edit Category Form - Only visible when isFormVisible is true */}
      {isFormVisible && (
        <form onSubmit={handleAddCategory} className="mb-6 p-4 border rounded-lg shadow-lg bg-gray-50">
          <h3 className="text-xl font-semibold mb-2">
            {editingCategory ? 'Edit Category' : 'Add New Category'}
          </h3>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category Name</label>
            <input
              type="text"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              className="w-full border p-2 rounded focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category Description</label>
            <input
              type="text"
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              className="w-full border p-2 rounded focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {editingCategory ? 'Update Category' : 'Add Category'}
          </button>
        </form>
      )}

      {/* Category Table */}
      {loading ? (
        <p>Loading categories...</p>
      ) : error ? (
        <p>Error loading categories: {error}</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Edit</th>
              <th className="border p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {categoryList?.map((category) => (
              <tr key={category.id} className="border">
                <td className="border p-2">{category.name}</td>
                <td className="border p-2">{category.description}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleEdit(category)}
                    className="text-yellow-500 hover:text-yellow-600"
                  >
                    <FaEdit />
                  </button>
                </td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </HomeLayout>
  );
};

export default LocalCategory;
