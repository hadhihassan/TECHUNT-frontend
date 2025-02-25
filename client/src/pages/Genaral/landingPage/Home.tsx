import Header from "../../../components/General/Home/Header/header";
import Dummy from "../../../components/General/Home/content/dummy";
import DeveView from "../../../components/General/Home/content/developpers";
import Footer from '../../../components/General/Home/footer/footer'
import WorkCategory from "../../../components/General/Home/content/workCategory";
import { FaBuildingLock } from "react-icons/fa6";
import { LuFileSearch } from "react-icons/lu";
import { HiOutlineSave } from "react-icons/hi";

const Home = () => {

    return <>
        <Header layout={false} />
        <Dummy />
        <section className="max-w-full flex justify-center items-center min-h-56 h-auto">
            <div className='w-10/12 bg-white shadow-md  grid gap-10 md:gap-0 grid-cols-1 md:grid-cols-3 rounded-2xl py-10'>
                <div>
                    <ul className="text-center">
                        <li className='flex items-center justify-center'>
                            <FaBuildingLock size={50} className="text-red-400" />
                        </li>
                        <li className="font-medium text-gray-900 font-sans">
                            Create Account
                        </li>
                        <li>
                            <p className="break-keep text-sm text-gray-400">
                                First you have to create a <br /> account  here
                            </p>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className="text-center">
                        <li className='flex items-center justify-center'>
                            <LuFileSearch size={50} className="text-red-400" />
                        </li>
                        <li className="font-medium text-gray-900 font-sans">
                            Search Work
                        </li>
                        <li>
                            <p className="break-keep text-sm text-gray-400">
                                Search the best freelance work here
                            </p>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className="text-center">
                        <li className='flex items-center justify-center'>
                            <HiOutlineSave size={50} className="text-red-400" />
                        </li>
                        <li className="font-medium text-gray-900 font-sans">
                        Save and apply
                        </li>
                        <li>
                            <p className="break-keep text-sm text-gray-400">
                            Apply or save and start your work
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <DeveView />
        <WorkCategory />
        <Footer />
    </>;
}


export default Home;