import React, { useState, useEffect } from 'react'
import { clientRoutes } from '../../../routes/pathVariables';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROOTSTORE } from '../../../redux/store';
import type { ProposalInterface } from '../../../interface/interfaces'
import { Drawer } from 'antd';
import toast, { Toaster } from 'react-hot-toast';
import formatRelativeTime from '../../../util/timeFormating';
import { makePayment } from '../../../services/talentApiService';
import useStripePayment from '../../../hooks/usePayement';

export interface Notification {
    recipient_id: string;
    sender_id: string;
    type: string;
    content: string;
    read: boolean;
    metaData?: [];
    timestamp: Date;
    createdAt: Date
}
interface NotificationDrawerProps {
    notification: Notification[];
    open: boolean;
    proposals: ProposalInterface[]
}

const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ notification, open, proposals }) => {
    const { handlePayment, loading, error } = useStripePayment()
    const { role, id } = useSelector((state: ROOTSTORE) => state.signup)
    const navigate = useNavigate()
    const [notifications, setNotifications] = useState<NotificationDrawerProps["notification"]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [proposalId, setproposalId] = useState<null | string>(null)
    useEffect(() => {
        setNotifications(notification);
        setIsOpen(open)
        console.log(notifications, "drawer")
    }, [notification, notifications, open]);

    const onClose = () => {
        setIsOpen(false);
    };

    const handleShowProposal: (index: number) => void = (index) => {
        const proposalData = proposals.find((proposal: ProposalInterface) => proposal._id === notifications[index].metaData)
        localStorage.setItem("proposal", JSON.stringify(proposalData))
        navigate(clientRoutes.viewProposal)
    }
    const handleProposalPayment: (index: number) => void = (index:number) => {
        setproposalId(notification[index].metaData)
        localStorage.setItem("paymentProposalId",JSON.stringify(notification[index].metaData))
        showPaymentComfirmaMessage()
    }
    const StartPayment: () => void = async () => {
        console.log(proposalId)
        await handlePayment(proposalId);
    }

    const showPaymentComfirmaMessage = () => {
        toast.custom((t) => (
            <div
                className={`${t.visible ? 'animate-enter' : 'animate-leave'
                    } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                                Payment required
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                Please note that  the client is accepted your  proposal, a fee of 5000 rupees will be charged.Otherwise, you loss this proposal.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex border-l border-gray-200">
                    <button
                        onClick={() => {

                            toast.dismiss(t.id)
                            StartPayment()
                        }}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Pay
                    </button>
                </div>
            </div>
        ))
    }
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Drawer title="Notifications" open={isOpen} onClose={onClose}>
                <div className="w-[100%] mt-7 h-auto ">
                    {
                        notifications?.map((noti: Notification, index: number) => (
                            <React.Fragment key={index}>
                                {/* <label className='m-1'>Yesterday</label> */}
                                <div className='font-sans border rounded-xl border-red-400 mt-2 h-auto'>
                                    <div className='flex justify-between'>
                                        <p className='font-semibold text-red-500 ml-5'> {noti.type == "proposal" ? `New proposal` : noti.type !== "proposalAccept" ? "Proposal rejected (Payment required)" : "Proposal accepted"}</p>
                                        <p className='text-xs text-gray-400 mr-1'>{formatRelativeTime(noti.createdAt)}</p>
                                    </div>
                                    <span className=' ml-5 font-semibold '>{noti.content}</span><span onClick={() => role === "CLIENT" ? handleShowProposal(index) : handleProposalPayment(index)} className='hover:cursor-pointer ml-1 font-mono text-xs text-red-500'
                                    >{role === "TALENT" ? "Pay" : "Show"}</span>
                                </div>
                            </React.Fragment>
                        ))
                    }
                </div>
            </Drawer>
        </>
    );
}

export default NotificationDrawer;