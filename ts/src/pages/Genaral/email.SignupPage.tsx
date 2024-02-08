import React, { useEffect, useState } from "react";
import Header from "../../components/General/Home/Header/header";
import Footer from "../../components/General/Home/footer/footer";
import DoneIcon from '@mui/icons-material/Done';
import { useDispatch, useSelector } from "react-redux";
import { INITIALSTATE, setEmail } from "../../redux/Slice/signupSlice";
import { ROOTSTORE } from "../../redux/store";
import GoogleIcon from '@mui/icons-material/Google';
import { post } from "../../config/axios";
import Routers, { Routes } from "../../util/pathVariables";
import { useNavigate } from "react-router-dom";
import { GoogleLogin  } from '@react-oauth/google';
import axios from "axios";
const Login = () => {


    const naviagte = useNavigate()
    const dispatch = useDispatch()
    const [inputvalue, setValue] = useState<string>("")
    const [password, setPassword] = useState<String>("")
    const [message, setMessage] = useState<boolean>(false)
    const data: INITIALSTATE = useSelector((state: ROOTSTORE) => state.signup);
    const handleEmailSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (inputvalue !== "") {
            dispatch(setEmail(inputvalue));
        }
    }
    const handleClickBtn: () => void = () => {
        naviagte("/login/")
    }

    const verifyEmail = async (): Promise<void> => {
        try {
            const url: string = Routers.VerifyEmail;  // Adjust this based on the desired route
            const result: { [x: string]: any; key: string } = await post(url, { email: inputvalue, password: password, type: data.role });
            setMessage(true);
            setTimeout(() => {
                setMessage(false);
            }, 3000);
            console.log('AUTHTOKEN', result.token);
            const { token } = result

            localStorage.setItem("token", token)
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };
    const responseMessage = (response: any) => {
        console.log("this is answer", response);
    };
    const errorMessage = (error: any) => {
        console.log(error, "this is error");
    };
    // const [user, setUser] = useState([]);
    // const [profile, setProfile] = useState([]);

    // const login = GoogleLogin({
    //     onSuccess: (codeResponse: React.SetStateAction<never[]>) => setUser(codeResponse),
    //     onError: (error: any) => console.log('Login Failed:', error)
    // });
    // useEffect(
    //     () => {
    //         if (user) {
    //             axios
    //                 .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
    //                     headers: {
    //                         Authorization: `Bearer ${[;0l9kj7uhy65gt5rf3ewuser.access_token}`,
    //                         Accept: 'application/json'
    //                     }
    //                 })
    //                 .then((res: { data: React.SetStateAction<never[]>; }) => {
    //                     setProfile(res.data);
    //                 })
    //                 .catch((err: any) => console.log(err));
    //         }
    //     },
    //     [user]
    // );
    // const logOut = () => {
    //     googleLogout();
    //     setProfile(null);
    // };
    // login()
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
                    <div className="w-[460px] h-[55.31px]  rounded-[100px]" >
                        <GoogleLogin
                            clientId="789696358541-g2m8o8ik8de7j8f662n3281rtbcec9uc.apps.googleusercontent.com.apps.googleusercontent.com" // Replace with your Google Client ID
                            onSuccess={responseMessage} // Function to handle successful login response
                            onError={errorMessage} // Function to handle login error
                            cookiePolicy={'single_host_origin'} // Specify cookie policy
                            buttonText="Login with Google" // Optional: text for the login button
                        // Additional optional props can be used as needed
                        />
                        {/* <p className="text-white text-center mt-4">  <GoogleIcon className="mr-1 mb-1 " /> Continue with Google</p> */}
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
                                className="w-[460px] mb-5 h-[55.31px] rounded-[100px] border  block  p-4 text-gray-900 border-gray-300"
                                id="username"
                                type="text"
                                placeholder="Email Address"
                            />
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-[460px] h-[55.31px] rounded-[100px] border  block  p-4 text-gray-900 border-gray-300"
                                id="username"
                                type="text"
                                placeholder="Password"
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