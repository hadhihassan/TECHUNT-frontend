import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { fetchConnectedTalent } from '../../../services/clientApiService';
import Avatar from 'react-avatar';
import IMAGE from '../../../assets/4950287_19874-removebg-preview.png';
// import Rating from '@mui/material/Rating';
// import Stack from '@mui/material/Stack';
// import { FlagOutlined } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { clientRoutes, talent_routes } from '../../../routes/pathVariables';
import type { ProposalInterface } from '../../../interface/interfaces';
import { createConversation } from '../../../services/commonApiService';
import ReusableNotification from '../../General/chat/sideBar/popupMessages';
import { Menu, Dropdown, Button } from 'antd';


const ListConnectedFreelancers: React.FC = () => {


    const navigate = useNavigate()
    const [connections, setConnections] = useState<ProposalInterface[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: AxiosResponse = await fetchConnectedTalent();
                setConnections(response?.data?.data);
            } catch (error) {
                console.error('Error fetching connected talents:', error);
            }
        };
        fetchData();
    }, []);
    const MAX_SKILLS_DISPLAY = 3;
    const [showAllSkills, setShowAllSkills] = useState<boolean>(false);
    const toggleSkills = () => {
        setShowAllSkills(!showAllSkills);
    };
    const handleShowProposalDetails = (index: number) => {
        localStorage.setItem("proposal", JSON.stringify(connections[index]))
        navigate(clientRoutes.viewProposal)
    }
    const handleShowJobDetails = (index: number) => {
        localStorage.setItem("deatildView", JSON.stringify(connections[index].jobId))
        navigate(talent_routes.JobViewPage)
    }
    const handleMessage = (index: number) => {
        createConversation(connections[index]?.talentId?._id as string)
            .then(() => {
                navigate('/message')
            })
    }
    const [showNotification, setShowNotification] = useState(false);
    const DropdownMenu = ({ index }: { index: number }) => (
        <Menu>
            <Menu.Item key="1" danger={true} onClick={() => handleMessage(index)}>Message</Menu.Item>
            <Menu.Item key="2" danger={true} onClick={() => handleShowJobDetails(index)}>Job details</Menu.Item>
            <Menu.Item key="3" danger={true} onClick={() => handleShowProposalDetails(index)}>Proposal details</Menu.Item>
            <Menu.Item key="3" danger={true} onClick={() => handleSendContract(index)}>Send contract</Menu.Item>
        </Menu>
    );
    const handleSendContract = (index: number) => {
        const selectTalent = connections[index]
        if (selectTalent.paymentStatus === "Completed") {
            localStorage.setItem("proposal", JSON.stringify(connections[index]))
            navigate(clientRoutes.ContractSubmit)
        } else {
            setShowNotification(!showNotification)
        }
    }
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage: number = 5;
    const indexOfLastPost: number = currentPage * itemsPerPage;
    const indexOfFirstPost: number = indexOfLastPost - itemsPerPage;
    const connectedClient = connections.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    return (
        <>
            {connectedClient?.map((connection: ProposalInterface, index: number) => (
                <><div className="w-full mt-5 border rounded-xl shadow-xl h-auto " key={index}>
                    {/* <button className="bg-blue-700 cursor-none w-[5vw] h-[3vh]  rounded-full text-white font-normal font-sans text-xs relative bottom-3 left-5">Top rate</button> */}
                    <div className="flex justify-between p-4 " >
                        <div className="flex">
                            <div>
                                <Avatar src={IMAGE} className="w-8 h-8" />
                            </div>
                            <div className="ml-4">
                                <p className="text-md font-bold">{connection?.talentId?.First_name} {connection?.talentId?.Last_name}</p>
                                <p className="text-sm text-gray-500">{connection?.talentId?.Profile?.Title}</p>
                                <div className="mt-2">
                                    {/* <p className="text-sm text-gray-500">Total earnings <b>$ok</b> {connection?.talentId?.Profile.Title}</p> */}
                                    <div className="flex mt-2">
                                        {connection?.talentId?.Profile?.Skills.slice(0, showAllSkills ? connection?.talentId?.Profile?.Skills?.length : MAX_SKILLS_DISPLAY).map((value: string, index: number) => (
                                            <p key={index} className="bg-slate-100 font-sans px-3 rounded-full text-sm border mr-2">
                                                {value}
                                            </p>
                                        ))}
                                        {!showAllSkills && connection?.talentId?.Profile?.Skills?.length > MAX_SKILLS_DISPLAY && (
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
                        <Dropdown overlay={<DropdownMenu index={index} />} placement="bottomLeft" arrow>
                            <Button className="border border-red-500 text-red-500 ml-5 text-xs px-12 py-2 font-sans font-bold rounded-full self-center">
                                Actions
                            </Button>
                        </Dropdown>
                    </div>
                    <ReusableNotification showNotification={showNotification} title={'Note'} content={'Cant start contract after freelancer pay the free'} status={'info'} />
                </div>
                </>
            ))}
            <div className="flex items-center gap-4 justify-center m-10">
                <button
                    className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {Array.from({ length: Math.ceil(connections.length / itemsPerPage) }, (_, index) => (
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
                    disabled={currentPage === Math.ceil(connections.length / itemsPerPage)}
                >
                    Next
                </button>
            </div>
        </>
    );
}
export default ListConnectedFreelancers;
