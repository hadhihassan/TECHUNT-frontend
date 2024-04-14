/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { validationSchema } from '../../../schema/profileBasedSchema';
import { Dialog, Transition } from '@headlessui/react'
import { saveEducation, updateEducation } from '../../../services/talentApiService';
import { AxiosResponse } from 'axios';
import { message } from 'antd';
import type { EducationType } from '../../../pages/Talent/profile/education'

interface EducationFormProps {
    initialValues?: EducationType;
    onUpdate: () => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ initialValues, onUpdate }) => {

    const [isOpen, setIsOpen] = useState<boolean>(true);
    const closeModal: () => void = () => {
        setIsOpen(false);
    };

    const handleSubmit = (values: EducationType) => {
        const apiCall = initialValues ? updateEducation(initialValues._id || "", values) : saveEducation(values);
        apiCall
            .then((res: AxiosResponse) => {
                if (res.data.success) {
                    onUpdate();
                    message.success("Education saved.");
                } else {
                    message.error("While saving education, an error occurred.");
                }
            })
            .catch(() => {
                message.error("While saving education, an error occurred.");
            });
    };

    return (
        <div>
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
                                    <p className="font-semibold text-xl">Let's {initialValues ? 'edit' : 'add'} education</p>
                                    <div className="mt-2">
                                        <Formik
                                            initialValues={initialValues || {
                                                institution: '',
                                                degree: '',
                                                fieldOfStudy: '',
                                                startDate: '',
                                                endDate: '',
                                            }}
                                            validationSchema={validationSchema}
                                            onSubmit={(values: EducationType) => handleSubmit(values)}
                                        >
                                            {() => (
                                                <Form
                                                    className='w-full  text-sm font-sans font-semibold flex flex-col gap-4'
                                                >
                                                    <div>
                                                        <label htmlFor="institution">Institution:</label>
                                                        <Field type="text" id="institution" name="institution" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                        <ErrorMessage name="institution" component="div" className="error text-sm text-red-500" />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="degree">Degree:</label>
                                                        <Field type="text" id="degree" name="degree" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                        <ErrorMessage name="degree" component="div" className="error text-sm text-red-500" />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="fieldOfStudy">Field of Study:</label>
                                                        <Field type="text" id="fieldOfStudy" name="fieldOfStudy" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                        <ErrorMessage name="fieldOfStudy" component="div" className="error text-sm text-red-500" />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="startDate">Start Date:</label>
                                                        <Field type="date" id="startDate" name="startDate" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                        <ErrorMessage name="startDate" component="div" className="error text-sm text-red-500" />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="endDate">End Date:</label>
                                                        <Field type="date" id="endDate" name="endDate" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                        <ErrorMessage name="endDate" component="div" className="error text-sm text-red-500" />
                                                    </div>
                                                    <button type="submit" className='border-2 border-red-500 rounded-xl p-2 mt-2 font-semibold text-sm' >{initialValues ? 'Update' : 'Add'} Education</button>
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
        </div>
    );
};

export default EducationForm;
