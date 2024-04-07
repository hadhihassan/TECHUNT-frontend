import { PencilIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import CreatePlanForm, { PlanInterface } from "./createPlanForm";
import { useEffect, useState } from "react";
import { getAllPlan } from "../../../services/adminApiService";
import { AxiosResponse } from "axios";
import EditPlanForm from "./editPlanForm";

const TABLE_HEAD = ["No", "Name", "Description", "Amount", "Type", "Action"];

export function ListAllPlans() {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [editOpen, setEditOpen] = useState<boolean>(false)
    const [plans, setPlans] = useState<PlanInterface[]>([])
    const [editData, setEdit] = useState<string>("")

    const close = () => setIsOpen(false)
    const open = () => setIsOpen(true)

    const closeEdit = () => setEditOpen(false)
    const openEdit = () => setEditOpen(true)
    const hadnleOpenEdit = (index: number) => {
        setEdit(plans[index]?._id || "")
        openEdit()
    }
    useEffect(() => {
        getAllPlan()
            .then((res: AxiosResponse) => {
                setPlans(res?.data?.data || null)
            })
    }, [isOpen, editOpen])
    // paginaion logic
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage: number = 5;
    const indexOfLastPost: number = currentPage * itemsPerPage;
    const indexOfFirstPost: number = indexOfLastPost - itemsPerPage;
    const slicesPlans = plans.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    return (
        <div className=" w-[90%] h-screen m-7">
            <Card placeholder={undefined}>
                <CardHeader floated={false} shadow={false} className="rounded-none flex justify-between items-center" placeholder={undefined}>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row ">
                        <div className="w-full md:w-72 ">
                            <Input
                                placeholder="Search"
                                className=" appearance-none border-2 border-gray-200 rounded w-full ml-5 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                crossOrigin={undefined} />
                        </div>
                    </div>
                    <div className="mb-8 flex items-center justify-between gap-8 mr-5">
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                            <Button
                                onClick={open}
                                className="flex items-center gap-3 px-5 py-3  bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline rounded-xl ml-5 mt-5" size="sm" placeholder={undefined}>
                                Add Plan
                            </Button>
                            <CreatePlanForm isOpen={isOpen} closeModal={close} />
                        </div>
                    </div>
                </CardHeader>
                <CardBody className=" px-0" placeholder={undefined}>
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead className="bg-gray-300">
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70" placeholder={undefined}                                    >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {slicesPlans?.map(
                                ({ name, description, amount, type }, index) => {
                                    const isLast = index === plans.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";
                                    return (
                                        <tr key={index}>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal" placeholder={undefined}                                                    >
                                                            {index + 1}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal" placeholder={undefined}                                                >
                                                        {name}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal" placeholder={undefined}                                            >
                                                    {description}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal" placeholder={undefined}                                            >
                                                    {amount}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal" placeholder={undefined}                                            >
                                                    {type}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Tooltip content="Edit User">
                                                    <IconButton variant="text" placeholder={undefined}>
                                                        <PencilIcon
                                                            onClick={() => hadnleOpenEdit(index)}
                                                            className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>


                                            </td>
                                        </tr>
                                    );
                                },
                            )}
                        </tbody>
                    </table>
                </CardBody>

            </Card>
            {
                editOpen && <EditPlanForm isOpen={editOpen} closeModal={closeEdit} data={editData} />
            }
                    <div className="flex items-end gap-4 justify-end m-10">
                        <button
                            className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        {Array.from({ length: Math.ceil(plans.length / itemsPerPage) }, (_, index) => (
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
                            disabled={currentPage === Math.ceil(plans.length / itemsPerPage)}
                        >
                            Next
                        </button>
                    </div>
        </div>

    );
}
export default ListAllPlans