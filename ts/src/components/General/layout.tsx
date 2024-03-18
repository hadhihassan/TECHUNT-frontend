import { Outlet } from "react-router";
import AfterLoginHeader from "./Home/Header/afterLoginHeader";
import Footer from "./Home/footer/footer";

function Layout() {
    return (
        <>
            <AfterLoginHeader />
            <Outlet />
            <Footer/>
        </>
    )
}
export default Layout;