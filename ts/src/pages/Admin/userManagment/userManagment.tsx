/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Toaster } from 'react-hot-toast';
import { blockUser, getAllUser, getJobPosts } from '../../../services/adminApiService';
import Swal from 'sweetalert2';
import { IMG_URL } from '../../../constant/columns';
import { formatMongoDate } from '../../../util/timeFormating';
import { UserProfile } from '../../../interface/interfaces';
const columns = ["No", "Name/Email", "Job", "Status", "Join Date", "Action", "Details"];

interface Row {
    photo: string;
    user: string;
    email: string;
    status: boolean;
    job: string;
    JoinDate: string | Date;
    action: boolean;
    role: string;
    fullData: UserProfile
}

const UserManagement: React.FC = () => {
    const [drawerData, setDrawerData] = useState<any>(null)
    const [data, setData] = useState<Row[]>([]);
    const [data1, setData1] = useState<Row[]>([]);
    const [users, setUsers] = useState<Row[]>([]);
    const [open, setOpen] = React.useState(false);
    const closeDrawer = () => setOpen(false);
    const [switchUser, setSwitch] = useState<boolean>(false);
    const [drawerjobPost, setdrawerjobPost] = useState<any[] | null>(null)
    useEffect(() => {
        getData();
        return () => {
            localStorage.removeItem("drawerData")
        }
    }, [])
    function getData() {
        getAllUser()
            .then((res: any) => {
                const mappedData = res?.data?.data?.talent.map((item: any) => ({
                    fullData: item,
                    id: item?._id,
                    photo: item?.Profile?.profile_Dp || "N/A",
                    user: `${item?.First_name} ${item?.Last_name}` || "N/A",
                    email: item?.Email,
                    status: item?.online || false,
                    job: item?.Profile?.Title || "N/A",
                    JoinDate: item?.createdAt || "N/A",
                    action: item?.isBlock,
                    role: "TALENT",
                }));
                const mappedData1 = res?.data?.data?.client.map((item: any) => ({
                    fullData: item,
                    id: item?._id,
                    photo: item?.Profile?.profile_Dp || "N/A",
                    user: `${item?.First_name} ${item?.Last_name}` || "N/A",
                    email: item?.Email || "N/A",
                    job: item?.Profile?.Title || "Provider",
                    status: item?.online || false,
                    JoinDate: item?.createdAt || "N/A",
                    action: item?.isBlock,
                    role: "CLIENT",
                }));
                setData(mappedData);
                setData1(mappedData1);
                setUsers(mappedData)
            }).catch((err) => {
                console.log(err);
            });
    }
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
                    .then(() => {
                        Swal.fire({
                            title: `${block ? "Unblocked" : "Blocked"}`,
                            text: `Your user has been ${block ? "Unblocked" : "Blocked"}.`,
                            icon: "success"
                        });
                        getData();
                    })
                    .catch(() => {
                        Swal.fire({
                            title: "Error",
                            text: "Failed to block user. Please try again later.",
                            icon: "error"
                        });
                    });
            }
        });
    }
    const openDrawer = () => {
        const drawerDataString = localStorage.getItem("drawerData");
        if (drawerDataString) {
            const drawerId = JSON.parse(drawerDataString);

            if (drawerId) {
                const id = drawerId?._id
                getJobPosts(id)
                    .then((res: any) => {
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
        }
    }
    // paginaion logic
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage: number = 5;
    const indexOfLastPost: number = currentPage * itemsPerPage;
    const indexOfFirstPost: number = indexOfLastPost - itemsPerPage;
    const slicesData = users.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    return (
        <>
            <main id="content" className="flex-1 p-6 lg:px-8 h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="-mb-2 py-4 flex flex-wrap flex-grow justify-between">
                            <div className="flex items-center py-2">
                                <input
                                    // onChange={handleSearch}
                                    className=" appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white "
                                    id="inline-searcg"
                                    type="search"
                                    placeholder="Search" />
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    setSwitch(!switchUser)
                                    setUsers(switchUser ? data1 : data)
                                }
                                }
                                className='p-2 mb-5 bg-slate-900 text-white font-semibold font-sans rounded'>{switchUser ? "Show Talents" : "Show Clients"} </button>
                        </div>
                        <table className="min-w-full  font-sans ">
                            {/* <!-- HEAD start --> */}
                            <thead>
                                <tr className="font-sans font-extrabold bg-gray-300 border-b w-full border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                                    {
                                        columns?.map((names: string, index: number) => (
                                            !switchUser && names === "JOB" ? (
                                                <th className="px-6 py-3 text-left font-medium" key={index}>
                                                    {names}
                                                </th>
                                            ) : (
                                                <th className="px-6 py-3 text-left font-medium" key={index}>
                                                    {names}
                                                </th>
                                            )
                                        ))
                                    }
                                </tr>
                            </thead>
                            {/* <!-- HEAD end --> */}
                            {/* <!-- BODY start --> */}
                            <tbody className="bg-white text-sm">
                                {slicesData?.map((user: Row, index: number) => (

                                    user?.fullData.isVerify && (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 flex gap-2 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <img className="h-10 w-10 rounded-full"
                                                    src={`${IMG_URL}${user?.photo}`}
                                                    alt="loading" />
                                                <div className="text-sm leading-5 text-gray-900">

                                                    {user?.email} <br />
                                                    {user?.user}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        {user?.job}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span className="px-2 inline-flex animate-pulse text-xs leading-5 font-semibold rounded-full bg-red-300     ">
                                                    {user.fullData.isBlock ? "Inactive" : "Active"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div className="text-sm leading-5 text-gray-900 text-center ">
                                                    {formatMongoDate(user?.JoinDate as Date)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center text-sm leading-5 text-gray-500">
                                                <div>
                                                    <button
                                                        className="bg-blue-500 "
                                                        onClick={() => handleActionClick(user?.email, user?.role, user?.action)}
                                                    >
                                                        <span
                                                            className="relative px-3 py-1  transition-all ease-in duration-200 bg-white dark:bg-gray-900  group-hover:bg-opacity-0"
                                                        >
                                                            {user?.action ? "Unblock" : "Block"}
                                                        </span>
                                                        <div
                                                            className="ease-in duration-300 opacity-0 group-hover:block group-hover:opacity-100 transition-all"
                                                        >
                                                            <div
                                                                className="ease-in-out duration-500 -translate-y-4 pointer-events-none transition-all group-hover:-translate-y-16 absolute left-1/2 z-50 flex -translate-x-1/2 flex-col items-center rounded-sm text-center text-sm text-slate-300 before:-top-2"
                                                            >
                                                                <div className="rounded-sm bg-black py-1 px-2">
                                                                    <p className="whitespace-nowrap">{user?.action ? "Unblock the user" : "Block the user"}</p>
                                                                </div>
                                                                <div
                                                                    className="h-0 w-fit border-l-8 border-r-8 border-t-8 border-transparent border-t-black"
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap text-right border-b  border-gray-200 text-sm leading-5 font-medium">
                                                <button className='text-blue-600 hover:underline p-2 rounded' onClick={() => {
                                                    localStorage.setItem("drawerData", JSON.stringify(user?.fullData));
                                                    openDrawer()
                                                }}>
                                                    show
                                                </button>
                                            </td>
                                        </tr>
                                    )

                                ))
                                }
                                <Toaster
                                    position="top-left"
                                    reverseOrder={true}
                                />
                            </tbody >
                            {/* <!-- BODY end --> */}
                        </table >
                    </div >
                </div >
                <div className="flex items-end gap-4 justify-end m-10">
                    <button
                        className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {Array.from({ length: Math.ceil(slicesData.length / itemsPerPage) }, (_, index) => (
                        <button
                            className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none bg-gray-900 text-white shadow-md shadow-gray-900/10' : ''}`}
                            type="button"
                            onClick={() => paginate(index + 1)}
                        >
                            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                {index + 1}
                            </span>
                        </button>
                    ))}
                    <button
                        className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === Math.ceil(slicesData.length / itemsPerPage)}
                    >
                        Next
                    </button>
                </div>
            </main >
            {<>
                < Dialog open={open} onClose={closeDrawer} className="fixed z-10 inset-0 overflow-y-auto" >
                    <div className="flex items-end justify-center   min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Dialog.Overlay className="fixed inset-0  bg-gray-500 opacity-75" />
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom  bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className='flex justify-center mb-5 rounded-full overflow-auto'>
                                    <img src={`https://timezones.website/images/${drawerData?.Profile?.profile_Dp}  `} className="w-16 h-16 rounded-full border-2 border-red-500" />
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
            </>
            }
        </>
    );
};
export default UserManagement;