import Avatar from "react-avatar";
import { IconButton } from '@mui/material';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { FlagOutlined } from "@mui/icons-material";
import { useEffect, useState } from 'react';
import { getALlTalent } from '../../../services/clientApiService';
import { AxiosError, AxiosResponse } from 'axios';
import { UserProfile } from '../../../interface/interfaces';
import { useNavigate } from "react-router-dom";
import { talent_routes } from "../../../routes/pathVariables";

const ListDiscoverTalent = () => {
    const navigate = useNavigate()
    const [discoverTalent, setDiscoverTalent] = useState<UserProfile[]>([])
    useEffect(() => {
        const fetchAllTalents = () => {
            getALlTalent()
                .then((res: AxiosResponse) => {
                    setDiscoverTalent(res.data)
                })
                .catch((error: AxiosError) => {
                    console.error('Error fetching talents:', error);
                });
        };
        fetchAllTalents();
    }, []);
    const MAX_SKILLS_DISPLAY = 3;
    const [showAllSkills, setShowAllSkills] = useState<boolean>(false);
    const toggleSkills = () => {
        setShowAllSkills(!showAllSkills);
    };
    const handleNavigateProfile = (index: number) => {
        localStorage.setItem("profileData", JSON.stringify(discoverTalent[index]))
        navigate(talent_routes.ProfileView)
    };

    return (<>
        {
            discoverTalent.map((talent: UserProfile, index: number) => (
                <div className="w-full mt-5 border rounded-xl shadow-xl h-auto mb-5" key={index}>
                    {/* <button className="bg-blue-700 cursor-none w-[5vw] h-[3vh] rounded-full text-white font-normal font-sans text-xs relative bottom-3 left-5">Top rate</button> */}
                    <div className="flex justify-between p-4">
                        <div className="flex">
                            <IconButton size="small">
                                <Avatar src={`http://localhost:3000/images/${talent.Profile.profile_Dp}`} className="w-8 h-8" />
                            </IconButton>
                            <div className="ml-4">
                                <p className="text-md font-bold">{talent.First_name}{talent.Last_name}</p>
                                <p className="text-sm text-gray-500">{talent.Profile.Title}</p>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">Total earnings <b>$0k</b> on {talent.Profile.Title}</p>
                                    <div className="flex mt-2">
                                        {talent.Profile.Skills.slice(0, showAllSkills ? talent.Profile.Skills.length : MAX_SKILLS_DISPLAY).map((value: string, index: number) => (
                                            <p key={index} className="bg-slate-100 font-sans px-3 rounded-full text-sm border mr-2">
                                                {value}
                                            </p>
                                        ))}
                                        {!showAllSkills && talent.Profile.Skills.length > MAX_SKILLS_DISPLAY && (
                                            <span className="text-sm font-semibold text-red-500 ml-2 self-center cursor-pointer" onClick={toggleSkills}>
                                                more
                                            </span>
                                        )}
                                        {showAllSkills && (
                                            <span className="text-sm font-semibold text-red-500 ml-2 self-center cursor-pointer" onClick={toggleSkills}>
                                                less
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col mt-10">
                            <button className=" mb-2 border border-red-500 text-red-500 ml-5 font-semibold text-xs px-14 py-2 rounded-full self-center">Invite</button>
                            <button className="border border-red-500 text-red-500 ml-5 font-semibold text-xs px-12 py-2 rounded-full self-center" onClick={() => handleNavigateProfile(index)}>See profile</button>
                        </div>
                    </div>
                    <div className="ml-30 flex ml-36 mb-4">
                        <div className="flex">
                            <Stack spacing={1}>
                                <Rating name="half-rating-read" size="small" defaultValue={2.5} precision={0.5} />
                            </Stack>
                            <p className="text-gray-500 font-sans font-normal text-sm">4/5 (12 Reviews)</p>
                        </div>
                        <div className="border-r border-solid  border-gray-500 h-5 ml-2 mr-2 "></div>
                        <div>
                            {/* <FlagOutlined /> */}
                            <span className="text-gray-500 font-sans font-normal text-sm">{talent.Country}, {talent.City}</span>
                        </div>
                    </div>
                </div>
            ))
        }


    </>)
}



export default ListDiscoverTalent;