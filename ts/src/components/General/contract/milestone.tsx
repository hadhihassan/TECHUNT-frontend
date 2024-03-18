import type { ContractDetailsType, MilestoneType } from '../../Client/contract/contractInterface'
import { useEffect, useState } from 'react';
import { formatMongoDate, } from '../../../util/timeFormating';
import { useSelector } from 'react-redux';
import { ROOTSTORE } from '../../../redux/store';
import { INITIALSTATE } from '../../../redux/Slice/signupSlice';
import Modal from '../modal';
import { Dialog } from '@headlessui/react';
import { PendingActions } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import type { MenuProps } from 'antd';
import { Dropdown, message, Popconfirm, } from 'antd';
import { updateMilestoneStatus } from '../../../services/talentApiService';
import { AxiosError, AxiosResponse } from 'axios';
import { addWalletAmount, sendMilestoneApproval } from '../../../services/clientApiService';
import { WorkSubmitForm } from './workSubmitForm';
import { contractStatusUpdate, getSubmittedWork } from '../../../services/commonApiService';
import useStripePayment from '../../../hooks/usePayement';
import { useParams } from 'react-router';




const Milestone = () => {
    const { success } = useParams<Readonly<Params<string>>>()
    const { paymentToTalent, loading, error } = useStripePayment()
    const [statusKey, setStausKey] = useState()
    const [contract, setContract] = useState<ContractDetailsType | null>(null)
    const role: INITIALSTATE["role"] = useSelector((state: ROOTSTORE) => state.signup.role)
    const [selectMilestone, setSelected] = useState<number>(0)
    useEffect(() => {
        const contractData: ContractDetailsType[] = JSON.parse(localStorage.getItem("contractDetails") || "")
        if (contractData !== "") {
            setContract(contractData)
        }
        if (success === "true") {
            const payedMilestoneString = localStorage.getItem('payedMilestone');
            const payedMilestone = payedMilestoneString ? JSON.parse(payedMilestoneString) : "";
            addWalletAmount(contractData?.talent?._id, payedMilestone?.amount, payedMilestone?._id)
                .then((res: AxiosResponse) => {
                    console.log(res)
                }).catch((err) => {
                    console.log(err)
                })
        }


    }, [contract])
    const [isOpen, setIsOpen] = useState(false)
    const [formOpen, setFormOpen] = useState(false)
    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)


    // client side for sending the spesific milestone 
    const handleSendApproval = (index: number) => {
        const id: string = contract?.milestones[index]?._id
        sendMilestoneApproval(id, true)
            .then((res: AxiosResponse) => {
                if (res.data.success) {
                    message.success("successfully updated")
                } else {
                    message.error("something went wrong !!.")
                }
            }).catch((_err: AxiosError) => {
                console.log(_err)
                message.error("something went wrong !.")
            })
    }
    // for freelancer to submit the work 
    const submitWork = () => {
        setFormOpen(!formOpen)
    }
    // for client can send a request to resubmit the work
    // const requestToResubmit = (inex: number) => {

    // }
    // for client can see the progress 
    const showWorkProggress = (index: number) => {
        setSelected(index)
        openModal()
    }
    // for freelancer can update the working progress 
    const updateWorkProggress = (index: number) => {
        openModal()
        setSelected(index)
    }
    const [confirm, setConfirm] = useState<boolean>(false)
    const handleMenuClick: MenuProps['onClick'] = (e: unknown) => {
        setConfirm(!confirm)
        setStausKey(e?.key)
    };
    const payment = async (index: number): Promise<void>  => {
        const milestone: MilestoneType | undefined = contract?.milestones[index]
        localStorage.setItem("payedMilestone", JSON.stringify(contract?.milestones[index]))
        await paymentToTalent(contract?.talent?._id, milestone?.amount)
        const completedMilestones:MilestoneType[] = contract?.milestones.filter((milestone) => milestone.completed === "Completed") || []
        if (contract && completedMilestones?.length === contract?.milestones) {
            contractStatusUpdate(contractData?._id, "completed", role)
        }
    }
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
            danger: true,
            // disabled: true,
        },
    ];
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };
    const updateStatus = async (key: number) => {
        let status: string = ""
        if (statusKey == 1) {
            status = "Progress"
        } else {
            status = "Completed"
        }
        const id: string = contract?.milestones[selectMilestone]?._id
        try {
            const res: AxiosResponse | AxiosError = await updateMilestoneStatus(id, status);
            if (res?.data.success) {
                message.success('successfully miles status updated.');
            } else {
                message.warning('Failed to update milestone status.');
            }
        } catch (err) {
            console.log(err);
        }
        setConfirm(!confirm)
    }
    const showWork = () => {
        const workId = contract?.milestones[selectMilestone]?.work
        getSubmittedWork(workId, role)
            .then((res: AxiosResponse) => {
                localStorage.setItem("work", JSON.stringify(res.data.data) || "")
                setFormOpen(!formOpen)
            }).catch(() => message.error("Something went wrong !. try again later ."))
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
                        <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Updated on {formatMongoDate(contract?.milestones[selectMilestone]?.createdAt)}</time>
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
                                <p className="text-base font-normal text-gray-500 dark:text-gray-400">All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.</p>
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
                                <p className="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements built on top of Tailwind CSS.</p>
                            </li>
                        </>
                    }

                </ol>
            </div>
            <div className="mt-4">
                {
                    role === "TALENT" && contract?.milestones[selectMilestone].completed !== "Completed" && <>
                        <Dropdown.Button menu={menuProps} danger>
                            Update
                        </Dropdown.Button>
                    </>
                }
                <Popconfirm
                    open={confirm}
                    title="Title"
                    description="Open Popconfirm with Promise"
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
        contractStatusUpdate(contract?._id, "cancelled", role)
            .then((res: AxiosResponse) => {
                if (res.data.success) {
                    message.success("Successfully contract cancelled ");
                    if (contract) {
                        const newUpdatedContract = { ...contract, completed: "cancelled" };
                        setContract(newUpdatedContract);
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
    
    return <>
        {/* <div className="bg-blue-600 absolute -z-10 w-full h-[50vh] " >
        </div> */}
        <WorkSubmitForm
            setContract={setContract}
            open={formOpen}
            closeModal={() => {
                setFormOpen()
                localStorage.removeItem("work");
            }} id={contract?.milestones[selectMilestone]?._id} />
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
                        <div className=" m-2 uppercase tracking-wide text-sm  font-semibold flex "> contract for {contract?.work?.Title}<button className="bg-red-100 text-red-500 border-red-100 w-auto h-auto rounded-xl text-center px-2 border ml-2">{contract?.work?.WorkType}</button></div>
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
                        <div className="bg-white">
                            <ol className="m-10 ">
                                {
                                    contract?.milestones?.map((milestone, index: number) => (
                                        <li className={`border-l-2 ${milestone?.completed === "Pending" ? "border-red-500" : (milestone?.completed === "Progress" ? "border-blue-500" : "border-green-500")}`} key={index}>
                                            <div className="md:flex flex-start">
                                                <div className={`${milestone?.completed === "Pending" ? "bg-red-500" : (milestone?.completed === "Progress" ? "bg-blue-500" : "bg-green-500")} w-6 h-6 flex items-center justify-center rounded-full -ml-3.5`}>
                                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" className=" text-white  w-3 h-3" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                        <path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
                                                    </svg>
                                                </div>

                                                <div className="block p-6 rounded-lg shadow-lg bg-gray-100 max-w-md ml-6 mb-10">

                                                    <div className="flex justify-between mb-4">

                                                        <p className="font-medium text-red-500 hover:text-red-700 focus:text-red-800 duration-300 transition ease-in-out text-sm">{milestone?.name}</p>

                                                        <p className="font-medium text-red-500 hover:text-red-700 focus:text-red-800 duration-300 transition ease-in-out text-sm">{formatMongoDate(milestone?.dueDate)}</p>
                                                        {
                                                            milestone.work && <>
                                                                <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">Submitted</span>
                                                            </>
                                                        }
                                                    </div>
                                                    <p className="text-gray-700 mb-6">{milestone?.description}</p>
                                                    {
                                                        (index == 0 || milestone.approval) ? (
                                                            <>{
                                                                role === "TALENT" && !milestone.work && milestone.completed === "Completed" && <>
                                                                    <button
                                                                        onClick={() => {
                                                                            submitWork(index)
                                                                        }}
                                                                        type="button"
                                                                        className="inline-block px-4 py-1.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out" data-mdb-ripple="true">
                                                                        Submit
                                                                    </button>
                                                                </>
                                                            }
                                                                {
                                                                    milestone.work && role === "CLIENT" && <>
                                                                        <button
                                                                            onClick={() => milestone.payed ? undefined : payment(index)}
                                                                            type="button"
                                                                            className="inline-block px-4 py-1.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out" data-mdb-ripple="true">
                                                                            {milestone.payed ? "Payed" : "Pay"}
                                                                        </button>
                                                                    </>
                                                                }
                                                                <button
                                                                    onClick={() => {
                                                                        if (role === "TALENT") {
                                                                            showWorkProggress(index)
                                                                        } else {
                                                                            updateWorkProggress(index)
                                                                        }
                                                                    }}
                                                                    type="button"
                                                                    className="inline-block px-3.5 py-1 border-2 border-red-500 text-red-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" data-mdb-ripple="true">
                                                                    {role === "CLIENT" ? "show details" : milestone?.completed == "Completed" ? "show details" : "Update progress"}
                                                                </button>
                                                                {
                                                                    role === "TALENT" && milestone.payed && <>
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
                                                                role === "TALENT" && <>
                                                                    <label
                                                                        className="inline-block px-3.5 py-1 border-2 border-red-500 text-red-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" data-mdb-ripple="true">
                                                                        {role === "TALENT" && "Milestone approval not sent"}
                                                                    </label>
                                                                </>
                                                            }
                                                            </>
                                                        )
                                                    }
                                                    {
                                                        role === "CLIENT" && index !== 0 && !milestone.approval && <>
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
                            role ==="CLIENT" && <button
                                onClick={handleEndContract}
                                className=" bg-red-500 font-sans text-white rounded-xl py-1">End contract </button>
                        }
                        <button className=" mt-2 border font-sans  border-black font-semibold rounded-xl py-1">Message </button>
                    </div>
                    {/* <div className="container mt-4 flex  flex-col ">
                        <p className="flex text-xs m-1 text-black font-sans ">Details for this work : <p className="ml-1 hover:underline  text-red-500 font-bold font-sans ">click me</p> </p>
                        <p className="flex text-xs m-1 text-black font-sans ">Details for contract : <p className="ml-1  hover:underline text-red-500 font-bold font-sans ">click me</p> </p>
                    </div>
                    <div className="container mt-4 flex  flex-col ">
                        <p className="text-xs m-1 text-black font-sans ">Next milestone due date : 01/02/2023 </p>
                        <p className="text-xs m-1 text-black font-sans ">Next milestone amount : 30000 </p>
                    </div> */}
                </div>
            </div>
        </div>
    </>;
}
export default Milestone;