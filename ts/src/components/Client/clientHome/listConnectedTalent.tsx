import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { fetchConnectedTalent } from '../../../services/clientApiService';
import Avatar from 'react-avatar';
import IMAGE from '../../../assets/4950287_19874-removebg-preview.png';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { FlagOutlined } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { clientRoutes, talent_routes } from '../../../routes/pathVariables';
import type { ProposalInterface } from '../../../interface/interfaces';
import { createConversation } from '../../../services/commonApiService';
import ReusableNotification from '../../General/chat/sideBar/popupMessages';
import { Menu, Dropdown, Button } from 'antd';


const ListConnectedFreelancers: React.FC = () => {


    const navigate = useNavigate()
    const [connections, setConnections] = useState<ProposalInterface[]>([]);
    const [open, setopen] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: AxiosResponse = await fetchConnectedTalent();
                console.log(response.data, "connected talents");
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
        createConversation(connections[index]?.talentId?._id)
            .then((res: AxiosResponse) => {
                navigate('/message')
            })
    }
    const [showNotification, setShowNotification] = useState(false);

    const handleClick = () => {
        console.log('Button clicked!');
    };
    const DropdownMenu = ({ index }: { index: number }) => (
        <Menu>
            <Menu.Item key="1" danger={true} onClick={() => handleMessage(index)}>Message</Menu.Item>
            <Menu.Item key="2" danger={true} onClick={() => handleShowJobDetails(index)}>Job details</Menu.Item>
            <Menu.Item key="3" danger={true} onClick={() => handleShowProposalDetails(index)}>Proposal details</Menu.Item>
            <Menu.Item key="3" danger={true} onClick={() => handlesendConntracl(index)}>Send Proposal</Menu.Item>
        </Menu>
    );
    const handlesendConntracl = (index: number) => {
        const selectTalent = connections[index]
        if (selectTalent.paymentStatus === "Completed") {
            localStorage.setItem("proposal", JSON.stringify(connections[index]))
            navigate(clientRoutes.ContractSubmit)
        } else {
            setShowNotification(!showNotification)
        }
    }
    return (
        <>
            {connections.map((connection: ProposalInterface, index: number) => (
                <><div className="w-full mt-5 border rounded-xl shadow-xl h-auto " key={index}>
                    <button className="bg-blue-700 cursor-none w-[5vw] h-[3vh]  rounded-full text-white font-normal font-sans text-xs relative bottom-3 left-5">Top rate</button>
                    <div className="flex justify-between p-4 " >
                        <div className="flex">
                            <div>
                                <Avatar src={IMAGE} className="w-8 h-8" />
                            </div>
                            <div className="ml-4">
                                <p className="text-md font-bold">{connection.talentId.First_name} {connection.talentId.Last_name}</p>
                                <p className="text-sm text-gray-500">{connection.talentId.Profile.Title}</p>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">Total earnings <b>$ok</b> {connection.talentId.Profile.Title}</p>
                                    <div className="flex mt-2">
                                        {connection?.talentId?.Profile?.Skills.slice(0, showAllSkills ? connection.talentId.Profile.Skills.length : MAX_SKILLS_DISPLAY).map((value: string, index: number) => (
                                            <p key={index} className="bg-slate-100 font-sans px-3 rounded-full text-sm border mr-2">
                                                {value}
                                            </p>
                                        ))}
                                        {!showAllSkills && connection.talentId.Profile.Skills.length > MAX_SKILLS_DISPLAY && (
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
                    <div className="ml-30 flex ml-36 mb-3">
                        <div className="flex">
                            <Stack spacing={1}>
                                <Rating name="half-rating-read" size="small" defaultValue={2.5} precision={0.5} />
                            </Stack>
                            <p className="text-gray-500 font-sans font-normal text-sm">4/5 (12 Reviews)</p>
                        </div>
                        <div className="border-r border-solid border-gray-500 h-5 ml-2 mr-2 "></div>
                        <div>
                            <FlagOutlined className='mr-1' />
                            <span className="text-gray-500 font-sans font-normal text-sm">{connection.talentId.City}, {connection.talentId.Country}</span>
                        </div>
                    </div>
                </div>
                </>
            ))}
        </>
    );
}
export default ListConnectedFreelancers;
