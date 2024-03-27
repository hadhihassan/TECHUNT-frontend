import { useEffect, useState } from "react";
import { fetchAllJobPost } from "../../../services/clientApiService";
import { useNavigate } from "react-router-dom";
import type { JobInterface} from '../../../interface/interfaces'

const ListJobPost = () => {
    const [jobs, setJobs] = useState<JobInterface[]>([])
    const navigate = useNavigate()
    useEffect(() => {
        fetchAllJobPost()
            .then((res) => {
                setJobs(res?.data?.data?.data)
            })
    }, [])
    return (
        <>
            {jobs &&
                jobs.map((job: JobInterface, index: number) => (
                    <>
                        <div key={index} className="w-full mt-5 border rounded-xl shadow-xl h-[39vh]">
                            <div className="border-b-2 flex justify-between w-full h-[50px]">
                                <p className=" font-sans font-semibold text-xl m-3"></p>
                                <button onClick={() => {
                                    navigate(`/client/edit-job-post/${job._id}`)
                                }} className="border border-red-500 text-red-500 font-sans font-normal px-3 rounded-full text-xs h-[2vw] m-3">Edit post</button>
                            </div>
                            <div className=" flex justify-between">
                                <div>
                                    <p className="m-3 font-sans font-semibold text-sm">{job?.Title}</p>
                                    <p className="ml-3 mt-1 font-sans font-normal text-xs text-gray-500">{job?.WorkType} - {job?.Expertiselevel}</p>
                                    <p className="ml-3 mt-1 font-sans font-normal text-xs text-gray-500"> <b>Est. Budget:</b> {job?.Amount} created at  - {job?.createdAt as string}</p>
                                    <p className="ml-3 mt-1 font-sans font-normal text-xs text-gray-500"> <b>Expertise level:</b> {job?.Expertiselevel} </p>
                                    <p className="ml-3 mt-1 font-sans font-normal text-xs text-gray-500"><b>Time Line:</b> {job?.TimeLine} </p>
                                    <div className="flex ml-2 mt-4">
                                        {
                                            job.Skills.map((skill: string, index: number) => (
                                                <p key={index} className="bg-slate-100  font-sans  px-4 rounded-full text-sm border mr-2">
                                                    {skill}
                                                </p>
                                            ))
                                        }
                                        <span className="text-sm font-semibold text-red-500 ml-2 self-center cursor-pointer">more</span>
                                    </div>
                                </div>
                                <div className="mr-10">
                                    <div className="flex mr-10  justify-between">
                                        <p className="m-3 font-sans font-semibold text-sm ">Proposals</p>
                                        <p className="m-3 font-sans font-semibold text-sm ">Hired</p>
                                    </div>
                                    <div className=" mr-10 flex justify-between">
                                        <p className="m-3 font-sans font-normal text-sm ">00</p>
                                        <p className="m-3 font-sans font-normal text-sm ">00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ))
            }
        </>
    )
}


export default ListJobPost;