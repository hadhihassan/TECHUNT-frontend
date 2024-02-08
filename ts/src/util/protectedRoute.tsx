import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import routerVariables from "./pathVariables";
import { ROOTSTORE } from '../redux/store'
import { useContext } from "react";
import { MyContext } from "../context/myContext";

export function IsLoggedUser() {
    const userDatas:any = useContext(MyContext)
    const url: string = window.location.pathname
    const path: string = url.slice(1,7)
    const endPoints = path.toUpperCase()
    if (userDatas?.role === endPoints){
        return <Outlet />
    }else{
        return <Navigate to={routerVariables[404]} />
    }
    
}
export function IsVerified() {
    const userDatas = useContext(MyContext)
    if (userDatas?.verify) {
        return <Outlet />
    } else {
        return <Navigate to={routerVariables.signup} />
    }

}

export function IsNewUser() {
    const userDatas = useContext(MyContext)
    return (
        !userDatas?.verify ? <Outlet /> : <Navigate to={routerVariables.Landing} />
    )
}

export function CheckUserType() {
    const userDatas = useContext(MyContext)

    if (userDatas?.role === "NOTHING") {
        return (
            <Navigate to={routerVariables.Type} />
        )
    }
    return <Outlet />
}
;
