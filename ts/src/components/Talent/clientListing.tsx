import React, { useEffect, useState } from 'react';
import { getAllClientForTalent, getAllClientProposalsForTalent } from '../../services/talentApiService';
import { ProposalInterface, UserProfile } from '../../interface/interfaces';
import { AxiosError, AxiosResponse } from 'axios';
import Avatar from 'react-avatar';
import IMAGE from '../../assets/4950287_19874-removebg-preview.png';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { FlagOutlined } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { talent_routes } from '../../routes/pathVariables';
import { createConversation } from '../../services/commonApiService';
const ClientList = () => {
    const navigate = useNavigate()
    const [clients, setClients] = useState<UserProfile[]>([])
    useEffect(() => {
        getAllClientForTalent()
            .then((res: AxiosResponse) => {
                setClients(res.data)
            }).catch((err: AxiosError) => {
                console.log(err)
            })

    }, [])
    const hadnleShowFullDetails = (index: number) => {
        localStorage.setItem("profileData", JSON.stringify(clients[index]))
        navigate(talent_routes.viewClient)
    }
    const goMessage = (index: number) => {
        createConversation(clients[index]._id).then((_res:AxiosResponse)=>{
            navigate("/message")
        })
    }
    return <>
        {clients.map((client: UserProfile, index: number) => (
            <div className="w-full mt-5 border rounded-xl shadow-xl h-auto" key={index}>
                <button className="bg-blue-700 cursor-none w-[5vw] h-[3vh] rounded-full text-white font-normal font-sans text-xs relative bottom-3 left-5">Top rate</button>
                <div className="flex justify-between p-4">
                    <div className="flex">
                        <div>
                            <Avatar src={IMAGE} className="w-8 h-8" />
                        </div>
                        <div className="ml-4">
                            <p className="text-md font-bold">{client?.First_name} {client?.Last_name}</p>
                            <p className="text-sm text-gray-500">{client?.Email}</p>
                            <p className="text-sm text-gray-500">{client?.Number}</p>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">Total Proposal <b>5</b></p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <button className="border mb-3 border-red-500 text-red-500 ml-5 text-xs px-12 py-2 font-sans font-bold rounded-full self-center" onClick={()=>goMessage(index)}>Message</button>
                        <button className="border mb-3 border-red-500 text-red-500 ml-5 text-xs px-10 py-2 font-sans font-bold rounded-full self-center" onClick={() => hadnleShowFullDetails(index)}>View details</button>
                    </div>
                </div>
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
                        <span className="text-gray-500 font-sans font-normal text-sm">{client?.City}, {client?.Country}</span>
                    </div>
                </div>
            </div>
        ))
        }
    </>

}

export default ClientList;