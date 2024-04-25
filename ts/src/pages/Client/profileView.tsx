import { Fragment, useEffect, useState } from "react";
import PaymentIcon from '@mui/icons-material/Payment';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { Toaster } from "react-hot-toast";
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import ProfileReviews from "../../components/General/profile/profileReviews";
import { useSelector } from "react-redux";
import { ROOTSTORE } from "../../redux/store";
import DisplayResume from "../../components/General/viewsPages/resumeView";
import formatRelativeTime, { formatMongoDate } from "../../util/timeFormating";
import { IMG_URL } from "../../constant/columns";
import { Dialog, Transition } from '@headlessui/react'
import { message } from "antd";
import { getEducations } from "../../services/commonApiService";


export interface UserProfile {
    _id: string
    Last_name: string;
    First_name: string;
    Password: string;
    Email: string;
    Number: string;
    Profile: {
        profile_Dp: string;
        Description: string;
        Title: string;
        Skills: string[];
        Work_Experiance: string[];
    };
    Address: string;
    PinCode: string;
    City: string;
    Country: string;
    bankDetails?: string;
    lastSeen?: Date;
    isBlock?: boolean;
    online?: boolean;
    isVerify?: boolean;
    isNumberVerify?: boolean;
    createdAt: Date
    updatedAt: Date
    resume?: string
    educations: [{
        institution: string
        educations: string
        endDate: Date
        startDate: Date
        degree: string
        fieldOfStudy: string

    }]
}
const Profile = () => {

    const basicData = useSelector((state: ROOTSTORE) => state.signup)
    const [datas, setData] = useState<UserProfile>()
    const [showAllSkills, setShowAllSkills] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState(false)
    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }
    const getTalentEductations = async (educations: UserProfile["educations"], role: string) => {
        try {
            const data = await getEducations(educations, role)
            setData((prevData: UserProfile | undefined) => {
                if (!prevData) {
                    return;
                }
                return {
                    ...prevData,
                    educations: data.data.data
                };
            });
        } catch (err) {
            message.error("While fetching educatins got error")
        }

    }
    useEffect(() => {
        const dataString = localStorage.getItem("profileData");
        const data: UserProfile = dataString ? JSON.parse(dataString) : null;
        setData(data)
        if (basicData.role === "CLIENT") {
            getTalentEductations(data?.educations, basicData.role)
        }
        return () => {
            localStorage.removeItem("profileData")
        }
    }, [])

    const truncatedDescription: string | undefined = datas?.Profile?.Description?.slice(0, 200);
    const [showMore, setShowMore] = useState(false);
    const toggleShowMore = () => {
        setShowMore(!showMore);
    };
    const [showResume, setShowResume] = useState<boolean>(false)
    const closeShowResume = () => setShowResume(!showResume)

    return (<>
        <div className="bg-blue-700 absolute -z-10 w-full h-[50vh] ">
        </div>
        <div>
            <div className="flex items-center mt-10 flex-row justify-center ">
                <div className="w-[48rem] m-5 flex  rounded-xl  h-[20rem] shadow-xl  border bg-white">
                    <div className=" xl:w-[13rem] m-5  sm:w[10rem] md:[14rem] ">
                        <div>
                            <img className="border border-red-500 rounded-xl w-full h-44" src={`${IMG_URL}${datas?.Profile.profile_Dp}`} alt="Loading" />
                        </div>
                        <div className="m-2 w-[18rem] mt-2">
                            <p className="font-sans font-normal text-sm">from : {datas?.Country}, {datas?.City}</p>
                            <span className="font-sans font-normal text-xs" >Last seen {formatRelativeTime(datas?.updatedAt as Date)} </span><br />
                            <EditCalendarRoundedIcon fontSize="inherit" />
                            <span className="font-sans font-normal text-xs ml-2">  Joined {formatMongoDate(datas?.createdAt as Date)}</span>
                        </div>
                        {
                            datas?.resume ? <>
                                <button
                                    onClick={closeShowResume}
                                    className="px-2 py-1 font-sans font-semibold rounded-full  border text-xs  border-red-500 text-red-500 " >Show Resume</button>
                                <DisplayResume
                                    pdfUrl={datas?.resume}
                                    open={showResume}
                                    closeModal={closeShowResume}
                                />
                            </> : <>
                                <div className="flex  items-center justify-center   ">
                                    <p className="font-semibold font-sans text-sm text-red-500">{basicData.role === "CLIENT" && "Freelancer not uploaded resume"}</p>
                                </div>
                            </>
                        }
                    </div>
                    <div className=" w-full ">
                        <div className={`flex justify-between ${basicData.role == "TALENT" ? "mb-4 " : ""}`}>
                            <div className="mt-4">
                                <p className="text-2xl font-sans font-bold">{datas?.First_name},  {datas?.Last_name}</p>
                                <p className=" font-sans font-medium opacity-45">{datas?.Profile?.Title}</p>
                            </div>
                        </div>
                        <Toaster
                            position="top-left"
                            reverseOrder={false}
                        />
                        <div className="mr-3 mt-2">
                            <p className="text-gray-700 font-sans font-normal text-sm">
                                {showMore ? datas?.Profile?.Description : `${truncatedDescription}...`}
                                <span
                                    className="text-red-500 font-bold cursor-pointer"
                                    onClick={toggleShowMore}
                                >
                                    {showMore ? 'Show less' : 'Show more'}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-[22rem] h-[20rem] rounded-xl shadow-xl   border bg-white">
                    <p className="m-4 font-sans font-medium">Verifications</p>
                    <hr />
                    <div className="flex items-center m-8 justify-between">
                        <PaymentIcon fontSize="small" />
                        <span className="text-start  font-normal font-sans">Payment Verify</span>
                        <span className={`${datas?.bankDetails ? "text-green-500" : "text-blue-600"} ml-12 hover:text-red-500`} >{datas?.bankDetails ? "Verified" : "Not Verified"} </span>
                    </div>
                    <div className="flex items-center m-8 justify-between">
                        <LocalPhoneIcon fontSize="small" />
                        <span className="font-normal font-sans "> Number Verify</span>
                        <span
                            className={`${datas?.isNumberVerify ? "text-green-500" : "text-blue-600"} ml-12 hover:text-red-500`}> {datas?.isNumberVerify ? "Verified" : "Not Verified"} </span>
                    </div>
                    <div className="flex items-center justify-between m-8">
                        <EmailIcon fontSize="small" />
                        <span className="font-normal font-sans">Email Verify</span>
                        <span className="text-green-500 ml-12 hover:text-red-500">
                            Verified
                        </span>
                    </div>
                </div >
            </div>
            {
                basicData.premiumUser ?
                    <>
                        <div className={`flex items-center  flex-row  ml-[6rem]  `}>
                            <div className="w-[48rem] m-5 rounded-xl  border h-[20rem]   shadow-2xl ">
                                <div className="flex justify-between">
                                    <p className="m-4 font-sans font-medium">Contact Details</p>
                                </div> <hr />
                                <div className=" ">
                                    <div className="w-full max-w-lg m-5">
                                        <div className="flex flex-wrap -mx-3 mb-1">
                                            <div className="w-full px-3">
                                                <label className="block  tracking-wide text-gray-900 text-xs font-bold mb-2" >
                                                    Address
                                                </label>
                                                <input className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-2 px-2 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" readOnly placeholder={datas?.Address} />
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-1">
                                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                <label className="block  tracking-wide text-gray-900 text-xs font-bold mb-2" >
                                                    City Name
                                                </label>
                                                <input readOnly className="appearance-none block w-full bg-gray-200 text-gray-900 border  rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder={datas?.City} />
                                            </div>
                                            <div className="w-full md:w-1/2 px-3">
                                                <label className="block  tracking-wide text-gray-900 text-xs font-bold mb-2" >
                                                    Country Name
                                                </label>
                                                <input readOnly className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" placeholder={datas?.Country} />
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-1">
                                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                <label className="block  tracking-wide text-gray-900 text-xs font-bold mb-2" >
                                                    Zip code/ Pincode                                </label>
                                                <input readOnly className="appearance-none block w-full bg-gray-200 text-gray-900 border  rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder={datas?.PinCode} />
                                            </div>
                                            <div className="w-full md:w-1/2 px-3">
                                                <label className="block  tracking-wide text-gray-900 text-xs font-bold mb-2">
                                                    Phone number                                </label>
                                                <input readOnly className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" placeholder={datas?.Number} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                basicData.role === "CLIENT" && (
                                    <div className="w-[22rem] h-auto rounded-2xl border shadow-xl">
                                        <div className="flex justify-between">
                                            <p className="m-4 font-sans font-medium">Top Skills</p>
                                        </div>
                                        <hr />
                                        <div className="flex flex-col space-y-5 items-start m-5">
                                            {
                                                datas && datas.Profile && datas.Profile.Skills && datas.Profile.Skills.length > 0 ? (
                                                    datas?.Profile?.Skills.slice(0, 5).map((value: string, key: number) => (
                                                        <span className="text-start font-semibold font-sans" key={key}>
                                                            {value}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <p className="font-sans font-medium text-red-300">No Skills added yet</p>
                                                )
                                            }
                                            {showAllSkills && datas?.Profile?.Skills.slice(5).map((value: string, key: number) => (
                                                <span className="text-start font-semibold font-sans" key={key}>
                                                    {value}
                                                </span>
                                            ))}
                                            {datas?.Profile?.Skills && datas.Profile.Skills.length > 5 && (
                                                <button
                                                    className="text-blue-500 font-semibold hover:underline items-center m-auto"
                                                    onClick={() => setShowAllSkills(!showAllSkills)}
                                                >
                                                    View All
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </>
                    :
                    <>
                    </>
            }
            <div className="flex gap-4  mt-10 flex-row m-1 mb-5 ml-[7rem] ">
                <div>
                    <ProfileReviews id={basicData.id || ""} />
                </div>
                {
                    datas?.Profile && datas?.Profile?.Work_Experiance && datas?.Profile?.Work_Experiance.length > 0 ? <div className="w-[22rem]  h-auto rounded-2xl  border shadow-xl ">
                        <div className="flex justify-between">
                            <p className="m-4 font-sans font-medium">Experiance</p>
                        </div>
                        <hr />
                        <div className="flex flex-col space-y-5 items-start m-5 ">
                            {datas?.Profile?.Work_Experiance[0] ? (
                                <>
                                    <p className="text-gray-700 text-md font-sans font-medium">
                                        {datas?.Profile?.Work_Experiance[0]}
                                    </p>
                                </>
                            ) : (
                                <p className="text-center text-3xl font-sans font-medium">Fresher</p>
                            )}
                        </div>
                    </div> : null
                }
            </div>
            {
                basicData.role === "CLIENT" && datas?.educations.length && <>
                    <Transition appear show={isOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={closeModal}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-black/25" />
                            </Transition.Child>
                            <div className="fixed inset-0 overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center p-4 text-center">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg  font-medium leading-6 text-gray-900"
                                            >
                                                Educations
                                            </Dialog.Title>
                                            <div className="mt-5">
                                                {
                                                    datas?.educations?.map((education, index: number) => (
                                                        <>
                                                            <div className="flex items-center gap-2 mt-5">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                                                                </svg>
                                                                <p key={index} className="text-gray-700 text-sm font-sans font-medium">
                                                                    {education?.degree} in {education?.fieldOfStudy}
                                                                </p>
                                                            </div>
                                                            <p key={index} className="text-gray-700 text-sm font-sans font-medium">
                                                                {education?.institution}
                                                            </p><span key={index} className="text-gray-700 font-sans font-normal text-xs mb-10">{formatMongoDate(education?.startDate as Date)} - {formatMongoDate(education?.endDate as Date)}</span><p className="text-gray-700 font-sans font-normal text-sm">
                                                            </p>
                                                            <hr className="mt-4 " />
                                                        </>
                                                    ))
                                                }
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                    <div className="rounded-xl h-auto shadow-2xl border bg-white w-[48rem] ml-[7rem] mb-5">
                        <div className="flex justify-between">
                            <p className="m-4 font-sans font-medium flex gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                                </svg>
                                Education</p>
                        </div>
                        <hr />
                        <div className="flex flex-col space-y-2 items-start m-5">
                            <>
                                <p className="text-gray-700 text-md font-sans font-medium">
                                    {datas?.educations[0]?.degree} in {datas?.educations[0]?.fieldOfStudy}
                                </p>
                                <p className="text-gray-700 text-md font-sans font-medium">
                                    {datas?.educations[0]?.institution}
                                </p>
                                <span className="text-gray-700 font-sans font-normal text-xs">{formatMongoDate(datas?.educations[0]?.startDate as Date)} - {formatMongoDate(datas?.educations[0]?.endDate as Date)}</span>
                                <p className="text-gray-700 font-sans font-normal text-sm">
                                </p>
                            </>
                        </div>
                        <p className="text-blue-500 text-center justify-center  text-sm hover:cursor-pointer mb-5" onClick={openModal}>{datas?.educations?.length > 2 ? "View all" : "View"}</p>
                    </div>
                </>
            }
        </div>
    </>
    );
}
export default Profile;