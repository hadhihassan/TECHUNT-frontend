import { ChangeEvent, useEffect, useState } from "react";
import Modal from "../profile/profileEditModal";
import { updateBankDetails } from "../../../services/commonApiService";
import { message } from "antd";
import { useSelector } from "react-redux";
import { ROOTSTORE } from "../../../redux/store";
import { BankOutlined } from "@ant-design/icons";

export interface BankDetailsInterface {
    account_holder_name: string
    account_number: number
    account_type: string
    bank_name: string
    ifsc_code: number
    _id: string
}
interface BankDetailsSection {
    data: BankDetailsInterface | undefined,
    onUpdate: () => void
}
export  const BankDetails: React.FC<BankDetailsSection> = ({ data, onUpdate }) => {
    const [newBankDetails, setData] = useState<BankDetailsInterface>({
        account_holder_name: "",
        account_number: 0,
        account_type: "",
        bank_name: "",
        ifsc_code: 0,
        _id: "",
    })
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const userData = useSelector((state:ROOTSTORE)=>state.signup)
    useEffect(() => {
        setData({
            account_holder_name: data?.account_holder_name || "",
            account_number: data?.account_number || 0,
            account_type: data?.account_type || "",
            bank_name: data?.bank_name || "",
            ifsc_code: data?.ifsc_code || 0,
            _id: data?._id || "",
        })
    }, [data, onUpdate])
    const handleChange: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
        setData({
            ...newBankDetails,
            [e.target.name]: e.target.value,
        })
    }
    const closeModal = () => setIsOpen(!isOpen)
    const handleSubmit = () => {
        updateBankDetails(newBankDetails, userData.role, userData.id)
        .then((res)=>{
            if(res.data.success){
                message.success("Successfully update your bank details.")
                onUpdate()
            }
        }).catch(()=>message.error("Something went wrong "))
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
                <div className="flex flex-wrap -mx-3 mb-1 mt-2">
                    <div className="w-full px-3">
                        <label className="block tracking-wide text-gray-900 text-xs font-bold mb-2">
                            Holder Name
                        </label>
                        <input name="account_holder_name"
                            value={newBankDetails?.account_holder_name}
                            onChange={handleChange}
                            className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-2 px-2 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <label className="block tracking-wide text-red-500 text-sm font-normal mb-2">
                        </label>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block tracking-wide text-gray-900 text-xs font-bold mb-2">
                            Account Number
                        </label>
                        <input
                            name="account_number"
                            value={newBankDetails?.account_number}
                            onChange={handleChange}
                            className="appearance-none block w-full bg-gray-200 text-gray-900 border  rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" />
                        <label className="block tracking-wide text-red-500 text-sm font-normal mb-2">
                        </label>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block tracking-wide text-gray-900 text-xs font-bold mb-2">
                            Bank Type
                        </label>
                        <input
                            name="account_type"
                            value={newBankDetails?.account_type}
                            onChange={handleChange}
                            className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" />
                        <label className="block tracking-wide text-red-500 text-sm font-normal mb-2">
                        </label>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block tracking-wide text-gray-900 text-xs font-bold mb-2">
                            Bank Name
                        </label>
                        <input
                            name="bank_name"
                            value={newBankDetails?.bank_name}
                            onChange={handleChange}
                            className="appearance-none block w-full bg-gray-200 text-gray-900 border  rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" />
                        <label className="block tracking-wide text-red-500 text-sm font-normal mb-2">
                        </label>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block tracking-wide text-gray-900 text-xs font-bold mb-2">
                            IFCS code
                        </label>
                        <input
                            name="ifsc_code"
                            value={newBankDetails?.ifsc_code}
                            onChange={handleChange}
                            className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" />
                        <label className="block tracking-wide text-red-500 text-sm font-normal mb-2">
                        </label>
                    </div>
                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="block w-full rounded-md () px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Edit</button>

                </div>
            </div>
        </Modal>
    </>
}