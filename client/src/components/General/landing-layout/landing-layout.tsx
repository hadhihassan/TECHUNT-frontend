import { Outlet } from 'react-router-dom'
import Footer from '../Home/footer/footer';
import Header from '../Home/Header/header';

const LandingLayout = () => {
    return <>
        <Header layout={true} />
        <Outlet />
        <Footer />
    </>;
}

export default LandingLayout;