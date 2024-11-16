import { Navigate, Outlet } from "react-router-dom";
import routerVariables from "../pathVariables";
import { ROOTSTORE } from "../../redux/store";
import { useSelector } from "react-redux";
import { message } from "antd";
export function IsLoggedUser() {
    const userDatas = useSelector((state: ROOTSTORE) => state.signup);
    const url = window.location.pathname;
    const endPoints = url.slice(1, 7).toUpperCase();
    return userDatas?.role === endPoints ? <Outlet /> : <Navigate to={routerVariables.Login} />;
}
export function IsNoteLoggedUser(): React.ReactElement {
    const userDatas = useSelector((state: ROOTSTORE) => state.signup);
    if (userDatas?.isLogged) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
}
export function IsNoteLoggedAdmin() {
    const userDatas = useSelector((state: ROOTSTORE) => state.signup);
    if (userDatas?.isLogged) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
}
export function IsVerified() {
    const data = useSelector((state: ROOTSTORE) => state.signup);
    return (data?.verify && !data?.isLogged) ? <Outlet /> : <Navigate to={routerVariables.signup} />;
}
export function IsNewUser() {
    const verify = useSelector((state: ROOTSTORE) => state.signup.verify);
    return !verify ? <Outlet /> : <Navigate to={routerVariables.Landing} />;
}
export function CheckUserType() {
    const userDatas = useSelector((state: ROOTSTORE) => state.signup);
    return userDatas?.role === "NOTHING" ? <Navigate to={routerVariables.Type} /> : <Outlet />;
}
export function CheckPreminumUser() {
    const userDatas = useSelector((state: ROOTSTORE) => state.signup);
    if (!userDatas?.premiumUser) {
        message.info("Purchase plan then you will get add on features !")
        return <Navigate to={`plan/`} />;
    }
    return <Outlet />;
}
