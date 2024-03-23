import Footer from "../../../components/General/Home/footer/footer";
import AfterLoginHeader from "../../../components/General/Home/Header/afterLoginHeader";
import ProfileTalentDetailsFirst from "../../../components/General/profileTalentDetailsFirst";
import ProfileVerifications from "../../../components/General/profileVerifications";
import ProfileContact from "../../../components/General/profileConatct";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../../context/myContext";
import { getUserProfileDetails } from "../../../services/talentApiService";
import ProfileSkills from "../../../components/General/profileSkills";
import ProfileExperiance from "../../../components/General/profileExperiance";
import ProfileReviews from "../../../components/General/profileReviews";
import { AxiosError } from "axios"
import { BankDetails } from "../../../components/General/bankDetilsSection";

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
    resume?: string
}

const Profile = () => {
    const [datas, setData] = useState<UserProfile>()
    const { role }: { role: string } = useContext(MyContext) || { role: "" };
    const getUserProfile = () => {
        getUserProfileDetails(role)
            .then((res) => {
                setData(res?.data?.data)
            }).catch((err: AxiosError) => {
                console.log(err)
            })
    }
    useEffect(() => {
        if (role) {
            getUserProfile();
        }
    }, [role]);


    return (<>
        <div>
            <AfterLoginHeader />
            <div className="bg-blue-700 absolute -z-10 w-full h-[50vh] ">
            </div>
            <div className="flex  container justify-center mt-10 gap-10 mb-5 ">
                <div className="grid grid-col-12 gap-10">
                    <div className="">
                        <ProfileTalentDetailsFirst datas={datas} onUpdate={getUserProfile} />
                    </div>  
                    <div className={`flex items-center  flex-row justify-center `}>
                        <ProfileContact data={datas} onUpdate={getUserProfile} />
                    </div>
                    <div>
                        <BankDetails data={datas?.bankDetails} onUpdate={getUserProfile} />
                    </div>
                    <ProfileReviews />
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
        </div>
    </>);
}



export default Profile;