import React, { useEffect, useState } from 'react';
import { useTable, useFilters, useGlobalFilter, useSortBy, usePagination, Column } from 'react-table';
import { blockUser, getAllUser } from '../../../api/admin.Api';
import Swal from 'sweetalert2';

interface Row {
    photo: string;
    user: string;
    email: string;
    status: boolean;
    job: string;
    "join date": string;
    action: boolean;
    role: string;
}

const UserManagement: React.FC = () => {
    const [data, setData] = useState<Row[]>([]);
    const [data1, setData1] = useState<Row[]>([]);
    const [switchUser, setSwitch] = useState<boolean>(false);

    useEffect(() => {
        getData();
    }, []);

    function getData() {
        getAllUser()
            .then((res: any) => {
                console.log(res.data.data);

                const mappedData = res?.data?.data?.talent.map((item: any) => ({
                    photo: item?.Profile?.profile_Dp || "N/A",
                    user: `${item?.First_name} ${item?.Last_name}` || "N/A",
                    email: item?.Email,
                    status: item?.online || false,
                    job: item?.Profile?.Title || "N/A",
                    "join date": item?.createAt || "2030-12-12",
                    action: item?.isBlock,
                    role: "TALENT",

                }));
                const mappedData1 = res?.data?.data?.client.map((item: any) => ({
                    photo: item?.Profile?.profile_Dp || "N/A",
                    user: `${item?.First_name} ${item?.Last_name}` || "N/A",
                    email: item?.Email || "N/A",
                    job: item?.Profile?.Title || "N/A",
                    status: item?.online || false,
                    "join date": item?.createAt || "2030-12-12",
                    action: item?.isBlock,
                    role: "CLIENT",
                }));
                setData(mappedData);
                setData1(mappedData1);
            }).catch((err) => {
                console.log(err);
            });
    }

    const columns: Column<Row>[] = React.useMemo(() => [
        {
            Header: 'User',
            accessor: 'user',
            Cell: ({ row }) => (
                <div className="flex items-center">
                    <img src={`http://localhost:3000/images/${row.original.photo}`} alt="User" className='rounded-md border border-gray-700 w-10 h-10' />
                    <div className="ml-2">
                        <div className='font-medium font-sans text-gray-800'>{row.original.user}</div>
                        <div className='font-light text-sm font-sans'>{row.original.email}</div>
                    </div>
                </div>
            ),
        },
        {
            Header: 'Job',
            accessor: 'job',
            Cell: ({ row }) => (
                <div className="flex items-center">
                    <p>{row.original.job}</p>
                </div>
            ),
        },
        {
            Header: 'Status',
            accessor: 'status',
            Cell: ({ row }) => (
                <div className="flex items-center">
                    <label
                        className="group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                    >
                        <span
                            className="relative px-3 py-1 transition-all ease-in duration-200 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                        >
                            {row.original.status ? "Online" : "Offline"}
                        </span>
                        <div
                            className="ease-in duration-300 opacity-0 group-hover:block group-hover:opacity-100 transition-all"
                        >
                            <div
                                className="ease-in-out duration-500 -translate-y-4 pointer-events-none transition-all group-hover:-translate-y-16 absolute left-1/2 z-50 flex -translate-x-1/2 flex-col items-center rounded-sm text-center text-sm text-slate-300 before:-top-2"
                            >
                                <div className="rounded-sm bg-black py-1 px-2">
                                    <p className="whitespace-nowrap">{row.original.status ? "User is Online" : "User is Offline"}</p>
                                </div>
                                <div
                                    className="h-0 w-fit border-l-8 border-r-8 border-t-8 border-transparent border-t-black"
                                ></div>
                            </div>
                        </div>
                    </label>
                </div>
            ),
        },
        {
            Header: 'Join Date',
            accessor: 'join date',
        },
        {
            Header: 'Action',
            accessor: 'action',
            Cell: ({ row }) => (
                <div>

                    <button
                        className={`group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br ${row.original.action ? 'from-red-500 to-red-700' : 'from-green-500 to-green-700'} group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800`}
                        onClick={() => handleActionClick(row.original.email, row.original.role, row.original.action)}
                    >
                        <span
                            className="relative px-3 py-1 transition-all ease-in duration-200 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                        >
                            {row.original.action ? "Unblock" : "Block"}
                        </span>
                        <div
                            className="ease-in duration-300 opacity-0 group-hover:block group-hover:opacity-100 transition-all"
                        >
                            <div
                                className="ease-in-out duration-500 -translate-y-4 pointer-events-none transition-all group-hover:-translate-y-16 absolute left-1/2 z-50 flex -translate-x-1/2 flex-col items-center rounded-sm text-center text-sm text-slate-300 before:-top-2"
                            >
                                <div className="rounded-sm bg-black py-1 px-2">
                                    <p className="whitespace-nowrap">{row.original.action ? "Unblock the user" : "Block the user"}</p>
                                </div>
                                <div
                                    className="h-0 w-fit border-l-8 border-r-8 border-t-8 border-transparent border-t-black"
                                ></div>
                            </div>
                        </div>
                    </button>
                </div>
            ),
        },
    ], []);

    const handleActionClick = (email: string, role: string, block: boolean) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, ${block ? "Unblocked it" : "Blocked it"}!`
        }).then((result) => {
            if (result.isConfirmed) {
                blockUser({ email, block, role })
                    .then((res) => {
                        Swal.fire({
                            title: `${block ? "Unblocked" : "Blocked"}`,
                            text: `Your user has been ${block ? "Unblocked" : "Blocked"}.`,
                            icon: "success"
                        });
                        getData();
                    })
                    .catch((err) => {
                        Swal.fire({
                            title: "Error",
                            text: "Failed to block user. Please try again later.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        setGlobalFilter,
    } = useTable<Row>(
        {
            columns,
            data: switchUser ? data1 : data,
            initialState: { pageIndex: 0 }
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const { globalFilter, pageIndex } = state;

    return (
        <>

            <main id="content" className="flex-1 p-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="px-4 py-6 sm:px-0">


                        <div className="flex justify-between mb-4">
                            <div className="flex items-center">
                                <input
                                    id="search"
                                    value={globalFilter || ''}
                                    onChange={e => setGlobalFilter(e.target.value)}
                                    className="bg-zinc-200 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-rose-400 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-rose-400"
                                    autoComplete="off"
                                    placeholder="Search..."
                                    name="text"
                                    type="text"
                                />
                            </div>
                            <div>
                                <button className='bg-blue-500 text-white px-4 py-2 mr-2 rounded-md hover:bg-blue-600' onClick={() => setSwitch(!switchUser)}>
                                    {switchUser ? 'Show Talent' : 'Show Client'}
                                </button>
                                <button className='bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-1 py-1 text-base hover:border-[#fff] cursor-pointer transition' onClick={() => previousPage()} disabled={!canPreviousPage}>
                                    Previous
                                </button>
                                <span >
                                    <strong>
                                        {pageIndex + 1} of {pageOptions.length}
                                    </strong>{' '}
                                </span>
                                <button className='bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-3 py-1 text-base hover:border-[#fff] cursor-pointer transition' onClick={() => nextPage()} disabled={!canNextPage}>
                                    Next
                                </button>
                            </div>

                        </div>
                        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-300">
                                {headerGroups.map((headerGroup: { getHeaderGroupProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableRowElement> & React.HTMLAttributes<HTMLTableRowElement>; headers: any[]; }) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column: { getHeaderProps: (arg0: any) => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableHeaderCellElement> & React.ThHTMLAttributes<HTMLTableHeaderCellElement>; getSortByToggleProps: () => any; render: (arg0: string) => string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; isSorted: any; isSortedDesc: any; }) => (
                                            <th
                                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                                            >
                                                {column.render('Header')}
                                                <span>
                                                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                                </span>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                                {page.map((row: { getRowProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableRowElement> & React.HTMLAttributes<HTMLTableRowElement>; cells: any[]; }) => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map((cell: { getCellProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableDataCellElement> & React.TdHTMLAttributes<HTMLTableDataCellElement>; render: (arg0: string) => string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => {
                                                return (
                                                    <td
                                                        {...cell.getCellProps()}
                                                        className="px-6 py-4 whitespace-nowrap"
                                                    >
                                                        {cell.render('Cell')}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    );
};

export default UserManagement;