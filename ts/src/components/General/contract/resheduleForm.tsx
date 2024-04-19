/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useEffect, useState, Fragment } from "react";
import { reSheduleWork } from "../../../services/talentApiService";
import { message } from "antd";
import { Dialog, Transition } from '@headlessui/react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FormikHelpers } from 'formik';


export interface ReasonType {
    newDeadline: string;
    reason: string;
}

export function ResheduleSubmitForm({ open, closeModal,  milestoneId, workId, onUpdate }: { open: boolean, closeModal: () => void,  milestoneId: string, workId: string, onUpdate:()=> void }) {

    const validationSchema = Yup.object().shape({
        newDeadline: Yup.number()
            .typeError('Next deadline must be a number')
            .required('next deadline is required .')
            .min(1, "Next deadline is minimum 1 day data")
            .max(30, "Next deadline is maximum 30 day data"),
        reason: Yup.string()
            .trim()
            .required('Reason is required')
            .max(500, "Reason is maximum be 500 letters ."),
    });

    const handleSubmit = (values: ReasonType, { setSubmitting }: FormikHelpers<ReasonType>) => {
        setSubmitting(false);
        const isMilestone: boolean = true
        reSheduleWork(milestoneId, values, workId, isMilestone)
            .then((res) => {
                if (res && res.data.success) {
                    message.success("ReShedule requested .")
                    onUpdate()
                }
            }).catch(() => {
                message.error("Something went wrong !")
            })
    };

    return (
        <>
            {
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
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Reshedule Work
                                        </Dialog.Title>
                                        <div className="p-2 mt-5">
                                            <Formik
                                                initialValues={{
                                                    newDeadline: '',
                                                    reason: '',
                                                }}
                                                validationSchema={validationSchema}
                                                onSubmit={handleSubmit}
                                            >
                                                {({ isSubmitting }) => (
                                                    <Form>
                                                        <div className="flex flex-col gap-2">
                                                            <label htmlFor="newDeadline" className="text-gray-600 font-sans font-semibold">New Deadline</label>
                                                            <Field className="border rounded-xl p-2 outline-none " type="string" id="newDeadline" name="newDeadline" />
                                                            <ErrorMessage name="newDeadline" component="div" className="text-xs text-red-700 font-semibold" />
                                                        </div>

                                                        <div className="flex flex-col gap-2">
                                                            <label htmlFor="reason" className="text-gray-600 font-sans font-semibold">Reason</label>
                                                            <Field className="border rounded-xl p-2 outline-none " as="textarea" id="reason" name="reason" />
                                                            <ErrorMessage name="reason" component="div" className="error text-xs text-red-700 font-semibold" />
                                                        </div>

                                                        <button type="submit" className="bg-red-500 border shadow-xl rounded-xl px-4 py-1 font-sans text-xs text-white mt-4" disabled={isSubmitting}>
                                                            Submit
                                                        </button>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

            }
        </>
    );
}