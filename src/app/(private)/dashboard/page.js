'use client';

import TableList from '@/components/Table';
import { format } from 'date-fns';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import DetailEmployee from './components/DetailEmployee';
import PieChartWithSideLegend from './components/PieChartWithSideLegend';

const handleSummarize = async (employeeIds) => {
    console.log(employeeIds)
  if (!employeeIds || employeeIds.length === 0) {
    alert('Daftar employeeId tidak boleh kosong');
    return;
  }
  try {
    for (const id of employeeIds) {
      const res = await fetch(`http://34.101.38.23:8080/api/employee/summarize/${id}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log(`Response untuk employeeId ${id}:`, data);
    }
  } catch (err) {
    console.error('Gagal fetch:', err);
  }
};

export default function DashboardPage() {
   
    const [employees, setEmployees] = useState([]);
    const [detailEmployee, setDetailEmployees] = useState([]);

    useEffect(() => {
      const fetchEmployees = async () => {
        try {
          const response = await fetch('http://34.101.38.23:8080/api/employee/list');

          if (!response.ok) {
            throw new Error('Gagal fetch employee');
          }

          const resJson = await response.json();

          const updatedEmployees = resJson.data.map((emp) => ({
            ...emp,
            avatar: `https://randomuser.me/api/portraits/${emp.id % 2 === 0 ? 'women' : 'men'}/${emp.id}.jpg`,
          }));

          setEmployees(updatedEmployees);
        } catch (error) {
          console.error('Error fetching employee data:', error);
        }
      };

      fetchEmployees();
    }, []);

    const [isOpen, setIsOpen] = useState(false)
    const clusterPerformanceData = [
        {
            name: 'Rising Star',
            value: 2040,
            percent: 48,
            color: '#22c55e',
        }, // blue
        { name: 'Perform', value: 1402, percent: 33, color: '#3b82f6' }, // indigo
        { name: 'Under Perform', value: 510, percent: 19, color: '#ef4444' }, // light blue
    ];

