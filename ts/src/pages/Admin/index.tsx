import React, { useRef,useEffect, useState } from "react";
import { SidePanel } from "../../util/imports";
import JobCategories from "./jobCategories";
import UserManagement from "./userManagment";


const indexAdmin = () => {
    const childRef:React.MutableRefObject<any> = useRef(null);
    const [state, setState] = useState({
        user:childRef.current?.tablesState?.userManamgent,
        job:childRef.current?.tablesState?.jobCategories
    })
    return (
        <>
            <div className="flex">
                <SidePanel ref={childRef} state={setState}/>
                {state.user ?
                    <UserManagement />
                    :
                    <JobCategories />
                }
            </div>
        </>
    )
}

export default React.memo(indexAdmin)