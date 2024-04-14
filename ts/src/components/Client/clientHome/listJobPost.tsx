import { useEffect, useState } from "react";
import { fetchAllJobPost } from "../../../services/clientApiService";
import { useNavigate } from "react-router-dom";
import type { JobInterface } from '../../../interface/interfaces'
import { formatMongoDate } from "../../../util/timeFormating";

const ListJobPost = () => {
    const [jobs, setJobs] = useState<JobInterface[]>([])
    const [sortType, setSortType] = useState<string>('');
    const [sortExperience, setSortExperience] = useState<string>('');
    const [sortPrice, setSortPrice] = useState<string>('');
    const navigate = useNavigate()
    useEffect(() => {
        fetchAllJobPost()
            .then((res) => {
                setJobs(res?.data?.data?.data)
            })
    }, [])
    // Sorting and filtering logic
    const sortedAndFilteredJobs = jobs
        .filter(job => !sortType || job.WorkType === sortType)
        .filter(job => !sortExperience || job.Expertiselevel === sortExperience)
        .sort((a, b) => {
            if (sortPrice === 'lowToHigh') {
                return a.Amount - b.Amount;
            } else if (sortPrice === 'highToLow') {
                return b.Amount - a.Amount;
            }
            return 0;
        });
    //pagination logic
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage: number = 10;
    const indexOfLastPost: number = currentPage * itemsPerPage;
    const indexOfFirstPost: number = indexOfLastPost - itemsPerPage;
    const paginatedJobs = sortedAndFilteredJobs ? sortedAndFilteredJobs.slice(indexOfFirstPost, indexOfLastPost) : jobs.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    return (
        <>
            <div className="flex justify-evenly">
                <div className="border p-2 bg-red-500 text-white rounded-xl flex gap-2 font-semibold text-sm ">
                    <label htmlFor="sortType">Work Type</label>
                    <select id="sortType" className="form-select outline-none text-gray-600 rounded-xl " value={sortType} onChange={(e) => setSortType(e.target.value)}>
                        <option  value="">Select work Type</option>
                        <option  value="Milestone">Milestone</option>
                        <option  value="Fixed">Fixed</option>
                    </select>
                </div>
                <div className="border p-2 bg-red-500 text-white rounded-xl flex gap-2 font-semibold text-sm ">
                    <label htmlFor="sortExperience">Experience</label>
                    <select id="sortExperience" className="form-select outline-none text-gray-600 rounded-xl "  value={sortExperience} onChange={(e) => setSortExperience(e.target.value)}>
                        <option value="">Select Experience</option>
                        <option value="Fresher">Fresher</option>
                        <option value="Medium">Medium</option>
                        <option value="Experienced">Experienced</option>
                    </select>
                </div>
                <div className="border p-2 bg-red-500 text-white rounded-xl flex gap-2 font-semibold text-sm ">
                    <label htmlFor="sortPrice">Sort Price</label>
                    <select id="sortPrice" className="form-select outline-none text-gray-600 rounded-xl "  value={sortPrice} onChange={(e) => setSortPrice(e.target.value)}>
                        <option value="" selected>Sort</option>
                        <option value="lowToHigh">Low to High</option>
                        <option value="highToLow">High to Low</option>
                    </select>
                </div>
            </div>
            {paginatedJobs &&
                paginatedJobs.map((job: JobInterface, index: number) => (
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
                                    <p className="ml-3 mt-1 font-sans font-normal text-xs text-gray-500"> <b>Est. Budget:</b> {job?.Amount}  </p>
                                    <p className="ml-3 mt-1 font-sans font-normal text-xs text-gray-500"> <b> Posted at  </b>- {formatMongoDate(job?.createdAt as Date) as string}  </p>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ))
            }
            <div className="flex items-center gap-4 justify-center m-10">
                <button
                    className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {Array.from({ length: Math.ceil(jobs.length / itemsPerPage) }, (_, index) => (
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
                    disabled={currentPage === Math.ceil(jobs.length / itemsPerPage)}
                >
                    Next
                </button>
            </div>
        </>
    )
}


export default ListJobPost;