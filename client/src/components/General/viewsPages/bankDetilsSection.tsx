import { useState } from "react";
import Modal from "../profile/profileEditModal";
import { updateBankDetails } from "../../../services/commonApiService";
import { message } from "antd";
import { useSelector } from "react-redux";
import { ROOTSTORE } from "../../../redux/store";
import { BankOutlined } from "@ant-design/icons";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { bankTypes, validationSchema } from '../settings/numberVerifiactions/bankDetailsForm'

export interface BankDetailsInterface {
    account_holder_name: string
    account_number: string
    account_type: string
    bank_name: string
    ifsc_code: string
    _id: string
}
interface BankDetailsSection {
    data: BankDetailsInterface | undefined,
    onUpdate: () => void
}
export const BankDetails: React.FC<BankDetailsSection> = ({ data, onUpdate }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const userData = useSelector((state: ROOTSTORE) => state.signup)
    const closeModal = () => setIsOpen(!isOpen)
    const handleSubmit = (values: BankDetailsInterface) => {
        
        updateBankDetails(values, userData.role, userData.id as string || "")
            .then((res) => {
                if (res.data.success) {
                    message.success("Successfully update your bank details.")
                    onUpdate()
                }
            }).catch(() => message.error("Something went wrong "))
    }
    return <>
        <div className="w-[48rem]  rounded-xl  border h-[20rem]  shadow-2xl">
            <div className="flex justify-between">
                <p className="m-4 font-sans font-medium flex flex-row items-center gap-2"> <BankOutlined />Bank Details</p>
                <button
                    onClick={closeModal}
                    className="w-[5rem] mt-3 mr-2 font-sans font-medium rounded-full h-7 border border-red-500 text-red-500">Edit</button>
            </div> <hr />
            <div>
                <div className="w-full max-w-lg m-5 ">
                    <div className="flex flex-wrap -mx-3 mb-1">
                        <div className="w-full px-3">
                            <label className="block  tracking-wide text-gray-900 text-xs font-bold mb-2" >
                                Holder Name
                            </label>
                            <input readOnly value={data?.account_holder_name} className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-2 px-2 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" />
                        </div>
                    </div>
                    <div className="flex  -mx-3 mb-1">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block  tracking-wide text-gray-900 text-xs font-bold mb-2" >
                                Bank Name
                            </label>
                            <input readOnly value={data?.bank_name} className="appearance-none block w-full bg-gray-200 text-gray-900 border  rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block  tracking-wide text-gray-900 text-xs font-bold mb-2" >
                                Account Number
                            </label>
                            <input readOnly value={data?.account_number} className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-1">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block  tracking-wide text-gray-900 text-xs font-bold mb-2" >
                                IFCS code                              </label>
                            <input readOnly value={data?.ifsc_code} className="appearance-none block w-full bg-gray-200 text-gray-900 border  rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block  tracking-wide text-gray-900 text-xs font-bold mb-2">
                                Bank Type                              </label>
                            <input readOnly value={data?.account_type} className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal isOpen={isOpen} onClose={closeModal}>
            <div className="w-full ">
                <div className="mb-1">
                    <p className="m-4 font-sans font-semibold text-center">Edit bank details</p>
                    <hr />
                </div>
                <Formik
                    initialValues={{
                        account_holder_name: data?.account_holder_name || "",
                        account_number: data?.account_number || "",
                        account_type: data?.account_type || "",
                        bank_name: data?.bank_name || "",
                        ifsc_code: data?.ifsc_code || "",
                        _id: data?._id || "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
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
                                            {data?.account_type !== name ? name : null}
                                        </option>
                                    ))}
                                    <option value={data?.account_type}>{data?.account_type}</option>
                                </Field>
                                <ErrorMessage name="account_type" component="div" className="font-semibold font-sans text-red-500 text-xs text-start" />
                            </div>
                            <button type="submit" className="bg-red-500 w-[10rem] mb-4 h-[2rem] text-white border rounded p-1-xl">
                                Submit
                            </button>
                        </Form>
                    )}
                    </Formik>
            </div>
        </Modal>
    </>
}