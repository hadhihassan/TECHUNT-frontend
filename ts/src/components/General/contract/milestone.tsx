import Header from "../Home/Header/afterLoginHeader";
import { Button, } from 'antd';
import ButtonMain from "../button";

const Milestone = () => {
    return <>
        <Header />
        <div className="bg-blue-600 absolute -z-10 w-full h-[50vh] " >
        </div>
        <div className=" font-sans w-[90%] h-auto mb-10 border bg-white m-auto mt-20 rounded-xl">
            <div
                onClick={() => {
                    history.back()
                }}
                className="w-full h-auto  border-b-2 ">
                <Button type={"sd"} className=" m-3 flex justify-center items-center" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>} >
                    Back
                </Button>
            </div>
            <div className="flex justify-between font-sans">
                <div className="h-auto w-[75%] border">
                    {/* s */}
                    <div className="w-full h-auto border ">
                        <div className=" m-2 uppercase tracking-wide text-sm  font-semibold flex ">Company retreats <button className="bg-red-100 text-red-500 border-red-100 w-auto h-auto rounded-xl text-center px-2 border ml-2">Milestone</button></div>
                        <p className="block m-2  leading-tight text-sm  text-slate-500 ">Client name : hadhi hassan </p>
                        <p className="mt-2 m-2  text-slate-500 flex ">Total milestone (<p className="text-red-500 font-semibold font-sans">10</p>)</p>
                    </div>
                    {/* for milestone */}
                    <div className="w-full h-auto border-b-2">
                        <div className=" m-2 uppercase tracking-wide text-sm  font-semibold flex ">Milestones</div>
                        <div className="bg-white">
                            <ol className="m-10 ">
                                <li className="border-l-2 border-red-500 ">
                                    <div className="md:flex flex-start ">
                                        <div className="bg-red-500 w-6 h-6 flex items-center justify-center rounded-full -ml-3.5">
                                            <svg aria-hidden="true" focusable="false" data-prefix="fas" className="animate-pulse text-white w-3 h-3" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                <path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
                                            </svg>
                                        </div>
                                        <div className="block p-6 rounded-lg shadow-lg bg-gray-100 max-w-md ml-6 mb-10">
                                            <div className="flex justify-between mb-4">
                                                <a href="#!" className="font-medium text-red-500 hover:text-red-700 focus:text-red-800 duration-300 transition ease-in-out text-sm">New Web Design</a>
                                                <a href="#!" className="font-medium text-red-500 hover:text-red-700 focus:text-red-800 duration-300 transition ease-in-out text-sm">04 / 02 / 2022</a>
                                            </div>
                                            <p className="text-gray-700 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, et elementum lorem ornare. Maecenas placerat facilisis mollis. Duis sagittis ligula in sodales vehicula.</p>
                                            <button type="button" className="inline-block px-4 py-1.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out" data-mdb-ripple="true">Preview</button>
                                            <button type="button" className="inline-block px-3.5 py-1 border-2 border-red-500 text-red-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" data-mdb-ripple="true">See demo</button>
                                        </div>
                                    </div>
                                </li>
                                <li className="border-l-2 border-green-500">
                                    <div className="md:flex flex-start">
                                        <div className="bg-green-500 w-6 h-6 flex items-center justify-center rounded-full -ml-3.5">
                                            <svg aria-hidden="true" focusable="false" data-prefix="fas" className="text-white w-3 h-3" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                <path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
                                            </svg>
                                        </div>
                                        <div className="block p-6 rounded-lg shadow-lg bg-gray-100 max-w-md ml-6 mb-10">
                                            <div className="flex justify-between mb-4">
                                                <a href="#!" className="font-medium text-red-500 hover:text-red-700 focus:text-red-800 duration-300 transition ease-in-out text-sm">21 000 Job Seekers</a>
                                                <a href="#!" className="font-medium text-red-500 hover:text-red-700 focus:text-red-800 duration-300 transition ease-in-out text-sm">12 / 01 / 2022</a>
                                            </div>
                                            <p className="text-gray-700 mb-6">Libero expedita explicabo eius fugiat quia aspernatur autem laudantium error architecto recusandae natus sapiente sit nam eaque, consectetur porro molestiae ipsam an deleniti.</p>
                                            <button type="button" className="inline-block px-4 py-1.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out" data-mdb-ripple="true">Preview</button>
                                            <button type="button" className="inline-block px-3.5 py-1 border-2 border-red-500 text-red-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" data-mdb-ripple="true">See demo</button>
                                        </div>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>

                {/* right side bar*/}
                <div className="h-[100vh] w-[25%]  font-sans border">
                    <div className="container mt-4 flex  flex-col ">
                        <button className=" bg-red-500 font-sans text-white rounded-xl py-1">End contract </button>
                        <button className=" mt-2 border font-sans  border-black font-semibold rounded-xl py-1">Message </button>
                    </div>
                    <div className="container mt-4 flex  flex-col ">
                        <p className="flex text-xs m-1 text-black font-sans ">Details for this work : <p className="ml-1 hover:underline  text-red-500 font-bold font-sans ">click me</p> </p>
                        <p className="flex text-xs m-1 text-black font-sans ">Details for contract : <p className="ml-1  hover:underline text-red-500 font-bold font-sans ">click me</p> </p>
                    </div>
                    <div className="container mt-4 flex  flex-col ">
                        <p className="text-xs m-1 text-black font-sans ">Next milestone due date : 01/02/2023 </p>
                        <p className="text-xs m-1 text-black font-sans ">Next milestone amount : 30000 </p>
                    </div>
                </div>
            </div>
        </div>
    </>;
}


export default Milestone;


