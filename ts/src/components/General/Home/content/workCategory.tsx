import { useEffect, useState } from 'react';
import ReactCardSlider from "react-card-slider-component";
import quality from '../../../../assets/images.png'
import const_and_secure from '../../../../assets/download.png'
import {
    Tabs,
    TabsHeader,
    Tab,
    TabsBody,
    TabPanel
} from "@material-tailwind/react";
import { getAllJobCategoies, getAllUser } from '../../../../services/adminApiService';



const WorkCategory = () => {
    const [tabsHeader, setTabsHeader] = useState<object[]>([]);
    const [user, setUser] = useState<object[]>([]);
    useEffect(() => {
        getAllJobCategoies()
            .then((res) => {
                console.log(res)
                setTabsHeader(res?.data?.data?.data)
            }).catch((err) => console.log(err))
            getAllUser()
            .then((res) => {
                console.log(res)
                setUser(res?.data?.data?.talent)
            }).catch((err) => console.log(err))
    }, [])
    const [activeTab, setActiveTab] = useState("html");
    // const slides = [
    //     {
    //         image: "https://picsum.photos/600/500",
    //         title: "TDevelopment & IT",
    //         description: "User experience designers",
    //         clickEvent: "sliderClick"
    //     },
    //     {
    //         image: "https://picsum.photos/600/500",
    //         title: "TDevelopment & IT",
    //         description: "User experience designers",
    //         clickEvent: "sliderClick"
    //     },
    //     {
    //         image: "https://picsum.photos/700/600",
    //         title: "This is a third title",
    //         description: "User experience designers",
    //         clickEvent: "sliderClick"
    //     },
    // ];
    return (
        <div className="m-auto  w-[60%] h-auto">
            <div className="mt-5">
                <div className="m-auto mt-3 w-full h-auto ">
                    <h1 className=" font-montserrat  text-center font-bold sm:text-xl md:text-xl text-xl xl:text-3xl">Top Work Categories</h1>
                    <div className="mt-20">
                        <Tabs indicatorColor="secondary" >
                            <TabsHeader
                                className="rounded-none border-b border-gray-500 bg-transparent p-0"
                                indicatorProps={{
                                    className: "bg-transparent border-b-2 border-red-900  shadow-none rounded-none",
                                }} placeholder={undefined}                            >
                                {tabsHeader?.map(({ name }) => (
                                    <Tab
                                        key={name}
                                        value={name}
                                        onClick={() => setActiveTab(name)}
                                        className={`${activeTab === name ? "text-red-500 xl:font-semibold " : " font-sans xl:font-semibold   " } sm:text:xs md:text:xs xl:text-xl text-xs  `} placeholder={undefined}                                    >
                                        {name}
                                    </Tab>
                                ))}
                            </TabsHeader>
                            <TabsBody placeholder={undefined}>

                                <div className="mt-10">
                                    <p className="text-center font-medium font-montserrat">
                                        {tabsHeader?.map(({ name, description }) => (
                                            <TabPanel key={name} value={name} className="text-center font-medium font-montserrat sm:text:xs md:text:xs xl:text-xl text-xs ">
                                                {description}
                                            </TabPanel>
                                        ))}
                                    </p>
                                </div>
                            </TabsBody>
                        </Tabs>
                        <div className='m-10 w-full'>
                            <ReactCardSlider slides={user} />
                        </div>
                    </div>
                    <div>
                        <h1 className=" font-montserrat text-3xl text-center font-bold ">Why Techunt</h1>
                        <div className='m-8 grid grid-cols-3 gap-4 w-auto'>
                            <div className='grid grid-cols-1 m-auto gap-3 sm:col-span-3 md:col-span-3 xl:col-span-1 col-span-3 w-auto'>
                                <p className='text-xl font-normal sm:text-sm md:text-xl md:font-bold xl:text-xl w-auto'>Quality work</p>
                                <img src={quality} className="size-20 m-auto" alt="" />
                            </div>
                            <div className='grid grid-cols-1 m-auto gap-3 sm:col-span-3 md:col-span-3 xl:col-span-1 col-span-3 w-auto'>
                                <p className='text-xl font-normal sm:text-sm md:text-xl md:font-bold xl:text-xl w-auto'>No cost until you hire</p>
                                <img src={quality} className="size-20 m-auto" alt="" />
                            </div>
                            <div className='grid grid-cols-1 m-auto gap-3 sm:col-span-3 md:col-span-3 xl:col-span-1 col-span-3 w-auto '>
                                <p className='text-xl font-normal sm:text-sm md:text-xl md:font-bold xl:text-xl w-auto'>Safe and secure</p>
                                <img src={const_and_secure} className="size-20 m-auto" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}



export default WorkCategory;
