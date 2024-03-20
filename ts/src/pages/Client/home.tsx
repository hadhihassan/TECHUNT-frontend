import React, { useEffect, useState } from "react"
import Header from "../../components/General/Home/Header/afterLoginHeader";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Box from '@mui/material/Box';
import { LinearProgressWithLabel } from "../../components/General/linerProgressBar";
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from "react-router-dom";
import routerVariables, { clientRoutes, talent_routes } from "../../routes/pathVariables";
import { fetchAllJobPost, fetchConnectedTalent, getAllProposalForClient } from '../../services/clientApiService'
import ListDiscoverTalent from "../../components/Client/clientHome/listDiscoverTalent";
import ListJobPost from "../../components/Client/clientHome/listJobPost";
import IMAGE1 from '../../../src/assets/4950287_19874-removebg-preview.png'
import { useSelector } from "react-redux";
import { ROOTSTORE } from "../../redux/store";
import { AxiosError, AxiosResponse } from "axios";
import ListAllPropposals from "../../components/Client/clientHome/listProposals";
import type { JobInterface } from '../../interface/interfaces'
import ListConnectedFreelancers from "../../components/Client/clientHome/listConnectedTalent";
import { ArrowUpward, Contrast, Message, Work } from '@mui/icons-material';
import { Disclosure, Transition } from '@headlessui/react'
import type { ProposalInterface, UserProfile } from '../../interface/interfaces'
import Avatar from '@mui/material/Avatar';
import type { MenuProps } from 'antd';
import { Dropdown, message } from 'antd';
import { CgProfile } from "react-icons/cg";
import { INITIALSTATE } from "../../redux/Slice/signupSlice";
import { createConversation } from "../../services/commonApiService";

