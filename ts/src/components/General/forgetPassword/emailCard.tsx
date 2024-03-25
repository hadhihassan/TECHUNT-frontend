import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Path } from "../../../routes/imports";
import { sendForgetOtp } from "../../../services/commonApiService";
import { AxiosResponse } from "axios";
import { message } from "antd";

const ForgetPasswordEmailCard = () => {
    const [email, setEmail] = useState<string>("")
    const navigate = useNavigate()
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value }: { value: string } = e.target;
        setEmail(value)
    }
    const handeSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        sendForgetOtp(email)
            .then((res:AxiosResponse) => {
                message.success(res?.data?.message )
            }).catch((err) => {
                message.error(err?.response?.data?.message as string  || "")
            })
    }
    return <>
        <div className="w-full flex justify-center items-center ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-[550px] m-10    shadow-2xl rounded-xl border-2">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                    Forget password
                </h1>
                <form onSubmit={handeSubmit}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                        {/* {Emailerrors && <p className="text-red-500 text-xs text-end">{Emailerrors}</p>} */}
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600  dark:placeholder-gray-400 outline-none dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Email"
                            onChange={handleChange} />
                    </div>

                    <div className="flex justify-center items-center flex-col ">
                        {/* <span className="text-sm font-medium text-center text-red-700 font-sans">{error}</span> */}
                        <br />
                        <button type="submit" className=" bg-red-500 w-[10rem] mb-4 h-[2rem] text-white border rounded-xl  ">Send otp</button>
                        <p className="text-sm font-normal fonr-sans text-start">
                            Don’t have an account yet? <span className="font-medium  hover:underline text-red-500" onClick={() => {
                                navigate(Path.VerifyEmail)
                            }}>Sign up</span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </>;
}

export default ForgetPasswordEmailCard;