import React, { useEffect, useState } from "react"
import Avatar from "react-avatar";
import image from '../../assets/istockphoto-1283536918-1024x1024.jpg'
import { updateproposalAsAccept, updateproposalAsDecline } from "../../services/clientApiService";
import { message } from 'antd';
import useSocket from "../../hooks/useSocket";
import { BASE_URL } from "../../config/axios";
import { Socket } from "socket.io-client";
import { AxiosError, AxiosResponse } from "axios";

const ProposalClientView = () => {
    const socket: Socket = useSocket(BASE_URL)
    const [proposalData, setProposalData] = useState<object[]>([])
    useEffect(() => {
        const ProposalData = JSON.parse(localStorage.getItem("proposal"))
        console.log(ProposalData,"view proposal")
        setProposalData(ProposalData)
    }, [])
    const handleAccepProposal: () => void = () => {
        lodder()
        updateproposalAsAccept(proposalData?._id)
            .then((_res:AxiosResponse) => {
                successMesseg()
                socket.emit("sendNotification", {
                    recipient_id: proposalData.talentId._id,
                    sender_id: proposalData.Client_id,
                    content: "Proposal accepted",
                    type: "proposalAccept",
                    metaData: proposalData?.jobId?.Title
                })
            }).catch((err:AxiosError) => {
                errorMesseg()
                console.log("this error from update propsal", err)
            })
    }
    const handleDeclineProposal: () => void = () => {
        lodder()
        updateproposalAsDecline(proposalData?._id)
            .then((res) => {
                successMesseg()
                console.log("this RESPONSE  from update propsal", res)
            }).catch((err) => {
                errorMesseg()
                console.log("this error from update propsal", err)
            })
    }
    const [messageApi, contextHolder] = message.useMessage();
    const lodder = () => {
        messageApi
            .open({
                type: 'loading',
                content: 'Action in progress..',
                duration: 1.5,
            })
    };
    const successMesseg = () => message.success('updated success', 4.5)
    const errorMesseg = () => message.info('white updating proposal status failed ', 4.5)
    return (
        <>
            {contextHolder}
            <div className="container mt-8 h-auto w-[65%]  font-sans">
                <div className="flex justify-between  w-full">
                    <div className="flex hover:text-red-500" onClick={() => {
                        localStorage.removeItem("proposal")
                        history.back()
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-3 -mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <button className="ml-2 font-sans font-semibold">Back</button>
                    </div>
                    <div className="mt-1">
                        <button className="font-semibold bg-red-500 text-white text-center font-sans px-5 py-1 rounded-full" onClick={handleAccepProposal}>Accept</button>
                        <button className="border font-semibold border-black ml-2 mr-2 text-center font-sans px-5 py-1 rounded-full" onClick={handleDeclineProposal}>Decline </button>
                    </div>
                </div>
                <div className="border flex justify-start w-full shadow-md   rounded-xl mt-8  h-[20vh]">
                    <div className=" m-5 h-auto w-[100px] border">
                        <Avatar src={image} />
                    </div>
                    <div className="  m-4 h-auto ">
                        <p className="font-semibold text-xl">{proposalData?.talentId?.First_name} {proposalData?.talentId?.Last_name}</p>
                        <p className="text-gray-600 text-sm mt-1">{proposalData?.talentId?.Profile?.Title}</p>
                        <p className="text-gray-500 text-xs mt-1">{proposalData?.talentId?.City}, {proposalData?.talentId?.Country}</p>
                        <p className="text-gray-600 text-sm mt-1">Total earnings- 0k USD</p>
                    </div>
                </div>
                <div className="w-full shadow-md  rounded-xl mt-8  h-auto border mb-5">
                    <div className=" w-auto h-auto m-5">
                        <div className="border-b-2 border-gray-200">
                            <p className="font-semibold text-sm pt-5">Job Title</p>
                            <p className="pt-3 text-sm font-bold mb-5">Looking for a{proposalData?.jobId?.Title}</p>
                        </div>
                        <div className="border-b-2 border-gray-200">
                            <p className="font-semibold text-sm pt-5">Cover letter</p>
                            <p className="pt-3 text-sm font-normal text-gray-600 mb-5">{proposalData?.coverLetter}</p>
                        </div>
                        <div className="border-b-2 border-gray-200">
                            <p className="font-semibold text-sm pt-5">Additional Informations</p>
                            <p className="pt-3 text-sm font-normal text-gray-600 mb-5">{proposalData?.additionalInfo}</p>
                        </div>
                        <div className="border-b-2 border-gray-200">
                            <p className="font-semibold text-sm pt-5">Availability</p>
                            <p className="pt-3 text-sm font-normal text-gray-600 mb-5">{proposalData?.availability}</p>
                        </div>
                        <div className="border-b-2 border-gray-200">
                            <p className="font-semibold text-sm pt-5">Additional Rate</p>
                            <p className="pt-3 text-sm font-normal text-gray-600 mb-5">${proposalData?.rate}</p>
                        </div>
                        <div className="mb-2    border-gray-200">
                            <p className="font-semibold text-sm pt-5">Attachments</p>
                            <p className="pt-3 text-sm font-normal text-blue-600 underline mb-5 hover:cursor-pointer">Show file</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProposalClientView; 