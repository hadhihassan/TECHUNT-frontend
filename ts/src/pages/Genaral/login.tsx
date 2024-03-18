/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Header from "../../components/General/Home/Header/header";
import Footer from "../../components/General/Home/footer/footer";
import { Login } from "../../services/clientApiService";
import { useDispatch, } from "react-redux";
import { setEmail, setVerify, setRole, setLogged, setId, isNumberVerify, isPremimunUser, isBankVeried } from "../../redux/Slice/signupSlice";
import { useNavigate } from "react-router-dom";
import { emailValidator, passwordValidator } from "../../util/validatorsUtils";
import Swal from 'sweetalert2';
import { useSocketContext } from "../../context/socketContext";

const LoginPage: React.FC = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [email, setUserEmail] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [Emailerrors, setErrorsEmail] = useState<string | null>("");
    const [PasswordErrors, setErrorsPassword] = useState<string | null>(null);
    const { socket } = useSocketContext();

    const handleEmailSubmit: (e: React.FormEvent) => void = (e) => {
        e.preventDefault()
        setErrorsEmail(emailValidator(email))
        setErrorsPassword(passwordValidator(password))
        if (Emailerrors === null && PasswordErrors === null) {
            Login({ email, password })
                .then((res: any) => {
                    if (res?.error?.response?.data?.isBlocked) {
                        Swal.fire({
                            title: "Youre blocked !",
                            text: "you blocked by admin !",
                            icon: "warning"
                        });
                    } else {
                        if (!res?.data) {
                            setError("Email Or Password incorrect")
                        } else {
                            localStorage.setItem("token", res?.data?.data.token)
                            dispatch(setLogged(true));
                            dispatch(setVerify(true));
                            dispatch(setRole(res?.data?.data.role));
                            dispatch(setId(res?.data?.data?.data?._id));
                            dispatch(setEmail(res?.data?.data?.data?.Email));
                            dispatch(isNumberVerify(res?.data?.data?.data?.isNumberVerify));

                            if (res?.data?.data?.data.subscription) {
                                dispatch(isPremimunUser(true));
                            }
                            if (res?.data?.data?.data.bankDetails) {
                                dispatch(isBankVeried(true));
                            }
                            if (res?.data?.data?.data.subscription && res?.data?.data.role === "TALENT") {
                                console.log("you expected worked")
                                const userId: string = res?.data?.data?.data?._id
                                socket.emit("subscribedUser", userId)
                            }
                            // for online user
                            socket.emit("OnlineUser", { role: res?.data?.data.role, id: res?.data?.data?.data?._id })
                            if (res?.data?.data.role === "CLIENT") {
                                navigate("/client/home/");
                            } else {
                                navigate("/talent/home/");
                            }
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
    const naviagteSignup = () => {
        navigate("/signup");
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorsEmail(emailValidator(e.target.value))
        setUserEmail(e.target.value)
    }

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorsPassword(passwordValidator(e.target.value))
        setPassword(e.target.value)
    }


    return (
        <div>
            <Header layout={true} />
            <div className="w-full flex justify-center items-center">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-[550px] m-10   border shadow-2xl rounded-lg">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleEmailSubmit}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                            {Emailerrors && <p className="text-red-500 text-xs text-end">{Emailerrors}</p>}
                            <input onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                            {PasswordErrors && <p className="text-red-500 text-xs text-end">{PasswordErrors}</p>}
                            <input onChange={handleChangePassword} type="password" name="password" id="password" placeholder="Password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="remember" className="text-normal font-sans">Remember me</label>
                                </div>
                            </div>
                            <span className="text-sm font-normal hover:text-red-500 font-sans text-primary-600 hover:underline dark:text-primary-500">Forgot password?</span>
                        </div>
                        <div className="flex justify-center items-center flex-col ">
                            <span className="text-sm font-medium text-center text-red-700 font-sans">{error}</span>
                            <br />
                            <button type="submit" className=" bg-red-500 w-[10rem] mb-4 h-[2rem] text-white border rounded-xl  ">Sign in</button>
                            <p className="text-sm font-normal fonr-sans text-start">
                                Don’t have an account yet? <span className="font-medium  hover:underline text-red-500" onClick={naviagteSignup}>Sign up</span>
                            </p>
                        </div>
                    </form>
                    <div >
                        <hr />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}



export default LoginPage;