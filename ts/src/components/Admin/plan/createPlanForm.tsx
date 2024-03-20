import { Dialog, Transition } from '@headlessui/react'
import React, { ChangeEvent, Fragment, useState } from 'react'
import { createNewPlan } from '../../../services/adminApiService'
import {  AxiosResponse } from 'axios'
import { message } from 'antd'

interface FormProps {
    isOpen: boolean,
    closeModal: () => void
}
export interface PlanInterface {
    name: string,
    description: string,
    amount: string,
    type: string,
    _id?: string
}
const CreatePlanForm: React.FC<FormProps> = ({ isOpen, closeModal }) => {
    const [planData, setPlanData] = useState<PlanInterface>({
        name: "",
        description: "",
        type: "",
        amount: "",
    })
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPlanData({
            ...planData,
            [name]: value
        });
    };
    const handleSubmitForm = (e: React.FormEvent) => {
        e.preventDefault()
        createNewPlan(planData)
            .then((res: AxiosResponse) => {
                if (res?.data?.success) {
                    message.success("New plan succssfully created .")
                }
                closeModal()
            }).catch(() => message.warning("Error occurs While creating plan !."))
    }
    return <>
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog className="relative z-10" onClose={closeModal}>
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
                                <div className="mt-2">
                                    <form
                                        onSubmit={handleSubmitForm}>
                                        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                                            <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0">
                                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                                    <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                                        CREATE NEW PLAN
                                                    </p><div>
                                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                                            Name
                                                        </label>
                                                        <input
                                                            value={planData.name}
                                                            name='name'
                                                            onChange={onChange}
                                                            placeholder="JohnDoe"
                                                            className="outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                                                            type="text" />
                                                    </div>
                                                    <div>
                                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                                            Descirption
                                                        </label>
                                                        <textarea
                                                            value={planData.description}
                                                            onChange={onChange}
                                                            className="bg-gray-50 border border-gray-300 outline-none text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                                                            placeholder="wrie here"
                                                            name='description' />
                                                    </div>
                                                    <div>
                                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                                            Amount
                                                        </label>
                                                        <input
                                                            value={planData.amount}
                                                            onChange={onChange}
                                                            name="amount"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 outline-none sm:text-sm rounded-lg block w-full p-2.5"
                                                            placeholder="10000"
                                                            id="confirmPassword"
                                                            type="number" />
                                                    </div>
                                                    <div>
                                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                                            Type
                                                        </label>
                                                        <select
                                                            name="type"
                                                            onChange={onChange}
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 outline-none sm:text-sm rounded-lg block w-full p-2.5">
                                                            <option value="Weekly">Weekly</option>
                                                            <option value="Mothly">Monthly</option>
                                                            <option value="Yearly">Yearly</option>
                                                        </select>
                                                    </div>
                                                    <button
                                                        className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white" type="submit">
                                                        Create plan
                                                    </button>
                                                </div>
                                            </div>
                                        </div></form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>
}
export default CreatePlanForm;