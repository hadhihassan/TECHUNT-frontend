import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaWordpress } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa6";
import { TbBrandNextjs } from "react-icons/tb";


const DeveView = () => {
    return (<><section className='w-full mt-10 px-5 md:px-20  h-auto my-5 md:my-10'>
            <div className="grid grid-cols-1 md:grid-cols-2 text-center md:text-start gap-10 md:gap-0">
                <p className='text-3xl font-medium '>Recently Posted <span className="text-red-500">Works</span>
                    <p className='text-lg text-gray-500 text-center md:text-start'>The latest freelance work!</p>
                </p>
                <div className="text-center md:text-end">
                    <button className="border rounded-full p-3 text-red-500"><FaArrowLeft /></button>
                    <button className="border rounded-full p-3 bg-red-500 text-white"><FaArrowRight /></button>
                </div>
            </div>
            <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6">
                <div className="m-auto h-64 w-64 rounded-3xl shadow-xl border text-center flex flex-col gap-3 items-center justify-center p-2">
                    <FaReact className="text-cyan-500" size={50} />
                    <p className="font-medium">Frontend Development</p>
                    <p className="text-sm text-gray-500 break-keep">
                        Need a professional logo with writing underneath for our jewellery company
                    </p>
                    <div className="m-auto flex justify-between w-full flex-wrap">
                        <p className="text-gray-800 text-sm  break-before-all">Highest paid <br />
                            $500</p>
                        <Link className="text-sm underline text-red-500" to='/'>Apply now</Link>
                    </div>
                </div>
                <div className="m-auto h-64 w-64 rounded-3xl shadow-xl border text-center flex flex-col gap-3 items-center justify-center p-2">
                    <FaWordpress className="text-blue-500" size={50} />
                    <p className="font-medium">Web Development</p>
                    <p className="text-sm text-gray-500 break-keep">
                        Need a professional logo with writing underneath for our jewellery company
                    </p>
                    <div className="m-auto flex justify-between w-full flex-wrap">
                        <p className="text-gray-800 text-sm  break-before-all">Highest paid <br />
                            $500</p>
                        <Link className="text-sm underline text-red-500" to='/'>Apply now</Link>
                    </div>
                </div>
                <div className="m-auto h-64 w-64 rounded-3xl shadow-xl border text-center flex flex-col gap-3 items-center justify-center p-2">
                    <FaNodeJs className="text-green-500" size={50} />
                    <p className="font-medium">Server Development</p>
                    <p className="text-sm text-gray-500 break-keep">
                        Need a professional logo with writing underneath for our jewellery company
                    </p>
                    <div className="m-auto flex justify-between w-full flex-wrap">
                        <p className="text-gray-800 text-sm  break-before-all">Highest paid <br />
                            $500</p>
                        <Link className="text-sm underline text-red-500" to='/'>Apply now</Link>
                    </div>
                </div>
                <div className="m-auto h-64 w-64 rounded-3xl shadow-xl border text-center flex flex-col gap-3 items-center justify-center p-2">
                    <TbBrandNextjs  size={50} />
                    <p className="font-medium">Frontend Development</p>
                    <p className="text-sm text-gray-500 break-keep">
                        Need a professional logo with writing underneath for our jewellery company
                    </p>
                    <div className="flex justify-between w-full flex-wrap">
                        <p className="text-gray-800 text-sm  break-before-all">Highest paid <br />
                            $500</p>
                        <Link className="text-sm underline text-red-500" to='/'>Apply now</Link>
                    </div>
                </div>
            </div>
        </section>
    </>);
}


export default DeveView;