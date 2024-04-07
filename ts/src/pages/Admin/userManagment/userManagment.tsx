/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useTable, useFilters, useGlobalFilter, useSortBy, usePagination, Column } from 'react-table';
import { blockUser, getAllUser, getJobPosts } from '../../../services/adminApiService';
import Swal from 'sweetalert2';
import { Dialog } from '@headlessui/react';

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
    const [drawerData, setDrawerData] = useState<any>(null)
    const [data, setData] = useState<Row[]>([]);
    const [data1, setData1] = useState<Row[]>([]);
    const [open, setOpen] = React.useState(false);
    const closeDrawer = () => setOpen(false);
    const [switchUser, setSwitch] = useState<boolean>(false);
    const [drawerjobPost, setdrawerjobPost] = useState<any[] | null>(null)

    useEffect(() => {
        getData();
    }, [])
    function getData() {
        getAllUser()
            .then((res) => {
                const mappedData = res?.data?.data?.talent.map((item:any) => ({
                    fullData: item,
                    id: item?._id,
                    photo: item?.Profile?.profile_Dp || "N/A",
                    user: `${item?.First_name} ${item?.Last_name}` || "N/A",
                    email: item?.Email,
                    status: item?.online || false,
                    job: item?.Profile?.Title || "N/A",
                    "join date": item?.createAt || "N/A",
                    action: item?.isBlock,
                    role: "TALENT",
                }));
                const mappedData1 = res?.data?.data?.client.map((item:any) => ({
                    fullData: item,
                    id: item?._id,
                    photo: item?.Profile?.profile_Dp || "N/A",
                    user: `${item?.First_name} ${item?.Last_name}` || "N/A",
                    email: item?.Email || "N/A",
                    job: item?.Profile?.Title || "N/A",
                    status: item?.online || false,
                    "join date": item?.createAt || "N/A",
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
                        className={`group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br ${row.original.action ? 'from-red-500 to-red-700' : 'from-green-500 to-green-700'} group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 outline-none  focus:ring-purple-200 dark:focus:ring-purple-800`}
                        onClick={() => handleActionClick(row.original.email, row.original.role, row.original.action)}
                    >
                        <span
                            className="relative px-3 py-1  transition-all ease-in duration-200 bg-white dark:bg-gray-900  group-hover:bg-opacity-0"
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
        {
            Header: 'More Deatils',
            Cell: ({ row }:{row:any}) => (
                <div>
                    <button className="text-blue-500" onClick={() => {
                        localStorage.setItem("drawerData", JSON.stringify(row.original.fullData));
                        openDrawer()
                    }}>
                        View
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
    } = useTable<any>(
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
    const { globalFilter, pageIndex }:{globalFilter:any, pageIndex:number} = state;
    const openDrawer = () => {
        const drawerId = JSON.parse(localStorage.getItem("drawerData")) 
        const id = drawerId?._id
        getJobPosts(id)
            .then((res) => {
                if (res?.data) {
                    setdrawerjobPost(res?.data.data.data)
                }
                const drawerData = drawerId;
                setDrawerData(drawerData)
                setOpen(true)
            }).catch((err) => {
                console.log(err)
            })
    }
    return (
        <>
            <main id="content" className="flex-1 p-6 lg:px-8 h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="flex justify-between mb-4">
                            <div className="flex items-center">
                                <input
                                    id="search"
                                    value={globalFilter || ''}
                                    onChange={e => setGlobalFilter(e.target.value)}
                                    className="rounded-xl appearance-none border-2 border-gray-200 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    autoComplete="off"
                                    placeholder="Search..."
                                    name="text"
                                    type="text"
                                />
                            </div>
                            <div>
                                <button className=' text-white px-4 py-2 mr-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline' onClick={() => setSwitch(!switchUser)}>
                                    {switchUser ? 'Show Talent' : 'Show Client'}
                                </button>
                                <button className='text-black border-2  rounded-xl outline-none px-1 py-1 text-base hover:border-[#fff] cursor-pointer transition' onClick={() => previousPage()} disabled={!canPreviousPage}>
                                    Previous
                                </button>
                                <span className="ml-2 mr-2">
                                    <strong>
                                        {pageIndex + 1} of {pageOptions.length}
                                    </strong>{' '}
                                </span>
                                <button className='text-black border-2  rounded-xl outline-none px-3 py-1 text-base hover:border-[#fff] cursor-pointer transition' onClick={() => nextPage()} disabled={!canNextPage}>
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
                                {page.map((row: any | { getRowProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableRowElement> & React.HTMLAttributes<HTMLTableRowElement>; cells: any[]; }) => {
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
                <div >
                </div>
            </main>
            {
                <Dialog open={open} onClose={closeDrawer} className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center   min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Dialog.Overlay className="fixed inset-0  bg-gray-500 opacity-75" />
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom  bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className='flex justify-center mb-5 rounded-full overflow-auto'>
                                            <img src={`http://localhost:3000/images/${drawerData?.Profile?.profile_Dp}  `} className="w-16 h-16 rounded-full border-2 border-red-500" />
                                            <div className='m-2 font-sans text-gray-600 font-semibold'>
                                                <p >{drawerData?.First_name}</p>
                                                {
                                                    drawerData?.Profile.Title && <>
                                                        <p >{drawerData?.Profile.Title}</p>
                                                    </>
                                                }

                                            </div>
                                        </div>
                                <div className='overflow-auto '>
                                    <div className='overflow-auto'>
                                        <div className="overflow-auto">
                                            {
                                                drawerData?.Profile && drawerData.Profile.Skills && (
                                                    <>
                                                        <div className='w-full flex flex-col'>
                                                            <p className='font-sans font-medium font'>Skills</p>
                                                            {drawerData.Profile.Skills.map((value: string, index: number) => (
                                                                <span key={index} className=' font-sans text-sm text-gray-500 spanx-1 rounded-full mt-1 px-2 ml-1'>{value}</span>
                                                            ))}
                                                        </div>
                                                        <div className='w-full flex flex-col'>
                                                            <p className='font-sans font-medium font mt-2'>Experience</p>
                                                            {drawerData?.Profile?.Work_Experiance && drawerData.Profile.Work_Experiance.map((value: string, index: number) => (
                                                                <p key={index} className=' font-sans text-sm text-gray-500 px-2 rounded-full mt-1 ml-1'>{value}</p>
                                                            ))}
                                                            {drawerData?.Profile?.Work_Experiance?.length === 0 && <p className='font-sans text-sm font-semibold text-red-500'>Fresher</p>}
                                                        </div>
                                                    </>
                                                )
                                            }
                                            <div className='flex mt-2 mb-5'>
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-400 ml-2'">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                                                    </svg>
                                                </span>
                                                <span className='font-sans font-semibold text-xl ml-2'>Verifications</span>
                                            </div>
                                            <p className='font-sans font-semibold'>Phone Number : <span className='font-sans font-normal text-gray-500'> {drawerData?.isNumberVerify ? "verified" : "Not verified"}</span></p>
                                            <p className='font-sans font-semibold'>Email : <span className='font-sans font-normal text-gray-500'> {drawerData?.isVerify ? "verified" : "Not verified"}</span></p>
                                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mt-2">
                                                <span className="text-green-500 mt-2 mb-5">
                                                    <svg className="h-5" xmlns="http:www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                        stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </span>
                                                <span className="font-sans font-semibold text-xl mt-2 mb-5">About</span>
                                            </div>
                                            <p className='font-sans font-semibold text-xl mt-2 mb-2'>Contact Details</p>
                                            <p className='font-sans font-semibold'>City : <span className='font-sans font-normal text-gray-500'>{drawerData?.City}</span></p>
                                            <p className='font-sans font-semibold'>Country : <span className='font-sans font-normal text-gray-500'>{drawerData?.Country}</span></p>
                                            <p className='font-sans font-semibold'>Number : <span className='font-sans font-normal text-gray-500'>{drawerData?.Number}</span></p>
                                            <p className='font-sans font-semibold'>Pin code : <span className='font-sans font-normal text-gray-500'>{drawerData?.PinCode}</span></p>
                                            <div className='mt-5'>
                                                {
                                                    !drawerData?.Profile?.Skills && (
                                                        <p className='font-sans font-semibold text-xl mt-2 mb-2'>Total job posts : {drawerjobPost?.length}</p>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog>
            }
        </>
    );
};
export default UserManagement;