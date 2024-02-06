import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import routerVariables from "./pathVariables";
import { ROOTSTORE } from '../redux/store'

export function IsLoggedUser() {
    const { verify,isLogged  } = useSelector((state: ROOTSTORE) => state.signup);
    console.log(verify, "verify")
    return (
        isLogged ? <Outlet /> : <Navigate to={routerVariables.Login} />
    )
}
export function IsVerified() {
    const { verify  } = useSelector((state: ROOTSTORE) => state.signup);
    console.log(verify, "verify")
    return (
        verify ? <Outlet /> : <Navigate to={routerVariables.Login} />
    )
}
export function IsNewUser() {
    const { verify  } = useSelector((state: ROOTSTORE) => state.signup);
    console.log(verify, "verify")
    return (
        !verify ? <Outlet /> : <Navigate to={routerVariables.signup} />
    )
}

export function IsNotLoggedUser() {
    const { verify,isLogged } = useSelector((state: ROOTSTORE) => state.signup);
    console.log(verify, "verify")
    return (
        verify&&!isLogged ? <Outlet /> : <Navigate to={routerVariables.signup} />
    )
}
export function CheckUserType() {
    const role: string = useSelector((state: ROOTSTORE) => state.signup.role);

    if (role === "NOTHING") {
        return (
            <Navigate to={routerVariables.Type} />
        )
    }
    return <Outlet />
}
;
