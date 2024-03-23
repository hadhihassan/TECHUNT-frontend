import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import CurrencyRupeeTwoToneIcon from '@mui/icons-material/CurrencyRupeeTwoTone';
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import Modal from './profileEditModal';
import { editMainProfileSection } from '../../services/commonApiService';
import { MyContext } from '../../context/myContext';
import { uploadProfilePhoto } from '../../services/clientApiService';
import Alert from '@mui/material/Alert';
import { nameValidator, descriptionValidator } from '../../util/validatorsUtils'
import { Context as ContextInterface } from '../../context/myContext'
import { UserProfile } from '../../pages/Talent/profile/profile'
import DisplayResume from './resumeView';
import toast, { Toaster } from "react-hot-toast";

interface ValidationsError {
    fName: string | null,
    lName: string | null,
    description: string | null,
    title: string | null
}
import { AxiosError, AxiosResponse } from 'axios'
import { CAllS3ServiceToStore, saveResume, uploadFileToSignedUelInS3 } from '../../services/talentApiService';
import { message } from 'antd';
import { useSelector } from 'react-redux';
import { ROOTSTORE } from '../../redux/store';

const ProfileTalentDetailsFirst: React.FC<{ datas: UserProfile | undefined, onUpdate: () => void }> = ({ datas, onUpdate }) => {

    const error = (err: string) => toast.error(err);
    const success = (message: string) => toast.success(message);
    const basicData: ContextInterface = useContext<ContextInterface>(MyContext) ;
    const [details, setDetails] = useState<UserProfile | null>(null);
    const [sp_Message, setMessage] = useState<boolean>(false);
    const IMG: string = `http://localhost:3000/images/${details?.Profile?.profile_Dp}`;
    const truncatedDescription: string = details?.Profile?.Description?.slice(0, 200) || '';
    const [image, setImage] = useState<File | null>(null);

    const [fNameError, setfNameErro] = useState<string | null>(null);
    const [lNameError, setlNameErro] = useState<string | null>(null);
    const [titleError, setTitleError] = useState<string | null>(null);
    const [descriptionError, setDescError] = useState<string | null>(null);
    const [showResume, setShow] = useState<boolean>(false)
    const closeShowResume = () => setShow(!showResume)
    const [formData, setData] = useState({
        first_name: "",
        last_name: "",
        description: "",
        title: "",
    })
    const userData = useSelector((state: ROOTSTORE) => state.signup)
    const validateForm = () => {
        const errors: ValidationsError = {
            fName: "",
            lName: "",
            description: "",
            title: ""
        };
        errors.fName = nameValidator(formData.first_name, "First Name");
        errors.lName = nameValidator(formData.last_name, "Last Name");
        errors.description = descriptionValidator(formData.description);
        errors.title = nameValidator(formData.title, "Title");

        setfNameErro(errors.fName);
        setlNameErro(errors.lName);
        setDescError(errors.description);
        setTitleError(errors.title);

        return !(errors.fName || errors.lName || errors.description || errors.title);
    }
    const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e?.target.files?.length === 1) {
            const file: File = e.target.files[0];
            const content_type: string = file.type;
            const key: string = `test/image/${file.name}`;
            CAllS3ServiceToStore({ key, content_type })
                .then(async (res: AxiosResponse) => {
                    await saveResume(res.data.fileLink)
                    uploadFileToSignedUelInS3(res.data.signedUrl, file, content_type, () => {
                    })
                })
                .catch(() => message.error("Error uploading file"));
        } else {
            message.error("Maximum file limit is one . Selete one file")
        }
    };
    useEffect(() => {
        setDetails(datas || null);
        setData({
            first_name: datas?.First_name || "add you first name",
            last_name: datas?.Last_name || "add you last  name",
            description: datas?.Profile?.Description || "add you profile description",
            title: datas?.Profile?.Title || "add you profile title ",
        })
    }, [datas]);
    const [showMore, setShowMore] = useState(false);
    const toggleShowMore = () => {
        setShowMore(!showMore);
    };
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };
    function uploadPhoto(e: ChangeEvent<HTMLInputElement>): void {
        if (e.target.files && e.target.files.length > 0) {
            const img: File | null = e.target.files[0];
            if (img) {
                if (img.size > 5242880) { // Max file size: 5MB (in bytes)
                    error('File size exceeds the limit (5MB)');
                    return;
                }
                if (!['image/jpeg', 'image/png'].includes(img.type)) {
                    error('Invalid file type. Only JPG and PNG files are allowed.');
                    return;
                }
            }
            setImage(e.target.files[0]);
            const data = new FormData();
            data.append('image', img);
            uploadProfilePhoto(data, basicData?.role)
                .then(() => {
                    onUpdate()
                    success("Image uploaded success")
                }).catch((error: AxiosError) => {
                    console.log(error);
                });
        }
    }
    console.log(details)
    const changeHandle: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void = (e) => {
        validateForm()
        setData({
            ...formData,
            [e.target.name]: e.target.value,
        })

    }
    const handleSubmit: (e: React.FormEvent) => void = (e) => {
        e.preventDefault()
        const valid = validateForm()
        if (valid) {

            editMainProfileSection(formData, basicData?.role)
                .then(() => {
                    onUpdate()
                    setMessage(true)
                    setTimeout(() => {
                        setMessage(false)
                    }, 3000);
                }).catch((error: AxiosError) => {
                    console.log(error)
                })
        }
    }

    const dateString = details?.createdAt || "";
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();

    const formattedDate = `${month} ${day}, ${year}`;

    return <div className="w-[48rem]  flex  rounded-xl  h-[20rem] shadow-xl  border bg-white ">
        <div className=" xl:w-[13rem] m-5  sm:w[10rem] md:[14rem] ">
            <div>
                <img className="border border-black rounded-xl " src={IMG} alt="" />
            </div>
            <div className="m-2 w-[18rem] mt-2">
                <p className="font-sans font-normal text-sm">from : {details?.Country}</p>
                {/* <AccessTimeRoundedIcon fontSize="inherit" /> */}
                {/* <span className="font-sans font-normal text-xs ml-2" >It's currently 4:45 PM here</span><br /> */}
                <EditCalendarRoundedIcon fontSize="inherit" />
                <span className="font-sans font-normal text-xs ml-2">Joined {formattedDate ? formattedDate : "Joined September 1, 2013"}</span>
            </div>

        </div>
        <div className=" w-full ">
            <div className="flex justify-between ">
                <div className="mt-4">
                    <p className="text-2xl font-sans font-bold">{details?.First_name}</p>
                    <p className=" font-sans font-medium opacity-45">{details?.Profile?.Title}</p>
                </div>
                <div className="m-6 flex gap-2">

                    <button className="w-[8rem] font-sans font-medium rounded-full h-8 border border-red-500 text-red-500 " onClick={openModal}>Edit Profle</button>
                    {
                        details?.resume ? <>
                            <button
                                onClick={closeShowResume}
                                className="px-2 py-1 font-sans font-semibold rounded-full  border text-xs  border-red-500 text-red-500 " >Show Resume</button>
                            <DisplayResume
                                pdfUrl={details?.resume}
                                open={showResume}
                                closeModal={closeShowResume}
                            />
                        </> : <>
                            {
                                userData.role === "TALENT" && <>
                                    <div className="flex  items-center justify-center">
                                        <label className="flex flex-col rounded-full items-center px-2 py-1.5  border-red-500 text-red-500 font-semibold bg-white text-blue  tracking-wide uppercase border border-blue cursor-pointer text-xs   ">
                                            <span className="text-xs font-sans font-semibold leading-normal" >Upload resume</span>
                                            <input type='file' className="hidden" onChange={uploadFile} />
                                        </label>
                                    </div>
                                </>
                            }
                        </>
                    }
                </div>
            </div>

            {/* profile main section edit modal  */}
            <Toaster
                position="top-left"
                reverseOrder={false}
            />
            <Modal isOpen={isOpen} onClose={closeModal}>
                {sp_Message ? <Alert severity="success">Profile Updated .</Alert> : null}

                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    <div className="flex justify-center items-center flex-col m-10">
                        <div className="w-20 h-20 bg-blue-200 rounded-full">
                            <img className="rounded-full h-20 w-20" src={image ? URL.createObjectURL(image) : IMG} alt="Selected" />
                        </div>
                        <div>
                            <label className="flex flex-col items-center mt-5 w-[10rem] bg-white red-blue-500 rounded-md shadow-md tracking-wide uppercase border-red-blue-500 cursor-pointer hover:bg-red-500 hover:text-white">
                                <span className="mt-1 text-xs leading-normal">Upload photo</span>
                                <input type="file" accept="image/*" onChange={uploadPhoto} name='profile_dp' className="hidden" />
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="mr-5">
                            <div className='flex justify-between'>
                                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">First name</label>
                                <label className='text-red-500 font-sans text-sm font-normal'>{fNameError}</label>
                            </div>
                            <input onChange={changeHandle} type="text" value={formData.first_name} name="first_name" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First name" />
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">Last name</label>
                                <label className='text-red-500 font-sans text-sm font-normal'>{lNameError}</label>
                            </div>
                            <input onChange={changeHandle} type="text" value={formData?.last_name} name="last_name" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last name" />
                        </div>
                    </div>
                    <div>
                        <div className='flex justify-between'>
                            <label htmlFor="profileTitle" className="block mb-2 text-sm font-medium text-gray-900">Profile Title</label>
                            <label className='text-red-500 font-sans text-sm font-normal'>{titleError}</label>
                        </div>
                        <input onChange={changeHandle} type="text" name="title" value={formData?.title} id="profileTitle" placeholder="Title" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div>
                        <div className='flex justify-between'>
                            <label className='text-red-500 font-sans text-sm font-normal'>{descriptionError}</label>
                            <label htmlFor="profileDescription" className="block mb-2 text-sm font-medium text-gray-900">Profile Description</label>
                        </div>
                        <textarea rows={5} onChange={changeHandle} name="description" value={formData?.description} id="profileDescription" placeholder="Write profile description..." className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-red-500 w-[10rem] h-[2rem] text-white border rounded-xl">Edit</button>
                    </div>
                </form>
            </Modal>

            {/* end the modal */}


            <div className="mt-2 mr-5 flex justify-between">
                <div>
                    <Stack spacing={1}>
                        <Rating name="half-rating-read" size="small" defaultValue={2.5} precision={0.5} readOnly />
                    </Stack>
                    <p className="text-gray-500 font-sans font-normal text-sm">4/5 (12 Reviews)</p>
                </div>
                <div className="border-r border-solid  border-gray-500 h-8 "></div>
                <div>
                    <CurrencyRupeeTwoToneIcon fontSize="inherit" color="error" />
                    <span className="text-gray-500 font-sans font-normal text-sm">Total earnings :  0  Rs</span>
                </div><div className="border-r border-solid border-gray-500 h-8"></div>
                <div>
                    <VerifiedTwoToneIcon fontSize="inherit" color="primary" />
                    <span className="text-gray-500 font-sans ml-1 font-normal text-sm">0 projects completed</span>
                </div>
            </div>
            <div className="mr-3 mt-4">
                <p className="text-gray-700 font-sans font-normal text-sm">
                    {showMore ? details?.Profile?.Description : `${truncatedDescription}...`}
                    <span
                        className="text-red-500 font-bold cursor-pointer"
                        onClick={toggleShowMore}
                    >
                        {showMore ? 'Show less' : 'Show more'}
                    </span>
                </p>

            </div>
        </div>
    </div>;
}



export default ProfileTalentDetailsFirst;
