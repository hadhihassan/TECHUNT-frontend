import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import CurrencyRupeeTwoToneIcon from '@mui/icons-material/CurrencyRupeeTwoTone';
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone';
import { useEffect, useState } from 'react';


const profileTalentDetailsFirst: React.FC<{ datas: {} }> = (datas) => {
    let [details, setDetails] = useState<any>(null);
    useEffect(() => {
        setDetails(datas.datas);
    }, [datas]);

    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    const truncatedDescription = details?.Profile?.Description.slice(0, 200); // Display only first 10 characters
    const remainingDescription = details?.Profile?.Description.slice(10); // Display remaining characters

    const IMG = `http://localhost:3000/images/${details?.Profile?.profile_Dp}`
    return <div className="w-[48rem] m-5 flex  rounded-xl  h-[20rem] shadow-xl  border bg-white">
        <div className=" xl:w-[13rem] m-5  sm:w[10rem] md:[14rem] ">
            <div>
                <img className="border border-black rounded-xl" src={IMG} alt="" />
            </div>
            <div className="m-2 w-[18rem]">
                <p className="font-sans font-normal text-sm">USA</p>
                <AccessTimeRoundedIcon fontSize="inherit" />
                <span className="font-sans font-normal text-xs ml-2" >It's currently 4:45 PM here</span><br />
                <EditCalendarRoundedIcon fontSize="inherit" />
                <span className="font-sans font-normal text-xs ml-2">Joined September 1, 2013</span>
            </div>
        </div>
        <div className=" w-full ">
            <div className="flex justify-between ">
                <div className="mt-4">
                    <p className="text-2xl font-sans font-bold">{details?.First_name}</p>
                    <p className=" font-sans font-medium opacity-45">{details?.Profile?.Title[0]}</p>
                </div>
                <div className="m-6">
                    <button className="w-[8rem] font-sans font-medium rounded-full h-8 border border-red-500 text-red-500 ">Edit Profle</button>
                </div>
            </div>
            <div className="mt-2 mr-5 flex justify-between">
                <div>
                    <Stack spacing={1}>
                        <Rating name="half-rating-read" size="small" defaultValue={2.5} precision={0.5} readOnly />
                    </Stack>
                    <p className="text-gray-500 font-sans font-normal text-sm">4/5 (12 Reviews)</p>
                </div>
                <div className="border-r border-solid  border-gray-500 h-8 "></div>
                <div>
                    <CurrencyRupeeTwoToneIcon fontSize="inherit" color="error" />
                    <span className="text-gray-500 font-sans font-normal text-sm">Total earnings- 0K  Rs</span>
                </div><div className="border-r border-solid border-gray-500 h-8"></div>
                <div>
                    <VerifiedTwoToneIcon fontSize="inherit" color="primary" />
                    <span className="text-gray-500 font-sans ml-1 font-normal text-sm">0 projects completed</span>
                </div>
            </div>
            <div className="mr-3 mt-4">
                <p className="text-gray-700 font-sans font-normal text-sm">
                    {showMore ? details?.Profile?.Description : `${truncatedDescription}...`}
                    <span
                        className="text-red-500 font-bold cursor-pointer"
                        onClick={toggleShowMore}
                    >
                        {showMore ? 'Show less' : 'Show more'}
                    </span>
                </p>
            </div>
        </div>
    </div>;
}



export default profileTalentDetailsFirst;