import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOperator } from '../../Redux/Slices/OperaotSlice';
import { toast } from 'sonner';
import HomeLayout from '../../Layouts/HomeLayouts';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AddOperatorPage = () => {
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector((state) => state.operator);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addOperator({ name, email, password }))
            .unwrap()
            .then(() => {
                setName('');
                setEmail('');
                setPassword('');
                toast.success('Operator added successfully!');
            })
            .catch(() => {
                toast.error('Failed to add operator.');
            });
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <HomeLayout>
            <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-center">Add New Operator</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-lg font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="p-2 border rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-lg font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="p-2 border rounded-md"
                        />
                    </div>
                    <div className="flex flex-col relative">
                        <label htmlFor="password" className="text-lg font-medium text-gray-700">Password</label>
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="p-2 border rounded-md pr-10"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-2 flex items-center"
                        >
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600"
                    >
                        {loading ? 'Adding...' : 'Add Operator'}
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    {success && <p className="text-green-500 mt-2">{success}</p>}
                </form>
            </div>
        </HomeLayout>
    );
};

export default AddOperatorPage;
