import { Outlet } from "react-router";
import AfterLoginHeader from "./Home/Header/afterLoginHeader";

function Layout() {
    return (
        <>
            <AfterLoginHeader />
            <Outlet />
        </>
    )
}
export default Layout;