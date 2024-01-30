import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "../../components/General/Home/Header/header";
import Footer from "../../components/General/Home/footer/footer";
import { setVerify } from "../../redux/Slice/loginSlice";


const emailVerificationPage = () => {
    const [validUrl, setValidUrl] = useState<boolean>(true);
    const param = useParams<{ id: string }>();
    const dispatch = useDispatch()
    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `http://localhost:3000/client/verify/${param.id}`;
                const { data } = await axios.get(url);
                if(data.status){
                    dispatch(setVerify(true))
                    
                }
            } catch (error) {
                console.error('Error verifying email:', error);
                setValidUrl(false);
            }
        };
        verifyEmailUrl();
    }, [param.id]);

    return (<div>
        {validUrl ? (
            <div>
                <Header layout={true} />
                <div className="w-full flex  justify-center items-center">
                    <div className="w-[40rem] flex space-y-14 items-center flex-col   h-[40rem] mt-16 mb-16  border shadow-2xl rounded-lg">
                        <div>
                            <p className="text-stone-800 font-sans leading-snug text-[33px] font-semibold flex items-center justify-center pt-16">
                                You'r email is veryfied
                            </p>
                        </div>
                        <div className="w-[460px] h-[55.31px] " >
                            <Link to={"/login"}>
                                <button className="w-[460px] text-white h-[55.31px] mt-8 bg-red-500 rounded-[100px]" type="submit" >
                                    Continue
                                </button>
                            </Link>
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