import Header from "../../components/General/Home/Header/header";
import Dummy from "../../components/General/Home/content/dummy";
import DeveView from "../../components/General/Home/content/developpers";
import Footer from '../../components/General/Home/footer/footer'
import WorkCategory from "../../components/General/Home/content/workCategory";
import { useEffect, useRef } from "react";

const Home = () => {
    
    return <>
        <Header layout={false} />
        <Dummy />
        <div className="relative font-inter antialiased">
            <main className="relative h-auto flex flex-col justify-center overflow-hidden">
                <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-24">
                    <div className="text-center">
                        <div
                            className="w-full inline-flex flex-nowrap overflow-hidden mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)"
                        >
                            <ul  className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
                                <li>
                                    <img src="https://cruip-tutorials.vercel.app/logo-carousel/facebook.svg" alt="Facebook" />
                                </li>
                                <li>
                                    <img src="https://cruip-tutorials.vercel.app/logo-carousel/disney.svg" alt="Disney" />
                                </li>
                                <li>
                                    <img src="https://cruip-tutorials.vercel.app/logo-carousel/airbnb.svg" alt="Airbnb" />
                                </li>
                                <li>
                                    <img src="https://cruip-tutorials.vercel.app/logo-carousel/apple.svg" alt="Apple" />
                                </li>
                                <li>
                                    <img src="https://cruip-tutorials.vercel.app/logo-carousel/spark.svg" alt="Spark" />
                                </li>
                                <li>
                                    <img src="https://cruip-tutorials.vercel.app/logo-carousel/samsung.svg" alt="Samsung" />
                                </li>
                                <li>
                                    <img src="https://cruip-tutorials.vercel.app/logo-carousel/quora.svg" alt="Quora" />
                                </li>
                                <li>
                                    <img src="https://cruip-tutorials.vercel.app/logo-carousel/sass.svg" alt="Sass" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div >
        <DeveView />
        <WorkCategory />
        <Footer />
    </>;
}


export default Home;