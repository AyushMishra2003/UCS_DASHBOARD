import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalMonthlyRevenue } from '../../Redux/Slices/StatsSlice';
import Skeleton from 'react-loading-skeleton'; // Import Skeleton component
import 'react-loading-skeleton/dist/skeleton.css'; // Import skeleton styles

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const monthMap = {
    January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
    July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
};

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const MonthlyPaymentsChart = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const monthlyPayments = useSelector((state) => state.stats.monthlyRevenue);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // await dispatch(getTotalMonthlyRevenue());
            } catch (error) {
                console.error('Error fetching payments data:', error);
                setError('Error fetching payments data');
            }
        };

        fetchData();
    }, [dispatch]);

    useEffect(() => {
        if (monthlyPayments) {
            // Initialize data array with 0s
            const data = new Array(12).fill(0);

            // Populate data array with payments divided by 100
            Object.entries(monthlyPayments).forEach(([month, amount]) => {
                const index = monthMap[month];
                if (index !== undefined) {
                    data[index] = amount / 100; // Ensure amount is divided by 100
                }
            });

            setChartData({
                labels: monthNames,
                datasets: [
                    {
                        label: 'Monthly Payments (in Rs)',
                        data,
                        backgroundColor: '#655CCE',
                        borderRadius: 3,
                        hoverBackgroundColor: '#FF4C51',
                        barThickness: 18,
                        minBarLength: 1

                    }
                ]
            });
            setLoading(false);
        }
    }, [monthlyPayments]);

    if (loading) return (
        <div className='h-[22rem] pl-0 w-full flex flex-col items-center gap-4 mb-6 bg-white pb-[3rem] p-3 rounded-md shadow-[0px_0px_18px_-3px_#808080]'>
            <h2 className='ml-8 font-semibold text-[1.1rem] text-[#655CCE]'>Monthly Incomes</h2>
            <Skeleton height={300} />
        </div>
    );

    if (error) return <p>{error}</p>;

    return (
        <div className='h-[20rem] pl-0 w-full flex flex-col items-center gap-1 mb-6 bg-white pb-[3rem] p-3 rounded-md shadow-[0px_0px_12px_-5px_#808080]'>
            <h2 className='ml-8 font-semibold text-[1.1rem] text-[#655CCE]'>Monthly Incomes</h2>
            {chartData && (
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        aspectRatio: 2 / 2,
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
                                },
                            },
                            y: {
                                grid: {
                                    display: false,
                                },
                                ticks: {
                                    z: 1,
                                    stepSize: 0.01,
                                    mirror: true,
                                    minTicksLimit: 5,
                                    maxTicksLimit: 8,
                                    beginAtZero: true,
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
                                    },
                                    padding: 5,
                                },
                                position: 'left',
                            },
                        },
                    }}
                />
            )}
        </div>
    );
};

export default MonthlyPaymentsChart;
