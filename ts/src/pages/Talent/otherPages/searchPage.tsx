import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import AfterLoginHeader from '../../../components/General/Home/Header/afterLoginHeader';
import { Col, InputNumber, Row, Slider } from 'antd';
import { Radio } from 'antd';
import CurrencyRupeeTwoToneIcon from '@mui/icons-material/CurrencyRupeeTwoTone';
import { ChangeEvent, useEffect, useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { message } from 'antd';
import { fetchAllJobPostForTalent, searchJob } from '../../../services/talentApiService';
import type { JobInterface } from '../../../interface/interfaces'
import { AxiosError, AxiosResponse } from 'axios';
import formatRelativeTime from '../../../util/timeFormating';
import { talent_routes } from '../../../routes/pathVariables';
import { useNavigate } from 'react-router-dom';
import { List, Skeleton } from 'antd';
import EmptyJobs from '../../../components/General/emptyData/emptyJobs';

const optionsWithDisabled = [
    { label: 'Experienced', value: 'Experienced' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Fresher', value: 'Fresher', },
];
const optionsWithDisabled1 = [
    { label: 'Fixed', value: 'Fixed' },
    { label: 'Milestone', value: 'Milestone' },
];


const Search = () => {

    const [actualPosts, setActualPost] = useState<JobInterface[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    let value3: string = ""
    let value4: string = ""
    const [query, setQuery] = useState<string>("")
    const [postType, setPostType] = useState<string>("")
    const [experience, setExperienceLevel] = useState<string>("")
    const [maxInputValue, setMaxInputValue] = useState<number>(0);
    const [inputValue, setInputValue] = useState<number>(0);
    const [max, setMax] = useState<number>(2000);
    useEffect(() => {
        setQuery(localStorage.getItem("search") || "")
        fetchAllJobPostForTalent()
            .then((res: AxiosResponse) => {
                setActualPost(res.data.data)
                // eslint-disable-next-line no-unsafe-optional-chaining
                const maxValue: number = Math.max(...res?.data?.data?.map((obj: { Amount: number; }) => obj.Amount));
                setMax(maxValue)
                setMaxInputValue(maxValue)
            }).catch((err: AxiosError) => {
                console.log(err)
            })
        localStorage.removeItem("search")

    }, [])
    const navigate = useNavigate()

    const onChangePrice = (e: number[]) => {
        const array = e
        setInputValue(array[0]);
        setMaxInputValue(array[1])
        search()
    };

    const onChange3 = ({ target: { value } }: RadioChangeEvent) => {
        value3 = value
        setExperienceLevel(value)
        search()

    };
    const onChange4 = ({ target: { value } }: RadioChangeEvent) => {
        value4 = value
        setPostType(value)
        search()

    };
    const onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
        const { value } = e.target;
        setQuery(value)
        search()
    }
    const search = () => {
        searchJob({ query, postType, experience: experience, maxInputValue, inputValue })
            .then((res) => {
                if (res.data) {
                    setActualPost(res.data.data)
                }
                setLoading(false)
            }).catch(() => message.error("Somthing went wrong !"))
            .finally(() => {
                setLoading(false)
            })
    }
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage: number = 5;
    const indexOfLastPost: number = currentPage * itemsPerPage;
    const indexOfFirstPost: number = indexOfLastPost - itemsPerPage;
    const currentClient = actualPosts.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    return (
        <>
            <AfterLoginHeader />
            <div className="bg-blue-500 absolute -z-10 w-full sm:h-[10vh] md:h-[25vh] xl:h-[50vh] transition-transform duration-150">
            </div>
            <form
                onSubmit={async (e) => {
                    setLoading(true)
                    e.preventDefault()
                    searchJob({ query, postType, experience: experience, maxInputValue, inputValue })
                        .then((res) => {
                            if (res.data) {
                                setActualPost(res.data.data)
                            }
                            setLoading(false)
                        }).catch(() => message.error("Somthing went wrong !"))
                        .finally(() => {
                            setLoading(false)
                        })
                }}>
                <div className=" flex mx-auto pt-10 pl-3 w-[82%] font-sans font-semibold text-gray-600">
                    <input
                        type="text"
                        className="w-full h-[7vh] outline-none placeholder-gray-400 text-gray-900 p-4 rounded-bl-xl rounded-tl-xl"
                        placeholder="Search"
                        onChange={onSearchChange}
                        value={query}
                    />
                    <button className="bg-white h-[7vh] p-4 rounded-br-xl rounded-tr-xl items-center flex">🔍</button>
                </div>
                <div className='flex justify-between mx-auto w-[80%] font-sans font-semibold text-white mt-7'>
                    {/* filter sort and pricing */}
                    <div className='h-auto w-[25%] '>
                        <label className=''>Advanced Search</label>
                        <div className='w-full xl:mt-10 md:mt-5 sm:mt1 border rounded-xl h-auto bg-white shadow-xl mb-40 '>
                            <div className='font-sans font-semibold text-black border-b-2'>
                                <p className='m-3'>
                                    Filter
                                </p>
                            </div>
                            <div className='text-black'>
                                <p className='m-3'>
                                    Project type
                                </p>
                                <Radio.Group
                                    className='m-3'
                                    options={optionsWithDisabled1}
                                    onChange={onChange4}
                                    value={value4}
                                    optionType="button"
                                    buttonStyle="solid"
                                    size='small'
                                />
                            </div>
                            <div className='text-black '>
                                <p className='m-3'>
                                    Experience Level
                                </p>
                                <Radio.Group
                                    className='m-3'
                                    options={optionsWithDisabled}
                                    onChange={onChange3}
                                    value={value3}
                                    optionType="button"
                                    buttonStyle="solid"
                                    size='small'
                                />
                            </div>
                            <Row className='m-3'>
                                <Col span={24}>
                                    <Slider
                                        min={0}
                                        max={max}
                                        onChange={onChangePrice}
                                        range
                                        reverse={false} />
                                </Col>
                                <Col span={24} className='flex justify-between w-full'>
                                    <span className='text-black'>Max price</span>
                                    <span className='text-black'>Max price</span>
                                </Col>
                                <Col span={24} className='flex justify-between w-full'>
                                    <InputNumber
                                        type='number'
                                        min={100}
                                        max={max}
                                        value={inputValue}
                                        readOnly
                                    />
                                    <InputNumber
                                        type='number'
                                        min={200}
                                        max={max}
                                        value={maxInputValue}
                                        readOnly
                                    />
                                </Col>
                            </Row>
                        </div>
                    </div>
                    {/* content */}
                    <div className='w-[80%]'>
                        <div className='w-full xl:mt-16 md:mt-5 sm:mt1 border rounded-xl h-auto ml-2 bg-white shadow-xl mb-40'>
                            {loading ? (
                                <List
                                    itemLayout="vertical"
                                    size="large"
                                    dataSource={actualPosts}
                                    renderItem={() => (
                                        <List.Item
                                        >
                                            <Skeleton loading={loading}>
                                            </Skeleton>
                                        </List.Item>
                                    )}
                                />
                            ) : (
                                currentClient.length ? (
                                    currentClient.map((post: JobInterface, index: number) => (
                                        <div className='m-5 text-black border-b ' key={index} onClick={() => {
                                            localStorage.setItem("deatildView", JSON.stringify(post))
                                            navigate(talent_routes.JobViewPage)
                                        }}>
                                            <p>{post.Title}</p>
                                            <p className='text-xs text-gray-400 mt-1'>{post.WorkType} - {post.Expertiselevel} - Est. Budget: {post.Amount} - Posted {formatRelativeTime(post.createdAt as Date || "")}</p>
                                            <p className='text-sm text-gray-700 mt-1' dangerouslySetInnerHTML={{ __html: post.Description }}></p>
                                            <div className="mt-2 mr-5 flex mb-2 ">
                                                <div>
                                                    <CurrencyRupeeTwoToneIcon fontSize="inherit" color="primary" />
                                                    <span className="text-gray-500 font-sans ml-1 font-normal text-sm">{post.WorkType}</span>
                                                </div>
                                                <div className='flex ml-2 mr-2 '>
                                                    <Stack spacing={1}>
                                                        <Rating name="half-rating-read" size="small" defaultValue={2.5} precision={0.5} readOnly />
                                                    </Stack>
                                                    <p className="text-gray-500 font-sans font-normal text-xs">4/5 (12 Reviews)</p>
                                                </div>
                                                <div>
                                                    <CurrencyRupeeTwoToneIcon fontSize="inherit" color="error" />
                                                    <span className="text-gray-500 font-sans font-normal text-sm">Total Amount :  {post.Amount}  Rs</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))

                                ) : (
                                    <EmptyJobs title={'No post'} description={'There have been no posts in this section yet'} />
                                )
                            )}
                            <div className="flex items-center gap-4 justify-center m-10">
                                <button
                                    className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                                {Array.from({ length: Math.ceil(actualPosts.length / itemsPerPage) }, (_, index) => (
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
                                    disabled={currentPage === Math.ceil(actualPosts.length / itemsPerPage)}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div >
            </form>
        </>
    )
}
export default Search;