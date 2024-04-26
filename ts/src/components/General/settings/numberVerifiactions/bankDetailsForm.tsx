export const bankTypes = ["Savings", "Current", "Joint", "Business", "Student", "Retirement", "Online", "Islamic", "Credit Union", "Community", "Private"];
import { Dialog, Transition } from '@headlessui/react'
import { useState, Fragment } from "react";
import {
    Card,
    CardBody,
    Typography,
    Tabs,
    TabsBody,
    TabPanel,
} from "@material-tailwind/react";
import { addBankDetails } from "../../../../services/commonApiService";
import { useDispatch, useSelector } from "react-redux";
import { ROOTSTORE } from "../../../../redux/store";
import { INITIALSTATE, isBankVeried } from "../../../../redux/Slice/signupSlice";
import { message } from "antd";
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';


export interface BankType {
    bank_name: string,
    account_holder_name: string,
    account_number: string,
    ifsc_code: string,
    account_type: string,
}

export const validationSchema = Yup.object().shape({
    account_holder_name: Yup.string().trim().required('Holder Name is required'),
    bank_name: Yup.string().trim().required('Bank Name is required'),
    account_number: Yup.string()
        .required('Bank account number is required')
        .matches(/^\d+$/, 'Bank account number must only contain digits')
        .min(8, 'Bank account number must be at least 8 digits long')
        .max(20, 'Bank account number must be at most 20 digits long'),
    ifsc_code: Yup.string()
        .trim()
        .required('IFCS code is required')
        .matches(/^[A-Za-z]{4}[a-zA-Z0-9]{7}$/, 'Invalid IFSC code format')
        .min(11, 'IFSC code must be exactly 11 characters long')
        .max(11, 'IFSC code must be exactly 11 characters long'),
    account_type: Yup.string().required('Bank Type is required'),
});


export default function CheckoutForm({ onUpdate }: { onUpdate: () => void }) {
    const userData: INITIALSTATE = useSelector((state: ROOTSTORE) => state.signup)
    const [isOpen, setIsOpen] = useState(true)
    function closeModal() {
        setIsOpen(false)
    }
    const dispatch = useDispatch()
    const submit = (values: BankType) => {
        addBankDetails(userData.id as string || "", userData.role, values)
            .then(() => {
                message.success("Bank details added .")
                dispatch(isBankVeried(true))
                onUpdate()
            }).catch(() => {
                message.success("Something went wrong . try again !")
            })
    }
    return (<>
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
                                <Card className="w-full  max-w-[30rem] h-auto " placeholder={undefined}>
                                    <Typography className="m-auto mt-3" variant="h5" placeholder={undefined}>Fill you bank details</Typography>
                                    <CardBody placeholder={undefined}>
                                        <Tabs value={"card"} className="overflow-visible">
                                            <TabsBody
                                                className=""
                                                animate={{
                                                    initial: {
                                                        x: 400,
                                                    },
                                                    mount: {
                                                        x: 0,
                                                    },
                                                    unmount: {
                                                        x: 400,
                                                    },
                                                }} placeholder={undefined}                    >
                                                <TabPanel value="card" className="p-0">
                                                    <Formik
                                                        initialValues={{
                                                            bank_name: "",
                                                            account_holder_name: "",
                                                            account_number: "",
                                                            ifsc_code: "",
                                                            account_type: "",
                                                        }}
                                                        validationSchema={validationSchema}
                                                        onSubmit={submit}
                                                    >
                                                        {() => (
                                                            <Form className="flex flex-col gap-4">
                                                                <div className=" flex items-center gap-4">
                                                                    <div className="w-full">
                                                                        <p
                                                                            color="blue-gray"
                                                                            className="mb-1 font-medium">
                                                                            Holder Name
                                                                        </p>
                                                                        <Field
                                                                            name="account_holder_name"
                                                                            placeholder="name@mail.com"
                                                                            className="w-full !border-t-blue-gray-200 focus:!border-t-gray-900 border rounded p-1" />
                                                                        <ErrorMessage name="account_holder_name" component="div" className="font-semibold font-sans text-red-500 text-xs text-start" />
                                                                    </div>
                                                                    <div className="w-full">
                                                                        <p
                                                                            color="blue-gray"
                                                                            className="mb-1 font-medium">
                                                                            Bank Name
                                                                        </p>
                                                                        <Field
                                                                            required
                                                                            name="bank_name"
                                                                            placeholder="sample bank"
                                                                            className=" w-full !border-t-blue-gray-200 focus:!border-t-gray-900 border rounded p-1" />
                                                                        <ErrorMessage name="bank_name" component="div" className="font-semibold font-sans text-red-500 text-xs text-start" />
                                                                    </div>
                                                                </div>
                                                                <div >
                                                                    <p
                                                                        color="blue-gray"
                                                                        className="mb-1 font-medium " >
                                                                        Account Number
                                                                    </p>
                                                                    <Field
                                                                        required
                                                                        name="account_number"
                                                                        placeholder="0000 0000 0000 0000"
                                                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 border rounded w-full p-1" />
                                                                    <ErrorMessage name="account_number" component="div" className="font-semibold font-sans text-red-500 text-xs text-start" />
                                                                    <p
                                                                        color="blue-gray"
                                                                        className="mb-1 mt-2 font-medium ">
                                                                        IFCS code
                                                                    </p>
                                                                    <Field
                                                                        required
                                                                        name="ifsc_code"
                                                                        placeholder="0000 0000 0000 0000"
                                                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 border rounded w-full p-1" />
                                                                    <ErrorMessage name="ifsc_code" component="div" className="font-semibold font-sans text-red-500 text-xs text-start" />
                                                                    <p
                                                                        color="blue-gray"
                                                                        className="mb-2 font-medium">
                                                                        Bank Type
                                                                    </p>
                                                                    <Field
                                                                        as="select"
                                                                        name="account_type"
                                                                        placeholder="USA"
                                                                        className="!border-t-blue-gray-200 focus:!border-t-gray-900 border rounded p-1 w-full"
                                                                        labelProps={{ className: "before:content-none after:content-none" }}
                                                                        menuProps={{ className: "h-48" }}
                                                                    >
                                                                        {bankTypes.map((name: string) => (
                                                                            <option key={name} value={name}>
                                                                                {name}
                                                                            </option>
                                                                        ))}
                                                                    </Field>
                                                                    <ErrorMessage name="account_type" component="div" className="font-semibold font-sans text-red-500 text-xs text-start" />
                                                                </div>
                                                                <button type="submit" className="bg-red-500 w-[10rem] mb-4 h-[2rem] text-white border rounded p-1-xl">
                                                                    Submit
                                                                </button>
                                                            </Form>
                                                        )}
                                                    </Formik>
                                                </TabPanel>
                                            </TabsBody>
                                        </Tabs>
                                    </CardBody>
                                </Card>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>

    </>
    );
}