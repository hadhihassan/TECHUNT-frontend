import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import EngineeringIcon from '@mui/icons-material/Engineering';
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { useEffect, useState } from 'react';
import { getDashBoardData } from '../../../services/adminApiService';
import { AxiosResponse } from 'axios';
import populateChartData from '../../../util/dashboadHelperFunctions';
export interface overalRevenuseInterface {
    month: string;
    totalAmount: number;
}
export interface UserDataInterface {
    month: string;
    count: number;
}
export interface mostUserWorkInterface {
    _id: string;
    count: number;
}
const IndexDashBoard = () => {
    const [clientData, setClientData] = useState<UserDataInterface[]>([])
    const [talentData, setTalentData] = useState<UserDataInterface[]>([])
    const [mostWorkignFreelancer, setmostWorkignFreelancer] = useState<mostUserWorkInterface[]>([])
    const [overalRevenuse, setOveralRevenuse] = useState<overalRevenuseInterface[]>([])
    useEffect(() => {
        getDashBoardData()
            .then((res: AxiosResponse) => {
                setClientData(res?.data.monthlyClient)
                setmostWorkignFreelancer(res?.data.mostWorkignFreelancer)
                setOveralRevenuse(res?.data.overalRevenuse)
                setTalentData(res?.data.monthlyTalent)
            })
    }, [])
    const chartConfigClient = {
        type: "line",
        height: 240,
        series: [
            {
                name: "Client",
                data: clientData?.map((item: UserDataInterface) => item?.count),
            },
        ],
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
            },
            title: {
                show: "",
            },
            dataLabels: {
                enabled: false,
            },
            colors: ["#020617"],
            stroke: {
                lineCap: "round",
                curve: "smooth",
            },
            markers: {
                size: 0,
            },
            xaxis: {
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
                categories: clientData?.map((item: UserDataInterface) => item?.month),
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
            },
            grid: {
                show: true,
                borderColor: "#dddddd",
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                padding: {
                    top: 5,
                    right: 20,
                },
            },
            fill: {
                opacity: 0.8,
            },
            tooltip: {
                theme: "dark",
            },
        },
    };
    const chartConfigTalent = {
        type: "line",
        height: 240,
        series: [
            {
                name: "Talent",
                data: talentData?.map((item) => item?.count),
            },
        ],
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
            },
            title: {
                show: "",
            },
            dataLabels: {
                enabled: false,
            },
            colors: ["#020617"],
            stroke: {
                lineCap: "round",
                curve: "smooth",
            },
            markers: {
                size: 0,
            },
            xaxis: {
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
                categories: talentData?.map((item) => item?.month),
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
            },
            grid: {
                show: true,
                borderColor: "#dddddd",
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                padding: {
                    top: 5,
                    right: 20,
                },
            },
            fill: {
                opacity: 0.8,
            },
            tooltip: {
                theme: "dark",
            },
        },
    };
    const chartConfigMonth = {
        type: "bar",
        height: 240,
        series: [
            {
                name: "Sales",
                data: populateChartData(overalRevenuse),
            },
        ],
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
            },
            title: {
                show: "",
            },
            dataLabels: {
                enabled: false,
            },
            colors: ["#020617"],
            stroke: {
                lineCap: "round",
                curve: "smooth",
            },
            markers: {
                size: 0,
            },
            xaxis: {
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                ],
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
            },
            grid: {
                show: true,
                borderColor: "#dddddd",
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                padding: {
                    top: 5,
                    right: 20,
                },
            },
            fill: {
                opacity: 0.8,
            },
            tooltip: {
                theme: "dark",
            },
        },
    };
    return (
        <div className="bg-slate-50 w-full">
            <div className="md:flex">
                <div className="w-full h-100vh mt-10">
                    <div className="flex items-center justify-around">
                        <div className="md:flex justify-around bg-white sm:h-[8vh]  md:h-[15vh] sm:w[10vw] md:w-[25vw]  rounded-2xl shadow-xl">
                            <div className="h-[10vh] w-16 bg-gray-900 rounded-xl">
                                <GroupIcon className="m-5" color="info" />
                            </div>
                            <div className="mt-2">
                                <p className="font-normal font-sans text-sm">Today's Users</p>
                                <p className="font-bold font-sans text-sm text-gray-600">
                                    {(clientData?.reduce((acc: number, item: UserDataInterface) => acc + item.count, 0) || 0) +
                                        (talentData?.reduce((acc: number, item: UserDataInterface) => acc + item.count, 0) || 0)}
                                </p>
                            </div>
                        </div>
                        <div className="md:flex justify-around bg-white sm:h-[8vh]  md:h-[15vh] sm:w[10vw] md:w-[25vw]  rounded-2xl shadow-xl">
                            <div className="h-[10vh] w-16 bg-gray-900 rounded-xl">
                                <PersonIcon className="m-5" color="info" />
                            </div>
                            <div className="mt-2">
                                <p className="font-normal font-sans text-sm">Today's Clients</p>
                                <p className="font-bold font-sans text-sm text-gray-600">{clientData?.reduce((acc: number, item: UserDataInterface) => acc + item.count, 0)}</p>
                            </div>
                        </div>
                        <div className="md:flex justify-around bg-white sm:h-[8vh]  md:h-[15vh] sm:w[10vw] md:w-[25vw]  rounded-2xl shadow-xl">
                            <div className="h-[10vh] w-16 bg-gray-900 rounded-xl">
                                <EngineeringIcon className="m-5" color="info" />
                            </div>
                            <div className="mt-2">
                                <p className="font-normal font-sans text-sm">Today's Talents</p>
                                <p className="font-bold font-sans text-sm text-gray-600">{talentData?.reduce((acc: number, item: UserDataInterface) => acc + item.count, 0)}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-around'>
                        <Card placeholder={undefined} className=' m-5'>
                            <CardHeader
                                floated={false}
                                shadow={false}
                                color="transparent"
                                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center" placeholder={undefined}                        >
                                <div className="ml-3 w-max bg-gray-900 p-5 text-white rounded-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 rounded-xl">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
                                    </svg>
                                </div>
                                <div>
                                    <Typography variant="h6" color="blue-gray" placeholder={undefined}>
                                        Client
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="max-w-sm font-normal text-xs" placeholder={undefined}                                >
                                        Graph illustrates the yearly influx of new client into our organization. It serves as a vital indicator of growth, showcasing the number of fresh talents joining our workforce each year
                                    </Typography>
                                </div>
                            </CardHeader>
                            <CardBody className="px-2 pb-0" placeholder={undefined}>
                                <Chart {...chartConfigClient} />
                            </CardBody>
                        </Card>
                        <Card placeholder={undefined} className=' m-5'>
                            <CardHeader
                                floated={false}
                                shadow={false}
                                color="transparent"
                                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center" placeholder={undefined}                        >
                                <div className="ml-3 w-max bg-gray-900 p-5 text-white rounded-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 rounded-xl">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
                                    </svg>
                                </div>
                                <div>
                                    <Typography variant="h6" color="blue-gray" placeholder={undefined}>
                                        Talent
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="max-w-sm font-normal text-xs" placeholder={undefined}                                >
                                        Graph illustrates the yearly influx of new talent into our organization. It serves as a vital indicator of growth, showcasing the number of fresh talents joining our workforce each year
                                    </Typography>
                                </div>
                            </CardHeader>
                            <CardBody className="px-2 pb-0" placeholder={undefined}>
                                <Chart {...chartConfigTalent} />
                            </CardBody>
                        </Card>
                    </div>
                    <Card placeholder={undefined} className='m-8 '>
                        <CardHeader
                            floated={false}
                            shadow={false}
                            color="transparent"
                            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center" placeholder={undefined}                        >
                            <div className="ml-3 w-max bg-gray-900 p-5 text-white rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 rounded-xl">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
                                </svg>
                            </div>
                            <div>
                                <Typography variant="h6" color="blue-gray" placeholder={undefined}>
                                    Yearly Revenue Chart
                                </Typography>
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="max-w-sm font-normal" placeholder={undefined}>
                                    Graph illustrates the monthly organization. It serves as a vital indicator of growth
                                </Typography>
                            </div>
                        </CardHeader>
                        <CardBody className="px-2 pb-0" placeholder={undefined}>
                            <Chart {...chartConfigMonth} />
                        </CardBody>
                    </Card>
                    <table className="border-collapse w-[94%] mb-[50px] m-8 bg-white shadow-lg  ">
                        <thead>
                            <tr className='text-gray-800 font-sans font-semibold'>
                                <th className="border  border-gray-500 p-2">No</th>
                                <th className="border border-gray-500 p-2">Freelancer</th>
                                <th className="border border-gray-500 p-2">Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mostWorkignFreelancer?.map((most:mostUserWorkInterface, index: number) => (
                                <tr key={index} className='text-gray-800 font-sans font-semibold'>
                                    <td className="border border-gray-500 p-2">{index + 1}</td>
                                    <td className="border border-gray-500 p-2">{most?._id as string}</td>
                                    <td className="border border-gray-500 p-2">{most?.count as number}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default IndexDashBoard;