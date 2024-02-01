import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import routerVariables from "./pathVariables";
import { ROOTSTORE } from '../redux/store'

export function IsLoggedUser() {
    const { verify } = useSelector((state: ROOTSTORE) => state.signup);
    console.log(verify,"verify")
    return (
        verify ? <Outlet /> : <Navigate to={routerVariables.Login} />
    )
}

export function IsNotLoggedUser() {
    const { verify } = useSelector((state: ROOTSTORE) => state.signup);
    console.log(verify,"verify")
    return (
        !verify ? <Outlet /> : <Navigate to={routerVariables.Landing} />
    )
}

;
