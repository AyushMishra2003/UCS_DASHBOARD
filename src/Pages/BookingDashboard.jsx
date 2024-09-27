import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';
import HomeLayout from '../Layouts/HomeLayouts';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const initialDistances = [
    { type: 'Airport Trip', min: 0, max: 50, charge: 500 },
    { type: 'Round Trip', min: 0, max: 100, charge: 1000 },
    { type: 'Local Trip', min: 0, max: 30, charge: 300 },
];

const BookingDashboard = () => {
    const [distances, setDistances] = useState(initialDistances);
    const [newDistance, setNewDistance] = useState({ type: '', min: '', max: '', charge: '' });
    const [editIndex, setEditIndex] = useState(null);

    const chartData = {
        labels: distances.map(d => `${d.type} (${d.min}km - ${d.max}km)`),
        datasets: [
            {
                label: 'Charge',
                data: distances.map(d => d.charge),
                backgroundColor: '#4E73DF',
                borderRadius: 4,
                hoverBackgroundColor: '#2E59D9',
                barThickness: 15,
                minBarLength: 2
            }
        ]
    };

    const handleAdd = () => {
        if (newDistance.type && newDistance.min && newDistance.max && newDistance.charge) {
            setDistances([...distances, newDistance]);
            setNewDistance({ type: '', min: '', max: '', charge: '' });
        }
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setNewDistance(distances[index]);
    };

    const handleUpdate = () => {
        if (editIndex !== null && newDistance.type && newDistance.min && newDistance.max && newDistance.charge) {
            const updatedDistances = distances.map((item, index) => 
                index === editIndex ? newDistance : item
            );
            setDistances(updatedDistances);
            setEditIndex(null);
            setNewDistance({ type: '', min: '', max: '', charge: '' });
        }
    };

    const handleDelete = (index) => {
        const updatedDistances = distances.filter((_, i) => i !== index);
        setDistances(updatedDistances);
    };

    return (
        <HomeLayout>
        <div className="p-4 bg-white rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Booking Dashboard</h2>

            <div className="flex flex-col mb-4">
                <h3 className="text-lg font-medium mb-2">Add/Edit Distance</h3>
                <div className="flex flex-col gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="Type"
                        value={newDistance.type}
                        onChange={(e) => setNewDistance({ ...newDistance, type: e.target.value })}
                        className="border border-gray-300 p-2 rounded"
                    />
                    <input
                        type="number"
                        placeholder="Min Distance (km)"
                        value={newDistance.min}
                        onChange={(e) => setNewDistance({ ...newDistance, min: e.target.value })}
                        className="border border-gray-300 p-2 rounded"
                    />
                    <input
                        type="number"
                        placeholder="Max Distance (km)"
                        value={newDistance.max}
                        onChange={(e) => setNewDistance({ ...newDistance, max: e.target.value })}
                        className="border border-gray-300 p-2 rounded"
                    />
                    <input
                        type="number"
                        placeholder="Charge"
                        value={newDistance.charge}
                        onChange={(e) => setNewDistance({ ...newDistance, charge: e.target.value })}
                        className="border border-gray-300 p-2 rounded"
                    />
                    {editIndex === null ? (
                        <button onClick={handleAdd} className="bg-blue-500 text-white p-2 rounded flex items-center gap-2">
                            <MdAdd /> Add Distance
                        </button>
                    ) : (
                        <button onClick={handleUpdate} className="bg-green-500 text-white p-2 rounded flex items-center gap-2">
                            <FaEdit /> Update Distance
                        </button>
                    )}
                </div>
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Distances</h3>
                <div className="mb-4">
                    <Bar
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: false
                                },
                                tooltip: {
                                    callbacks: {
                                        label: (context) => {
                                            return `Charge: ${context.raw}`;
                                        }
                                    }
                                }
                            },
                            scales: {
                                x: {
                                    grid: {
                                        display: false
                                    },
                                    ticks: {
                                        font: {
                                            size: 14
                                        }
                                    }
                                },
                                y: {
                                    grid: {
                                        display: true
                                    },
                                    ticks: {
                                        font: {
                                            size: 14
                                        }
                                    }
                                }
                            }
                        }}
                        height={250}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    {distances.map((item, index) => (
                        <div key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                            <div>
                                <p className="font-semibold">{item.type}</p>
                                <p>{item.min}km - {item.max}km</p>
                                <p>Charge: {item.charge}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(index)} className="bg-yellow-500 text-white p-2 rounded">
                                    <FaEdit />
                                </button>
                                <button onClick={() => handleDelete(index)} className="bg-red-500 text-white p-2 rounded">
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </HomeLayout>
    );
};

export default BookingDashboard;
