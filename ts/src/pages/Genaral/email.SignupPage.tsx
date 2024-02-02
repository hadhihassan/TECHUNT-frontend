import React, { useState } from "react";
import Header from "../../components/General/Home/Header/header";
import Footer from "../../components/General/Home/footer/footer";
import DoneIcon from '@mui/icons-material/Done';
import { useDispatch, useSelector } from "react-redux";
import { INITIALSTATE, setEmail } from "../../redux/Slice/signup.js/signupSlice";
import { ROOTSTORE } from "../../redux/store";
import GoogleIcon from '@mui/icons-material/Google';
import { post } from "../../config/axios";
import Routers, { Routes } from "../../util/pathVariables";
import {  useNavigate } from "react-router-dom";
import routerVariables from "../../util/pathVariables";


const Login = () => {

    
    const naviagte = useNavigate() 
    const dispatch = useDispatch()
    const [inputvalue, setValue] = useState<string>("")
    const [message, setMessage] = useState<boolean>(false)
    const data: INITIALSTATE = useSelector((state: ROOTSTORE) => state.signup);
    console.log(data)
    const handleEmailSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (inputvalue !== "") {
            dispatch(setEmail(inputvalue));
            setMessage(true);
            setTimeout(() => {
                setMessage(false);
            }, 3000);
        }
    }
    const handleClickBtn = () => {
        naviagte("/signup/")
    }

    const verifyEmail = async (): Promise<void> => {
        try {
            const url: string = Routers.VerifyEmail;  // Adjust this based on the desired route
            const result: {
                [x: string]: any; key: string
            } = await post(url, { email: inputvalue, type: data.role });
            console.log(url, result)
            console.log('Received data:', result.clientAuthToken);
            localStorage.setItem("token", result.clientAuthToken)
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };


    return (
        <div>
            <Header layout={true} />
            <div className="w-full flex flex-col justify-center items-center">
                {message ?
                    <div className="w-[540px] h-[30px] top-6 flex items-center justify-center relative bg-stone-200 shadow rounded-xl" >
                        <DoneIcon className="ml-2 mt-1" style={{
                            fontSize: '20px',
                            color: '#FF4C4A',
                        }} />
                        <span className="text-red-500 text- ml-2 mt-1 text-md  font-sans ">Congratulation <span className="text-stone-800 text-sm   font-sans">,Email verification link sended you email check you email .</span></span>
                    </div>
                    :
                    null
                }

                <div className="w-[40rem] flex space-y-14 items-center flex-col   h-[40rem] mt-16 mb-16  border shadow-2xl rounded-lg">

                    <div>
                        <p className="text-stone-800 font-sans leading-snug text-[33px] font-semibold flex items-center justify-center pt-16">
                            Get your Techunt  free account
                        </p>
                    </div>
                    <div className="w-[460px] h-[55.31px] bg-indigo-600 rounded-[100px]" >

                        <p className="text-white text-center mt-4">  <GoogleIcon className="mr-1 mb-1 " /> Continue with Google</p>
                    </div>
                    <div className="w-[490px] h-[0px] border border-black border-opacity-25 flex justify-center items-center">or</div>
                    <div className="w-[460px] h-[55.31px] " >

                        <form
                            className='flex flex-col'
                            action=""
                            onSubmit={handleEmailSubmit}
                        >
                            <input
                                onChange={(e) => setValue(e.target.value)}
                                className="w-[460px] h-[55.31px] rounded-[100px] border border-black block w-full p-4 text-gray-900 border-gray-300"
                                id="username"
                                type="text"
                                placeholder="Email Address"
                            />
                            <button onClick={verifyEmail}
                                className="w-[460px] text-white h-[55.31px] mt-8 bg-red-500 rounded-[100px]"
                                type="submit"
                            >
                                Continue with Email
                            </button>
                        </form>

                        <p onClick={handleClickBtn} className="text-zinc-950 text-xs mt-14 text-center font-normal font-sans">
                            Already have an TECHUNT account ? <span className="text-red-500">Login</span>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );

}
export default Login;