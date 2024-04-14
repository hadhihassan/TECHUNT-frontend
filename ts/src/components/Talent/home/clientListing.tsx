import { useEffect, useState } from 'react';
import { getAllClientForTalent } from '../../../services/talentApiService';
import { UserProfile } from '../../../interface/interfaces';
import { AxiosError, AxiosResponse } from 'axios';
import Avatar from 'react-avatar';
// import Rating from '@mui/material/Rating';
// import Stack from '@mui/material/Stack';
// import { FlagOutlined } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { talent_routes } from '../../../routes/pathVariables';
import { createConversation } from '../../../services/commonApiService';
import { IMG_URL } from '../../../constant/columns';

const ClientList = () => {
    const navigate = useNavigate()
    const [clients, setClients] = useState<UserProfile[]>([])
    useEffect(() => {
        getAllClientForTalent()
            .then((res: AxiosResponse) => {
                setClients(res.data)
            }).catch((err: AxiosError) => {
                console.log(err)
            })

    }, [])
    const hadnleShowFullDetails = (index: number) => {
        localStorage.setItem("profileData", JSON.stringify(clients[index]))
        navigate(talent_routes.viewClient)
    }
    const goMessage = (index: number) => {
        createConversation(clients[index]._id).then(() => {
            navigate("/message")
        })
    }
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage: number = 5;

    const indexOfLastPost: number = currentPage * itemsPerPage;
    const indexOfFirstPost: number = indexOfLastPost - itemsPerPage;
    const currentCients = clients.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    return <>
        {currentCients.map((client: UserProfile, index: number) => (
            <div className="w-full mt-5 border rounded-xl shadow-xl h-auto p-3" key={index}>
                <div className="flex justify-between p-4">
                    <div className="flex">
                        <div>
                            <Avatar src={`${IMG_URL}${client.Profile.profile_Dp}`} className="w-8 h-8" />
                        </div>
                        <div className="ml-4">
                            <p className="text-md font-bold">{client?.First_name} {client?.Last_name}</p>
                            <p className="text-sm text-gray-500">{client?.Email}</p>
                            <p className="text-sm text-gray-500">{client?.Number}</p>
                            <span className="text-gray-500 font-sans font-normal text-sm">{client?.City}, {client?.Country}</span>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <button className="border mb-3 border-red-500 text-red-500 ml-5 text-xs px-12 py-2 font-sans font-bold rounded-full self-center" onClick={() => goMessage(index)}>Message</button>
                        <button className="border mb-3 border-red-500 text-red-500 ml-5 text-xs px-10 py-2 font-sans font-bold rounded-full self-center" onClick={() => hadnleShowFullDetails(index)}>View details</button>
                    </div>
                </div>
            </div>
        ))
        }
        <div className="flex items-center gap-4 justify-center mt-10">
            <button
                className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            {Array.from({ length: Math.ceil(clients.length / itemsPerPage) }, (_, index) => (
                <button
                    className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${currentPage === index + 1 ? 'bg-gray-900 text-white shadow-md shadow-gray-900/10' : ''}`}
                    type="button"
                    onClick={() => paginate(index + 1)}
                >
                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                        {index + 1}
                    </span>
                </button>
            ))}
            <button
                className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(clients.length / itemsPerPage)}
            >
                Next
            </button>
        </div>
    </>
}
export default ClientList;