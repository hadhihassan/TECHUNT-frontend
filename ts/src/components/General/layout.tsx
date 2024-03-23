import { Outlet } from "react-router";
import AfterLoginHeader from "./Home/Header/afterLoginHeader";
import Footer from "./Home/footer/footer";

function Layout({ isMessage }: { isMessage?: boolean }) {
    return (
        <>
            <AfterLoginHeader />
            <Outlet />
            {
                !isMessage && <Footer />
            }
        </>
    )
}
export default Layout;