/* eslint-disable @typescript-eslint/no-unused-vars */
import Box from '@mui/material/Box';
import { LinearProgressWithLabel } from '../../../components/General/ui/linerProgressBar';
import EmailIcon from '@mui/icons-material/Email';
import BannerImage from '../../../assets/istockphoto-1283536918-1024x1024.jpg'
import { useNavigate } from 'react-router-dom';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import {
    fetchAllJobPostForTalent,
    getAllClientForTalent,
    getUserProfileDetails,
} from '../../../services/talentApiService';

import 'quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { Disclosure, Transition } from '@headlessui/react'
import { ROOTSTORE } from '../../../redux/store';
import routerVariables, { talent_routes } from '../../../routes/pathVariables';
import { INITIALSTATE, setProgress } from '../../../redux/Slice/signupSlice';
import { ArrowUpward } from '@mui/icons-material';
import ClientList from '../../../components/Talent/home/clientListing';
import { formatMongoDate } from '../../../util/timeFormating';
import { fetchCompletedContract, getAllActiveContract, getAllCancelledContracts, getNewProgress } from '../../../services/commonApiService';
import { Tour } from 'antd';
import type { TourProps } from 'antd';
import ListWorkPost from '../../../components/Talent/home/workPostListing';



export interface Project {
    createdAt?: Date;
    Title: string;
    Client_id: string;
    Skills: string[];
    TimeLine: 'Small' | 'Medium' | 'Large';
    Description: string;
    Expertiselevel: 'Fresher' | 'Medium' | 'Experienced';
    Amount: number;
    WorkType: 'Fixed' | 'Milestone';
    isDelete: boolean;
}

