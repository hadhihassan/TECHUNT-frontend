const bankTypes = ["Savings", "Current", "Joint", "Business", "Student", "Retirement", "Online", "Islamic", "Credit Union", "Community", "Private"];
import React, { ChangeEvent, useState } from "react";
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
import { useSelector } from "react-redux";
import { ROOTSTORE } from "../../../../redux/store";
import { INITIALSTATE } from "../../../../redux/Slice/signupSlice";
import { message } from "antd";


export default function CheckoutForm() {
    const userData: INITIALSTATE = useSelector((state: ROOTSTORE) => state.signup)
    const [bankDetails, setDetails] = useState({
        bank_name: "",
        account_holder_name: "",
        account_number: "",
        ifsc_code: "",
        account_type: "",
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleOnChnage = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | any >) => {
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
        console.log(bankDetails)
    }
    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        addBankDetails(userData.id as string || "", userData.role, bankDetails)
        .then(()=>{
            message.success("Bank details added .")
        }).catch(()=>{
            message.success("Somthign went wrong !. try agin .")
        })
    }
    return (<>

        <Card className="w-full ml-32  max-w-[30rem] h-auto border" placeholder={undefined}>
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
                                            placeholder="name@mail.com"
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
                                        maxLength={19}
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
                                        maxLength={19}
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
    </>
    );
}