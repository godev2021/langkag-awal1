'use client'
import TableList from '@/components/Table';
import { formatIndoDateRange } from '@/utils/dates';
import Link from 'next/link';
export default function PendingActionPage() {
    const dataPendingActions = [
        {
            id:1,
            cycleName: '2025 Mid Year PA - Competency Review (IC)',
            timeFrame: {
                type: 'Custom',
                startDate: '2025-01-01',
                endDate: '2025-06-15',
            },
            reviewPeriod: {
                status: 'Started',
                startDate: '2025-06-16',
                endDate: '2025-08-08',
            },
            pendingTask: 0,
        },
        {
            id:2,
            cycleName: '2025 Mid Year PA - Competency Review (PM)',
            timeFrame: {
                type: 'Custom',
                startDate: '2025-01-01',
                endDate: '2025-06-15',
            },
            reviewPeriod: {
                status: 'Started',
                startDate: '2025-06-16',
                endDate: '2025-08-08',
            },
            pendingTask: 0,
        },
    ];

    const columns = [
        {
            key: 'cycleName',
            label: 'Cycle Name',
        },
        {
            key: 'timeFrame',
            label: 'Time Frame',
            render: (value) =>
                formatIndoDateRange(value.startDate, value.endDate),
        },
        {
            key: 'reviewPeriod',
            label: 'Review Period',
            render: (value) =>
                formatIndoDateRange(value.startDate, value.endDate),
        },
        {
            key: 'pendingTask',
            label: 'Pending Task',
        },
        {
            key: 'actions',
            label: '',
            render: (_, row) => (
                <Link
                    href={`/performance-review/360/pending-action/details/${row.id}`}
                    className="btn btn-sm btn-outline btn-primary rounded"
                >
                    View Task
                </Link>
            ),
        },
    ];

    return (
        <div className='p-6'>
            <h1 className='text-xl font-bold mb-4'>Pending action</h1>

            {/* Tabs */}
            <div role='tablist' className='tabs tabs-bordered mb-4'>
                <input
                    type='radio'
                    name='tab'
                    role='tab'
                    className='tab'
                    aria-label='Active'
                    defaultChecked
                />
                <input
                    type='radio'
                    name='tab'
                    role='tab'
                    className='tab'
                    aria-label='History'
                />
            </div>

            {/* Filter section */}
            <div className='flex flex-wrap gap-2 mb-4 items-center'>
                <select className='select select-bordered max-w-xs'>
                    <option>All type</option>
                    <option>Competency Review</option>
                </select>
                <select className='select select-bordered max-w-xs'>
                    <option>Enterprise Digital Technology Services</option>
                    <option>Another Division</option>
                </select>
                <div className='ml-auto'>
                    <input
                        type='text'
                        placeholder='Search cycle name…'
                        className='input input-bordered w-full max-w-xs'
                    />
                </div>
            </div>

            {/* Table */}
            <div className='overflow-x-auto bg-base-100 rounded-box border border-slate-300'>
                <TableList data={dataPendingActions} columns={columns} />
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
            {/* Pagination */}
        </div>
    );
}
