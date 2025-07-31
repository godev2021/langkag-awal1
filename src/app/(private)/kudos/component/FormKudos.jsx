'use client';

import { fetchEmployees, fetchLeaderBoardKudos } from '@/data/real/employee';
import { useEffect, useState } from 'react';
import Select from 'react-select';

const employeeOptions = [
    { value: 'john', label: 'John Doe' },
    { value: 'jane', label: 'Jane Smith' },
    { value: 'alif', label: 'Alif Pratama' },
];

const pointOptions = [
    { value: 1, label: 'Thank you 🙏' },
    { value: 2, label: 'Great job! 💪' },
    { value: 3, label: 'Keep it up! 🔥' },
    { value: 4, label: 'Well done 👏' },
];

export default function FormKudos({ setIsOpen, reloadData}) {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [message, setMessage] = useState('');
    useEffect(() => {
        fetchEmployees({
            onSuccess: (data) => {
                const dataEmp = data.map((val) => {
                    return {
                        value: val.id,
                        label: val.name,
                    };
                });
                setEmployees(dataEmp);
            },
        });
    }, []);
    const handleSubmit = async () => {
        const payload = {
            //fromEmployeeId: selectedEmployee?.value,
            fromEmployeeId: 1,
            toEmployeeId: selectedEmployee?.value,
            message,
            category: selectedPoint?.label,
        };

        try {
            const response = await fetch('http://34.101.38.23:8080/api/kudos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Failed to submit');
            }

            //const data = await response.json();
            setIsOpen(false)
            // reset form if needed
            setSelectedEmployee(null);
            setSelectedPoint(null);
            setMessage('');
            reloadData();
        } catch (error) {
            console.error('Error submitting kudos:', error);
            // show error toast or UI message
        }
    };

    return (
        <div className='bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md space-y-6 border border-gray-200 dark:border-gray-700'>
            {/* Bagian 1: Select Karyawan */}
            <div>
                <label className='block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200'>
                    Pilih Karyawan
                </label>
                <Select
                    options={employees}
                    value={selectedEmployee}
                    onChange={setSelectedEmployee}
                    placeholder='Pilih karyawan'
                />
            </div>

            {/* Bagian 2: Point Penilaian */}
            <div>
                <label className='block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200'>
                    Point Penilaian
                </label>
                <div className='flex gap-3'>
                    {pointOptions.map((point) => (
                        <button
                            key={point.value}
                            type='button'
                            onClick={() => setSelectedPoint(point)}
                            className={`px-4 py-2 rounded-lg font-medium text-sm border border-slate-300 text-left max-w-[45%]
              ${
                  selectedPoint?.value === point.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
              }`}
                        >
                            {point.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Bagian 3: Pesan */}
            <div>
                <label className='block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200'>
                    Pesan
                </label>
                <textarea
                    rows={4}
                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600'
                    placeholder='Tulis pesan motivasi atau feedback...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>
            </div>

            {/* Bagian 4: Tombol Simpan */}
            <div className='text-right'>
                <button
                    onClick={handleSubmit}
                    className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold text-sm'
                >
                    Simpan
                </button>
            </div>
        </div>
    );
}
