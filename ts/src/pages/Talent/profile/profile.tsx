import Footer from "../../../components/General/Home/footer/footer";
import AfterLoginHeader from "../../../components/General/Home/Header/afterLoginHeader";
import ProfileTalentDetailsFirst from "../../../components/General/profileTalentDetailsFirst";
import ProfileVerifications from "../../../components/General/profileVerifications";
import ProfileConatct from "../../../components/General/profileConatct";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../../context/myContext";
import { getUserProfileDetails } from "../../../api/talent.Api";
import ProfileSkills from "../../../components/General/profileSkills";
import ProfileExperiance from "../../../components/General/profileExperiance";
import ProfileReviews from "../../../components/General/profileReviews";


const profile = () => {
    const [datas, setData] = useState<{} | any>({})
    const { role }: any = useContext(MyContext);
    console.log(role)

    const getUserProfile = () => {
        console.log("get user profile");

        getUserProfileDetails(role)
            .then((res: any) => {
                console.log(res,"this is reponse for geting profile")
                setData(res.data.data)
            }).catch((err: any) => {
                console.log(err)
            })
    }

    useEffect(() => {
        if (role) {
            getUserProfile();
        }
    }, [role]);


    return (<div>
        <AfterLoginHeader />
        <div className="bg-blue-700 absolute -z-10 w-full h-[50vh] ">
        </div>
        <div className="flex items-center mt-10 flex-row justify-center ">
            <ProfileTalentDetailsFirst datas={datas} onUpdate={getUserProfile} />
            <ProfileVerifications />
        </div>
        <div className={`flex items-center  flex-row  ${role === "CLIENT" ? "ml-[6rem]" : "justify-center"} `}>
            <ProfileConatct data={datas} onUpdate={getUserProfile} />
            {
                role === "CLIENT" ? null : <ProfileSkills data={datas} onUpdate={getUserProfile}/>
            }
        </div>
        <div className="flex items-center  flex-row m-1 mb-5">      
            {
                role === "CLIENT" ? null : <ProfileExperiance data={datas} onUpdate={getUserProfile}/>
            }
        </div>
        <ProfileReviews />
        <Footer />
    </div>);
}



export default profile;