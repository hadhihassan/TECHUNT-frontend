import Avatar from "react-avatar";
import { IconButton } from '@mui/material';
// import Rating from '@mui/material/Rating';
// import Stack from '@mui/material/Stack';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { fetchAllJobPost, getALlTalent, sendInvitation } from '../../../services/clientApiService';
import { AxiosError, AxiosResponse } from 'axios';
import { UserProfile } from '../../../interface/interfaces';
import { useNavigate } from "react-router-dom";
import { talent_routes } from "../../../routes/pathVariables";
import { createConversation } from "../../../services/commonApiService";
import { Dialog, Transition } from '@headlessui/react'
import type { jobInterface } from '../jobPost/editJobPostForm'
import { message } from "antd";

const ListDiscoverTalent = () => {
    const navigate = useNavigate()
    const [discoverTalent, setDiscoverTalent] = useState<UserProfile[]>([])
    const [isOpen, setOpen] = useState<boolean>(false)
    const [works, setWorks] = useState<jobInterface[]>([])
    const [selectedUserId, setSelectedUserId] = useState<string>("")
    const [workId, setWorkId] = useState<string>("")

    const closeModal = () => setOpen(!isOpen)
    useEffect(() => {
        const fetchAllTalents = () => {
            getALlTalent()
                .then((res: AxiosResponse) => {
                    setDiscoverTalent(res.data)
                })
                .catch((error: AxiosError) => {
                    console.error('Error fetching talents:', error);
                });
            fetchAllJobPost()
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .then((res: any) => {
                    setWorks(res?.data?.data?.data)
                })
        };
        fetchAllTalents();
    }, []);
    const MAX_SKILLS_DISPLAY = 3;
    const [showAllSkills, setShowAllSkills] = useState<boolean>(false);
    const toggleSkills = () => {
        setShowAllSkills(!showAllSkills);
    };

    const handleNavigateProfile = (index: number) => {
        localStorage.setItem("profileData", JSON.stringify(discoverTalent[index]))
        navigate(talent_routes.ProfileView)
    };
    const handleMessage = (index: number) => {
        createConversation(discoverTalent[index]._id)
            .then(() => navigate('/message'))
    }
    const handleSendInvitation = () => {
        sendInvitation(workId , selectedUserId)
            .then((res: AxiosResponse) => {
                if (res.data.success) {
                    message.success("Invitation sended successfully")
                }
            }).catch(() => message.error("Try again . Something went wrong ?"))
    }
    //pagination logic
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage: number = 5;
    const indexOfLastPost: number = currentPage * itemsPerPage;
    const indexOfFirstPost: number = indexOfLastPost - itemsPerPage;
    const paginatedTalents = discoverTalent.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    return (<>
        {
            paginatedTalents?.map((talent: UserProfile, index: number) => (
                <div className="w-full mt-5 border rounded-xl shadow-xl h-auto mb-5" key={index}>
                    {/* <button className="bg-blue-700 cursor-none w-[5vw] h-[3vh] rounded-full text-white font-normal font-sans text-xs relative bottom-3 left-5">Top rate</button> */}
                    <div className="flex justify-between p-4">
                        <div className="flex">
                            <IconButton size="small">
                                <Avatar src={`http://localhost:3000/images/${talent.Profile.profile_Dp}`} className="w-8 h-8" />
                            </IconButton>
                            <div className="ml-4">
                                <p className="text-md font-bold">{talent?.First_name}{talent?.Last_name}</p>
                                <p className="text-sm text-gray-500">{talent?.Profile.Title}</p>
                                <div className="mt-2">
                                    {/* <p className="text-sm text-gray-500">Total earnings <b>$0k</b> on {talent?.Profile.Title}</p> */}
                                    <div className="flex mt-2">
                                        {talent?.Profile?.Skills.slice(0, showAllSkills ? talent?.Profile?.Skills?.length : MAX_SKILLS_DISPLAY).map((value: string, index: number) => (
                                            <p key={index} className="bg-slate-100 font-sans px-3 rounded-full text-sm border mr-2">
                                                {value}
                                            </p>
                                        ))}
                                        {!showAllSkills && talent?.Profile?.Skills?.length > MAX_SKILLS_DISPLAY && (
                                            <span className="text-sm font-semibold text-red-500 ml-2 self-center cursor-pointer" onClick={toggleSkills}>
                                                more
                                            </span>
                                        )}
                                        {showAllSkills && (
                                            <span className="text-sm font-semibold text-red-500 ml-2 self-center cursor-pointer" onClick={toggleSkills}>
                                                less
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col mt-1">
                            <button className=" mb-2 border border-red-500 text-red-500 ml-5 font-semibold text-xs px-14 py-2 rounded-full self-center" onClick={() => {
                                closeModal()
                                setSelectedUserId(talent._id)
                            }}>Invite</button>

                            <button className=" mb-2 border border-red-500 text-red-500 ml-5 font-semibold text-xs px-14 py-2 rounded-full self-center" onClick={() => handleMessage(index)}>Message</button>
                            <button className="border border-red-500 text-red-500 ml-5 font-semibold text-xs px-12 py-2 rounded-full self-center" onClick={() => handleNavigateProfile(index)}>See profile</button>
                        </div>
                    </div>
                    <div className="ml-30 flex ml-36 mb-4">
                        {/* <div className="flex">
                            <Stack spacing={1}>
                                <Rating name="half-rating-read" size="small" defaultValue={2.5} precision={0.5} />
                            </Stack>
                            <p className="text-gray-500 font-sans font-normal text-sm">4/5 (12 Reviews)</p>
                        </div> */}
                        {/* <div className="border-r border-solid  border-gray-500 h-5 ml-2 mr-2 "></div> */}
                        {/* <div>
                            <FlagOutlined />
                            <span className="text-gray-500 font-sans font-normal text-sm">{talent.Country}, {talent.City}</span>
                        </div> */}
                    </div>
                </div>


            ))
        }
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <div className="mt-2">
                                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                                        <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0">
                                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                                <p className="text-xl font-bold leading-tight tracking-tight text-gray-700 font-sans text-center md:text-2xl">
                                                    Send invitation
                                                </p><div>
                                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                                        Select you work post
                                                    </label>
                                                    <select
                                                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {setWorkId(e.target.value);alert(e.target.value)}}
                                                        name="work"
                                                        className="outline-none bg-gray-50 border rounded-xl border-gray-300 text-gray-900 sm:text-sm  block w-full p-2.5">
                                                        {works?.map((work: jobInterface, index: number) => (
                                                            <option key={index} value={work?._id}>{work?.Title}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <button
                                                    className="w-full bg-red-500   font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
                                                    onClick={handleSendInvitation}>
                                                    send
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
        <div className="flex items-center gap-4 justify-center m-10">
            <button
                className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            {Array.from({ length: Math.ceil(discoverTalent.length / itemsPerPage) }, (_, index) => (
                <button
                    className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${currentPage === index + 1 ? 'bg-gray-900 text-white shadow-md shadow-gray-900/10' : ''}`}
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
                disabled={currentPage === Math.ceil(discoverTalent.length / itemsPerPage)}
            >
                Next
            </button>
        </div>
    </>)
}
export default ListDiscoverTalent;