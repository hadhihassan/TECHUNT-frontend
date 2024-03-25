import React, { useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { Button } from 'antd';
import { fetchCompletedContract } from "../../../services/commonApiService";
import { ROOTSTORE } from "../../../redux/store";
import { INITIALSTATE } from "../../../redux/Slice/signupSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clientRoutes } from "../../../routes/pathVariables";
import { talent_routes } from "../../../routes/pathVariables";
import EmptyJobs from "../emptyData/emptyJobs";


interface Contract {
    _id: string,
    talent: string;
    client: { First_name: string };
    work: { Title: string }
    terms: string;
    duration: Date[];
    amount: number;
    status: 'pending' | 'active' | 'completed' | 'cancelled';
    milestones: string[];
    paymentTerms?: string;
    notes?: string;
    isAcceded: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const CompletedContract: React.FC = () => {
    const role: INITIALSTATE["role"] = useSelector((state: ROOTSTORE) => state?.signup?.role)
    const [show, setShow] = useState<boolean>(false)
    const [contract, setActiveContract] = useState<Contract[]>([])
    const navigate = useNavigate()
    useEffect(() => {
        fetchActiveContract()
    }, [])

    const fetchActiveContract = () => {
        fetchCompletedContract(role)
            .then((res: AxiosResponse) => {
                setActiveContract(res?.data?.data)
                console.log(res)
            })
            .catch((err: AxiosError) => {
                console.log(err.message)
            })
    }

    const handleNavigateFullDetail = (index: number) => {
        localStorage.setItem("contractDetails", JSON.stringify(contract[index]) || "")
        if (role === "CLIENT") {
            navigate(clientRoutes.ViewMiles)
        } else {
            navigate(talent_routes.ViewMiles)
        }
    }
    return <>
        {

            contract?.length ? contract?.map((contract: Contract, index: number) => (
                <><div key={index} className="m-4 w-auto h-auto border border-gray-400 rounded-lg px-3 py-3">
                    <h1 className="font-sans font-medium text-gray-900 underline  ">Contract of {contract?.work?.Title}</h1>
                    <h1 className="font-sans font-semibold text-gray-500  text-sm break-all ">Client name: {contract?.client?.First_name}  </h1>
                    <h1 className="font-sans font-semibold text-gray-500  text-sm break-all ">Total {contract.milestones.length} Milestone  </h1>
                    <h1 className="font-sans font-semibold text-gray-900 underline  m-1">Terms Conditions </h1>
                    <p className="font-sans font-semibold text-gray-500  text-xs text-start break-all" dangerouslySetInnerHTML={{ __html: contract?.terms }}></p>
                    {
                        show && <>
                            <h1 className="font-sans font-semibold text-gray-900 underline  m-1">Payment Terms  </h1>
                            <p className="font-sans font-semibold text-gray-500  text-xs text-start break-all">{contract?.paymentTerms}</p>
                            {
                                contract.notes && <>
                                    <h1 className="font-sans font-semibold text-gray-900 underline  m-1">Notes</h1>
                                    <p className="font-sans font-semibold text-gray-500  text-xs text-start break-all">{contract?.notes}</p>
                                </>
                            }
                        </>
                    }
                    <div key={index} className="flex justify-center w-auto ">
                        <Button className="m-3" onClick={() => setShow(!show)}>Show more</Button>
                        <Button className="m-3" onClick={() => handleNavigateFullDetail(index)}>Show details</Button>
                    </div>
                </div>
                    <br />
                </>
            )) : <>
                <EmptyJobs title={"No Completed Contracts"} description={"There are currently no completed contracts."}/>
            </>
        }
    </>;
}


export default CompletedContract;
