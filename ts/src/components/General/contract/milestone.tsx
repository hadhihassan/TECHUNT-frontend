/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { MilestoneType } from '../../Client/contract/contractInterface'
import { useEffect, useState } from 'react';
import { formatMongoDate, } from '../../../util/timeFormating';
import { useSelector } from 'react-redux';
import { ROOTSTORE } from '../../../redux/store';
import Modal from '../ui/modal';
import { Dialog } from '@headlessui/react';
import { PendingActions } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import type { MenuProps } from 'antd';
import { Dropdown, message, Popconfirm, } from 'antd';
import { updateMilestoneStatus } from '../../../services/talentApiService';
import { AxiosError, AxiosResponse } from 'axios';
import { addWalletAmount, sendMilestoneApproval, udpdateReason } from '../../../services/clientApiService';
import { WorkSubmitForm } from './workSubmitForm';
import { contractStatusUpdate, getContract, getSubmittedWork } from '../../../services/commonApiService';
import useStripePayment from '../../../hooks/usePayement';
import { useParams, useNavigate } from 'react-router-dom';
import { ResheduleSubmitForm } from './resheduleForm';
import ReviewForm from './contractReview';
import { EditOutlined } from '@ant-design/icons';
import { EditMilestone } from './milestoneEditForm';



interface ContractDetailsType {
    _id?: string
    terms: string;
    work: {
        WorkType: string,
        Title: string
    };
    duration: Date[] | null[];
    amount: number;
    notes: string;
    paymentTerms: string;
    talent: { _id: string },
    client: string | { _id: string },
    approval?: boolean,
    status?: string
    completed?: "Pending" | "Progress" | "Completed",
    milestones: MilestoneType[]
    createdAt?: string | Date
    TALENTreview?: string
    CLIENTreview?: string
}


