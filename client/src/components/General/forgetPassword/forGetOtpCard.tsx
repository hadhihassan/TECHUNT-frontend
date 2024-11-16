/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { reSendOtp, sendOtp, setNewPassword } from "../../../services/commonApiService";
import { message } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import routerVariables from "../../../routes/pathVariables";
import { validationSchema, otpValidationSchema } from "../../../util/validationSchema";


const ForgetPasswordOtpCard = () => {
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(59);

    const navigate = useNavigate()

    const handleSubmit = async (values: { otp: string }, { setSubmitting }: { setSubmitting: (ar: boolean) => void }) => {
        try {
            const forgetEmailItem = localStorage.getItem("forgetEmail");
            const email = forgetEmailItem ? JSON.parse(forgetEmailItem) : "";
            const indicate = true;
            JSON.stringify(localStorage.setItem("showNewPass", JSON.stringify(indicate)))
            const res = await sendOtp(email, values?.otp);
            message.success(res.data.message);
            setShowNewPassword(true)
        } catch (err: any) {
            message.error(err?.response?.data?.message || "Something went wrong ? ")
        } finally {
            setSubmitting(false);
        }
    }
    const handleNewPasswordSubmit = async (values: { newPassword: string }, { setSubmitting }: { setSubmitting: (ar: boolean) => void }) => {
        try {
            const forgetEmailItem = localStorage.getItem("forgetEmail");
            const email = forgetEmailItem ? JSON.parse(forgetEmailItem) : "";
            const res = await setNewPassword(values?.newPassword, email);
            message.success(res.data.message);
            localStorage.removeItem("showNewPass")
            localStorage.removeItem("forgetEmail")
            navigate(routerVariables.Login)
        } catch (err: any) {
            console.log(err)
            message.error(err?.response?.data?.message || "Something went wrong ? ")
        } finally {
            setSubmitting(false);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        const showItem = localStorage.getItem("showNewPass")
        const show = showItem ? JSON.parse(showItem) : "";
        if (show) {
            setShowNewPassword(true)
        }
        return () => {
            clearInterval(interval);
            localStorage.removeItem("lastSentTimestamp")
        }
    }, [seconds]);
    const resendOTP = () => {
        setMinutes(1);
        setSeconds(30);
    };
    const handleReSendOtp = () => {
        const forgetEmailItem = localStorage.getItem("forgetEmail");
        const email: string = forgetEmailItem ? JSON.parse(forgetEmailItem) : "";
        reSendOtp(email)
            .then(() => {
                message.success("New otp sended successfully .")
            }).catch((err) => {
                message.error(err?.response?.data?.message as string || "something went wrong ? ")
            })
    }
    return <>
        {
            !showNewPassword ? <>
                <div className="w-full flex justify-center items-center ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-[550px] m-10    shadow-2xl rounded-xl border-2">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                            Otp Verification
                        </h1>
                        <h1 className=" font-bold leading-tight tracking-tight text-gray-400  text-center">
                            We have sent a code to your email
                        </h1>
                        <Formik
                            initialValues={{
                                otp: "",
                            }}
                            validationSchema={otpValidationSchema}
                            onSubmit={handleSubmit}
                        >
                            {() => (
                                <Form>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your Otp</label>
                                        <Field
                                            type="text"
                                            name="otp"
                                            id="otp"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600  dark:placeholder-gray-400 outline-none dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="OTP"
                                        />
                                        <ErrorMessage name="otp" component="div" className=" font-sans text-red-500 text-xs text-start" />
                                    </div>

                                    <div className="flex justify-center items-center flex-col ">
                                        <br />
                                        <button type="submit" className="bg-red-500 w-[10rem] mb-4 h-[2rem] text-white border rounded-xl">Submit</button>
                                        {seconds > 0 || minutes > 0 ? (<>
                                            <p>
                                                Time Remaining:{" "}
                                                <span style={{ fontWeight: 600 }}>
                                                    {minutes < 10 ? `0${minutes}` : minutes}:
                                                    {seconds < 10 ? `0${seconds}` : seconds}
                                                </span>
                                            </p>
                                        </>) : (<>
                                            <p className="text-sm font-normal font-sans text-start ">
                                                Didn't recieve otp ?
                                                <span className="font-medium  ml-1 hover:underline text-red-500" onClick={handleReSendOtp}>Resend </span>
                                            </p>
                                        </>)}

                                        <button
                                            disabled={seconds > 0 || minutes > 0}
                                            style={{
                                                color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630",
                                            }}
                                            onClick={resendOTP}
                                        />
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </> : <>
                <div className="w-full flex justify-center items-center ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-[550px] m-10    shadow-2xl rounded-xl border-2">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                            New Password
                        </h1>
                        <h1 className=" font-bold leading-tight tracking-tight text-gray-400  text-center">
                            Enter you new password
                        </h1>
                        <Formik
                            initialValues={{
                                newPassword: "",
                                confirmPassword: "",
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleNewPasswordSubmit}
                        >
                            {({ handleChange, isSubmitting }) => (
                                <Form>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">New password</label>
                                        <Field
                                            onChange={handleChange}
                                            type="text"
                                            name="newPassword"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600  dark:placeholder-gray-400 outline-none dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                        <ErrorMessage name="newPassword" component="div" className=" font-semibold font-sans text-red-500 text-xs text-start" />
                                        <label htmlFor="email" className="block mb-2 mt-5 text-sm font-medium text-gray-900">Confirm password</label>
                                        <Field
                                            onChange={handleChange}
                                            type="text"
                                            name="confirmPassword"
                                            className="bg-gray-50 border  border-gray-300 text-gray-900 sm:text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600  dark:placeholder-gray-400 outline-none dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                        <ErrorMessage name="confirmPassword" component="div" className=" font-semibold font-sans text-red-500 text-xs text-start" />
                                    </div>
                                    <div className="flex justify-center items-center flex-col ">
                                        <br />
                                        <button
                                            disabled={isSubmitting}
                                            type="submit"
                                            className="bg-red-500 w-[10rem] mb-4 h-[2rem] text-white border rounded-xl">Submit</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </>
        }
    </>;
}

export default ForgetPasswordOtpCard;