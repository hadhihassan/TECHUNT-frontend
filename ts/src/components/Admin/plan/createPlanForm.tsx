/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { createNewPlan } from '../../../services/adminApiService'
import { message } from 'antd'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const PlanSchema = Yup.object().shape({
    name: Yup.string().transform((_value, originalValue) => originalValue.trim()).required('Name is required'),
    description: Yup.string().transform((_value, originalValue) => originalValue.trim()).required('Description is required'),
    amount: Yup.number().required('Amount is required').positive('Amount must be positive'),
    type: Yup.string().transform((_value, originalValue) => originalValue.trim()).required('Type is required'),
});

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
    const handleSubmitForm = (values: PlanInterface, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        console.log(values)
        createNewPlan(values)
            .then((res) => {
                if (res?.data?.success) {
                    message.success("New plan successfully created.");
                }
                closeModal();
            }).catch(() => message.warning("Error occurs while creating plan."))
            .finally(() => setSubmitting(false));
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
                                    <Formik
                                        initialValues={{
                                            name: "",
                                            description: "",
                                            type: "",
                                            amount: "",
                                        }}
                                        validationSchema={PlanSchema}
                                        onSubmit={handleSubmitForm}
                                    >
                                        {({ _errors, _touched, handleChange, handleSubmit, isSubmitting }) => (
                                            <Form>
                                                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                                                    <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0">
                                                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                                            <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                                                CREATE NEW PLAN
                                                            </p><div>
                                                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                                                    Name
                                                                </label>
                                                                <Field
                                                                    name='name'
                                                                    onChange={handleChange}
                                                                    placeholder="JohnDoe"
                                                                    className="outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                                                                    type="text" />
                                                                <ErrorMessage name="name" component="div" className="text-red-500" />
                                                            </div>
                                                            <div>
                                                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                                                    Descirption
                                                                </label>
                                                                <Field
                                                                    onChange={handleChange}
                                                                    className="bg-gray-50 border border-gray-300 outline-none text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                                                                    placeholder="wrie here"
                                                                    name='description' />
                                                                <ErrorMessage name="description" component="div" className="text-red-500" />
                                                            </div>
                                                            <div>
                                                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                                                    Amount
                                                                </label>
                                                                <Field
                                                                    onChange={handleChange}
                                                                    name="amount"
                                                                    className="bg-gray-50 border border-gray-300 text-gray-900 outline-none sm:text-sm rounded-lg block w-full p-2.5"
                                                                    placeholder="10000"
                                                                    id="confirmPassword"
                                                                    type="number" />
                                                                <ErrorMessage name="amount" component="div" className="text-red-500" />
                                                            </div>
                                                            <div>
                                                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                                                    Type
                                                                </label>
                                                                <Field
                                                                    as="select"
                                                                    name="type"
                                                                    onChange={handleChange}
                                                                    className="bg-gray-50 border border-gray-300 text-gray-900 outline-none sm:text-sm rounded-lg block w-full p-2.5">
                                                                    <option defaultValue="Weekly">Weekly</option>
                                                                    <option defaultValue="Mothly">Monthly</option>
                                                                    <option defaultValue="Yearly">Yearly</option>
                                                                </Field>
                                                                <ErrorMessage name="type" component="div" className="text-red-500" />
                                                            </div>
                                                            <button
                                                                disabled={isSubmitting}
                                                                className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white" type="submit">
                                                                Create plan
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition >
    </>
}
export default CreatePlanForm;