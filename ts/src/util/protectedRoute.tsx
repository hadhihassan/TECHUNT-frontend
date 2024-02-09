import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import routerVariables from "./pathVariables";
import { MyContext } from "../context/myContext";

export function IsLoggedUser() {
    const userDatas = useContext(MyContext);
    const url = window.location.pathname;
    const endPoints = url.slice(1, 7).toUpperCase();
    return userDatas?.role === endPoints ? <Outlet /> : <Navigate to={routerVariables[404]} />;
}
export function IsVerified() {
    const userDatas = useContext(MyContext);
    return userDatas?.verify ? <Outlet /> : <Navigate to={routerVariables.signup} />;
}
export function IsNewUser() {
    const userDatas = useContext(MyContext);
    return !userDatas?.verify ? <Outlet /> : <Navigate to={routerVariables.Landing} />;
}
export function CheckUserType() {
    const userDatas = useContext(MyContext);
    return userDatas?.role === "NOTHING" ? <Navigate to={routerVariables.Type} /> : <Outlet />;
}
