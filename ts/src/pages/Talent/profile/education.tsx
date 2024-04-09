/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { formatMongoDate } from "../../../util/timeFormating";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export interface EducationType {
    institution: string,
    degree: string,
    fieldOfStudy: string
    startDate: Date
    endDate: Date
}

const Education: React.FC<{ data: EducationType[], onUpdate: () => void, addState: () => void }> = ({ data, onUpdate, addState }) => {
    const [isOpen, setIsOpen] = useState(false)
    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }
    const deleteEducation = (index: number) => {
        console.log(data)
        data.splice(index, 1)
        console.log(data)
    }
    return (<>
        <div className="rounded-xl h-auto shadow-2xl border bg-white w-[48rem] ">
            <div className="flex justify-between">
                <p className="m-4 font-sans font-medium">Education</p>
                <div className="mr-3 flex gap-2 mt-5">
                    <p className="text-red-500 mb-2 font-semibold  rounded-xl  justify-center  text-sm hover:cursor-pointer border-red-500 border p-2" onClick={addState}>Add education</p>
                </div>
            </div>
            <hr />
            <div className="flex flex-col space-y-2 items-start m-5">
                <>
                    <p className="text-gray-700 text-md font-sans font-medium">
                        {data[0]?.degree} in {data[0]?.fieldOfStudy}
                    </p>
                    <p className="text-gray-700 text-md font-sans font-medium">
                        {data[0]?.institution}
                    </p>
                    <span className="text-gray-700 font-sans font-normal text-xs">{formatMongoDate(data[0]?.startDate)} - {formatMongoDate(data[0]?.endDate)}</span>
                    <p className="text-gray-700 font-sans font-normal text-sm">
                    </p>
                </>
            </div>
            {data.length > 1 && <>
                <p className="text-blue-500 text-center justify-center  text-sm hover:cursor-pointer mb-5" onClick={openModal}>View All</p>
            </>}
        </div>
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
                                    className="text-lg  font-medium leading-6 text-gray-900"
                                >
                                    Educations
                                </Dialog.Title>
                                <div className="mt-5">
                                    {
                                        data.map((education, index: number) => (
                                            <>
                                                <p key={index} className="text-gray-700 text-md font-sans font-medium mt-5">
                                                    {education?.degree} in {education?.fieldOfStudy}
                                                </p><p key={index} className="text-gray-700 text-smF font-sans font-medium">
                                                    {education?.institution}
                                                </p><span key={index} className="text-gray-700 font-sans font-normal text-xs mb-10">{formatMongoDate(education?.startDate)} - {formatMongoDate(education?.endDate)}</span><p className="text-gray-700 font-sans font-normal text-sm">
                                                </p>
                                                <div className="gap-2 flex flex-rol text-xs font-semibold mt-1 text-white">
                                                    <button className="border rounded-xl p-1 px-4 bg-red-500">Edit</button>
                                                    <button className="border rounded-xl p-1 px-4 bg-blue-500" onClick={()=>deleteEducation(index)}>Delete</button>
                                                </div>
                                                <hr className="mt-2 " />
                                            </>
                                        ))
                                    }
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>
    );
};
export default Education;