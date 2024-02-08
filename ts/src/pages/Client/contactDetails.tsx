import Avatar from "react-avatar";
import Header from "../../components/General/Home/Header/header";
import Footer from "../../components/General/Home/footer/footer";
import { ProgressBar } from "../../components/General/progressBar";
import { clientRoutes } from "../../util/pathVariables";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { ROOTSTORE } from "../../redux/store";
import ContactForm from "../../components/General/contactForm";


const ContractDetails = () => {
    const data = useSelector((state: ROOTSTORE) => state.signup)
    
    return (
        <div>
            <Header layout={true} />
            <div className="w-full flex justify-center items-center ">
                <div className="  space-y-14 flex justify-center items-center xl:[700px] md:w[1100px] sm:w-[700px] xs:w[550px] flex-col h-[66rem] mt-16 mb-16 border shadow-2xl rounded-lg">
                    <div className="w-[80%] h-[95%]" >
                        <div className="flex w-full pt-9">
                            <div className="flex items-center justify-center">
                                <div>
                                    <Avatar name={data.email} size="33" round />
                                </div>
                                <div className="text-opacity-40  text-center text-stone-800 text-xs ml-1 font-medium font-sans underline">
                                    {data.email ? data.email : "hadhi@gmail.com"}
                                </div>
                            </div>
                            <div className="pl-[5rem] pt-1.5">
                                <p className="text-xl font-medium tracking-tight text-gray-900 ">Create profile</p>
                            </div>
                        </div>
                        <div className="mt-10">
                            <div className="flex justify-between">
                                <p onClick={() => history.back()}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                </svg>
                                </p>
                                <p>1/2</p>
                            </div>
                            <div className="pt-5 ">
                                <ProgressBar percentage={100} />
                            </div>
                        </div>
                            <div className="w-full pt-10">
                                <h1 className="text-2xl font-medium tracking-tight text-gray-900 ">Add contact information..</h1>
                                <p className="text-xs pt-5 font-normal">personalized space within the application where users can showcase and manage key information about themselves.</p>
                                <ContactForm />
                            </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}


export default ContractDetails;