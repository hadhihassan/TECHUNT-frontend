import { Phone } from "@mui/icons-material";
import React, { useState } from "react"
import { useSelector } from "react-redux";
import { ROOTSTORE } from "../../../../redux/store";
import { checkValidNumber } from "../../../../api/commonApi";
import Alert from '@mui/material/Alert';
import OtpInputWithValidation from "./otpPage";

const NumberVerifcation = () => {
    return (
        <div className="flex flex-col  w-[65%] ">
            <OtpInputWithValidation />
        </div>
    )
}



export default NumberVerifcation;