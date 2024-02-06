import Footer from "../../../components/General/Home/footer/footer";
import AfterLoginHeader from "../../../components/General/Home/Header/afterLoginHeader";
import IMG from '../../../assets/images.png';
import ProfileTalentDetailsFirst from "../../../components/General/profileTalentDetailsFirst";
import ProfileVerifications from "../../../components/General/profileVerifications";
import ProfileConatct from "../../../components/General/profileConatct";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../../context/myContext";
import { getUserProfileDetails } from "../../../api/talent.Api";
import ProfileSkills from "../../../components/General/profileSkills";


const profile = () => {
    const [datas, setData] = useState<{} | any>({})
    const { role }: any = useContext(MyContext);
    console.log(role)
    useEffect(() => {
        if (role) {
            getUserProfileDetails(role)
                .then((res: any) => {
                    console.log(res.data.data.First_name)
                    setData(res.data.data)
                }).catch((err: any) => {
                    console.log(err)

                })
        }
    }, [role]);

    return (<div>
        <AfterLoginHeader />
        <div className="bg-blue-700 absolute -z-10 w-full h-[50vh] ">
        </div>
        <div className="flex items-center mt-10 flex-row justify-center ">
            <ProfileTalentDetailsFirst datas={datas} />
            <ProfileVerifications />
        </div>
        <div className="flex items-center  flex-row justify-center">
            <ProfileConatct data={datas} />
           <ProfileSkills data={datas}/>
        </div>
        <div className="flex items-center  flex-row m-1 mb-5">
            <div className="w-[48rem] ml-28 rounded-xl h-[18rem] shadow-2xl border bg-white">
                <div className="flex justify-between">
                    <p className="m-4 font-sans font-medium">Work Experience</p>
                    <button className="w-[5rem] mt-3 mr-2 font-sans font-medium rounded-full h-7 border border-red-500 text-red-500">Edit</button>
                </div>
                <hr />
                <div className="flex flex-col space-y-5 items-start m-5">
                    <p className="text-gray-700 text-md font-sans font-medium">{datas?.Profile?.Work_Experiance[0]}</p>
                    {/* <span className="text-gray-700 font-sans font-normal text-xs">2019- 2021</span> */}
                    {/* <p className="text-gray-700 font-sans font-normal text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod.Lorem  ipsum dolor sit amet, */}
                    {/* consectetur adipiscing elit,sed do eiusmod.Lorem ipsum  dolor sit amet, consectetur adipiscing */}
                    {/* elit,sed do eiusmod.</p> */}
                </div>
                <hr />
                <p className=" mt-4 text-blue-500 text-center">View All</p>
            </div>
        </div>

        <div className="flex items-center  flex-row m-1 mb-5">
            <div className="w-[48rem] ml-28 rounded-xl h-[22rem] shadow-2xl border bg-white">
                <div className="flex justify-between">
                    <p className="m-4 font-sans font-medium">Reviews</p>
                </div>
                <hr />
                <div className="flex justify-evenly items-center m-5">
                    <div className="bg-gray-200 border rounded-md flex w-[18rem] h-[12rem]">
                        <div>
                            <img src={IMG} className="w-10 h-10 border rounded-full m-5" alt="" />
                        </div>
                        <div>
                            <p className="text-xs m-5 font-sans font-normal">The freelance talent we work with are more
                                productive than we ever thought possible.
                                The freelance talent we work with are more
                                productive than.</p>
                            <p className="text-2xl m-5">Sam Crockett</p>
                            <p className="text-xs m-5 font-sans font-normal">Independent Web Developer</p>
                        </div>
                    </div>
                    <div className="bg-gray-200 border rounded-md flex w-[18rem] h-[12rem]">
                        <div>
                            <img src={IMG} className="w-10 h-10 border rounded-full m-5" alt="" />
                        </div>
                        <div>
                            <p className="text-xs m-5 font-sans font-normal">The freelance talent we work with are more
                                productive than we ever thought possible.
                                The freelance talent we work with are more
                                productive than.</p>
                            <p className="text-2xl m-5">Sam Crockett</p>
                            <p className="text-xs m-5 font-sans font-normal">Independent Web Developer</p>
                        </div>
                    </div>
                </div><hr />
                <p className="mt-4 text-blue-500 text-center">View All</p>
            </div>
        </div>

        <Footer />
    </div>);
}



export default profile;