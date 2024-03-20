import React, { useState } from "react";
import AfterLoginHeader from "../../../components/General/Home/Header/afterLoginHeader";
import Footer from "../../../components/General/Home/footer/footer";
import { ArrowBack, Email, NumbersSharp, Password } from "@mui/icons-material";
import NumberVerifcation from "../../../components/General/settings/numberVerifiactions/numberVerifcation";
import OtpInputWithValidation from "../../../components/General/settings/numberVerifiactions/otpPage";
import CheckoutForm from "../../../components/General/settings/numberVerifiactions/bankDetailsForm";
import { useSelector } from "react-redux";
import { ROOTSTORE } from "../../../redux/store";


const Settings: React.FC = () => {
    const [tab, setTab] = useState<number>(0)
    const tabElements: React.FC[] = [<NumberVerifcation />, <CheckoutForm />]
    const userData = useSelector((state: ROOTSTORE) => state.signup)
    return (
        <div>
            <AfterLoginHeader />
            <div className="w-full h-[100vh] flex mb-20">
                <div className="flex flex-col justify-between flex-1 m-16">
                    <nav className="-mx-3 space-y-6 ">
                        <div className="space-y-4 "
                            onClick={() => history.back()}>
                            <ArrowBack />
                            <label className=" text-md font-sans font-semibold">Back</label>
                        </div>
                        {
                            !userData.bankVerified && <>
                                <div className="space-y-4 ">
                                    <label className=" text-2xl font-sans font-bold">Billing</label>
                                    <a
                                        className="flex items-center px-3 py-2 dark:text-gray-400 text-black transition-colors duration-300 transform rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                                        <NumbersSharp />
                                        <span
                                            onClick={() => setTab(1)}

                                            className="mx-2 text-sm font-medium">
                                            Add Payment Method</span>
                                    </a>
                                </div>
                            </>
                        }

                        <div className="space-y-3 ">
                            <label className="text-2xl font-sans font-bold ">User Settings</label>
                            <a className="flex items-center px-3 py-2 text-black dark:text-gray-400 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                                <NumbersSharp />
                                <span
                                    onClick={() => setTab(0)}
                                    className="mx-2 text-sm font-medium">Phone Verified</span>
                            </a>
                            <a className="flex items-center px-3 py-2 text-black  dark:text-gray-400 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                                <Email />

                                <span
                                    className="mx-2 text-sm font-medium">Email Verified</span>
                            </a>
                            <a className="flex items-center px-3 py-2 dark:text-gray-400 text-black transition-colors duration-300 transform rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                                <Password />
                                <span className="mx-2 text-sm font-medium">Password & security</span>
                            </a>
                        </div>
                    </nav>
                </div>
                <div className="w-[75%] h-auto mb-3">
                    <div className="mt-20 mb-5">
                        {
                            tabElements[tab]
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Settings








































































