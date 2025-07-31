'use client';
import FullscreenModal from '@/components/FullscreemModal';
import TableList from '@/components/Table';
import Image from 'next/image';
import { useState } from 'react';
import PieChartWithSideLegend from './PieChartWithSideLegend';

const DetailEmployee = ({ isOpen, setIsOpen, detailEmployee }) => {
    const dataEmployee = detailEmployee.data;
    const [isKpiModalOpen, setIsKpiModalOpen] = useState(false);
    const [kpiScore, setKpiScore] = useState('');
    const columns360 = [
        {
            key: 'reviewerName',
            label: 'Reviewer Name',
        },
        {
            key: 'reviewScore',
            label: 'Score Review',
        },
        {
            key: 'reviewContribution',
            label: 'Contribution',
        },
        {
            key: 'reviewStrength',
            label: 'Strength',
        },
        {
            key: 'reviewDevelopment',
            label: 'Development',
        },
    ];
    const totalAbsence =
        dataEmployee?.attendance?.totalWfh +
        dataEmployee?.attendance?.totalAbsence +
        dataEmployee?.attendance?.totalLateDays +
        dataEmployee?.attendance?.totalSick;
    const absentData = [
        {
            name: 'WFH',
            value: dataEmployee?.attendance?.totalWfh,
            percent: (dataEmployee?.attendance?.totalWfh / totalAbsence) * 100,
            color: '#10b981', // Emerald (hijau segar)
        },
        {
            name: 'Sakit',
            value: dataEmployee?.attendance?.totalSick,
            percent: (dataEmployee?.attendance?.totalSick / totalAbsence) * 100,
            color: '#6366f1', // Indigo
        },
        {
            name: 'Absent',
            value: dataEmployee?.attendance?.totalAbsence,
            percent:
                (dataEmployee?.attendance?.totalAbsence / totalAbsence) * 100,
            color: '#f97316', // Orange (lebih terang dari merah)
        },
        {
            name: 'Terlambat',
            value: dataEmployee?.attendance?.totalLateDays,
            percent:
                (dataEmployee?.attendance?.totalLateDays / totalAbsence) * 100,
            color: '#eab308', // Yellow (kuning terang)
        },
    ];

    const totalKudos =
        dataEmployee?.kudosResult?.kudosCLevel +
        dataEmployee?.kudosResult?.kudosManager +
        dataEmployee?.kudosResult?.kudosPeer;
    const kudosData = [
        {
            name: 'C Level',
            value: dataEmployee?.kudosResult?.kudosCLevel ?? 0,
            percent: (dataEmployee?.kudosResult?.kudosCLevel / totalKudos) * 100,
            color: '#22c55e',
        },
        {
            name: 'Manager',
            value: dataEmployee?.kudosResult?.kudosManager ?? 0,
            percent: dataEmployee?.kudosResult?.kudosManager / totalKudos,
            color: '#3b82f6',
        },
        {
            name: 'Peer',
            value: dataEmployee?.kudosResult?.kudosPeer ?? 0,
            percent: dataEmployee?.kudosResult?.kudosPeer / totalKudos,
            color: '#ef4444',
        },
    ];
    return (
        <FullscreenModal
            title='Profil Karyawan'
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            <div className='rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6'>
                <div className='p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6'>
                    <div className='flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between'>
                        <div className='flex flex-col items-center w-full gap-6 xl:flex-row'>
                            <div className='w-20 h-20 border border-gray-200 rounded-full dark:border-gray-800'>
                                <Image
                                    src={
                                        'https://randomuser.me/api/portraits/women/6.jpg'
                                    }
                                    width={80}
                                    height={80}
                                    className='w-full h-full object-cover rounded-full'
                                    alt='avatar-profile'
                                />
                            </div>
                            <div className='flex flex-col xl:flex-row justify-between items-start w-full'>
                                <div>
                                    <h4 className='mt-3 mb-1 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left'>
                                        {dataEmployee?.name}
                                    </h4>
                                    <h4 className='mb- text-md font-semibold text-gray-500 dark:text-gray-400'>
                                        {dataEmployee?.jobLevel} -{' '}
                                        {dataEmployee?.jobTitle}
                                    </h4>
                                    <div className='flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left'>
                                        <p className='text-sm text-gray-500 dark:text-gray-400'>
                                            {dataEmployee?.divisionName}
                                        </p>
                                        <div className='hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block'></div>
                                        <p className='text-sm text-gray-500 dark:text-gray-400'>
                                            {dataEmployee?.departmentName}
                                        </p>
                                    </div>
                                </div>
                                <div className='mt-2 text-right'>
                                    <button
                                        type='button'
                                        className='btn btn-primary btn-md rounded mb-2'
                                        onClick={() => setIsKpiModalOpen(true)}
                                    >
                                        Tambah Nilai KPI
                                    </button>
                                    <p className='text-sm text-gray-800 dark:text-white'>
                                        <span className='font-semibold'>
                                            Final Score:
                                        </span>{' '}
                                        {dataEmployee?.performance
                                            ?.finalTotalScore ?? '-'}
                                    </p>
                                    <p className='text-sm text-gray-800 dark:text-white'>
                                        <span className='font-semibold'>
                                            Clustering:
                                        </span>{' '}
                                        {dataEmployee?.performance
                                            ?.clustering ?? '-'}
                                    </p>
                                </div>
                                {/* <div className='mt-6 text-right'>
                        <button
                            type='button'
                            className='btn btn-primary btn-md rounded'
                            onClick={() => setIsKpiModalOpen(true)}
                            >
                            Tambah Nilai KPI
                        </button>
                    </div>   */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6'>
                    <h5
                        className='text-sm font-semibold text-gray-700 dark:text-white mb-3'
                        style={{ marginBottom: '30px' }}
                    >
                        Jenjang Karir
                    </h5>
                    <div
                        className='flex justify-between items-center px-4 mb-6 overflow-x-auto'
                        style={{ gap: 0, marginBottom: '10px' }}
                    >
                        <div className='flex items-center justify-between relative w-full'>
                            {(() => {
                                const milestonePath = [
                                    'Associate',
                                    'Sr. Associate',
                                    'Senior 1',
                                    'Senior 2',
                                    'Specialist 1',
                                    'Specialist 2',
                                    'Principal',
                                ];
                                const currentIndex = milestonePath.indexOf(
                                    dataEmployee?.jobLevel
                                );
                                return milestonePath.map((level, idx) => {
                                    const reached = idx <= currentIndex;
                                    return (
                                        <div
                                            key={level}
                                            className='flex-1 flex flex-col items-center relative'
                                        >
                                            <div
                                                className={`w-4 h-4 rounded-full z-10 ${
                                                    reached
                                                        ? 'bg-primary'
                                                        : 'bg-gray-300'
                                                }`}
                                            ></div>
                                            <p
                                                className={`text-xs mt-2 text-center whitespace-nowrap ${
                                                    reached
                                                        ? 'text-primary font-semibold'
                                                        : 'text-gray-400'
                                                }`}
                                            >
                                                {level}
                                            </p>
                                            {idx !==
                                                milestonePath.length - 1 && (
                                                <div className='absolute top-2 left-1/2 w-full h-1 bg-gray-300 z-0'></div>
                                            )}
                                        </div>
                                    );
                                });
                            })()}
                        </div>
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row gap-6 mb-6'>
                    <div className='flex-1 border border-gray-200 rounded-xl dark:border-gray-800 lg:p-6'>
                        <PieChartWithSideLegend
                            title='Performa Absensi'
                            data={absentData}
                        />
                    </div>
                    <div className='flex-1 border border-gray-200 rounded-xl dark:border-gray-800 lg:p-6'>
                        <PieChartWithSideLegend
                            title='Kudos'
                            data={kudosData}
                        />
                    </div>
                </div>
                <div className='p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6'>
                    <h4 className='text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6'>
                        Hasil Review 360
                    </h4>
                    <TableList
                        data={dataEmployee?.threeSixtyReviews}
                        columns={columns360}
                    />
                </div>
                <div className='p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6'>
                    <h4 className='text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6'>
                        Summarized by AI
                    </h4>
                    <ul>
                        {dataEmployee?.summarizedReview
                            ?.split('\n')
                            .map((item, idx) => {
                                return (
                                    <li key={idx} className='m-1'>
                                        {item}
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>

            {isKpiModalOpen && (
                <div className='fixed inset-0 bg-white/40 backdrop-blur-[2px] z-40 flex items-start justify-center pt-20'>
                    <div className='bg-white rounded-lg p-4 w-[300px] max-w-full shadow-lg'>
                        <h3 className='text-lg font-semibold mb-3'>
                            Tambah Nilai KPI
                        </h3>
                        <input
                            type='number'
                            value={kpiScore}
                            onChange={(e) => setKpiScore(e.target.value)}
                            className='w-full border border-gray-300 rounded px-3 py-2 mb-4 text-sm'
                            placeholder='Nilai KPI (0 - 100)'
                        />
                        <div className='flex justify-end gap-2'>
                            <button
                                className='btn btn-secondary btn-sm rounded mb-2'
                                onClick={() => setIsKpiModalOpen(false)}
                            >
                                Batal
                            </button>
                            <button
                                className='btn btn-primary btn-sm rounded mb-2'
                                onClick={async () => {
                                    try {
                                        const response = await fetch(
                                            'http://34.101.38.23:8080/api/employee/review',
                                            {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type':
                                                        'application/json',
                                                },
                                                body: JSON.stringify({
                                                    employeeId:
                                                        dataEmployee?.id,
                                                    name: dataEmployee?.name,
                                                    kpiScore:
                                                        parseFloat(kpiScore),
                                                }),
                                            }
                                        );

                                        if (!response.ok) {
                                            throw new Error(
                                                'Gagal menyimpan KPI'
                                            );
                                        }

                                        console.log('KPI submitted:', kpiScore);
                                        setIsKpiModalOpen(false);
                                    } catch (error) {
                                        console.error(
                                            'Error submitting KPI:',
                                            error
                                        );
                                    }
                                }}
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </FullscreenModal>
    );
};

export default DetailEmployee;
