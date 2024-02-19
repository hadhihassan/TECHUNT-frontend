import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/General/Home/Header/header";
import Footer from "../../components/General/Home/footer/footer";
import { setVerify } from "../../redux/Slice/signupSlice";
import routerVariables from '../../routes/pathVariables'
import { ROOTSTORE } from "../../redux/store";
import { INITIALSTATE } from "../../redux/Slice/signupSlice";
import { get } from "../../config/axios";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
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
                    console.log(_res)
                    if (_res) {
                        dispatch(setVerify(true))
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Congratulations youre verified",
                            showConfirmButton: false,
                            timer: 2000
                        });
                        navigate("/profile-create/")
                    }
                })
        } catch (error:any) {
            console.log(error.message)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong! check again",
                footer: '<a href="#">Check again</a>'
            });
            console.error('Error verifying email:', error);
            setValidUrl(false);
        }
    }
    return (<div>
        {validUrl ? (
            <div>
                <Header layout={true} />
                <div className="w-full flex  justify-center items-center">
                    <div className="w-[700px] flex items-center flex-col  xl:[700px] md:w[1100px] sm:w-[700px] xs:w[550px]  h-[20rem] mt-16 mb-16  border shadow-2xl rounded-lg">
                        <div>
                            <p className="text-stone-800 font-sans leading-snug text-[33px] font-semibold flex items-center justify-center pt-16">
                                Click here and verify
                            </p>
                        </div>
                        <div className="w-[460px] h-[55.31px] flex justify-center " >
                            <button onClick={handleClick} className="w-[250px] mx-auto items-center text-white h-[35.31px] mt-8 bg-red-500 rounded-[100px]" type="button" >
                                Continue
                            </button>
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