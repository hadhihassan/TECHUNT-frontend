import Footer from "../../../components/General/Home/footer/footer";
import AfterLoginHeader from "../../../components/General/Home/Header/afterLoginHeader";
import ProfileTalentDetailsFirst from "../../../components/General/profile/profileTalentDetailsFirst";
import ProfileVerifications from "../../../components/General/profile/profileVerifications";
import ProfileContact from "../../../components/General/profile/profileConatct";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../../context/myContext";
import { getUserProfileDetails } from "../../../services/talentApiService";
import ProfileSkills from "../../../components/General/profile/profileSkills";
import ProfileExperiance from "../../../components/General/profile/profileExperiance";
import ProfileReviews from "../../../components/General/profile/profileReviews";
import { BankDetails } from "../../../components/General/viewsPages/bankDetilsSection";
import EducationForm from "../../../components/General/profile/profileEducations";
import Educations from "./education";
import type { EducationType } from '../profile/education'
import { useSelector } from "react-redux";
import { ROOTSTORE } from "../../../redux/store";
import { INITIALSTATE } from "../../../redux/Slice/signupSlice";
import CheckoutForm from "../../../components/General/settings/numberVerifiactions/bankDetailsForm";


export interface UserProfile {
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
    bankDetails: {
        account_holder_name: string
        account_number: number
        account_type: string
        bank_name: string
        ifsc_code: number
        _id: string
    },
    createdAt?: string
    resume?: string,
    educations: EducationType[]
}
interface ApiResponse {
    data: {
        data: UserProfile;
    };
}
const Profile = () => {
    const [datas, setData] = useState<UserProfile>()
    const basicData: INITIALSTATE = useSelector((state: ROOTSTORE) => state.signup)
    const [OpenEducation, setDeducations] = useState<boolean>(false)
    const [openBank, setBanks] = useState<boolean>(false)
    const { role }: { role: string } = useContext(MyContext) || { role: "" };
    const getUserProfile = () => {
        getUserProfileDetails(role)
            .then((res) => {
                if (res) {
                    setData((res as ApiResponse).data?.data)
                }
            })
    }
    const toggleActive = () => {
        setDeducations(prevIsActive => !prevIsActive);
    };
    useEffect(() => {
        if (role) {
            getUserProfile();
        }
    }, [role]);

    return (<>
        <div>
            <AfterLoginHeader />
            <div className="bg-gradient-to-r from-blue-300 to-blue-500 absolute -z-10 w-full h-[50vh] ">
            </div>
            <div className="flex  container justify-center mt-10 gap-10 mb-5 ">
                <div className="grid grid-col-12 gap-10">
                    <div className="">
                        <ProfileTalentDetailsFirst datas={datas} onUpdate={getUserProfile} />
                    </div>
                    <div className="flex items-center  flex-row justify-center">
                        {
                            OpenEducation && <EducationForm onUpdate={getUserProfile} />
                        }
                        {
                            basicData.role === 'TALENT' && <>
                                {
                                    datas?.educations && datas?.educations?.length > 0 ? <Educations data={datas?.educations} onUpdate={getUserProfile} addState={toggleActive} /> : <>
                                        <div className="bg-gray-100 border h-auto w-full p-5  font-semibold rounded-xl">
                                            <p className="text-lg">Which university or school did you attend</p>
                                            <p className="text-sm font-normal">Those who have add there educations more profile view and opportunity </p>
                                            <button className="p-2 mt-2 text-sm rounded-xl  border border-red-500" onClick={() => setDeducations(!OpenEducation)}>Add education</button>
                                        </div>
                                    </>
                                }
                            </>
                        }
                        {
                            datas?.Profile?.Work_Experiance?.length === 0 && <>
                                <div className="bg-gray-100 border h-auto w-full p-5 font-semibold rounded-xl">
                                    <p className="text-lg">Which company or organization did you work for?</p>
                                    <p className="text-sm font-normal">Enhance your profile visibility and opportunities by adding your work experiences.</p>
                                    <button className="p-2 mt-2 text-sm rounded-xl border border-red-500">Add work experience</button>
                                </div>
                            </>
                        }
                    </div>
                    <div className={`flex items-center  flex-row justify-center `}>
                        <ProfileContact data={datas ? { Address: datas.Address, City: datas.City, Country: datas.Country, Number: datas.Number, PinCode: datas.PinCode } : { Address: '', City: '', Country: '', Number: '', PinCode: '' }} onUpdate={getUserProfile} />
                    </div>
                    <div>
                        {
                            Object.keys(datas?.bankDetails || {}).length !== 0 && <BankDetails data={datas?.bankDetails} onUpdate={getUserProfile} />
                        }
                        {
                            Object.keys(datas?.bankDetails || {}).length === 0 && <>
                                <div className="bg-gray-100 border h-auto w-full p-5 font-semibold rounded-xl">
                                    <p className="text-lg">Add your bank details ?</p>
                                    <p className="text-sm font-normal">Enhance your profile visibility and opportunities by adding your bank details.</p>
                                    <button className="p-2 mt-2 text-sm rounded-xl border border-red-500" onClick={() => setBanks(!openBank)}>Add bank details</button>
                                </div>
                            </>
                        }
                        {
                            openBank && <CheckoutForm onUpdate={getUserProfile} />
                        }
                    </div>
                    <ProfileReviews id={basicData.id || ""}  />
                </div>
                <div className="flex flex-col gap-10">
                    <ProfileVerifications />
                    {
                        role === "CLIENT" ? null : <ProfileSkills data={datas} onUpdate={getUserProfile} />
                    }
                    {
                        role === "CLIENT" ? null : <ProfileExperiance data={datas} onUpdate={getUserProfile} />

                    }
                </div>
            </div>
            <Footer />
        </div >
    </>);
}



export default Profile;