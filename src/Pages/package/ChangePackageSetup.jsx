import React, { useEffect, useState } from 'react'
import HomeLayout from '../../Layouts/HomeLayouts'
import { useDispatch, useSelector } from 'react-redux'
import { addPackageCategory, addPackageInclude, deletePackageCategory, deletePackageInclude, editPackageCategory, editPackageInclude, getPackageCategory, getPackageInclude } from '../../Redux/Slices/packageSlice'
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ChangePackageSetup = () => {
  const dispatch = useDispatch();
  const { packageCategory, packageInclude, loading, error } = useSelector((state) => state.package);
  const [activeTab, setActiveTab] = useState('category');
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isIncludeModalOpen, setIsIncludeModalOpen] = useState(false);
  const [isCategoryEdit, setIsCategoryEdit] = useState(null);
  const [isIncludeEdit, setIsIncludeEdit] = useState(null);

  const [rotate,setRotate]=useState(false)

  const [categoryName, setCategoryName] = useState('');
  const [categoryPhoto, setCategoryPhoto] = useState(null);
  const [includeName, setIncludeName] = useState('');

  const toggleCategoryModal = () => {
    setIsCategoryModalOpen(!isCategoryModalOpen);
    // Reset inputs when closing modal
    if (isCategoryModalOpen) {
      setCategoryName('');
      setCategoryPhoto(null);
      
    }
  };

  const toggleIncludeModal = () => {
    setIsIncludeModalOpen(!isIncludeModalOpen);
    // Reset input when closing modal
    if (isIncludeModalOpen) {
      setIncludeName('');
    }
  };

  const fetchData = async () => {
    const response = await dispatch(getPackageCategory());
    console.log(response);
  };

  const fetchInclude = async () => {
    const response = await dispatch(getPackageInclude());
    console.log(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchInclude();
  }, []);

  const handleAddCategory = async() => {
    console.log("ayush");
     

    setRotate(true)

    if (categoryName && categoryPhoto) {

      console.log(categoryName);
      console.log(categoryPhoto);


       if(isCategoryEdit){
        const data={
          categoryName:categoryName,
          categoryPhoto:categoryPhoto,
          id:isCategoryEdit._id
      }

      const response=await dispatch(editPackageCategory(data))
      if(response?.payload){
          setCategoryName('')
          setCategoryPhoto('')
          Swal.fire("Package Category Update Succesfully!");
          setIsCategoryEdit(null)
      }
      setIsCategoryEdit(null)
      setIsCategoryModalOpen(null);
      setRotate(false)

      fetchData()
           
       }else{
        const data={
          categoryName:categoryName,
          categoryPhoto:categoryPhoto
      }
        const response=await dispatch(addPackageCategory(data))
        if(response?.payload){
          Swal.fire("Package Category is Added Succesfully!");
          setCategoryName('')
          setCategoryPhoto('')
        }
        fetchData()
        setIsCategoryModalOpen(!isCategoryModalOpen);
        
       }

    

      console.log(response);



      setIsCategoryModalOpen(!isCategoryModalOpen);
      
      // Dispatch action to add new category
      // dispatch(addPackageCategory({ categoryName, categoryPhoto }));
      // toggleCategoryModal(); // Close modal after adding category
    }
  };

  const handleAddInclude = async() => {
    console.log("add included ayush");
    
    if (includeName) {
      // Dispatch action to add new include
     console.log(isIncludeEdit);


     setRotate(true)
     

  
       if(isIncludeEdit){
              const data={
                includeName:includeName,
                id:isIncludeEdit._id
              }

              console.log("data is include",data);
              
              const response=await dispatch(editPackageInclude(data))
              console.log(response);
        
              if(response?.payload?.data){
                Swal.fire("Package Include Updated Succesfully!"); 
              }


              setRotate(true)
              setIsIncludeModalOpen(false)
        
              fetchInclude()
       }else{
        const response=await dispatch(addPackageInclude(includeName))
        console.log(response);
  
        if(response?.payload?.data){
          Swal.fire("Package Include  Added Succesfully!"); 
        }
        
        setIsIncludeModalOpen(false)
  
        fetchInclude()
       }      

  
      
      // dispatch(addPackageInclude({ includeName }));
      // toggleIncludeModal(); // Close modal after adding include
    }
  };

  // Handle edit category modal
  const handleEditCategory = (category) => {
    setIsCategoryEdit(category);
    setCategoryName(category.categoryName);
    setCategoryPhoto(category.categoryPhoto);
    console.log(category);
    
    toggleCategoryModal();
  };

  // Handle edit include modal
  const handleEditInclude = (include) => {
    setIsIncludeEdit(include);
    setIncludeName(include.includeName);
    console.log(include);
    
    toggleIncludeModal();
  };

  // Handle delete category
  const handleDeleteCategory = async(categoryId) => {
    // Call API to delete category (example)
    console.log("Deleting category with ID:", categoryId);
    const isConfirm=window.confirm("Are you sure,You want to delete")
    console.log(isConfirm);
    
    if(isConfirm){
    const response=await dispatch(deletePackageCategory(categoryId))
     fetchData()
  }
    
  };

  // Handle delete include
  const handleDeleteInclude = async(includeId) => {
    // Call API to delete include (example)
    console.log("Deleting include with ID:", includeId);

    const isConfirm=window.confirm("Are you Sure,you want to delete")
    if(isConfirm){
    const response=await dispatch(deletePackageInclude(includeId))
    if(response?.payload?.data){
      Swal.fire("Package Include Delete Succesfully!"); 
    }
    fetchInclude()
  }
   
  };



  return (
    <HomeLayout>
      <div className='w-full flex flex-col items-center justify-center mx-auto'>
        <h1 className='mt-4 text-3xl font-semibold text-black'>Package Customize Setup</h1>

        {/* Tabs for Category and Include */}
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 mx-auto w-full flex items-center">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2">
              <button 
                onClick={() => setActiveTab('category')} 
                className={`inline-block p-4 ${activeTab === 'category' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 border-b-2 border-transparent'}`}>
                Package Category
              </button>
            </li>
            <li className="mr-2">
              <button 
                onClick={() => setActiveTab('include')} 
                className={`inline-block p-4 ${activeTab === 'include' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 border-b-2 border-transparent'}`}>
                Package Include
              </button>
            </li>
          </ul>
        </div>

        {/* Package Category Table */}
        {activeTab === 'category' && (
          <div className="mt-4 w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Package Categories</h2>
              <button 
                onClick={toggleCategoryModal} 
                className="py-2 px-4 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700">
                Add Category
              </button>
            </div>

            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Category Name</th>
                  <th className="px-4 py-2 text-left">Category Photo</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {packageCategory && packageCategory.map((category) => (
                  <tr key={category.id}>
                    <td className="px-4 py-2">{category.categoryName}</td>
                    <td className="px-4 py-2">
                      <img src={category?.categoryPhoto?.secure_url} alt={category.categoryName} className="w-16 h-16 object-cover rounded-md" />
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <FaEdit onClick={() => handleEditCategory(category)} className="cursor-pointer text-blue-500" />
                      <FaTrash onClick={() => handleDeleteCategory(category._id)} className="cursor-pointer text-red-500" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Package Include Table */}
        {activeTab === 'include' && (
          <div className="mt-4 w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Package Includes</h2>
              <button 
                onClick={toggleIncludeModal} 
                className="py-2 px-4 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700">
                Add Include
              </button>
            </div>

            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Include Name</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {packageInclude && packageInclude.map((include) => (
                  
                  
                  <tr key={include.id} >
                    <td className="px-4 py-2">{include.includeName}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <FaEdit onClick={() => handleEditInclude(include)} className="cursor-pointer text-blue-500" />
                      <FaTrash onClick={() => handleDeleteInclude(include._id)} className="cursor-pointer text-red-500" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Category Modal */}
        {isCategoryModalOpen && (
          <div className="fixed top-0 left-0 z-[80] w-full h-full flex justify-center items-center bg-black bg-opacity-50 overflow-x-hidden overflow-y-auto" role="dialog">
            <div className="bg-white border shadow-sm rounded-xl w-full max-w-lg pointer-events-auto transition-all ease-out duration-500 mt-7 opacity-100 sm:mx-auto">
              <div className="flex justify-between items-center py-3 px-4 border-b">
                <h3 className="font-bold text-gray-800">{isCategoryEdit ? 'Edit Category' : 'Add Category'}</h3>
                <button onClick={toggleCategoryModal} className="w-8 h-8 inline-flex justify-center items-center rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200">
                  <span className="sr-only">Close</span>
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18"></path>
                    <path d="M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <label className="block text-sm font-medium mb-2">Category Name</label>
                <input 
                  type="text" 
                  className="py-3 px-4 block w-full border-black rounded-lg text-sm" 
                  value={categoryName} 
                  onChange={(e) => setCategoryName(e.target.value)} 
                />
                <label className="block text-sm font-medium mt-4 mb-2">Category Photo</label>
                <input 
                  type="file" 
                  onChange={(e) => setCategoryPhoto(e.target.files[0])} 
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm" 
                />
                <div className="mt-4 flex justify-end gap-2">
                  <button onClick={toggleCategoryModal} className="py-2 px-3 text-sm font-medium rounded-lg bg-white text-gray-800">Cancel</button>
                  <button onClick={()=>handleAddCategory()} className="py-2 px-3 text-sm font-medium rounded-lg bg-blue-600 text-white">
                    {isCategoryEdit ? 'Save Changes' : 'Add Category12'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Include Modal */}
        {isIncludeModalOpen && (
          <div className="fixed top-0 left-0 z-[80] w-full h-full flex justify-center items-center bg-black bg-opacity-50 overflow-x-hidden overflow-y-auto" role="dialog">
            <div className="bg-white border shadow-sm rounded-xl w-full max-w-lg pointer-events-auto transition-all ease-out duration-500 mt-7 opacity-100 sm:mx-auto">
              <div className="flex justify-between items-center py-3 px-4 border-b">
                <h3 className="font-bold text-gray-800">{isIncludeEdit ? 'Edit Include' : 'Add Include'}</h3>
                <button onClick={toggleIncludeModal} className="w-8 h-8 inline-flex justify-center items-center rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200">
                  <span className="sr-only">Close</span>
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18"></path>
                    <path d="M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <label className="block text-sm font-medium mb-2">Include Name</label>
                <input 
                  type="text" 
                  className="py-3 px-4 block w-full border-black rounded-lg text-sm" 
                  value={includeName} 
                  onChange={(e) => setIncludeName(e.target.value)} 
                />
                <div className="mt-4 flex justify-end gap-2">
                  <button onClick={toggleIncludeModal} className="py-2 px-3 text-sm font-medium rounded-lg bg-white text-gray-800">Cancel</button>
                  <button onClick={handleAddInclude} className="py-2 px-3 text-sm font-medium rounded-lg bg-blue-600 text-white">
                    {isIncludeEdit ? 'Save Changes' : 'Add Include'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </HomeLayout>
  );
};

export default ChangePackageSetup;