const HomePage: React.FC = () => {
    const navigate = useNavigate()
    const [query, setQuery] = useState<string>("")
    const basicData: INITIALSTATE = useSelector((state: ROOTSTORE) => state.signup)
    const [posts, setPosts] = useState<Project[] | []>([])
    const [client, setClients] = useState<object[]>([])
    const [userData, setUserData] = useState<{ First_name: string, Last_name: string }>(
        { First_name: "", Last_name: "" }
    )
    const dispatch = useDispatch()
    const [contractDetails, setDetails] = useState<{ activeLength: number, completedLength: number, cacelledLength: number, }>({
        activeLength: 0,
        completedLength: 0,
        cacelledLength: 0
    })
    const [open, setOpen] = useState<boolean>(false);
    useEffect(() => {
        fetchAllJobPostForTalent()
            .then((res: AxiosResponse) => {
                setPosts(res.data.data);
            })
            .catch((_err: AxiosError) => {
            });
        getAllClientForTalent()
            .then((res) => {
                setClients(res.data)
            }).catch((err) => {
                console.log(err)
            })
        getUserProfileDetails(basicData.role)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then((res: any) => {
                setUserData(res?.data?.data)
            })
        //contract
        fetchCompletedContract(basicData.role)
            .then((res) => {
                setDetails({
                    ...contractDetails,
                    completedLength: res.data.data?.length
                })
            })
        getAllActiveContract(basicData.role)
            .then((res) => {
                setDetails({
                    ...contractDetails,
                    activeLength: res.data.data?.length
                })
            })
        getAllCancelledContracts(basicData.role)
            .then((res) => {
                setDetails({
                    ...contractDetails,
                    cacelledLength: res.data.data?.length
                })
            })
        getNewProgress(basicData.id || "", basicData.role)
            .then((res) => {
                dispatch(setProgress(res?.data?.data || 100))
            })
    }, [basicData]);
    const [activeTab, setActiveTab] = useState<number>(1);
    const handleTabClick = (tabNumber: React.SetStateAction<number>) => {
        setActiveTab(tabNumber);
    };
    const handleShowJobPostDetails: (index: number) => void = (index) => {
        localStorage.setItem("deatildView", JSON.stringify(posts[index]))
        navigate(talent_routes.JobViewPage)
    }
    const handleSearch = () => {
        localStorage.setItem("search", query)
        navigate("/search")
    }
    const ref1 = useRef(null);


    const steps: TourProps['steps'] = [
        {
            title: 'Completed your verifications .',
            description: '100% completion of you profile will help your get more reach.',
            cover: (
                <img
                    alt="tour.png"
                    src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
                />
            ),
            target: () => ref1.current,
        },
    ];
    if (basicData.progress !== 100) {
        setTimeout(() => {
            setOpen(true)
        }, 100000);
    }
    return (
        <>
            <div className="bg-gradient-to-r from-blue-300 to-blue-500 absolute -z-10 w-full h-[50vh]" >
            </div>
            <div className=" sm:flex w-full">
                {/* right side */}
                <div className="flex flex-col mt-5 ml-28 w-[60%] ">
                    {/* job post banners */}
                    <div className="border w-full h-[25vh] rounded-xl mt-5 shadow-xl flex justify-between bg-white">
                        <div className="m-5 mt-8" >
                            <p className="font-sans font-normal text-xs ">{formatMongoDate(new Date(Date.now()))}</p>
                            <p className=" font-sans font-semibold text-xl mb-1">Welcome back</p>
                            <span className="text-red-500 mt-3 font-sans font-bold w-32 text-xl">{userData?.First_name} {userData?.Last_name}</span>
                        </div>
                        <div className=" mr-10 md:bg-black">
                            <img src={BannerImage} alt="" className="h-[24vh]  " />
                        </div>
                    </div>
                    {/* search */}
                    <div className="w-full mt-5 border rounded-xl shadow-xl bg-white">
                        <div className="flex">
                            <div className="flex w-fll items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200  p-4">
                                <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none  w-5 fill-gray-500 transition">
                                    <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                                </svg>
                            </div>
                            <input value={query} type="text" className="w-full rounded-r-full  pl-2 text-base font-semibold outline-0" placeholder="Search " onChange={(e: ChangeEvent<HTMLInputElement>) => { setQuery(e.target.value) }} />
                            <input type="button" value="Search" className="bg-red-500 p-2  rounded-tr-xl rounded-br-xl  text-white font-semibold transition-colors " onClick={handleSearch} />
                        </div>
                    </div>
                    <div className="w-full mt-5 flex justify-between text-white ">
                    </div>
                    {/* tyes */}
                    <div>
                        <div className="w-full mt-10">
                            <div className="flex bg-white border-b justify-evenly border-gray-200">
                                <button
                                    onClick={() => handleTabClick(1)}
                                    className={`text-sans font-semibold ml-5 px-4 py-2 focus:outline-none ${activeTab === 1 ? 'text-red-500 border-b-2 border-red-500 transition duration-500' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Clients({client?.length})
                                </button>
                                <button
                                    onClick={() => handleTabClick(2)}
                                    className={`text-sans font-semibold px-4 py-2 focus:outline-none ${activeTab === 2 ? 'text-red-500 border-b-2 border-red-500 transition duration-500' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Works({posts?.length})
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* filter */}
                    {
                        activeTab == 2 ? <><ListWorkPost handleShowJobPostDetails={handleShowJobPostDetails} /></>
                            : <ClientList />
                    }
                    {/* talents */}
                    <div className="w-full h-[30vh]">
                    </div>
                </div>
                {/* left side */}
                <div className="ml-10 w-[30vw] mt-9 " ref={ref1}>
                    {/* profile progress sections */}
                    <div className="border  shadow-xl w-[80%] rounded-xl h-auto bg-white" ref={ref1}>
                        <p className="text-center font-sans font-bold text-xl mt-5">{userData?.First_name} {userData?.Last_name}</p>
                        <p className="text-center font-sans font-semibold text-sm mt-1 text-slate-500">TECHUNT</p>
                        <Box className="m-auto mt-2" sx={{ width: '80%' }}>
                            <span className=" font-sans font-semibold text-sm">{basicData?.progress !== 100 ? "Set up your account" : "Set up completed"}</span>
                            <LinearProgressWithLabel value={basicData?.progress} />
                        </Box>
                        <div className="flex justify-center items-center m-2">
                            <button
                                onClick={() => {
                                    navigate(talent_routes.Profile)
                                }}
                                className="border text-red-500  mt-3 font-sans font-semibold text-xs w-60 border-red-500 rounded-full h-8">{basicData.progress === 100 ? "Go to profile" : "Complete your profile "}</button>
                        </div>
                        {
                            basicData.progress !== 100 && <p className="font-sans font-thin text-xs text-slate-500 mt-2 text-center ">
                                100% completion of  you profile will help <br />
                                your get more reach.
                            </p>
                        }
                    </div>
                    {/* verifications */}
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className='shadow-xl flex justify-between border px-2 py-2 rounded-xl  w-[80%] mt-5 bg-white '>
                                    <label className="w-full h-full text-start font-sans font-semibold">
                                        Verifications
                                    </label>
                                    <ArrowUpward className={`transition-transform   transform ${open ? 'duration-1000 rotate-180' : ''}`} />
                                </Disclosure.Button>
                                <Transition
                                    enter="transition duration-100 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-75 ease-out"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                >
                                    <Disclosure.Panel>
                                        <div className="border bg-white shadow-xl w-[80%] rounded-xl h-[38vh] mt-1 ">
                                            <div className="w-full border-b-2 mt-5">
                                                <p className="m-2 font-sans ml-5 font-semibold text-xl mb-1">Verifications</p>
                                            </div>
                                            <div className="flex justify-between m-5 ">
                                                <div className="flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                                    </svg>
                                                    <span className="text-start ml-2 text-sm font-normal font-sans">Payment Verify</span>
                                                </div>
                                                <div>
                                                    <span
                                                        onClick={() => !basicData?.bankVerified ? navigate(routerVariables.Settings) : null}
                                                        className={`${basicData?.bankVerified ? "text-green-500" : "text-red-500"} ml-12 text-sm hover:text-red-500`}>{basicData?.bankVerified ? "Verified" : "Verify"} </span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between m-5 ">
                                                <div className="flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-blue-600">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                                    </svg>
                                                    <span className="text-start  ml-2 text-sm font-normal font-sans">Phone Number Verify</span>
                                                </div>
                                                <div>
                                                    <span
                                                        onClick={() => !basicData.numberVerify ? navigate(routerVariables.Settings) : null}
                                                        className={`${basicData.numberVerify ? "text-green-500" : "text-red-500"} ml-12 text-sm hover:text-red-500`}>{basicData?.numberVerify ? "Verified" : "Verify"}</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between m-5 ">
                                                <div>
                                                    <EmailIcon fontSize="small" />
                                                    <span className="text-start ml-2 text-sm font-normal font-sans">Email Verify</span>
                                                </div>
                                                <div>
                                                    <span className={`${basicData.verify ? "text-green-500" : "text-red-500"} ml-12 text-sm hover:text-red-500`}>{basicData?.verify ? "Verified" : "Verify"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Disclosure.Panel>
                                </Transition>
                            </>
                        )}
                    </Disclosure>
                    {/* CONTRACT DETAILS */}
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className='shadow-xl flex justify-between  border px-2 py-2 rounded-xl  w-[80%] mt-5 bg-white'>
                                    <label className='w-full h-full text-start font-sans font-semibold'>
                                        All Contract
                                    </label>
                                    <ArrowUpward className={open ? 'rotate-180 transform' : ''} />
                                </Disclosure.Button>
                                <Transition
                                    enter="transition duration-100 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-75 ease-out"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                >
                                    <Disclosure.Panel>
                                        <div className="border bg-white  shadow-xl w-[80%] rounded-xl h-[40vh] mt-1">
                                            <div className="w-full border-b-2 mt-5  flex justify-between">
                                                <p className="m-2 font-sans font-semibold text-xl ml-5 mb-1">All Contract</p>
                                                <p className="m-2 font-sans font-semibold text-md mb-1">Total :<b className="font-sans font-semibold text-md mb-1">{contractDetails?.activeLength + contractDetails?.cacelledLength + contractDetails?.completedLength}</b> </p>
                                            </div>
                                            <div className="flex justify-between m-5 ">
                                                <div className="flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-800">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                                    </svg>
                                                    <span className="text-start text-sm ml-2 font-semibold font-sans">Active projects </span>
                                                    <span className=" ml-2 hover:text-red-500 text-sm">: {contractDetails?.activeLength}</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between m-5 ">
                                                <div className="flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                                                    </svg>
                                                    <span className="text-start text-sm ml-2 font-semibold font-sans">Completed projects </span>
                                                    <span className=" ml-2 hover:text-red-500 text-sm">: {contractDetails?.completedLength}</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between m-5 ">
                                                <div className="flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                    <span className="text-start text-sm ml-2 font-semibold font-sans">Canceled projects </span>
                                                    <span className=" ml-2 hover:text-red-500 text-sm">: {contractDetails?.cacelledLength}</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-center items-center m-5 ">
                                                <button
                                                    onClick={() => navigate(talent_routes.ContactListing)}
                                                    className="border px-2 m-2 text-red-500 border-red-500 rounded-full font-sans font-semibold text-sm">View all</button>
                                            </div>
                                        </div>
                                    </Disclosure.Panel>
                                </Transition>
                            </>
                        )}
                    </Disclosure>
                </div>
            </div >
            <Tour open={open} onClose={() => setOpen(false)} mask={false} type="primary" steps={steps} animated arrow zIndex={100} />
        </>
    )
}
export default HomePage;