import React from "react"

const otpPage = (setOtp: React.Dispatch<React.SetStateAction<string>>, verifyOtp: () => Promise<void>) => {
    return (
        <section className="flex flex-col items-center justify-center mt-5">
            <div>
                <input onChange={(e) => setOtp(e.target.value)} className="border" placeholder="Enter OTP" />
                <button onClick={verifyOtp}>Verify</button>
            </div>
        </section>
    )
}
export default otpPage