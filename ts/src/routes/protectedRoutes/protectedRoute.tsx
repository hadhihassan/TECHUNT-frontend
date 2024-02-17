import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import routerVariables from "../pathVariables";
import { MyContext } from "../../context/myContext";
import { ROOTSTORE } from "../../redux/store";
import { useSelector } from "react-redux";
export function IsLoggedUser() {
    const userDatas = useSelector((state: ROOTSTORE) => state.signup);
    const url = window.location.pathname;
    const endPoints = url.slice(1, 7).toUpperCase();
    return userDatas?.role === endPoints ? <Outlet /> : <Navigate to={routerVariables[404]} />;
}
export function IsVerified() {
    const data = useSelector((state: ROOTSTORE) => state.signup);
    return (data?.verify&&!data?.isLogged) ? <Outlet /> : <Navigate to={routerVariables.signup} />;
}
export function IsNewUser() {
    const verify = useSelector((state: ROOTSTORE) => state.signup.verify);
    return !verify ? <Outlet /> : <Navigate to={routerVariables.Landing} />;
}
export function CheckUserType() {
    const userDatas = useSelector((state: ROOTSTORE) => state.signup);
    return userDatas?.role === "NOTHING" ? <Navigate to={routerVariables.Type} /> : <Outlet />;
}
