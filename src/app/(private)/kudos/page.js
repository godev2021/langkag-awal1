'use client';
import CenteredModal from '@/components/Modal';
import { brandsWithVouchers } from '@/data/dummy/voucher';
import { fetchFeedsKudos, fetchLeaderKudos } from '@/data/real/employee';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import FormKudos from './component/FormKudos';
import { format } from 'date-fns';

const KudosPage = () => {
    const [leaderBoardKudos, setLeaderBoardKudos] = useState([]);
    const [feedsKudos, setFeedsKudos] = useState([]);
    const reloadData = () => {
        fetchLeaderKudos({
            onSuccess: (data) => {
                setLeaderBoardKudos(data);
            },
        });

        fetchFeedsKudos({
            onSuccess: (data) => {
                setFeedsKudos(data);
            },
        });
    };
    useEffect(() => {
        reloadData();
    }, []);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='p-6 space-y-10'>
            <div className='grid grid-cols-12 gap-4 md:gap-6  rounded-2xl p-4 bg white'>
                <div className='col-span-12'>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-4 px-5 py-2.5 shadow rounded-xl border border-gray-200 bg-white'>
                            <h3 className='text-base text-gray-500'>
                                Poin Anda
                            </h3>
                            <div className='flex items-center gap-1'>
                                <h4 className='text-base font-semibold text-gray-800'>
                                    200
                                </h4>
                                <span className='text-sm text-gray-500'>
                                    Poin
                                </span>
                            </div>
                        </div>
                        <button
                            type='button'
                            className='btn btn-primary rounded text-white'
                            onClick={() => {
                                setIsOpen(true);
                            }}
                        >
                            Beri Kudos
                        </button>
                    </div>
                </div>
                <div className=' col-span-6'>
                    <div className='overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/[0.03]'>
                        <div className='mb-4'>
                            <h3 className='text-lg font-semibold text-gray-800 dark:text-white/90'>
                                Leaderboard
                            </h3>
                        </div>
                        <div className='max-w-full overflow-x-auto'>
                            <div className='h-[450px] overflow-y-auto'>
                                <table className='min-w-full table-auto'>
                                    <thead className='sticky top-0 bg-white dark:bg-gray-900 z-10'>
                                        <tr className='border-y border-gray-100 dark:border-gray-800'>
                                            <th className='py-3 text-left font-normal text-gray-500 text-md dark:text-gray-400'>
                                                No.
                                            </th>
                                            <th className='py-3 text-left font-normal text-gray-500 text-md dark:text-gray-400'>
                                                Name
                                            </th>
                                            <th className='py-3 text-left font-normal text-gray-500 text-md dark:text-gray-400'>
                                                Kudos
                                            </th>
                                            <th className='py-3 text-left font-normal text-gray-500 text-md dark:text-gray-400'>
                                                Poin
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-100 dark:divide-gray-800'>
                                        {leaderBoardKudos?.map((lKu, idxKu) => (
                                            <tr key={idxKu}>
                                                <td className='py-3'>
                                                    {idxKu + 1}
                                                </td>
                                                <td className='py-3'>
                                                    <div className='flex items-center gap-[18px]'>
                                                        <div className='w-10 h-10 overflow-hidden rounded-full'>
                                                            <img
                                                                src='/images/user-01.jpg'
                                                                alt='user'
                                                            />
                                                        </div>
                                                        <div className='flex flex-col gap-1'>
                                                            <p className='text-gray-700 text-md dark:text-gray-400'>
                                                                {
                                                                    lKu?.employeeName
                                                                }
                                                            </p>
                                                            {(() => {
                                                                let bgColor = 'bg-blue-100';
                                                                let textColor = 'text-blue-800';

                                                                if (lKu?.category.includes('Thank you')) {
                                                                    bgColor = 'bg-green-100';
                                                                    textColor = 'text-green-800';
                                                                } else if (lKu?.category.includes('Great job')) {
                                                                    bgColor = 'bg-yellow-100';
                                                                    textColor = 'text-yellow-800';
                                                                } else if (lKu?.category.includes('Well done')) {
                                                                    bgColor = 'bg-purple-100';
                                                                    textColor = 'text-purple-800';
                                                                }
                                                                return (
                                                                    <div className='flex gap-1 flex-wrap'>
                                                                        <span
                                                                            className={`px-2 py-0.5 text-xs rounded-full ${bgColor} ${textColor}`}
                                                                        >
                                                                            {
                                                                                lKu?.category
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                );
                                                            })()}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='py-3'>
                                                    <p className='bg-success-50 text-theme-xs text-success-600 dark:bg-success-500/15 dark:text-success-500 inline-block rounded-full px-2 py-0.5 font-medium'>
                                                        {lKu?.totalKudos}
                                                    </p>
                                                </td>
                                                <td className='py-3'>
                                                    <p className='bg-success-50 text-theme-xs text-success-600 dark:bg-success-500/15 dark:text-success-500 inline-block rounded-full px-2 py-0.5 font-medium'>
                                                        {lKu?.totalScore}
                                                    </p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' col-span-6'>
                    <div className='overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/[0.03]'>
                        <div className='mb-4'>
                            <h3 className='text-lg font-semibold text-gray-800 dark:text-white/90'>
                                Feeds
                            </h3>
                        </div>
                        <div className='h-[450px] overflow-y-auto'>
                            <div className='relative'>
                                <div className='absolute top-6 bottom-10 left-5 w-px bg-gray-200 dark:bg-gray-800'></div>

                                {feedsKudos?.map((feed, index) => {
                                    const key = feed?.id || index;
                                    return (
                                        <div
                                            key={key}
                                            className='relative mb-6 flex'
                                        >
                                            <div className='z-10 flex-shrink-0'>
                                                <img
                                                    src='https://randomuser.me/api/portraits/men/1.jpg'
                                                    className='size-10 rounded-full object-cover ring-4 ring-white dark:ring-gray-800'
                                                />
                                            </div>
                                            <div className='ml-4'>
                                                {index === 0 && (
                                                    <div className='mb-1 flex items-center gap-1'>
                                                        <p className='text-xs text-green-500 font-medium'>
                                                            New Post
                                                        </p>
                                                    </div>
                                                )}

                                                <div className='flex items-baseline'>
                                                    <h3 className='text-md font-medium text-gray-800 dark:text-white/90'>
                                                        {feed?.fromEmployeeName}
                                                    </h3>
                                                    <span className='text-md ml-2 font-normal text-gray-500 dark:text-gray-400'>
                                                        mengirimkan kudos kepada{' '}
                                                        <span className='text-md font-medium text-gray-800 dark:text-white/90'>
                                                            {
                                                                feed?.toEmployeeName
                                                            }
                                                        </span>
                                                    </span>
                                                </div>
                                                <p className='text-md font-normal text-gray-500 dark:text-gray-400'>
                                                    {feed?.message}
                                                </p>
                                                <p className='text-xs font-normal text-gray-500 dark:text-gray-400'>
                                                    {format(
                                                        new Date(
                                                            feed?.timestamp
                                                        ),
                                                        'hh:ss - dd MMM yyyy'
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-span-12'>
                    <div className='bg-white rounded-2xl p-9'>
                        <h3 className=' text-2xl mb-4'>Redeem Point</h3>
                        <div className='grid grid-cols-3 gap-6'>
                            {brandsWithVouchers?.map((val, index) => {
                                return (
                                    <div
                                        key={index}
                                        className='bg-white rounded-xl shadow-2xl p-4 flex flex-col items-center space-y-3 w-full max-w-sm'
                                    >
                                        {/* Section 1 - Gambar Produk */}
                                        <div className='w-32 h-32 rounded overflow-hidden'>
                                            <img
                                                src={val?.logo}
                                                alt='asdsad'
                                                className='w-full h-full object-contain'
                                            />
                                        </div>

                                        {/* Section 2 - Nama Produk */}
                                        <div className='text-center'>
                                            <h2 className='text-lg font-semibold text-gray-800'>
                                                {val?.voucherPrice} Poin
                                            </h2>
                                        </div>

                                        {/* Section 3 - Info Kiri & Kanan */}
                                        <div className='flex justify-center w-full text-sm text-gray-600'>
                                            <span>
                                                <button
                                                    type='button'
                                                    className='btn btn-primary btn-sm rounded-md'
                                                >
                                                    Redeem
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <CenteredModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title={'Recognize Your Kudos'}
            >
                <FormKudos setIsOpen={setIsOpen} reloadData={reloadData} />
            </CenteredModal>
        </div>
    );
};

export default KudosPage;
