import { PencilIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    CardFooter,
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
    return (
        <div className=" w-[90%] h-screen m-7">
            <Card placeholder={undefined}>
                <CardHeader floated={false} shadow={false} className="rounded-none" placeholder={undefined}>
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                            <Button
                                onClick={open}
                                className="flex items-center gap-3 bg-blue-500 rounded-xl ml-5 mt-5" size="sm" placeholder={undefined}>
                                Add Plan
                            </Button>
                            <CreatePlanForm isOpen={isOpen} closeModal={close} />
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <div className="w-full md:w-72">
                            <Input
                                placeholder="Search"
                                className="rounded-2xl border-gray-600 ml-5"
                                label="Search"
                                crossOrigin={undefined} />
                        </div>
                    </div>
                </CardHeader>
                <CardBody className=" px-0" placeholder={undefined}>
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
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
                            {plans?.map(
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
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4" placeholder={undefined}>
                    <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined}>
                        Page 1 of 10
                    </Typography>
                    <div className="flex gap-2">
                        <Button variant="outlined" size="sm" placeholder={undefined}>
                            Previous
                        </Button>
                        <Button variant="outlined" size="sm" placeholder={undefined}>
                            Next
                        </Button>
                    </div>
                </CardFooter>
            </Card>
            {
                editOpen && <EditPlanForm isOpen={editOpen} closeModal={closeEdit} data={editData} />
            }
        </div>

    );
}
export default ListAllPlans