import { getAllJobCategoies } from "../../../api/admin.Api";
import SidePanel from "../../../components/Admin/sidePanel";
import Tables from "../../../components/General/tables";
import { JOB_CATEGORY_COLUMN } from "../../../constant/columns";
import React, { useEffect, useState } from 'react'

const jobCategories = () => {
    const [data, setData] = useState<any[]>([])
    useEffect(() => {
        fetchAllJobCategories()
    }, [])
    const fetchAllJobCategories = () => {
        getAllJobCategoies()
            .then((res: any) => {
                console.log(res?.data?.data?.data)
                setData(res?.data?.data?.data)
            }).catch((err) => {
                console.log(err)
            })
    }
    return (
        <>
            <div className="flex">
                <SidePanel/>
                <Tables columns={JOB_CATEGORY_COLUMN} data={data} reCall={fetchAllJobCategories} />;
            </div>
        </>
    )
};



export default React.memo(jobCategories);