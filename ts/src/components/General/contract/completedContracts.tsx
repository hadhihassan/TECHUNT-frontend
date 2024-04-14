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
        if (role === "CLIENT") {
            navigate(`${clientRoutes.ViewMiles}${contract[index]._id}`)
        } else {
            navigate(`${talent_routes.ViewMiles}${contract[index]._id}`)
        }
    }
    //pagination logic
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage: number = 5;
    const indexOfLastPost: number = currentPage * itemsPerPage;
    const indexOfFirstPost: number = indexOfLastPost - itemsPerPage;
    const paginationContract = contract.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    return <>
        {

            paginationContract?.length ? paginationContract?.map((contract: Contract, index: number) => (
                <><div key={index} className="m-4 w-auto h-auto border rounded-xl border-gray-400 px-3 py-3">
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
                <EmptyJobs title={"No Completed Contracts"} description={"There are currently no completed contracts."} />
            </>
        }
        {
            contract.length > 0 && <div className="flex items-center gap-4 justify-center m-10">
                <button
                    className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {Array.from({ length: Math.ceil(contract.length / itemsPerPage) }, (_, index) => (
                    <button
                        className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${currentPage === index + 1 ? 'bg-gray-900 text-white shadow-md shadow-gray-900/10' : ''}`}
                        type="button"
                        onClick={() => paginate(index + 1)}
                    >
                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                            {index + 1}
                        </span>
                    </button>
                ))}
                <button
                    className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(contract.length / itemsPerPage)}
                >
                    Next
                </button>
            </div>
        }
    </>;
}


export default CompletedContract;
