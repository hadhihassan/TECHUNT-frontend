const bankTypes = ["Savings", "Current", "Joint", "Business", "Student", "Retirement", "Online", "Islamic", "Credit Union", "Community", "Private"];
import { Dialog, Transition } from '@headlessui/react'
import React, {  useState, Fragment } from "react";
import {
    Card,
    CardBody,
    Input,
    Button,
    Typography,
    Tabs,
    TabsBody,
    TabPanel,
    Option,
    Select,

} from "@material-tailwind/react";
import {
    LockClosedIcon,
} from "@heroicons/react/24/solid";
import { addBankDetails } from "../../../../services/commonApiService";
import { useDispatch, useSelector } from "react-redux";
import { ROOTSTORE } from "../../../../redux/store";
import { INITIALSTATE, isBankVeried } from "../../../../redux/Slice/signupSlice";
import { message } from "antd";


export default function CheckoutForm({ onUpdate }: { onUpdate: () => void }) {
    const userData: INITIALSTATE = useSelector((state: ROOTSTORE) => state.signup)
    const [isOpen, setIsOpen] = useState(true)

    function closeModal() {
        setIsOpen(false)
    }
    const [bankDetails, setDetails] = useState({
        bank_name: "",
        account_holder_name: "",
        account_number: "",
        ifsc_code: "",
        account_type: "",
    })
    const dispatch = useDispatch()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleOnChnage = (e: { target: { name: string, value: string } } | any) => {
        if (e.target) {
            const { name, value } = e.target;
            setDetails({
                ...bankDetails,
                [name]: value
            })
        } else {
            setDetails({
                ...bankDetails,
                account_type: ""
            })
        }
    }
    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        addBankDetails(userData.id as string || "", userData.role, bankDetails)
            .then(() => {
                message.success("Bank details added .")
                dispatch(isBankVeried(true))
                onUpdate()
            }).catch(() => {
                message.success("Something went wrong !. try agin .")
            })
    }
    return (<>
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Card className="w-full  max-w-[30rem] h-auto " placeholder={undefined}>
                                    <Typography className="m-auto mt-3" variant="h5" placeholder={undefined}>Fill you bank details</Typography>
                                    <CardBody placeholder={undefined}>
                                        <Tabs value={"card"} className="overflow-visible">
                                            <TabsBody
                                                className=""
                                                animate={{
                                                    initial: {
                                                        x: 400,
                                                    },
                                                    mount: {
                                                        x: 0,
                                                    },
                                                    unmount: {
                                                        x: 400,
                                                    },
                                                }} placeholder={undefined}                    >
                                                <TabPanel value="card" className="p-0">
                                                    <form className=" flex flex-col gap-4" onSubmit={submit}>
                                                        <div className=" flex items-center gap-4">
                                                            <div className="w-full">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="mb-1 font-medium" placeholder={undefined}                                    >
                                                                    Holder Name
                                                                </Typography>
                                                                <Input
                                                                    onChange={handleOnChnage}
                                                                    name="account_holder_name"
                                                                    placeholder="name@mail.com"
                                                                    className="w-full !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                                    labelProps={{
                                                                        className: "before:content-none after:content-none",
                                                                    }} crossOrigin={undefined} />
                                                            </div>
                                                            <div className="w-full">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="mb-1 font-medium" placeholder={undefined}                                    >
                                                                    Bank Name
                                                                </Typography>
                                                                <Input
                                                                    onChange={handleOnChnage}
                                                                    name="bank_name"
                                                                    placeholder="sample bank"
                                                                    className=" w-full !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                                    labelProps={{
                                                                        className: "before:content-none after:content-none",
                                                                    }} crossOrigin={undefined} />
                                                            </div>
                                                        </div>
                                                        <div >
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="mb-1 font-medium " placeholder={undefined}                                    >
                                                                Account Number
                                                            </Typography>
                                                            <Input
                                                                onChange={handleOnChnage}
                                                                name="account_number"
                                                                type='number'
                                                                maxLength={17}
                                                                // value={formatCardNumber(cardNumber)}
                                                                // onChange={(event) => setCardNumber(event.target.value)}
                                                                placeholder="0000 0000 0000 0000"
                                                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                                labelProps={{
                                                                    className: "before:content-none after:content-none",
                                                                }} crossOrigin={undefined} />
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="mb-1 mt-2 font-medium " placeholder={undefined}                                    >
                                                                IFCS code
                                                            </Typography>

                                                            <Input
                                                                onChange={handleOnChnage}
                                                                name="ifsc_code"
                                                                maxLength={11}
                                                                // value={formatCardNumber(cardNumber)}
                                                                // onChange={(event) => setCardNumber(event.target.value)}
                                                                placeholder="0000 0000 0000 0000"
                                                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                                labelProps={{
                                                                    className: "before:content-none after:content-none",
                                                                }} crossOrigin={undefined} />

                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="mb-2 font-medium" placeholder={undefined}                                            >
                                                                Bank Type
                                                            </Typography>
                                                            <Select
                                                                name="account_type"
                                                                onChange={handleOnChnage}
                                                                placeholder="USA"
                                                                className="  !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                                labelProps={{
                                                                    className: "before:content-none after:content-none",
                                                                }}
                                                                menuProps={{ className: "h-48" }}
                                                            >
                                                                {bankTypes.map((name: string) => (
                                                                    <Option key={name} value={name}  >
                                                                        {/* <div className="flex items-center gap-x-2"> */}
                                                                        {name}
                                                                        {/* </div> */}
                                                                    </Option>
                                                                ))}
                                                            </Select>

                                                        </div>
                                                        <Button size="lg" className="bg-red-500 py-3 pb" type="submit" placeholder={undefined}>Add</Button>
                                                        <Typography
                                                            variant="small"
                                                            color="gray"
                                                            className=" flex items-center justify-center gap-2 font-medium opacity-60" placeholder={undefined}                                >
                                                            <LockClosedIcon className="-mt-0.1 h-4 w-4" /> Payments are
                                                            secure and encrypted
                                                        </Typography>
                                                    </form>
                                                </TabPanel>
                                            </TabsBody>
                                        </Tabs>
                                    </CardBody>
                                </Card>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>

    </>
    );
}