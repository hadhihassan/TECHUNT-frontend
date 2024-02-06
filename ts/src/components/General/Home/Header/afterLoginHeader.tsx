import React from "react";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';


const AfterLoginHeader = () => {
    return (
        <div>
            <div className="flex justify-between bg-zinc-800 flex-col bg-white-900 sm:flex-row h-[10vh] p-1      ">
                {/* Logo */}
                <div className="w-full flex items-center justify-between ">
                    <div className="m-auto">
                        <span className="text-white text-3xl font-extrabold font-montserrat break-words">TECH</span>
                        <span className="text-white text-3xl font-normal font-montserrat break-words">UNT</span>
                    </div>
                    <div>
                        <div className="flex justify-between bg-zinc-700 rounded-xl text-white  d-[20px] w-[100%] sm:w-[300px] h-[30px]" >
                            <input type="text" placeholder="Search..." className="flex justify-between bg-zinc-700 rounded-xl text-white  d-[20px] w-[100%] sm:w-[300px] h-[30px]" >
                            </input>
                            <SearchOutlinedIcon className="mt-1 mr-1" />
                        </div>
                    </div>
                </div>
                <div className="w-full pl-[10rem] text-white font-sana font-normal flex pt-3 sm:mt-0 justify-evenly">
                        <span className="mt-1">My Jobs</span>
                        <span className="mr-[1px] mt-1">Transaction Details</span>
                        <span className="mr-[1px] mt-1">Messages</span>
                    <div className="felx pb-">
                        <div className="bg-red-500 w-[7px] h-[7px] ml-3 top-3 relative rounded-full "></div>
                        <NotificationsNoneOutlinedIcon color="primary" />
                    </div>
                    <div className="border rounded-full h-10 w-10 bg-red-500">
                    </div>
                </div>
            </div>
        </div>
    );
}



export default AfterLoginHeader;