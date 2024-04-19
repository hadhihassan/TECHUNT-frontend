/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment } from "react";
import type { MilestoneType } from '../../Client/contract/contractInterface'
import { Dialog, Transition } from '@headlessui/react'
import { EditOutlined } from '@ant-design/icons';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { formatMongoDate, } from '../../../util/timeFormating';
import { udpdateMilestone } from "../../../services/clientApiService";


const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    dueDate: Yup.date().required('Due date is required'),
});
export interface MilestoneFormDataType {
    name: string,
    description: string,
    dueDate: string
}
export function EditMilestone({ open, closeModal, milestoneData, onUpdate }: { open: boolean, closeModal: React.Dispatch<React.SetStateAction<boolean>>, milestoneData: MilestoneType | undefined, onUpdate: () => void }) {
    const handleSubmit = (values: MilestoneFormDataType) => {
        udpdateMilestone(milestoneData?._id || "", values)
            .then((res) => {
                console.log(res)
                onUpdate()
            }).catch((err) => {
                console.log(err)
            })
    };
    return (
        <>
            <Transition appear show={open} as={Fragment}>
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
                                    <div className="mt-2">
                                        <div className="flex flex-col items-center justify-center   shadow dark">
                                            <div className="w-full max-w-md rounded  border  shadow-md p-6">
                                                <h2 className="text-2xl font-bold text-gray-400 mb-4">Edit Milestone</h2>
                                                <Formik
                                                    initialValues={{
                                                        name: milestoneData?.name || '',
                                                        description: milestoneData?.description || '',
                                                        dueDate: milestoneData?.dueDate || '',
                                                    }}
                                                    onSubmit={handleSubmit}
                                                    validationSchema={validationSchema}
                                                >
                                                    {({ errors, touched }) => (
                                                        <Form className="flex flex-col">
                                                            <label className="font-sans font-semibold text-sm">Name</label>
                                                            <Field
                                                                name="name"
                                                                placeholder="Name"
                                                                className={`border p-2 mb-4 focus:bg-gray-300 outline-none rounded ${errors.name && touched.name ? 'border-red-500' : ''
                                                                    }`}
                                                            />
                                                            <ErrorMessage name="name" component="div" className="text-red-500" />
                                                            <label className="font-sans font-semibold text-sm">Description</label>
                                                            <Field
                                                                name="description"
                                                                placeholder="Description"
                                                                as="textarea"
                                                                className={`border p-2 mb-4 focus:bg-gray-300 outline-none rounded ${errors.description && touched.description ? 'border-red-500' : ''
                                                                    }`}
                                                            />
                                                            <ErrorMessage name="description" component="div" className="text-red-500" />
                                                            <label className="font-sans font-semibold text-sm">Due date : {formatMongoDate(milestoneData?.dueDate as unknown as Date)}</label>
                                                            <Field
                                                                name="dueDate"
                                                                type="date"
                                                                value={milestoneData?.dueDate}
                                                                className={`border p-2 mb-4 focus:bg-gray-300 outline-none rounded ${errors.dueDate && touched.dueDate ? 'border-red-500' : ''
                                                                    }`}
                                                            />
                                                            <ErrorMessage name="dueDate" component="div" className="text-red-500" />
                                                            <button
                                                                className="font-sans bg-gradient-to-r flex items-center justify-center gap-1 from-indigo-500 to-blue-500 text-white font-bold py-2 px-1 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                                                                type="submit"
                                                            >
                                                                <EditOutlined /> Edit
                                                            </button>
                                                        </Form>
                                                    )}
                                                </Formik>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}