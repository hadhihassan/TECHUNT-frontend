import Header from "../../components/General/Home/Header/header";
import Dummy from "../../components/General/Home/content/dummy";
import DeveView from "../../components/General/Home/content/developpers";
import Footer from '../../components/General/Home/footer/footer'

const Home = () => {

    return <>
        <Header layout={false} />
        <Dummy />
        <DeveView />
        <Footer />
    </>;
}


export default Home;