import { Phone } from "@mui/icons-material";
import React, { useState } from "react"
import { useSelector } from "react-redux";
import { ROOTSTORE } from "../../../../redux/store";
import { checkValidNumber } from "../../../../api/commonApi";
import Alert from '@mui/material/Alert';
import OtpInputWithValidation from "./otpPage";

const NumberVerifcation = () => {
    // const data = useSelector((state: ROOTSTORE) => state.signup)
    // const [number, setNumber] = useState<string>("")
    // const [showMessage, setMessage] = useState({
    //     show: false,
    //     type: "",
    //     message:""
    // })
    // const handleSubmit: () => void = () => {
    //     checkValidNumber(number, data.role, "65ca1ab5a94ef0b1761a2249")
    //         .then((res: any) => {
    //             if (res?.data?.data.status && res.data.data.status === 200) {
    //                 setMessage({
    //                     show:true,
    //                     type:"success",
    //                     message:res.data.data.message
    //                 })
    //             } else {
    //                 setMessage({
    //                     show:true,
    //                     type:"warning",
    //                     message:res?.error?.response?.data?.message
    //                 })
    //             }
    //         }).catch((err => {
    //             setMessage({
    //                 show:true,
    //                 type:"warning",
    //                 message:err?.data?.response?.data?.message
    //             })
    //             console.log(err)
    //         }))
    // }
    return (
        <div className="flex flex-col  w-[65%] ">



            <OtpInputWithValidation />
        </div>
    )
}



export default NumberVerifcation;