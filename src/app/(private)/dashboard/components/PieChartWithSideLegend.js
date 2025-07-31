'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';


const PieChartWithSideLegend = ({
    data,
    title
}) => {
    const total = data.reduce((acc, cur) => acc + cur.value, 0);
    return (
        <div className='bg-white rounded-xl shadow-md p-6 w-full max-w-xl'>
            <h2 className=' text-2xl font-semibold'>{title}</h2>
            <div className='flex flex-col md:flex-row items-center gap-6'>
                <div className='relative w-48 h-48'>
                    <ResponsiveContainer width='100%' height='100%'>
                        <PieChart>
                            <Pie
                                data={data}
                                innerRadius={60}
                                outerRadius={80}
                                dataKey='value'
                                stroke='white'
                                paddingAngle={2}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className='absolute inset-0 flex flex-col items-center justify-center'>
                        <span className='text-sm text-gray-500'>Total</span>
                        <span className='font-bold text-lg'>{total}</span>
                    </div>
                </div>
                <div className='flex-1 space-y-4'>
                    {data.map((item, idx) => (
                        <div
                            className='flex items-center gap-3 text-sm'
                            key={idx}
                        >
                            <span
                                className='inline-block w-2.5 h-2.5 rounded-full'
                                style={{ backgroundColor: item.color }}
                            />
                            <div className='flex justify-between w-full text-[20px]'>
                                <h3 className='font-medium '>{item.name}</h3>
                                <h3 className='text-gray-500 font-bold '>
                                    {item.value.toLocaleString()}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PieChartWithSideLegend;
