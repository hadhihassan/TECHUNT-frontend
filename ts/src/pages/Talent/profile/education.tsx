/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { formatMongoDate } from "../../../util/timeFormating";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { deleteEducation } from "../../../services/talentApiService";
import { message } from "antd";
import { AxiosResponse } from "axios";
import EducationForm from "../../../components/General/profile/profileEducations";

export interface EducationType {
    _id?: string
    institution: string,
    degree: string,
    fieldOfStudy: string
    startDate: Date | string
    endDate: Date | string
}
const Education: React.FC<{ data: EducationType[], onUpdate: () => void, addState: () => void }> = ({ data, onUpdate, addState }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [editData, setEditData] = useState<EducationType | null>(null)
    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }
    const handleDeleteEducation = (index: number) => {
        deleteEducation(data[index]._id || "")
            .then((res: AxiosResponse) => {
                if (res.data.success) {
                    message.success("Education deleted successfully.");
                    onUpdate()
                } else {
                    message.error("Something went wrong! Please try again.");
                }
            })
            .catch(() => {
                message.error("Something went wrong! Please try again.");
            });
    };
    const handleEditEducation = (index: number) => {
        setEditData(data[index])
        setOpenEdit(!openEdit)
    }
    return (<>
        <div className="rounded-xl h-auto shadow-2xl border bg-white w-[48rem] ">
            <div className="flex justify-between">
                <p className="m-4 font-sans font-medium flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                    </svg>
                    Education</p>
                <div className="mr-2 mt-3">
                    <button className="text-red-500 p-2  font-semibold  rounded-xl  justify-center  text-sm  border-red-500 border" onClick={addState}>Add education</button>
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
                    <span className="text-gray-700 font-sans font-normal text-xs">{formatMongoDate(data[0]?.startDate as Date)} - {formatMongoDate(data[0]?.endDate as Date)}</span>
                    <p className="text-gray-700 font-sans font-normal text-sm">
                    </p>
                </>
            </div>
            <p className="text-blue-500 text-center justify-center  text-sm hover:cursor-pointer mb-5" onClick={openModal}>{data.length > 2 ? "View all" : "View"}</p>
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
                                                <div className="flex items-center gap-2 mt-5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                                                    </svg>
                                                    <p key={index} className="text-gray-700 text-sm font-sans font-medium">
                                                        {education?.degree} in {education?.fieldOfStudy}
                                                    </p>
                                                </div>
                                                <p key={index} className="text-gray-700 text-sm font-sans font-medium">
                                                    {education?.institution}
                                                </p><span key={index} className="text-gray-700 font-sans font-normal text-xs mb-10">{formatMongoDate(education?.startDate as Date)} - {formatMongoDate(education?.endDate as Date)}</span><p className="text-gray-700 font-sans font-normal text-sm">
                                                </p>
                                                <div className="gap-2 flex flex-rol text-xs font-semibold mt-1 text-white">
                                                    <button className="border rounded-xl p-1 px-4 bg-red-500" onClick={() => handleEditEducation(index)}>Edit</button>
                                                    <button className="border rounded-xl p-1 px-4 bg-blue-500" onClick={() => { handleDeleteEducation(index) }}>Delete</button>
                                                </div>
                                                <hr className="mt-4 " />
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
        {
            openEdit && <EducationForm onUpdate={onUpdate} initialValues={editData || undefined} />
        }
    </>
    );
};
export default Education;