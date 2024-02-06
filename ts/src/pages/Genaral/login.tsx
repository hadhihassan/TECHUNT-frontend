import { useState } from "react";
import Header from "../../components/General/Home/Header/header";
import Footer from "../../components/General/Home/footer/footer";
import { Login } from "../../api/client.Api";
import { useDispatch, useSelector } from "react-redux";
import { ROOTSTORE } from "../../redux/store";
import { INITIALSTATE, setLogged } from "../../redux/Slice/signupSlice";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const role: INITIALSTATE["role"] = useSelector((state: ROOTSTORE) => state.signup.role)
    const handleEmailSubmit: (e: React.FormEvent) => void = (e) => {
        e.preventDefault()

        Login({ email, password }, role)
            .then((res: {}) => {
                if (res) {
                    dispatch(setLogged(true))
                    navigate("/");
                }
            })
            .catch((error) => {
                console.log(error);
            });
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
                            <input  onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" />
                        </div>
                        <div>
                            <label  className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                            <input  onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Password"className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
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
                            <button type="submit" className=" bg-red-500 w-[10rem] mb-4 h-[2rem] text-white border rounded-xl  ">Sign in</button>
                            <p className="text-sm font-normal fonr-sans text-start">
                                Don’t have an account yet? <span className="font-medium  hover:underline text-red-500">Sign up</span>
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