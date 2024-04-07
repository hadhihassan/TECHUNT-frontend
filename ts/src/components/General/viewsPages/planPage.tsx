import { useEffect, useState } from "react";
import { getAllPlans, purchasePlan } from "../../../services/commonApiService";
import { useSelector } from "react-redux";
import { ROOTSTORE } from "../../../redux/store";
import { INITIALSTATE } from "../../../redux/Slice/signupSlice";
import { AxiosResponse } from "axios";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import useStripePayment from "../../../hooks/usePayement";

interface PlanInterface {
    name: string,
    description: string,
    amount: number,
    type: string,
    isActive: boolean,
    _id: string
}
const PlanPage = () => {
    const [plan, setPlan] = useState<PlanInterface[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selected, setSelected] = useState<number>(0)
    const { subscriptionPayment, loading } = useStripePayment()
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
        await purchasePlan(useData?.role, plan[selected]._id)
        await subscriptionPayment(useData?.role, plan[selected]?._id, plan[selected]?.amount);
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
                                                className="inline-flex gap-2  justify-center  items-center border border-transparent hover:bg-red-400 rounded-xl px-5 py-2 text-sm font-medium  focus:outline-none focus-visible:ring-2  focus-visible:ring-offset-2"
                                                onClick={handlePurchase}
                                            >
                                                Yes
                                                {
                                                    loading && <>
                                                        <svg aria-hidden="true" className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                        </svg>
                                                    </>
                                                }
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