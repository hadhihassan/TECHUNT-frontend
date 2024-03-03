import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import AfterLoginHeader from '../../components/General/Home/Header/afterLoginHeader';
import { Checkbox, CheckboxProps } from 'antd';
import { Col, InputNumber, Row, Slider, Space } from 'antd';
import { AutoComplete } from 'antd';
import CurrencyRupeeTwoToneIcon from '@mui/icons-material/CurrencyRupeeTwoTone';
import { ChangeEvent, useEffect, useState } from 'react';
import { DownOutlined, PaperClipOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, message } from 'antd';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { fetchAllJobPostForTalent } from '../../services/talentApiService';
import type { JobInterface } from '../../interface/interfaces'
import { AxiosError, AxiosResponse } from 'axios';
import formatRelativeTime from '../../util/timeFormating';
import { talent_routes } from '../../routes/pathVariables';
import { useNavigate } from 'react-router-dom';
import { findMostSuitableJobPost } from '../../util/jobSearchUtils';


const Search = () => {
    const [query, setQuery] = useState<string>("")
    const [posts, setPost] = useState<JobInterface[]>([])
    const [actualPosts, setActualPost] = useState<JobInterface[]>([])
    const [postType, setPostType] = useState<string[]>([])
    const [maxInputValue, setMaxInputValue] = useState<number>(0);
    const [inputValue, setInputValue] = useState<number>(0);
    const [max, setMax] = useState<number>(2000);
    const [allSkills, setAllskills] = useState<string[]>([])

    const [selectedSkills, setSelectedSkills] = useState<string[]>([])
    useEffect(() => {
        fetchAllJobPostForTalent()
            .then((res: AxiosResponse) => {
                setPost(res.data.data)
                setActualPost(res.data.data)
                const maxValue: number = Math.max(...res?.data?.data?.map(obj => obj.Amount));
                setMax(maxValue)
                setMaxInputValue(maxValue)
                const allSkills = res?.data?.data?.flatMap(obj => obj.Skills);
                const uniqueSkills:string[] = Array.from(new Set(allSkills));
                setAllskills(uniqueSkills)
            }).catch((err: AxiosError) => {
                console.log(err)
            })
    }, [])
    const navigate = useNavigate()

    const onChangePrice = (e:string[]) => {
        const array = e
        setInputValue(array[0]);
        setMaxInputValue(array[1])
        searchChange(query)
    };
    const onChangeRadio: CheckboxProps['onChange'] = (e) => {
        setPostType((prevPostType) => {
            if (e.target.checked) {
                return prevPostType ? [...prevPostType, e.target.value] : [e.target.value];
            } else {
                return prevPostType ? prevPostType.filter((type) => type !== e.target.value) : [];
            }
        });
        searchChange(query)
    };
    const mockVal = (str: string, repeat = 1) => ({
        value: str.repeat(repeat)

    });
    const [options, setOptions] = useState<{ value: string }[]>([]);
    const getPanelValue = (searchText: string) =>
        !searchText ? [] : allSkills?.map(skill => mockVal(skill));

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        message.info('Click on menu item.');
    };
    const items: MenuProps['items'] = [
        {
            label: 'Latest',
            key: '1',
            icon: <PaperClipOutlined />,
            danger: true,
        },
        {
            label: 'min to low ',
            key: '2',
            icon: < CurrencyRupeeIcon />,
            danger: true,
        },
        {
            label: 'low to min',
            key: '3',
            icon: < CurrencyRupeeIcon />,
            danger: true,
        },
    ];
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };
    const onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
        searchChange(query)
        searchChange(e.target.value)
    }
    const searchChange: (value: string) => void = (value) => {
        setQuery(value);
        // Filter by title
        const filteredPosts = actualPosts.filter((item: JobInterface) => {
            return item.Title.toLowerCase().includes(value.trim().toLowerCase());
        });

        // Filter by work type
        let typeFilteredPosts = filteredPosts;
        if (postType.length > 0) {
            typeFilteredPosts = filteredPosts.filter((item: JobInterface) => {
                return postType.includes(item.WorkType);
            });
        }

        // Filter by price
        let priceFilteredPosts = typeFilteredPosts;
        if (maxInputValue > inputValue ) {
            console.log(inputValue, "this is the min value", maxInputValue, "max input value ")
            priceFilteredPosts = typeFilteredPosts.filter((item: JobInterface) => {
                if(item.Amount >= inputValue && item.Amount <= maxInputValue){
                    return item
                }
            });
            console.log(priceFilteredPosts)
        }

        // Filter by skills
        let skillsFilteredPosts = priceFilteredPosts;
        if (selectedSkills.length > 0) {
            skillsFilteredPosts = findMostSuitableJobPost(priceFilteredPosts, selectedSkills);
        }

        // Set the final filtered posts
        if (skillsFilteredPosts.length > 0) {
            setPost(skillsFilteredPosts);
        } else if (priceFilteredPosts.length > 0) {
            setPost(priceFilteredPosts);
        } else if (typeFilteredPosts.length > 0) {
            setPost(typeFilteredPosts);
        } else {
            setPost(filteredPosts);
        }
    }
    const handleSetSkill = (value: string) => {
        searchChange(query)
        setSelectedSkills(prevSkills => {
            if (!prevSkills.includes(value)) {
                return [...prevSkills, value];
            }
            return prevSkills;
        });
        searchChange(query)
    }
    return (
        <>
            <AfterLoginHeader />
            <div className="bg-blue-500 absolute -z-10 w-full sm:h-[10vh] md:h-[25vh] xl:h-[50vh] transition-transform duration-150">
            </div>
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
                            <Checkbox onChange={onChangeRadio} className='m-3 font-normal' value='Fixed'>Fixed </Checkbox>
                            <Checkbox onChange={onChangeRadio} className='m-3 font-normal' value="Milestone">Milestone </Checkbox>
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
                        <p className='font-semibold ml-3 text-black'>Skills </p>
                        <Space direction="vertical" className='m-3 mb-5 w-auto'>
                            <AutoComplete
                                options={options}
                                onSearch={(text) => setOptions(getPanelValue(text))}
                                style={{ width: 200 }}
                                onSelect={handleSetSkill}
                            />
                        </Space>
                        {
                            selectedSkills?.map((skill: string, index: number) => (
                                <><Checkbox onChange={onChangeRadio} className='ml-3 font-normal' checked key={index}>{skill}</Checkbox><br /></>
                            ))
                        }
                    </div>
                </div>
                {/* content */}
                <div className='w-[80%]'>
                    <div className='flex justify-between'>
                        <label>Top results <span className="font-normal text-xs">Showing 1-20 of 3291 results</span> </label>
                        <Dropdown menu={menuProps}>
                            <Button className='text-white font-sans font-semibold rounded-xl'>
                                <Space>
                                    Sort by -
                                    <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>
                    </div>
                    <div className='w-full xl:mt-8 md:mt-5 sm:mt1 border rounded-xl h-auto ml-2 bg-white shadow-xl mb-40'>
                        {
                            posts.map((post: JobInterface, index: number) => (
                                <div className='m-5 text-black border-b' key={index} onClick={() => {
                                    localStorage.setItem("deatildView", JSON.stringify(post))
                                    navigate(talent_routes.JobViewPage)
                                }}>
                                    <p>{post.Title}</p>
                                    <p className='text-xs text-gray-400 mt-1'>{post.WorkType} - {post.Expertiselevel} - Est. Budget: {post.Amount} - Posted {formatRelativeTime(post.createdAt)}</p>
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
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search;