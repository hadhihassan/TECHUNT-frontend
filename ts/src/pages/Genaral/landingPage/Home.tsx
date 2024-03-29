import Header from "../../../components/General/Home/Header/header";
import Dummy from "../../../components/General/Home/content/dummy";
import DeveView from "../../../components/General/Home/content/developpers";
import Footer from '../../../components/General/Home/footer/footer'
import WorkCategory from "../../../components/General/Home/content/workCategory";
import { useEffect, useRef } from "react";

const Home = () => {
    
    return <>
        <Header layout={false} />
        <Dummy />
        <DeveView />
        <WorkCategory />
        <Footer />
    </>;
}


export default Home;