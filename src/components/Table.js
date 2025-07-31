'use client'

export default function TableList({ columns = [], data = [], additionalRows = null }) {
    return (
        <div className='overflow-x-auto border border-slate-300 rounded-box bg-white min-h-[250px]'>
            <table className='min-w-full text-sm text-left'>
                <thead className='bg-white border-b border-slate-200'>
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className='px-4 py-3 font-medium text-gray-700'
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className='border-b border-slate-200 hover:bg-gray-50'
                        >
                            {columns.map((col) => (
                                <td
                                    key={col.key}
                                    className={`px-4 py-3 ${
                                        col.align === 'right'
                                            ? 'text-right'
                                            : ''
                                    }`}
                                >
                                    {col.render
                                        ? col.render(row[col.key], row)
                                        : row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
