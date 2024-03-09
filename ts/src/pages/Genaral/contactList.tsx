import { LeftCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";

const ContactListPage = () => {
    const [activeTab, setActiveTab] = useState<number>(1);
    const handleTabClick = (tabNumber: React.SetStateAction<number>) => {
        setActiveTab(tabNumber);
    };
    return <>
        <div className="bg-blue-800 opacity-4     absolute -z-10 w-full h-[50vh]" >
        </div>
        <div className="container grid ">
            <Button
                className='border text-white flex w-20 px-4 mx-20 my-9 font-sans justify-center items-center rounded-xl '
                onClick={() => {
                    history.back()
                }}>
                <LeftCircleOutlined />
                Back
            </Button>
            <h1
                className=' text-white font-semibold text-2xl mx-20 font-sans  '
            >
                My Contracts
            </h1>
            <div className="w-[90%] mt-1 m-auto">
                <div className="flex justify-between mb-5 sm:grid-cols-3">
                    <button
                        onClick={() => handleTabClick(1)}
                        className={`text-sans font-semibold mr-5 px-4 py-2  focus:outline-none ${activeTab === 1 ? 'text-red-500   transition duration-500' : 'text-white '}`}
                    >
                        Active contracts (02)
                    </button>
                    <button
                        onClick={() => handleTabClick(2)}
                        className={`text-sans font-semibold mr-5 px-4 py-2 focus:outline-none ${activeTab === 2 ? 'text-red-500  transition duration-500' : 'text-white '}`}
                    >
                        Completed contracts (02)
                    </button>
                    <button
                        onClick={() => handleTabClick(3)}
                        className={`text-sans font-semibold mr-5 px-4 py-2 focus:outline-none ${activeTab === 3 ? 'text-red-500  transition duration-500' : 'text-white '}`}
                    >
                        Pending contract (02)
                    </button>
                    <button
                        onClick={() => handleTabClick(4)}
                        className={`text-sans font-semibold mr-5 px-4 py-2 focus:outline-none ${activeTab === 4 ? 'text-red-500  transition duration-500' : 'text-white '}`}
                    >
                        New  (02)
                    </button>
                </div>
            </div>
            <div className=" mx-auto px-4 h-auto bg-white  border-2 shadow-2xl border-gray-300  rounded-xl w-[90%]   ">
                <div className=" mt-4 border flex justify-between h-auto border-gray-400 rounded-xl">
                    <div className="m-4 w-auto h-auto">
                        <h1 className="font-sans font-medium text-gray-900 underline ">Contract of web designing </h1>
                        <h1 className="font-sans font-semibold text-gray-500  text-sm">Client name: sam  </h1>
                        <h1 className="font-sans font-semibold text-gray-500  text-sm">Total 10 Milestone  </h1>
                        <h1 className="font-sans font-semibold text-gray-900 underline  m-1">Terms Conditions </h1>
                        <p className="font-sans font-semibold text-gray-500  text-xs text-start">
                            Hi, *This post is to search for Russian Preschool Lesson Planner* I am looking for someone who has good experience in formulating lesson plans for formative years (Kindergarten/Preschool). We have a set of 100s of
                            Hi, *This post is to search for Russian Preschool Lesson Planner* I am looking for someone who has good experience in formulating lesson plans for formative years (Kindergarten/Preschool). We have a set of 100s of
                            Hi, *This post is to search for Russian Preschool Lesson Planner* I am looking for someone who has good experience in formulating lesson plans for formative years (Kindergarten/Preschool). We have a set of 100s of
                            Hi, *This post is to search for Russian Preschool Lesson Planner* I am looking for someone who has good experience in formulating lesson plans for formative years (Kindergarten/Preschool). We have a set of 100s of
                            Hi, *This post is to search for Russian Preschool Lesson Planner* I am looking for someone who has good experience in formulating lesson plans for formative years (Kindergarten/Preschool). We have a set of 100s of
                            Hi, *This post is to search for Russian Preschool Lesson Planner* I am looking for someone who has good experience in formulating lesson plans for formative years (Kindergarten/Preschool). We have a set of 100s of
                        </p>
                    </div>
                    <div className="flex justify-center w-auto ">
                        <Button className="m-3">Show details</Button>
                    </div>
                </div>
            </div>
        </div>
    </>;
}



export default ContactListPage;