import Header from "../../../components/General/Home/Header/header";
import Footer from "../../../components/General/Home/footer/footer";
import { useDispatch, useSelector } from "react-redux";
import { INITIALSTATE, setEmail, isNumberVerify } from "../../../redux/Slice/signupSlice";
import { ROOTSTORE } from "../../../redux/store";
import Routers from "../../../routes/pathVariables";
import { useNavigate } from "react-router-dom";
import { signup } from "../../../services/commonApiService";
import Alert from '@mui/material/Alert';
import Swal from 'sweetalert2'
import { useState } from "react";
import { emailValidator, passwordValidator } from "../../../util/validatorsUtils";


const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [inputValue, setValue] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")
    const data: INITIALSTATE = useSelector((state: ROOTSTORE) => state.signup);
    const [EmailErrors, setErrorsEmail] = useState<string | null>(" ");
    const [PasswordErrors, setErrorsPassword] = useState<string | null>(" ");

    const handleClickBtn: () => void = () => {
        navigate(Routers.Login)
    }

    const verifyEmail = async (): Promise<void> => {
        setErrorsEmail(emailValidator(inputValue))
        setErrorsPassword(passwordValidator(password))
        
        if (!EmailErrors && !PasswordErrors) {
            if (inputValue !== "") {
                dispatch(setEmail(inputValue));
                dispatch(isNumberVerify(false));
            }
            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const result: any = await signup({ email: inputValue, password: password }, data.role)
                if (result.data) {
                    setTimeout(() => {
                        setError("")
                    }, 3000);
                    const { token }: { token:string } = result?.data?.data as { token: string }
                    localStorage.setItem("token", token)
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Verification link sent to your email. Please check your email.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate(Routers.Login)
                } else {
                    setError(result?.error?.response?.data?.message)
                    setTimeout(() => {
                        setError("")
                    }, 3000);
                }
            } catch (error) {
                console.error('Error posting data:', error);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorsEmail(emailValidator(e.target.value))
        setValue(e.target.value)
    }

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorsPassword(passwordValidator(e.target.value))
        setPassword(e.target.value)
    }

    return (
        <div>
            <Header layout={true} />
            <div className="w-full flex flex-col justify-center items-center]">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div className="relative px-4 py-10 bg-white border shadow-xl mx-8 md:mx-0 rounded-3xl sm:p-10">
                        <div className="max-w-md mx-auto text-black">
                            <div className="flex items-center space-x-5 justify-center text-black">
                                <p className="text-black">Get your Techunt free account</p>
                            </div>
                            <div className="mt-5">
                                <label className="font-semibold text-sm  pb-1 block">E-mail</label>
                                {EmailErrors && <p className="text-red-500 text-xs text-end">{EmailErrors}</p>}
                                <input
                                    onChange={handleChange}
                                    className="border rounded-xl px-3  py-2 mt-1 mb-5 text-sm w-[50vh] text-black"
                                    type="text"
                                    id="login"
                                    placeholder="Enter your email"
                                />
                                <label className="font-semibold text-sm  pb-1 block">Password</label>
                                {PasswordErrors && <p className="text-red-500 text-xs text-end">{PasswordErrors}</p>}
                                <input
                                    onChange={handleChangePassword}
                                    className="border rounded-xl px-3 py-2 mt-1 mb-5 text-sm w-full text-black"
                                    type="password"
                                    id="password"
                                    placeholder="Enter your password"
                                />
                            </div>
                            <div className="text-right mb-4">
                                {error && <Alert severity="warning">{error}</Alert>}
                            </div>
                            <div className="mt-5">
                                <button
                                    onClick={verifyEmail}
                                    className="py-2 px-4 bg-red-500 hover:bg-red-600 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                                    type="submit"
                                >

                                    Verify
                                </button>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <span onClick={handleClickBtn} className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                                <p className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline" onClick={handleClickBtn}>Log in</p>
                                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login;