const Milestone = () => {
    const { paymentToTalent, loading } = useStripePayment()
    const [statusKey, setStatusKey] = useState<number | undefined>()
    const [contract, setContract] = useState<ContractDetailsType | null>(null)
    const basicData = useSelector((state: ROOTSTORE) => state.signup)
    const [selectMilestone, setSelected] = useState<number>(0)
    const [reviewOpen, setReviewOpen] = useState<boolean>(false)
    const [showReshedule, setShowReshedule] = useState<boolean>(false)
    const [t, setT] = useState<string>("");
    const [showReason, setShowReason] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState(false)
    const [formOpen, setFormOpen] = useState(false)
    const [showEditMilestone, setEditMilestone] = useState<boolean>(false)
    const closeEditMilStone = () => setEditMilestone(!showEditMilestone);


    const toId = () => {
        let clientId = typeof contract?.client === "object" ? contract?.client._id : contract?.client || "";
        if (basicData.id === clientId) {
            return typeof contract?.talent === "object" ? contract?.talent._id : contract?.talent || "";
        }
        return clientId;
    };

    const { id } = useParams();
    const navigate = useNavigate()
    const fetch = () => {
        getContract(basicData.role, id?.slice(3) || "")
            .then((res: AxiosResponse) => {
                setContract(res.data.data)
            })
    }
    useEffect(() => {
        fetch()
        const completedMilestones: MilestoneType[] = contract?.milestones?.filter(milestone => milestone.completed === "Completed") || [];
        if (completedMilestones.length as number === contract?.milestones?.length) {
            contractStatusUpdate(contract?._id || "", "completed", basicData.role)
            console.log(completedMilestones.length,contract?.milestones?.length)
        }
        setT(toId);

        return () => {
            localStorage.removeItem("payedMilestone")
        }
    }, [reviewOpen])
    const closeRatingModal = () => {
        setReviewOpen(!reviewOpen)
    }
    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)
    // client side for sending the spesific milestone 
    const handleSendApproval = (index: number) => {
        const id: string = contract?.milestones[index]?._id || ""
        sendMilestoneApproval(id, true)
            .then((res: AxiosResponse) => {
                fetch()
                if (res.data.success) {
                    message.success("successfully updated")
                } else {
                    message.error("something went wrong !!.")
                }
            }).catch(() => {
                message.error("something went wrong !.")
            })
    }

    const closeReshduleModal = () => { setShowReshedule(!showReshedule) }
    // for freelancer to submit the work 
    const submitWork = () => {
        fetch()
        setFormOpen(!formOpen)
    }
    // for client can see the progress 
    const showWorkProggress = (index: number) => {
        fetch()
        setSelected(index)
        openModal()
    }
    // for freelancer can update the working progress 
    const updateWorkProggress = (index: number) => {
        fetch()
        openModal()
        setSelected(index)
    }
    const [confirm, setConfirm] = useState<boolean>(false)
    const handleMenuClick = (e: { key: number }) => {
        fetch()
        setConfirm(!confirm)
        setStatusKey(e?.key)
    };
    const payment = async (index: number): Promise<void> => {
        const milestone = contract?.milestones[index];
        localStorage.setItem("payedMilestone", JSON.stringify(milestone));
        try {
            await addWalletAmount(contract?.talent?._id as string || "", milestone?.amount as number, milestone?._id as unknown as boolean);
            paymentToTalent(contract?.talent?._id as string || "", milestone?.amount as number)
                .then((res) => console.log(res)).catch((err) => console.log(err))
        } catch (error) {
            console.error("Payment error:", error);
        }
    };
    const items: MenuProps['items'] = [
        {
            label: 'update to On progress',
            key: '1',
            icon: <EventRepeatIcon />,
            danger: true,
        },
        {
            label: 'Update to completed',
            key: '4',
            icon: <CheckCircleIcon />,
        },
    ];
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    const updateStatus = async () => {
        let status: string = ""
        if (statusKey == 1) {
            status = "Progress"
        } else {
            status = "Completed"
        }
        const id: string = contract?.milestones[selectMilestone]?._id as string
        try {
            const res: AxiosResponse | AxiosError = await updateMilestoneStatus(id, status);
            if (res?.data.success) {
                message.success('successfully milestone status updated.');
            } else {
                message.warning('Failed to update milestone status.');
            }
        } finally {
            setConfirm(!confirm)
            fetch()
        }
    }
    const showWork = () => {
        const workId: string = contract?.milestones[selectMilestone]?.work as string || ""
        getSubmittedWork(workId, basicData.role)
            .then((res: AxiosResponse) => {
                localStorage.setItem("work", JSON.stringify(res.data.data) || "")
                setFormOpen(!formOpen)
            }).catch(() => message.error("Something went wrong !. try again later ."))
        fetch()
    }

    const updateReasonStatus = async (id: string, status: boolean) => {
        udpdateReason(id, basicData.role, status)
            .then(() => {
                fetch()
                message.success("Status updated")
            }).catch(() => {
                message.error("Somthing went wrong ?.")
            })
    }
    const modalElement = (
        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white  p-6 text-left align-middle shadow-xl transition-all">
            <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
            >
                Milestone status
            </Dialog.Title>
            <div className="w-[25rem] mt-5">
                <ol className="relative border-s border-gray-200 dark:border-gray-700">
                    <li className="mb-10 ms-6">
                        <span className="absolute flex items-center justify-center w-6 h-6  rounded-full -start-3 ring-10 ring-white dark:ring-gray-900 dark:bg-blue-900">
                            <PendingActions color='primary' />
                        </span>
                        <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">Pending {contract?.milestones[selectMilestone].completed === "Pending" && <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">Latest</span>}</h3>
                        <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Updated on {formatMongoDate(contract?.milestones[selectMilestone]?.createdAt as unknown as Date || "")}</time>
                        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Your project is currently in the pending stage. </p>
                    </li>
                    {
                        contract?.milestones[selectMilestone].completed !== "Pending" && <>
                            <li className="mb-10 ms-6">
                                <span className="absolute flex items-center justify-center w-6 h-6  rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                    <EventRepeatIcon color="warning" />
                                </span>
                                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">Progress
                                    {contract?.milestones[selectMilestone].completed === "Progress" && <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">Latest</span>}
                                </h3>
                                {/* <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on December 7th, 2021</time> */}
                                <p className="text-base font-normal text-gray-500 dark:text-gray-400">Your project is currently in the on progess stage</p>
                            </li>
                        </>
                    }
                    {
                        contract?.milestones[selectMilestone].completed === "Completed" && <>
                            <li className="ms-6">
                                <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                    <CheckCircleIcon color="success" />
                                </span>
                                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">Completed
                                    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">Latest</span></h3>
                                {/* <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on December 2nd, 2021</time> */}
                                <p className="text-base font-normal text-gray-500 dark:text-gray-400">Your project is currently in completed</p>
                            </li>
                        </>
                    }
                </ol>
            </div>
            <div className="mt-4">
                {
                    basicData.role === "TALENT" && contract?.milestones[selectMilestone].completed !== "Completed" && <>
                        <Dropdown.Button menu={menuProps as unknown as MenuProps} danger >
                            Update
                        </Dropdown.Button>
                    </>
                }
                <Popconfirm
                    open={confirm}
                    title="Note"
                    description="Are you sure to update the progress ?"
                    onConfirm={updateStatus}
                >
                </Popconfirm>
                {
                    contract?.milestones[selectMilestone].work && <>
                        <button
                            onClick={showWork}
                            type="button"
                            className="inline-block px-3.5 py-1 border-2 border-red-500  text-red-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" data-mdb-ripple="true">
                            show work
                        </button>
                    </>
                }
            </div>
        </Dialog.Panel>
    )
    const handleEndContract = () => {
        contractStatusUpdate(contract?._id || "", "cancelled", basicData.role)
            .then((res: AxiosResponse) => {
                if (res.data.success) {
                    message.success("Successfully contract cancelled ");
                    if (contract) {
                        setTimeout(() => {
                            history.back()
                        }, 1000);
                    }
                } else {
                    message.error("Failed to cancel contract: " + res.data.message);
                }
            })
            .catch((error) => {
                console.error("Error while cancelling contract:", error);
                message.error("An error occurred while cancelling the contract.");
            });
    };
    let countOfCompleted: number = 0;
    contract?.milestones?.forEach((milestone: MilestoneType) => {
        if (milestone?.completed === "Completed") {
            countOfCompleted++;
        }
    });

    const handleEditMilestone = (index: number) => {
        setSelected(index)
        setEditMilestone(!showEditMilestone)
    }

    return <>
        <EditMilestone closeModal={closeEditMilStone} open={showEditMilestone} milestoneData={contract?.milestones[selectMilestone]} onUpdate={fetch} />
        <WorkSubmitForm
            open={formOpen}
            closeModal={() => {
                setFormOpen(false)
                localStorage.removeItem("work");
            }} id={contract?.milestones[selectMilestone]?._id as string} />
        <ResheduleSubmitForm open={showReshedule} milestoneId={contract?.milestones[countOfCompleted]?._id as string} workId={contract?._id || ""} closeModal={closeReshduleModal} onUpdate={fetch} />
        <div className="mb-20  font-sans w-[90%] h-auto border bg-white m-auto mt-20 rounded-xl shadow-2xl">
            <div
                onClick={() => {
                    history.back()
                }}
                className="w-full h-auto  border-b-2 ">
                <button className=" m-3 flex justify-center items-center"  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Back
                </button>
            </div>
            <div className="flex justify-between font-sans">
                <div className="h-auto w-[75%] border">
                    {/* s */}
                    <div className="w-full h-auto border ">
                        <div className=" m-2 uppercase tracking-wide text-sm  font-semibold flex "> contract for {contract?.work?.Title as string || ""}<button className="bg-red-100 text-red-500 border-red-100 w-auto h-auto rounded-xl text-center px-2 border ml-2">{contract?.work?.WorkType || ""}</button></div>
                        {
                            contract?.status === "completed" && <>
                                <button className="bg-red-100 text-red-500 border-red-100 w-auto h-auto rounded-xl text-center px-2 border ml-2">
                                    Contract Completed
                                </button>
                            </>
                        }
                        {
                            contract?.status === "cancelled" && <>
                                <button className="bg-red-100 text-red-500 border-red-100 w-auto h-auto rounded-xl text-center px-2 border ml-2">
                                    Contract cancelled
                                </button>
                            </>
                        }
                        <p className="mt-2 m-2  text-slate-500 flex ">Total milestone (<p className="text-red-500 font-semibold font-sans">{contract?.milestones?.length}</p>)</p>
                    </div>
                    {/* for milestone */}
                    <div className="w-full h-auto border-b-2">
                        <div className=" m-2 uppercase tracking-wide text-sm  font-semibold flex ">Milestones</div>
                        <div className="bg-white ">
                            <ol className="m-10 ">
                                {
                                    contract?.milestones?.map((milestone, index: number) => (
                                        <li className={`  border-l-2 ${milestone?.completed === "Pending" ? "border-red-500" : (milestone?.completed === "Progress" ? "border-blue-500" : "border-green-500")}`} key={index}>
                                            <div className="md:flex flex-start ">
                                                <div className="bg-white w-6 h-6 flex items-center justify-center rounded-full -ml-3.5">
                                                    {
                                                        milestone.completed === "Pending" ? <PendingActions color='primary' /> : milestone.completed === "Progress" ? <EventRepeatIcon color="warning" /> : <CheckCircleIcon color="success" />
                                                    }
                                                </div>
                                                <div className="block p-6  shadow-lg bg-gray-100 max-w-md ml-6 mb-10 rounded hover:border-2">
                                                    <div className="flex justify-between mb-4">
                                                        <p className="font-medium text-red-500 hover:text-red-700 focus:text-red-800 duration-300 transition ease-in-out text-sm">{milestone?.name}</p>
                                                        <p className="ml-2 font-medium text-red-500 hover:text-red-700 focus:text-red-800 duration-300 transition ease-in-out text-sm">{formatMongoDate(milestone?.dueDate as unknown as Date)}</p>
                                                        {
                                                            milestone.work && <>
                                                                <span className="bg-blue-100 text-blue-800 text-sm ml-2 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">Submitted</span>
                                                            </>
                                                        }
                                                        {
                                                            countOfCompleted === index && !milestone?.isResheduleMilestone && basicData.role === "TALENT" && <>
                                                                <div>
                                                                    <button className="p-1 ml-2 bg-blue-700 rounded shadow-sm text-white text-xs font-sans  inline-block px-2 py-1  leading-tight" onClick={() => setShowReshedule(!showReshedule)}>Reshedule</button>
                                                                </div>
                                                            </>
                                                        }
                                                        {
                                                            milestone?.isResheduleMilestone && <>
                                                                <div className='ml-1'>
                                                                    <button className="p-1 bg-blue-700 rounded shadow-sm text-white text-xs font-sans  inline-block px-2 py-1  leading-tight" onClick={() => {
                                                                        setShowReason(!showReason)
                                                                        setSelected(index)
                                                                    }}>Reshedule requested</button>
                                                                </div>
                                                            </>
                                                        }
                                                    </div>
                                                    <p className="text-gray-700 mb-6">{milestone?.description}</p>
                                                    <div className="flex gap-1">
                                                        {
                                                            (index == 0 || milestone.approval) ? (
                                                                <>{
                                                                    basicData.role === "TALENT" && !milestone.work && milestone.completed === "Completed" && <>
                                                                        <button
                                                                            onClick={() => {
                                                                                submitWork()
                                                                            }}
                                                                            type="button"
                                                                            className="inline-block px-4 py-1.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out" data-mdb-ripple="true">
                                                                            Submit
                                                                        </button>
                                                                    </>
                                                                }
                                                                    {
                                                                        milestone.work && basicData.role === "CLIENT" && <>
                                                                            <button
                                                                                onClick={() => milestone.payed ? undefined : payment(index)}
                                                                                type="button"
                                                                                className="flex gap-1 px-4 py-1.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out" data-mdb-ripple="true">
                                                                                {milestone.payed ? "Payed" : "Pay"}
                                                                                {
                                                                                    loading && <svg aria-hidden="true" className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                                                    </svg>
                                                                                }
                                                                            </button>
                                                                        </>
                                                                    }

                                                                    <button
                                                                        onClick={() => {
                                                                            if (basicData.role === "TALENT") {
                                                                                showWorkProggress(index)
                                                                            } else {
                                                                                updateWorkProggress(index)
                                                                            }
                                                                        }}
                                                                        type="button"
                                                                        className="inline-block px-3.5 py-1 border-2 border-red-500 text-red-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" data-mdb-ripple="true">
                                                                        {basicData.role === "CLIENT" ? "show details" : milestone?.completed == "Completed" ? "show details" : "Update progress"}
                                                                    </button>
                                                                    {
                                                                        basicData.role === "TALENT" && milestone.payed && <>
                                                                            <button
                                                                                type="button"
                                                                                className="inline-block px-3.5 py-1 border-2 border-red-500 text-red-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" data-mdb-ripple="true">
                                                                                Payment received
                                                                            </button>
                                                                        </>
                                                                    }
                                                                    <Modal isOpen={isOpen} closeModal={closeModal} content={modalElement} />
                                                                </>
                                                            ) : (
                                                                <> {
                                                                    basicData.role === "TALENT" && <>
                                                                        <label
                                                                            className="inline-block px-3.5 py-1 border-2 border-red-500 text-red-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" data-mdb-ripple="true">
                                                                            {basicData.role === "TALENT" && "Milestone approval not sent"}
                                                                        </label>
                                                                    </>
                                                                }
                                                                </>
                                                            )
                                                        }

                                                        {
                                                            basicData.role === "CLIENT" && index !== 0 && !milestone.approval && <>
                                                                <Popconfirm
                                                                    title="Send milestone approval"
                                                                    description="Are you sure to send a approval"
                                                                    onConfirm={() => handleSendApproval(index)}
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        className="inline-block px-3.5 py-1 border-2 border-red-500 text-red-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" data-mdb-ripple="true">
                                                                        Send approval
                                                                    </button>
                                                                </Popconfirm>
                                                            </>
                                                        }
                                                        {
                                                            basicData.role === "CLIENT" && countOfCompleted === index && <>
                                                                <button
                                                                    onClick={() => handleEditMilestone(index)}
                                                                    className='bg-blue-500 text-white py-1 px-3 flex items-center justify-center shadow-border rounded shadow-2xl '><EditOutlined /></button>
                                                            </>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ol>
                        </div>
                    </div>
                </div>
                {/* right side bar*/}
                <div className="h-[100vh] w-[25%]  font-sans border">
                    <div className="container mt-4 flex  flex-col ">
                        {
                            basicData.role === "CLIENT" && contract?.milestones[selectMilestone].completed !== "Completed" && <button
                                onClick={handleEndContract}
                                className=" bg-red-500 font-sans text-white rounded-xl py-1">End contract </button>
                        }
                        <button className=" mt-2 border font-sans  border-black font-semibold rounded-xl py-1" onClick={() => navigate("/message")}>Message </button>
                        {
                            basicData.role === "CLIENT" ? (
                                contract?.CLIENTreview ? (
                                    <div className="mt-3 bg-gray-300 p-3 rounded-xl text-xs font-semibold border-2 flex flex-col gap-2 items-start">
                                        <p>Thank you for your review rating?</p>
                                    </div>
                                ) : (
                                    contract?.status === "completed" && (
                                        <>
                                            <div className="mt-3 bg-gray-300 p-3 rounded-xl text-xs font-semibold border-2 flex flex-col gap-2 items-start">
                                                <p>Thank you for your recent interaction! Would you like to share your experience by leaving a review rating?</p>
                                            </div>
                                            <button className="bg-red-500 px-5 py-1 rounded-xl text-white" onClick={() => closeRatingModal()}>Rate</button>
                                        </>
                                    )
                                )
                            ) : (
                                contract?.TALENTreview ? (
                                    <div className="mt-3 bg-gray-300 p-3 rounded-xl text-xs font-semibold border-2 flex flex-col gap-2 items-start">
                                        <p>Thank you for your review rating?</p>
                                    </div>
                                ) : (
                                    contract?.status === "completed" && (
                                        <>
                                            <div className="mt-3 bg-gray-300 p-3 rounded-xl text-xs font-semibold border-2 flex flex-col gap-2 items-start">
                                                <p>Thank you for your recent interaction! Would you like to share your experience by leaving a review rating?</p>
                                            </div>
                                            <button className="bg-red-500 px-5 py-1 rounded-xl text-white" onClick={() => closeRatingModal()}>Rate</button>
                                        </>
                                    )
                                )
                            )
                        }
                        <div>
                            {
                                showReason && (
                                    <>
                                        <p className='text-red-500 font-sans font-semibold mt-2'>Request</p>
                                        <div className="mt-3 bg-gray-300 p-3 w-auto rounded text-xs font-semibold border-2 flex flex-col gap-2 items-start">
                                            <p className="text-balance break-all ">Reason:    {contract?.milestones[selectMilestone]?.resheduleReason?.reason}</p>
                                            <p>Requested date number of days: { contract?.milestones[selectMilestone]?.resheduleReason?.newDeadline}</p>
                                            {
                                                basicData.role === "TALENT" ? (
                                                    <p className="border p-2 rounded bg-red-500 text-white">
                                                        {contract?.milestones[selectMilestone]?.resheduleReason?.accept ? "Accepted" : "Rejected"}
                                                    </p>
                                                ) : (
                                                    contract?.milestones[selectMilestone]?.resheduleReason?.accept ? (
                                                        <p className="border p-2 rounded bg-red-500 text-white">
                                                            Accepted
                                                        </p>
                                                    ) : (
                                                        <div className="flex gap-2">
                                                            <p className="border p-2 rounded bg-red-500 text-white" onClick={() => updateReasonStatus(contract?.milestones[selectMilestone]?.resheduleReason?._id as string || "", true)}>
                                                                Accept
                                                            </p>
                                                            <p className="border p-2 rounded bg-blue-700 text-white" onClick={() => updateReasonStatus(contract?.milestones[selectMilestone]?.resheduleReason?._id as string || "", false)}>
                                                                Reject
                                                            </p>
                                                        </div>
                                                    )
                                                )
                                            }
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
        <ReviewForm closeModal={closeRatingModal} openReview={reviewOpen} workId={id?.slice(3)} to={t} onUpdate={fetch} />
    </>;
}
export default Milestone;
