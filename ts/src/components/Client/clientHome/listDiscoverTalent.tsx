import IMAGE from '../../../assets/4950287_19874-removebg-preview.png'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Avatar from "react-avatar";
import { IconButton } from '@mui/material';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { FlagOutlined } from "@mui/icons-material";
import Box from '@mui/material/Box';
import { LinearProgressWithLabel } from "../../components/General/linerProgressBar";
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from "react-router-dom";
import { clientRoutes } from "../../routes/pathVariables";
import { fetchAllJobPost } from '../../api/client.Api'
const listDiscoverTalent = () => {
    return (<>
        <div className="w-full mt-5 border rounded-xl shadow-xl h-[30vh]">
            <button className="bg-blue-700 cursor-none w-[5vw] h-[3vh] rounded-full text-white font-normal font-sans text-xs relative bottom-3 left-5">Top rate</button>
            <div className="flex justify-between p-4">
                <div className="flex">
                    <IconButton size="small">
                        <Avatar src={IMAGE} className="w-8 h-8" />
                    </IconButton>
                    <div className="ml-4">
                        <p className="text-md font-bold">Bhuvesh Singh</p>
                        <p className="text-sm text-gray-500">UX designer, Graphic designer</p>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">Total earnings <b>$76k</b> on web and mobile design</p>
                            <div className="flex mt-2">
                                <p className="bg-slate-100  font-sans  px-3 rounded-full text-sm border mr-2">
                                    Web Designer
                                </p>
                                <p className="bg-slate-100  font-sans  px-3 rounded-full text-sm border mr-2">
                                    Web Designer
                                </p>
                                <p className="bg-slate-100  font-sans  px-3 rounded-full text-sm border">
                                    Web Designer
                                </p>
                                <span className="text-sm font-semibold text-red-500 ml-2 self-center cursor-pointer">more</span>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="border border-red-500 text-red-500 ml-5 font-semibold text-xs px-12 py-1 rounded-full self-center">Invite</button>
            </div>
            <div className="ml-30 flex ml-36">
                <div className="flex">
                    <Stack spacing={1}>
                        <Rating name="half-rating-read" size="small" defaultValue={2.5} precision={0.5} />
                    </Stack>
                    <p className="text-gray-500 font-sans font-normal text-sm">4/5 (12 Reviews)</p>
                </div>
                <div className="border-r border-solid  border-gray-500 h-5 ml-2 mr-2 "></div>
                <div>
                    <FlagOutlined />
                    <span className="text-gray-500 font-sans font-normal text-sm">Manhattan, USA</span>
                </div>
            </div>
        </div>
        <div className="w-full mt-5 border rounded-xl shadow-xl h-[30vh]">
            <div className="flex justify-between p-4">
                <div className="flex">
                    <IconButton size="small">
                        <Avatar src={IMAGE} className="w-8 h-8" />
                    </IconButton>
                    <div className="ml-4">
                        <p className="text-md font-bold">Bhuvesh Singh</p>
                        <p className="text-sm text-gray-500">UX designer, Graphic designer</p>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">Total earnings <b>$76k</b> on web and mobile design</p>
                            <div className="flex mt-2">
                                <p className="bg-slate-100  font-sans  px-3 rounded-full text-sm border mr-2">
                                    Web Designer
                                </p>
                                <p className="bg-slate-100  font-sans  px-3 rounded-full text-sm border mr-2">
                                    Web Designer
                                </p>
                                <p className="bg-slate-100  font-sans  px-3 rounded-full text-sm border">
                                    Web Designer
                                </p>
                                <span className="text-sm font-semibold text-red-500 ml-2 self-center cursor-pointer">more</span>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="border border-red-500 text-red-500 ml-5 font-semibold text-xs px-12 py-1 rounded-full self-center">Invite</button>
            </div>
            <div className="ml-30 flex ml-36">
                <div className="flex">
                    <Stack spacing={1}>
                        <Rating name="half-rating-read" size="small" defaultValue={2.5} precision={0.5} />
                    </Stack>
                    <p className="text-gray-500 font-sans font-normal text-sm">4/5 (12 Reviews)</p>
                </div>
                <div className="border-r border-solid  border-gray-500 h-5 ml-2 mr-2 "></div>
                <div>
                    <FlagOutlined />
                    <span className="text-gray-500 font-sans font-normal text-sm">Manhattan, USA</span>
                </div>
            </div>
        </div>
        <div className="w-full mt-5 border rounded-xl shadow-xl h-[30vh]">
            <button className="bg-rose-700 cursor-none w-[5vw] h-[3vh] rounded-full text-white font-normal font-sans text-xs relative bottom-3 left-5">Top rate</button>
            <div className="flex justify-between p-4">
                <div className="flex">
                    <IconButton size="small">
                        <Avatar src={IMAGE} className="w-8 h-8" />
                    </IconButton>
                    <div className="ml-4">
                        <p className="text-md font-bold">Bhuvesh Singh</p>
                        <p className="text-sm text-gray-500">UX designer, Graphic designer</p>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">Total earnings <b>$76k</b> on web and mobile design</p>
                            <div className="flex mt-2">
                                <p className="bg-slate-100  font-sans  px-3 rounded-full text-sm border mr-2">
                                    Web Designer
                                </p>
                                <p className="bg-slate-100  font-sans  px-3 rounded-full text-sm border mr-2">
                                    Web Designer
                                </p>
                                <p className="bg-slate-100  font-sans  px-3 rounded-full text-sm border">
                                    Web Designer
                                </p>
                                <span className="text-sm font-semibold text-red-500 ml-2 self-center cursor-pointer">more</span>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="border border-red-500 text-red-500 ml-5 font-semibold text-xs px-12 py-1 rounded-full self-center">Invite</button>
            </div>
            <div className="ml-30 flex ml-36">
                <div className="flex">
                    <Stack spacing={1}>
                        <Rating name="half-rating-read" size="small" defaultValue={2.5} precision={0.5} />
                    </Stack>
                    <p className="text-gray-500 font-sans font-normal text-sm">4/5 (12 Reviews)</p>
                </div>
                <div className="border-r border-solid  border-gray-500 h-5 ml-2 mr-2 "></div>
                <div>
                    <FlagOutlined />
                    <span className="text-gray-500 font-sans font-normal text-sm">Manhattan, USA</span>
                </div>
            </div>
        </div>
        <div className="w-full mt-5 border rounded-xl shadow-xl h-[30vh]">
            <div className="flex justify-between p-4">
                <div className="flex">
                    <IconButton size="small">
                        <Avatar src={IMAGE} className="w-8 h-8" />
                    </IconButton>
                    <div className="ml-4">
                        <p className="text-md font-bold">Bhuvesh Singh</p>
                        <p className="text-sm text-gray-500">UX designer, Graphic designer</p>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">Total earnings <b>$76k</b> on web and mobile design</p>
                            <div className="flex mt-2">
                                <p className="bg-slate-100  font-sans  px-3 rounded-full text-sm border mr-2">
                                    Web Designer
                                </p>
                                <p className="bg-slate-100  font-sans  px-3 rounded-full text-sm border mr-2">
                                    Web Designer
                                </p>
                                <p className="bg-slate-100  font-sans  px-3 rounded-full text-sm border">
                                    Web Designer
                                </p>
                                <span className="text-sm font-semibold text-red-500 ml-2 self-center cursor-pointer">more</span>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="border border-red-500 text-red-500 ml-5 font-semibold text-xs px-12 py-1 rounded-full self-center">Invite</button>
            </div>
            <div className="ml-30 flex ml-36">
                <div className="flex">
                    <Stack spacing={1}>
                        <Rating name="half-rating-read" size="small" defaultValue={2.5} precision={0.5} />
                    </Stack>
                    <p className="text-gray-500 font-sans font-normal text-sm">4/5 (12 Reviews)</p>
                </div>
                <div className="border-r border-solid  border-gray-500 h-5 ml-2 mr-2 "></div>
                <div>
                    <FlagOutlined />
                    <span className="text-gray-500 font-sans font-normal text-sm">Manhattan, USA</span>
                </div>
            </div>
        </div>
    </>)
}



export default listDiscoverTalent;