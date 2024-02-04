import { useState } from "react";
import Header from "../../components/General/Home/Header/header";
import Footer from "../../components/General/Home/footer/footer";
import { Login } from "../../api/client.Api";
import { useSelector } from "react-redux";
import { ROOTSTORE } from "../../redux/store";
import { INITIALSTATE } from "../../redux/Slice/signupSlice";
import { useNavigate } from "react-router-dom";
const LoginPage: React.FC = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const role: INITIALSTATE["role"] = useSelector((state: ROOTSTORE) => state.signup.role)
    const handleEmailSubmit: (e: React.FormEvent) => void = (e) => {
        e.preventDefault()

        Login({ email, password }, role)
            .then((res: {}) => {
                if (res) {
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
                <div className="w-[700px] flex justify-center  items-center  xl:[700px] md:w[1100px] sm:w-[650px] xs:w[550px] flex-col h-[30rem] mt-16 mb-16 border shadow-2xl rounded-lg">
                    <form
                        className='flex flex-col'
                        action=""
                        onSubmit={handleEmailSubmit}
                    >
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-[460px] mb-5 h-[35] rounded-[100px] border border-black block w-full p-4 text-gray-900 border-gray-300"
                            id="username"
                            type="text"
                            placeholder="Email Address"
                        />
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-[460px] h-[35] rounded-[100px] border border-black block w-full p-4 text-gray-900 border-gray-300"
                            id="username"
                            type="text"
                            placeholder="Password"
                        />
                        <button
                            //  onClick={verifyEmail}
                            className="w-[460px] text-white h-[30] mt-8 bg-red-500 rounded-[100px]"
                            type="submit"
                        >
                            Continue with Email
                        </button>
                    </form>

                </div>
            </div>
            <Footer />
        </div>
    );
}



export default LoginPage;