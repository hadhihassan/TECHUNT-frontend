import { LeftCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";
import NewContract from "../../components/General/contract/new-Contract";
import { useSelector } from "react-redux";
import { ROOTSTORE } from "../../redux/store";
import CompletedContract from '../../components/General/contract/completedContracts'

const ContactListPage: React.FC = () => {

    const role = useSelector((state: ROOTSTORE) => state.signup.role)
    const [activeTab, setActiveTab] = useState<number>(1);
    const tabElements = [<NewContract active={activeTab} />, <CompletedContract />];
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
                <div className={`flex ${role === "TALENT" ? "justify-between" : "justify-evenly"} mb-5 sm:grid-cols-3`}>
                    <button
                        onClick={() => handleTabClick(0)}
                        className={`text-sans font-semibold mr-5 px-4 py-2  focus:outline-none ${activeTab === 0 ? 'text-red-500   transition duration-500' : 'text-white '}`}
                    >
                        Active contracts (02)
                    </button>
                    <button
                        onClick={() => handleTabClick(1)}
                        className={`text-sans font-semibold mr-5 px-4 py-2 focus:outline-none ${activeTab === 1 ? 'text-red-500  transition duration-500' : 'text-white '}`}
                    >
                        Completed contracts (02)
                    </button>{
                        role === "TALENT" && <button
                            onClick={() => handleTabClick(4)}
                            className={`text-sans font-semibold mr-5 px-4 py-2 focus:outline-none ${activeTab === 4 ? 'text-red-500  transition duration-500' : 'text-white '}`}
                        >
                            New  (02)
                        </button>
                    }

                </div>
            </div>
            <div className=" mx-auto px-4 h-auto bg-white  border-2 shadow-2xl border-gray-300  rounded-xl w-[90%]   ">
                <div className="mt-4  md:flex:flex-col xl:flex:flex-col h-auto   rounded-xl ">
                    {tabElements[activeTab]}
                </div>
            </div>
        </div>
    </>;
}



export default ContactListPage;