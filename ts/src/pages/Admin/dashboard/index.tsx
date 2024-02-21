import CurrencyRupeeSharpIcon from '@mui/icons-material/CurrencyRupeeSharp';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import EngineeringIcon from '@mui/icons-material/Engineering';

const indexDashBoard = () => {
    return (
        <div className="bg-slate-50 w-full">
            <div className="md:flex">
                <div className="w-full h-100vh mt-10">
                    <div className="flex items-center justify-around">
                        <div className="md:flex justify-around bg-white sm:h-[8vh]  md:h-[15vh] sm:w[10vw] md:w-[18vw]  rounded-2xl shadow-xl">
                            <div className="h-[7vh] w-12 bg-black rounded-xl">
                                <CurrencyRupeeSharpIcon className="m-3" color="info" />
                            </div>
                            <div className="mt-2">
                                <p className="font-normal font-sans text-sm">Today's Money</p>
                                <p className="font-bold font-sans text-sm text-gray-600">50,000k</p>
                            </div>
                        </div>
                        <div className="md:flex justify-around bg-white sm:h-[8vh]  md:h-[15vh] sm:w[10vw] md:w-[18vw]  rounded-2xl shadow-xl">
                            <div className="h-[7vh] w-12 bg-black rounded-xl">
                                <GroupIcon className="m-3" color="info" />
                            </div>
                            <div className="mt-2">
                                <p className="font-normal font-sans text-sm">Today's Users</p>
                                <p className="font-bold font-sans text-sm text-gray-600">50,000</p>
                            </div>
                        </div>
                        <div className="md:flex justify-around bg-white sm:h-[8vh]  md:h-[15vh] sm:w[10vw] md:w-[18vw]  rounded-2xl shadow-xl">
                            <div className="h-[7vh] w-12 bg-black rounded-xl">
                                <PersonIcon className="m-3" color="info" />
                            </div>
                            <div className="mt-2">
                                <p className="font-normal font-sans text-sm">Today's Clients</p>
                                <p className="font-bold font-sans text-sm text-gray-600">50,000k</p>
                            </div>
                        </div>
                        <div className="md:flex justify-around bg-white sm:h-[8vh]  md:h-[15vh] sm:w[10vw] md:w-[18vw]  rounded-2xl shadow-xl">
                            <div className="h-[7vh] w-12 bg-black rounded-xl">
                                <EngineeringIcon className="m-3" color="info" />
                            </div>
                            <div className="mt-2">
                                <p className="font-normal font-sans text-sm">Today's Talents</p>
                                <p className="font-bold font-sans text-sm text-gray-600">50,000k</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 m-2">
                        <div className="flex justify-between">
                            <div>
                                <p className="ml-6 font-sans font-semibold text-md">Client</p>
                                {/* <CustomStyles /> */}
                            </div>
                            <div>
                                <p className="ml-6 font-sans font-semibold text-md">Talent</p>
                                {/* <CustomStyles /> */}
                            </div>
                            <div>
                                <p className="ml-6 font-sans font-semibold text-md">Revenue</p>
                                {/* <CustomStyles /> */}
                            </div>
                        </div>
                    </div>
                    <div className="ml-7 m-2 flex">
                        <div className="w-[60%] h-[60vh] rounded-xl shadow-2xl border">
                            <div className="w-full h-[70px]">
                                <p className="m-5 font-sans font-bold text-xl">Most Freelancer Job</p>
                                <div className="flex justify-between text-sm font-sans m-5 font-bold">
                                    <p>Title</p>
                                    <p>No</p>
                                    <p>percentage</p>
                                </div>
                            </div><hr />
                            <div className="flex justify-between font-sans font-semibold text-md  border-b-2">
                                <p className="m-5">web developer</p>
                                <p className="mr-5 mt-5 text-start">230000</p>
                                <p className="m-5">60%</p>
                            </div>
                            <div className="flex justify-between font-sans font-semibold text-md  border-b-2">
                                <p className="m-5">web developer</p>
                                <p className="mr-5 mt-5 text-start">230000</p>
                                <p className="m-5">60%</p>
                            </div>
                            <div className="flex justify-between font-sans font-semibold text-md  border-b-2">
                                <p className="m-5">web developer</p>
                                <p className="mr-5 mt-5 text-start">230000</p>
                                <p className="m-5">60%</p>
                            </div>
                            <div className="flex justify-between font-sans font-semibold text-md  border-b-2">
                                <p className="m-5">web developer</p>
                                <p className="mr-5 mt-5 text-start">230000</p>
                                <p className="m-5">60%</p>
                            </div>
                        </div>
                        {/* <div>

                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default indexDashBoard;