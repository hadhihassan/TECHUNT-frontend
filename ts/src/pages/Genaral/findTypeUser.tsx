import React, { useState } from "react";
import Header from "../../components/General/Home/Header/header";
import Footer from "../../components/General/Home/footer/footer";
import { useSelector, useDispatch } from "react-redux";
import { INITIALSTATE, setRole } from "../../redux/Slice/signupSlice";
import { ROOTSTORE } from "../../redux/store";
import Avatar from "react-avatar";
import { Typerole } from "../../components/interface/loginSliceType"
import { useNavigate } from "react-router-dom";
import routerVariables from '../../routes/pathVariables'



const FindTypeUser: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { email }: INITIALSTATE = useSelector(
        (state: ROOTSTORE) => state.signup
    );
    const data: INITIALSTATE = useSelector(
        (state: ROOTSTORE) => state.signup
    );

    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [_UserType, setUserType] = useState<Typerole["type"]>("NOTHING")
    const options = ["Client", "Freelancer"];

    const handleRadioChange = (index: number): void => {
        setSelectedOption(index);
    };

    const handleType = (index: Number) => {
        if (index === 1) {
            setUserType("TALENT")
            console.log("THIS WILL BE TALENT",_UserType)
        } else if (index === 0) {
            setUserType("CLIENT")
            console.log("THIS WILL BE CIENT" ,_UserType)
        }
    }

    const handleClickBtn = () => {
        console.log("dispatch work", _UserType);
        dispatch(setRole(_UserType))
        navigate(routerVariables.signup)
    }

    const radios = options.map((option, index) => (
        <label onClick={() => handleType(index)}
            key={index}
            className={`w-[270px] h-[200px] rounded-[10px] border ${selectedOption === index ? "bg-red-500 border-red-500" : "bg-white"
                } bg-opacity-10 cursor-pointer border-black inline-block m-2`}
        >
            <input
                type="radio"
                name="colorOption"
                checked={selectedOption === index}
                onChange={() => handleRadioChange(index)}
            />
            <div className="text-center">
                <p>
                    {option} <br />
                    <small className="w-[181px] text-black text-[13px] font-medium font-['Montserrat']">
                        {index === 0
                            ? "I’m a client, hiring for a project.."
                            : " I’m a freelancer, looking for work. Apply as a Freelancer."}
                    </small>
                </p>
            </div>
        </label>
    ));

    return (
        <div>
            <Header layout={true} />
            <div className="w-full flex justify-center items-center">
                <div className="w-[700px] flex space-y-14 items-center  xl:[700px] md:w[1100px] sm:w-[700px] xs:w[550px] flex-col h-[40rem] mt-16 mb-16 border shadow-2xl rounded-lg">
                    <div className="h-[10rem]">
                        <div className="text-center pt-9 text-stone-800 text-[33px] font-semibold font-sans line-clamp-2">
                            Complete your free account<br />setup
                        </div>
                        <div className="flex justify-center items-center pt-5">
                            {/* <Avatar name={email} size="40" round /> */}
                            <div className="opacity-70 text-center text-stone-800 text-sm ml-1 font-medium font-['Montserrat'] underline">
                                {/* {email ? email : "hadhi@gmail.com"} */}
                            </div>
                        </div>
                    </div>
                    <div className="flex w-[40rem] h-[200px] justify-around pt-10 items-center">
                        {radios}
                    </div>
                    <div className="pt-6">
                        <button onClick={handleClickBtn} className="w-[392px] h-[45px] bg-red-500 text-white rounded-[100px]">Create My Account</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default FindTypeUser;