const employeeDetails = [
        {
          id: 1,
          name: 'Asep Hidayat',
          nik: 'NIK001',
          reportingManager: null,
          jobTitle: 'Lead Backend Engineer',
          jobLevel: 'Specialist',
          departmentName: 'Product Development & Operation',
          divisionName: 'Backend Engineering',
          active: true,
          threeSixtyReviews: [],
          summarizedReview: null,
        },
        {
          id: 2,
          name: 'Rina Maharani',
          nik: 'NIK002',
          reportingManager: 'Asep Hidayat',
          jobTitle: 'Senior Frontend Engineer',
          jobLevel: 'Senior',
          departmentName: 'Product Development & Operation',
          divisionName: 'Frontend Engineering',
          active: true,
          threeSixtyReviews: [],
          summarizedReview: null,
        },
        {
          id: 3,
          name: 'Budi Santoso',
          nik: 'NIK003',
          reportingManager: 'Rina Maharani',
          jobTitle: 'Mid Backend Engineer',
          jobLevel: 'Intermediate',
          departmentName: 'Product Development & Operation',
          divisionName: 'Backend Engineering',
          active: true,
          threeSixtyReviews: [],
          summarizedReview: null,
        },
        {
          id: 4,
          name: 'Siti Nurhaliza',
          nik: 'NIK004',
          reportingManager: 'Rina Maharani',
          jobTitle: 'UI/UX Designer',
          jobLevel: 'Intermediate',
          departmentName: 'Product Design',
          divisionName: 'UX Team',
          active: true,
          threeSixtyReviews: [],
          summarizedReview: null,
        },
        {
          id: 5,
          name: 'Dedi Supriadi',
          nik: 'NIK005',
          reportingManager: 'Asep Hidayat',
          jobTitle: 'DevOps Engineer',
          jobLevel: 'Junior',
          departmentName: 'Infrastructure & Security',
          divisionName: 'DevOps',
          active: true,
          threeSixtyReviews: [],
          summarizedReview: null,
        },
        {
          id: 6,
          name: 'Fitri Yani',
          nik: 'NIK006',
          reportingManager: 'Siti Nurhaliza',
          jobTitle: 'Product Manager',
          jobLevel: 'Lead',
          departmentName: 'Product Management',
          divisionName: 'Core Apps',
          active: true,
          threeSixtyReviews: [],
          summarizedReview: null,
        },
      ];
      
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
                              className='btn btn-sm btn-outline btn-primary m-1 rounded'
                          >
                              Action
                          </div>
                          <ul
                              tabIndex={row.id}
                              className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-36 mt-1'
                          >
                              <li>
                                  <button
                                        onClick={async () => {
                                        try {
                                            const response = await fetch(`http://34.101.38.23:8080/api/employee/${row.id}`);
                                            if (!response.ok) {
                                                throw new Error('Gagal fetch detail employee');
                                            }
                                            const data = await response.json();
                                            console.log('Detail Employee:', data);
                                            setDetailEmployees(data);
                                            setIsOpen(true);
                                        } catch (err) {
                                            console.error(err);
                                        }
                                    }}
                                      type='button'
                                  >
                                      Lihat Detail
                                  </button>
                              </li>
                          </ul>
                      </div>
                  </div>
              ),
          },
      ];
    
    return (
        <div className='p-6 space-y-10'>
            {/* Section Atas */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <PieChartWithSideLegend
                    title='Cluster Performance'
                    data={clusterPerformanceData}
                />
                <div className='bg-white rounded-xl p-4 shadow'>
                    <h2 className='text-xl font-semibold mb-4 text-center'>
                        Employee of the Year {format(new Date(), 'yyyy')}
                    </h2>

                    <Swiper
                        modules={[Pagination]}
                        pagination={{ clickable: true }}
                        //autoplay={{ delay: 3000, disableOnInteraction: false }}
                        spaceBetween={30}
                        slidesPerView={1}
                        className='w-full'
                    >
                        {employees.map((emp) => (
                            <SwiperSlide key={emp.id}>
                                <div className='flex items-center gap-6 px-4 h-48' style={{ marginLeft: '30px', marginTop: '-20px', marginBottom: '20px' }}>
                                    <div className='relative w-48 h-48 rounded-full overflow-hidden'>
                                        {/* Background image from public/images */}
                                        <div
                                            className='absolute inset-0 bg-cover bg-center z-0'
                                            style={{
                                                backgroundImage:
                                                    "url('/images/best-work.jpg')",
                                            }}
                                        ></div>
                                        {/* Foreground content */}
                                        <div className='relative z-20 flex items-center justify-center h-full text-white'>
                                            <Image
                                                src={emp.avatar}
                                                alt={emp.name}
                                                width={100}
                                                height={100}
                                                className='object-cover z-40 rounded-full'
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className='text-lg font-semibold text-[20px]'>
                                            {emp.name}
                                        </h3>
                                        <h3 className='text-lg font-semibold text-[16px]'>
                                            {emp.division}
                                        </h3>
                                        <p className='text-gray-500'>
                                            {emp.jobTitle}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* Section Tengah */}
            <div className='bg-white rounded-xl p-4 shadow'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-lg font-semibold mb-4'>Datfar Karyawan</h2>
                   
                </div>
                
                <div className='overflow-y-auto'>
                <div className='flex flex-wrap gap-2 mb-4 items-center'>
            
                <select className='select select-bordered max-w-xs'>
                    <option>Semua Divisi</option>
                    <option>Backend Engineering</option>
                    <option>Frontend Engineering</option>
                </select>
                <div className='ml-auto'>
                    <input
                        type='text'
                        placeholder='Cari Nama Karyawan…'
                        className='input input-bordered w-full max-w-xs'
                    />
                    
                </div>
                <button
                      type='button'
                      className='btn btn-primary btn-md rounded'
                      onClick={() => handleSummarize(employees.map(emp => emp.id))}
                    >
                      Summerize Penilaian
                    </button>
                
            </div>
                    <TableList columns={columns} data={employees} />
                        </div>
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
            </div>


            <DetailEmployee
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                detailEmployee={detailEmployee}
            />
        </div>
    );
}
