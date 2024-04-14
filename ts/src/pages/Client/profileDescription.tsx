import React from "react";
import Avatar from "react-avatar";
import Header from "../../components/General/Home/Header/header";
import Footer from "../../components/General/Home/footer/footer";
// import { ProgressBar } from "../../components/General/ui/progressBar";
import { useSelector } from "react-redux";
import { ROOTSTORE } from '../../redux/store'
import { useDispatch } from "react-redux";
import { setDescription } from "../../redux/Slice/clientSlice";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clientRoutes } from "../../routes/pathVariables";
import Alert from '@mui/material/Alert';




const ProfileDescription = () => {
    const data = useSelector((state: ROOTSTORE) => state.signup)
    const data1 = useSelector((state: ROOTSTORE) => state.client)
    const navigate = useNavigate()

    console.log(data1);

    const dispatch = useDispatch()
    const [_description, addDescription] = useState("")
    const [lengthError, setLenghtError] = useState<string>("")
    const handleType: (event: ChangeEvent<HTMLTextAreaElement>) => void = (event) => {
        if (_description.trim() === "") {
            setLenghtError("Description is required")
        } else if (_description.trim().length < 99) {
            setLenghtError("Description must be more than 100 letters")
        } else if (_description?.length && _description?.length > 440) {
            setLenghtError("Description going long maximum 450 characters")
        } else {
            setLenghtError("")
        }
        addDescription(event.target.value)
    }
    const saveProfileDescription: (event: React.FormEvent) => void = (event) => {
        event.preventDefault()
        if (_description.trim() === "") {
            setLenghtError("Description is required")
        } else {

            if (!lengthError) {
                console.log(data1);
                dispatch(setDescription(_description))
                addDescription("")
                navigate(clientRoutes.ADD_CONTACT_DETAILS)
            }
        }
    }
    return (
        <div>
            <Header layout={true} />
            <div className="w-full flex justify-center items-center ">
                <div className="  space-y-14 flex justify-center items-center xl:[700px] md:w[1100px] sm:w-[700px] xs:w[550px] flex-col h-[40rem] mt-16 mb-16 border shadow-2xl rounded-lg">
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
                            <div className="pt-5 ">
                                {/* <ProgressBar value={100} /> */}
                            </div>
                        </div>
                        {lengthError && <Alert severity="warning">{lengthError}</Alert>}
                        <form onSubmit={saveProfileDescription}>
                            <div className="w-full pt-10">
                                <h1 className="text-2xl font-medium tracking-tight text-gray-900 ">Add Profile Descrption.</h1>
                                <p className="text-xs pt-5 font-normal">personalized space within the application where users can showcase and manage key information about themselves.</p>
                                <label className="block mt-5 mb-5 text-sm font-medium ">Profile description</label>
                                <textarea
                                    value={_description}
                                    onChange={handleType}
                                    id="message"
                                    rows={7}
                                    className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:text-neutral-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Write your profile description here..."
                                ></textarea>
                                <label className="block mt-1  text-xs font-medium text-end ">450 characters</label>
                            </div>
                            <div className="flex justify-center items-center">
                                <button
                                    className="w-[250px] mx-auto items-center text-white h-[35.31px] mt-4 bg-red-500 rounded-[100px]">Next</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}



export default ProfileDescription;