const Home = () => {
    const basicData: INITIALSTATE = useSelector((state: ROOTSTORE) => state.signup)
    const [activeTab, setActiveTab] = useState(1);
    const [jobs, setJobs] = useState<JobInterface[]>([])
    const [connectedTalent, setTalents] = useState<ProposalInterface[]>([])
    const tabList = [<ListDiscoverTalent />, < ListAllPropposals />, < ListConnectedFreelancers />, <ListJobPost />,]
    const [menuIndex, setMenuINdex] = useState<number>(0)
    const navigate = useNavigate()
    const handleTabClick = (tabNumber: React.SetStateAction<number>) => {
        setActiveTab(tabNumber);
    };
    const [lenProposal, setLength] = useState<number>(0)
    const [progress, setProgress] = useState(80);
    useEffect(() => {
        fetchAllJobPost()
            .then((res) => {
                setJobs(res?.data?.data?.data)
            }).catch((err: AxiosError) => {
                console.log(err)
            })
        getAllProposalForClient(basicData?.id)
            .then((res) => {
                setLength(res.data.data.length)
            })
        fetchConnectedTalent()
            .then((res: AxiosResponse) => {
                setTalents(res.data.data)
                console.log(res.data.data)
            }).catch((err: AxiosError) => {
                console.log(err.message)
            })
    }, [basicData])

    const items: MenuProps['items'] = [
        {
            label: 'Profile',
            key: '1',
            icon: <CgProfile />,
            danger: true,
            onClick: () => {
                localStorage.setItem("profileData", JSON.stringify(connectedTalent[menuIndex].talentId))
                navigate(talent_routes.ProfileView)
            }
        },
        {
            label: 'Proposal',
            key: '2',
            icon: < Contrast />,
            danger: true,
            onClick: () => {
                localStorage.setItem("proposal", JSON.stringify(connectedTalent[menuIndex]))
                navigate(clientRoutes.viewProposal)
            }
        },
        {
            label: 'Job',
            key: '3',
            icon: <Work />,
            danger: true,
            onClick: () => {
                localStorage.setItem("deatildView", JSON.stringify(connectedTalent[menuIndex].jobId))
                navigate(talent_routes.JobViewPage)

            }
        },
        {
            label: 'Message',
            key: '3',
            icon: <Message />,
            danger: true,
            onClick: () => {
                // if(!basicData.premiumUser){
                //     createConversation(connectedTalent[menuIndex]?.talentId?._id)
                //     .then((res)=>{
                //         navigate('/message')
                //     })
                // }else{
                    message.loading("dsd",3000)
                // }
            }
        },
    ];

    const menuProps = {
        items,
    };
    return (
        <>
            <Header />
            <div className=" flex w-full ">
                {/* right side */}
                <div className="flex flex-col mt-5 ml-28 w-[60%] h-auto ">
                    {/* welcome page */}
                    <div>
                        <p className='font-sans font-normal text-xl '>Welcome back, <span className="font-sans font-bold text-xl">Hadhi</span> </p>
                    </div>
                    {/* job post banners */}
                    {
                        !jobs || !jobs.length ? <div className="border w-full h-[25vh] rounded-xl mt-5 shadow-xl flex justify-between">
                            <div className="m-5">
                                <p className=" font-sans font-semibold text-xl mb-1">No job post</p>
                                <p className=" font-sans font-normal text-xs m-2">You have not posted any work, post your work <br />
                                    and find world’s best talent here.</p>
                                <button onClick={() => {
                                    navigate(clientRoutes.CREATE_JOB_POST)
                                }} className="bg-red-500 text-white mt-3 font-sans font-semibold text-xs w-32 rounded-full h-8">work now</button>
                            </div>
                            <div className="-mt-9 mr-10">
                                <img src={IMAGE1} alt="" className="h-[30vh] " />
                            </div>
                        </div>
                            :
                            <div className="border w-full h-[25vh] rounded-xl mt-5 shadow-xl">
                                <div className="border-b-2 flex justify-between w-full h-[50px]">
                                    <p className=" font-sans font-semibold text-xl m-3">Your posting</p>
                                    <button className="border border-red-500 text-red-500 font-sans font-normal px-3 rounded-full text-xs h-[2vw] m-3">View all jobs</button>
                                </div>
                                <div className=" flex justify-between">
                                    <div>
                                        <p className="m-3 mt-9 font-sans font-semibold text-xl">Totla work posting : {jobs.length}</p>
                                    </div>
                                    <div className="mr-10">
                                        <div className="flex mr-10  justify-between">
                                            <p className="m-3 font-sans font-semibold text-sm ">Proposals</p>
                                            <p className="m-3 font-sans font-semibold text-sm ">Hired</p>
                                        </div>
                                        <div className=" mr-10 flex justify-between">
                                            <p className="m-3 font-sans font-normal text-sm ">{lenProposal}</p>
                                            <p className="m-3 font-sans font-normal text-sm ">00</p>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                    {/* search */}
                    <div className="w-full mt-5 border rounded-xl shadow-xl ">
                        <div className="flex h-[46px]">
                            <div className="flex w-fll items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200  p-5">
                                <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none  w-5 fill-gray-500 transition">
                                    <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                                </svg>
                            </div>
                            <input type="text" className="w-full rounded-r-full  pl-2 text-base font-semibold outline-0" placeholder="Search talent here" id="" />
                            <input type="button" value="Search" className="bg-red-500 p-2  rounded-tr-xl rounded-br-xl  text-white font-semibold transition-colors " />
                        </div>
                    </div>
                    {/* tyes */}
                    <div>
                        <div className="w-full mt-10">
                            <div className="flex border-b justify-between border-gray-200">
                                <button
                                    onClick={() => handleTabClick(1)}
                                    className={`text-sans font-semibold ml-5 px-4 py-2 focus:outline-none ${activeTab === 1 ? 'text-red-500 border-b-2 border-red-500 transition duration-500' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Discover Talent
                                </button>
                                <button
                                    onClick={() => handleTabClick(2)}
                                    className={`text-sans font-semibold px-4 py-2 focus:outline-none ${activeTab === 2 ? 'text-red-500 border-b-2 border-red-500 transition duration-500' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Proposals
                                </button>
                                <button
                                    onClick={() => handleTabClick(3)}
                                    className={`text-sans font-semibold mr-5 px-4 py-2 focus:outline-none ${activeTab === 3 ? 'text-red-500 border-b-2 border-red-500 transition duration-500' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    hired(Connected)
                                </button>
                                <button
                                    onClick={() => handleTabClick(4)}
                                    className={`text-sans font-semibold mr-5 px-4 py-2 focus:outline-none ${activeTab === 4 ? 'text-red-500 border-b-2 border-red-500 transition duration-500' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Work Posts
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* filter */}
                    <div className="w-full mt-5 flex justify-between ">
                        <p className="text-sans font-semibold">Best matches for you (200)</p>
                        <div>
                            <FilterAltIcon color="error" /><span className="text-sans font-normal text-red-500">filter here</span>
                        </div>
                    </div>
                    {/* talents */}
                    <div className="w-full h-auto mb-20">
                        <>
                            {
                                tabList[activeTab - 1]
                            }
                        </>
                    </div>
                </div>
                {/* left side */}
                <div className=" ml-10 w-[30vw] mt-5">
                    <div className="flex ml-48 mb-2 ">
                        <button onClick={() => {
                            navigate(clientRoutes.CREATE_JOB_POST)
                        }} className="bg-red-500 text-white mt-3 font-sans font-semibold text-xs w-32 rounded-full h-8">Post New Job</button>
                    </div>
                    {/* porfile proggress sections */}
                    <div className="border  shadow-xl w-[80%] rounded-xl h-auto">
                        <p className="text-center font-sans font-bold text-xl mt-5">Hadhi</p>
                        <p className="text-center font-sans font-semibold text-sm mt-1 text-slate-500">techunt</p>
                        <Box className="m-auto mt-2" sx={{ width: '80%' }}>
                            <span className=" font-sans font-semibold text-sm">Set up your account</span>
                            <LinearProgressWithLabel value={progress} />
                        </Box>
                        <div className="flex justify-center items-center m-2">
                            <button className=" border text-red-500  mt-3 font-sans font-semibold text-xs w-60 border-red-500 rounded-full h-8">Complete your profile</button>
                        </div>
                        <p className="font-sans font-thin text-xs text-slate-500 mt-2 text-center mb-2">
                            100% completion of  you profile will help <br />
                            your get more reach.
                        </p>
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
                                        <div className="border  shadow-xl w-[80%] rounded-xl h-auto mt-2 ">
                                            <div className="w-full border-b-2 mt-5">
                                                <p className="m-2 font-sans ml-5 font-semibold text-xl mb-1">Verifications</p>
                                            </div>
                                            <div className="flex justify-between m-5 ">
                                                <div className="flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                                    </svg>
                                                    <span className="text-start ml-2 text-sm font-normal font-sans">Payemtn Verify</span>
                                                </div>
                                                <div>
                                                    <span className="text-blue-600 ml-12 text-sm hover:text-red-500">Verify</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between m-5 ">
                                                <div className="flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-blue-600">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                                    </svg>
                                                    <span className="text-start  ml-2 text-sm font-normal font-sans">Phone Number Verify</span>
                                                </div>
                                                <div>
                                                    <span
                                                        onClick={() => {
                                                            navigate(routerVariables.Settings)
                                                        }} className={` ml-12 text-sm hover:text-red-500 ${basicData.numberVerify ? "text-red-500" : " text-blue-600"} `}>{basicData.numberVerify ? "Verified" : "Verify"}</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between m-5 ">
                                                <div>
                                                    <EmailIcon fontSize="small" />
                                                    <span className="text-start ml-2 text-sm font-normal font-sans">Email Verify</span>
                                                </div>
                                                <div>
                                                    <span className="text-red-500 ml-12 text-sm hover:text-red-500">Verified</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Disclosure.Panel>
                                </Transition>
                            </>
                        )}
                    </Disclosure>
                    {/* Jobs */}
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
                                        <div className="border  shadow-xl w-[80%] rounded-xl h-auto mb-5  mt-2 ">
                                            <div className="w-full border-b-2 mt-5  flex justify-between">
                                                <p className="m-2 font-sans font-semibold text-xl ml-5 mb-1">All contracts</p>
                                                <p className="m-2 font-sans font-semibold text-md mb-1">Total :<b className="font-sans font-semibold text-md mb-1">10</b> </p>
                                            </div>
                                            <div className="flex justify-between m-5 ">
                                                <div className="flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-800">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                                    </svg>
                                                    <span className="text-start text-sm ml-2 font-semibold font-sans">Active contracts </span>
                                                    <span className=" ml-2 hover:text-red-500 text-sm">: 02</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between m-5 ">
                                                <div className="flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                                                    </svg>
                                                    <span className="text-start text-sm ml-2 font-semibold font-sans">Active contracts </span>
                                                    <span className=" ml-2 hover:text-red-500 text-sm">: 09</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between m-5 ">
                                                <div className="flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                    <span className="text-start text-sm ml-2 font-semibold font-sans">Active contracts </span>
                                                    <span className=" ml-2 hover:text-red-500 text-sm">: 09</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-center items-center m-5 ">
                                                <button className="border px-2 m-2 text-red-500 border-red-500 rounded-full font-sans font-semibold text-sm">View all</button>
                                            </div>
                                        </div>
                                    </Disclosure.Panel>
                                </Transition>
                            </>
                        )}
                    </Disclosure>
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className='shadow-xl flex justify-between  border px-2 py-2 rounded-xl  w-[80%] mt-5 bg-white'>
                                    <label className='w-full h-full text-start font-sans font-semibold'>
                                        Connected
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
                                        <div className="border  shadow-xl w-[80%] rounded-xl h-auto mb-5  mt-2 ">
                                            <div className="flex justify-between mt-2  border-b w-full">
                                                {
                                                    connectedTalent && connectedTalent?.map((talent: ProposalInterface, index: number) => (
                                                        <div key={index} className="flex m-5 justify-between">{console.log(talent.talentId)}
                                                            <div>
                                                                <Avatar alt="Remy Sharp" src={`http://localhost:3000/images/${talent?.talentId?.Profile?.profile_Dp}`} />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-start text-sm ml-2 font-semibold font-sans">
                                                                    {talent.talentId.First_name} {talent?.talentId?.Last_name}
                                                                </span>
                                                                <span className="text-gray-400 text-start text-sm ml-2 font-semibold font-sans">
                                                                    {talent.talentId.Profile.Title}
                                                                </span>
                                                            </div>
                                                            <div className="flex justify-end">
                                                                <Dropdown.Button className="ml-7" menu={menuProps} onOpenChange={() => setMenuINdex(index)}  >
                                                                    Show
                                                                </Dropdown.Button>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </Disclosure.Panel>
                                </Transition>
                            </>
                        )}
                    </Disclosure>
                </div>
            </div >
        </>
    );
}



export default Home;