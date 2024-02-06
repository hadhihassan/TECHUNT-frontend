import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/General/Home/Header/header";
import Footer from "../../components/General/Home/footer/footer";
import { setVerify } from "../../redux/Slice/signupSlice";
import routerVariables from '../../util/pathVariables'
import { ROOTSTORE } from "../../redux/store";
import { INITIALSTATE } from "../../redux/Slice/signupSlice";
import { get } from "../../config/axios";
import { useNavigate } from 'react-router-dom'
const emailVerificationPage = () => {
    const [validUrl, setValidUrl] = useState<boolean>(true);
    const param = useParams<{ id: string }>();
    const dispatch = useDispatch()
    const signupData: INITIALSTATE = useSelector((state: ROOTSTORE) => state.signup)
    const navigate = useNavigate()
    const handleClick: () => void = async () => {
        try {
            const url = `http://localhost:3000/${signupData.role}/verify/${param.id}`;
            const data = await get(url, signupData.role)
                .then((_res) => {
                    dispatch(setVerify(true))
                    console.log("verified")
                    navigate(routerVariables.CREATE_PROFILE_MESSAGE)
                })
            console.log(data);
        } catch (error) {
            console.error('Error verifying email:', error);
            setValidUrl(false);
        }
    }


    return (<div>
        {validUrl ? (
            <div>
                <Header layout={true} />
                <div className="w-full flex  justify-center items-center">
                    <div className="w-[700px] flex space-y-14 items-center flex-col  xl:[700px] md:w[1100px] sm:w-[700px] xs:w[550px]  h-[40rem] mt-16 mb-16  border shadow-2xl rounded-lg">
                        <div>
                            <p className="text-stone-800 font-sans leading-snug text-[33px] font-semibold flex items-center justify-center pt-16">
                                You'r email is veryfied
                            </p>
                        </div>
                        <div className="w-[460px] h-[55.31px] " >
                            {/* <Link to={routerVariables.CREATE_PROFILE_MESSAGE}> */}
                            <button onClick={handleClick} className="w-[250px] mx-auto items-center text-white h-[35.31px] mt-8 bg-red-500 rounded-[100px]" type="submit" >
                                Continue
                            </button>
                            {/* </Link> */}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        ) : (
            <h1>404 Not Found</h1>
        )}
    </div>);
}


export default emailVerificationPage;