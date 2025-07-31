'use client';
import TableList from '@/components/Table';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import FormReview from './components/FormReview';
import { fetchDetailEmployee, fetchEmployees } from '@/data/real/employee';
export default function PendingActionPage() {
    const [listEmployee, setListEmployee] = useState([]);
    const [dataEmployeeDetail, setDataEmployee] = useState(null);
    useEffect(()=>{
        fetchEmployees({
            onSuccess: (data) => {
                setListEmployee(data)
            }
        })
    },[]);
    console.log({listEmployee})
    const [isOpen, setIsOpen] = useState(false);
    // const employeeDetails = [
    //   {
    //     id: 1,
    //     name: 'Asep Hidayat',
    //     nik: 'NIK001',
    //     reportingManager: null,
    //     jobTitle: 'Lead Backend Engineer',
    //     jobLevel: 'Specialist',
    //     departmentName: 'Product Development & Operation',
    //     divisionName: 'Backend Engineering',
    //     active: true,
    //     threeSixtyReviews: [],
    //     summarizedReview: null,
    //   },
    //   {
    //     id: 2,
    //     name: 'Rina Maharani',
    //     nik: 'NIK002',
    //     reportingManager: 'Asep Hidayat',
    //     jobTitle: 'Senior Frontend Engineer',
    //     jobLevel: 'Senior',
    //     departmentName: 'Product Development & Operation',
    //     divisionName: 'Frontend Engineering',
    //     active: true,
    //     threeSixtyReviews: [],
    //     summarizedReview: null,
    //   },
    //   {
    //     id: 3,
    //     name: 'Budi Santoso',
    //     nik: 'NIK003',
    //     reportingManager: 'Rina Maharani',
    //     jobTitle: 'Mid Backend Engineer',
    //     jobLevel: 'Intermediate',
    //     departmentName: 'Product Development & Operation',
    //     divisionName: 'Backend Engineering',
    //     active: true,
    //     threeSixtyReviews: [],
    //     summarizedReview: null,
    //   },
    //   {
    //     id: 4,
    //     name: 'Siti Nurhaliza',
    //     nik: 'NIK004',
    //     reportingManager: 'Rina Maharani',
    //     jobTitle: 'UI/UX Designer',
    //     jobLevel: 'Intermediate',
    //     departmentName: 'Product Design',
    //     divisionName: 'UX Team',
    //     active: true,
    //     threeSixtyReviews: [],
    //     summarizedReview: null,
    //   },
    //   {
    //     id: 5,
    //     name: 'Dedi Supriadi',
    //     nik: 'NIK005',
    //     reportingManager: 'Asep Hidayat',
    //     jobTitle: 'DevOps Engineer',
    //     jobLevel: 'Junior',
    //     departmentName: 'Infrastructure & Security',
    //     divisionName: 'DevOps',
    //     active: true,
    //     threeSixtyReviews: [],
    //     summarizedReview: null,
    //   },
    //   {
    //     id: 6,
    //     name: 'Fitri Yani',
    //     nik: 'NIK006',
    //     reportingManager: 'Siti Nurhaliza',
    //     jobTitle: 'Product Manager',
    //     jobLevel: 'Lead',
    //     departmentName: 'Product Management',
    //     divisionName: 'Core Apps',
    //     active: true,
    //     threeSixtyReviews: [],
    //     summarizedReview: null,
    //   },
    // ];
    
    
    useEffect(()=>{
        if(dataEmployeeDetail){
            setIsOpen(true)
        }
    },[dataEmployeeDetail]);
    const getDetailData = (dataEmployee) => {
        fetchDetailEmployee({
            employeeId: dataEmployee?.id,
            onSuccess: (data) => {
                setDataEmployee(data)
            }
        })
    }
    const columns = [
        {
            key: 'name',
            label: 'Full name',
        },
        {
            key: 'jobTitle',
            label: 'Job Title',
        },
        {
            key: 'jobLevel',
            label: 'Job Level',
        },
        {
            key: 'divisionName',
            label: 'Division',
        },
        {
            key: 'departmentName',
            label: 'Department',
        },
        {
            key: 'actions',
            label: '',
            render: (_, row) => (
                <div className='relative'>
                    <div className='dropdown dropdown-end'>
                        <div
                            tabIndex={row.id}
                            role='button'
                            className='btn btn-sm btn-outline btn-primary m-1'
                        >
                            Action
                        </div>
                        <ul
                            tabIndex={row.id}
                            className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-36 mt-1'
                        >
                            <li>
                                <button
                                    onClick={() => {
                                        getDetailData(row)
                                    }}
                                    type='button'
                                >
                                    Isi Review
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            ),
        },
    ];
    
    return (
        <div className='p-6 bg-gray-50 min-h-screen'>
            <div className='mb-6 text-sm text-gray-500'>
                <a href='#' className='hover:underline'>
                    Performance review
                </a>{' '}
                / <span>Pending action</span>
            </div>

            <h1 className='text-2xl font-semibold mb-6'>
                2025 Mid Year PA - Competency Review (IC)
            </h1>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
                <div>
                    <p className='text-gray-500 text-sm'>Company name</p>
                    <p className='font-medium'>
                        Enterprise Digital Technology Services (EDTS)
                    </p>
                </div>
                <div>
                    <p className='text-gray-500 text-sm'>Time frame</p>
                    <p className='font-medium'>1 Jan - 15 Jun 2025</p>
                </div>
                <div>
                    <p className='text-gray-500 text-sm'>Review period</p>
                    <p className='font-medium'>16 Jun - 8 Aug 2025</p>
                </div>
            </div>

            <div className='mb-4 flex items-center gap-4'>
                <div className='badge badge-success badge-outline'>
                    Submit: 6
                </div>
                <div className='badge badge-warning badge-outline'>
                    Save as draft: 0
                </div>
                <div className='badge badge-neutral badge-outline'>
                    Not started: 0
                </div>
            </div>

            <TableList columns={columns} data={listEmployee} />
            <div className='flex justify-between items-center mt-4 text-sm text-gray-600'>
                <span>
                    Rows per page:{' '}
                    <select className='ml-1 border px-1 py-0.5 rounded text-sm'>
                        <option>10</option>
                    </select>
                </span>
                <span>Showing 1 - 6 of 6</span>
                <span className='flex gap-2'>
                    <button className='px-2'>◀</button>
                    <span>1</span>
                    <span>of 1 page</span>
                    <button className='px-2'>▶</button>
                </span>
            </div>
            <FormReview
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              dataEmployeeDetail={dataEmployeeDetail}
            />
        </div>
    );
}
