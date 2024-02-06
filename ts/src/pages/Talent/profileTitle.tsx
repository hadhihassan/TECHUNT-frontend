import Avatar from "react-avatar";
import Header from "../../components/General/Home/Header/header";
import Footer from "../../components/General/Home/footer/footer";
import { ProgressBar } from "../../components/General/progressBar";
import { useSelector } from "react-redux";
import { ROOTSTORE } from "../../redux/store";
import Button from '@mui/material/Button'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { talent_routes } from "../../util/pathVariables";



const ProfileTitle: React.FC = () => {
    const navigate = useNavigate()
    const data = useSelector((state: ROOTSTORE) => state.signup)
    const [title, setTitle] = useState<string>("")
    const saveProfileTitle = (e: React.FormEvent) => {
        e.preventDefault()
        let data: {} = {
            title
        }
        localStorage.setItem("talent_Data", JSON.stringify(data));
        setTitle("")
        navigate(talent_routes.AddWorkExperiance)
    }
    return (<div>
        <Header layout={true} />
        <div className="w-full flex justify-center items-center">
            <div className="w-[700px] flex justify-center  items-center  xl:[700px] md:w[1100px] sm:w-[650px] xs:w[550px] flex-col h-[30rem] mt-16 mb-16 border shadow-2xl rounded-lg">
                <Button />
                <div className="w-[80%] h-[95%]" >
                    <div className="flex w-full pt-9">
                        <div className="flex items-center justify-center">
                            <div>
                                <Avatar name={data.email} size="33" round />
                            </div>
                            <div className="text-opacity-40  text-center text-stone-800 text-xs ml-1 font-medium font-sans underline">
                                {data.email ? data.email : "hadhi@gmail.com"}
                            </div>
                        </div>
                        <div className="pl-[5rem] pt-1.5">
                            <p className="text-xl font-medium tracking-tight text-gray-900 ">Create profile</p>
                        </div>
                    </div>
                    <div className="mt-10">
                        <div className="flex justify-between">
                            <p onClick={() => history.back()}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                            </p>
                            <p>1/2</p>
                        </div>
                        <div className="pt-2 ">
                            <ProgressBar value={10} />
                        </div>
                    </div>
                    <div className="mt-6">
                        <form onSubmit={saveProfileTitle}>

                            <div className="w-full ">
                                <h1 className="text-2xl font-medium tracking-tight text-gray-900 ">First, add a title to tell the world what you do.</h1>
                                <p className="text-xs pt-4   font-normal">Write here the write the title of the work .</p>

                                {/* <label className="block mt-5 mb-5 text-sm font-medium ">Profile description</label> */}
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    id="message"
                                    className="block mt-4 p-2.5 w-full text-sm bg-gray-50 rounded-lg border  focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:text-neutral-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Example: Web developer | Web & Mobile"
                                ></input>

                                <label className="block mt-1  text-xs font-medium text-end ">500 characters</label>
                            </div>
                            <div className="flex justify-center items-center">
                                <button
                                    className="w-[250px] mx-auto items-center text-white h-[35.31px] mt-8 bg-red-500 rounded-[100px]">Next</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>)
}



export default ProfileTitle;