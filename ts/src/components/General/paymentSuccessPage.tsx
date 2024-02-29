import { useEffect } from "react";
import { updatePaymentStatus } from "../../services/talentApiService";
import { AxiosResponse } from "axios";

const PaymentSuccessPage = () => {
    useEffect(() => {
        const proposalId:string = localStorage.getItem("paymentProposalId")
        updatePaymentStatus("Completed", proposalId)
        .then((res:AxiosResponse)=>{
            console.log(res,"payment")
        })
    }, [])
    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">
            <div className="bg-white p-12 rounded-lg shadow-md text-center">
                <div className="bg-green-400 rounded-full h-32 w-32 flex items-center justify-center mx-auto mb-8">
                    <i className="text-white text-5xl">✓</i>
                </div>
                <h1 className="text-green-600 text-4xl font-bold mb-4">Success</h1>
                <p className="text-gray-700 text-lg">We received your purchase request;<br />we'll be in touch shortly!</p>
                <button className="w-auto border px-5 py-1 rounded-lg bg-green-400 text-white font-sans font-semibold" onClick={() => {
                    history.go(-3)
                }}>Go home</button>
            </div>
        </div>
    );
}

export default PaymentSuccessPage;