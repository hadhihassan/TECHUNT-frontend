import { useEffect, useState } from 'react';
import { fetchAllJobPostForTalent } from '../../../services/talentApiService';
import { AxiosResponse } from 'axios';
import { Project } from '../../../pages/Talent/home/talentHomePage';
// import Rating from '@mui/material/Rating';
// import Stack from '@mui/material/Stack';
import { formatMongoDate } from '../../../util/timeFormating';

interface CompenetPropos {
    handleShowJobPostDetails: (number: number) => void;
}

const ListWorkPost: React.FC<CompenetPropos> = ({ handleShowJobPostDetails }) => {
    const [posts, setPosts] = useState<Project[]>([]);
    const [sortType, setSortType] = useState<string>('');
    const [sortExperience, setSortExperience] = useState<string>('');
    const [sortPrice, setSortPrice] = useState<string>('');

    // Sorting and filtering logic
    const sortedAndFilteredJobs = posts
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

    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage: number = 5;
    const indexOfLastPost: number = currentPage * itemsPerPage;
    const indexOfFirstPost: number = indexOfLastPost - itemsPerPage;
    const currentPosts = sortedAndFilteredJobs ? sortedAndFilteredJobs.slice(indexOfFirstPost, indexOfLastPost) : posts.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    useEffect(() => {
        fetchAllJobPostForTalent()
            .then((res: AxiosResponse) => {
                setPosts(res.data.data);
            });
    }, []);

    return (
        <> <div className="flex justify-evenly mt-5 mb-5">
            <div className="border p-2 bg-red-500 text-white rounded-xl flex gap-2 font-semibold text-sm ">
                <label htmlFor="sortType">Work Type</label>
                <select id="sortType" className="form-select outline-none text-gray-600 rounded-xl " value={sortType} onChange={(e) => setSortType(e.target.value)}>
                    <option value="">Select work Type</option>
                    <option value="Milestone">Milestone</option>
                    <option value="Fixed">Fixed</option>
                </select>
            </div>
            <div className="border p-2 bg-red-500 text-white rounded-xl flex gap-2 font-semibold text-sm ">
                <label htmlFor="sortExperience">Experience</label>
                <select id="sortExperience" className="form-select outline-none text-gray-600 rounded-xl " value={sortExperience} onChange={(e) => setSortExperience(e.target.value)}>
                    <option value="">Select Experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="Medium">Medium</option>
                    <option value="Experienced">Experienced</option>
                </select>
            </div>
            <div className="border p-2 bg-red-500 text-white rounded-xl flex gap-2 font-semibold text-sm ">
                <label htmlFor="sortPrice">Sort Price</label>
                <select id="sortPrice" className="form-select outline-none text-gray-600 rounded-xl " value={sortPrice} onChange={(e) => setSortPrice(e.target.value)}>
                    <option value="" selected>Sort</option>
                    <option value="lowToHigh">Low to High</option>
                    <option value="highToLow">High to Low</option>
                </select>
            </div>
        </div>
            <div className='font-sans font-semibold'>
                {
                    currentPosts.map((post: Project, index: number) => (
                        <div className="w-full mt-5 " key={index} onClick={() => handleShowJobPostDetails(index)}>
                            <div className="m-3 mt-5 w-full">
                                <p className="font-sans font-semibold mt-1">{post.Title}</p>
                                <p className='font-sans text-gray-800 mt-1  font-semibold text-sm '>{post.TimeLine} - {post.Expertiselevel} - Est. Budget: ${post.Amount} - Posted  {formatMongoDate(post.createdAt as Date || "")} -  {post?.WorkType} type</p>
                                <p className='font-sans text-gray-600 mt-2 text-sm font-normal' dangerouslySetInnerHTML={{ __html: post.Description }}></p>
                            </div>
                            <div className='flex justify-between w-[60%] sm:ml-3'>
                            </div>
                            <div className="w-full border-b-2 m-3"></div>
                        </div>
                    ))
                }
                <div className="flex items-center gap-4 justify-center mt-10    ">
                    <button
                        className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {Array.from({ length: Math.ceil(posts.length / itemsPerPage) }, (_, index) => (
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
                        disabled={currentPage === Math.ceil(posts.length / itemsPerPage)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}

export default ListWorkPost;