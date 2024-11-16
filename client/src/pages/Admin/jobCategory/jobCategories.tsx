import { getAllJobCategoies } from "../../../services/adminApiService";
import Tables from "../../../components/General/ui/tables";
import { JOB_CATEGORY_COLUMN } from "../../../constant/columns";
import React, { useEffect, useState } from 'react'
interface JobInterface {
    _id?: string;
    name: string,
    description: string,
    image: File | null
}
const JobCategories = () => {
    const [data, setData] = useState<JobInterface[]>([])
    useEffect(() => {
        fetchAllJobCategories()
    }, [])
    const fetchAllJobCategories = () => {
        getAllJobCategoies()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then((res:any) => {
                setData(res?.data?.data?.data)
            }).catch((err) => {
                console.log(err)
            })
    }
    return (
        <>
            <Tables columns={JOB_CATEGORY_COLUMN} data={data} reCall={fetchAllJobCategories} />;
        </>
    )
};



// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(JobCategories);