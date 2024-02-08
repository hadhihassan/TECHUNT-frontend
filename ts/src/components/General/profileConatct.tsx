import { ChangeEvent, useContext, useEffect, useState } from "react";
import Modal from "./profileEditModal";
import { editProfileContact } from "../../api/commonApi";
import { MyContext, Context } from "../../context/myContext";
import Alert from '@mui/material/Alert';

const profileConatct: React.FC<{ data: {}, onUpdate: () => void }> = ({ data, onUpdate }) => {
    const [details, setdetails] = useState<any>()
    const [success_Message, setSuccess_Message] = useState<boolean>(false)

    useEffect(() => {
        setdetails(data)
    }, [data])
    const basicData: any = useContext(MyContext);
    const [formData, setData] = useState({
        Address: "",
        City: "",
        Country: "",
        PinCode: null,
        Number: null,
    })
    const [isOpen, setIsOpen] = useState(false);

    const openModal: () => void = () => {
        setIsOpen(true);
    };
    const handleSubmit: () => void = () => {
        editProfileContact(formData, basicData.role)
            .then((res) => {
                console.log(res);
                onUpdate()
                setSuccess_Message(true)
                setTimeout(() => {
                    setSuccess_Message(false)
                }, 3000);
            }).catch((err) => {
                console.log(err);

            })
    }
    const handleChnage: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
        setData({
            ...formData,
            [e.target.name]: e.target.value,
        })
        console.log(formData);

    }
    const closeModal: () => void = () => {
        setIsOpen(false);
    };
    return (
        <div className="w-[48rem] m-5 rounded-xl  border h-[20rem]  shadow-2xl">
            <div className="flex justify-between">
                <p className="m-4 font-sans font-medium">Conatct Details</p>
                <button onClick={openModal} className="w-[5rem] mt-3 mr-2 font-sans font-medium rounded-full h-7 border border-red-500 text-red-500">Edit</button>
            </div> <hr />
            <Modal isOpen={isOpen} onClose={closeModal}>
                <div className="w-full ">
                    <div className="mb-1">
                        {success_Message ? <Alert severity="success">Conatct Deatils updated .</Alert> : null}
                        <p className="m-4 font-sans font-semibold text-center">Edit Address</p>
                        <hr />
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-1 mt-2">
                        <div className="w-full px-3">
                            <label className="block  tracking-wide text-gray-900 text-xs font-bold mb-2" >
                                Address
                            </label>
                            <input name="Address" onChange={handleChnage} className="appearance-none block w-full  bg-gray-200 text-gray-900 border border-gray-200 rounded py-2 px-2 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" placeholder={details?.Address} />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-1">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block  tracking-wide text-gray-900 text-xs font-bold mb-2" >
                                City Name
                            </label>
                            <input name="City" onChange={handleChnage} className="appearance-none block w-full bg-gray-200 text-gray-900 border  rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder={details?.City} />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block  tracking-wide text-gray-900 text-xs font-bold mb-2" >
                                Country Name
                            </label>
                            <input name="Country" onChange={handleChnage} className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" placeholder={details?.Country} />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-1">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block  tracking-wide text-gray-900 text-xs font-bold mb-2" >
                                Zip code/ Pincode                                </label>
                            <input name="PinCode" onChange={handleChnage} className="appearance-none block w-full bg-gray-200 text-gray-900 border  rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder={details?.PinCode} />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block  tracking-wide text-gray-900 text-xs font-bold mb-2">
                                Phone number                                </label>
                            <input name="Number" onChange={handleChnage} className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" placeholder={details?.Number} />
                        </div>
                    </div>
                    <div className="mt-10">
                        <button onClick={handleSubmit} type="submit" className="block w-full rounded-md () px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Edit</button>
                    </div>
                </div>
            </Modal>
            <div>
                <div className="w-full max-w-lg m-5">
                    <div className="flex flex-wrap -mx-3 mb-1">
                        <div className="w-full px-3">
                            <label className="block  tracking-wide text-gray-900 text-xs font-bold mb-2" >
                                Address
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-2 px-2 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" readOnly placeholder={details?.Address} />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-1">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block  tracking-wide text-gray-900 text-xs font-bold mb-2" >
                                City Name
                            </label>
                            <input readOnly className="appearance-none block w-full bg-gray-200 text-gray-900 border  rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder={details?.City} />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block  tracking-wide text-gray-900 text-xs font-bold mb-2" >
                                Country Name
                            </label>
                            <input readOnly className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" placeholder={details?.Country} />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-1">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block  tracking-wide text-gray-900 text-xs font-bold mb-2" >
                                Zip code/ Pincode                                </label>
                            <input readOnly className="appearance-none block w-full bg-gray-200 text-gray-900 border  rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder={details?.PinCode} />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block  tracking-wide text-gray-900 text-xs font-bold mb-2">
                                Phone number                                </label>
                            <input readOnly className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" placeholder={details?.Number} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default profileConatct;