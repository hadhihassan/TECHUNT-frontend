import { useEffect, useState } from "react";
import PaymentIcon from '@mui/icons-material/Payment';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { Toaster } from "react-hot-toast";
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import CurrencyRupeeTwoToneIcon from '@mui/icons-material/CurrencyRupeeTwoTone';
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone';
import ProfileReviews from "../../components/General/profileReviews";
import { useSelector } from "react-redux";
import { ROOTSTORE } from "../../redux/store";
import { ProposalInterface } from "../../interface/interfaces";
import { getAllClientProposalsForTalent } from "../../services/talentApiService";
import { AxiosError, AxiosResponse } from "axios";
interface UserProfile {
    _id:string
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
    lastSeen?: Date;
    isBlock?: boolean;
    online?: boolean;
    isVerify?: boolean;
    isNumberVerify?: boolean;
    createdAt: Date
}
const Profile = () => {

    const basicData = useSelector((state: ROOTSTORE) => state.signup)
    const [proposal, setPropsal] = useState<ProposalInterface[]>([])
    const [datas, setData] = useState<UserProfile>()
    useEffect(() => {
        const data: UserProfile = JSON.parse(localStorage.getItem("profileData") || "")
        setData(data)
        if(basicData.role){
            getAllClientProposalsForTalent(data?._id)
            .then((res: AxiosResponse) => {
                setPropsal(res.data)
            }).catch((err: AxiosError) => {
                console.log(err)
            })
        }
    }, [])
    const truncatedDescription: string | undefined = datas?.Profile?.Description?.slice(0, 200);
    const [showMore, setShowMore] = useState(false);
    const toggleShowMore = () => {
        setShowMore(!showMore);
    };
    return (<>
        <div className="bg-blue-700 absolute -z-10 w-full h-[50vh] ">
        </div>
        <div>
            <div className="flex items-center mt-10 flex-row justify-center ">
                <div className="w-[48rem] m-5 flex  rounded-xl  h-[20rem] shadow-xl  border bg-white">
                    <div className=" xl:w-[13rem] m-5  sm:w[10rem] md:[14rem] ">
                        <div>
                            <img className="border border-black rounded-xl" src={`http://localhost:3000/images/${datas?.Profile.profile_Dp}`} alt="Loading" />
                        </div>
                        <div className="m-2 w-[18rem] mt-2">
                            <p className="font-sans font-normal text-sm">from : {datas?.Country}, {datas?.City}</p>
                            {/* <AccessTimeRoundedIcon fontSize="inherit" /> */}
                            <span className="font-sans font-normal text-xs" >It's currently 4:45 PM here</span><br />
                            <EditCalendarRoundedIcon fontSize="inherit" />
                            <span className="font-sans font-normal text-xs ml-2">  Joined {datas?.createdAt}</span>
                        </div>
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
                        <div className="mt-2 mr-5 flex justify-between">
                            <div>
                                <Stack spacing={1}>
                                    <Rating name="half-rating-read" size="small" defaultValue={2.5} precision={0.5} readOnly />
                                </Stack>
                                <p className="text-gray-500 font-sans font-normal text-sm">4/5 (12 Reviews)</p>
                            </div>
                            <div className="border-r border-solid  border-gray-500 h-8 "></div>
                            <div>
                                <span className="text-gray-500 font-sans font-normal text-sm">Total job post : {proposal.length} <b>0</b> </span>
                            </div><div className="border-r border-solid border-gray-500 h-8"></div>
                            <div>
                                <VerifiedTwoToneIcon fontSize="inherit" color="primary" />
                                <span className="text-gray-500 font-sans ml-1 font-normal text-sm"><b>0</b> projects completed</span>
                            </div>
                        </div>
                        <div className="mr-3 mt-4">
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
                        <span className="text-blue-600 ml-12 hover:text-red-500">Not Verified</span>
                    </div>
                    <div className="flex items-center m-8 justify-between">
                        <LocalPhoneIcon fontSize="small" />
                        <span className="font-normal font-sans ">Phone Number Verify</span>
                        <span
                            className={`${datas?.isNumberVerify ? "text-green-500" : "text-blue-600"} ml-12 hover:text-red-500`}> {datas?.isNumberVerify ? "Verified" : "Not Verified"} </span>
                    </div>
                    <div className="flex items-center justify-between m-8">
                        <EmailIcon fontSize="small" />
                        <span className="font-normal font-sans">Email Verify</span>
                        <span className={`${datas?.isVerify ? "text-green-500" : "text-blue-600"} ml-12 hover:text-red-500`}>
                            {datas?.isVerify ? "Verified" : "Not Verified"}
                        </span>
                    </div>
                </div >
            </div>
            <div className={`flex items-center  flex-row  ml-[6rem]  `}>
                <div className="w-[48rem] m-5 rounded-xl  border h-[20rem]  shadow-2xl ">
                    <div className="flex justify-between">
                        <p className="m-4 font-sans font-medium">Conatct Details</p>
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
                    basicData.role === "CLIENT" &&
                    <div className="w-[22rem] h-[20rem] rounded-2xl   border shadow-xl ">
                        <div className="flex justify-between">
                            <p className="m-4 font-sans font-medium">Top Skills</p>
                        </div>
                        <hr />
                        <div className="flex flex-col space-y-5 items-start m-5">
                            {
                                datas && datas.Profile && datas.Profile.Skills && datas.Profile.Skills.length > 0 ? (
                                    datas?.Profile?.Skills.map((value: string, key: number) => (
                                        <span className="text-start font-semibold font-sans" key={key}>
                                            {value}
                                        </span>
                                    ))
                                ) : (
                                    <p className="font-sans font-medium text-red-300">Add skills here</p>
                                )
                            }
                        </div>
                    </div>
                }
            </div>
            <div className="flex items-center  flex-row m-1 mb-5">
            </div>
            <ProfileReviews />
        </div>
    </>
    );
}
export default Profile;