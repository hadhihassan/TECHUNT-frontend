import { useEffect, useState } from "react";
import { getAllPlans, purchasePlan } from "../../../services/commonApiService";
import { useSelector } from "react-redux";
import { ROOTSTORE } from "../../../redux/store";
import { INITIALSTATE } from "../../../redux/Slice/signupSlice";
import { AxiosError, AxiosResponse } from "axios";
import { message } from "antd";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import useStripePayment from "../../../hooks/usePayement";
import { useSocketContext } from "../../../context/socketContext";

interface PlanInterface {
    name: string,
    description: string,
    amount: string,
    type: string,
    isActive: boolean,
    _id: string
}
const PlanPage = () => {
    const [plan, setPlan] = useState<PlanInterface[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selected, setSelected] = useState<number>(0)
    const { subscriptionPayment } = useStripePayment()
    const useData: INITIALSTATE = useSelector((state: ROOTSTORE) => state.signup)
    useEffect(() => {
        getAllPlans(useData.role)
            .then((res: AxiosResponse) => {
                setPlan(res?.data?.data)
            })

    }, [])

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    const handlePurchase = async () => {
        const data: AxiosResponse | AxiosError = await subscriptionPayment(useData?.role, plan[selected]?._id, plan[selected]?.amount)
        if (data) {
            alert("success")
            purchasePlan(useData?.role, plan[selected]._id)
        }
    }
    return <>
        <div className="">
            <div className="flex flex-col text-center justify-center m-20 gap-5 ">
                <p className="font-serif text-4xl font-semibold text-gray-700">Subscription </p>
                <p className="font-serif text-xl font-semibold text-gray-700">Get started with a TECHUNT Subscription that works for you.</p>
            </div>

            <div className="w-full md:w-2/3 mt-5 grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
                {
                    plan.map((plan: PlanInterface, index: number) => (
                        <div
                            key={index}
                            className="shadow-2xl rounded-xl p-5 font-sans border-t-4 border-green-400 bg-white">

                            <p className="uppercase text-sm font-medium text-gray-500">
                                {plan.name}
                            </p>
                            <p className="mt-4 text-3xl text-gray-700 font-medium">
                                {plan.amount} ₹ <small className="text-xs">({plan.type})</small>
                            </p>
                            <p className="mt-4 font-medium text-gray-700">

                            </p>
                            <p className="mt-4 text-sm text-gray-500">
                                {plan.description}
                            </p>
                            <div className="text-slate-900 mt-5 dark:text-slate-200 font-medium">Includes:</div>
                            <div className="mt-4">

                                <ul className="grid grid-cols-1 gap-4">
                                    <li className="inline-flex items-center text-gray-600">
                                        <svg className="w-4 h-4 mr-2 fill-current text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"></path>
                                        </svg>
                                        {
                                            plan.type === "Weekly" && "7 days only"
                                        }
                                        {
                                            plan.type === "Monthly" && "29 days only"
                                        }
                                        {
                                            plan.type === "Yearly" && "365 days only"
                                        }
                                    </li>
                                    {
                                        useData.role === "TALENT" && <>
                                            <li className="inline-flex items-center text-gray-600">
                                                <svg className="w-4 h-4 mr-2 fill-current text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"></path>
                                                </svg>
                                                Get notified job posting
                                            </li>
                                        </>
                                    }
                                    {
                                        useData.role === "CLIENT" && <>
                                            <li className="inline-flex items-center text-gray-600">
                                                <svg className="w-4 h-4 mr-2 fill-current text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"></path>
                                                </svg>
                                                resume Download
                                            </li>
                                        </>
                                    }
                                    <li className="inline-flex items-center text-gray-600">
                                        <svg className="w-4 h-4 mr-2 fill-current text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"></path>
                                        </svg>
                                        Contract details view
                                    </li>
                                    <li className="inline-flex items-center text-gray-600">
                                        <svg className="w-4 h-4 mr-2 fill-current text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"></path>
                                        </svg>
                                        Message with other users
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-8">
                                <button
                                    onClick={() => {
                                        setSelected(index)
                                        openModal()
                                    }}
                                    className="rounded-xl bg-slate-900 px-3 py-2     w-full text-white">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    ))
                }
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Comfirm
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure to purcase the out premium subscription plan.
                                                Get started with a TECHUNT Subscription that works for you.
                                            </p>
                                        </div>
                                        <div className="mt-4 flex   gap gap-2">
                                            <button
                                                type="button"
                                                className="inline-flex  justify-center  border border-transparent hover:bg-red-400 rounded-xl px-5 py-2 text-sm font-medium  focus:outline-none focus-visible:ring-2  focus-visible:ring-offset-2"
                                                onClick={handlePurchase}
                                            >
                                                Yes
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex  justify-center  border border-transparent hover:bg-red-400 rounded-xl px-5 py-2 text-sm font-medium  focus:outline-none focus-visible:ring-2  focus-visible:ring-offset-2"
                                                onClick={closeModal}
                                            >
                                                No
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>

        </div>
    </>;
}
export default PlanPage;