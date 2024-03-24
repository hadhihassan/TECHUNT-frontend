import Avatar from "react-avatar";
import { IconButton } from '@mui/material';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { FlagOutlined } from "@mui/icons-material";
import { useEffect, useState } from 'react';
import { getAllProposalForClient } from '../../../services/clientApiService';
import type { ProposalInterface } from '../../../interface/interfaces';
import { AxiosError, AxiosResponse } from 'axios';
import { ROOTSTORE } from '../../../redux/store';
import { useSelector } from 'react-redux';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { clientRoutes } from "../../../routes/pathVariables";
import { setConversation } from '../../../redux/Slice/conversationsSlice'
import { createConversation } from "../../../services/commonApiService";

const ListAllPropposals = () => {
    const navigate = useNavigate()
    const basicData = useSelector((state: ROOTSTORE) => state.signup)
    const [proposals, setProposals] = useState<ProposalInterface[]>([])
    const [showAllSkills, setShowAllSkills] = useState(false);
    const toggleSkillsDisplay = () => {
        setShowAllSkills(!showAllSkills);
    };
    useEffect(() => {
        getAllProposalForClient(basicData?.id)
            .then((res: AxiosResponse) => {
                console.log(res.data, "this is the proposal for you ")
                setProposals(res.data.data)
            }).catch((err: AxiosError) => {
                console.log(err.message)
            })
    }, [])
    const handleShowProposal = (index: number) => {
        localStorage.setItem("proposal", JSON.stringify(proposals[index]))
        navigate(clientRoutes.viewProposal)
    }
    const handleCreateConverstion = (index: number) => {
        console.log(proposals[index].talentId)
        setConversation({})
        createConversation(proposals[index]?.talentId as unknown as string)
            .then(() => {
                navigate("/message")
            })
    }
    return (<>
        {
            proposals.map((proposla: ProposalInterface, index: number) => (
                <div className="w-full mt-5 border rounded-xl shadow-xl h-auto" key={index} >
                    <button className="bg-blue-700 cursor-none w-[5vw] h-[3vh] rounded-full text-white font-normal font-sans text-xs relative bottom-3 left-5">Top rate</button>
                    <div className="flex justify-between p-2 h-auto" >
                        <div className="flex" >
                            <IconButton size="small">
                                <Avatar src={`http://localhost:3000/images/${proposla?.talentId?.Profile.profile_Dp}`} className="w-8 h-8 border" />
                            </IconButton>
                            <div className="ml-4">
                                {/* <p className="text-md font-bold">{proposla?.talentId?.First_name}{proposla?.talentId?.Last_name}</p> */}
                                <p className="text-sm text-gray-500">{proposla?.title}, {proposla?.jobId?.Title as string || ""}</p>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">Total earnings <b>$0</b> on {proposla?.talentId?.Profile?.Title} </p>
                                    <div className="flex mt-2">
                                        {
                                            proposla?.talentId?.Profile?.Skills.slice(0, showAllSkills ? proposla?.talentId?.Profile?.Skills.length : 3).map((skill: string, index: number) => (
                                                <React.Fragment key={index}>
                                                    <p className="bg-slate-100  font-sans  px-3 rounded-full text-sm border mr-2">
                                                        {skill}
                                                    </p>
                                                </React.Fragment>
                                            ))
                                        }
                                        <span className="text-sm font-semibold text-red-500 ml-2 self-center cursor-pointer" onClick={toggleSkillsDisplay}>{showAllSkills ? "less" : "more"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <button className="border border-red-500 text-red-500 ml-5 font-semibold text-xs px-12 py-1 rounded-full self-center mt-3" onClick={() => handleShowProposal(index)} >   Details </button>
                            <button className="border border-red-500 text-red-500 ml-5 font-semibold text-xs px-12 py-1 rounded-full self-center mt-3" onClick={() => handleCreateConverstion(index)}>Message</button>
                        </div>
                    </div>
                    <div className="ml-30 flex mb-5 ml-36 h-auto">
                        <div className="flex">
                            <Stack spacing={1}>
                                <Rating name="half-rating-read" size="small" defaultValue={2.5} precision={0.5} />
                            </Stack>
                            <p className="text-gray-500 font-sans font-normal text-sm">4/5 (12 Reviews)</p>
                        </div>
                        <div className="border-r border-solid  border-gray-500 h-5 ml-2 mr-2 "></div>
                        <div>
                            <FlagOutlined />
                            <span className="text-gray-500 font-sans font-normal text-sm">{proposla?.talentId?.City}, {proposla?.talentId?.Country}</span>
                        </div>
                    </div>
                </div>
            ))
        }
    </>)
}
export default ListAllPropposals;
