import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import { getPlanForEdit, updatePlan } from '../../../services/adminApiService'
import { message } from 'antd'
import type { PlanInterface } from './createPlanForm'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
interface FormProps {
    isOpen: boolean,
    closeModal: () => void,
    data: string
    editData: PlanInterface
}

const EditPlanForm: React.FC<FormProps> = ({ isOpen, closeModal, data, editData }) => {
    const [planData, setPlanData] = useState<PlanInterface>({
        _id: editData._id,
        name: editData.name,
        description: editData.description,
        type: editData.type,
        amount: editData.amount,
    })
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required'),
        amount: Yup.number().required('Amount is required').positive('Amount must be positive').integer('Amount must be an integer'),
        type: Yup.string().required('Type is required'),
    });
    const fetchData = (data: string) => {
        getPlanForEdit(data)
            .then((res) => {
                console.log(res?.data?.data)
                setPlanData(res?.data?.data)
            })
    }
    useEffect(() => {
        fetchData(data)
    }, [])
    const handleSubmit = async (values: PlanInterface, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            const res = await updatePlan(data, values);
            if (res?.data?.success) {
                message.success('Successfully plan updated');
            } else {
                message.error('Failed to update plan');
            }
        } catch (error) {
            message.error('Failed to update plan');
        } finally {
            setSubmitting(false);
        }
    };
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
                                <Formik
                                    initialValues={{
                                        name: planData?.name || '',
                                        description: planData?.description || '',
                                        type: planData?.type || '',
                                        amount: planData?.amount || 0,
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ handleChange, isSubmitting }) => (
                                        <Form>
                                            <div className="mt-2">
                                                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 sm:max-w-md xl:p-0">
                                                    <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0">
                                                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                                            <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                                                EDIT PLAN
                                                            </p>
                                                            <div>
                                                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                                                                <Field
                                                                    onChange={handleChange}
                                                                    type="text" name="name" className="outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" />
                                                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm font-normal mb-2" />
                                                            </div>
                                                            <div>
                                                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                                                                <Field
                                                                    onChange={handleChange}
                                                                    as="textarea" name="description" className="bg-gray-50 border border-gray-300 outline-none text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" />
                                                                <ErrorMessage name="description" component="div" className="text-red-500 text-sm font-normal mb-2" />
                                                            </div>
                                                            <div>
                                                                <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900">Amount</label>
                                                                <Field
                                                                    onChange={handleChange}
                                                                    type="number" name="amount" className="bg-gray-50 border border-gray-300 text-gray-900 outline-none sm:text-sm rounded-lg block w-full p-2.5" />
                                                                <ErrorMessage name="amount" component="div" className="text-red-500 text-sm font-normal mb-2" />
                                                            </div>
                                                            <div>
                                                                <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900">Type</label>
                                                                <Field
                                                                    onChange={handleChange}
                                                                    as="select" name="type" className="bg-gray-50 border border-gray-300 text-gray-900 outline-none sm:text-sm rounded-lg block w-full p-2.5">
                                                                    <option value="Weekly">Weekly</option>
                                                                    <option value="Monthly">Monthly</option>
                                                                    <option value="Yearly">Yearly</option>
                                                                </Field>
                                                                <ErrorMessage name="type" component="div" className="text-red-500 text-sm font-normal mb-2" />
                                                            </div>
                                                            <button
                                                                disabled={isSubmitting}
                                                                type="submit" className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-blue-800 text-white">Edit plan</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>
}
export default EditPlanForm;