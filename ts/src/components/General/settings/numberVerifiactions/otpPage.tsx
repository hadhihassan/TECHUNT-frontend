import React, { useState } from "react";
import './style.css'
import PhoneInput from "react-phone-input-2"
import 'react-phone-input-2/lib/style.css'
import { ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from "../../../../firebase/setup";
import toast, { Toaster } from "react-hot-toast";
import OtpInput from 'react-otp-input';
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { checkValidNumber, updateNumberVerification } from "../../../../api/commonApi";
import { useSelector } from "react-redux";
import { ROOTSTORE } from "../../../../redux/store";
import { useNavigate } from "react-router-dom"

const NumberVerification = () => {
    const navigate =  useNavigate()
    const basicData = useSelector((state: ROOTSTORE) => state.signup)
    const [phone, setPhone] = useState<string>("")
    const [user, setUser] = useState<any>(null)
    const [otp, setOtp] = useState<string>("")
    const [showOtpPage, setSwitch] = useState<boolean>(false)
    const [loading, setLoading] = useState(false);
    console.log(phone)
    const sendOtp = async () => {
        try {
            // Ensure phone number is in E.164 format
            checkValidNumber(phone.slice(2), basicData?.role, basicData?.id)
                .then(async (res: any) => {
                    console.log(res)
                    if (res.error) {
                        error(res?.error?.response?.data.message || "Error occurs While processing you request ")
                    } else {
                        console.log(res)
                        setLoading(true)
                        const formattedPhone = `+${phone.replace(/\D/g, '')}`;
                        const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {})
                        const confirmation: ConfirmationResult = await signInWithPhoneNumber(auth, formattedPhone, recaptcha)
                        setUser(confirmation)
                        success("Otp sended your phone")
                        setSwitch(true)
                    }
                }).catch((err: any) => {
                    error(err?.error?.response?.data.message || "Error occurs While processing you request ")
                })
        } catch (err: any) {
            error(`Somthing went wrong!.${err.message}`)
        }
    }
    const verifyOtp = async () => {
        try {
            const data: any = await user.confirm(otp)
            success("Your number is verified .")
            updateNumberVerification(basicData.role, basicData.id)
                .then((res: any) => {
                    console.log(res)
                    navigate(`${basicData.role}/profile`)
                }).catch((err: any) => {
                    console.log(err)
                })
        } catch (err: any) {
            error(`${err.message}`)
            console.log(err)
        }
    }

    //sucess toast hot message
    const success = (message: string) =>
        toast.success(message);
    //error toast host message
    const error = (err: string) => toast.error(err);

    return (

        <>
            <Toaster
                position="top-left"
                reverseOrder={true}
            />
            {
                showOtpPage ?
                    <section className="flex flex-col items-center justify-center mt-5">
                        <div className="flex flex-col w-full h-full  shadow-2xl rounded-b-xl justify-center items-center">
                            <div className="mt-5">
                                <div className="bg-white   w-fit mx-auto p-4 rounded-full">
                                    <BsFillShieldLockFill size={30} />
                                </div>
                                <label
                                    htmlFor="otp"
                                    className="font-bold text-xl font-sana text-center"
                                >
                                    Enter your OTP
                                </label>
                            </div>
                            <div className="m-2">
                                <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderSeparator={<span>-</span>}
                                    renderInput={(props) => <input {...props} className="w-40 border m-5 border-gray-400  h-8 rounded-md " />}
                                    disabled={false}
                                    autoFocus
                                    className="opt-container "
                                />
                                <button
                                    onClick={verifyOtp}
                                    className="bg-red-500 w-full mt-5 mb-5 flex gap-1 items-center justify-center py-2.5 text-white rounded"
                                >
                                    {loading && (
                                        <CgSpinner size={20} className="mt-1 animate-spin" />
                                    )}
                                    <span>Verify OTP</span>
                                </button>

                            </div>
                        </div>
                    </section>
                    :
                    <section className="flex flex-col items-center justify-center mt-5 ">
                        <div className="flex flex-col w-full h-full  shadow-2xl  rounded-b-xl justify-center items-center ">
                            <div className="flex  flex-col justify-center items-center mt-5 mb-5 rounded-full  w-16 h-16 bg-red-500 ">
                                <BsTelephoneFill size={30} color="white" />
                            </div>
                            <label
                                htmlFor=""
                                className="font-bold text-xl  text-center"
                            >
                                Verify your phone number
                            </label>
                            <div className="flex flex-col justify-center items-center mt-10">
                                <div>
                                    <PhoneInput
                                        country={"in"}
                                        onChange={(phone) => setPhone(phone)}
                                    />
                                </div>
                                <div id="recaptcha" className="m-2">
                                </div>
                                <div className="w-full flex justify-center">
                                    <button
                                        onClick={sendOtp}
                                        className="bg-red-500 mt-5 mb-5  w-[80%] flex gap-1 items-center justify-center py-2.5  text-white rounded"
                                    >
                                        {loading && (
                                            <CgSpinner size={20} className="mt-1 animate-spin" />
                                        )}
                                        <span>Send code via SMS</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
            }
        </>
    );
};

export default NumberVerification;
