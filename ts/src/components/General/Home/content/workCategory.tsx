import React, { useState, useRef } from 'react';
import ReactCardSlider from "react-card-slider-component";
import quality from '../../../../assets/images.png'
import const_and_secure from '../../../../assets/download.png'
const workCategory = () => {

    const slides = [
        {

            image: "https://picsum.photos/600/500",
            title: "TDevelopment & IT",
            description: "User experience designers",
            clickEvent: "sliderClick"
        },
        {
            image: "https://picsum.photos/600/500",
            title: "TDevelopment & IT",
            description: "User experience designers",
            clickEvent: "sliderClick"
        },
        {
            image: "https://picsum.photos/700/600",
            title: "This is a third title",
            description: "User experience designers",
            clickEvent: "sliderClick"
        },

    ];

    return (
        <div className="m-auto  w-[50rem] h-[230vh]">
            <div className="mt-5">
                <div className="m-auto mt-3 w-[50rem] h-[190vh] ">
                    <h1 className=" font-montserrat text-3xl text-center font-bold">Top Work Categories</h1>
                    <div className="mt-20">
                        <div className="flex justify-between m-auto">
                            <span className="font-medium text-gray-600 ">Development & IT</span>
                            <span className="font-medium text-red-500 " >Design & Creative <div className="h-[3px] bg-red-500 mb-1"></div> </span>
                            <span className="font-medium text-gray-600">UI & UX</span>
                            <span className="font-medium text-gray-600">Web Deveopment</span>
                        </div>
                        <div className="bg-gray-600 h-[2px] "></div>
                        <div className="mt-10">
                            <p className="text-center font-medium font-montserrat">
                                A Job Category is a broad-based group of employees with comparable job responsibilities located at comparable levels of responsibility within an organization.
                            </p>

                        </div>
                        <div className='m-10'>
                            <ReactCardSlider slides={slides} />
                        </div>
                    </div>
                    <div className='m-20'>
                        <h1 className=" font-montserrat text-3xl text-center font-bold">Best Rating Freelancers</h1>
                        <div className="mt-16">
                            <p className="text-center font-medium font-montserrat">
                                A Job Category is a broad-based group of employees with comparable job responsibilities located at comparable levels of responsibility within an organization.
                            </p>
                        </div>
                        <div className='m-10'>
                            <ReactCardSlider slides={slides} />
                        </div>
                    </div>
                    <div>
                        <h1 className=" font-montserrat text-3xl text-center font-bold">Why Techunt</h1>
                        <div className='flex justify-between items-center m-8'>
                            <div className='mr-5'>
                                <p className='text-2xl font-bold'>Quality work</p>
                                <img src={quality} className="size-20 m-auto" alt="" />
                            </div>
                            <div className='mr-5'>
                                <p className='text-2xl font-bold'>No cost until you hire</p>
                                <img src={quality} className="size-20 m-auto" alt="" />
                            </div>
                            <div className='ml-5'>
                                <p className='text-2xl font-bold'>Safe and secure</p>
                                <img src={const_and_secure} className="size-20 m-auto" alt="" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>


    );
}



export default workCategory;
