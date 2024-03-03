import a from '../../assets/4950287_19874-removebg-preview.png'
import { AudioOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import Footer from '../../components/General/Home/footer/footer';
import React from 'react';

const { Search } = Input;


const Message = () => {

    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1677ff',
        }}
    />
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

    return (
        <React.Fragment>
            <div className="bg-blue-900 absolute top-0 flex justify-end items-center   -z-10 w-full h-[50vh] " >
                <img src={a} alt="" className='h-[100%] ' />
            </div>
            <div className='container xl:ml-20 mt-10  md:ml-10  text-white flex flex-col justify-start '>
                <p className='font-sans font-semibold text-sm flex'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                    Back</p>
            </div>
            <p className='font-sans font-semibold sm:ml-5 ml-7 gap  text-2xl text-white md:ml-20 xl:ml-28 mb-5 mt-5'>Messages</p>
            <div className="flex h-screen  text-gray-800 mb-10 w-[90%] m-auto">
                <div className="flex flex-row h-full  overflow-x-hidden bg-white m-5 border rounded-xl ">
                    <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0 border-r ">
                        <div className="flex flex-row items-center justify-center h-12 w-full">
                            <div className="ml-2 font-bold text-2xl">
                                <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200 }} />
                            </div>
                        </div>
                        <div className="flex flex-col mt-8 hover:bg-blue-50 ">
                            <div className="flex flex-row items-center justify-between text-xs">
                                <div className='flex'>
                                    <img src={a} alt="" className='size-16 border rounded-full shadow-sm ' />
                                    <div className=' ml-2 mt-1'>
                                        <p className='font-sans font-semibold'>hadhi</p>
                                        <p className='font-sans font-semibold text-gray-500 mb-1 mt-1'>You: Jai</p>
                                        <p className='font-sans font-semibold text-gray-500'>3m ago</p>
                                    </div>
                                </div>
                                <div className='flex justify-center items-center bg-blue-500 size-5 rounded-full text-white font-sans text-sm '>
                                    1
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col flex-auto h-full p-6">
                        <div className='mb-2 flex justify-between'>
                            <div className='flex '>
                                <img src={a} className='size-14 border rounded-full ' alt="" />
                                <p className='font-sans m-3  font-semibold text-black text-xl'>Hadhi</p>
                            </div>
                            <div className='flex justify-between m-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-red-500 xl:mr-2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-red-500 xl:mr-2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg>

                            </div>
                        </div>
                        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4 shadow-xl border">
                            <div className="flex flex-col h-full overflow-x-auto mb-4">
                                <div className="flex flex-col h-full">
                                    <div className="grid grid-cols-12 gap-y-2">
                                        <div className="col-start-1 col-end-8 p-3 rounded-lg">
                                            <div className="flex flex-row items-center">
                                                <div
                                                    className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                >
                                                    A
                                                </div>
                                                <div
                                                    className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                                                >
                                                    <div>Hey How are you today?</div>
                                                    <label className=' text-end text-xs font-sans text-gray-400'>12m ago</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-start-1 col-end-8 p-3 rounded-lg">
                                            <div className="flex flex-row items-center">
                                                <div
                                                    className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                >
                                                    A
                                                </div>
                                                <div
                                                    className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                                                >
                                                    <div>
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing
                                                        elit. Vel ipsa commodi illum saepe numquam maxime
                                                        asperiores voluptate sit, minima perspiciatis.
                                                    </div>
                                                    <label className=' text-end text-xs font-sans text-gray-400'>12m ago</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-start-6 col-end-13 p-3 rounded-lg">
                                            <div className="flex items-center justify-start flex-row-reverse">
                                                <div
                                                    className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                >
                                                    A
                                                </div>
                                                <div
                                                    className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                                                >
                                                    <div>I'm ok what about you?</div>
                                                    <label className=' text-end text-xs font-sans text-gray-400'>12m ago</label>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="col-start-1 col-end-8 p-3 rounded-lg">
                                            <div className="flex flex-row items-center">
                                                <div
                                                    className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                >
                                                    A
                                                </div>
                                                <div
                                                    className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                                                >
                                                    <div className="flex flex-row items-center">
                                                        <button
                                                            className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-800 rounded-full h-8 w-10"
                                                        >
                                                            <svg
                                                                className="w-6 h-6 text-white"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    stroke-width="1.5"
                                                                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                                                ></path>
                                                                <path
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    stroke-width="1.5"
                                                                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                ></path>
                                                            </svg>
                                                        </button>
                                                        <div className="flex flex-row items-center space-x-px ml-4">
                                                            <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div className="h-4 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div className="h-10 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div className="h-10 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div className="h-12 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div className="h-10 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div className="h-6 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div className="h-5 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div className="h-4 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div className="h-3 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div className="h-10 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div className="h-10 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div className="h-1 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div className="h-1 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                            <div className="h-4 w-1 bg-gray-500 rounded-lg"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div
                                className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4 border shadow-xl "
                            >
                                <div>
                                    <button
                                        className="flex items-center justify-center text-gray-400 hover:text-gray-600"
                                    >
                                        <svg
                                            className="w-5 h-5 shadow-xl text-red-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex-grow ml-4 ">
                                    <div className="relative w-full">
                                        <input
                                            type="text"
                                            className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                        />
                                        <button
                                            className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                                        >
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                ></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="ml-4 shadow-xl ">
                                    <button
                                        className=" flex items-center justify-center bg-red-500 hover:bg-red-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                                    >
                                        <span>Send</span>
                                        <span className="ml-2">
                                            <svg
                                                className="w-4 h-4 transform rotate-45 -mt-px"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                                ></path>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}
export default Message