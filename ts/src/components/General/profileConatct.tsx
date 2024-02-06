import { useEffect, useState } from "react";

const profileConatct: React.FC<{ data: {} }> = (data) => {
    const [details, setdetails] = useState({})
    useEffect(() => {
        setdetails(data.data)
    }, [data])

    return (
        <div className="w-[48rem] m-5 rounded-xl  border h-[20rem]  shadow-2xl">
            <div className="flex justify-between">
                <p className="m-4 font-sans font-medium">Conatct Details</p>
                <button className="w-[5rem] mt-3 mr-2 font-sans font-medium rounded-full h-7 border border-red-500 text-red-500">Edit</button>
            </div> <hr />
            <div>
                <div className="w-full max-w-lg m-5">
                    <div className="flex flex-wrap -mx-3 mb-1">
                        <div className="w-full px-3">
                            <label className="block  tracking-wide text-gray-900 text-xs font-bold mb-2" >
                                Address
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-2 px-2 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" readOnly  placeholder={details?.Address} />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-1">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block  tracking-wide text-gray-900 text-xs font-bold mb-2" >
                                City Name
                            </label>
                            <input readOnly className="appearance-none block w-full bg-gray-200 text-gray-900 border  rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder={details?.City}/>
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block  tracking-wide text-gray-900 text-xs font-bold mb-2" >
                                Country Name
                            </label>
                            <input readOnly className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name"  placeholder={details?.Country} />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-1">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block  tracking-wide text-gray-900 text-xs font-bold mb-2" >
                                Zip code/ Pincode                                </label>
                            <input readOnly className="appearance-none block w-full bg-gray-200 text-gray-900 border  rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder={details?.PinCode} />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block  tracking-wide text-gray-900 text-xs font-bold mb-2">
                                Phone number                                </label>
                            <input readOnly className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" placeholder={details?.Number} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}



export default profileConatct;