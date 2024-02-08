import PaymentIcon from '@mui/icons-material/Payment';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { useContext } from 'react';
import { MyContext } from '../../context/myContext';
const profileVerifications = () => {
    const basicData = useContext(MyContext)
    return (
        <div className="w-[22rem] h-[20rem] rounded-xl shadow-xl   border bg-white">
            <p className="m-4 font-sans font-medium">Verifications</p>
            <hr />
            <div className="flex items-center m-8 justify-between">
                <PaymentIcon fontSize="small" />
                <span className="text-start  font-normal font-sans">Payemtn Verify</span>
                <span className="text-blue-600 ml-12 hover:text-red-500">Verify</span>
            </div>
            <div className="flex items-center m-8 justify-between">
                <LocalPhoneIcon fontSize="small" />
                <span className="font-normal font-sans ">Phone Number Verify</span>
                <span className="text-blue-600 hover:text-red-500">Verify</span>
            </div>
            <div className="flex items-center justify-between m-8">
                <EmailIcon fontSize="small" />
                <span className="font-normal font-sans">Email Verify</span>
                <span className={`${basicData?.verify ? "text-green-500" : "text-blue-600"} ml-12 hover:text-red-500`}>
                    {basicData?.verify ? "Verified" : "Verify"}
                </span>

            </div>
        </div >);
}


export default profileVerifications;