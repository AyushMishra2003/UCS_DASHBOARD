import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CarTypes = ['Sedan', 'SUV', 'Hatchback', 'Convertible', 'Coupe'];
const colors = ['#655CCE', '#1206FF', '#FF4C51', '#FF5900', '#00B753'];

const BookingsRevenueChart = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Temporary data for car booking revenues
        const sedanRevenue = 250000;
        const suvRevenue = 500000;
        const hatchbackRevenue = 150000;
        const convertibleRevenue = 300000;
        const coupeRevenue = 200000;

        const data = [
            sedanRevenue,
            suvRevenue,
            hatchbackRevenue,
            convertibleRevenue,
            coupeRevenue,
        ];

        setChartData({
            labels: CarTypes,
            datasets: [
                {
                    label: 'Car Booking Revenue (in Rs)',
                    data,
                    backgroundColor: colors,
                    borderRadius: 4,
                    hoverBackgroundColor: '#FF4C51',
                    barThickness: 15,
                    minBarLength: 2
                }
            ]
        });
        setLoading(false);
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className='h-[20rem] w-full flex flex-col items-center gap-1 mb-4 lg:mb-3 bg-white pb-[3rem] p-3 rounded-md shadow-[0px_0px_12px_-5px_#808080]'>
            <h2 className='ml-8 font-semibold text-[1.1rem] text-[#655CCE]'>Car Bookings Revenue</h2>
            {chartData && (
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        indexAxis: 'y', // Set to 'y' for horizontal bar chart
                        plugins: {
                            legend: {
                                position: 'top',
                                labels: {
                                    font: {
                                        size: 14,
                                        family: "'Arial', sans-serif",
                                    },
                                    color: '#333',
                                },
                            },
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: false,
                                },
                                ticks: {
                                    font: {
                                        size: 14,
                                        family: "'Arial', sans-serif",
                                    },
                                    color: '#333',
                                    callback: function (value) {
                                        if (value >= 1000000) {
                                            return Math.floor(value / 1000000) + 'M';
                                        } else if (value >= 1000) {
                                            return Math.floor(value / 1000) + 'k';
                                        } else {
                                            return value;
                                        }
                                    }
                                },
                            },
                            y: {
                                grid: {
                                    display: false,
                                },
                                ticks: {
                                    font: {
                                        size: 14,
                                        family: "'Arial', sans-serif",
                                    },
                                    color: '#333',
                                },
                            },
                        },
                    }}
                />
            )}
        </div>
    );
};

export default BookingsRevenueChart;
