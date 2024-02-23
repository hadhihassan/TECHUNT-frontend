import { Outlet } from "react-router";
import AfterLoginHeader from "../General/Home/Header/afterLoginHeader";

function TalentLayout() {
    return (
        <>
            <AfterLoginHeader />
            <Outlet />
        </>
    )
}
export default TalentLayout;