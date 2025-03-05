import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOperator, editOperator, getOperatorRole } from '../../Redux/Slices/OperaotSlice';
import { toast } from 'sonner';
import HomeLayout from '../../Layouts/HomeLayouts';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const AddOperatorPage = () => {
  
    const location=useLocation()
    const {state}=location
    const dispatch = useDispatch();
    const [name, setName] = useState(state?.name || "");
    const [email, setEmail] = useState(state?.email || "");
    const [password, setPassword] = useState(state?.password || "");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [selectedRoles, setSelectedRoles] = useState(state?.role?.map(role => role._id) || []);

    const [selectAll, setSelectAll] = useState(false);
    const { role, loading, error, success } = useSelector((state) => state.operator);


   console.log(selectedRoles);

   console.log(state);
   
   

    

    useEffect(() => {
        dispatch(getOperatorRole());
    }, [dispatch]);

    useEffect(() => {
        // If all roles are selected, set selectAll to true, otherwise false
        setSelectAll(selectedRoles.length === role?.length);
    }, [selectedRoles, role]);

    const handleRoleSelection = (roleId) => {
        setSelectedRoles((prevRoles) =>
            prevRoles.includes(roleId)
                ? prevRoles.filter((id) => id !== roleId)
                : [...prevRoles, roleId]
        );
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedRoles([]); // Deselect all
        } else {
            setSelectedRoles(role.map((r) => r._id)); // Select all
        }
        setSelectAll(!selectAll);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: name,
            email: email,
            password: password,
            role: selectedRoles
        };


        let response

        if(state){
           response= await dispatch(editOperator({data,id:state._id}));
        }else{
            response= await dispatch(addOperator(data));   
        }

     

        if (response?.payload?.success) {
            setName("");
            setEmail("");
            setPassword("");
            setPasswordVisible(false);
            setSelectedRoles([]);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <HomeLayout>
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add New Operator</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="text-lg font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-lg font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="text-lg font-medium text-gray-700">Password</label>
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 p-3 w-full border border-gray-300 rounded-md pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                        >
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <div>
                        <label className="text-lg font-medium text-gray-700">Select Roles</label>
                        <div className="mt-2 flex flex-wrap gap-4">
                            {/* Select All Checkbox */}
                            {role && role.length > 0 && (
                                <label className="flex w-full items-center space-x-2 text-gray-800 font-semibold">
                                    <input
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span>Select All</span>
                                </label>
                            )}

                            {/* Individual Role Checkboxes */}
                            {role && role.length > 0 ? (
                                role.map((r) => (
                                    <label key={r._id} className="flex w-[18%] items-center space-x-2 text-gray-800">
                                        <input
                                            type="checkbox"
                                            checked={selectedRoles.includes(r._id)}
                                            onChange={() => handleRoleSelection(r._id)}
                                            className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span>{r.title}</span>
                                    </label>
                                ))
                            ) : (
                                <p className="text-gray-500">No roles available.</p>
                            )}
                        </div>
                    </div>
                    
                  
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white p-3 rounded-md text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    >
                       {state ? (!loading ? "Edit operator" : "Adding") : (!loading ? "Add operator" : "Adding")}

                        {/* {loading ? 'Adding...' : 'Add Operator'} */}
                    </button>
                    {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
                    {success && <p className="text-green-500 mt-2 text-center">{success}</p>}
                </form>
            </div>
        </HomeLayout>
    );
};

export default AddOperatorPage;
