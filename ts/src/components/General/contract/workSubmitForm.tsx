/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useEffect, useState } from "react";
import {
    Button,
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Textarea,
} from "@material-tailwind/react";
import { submitWork, submitEditWork, CAllS3ServiceToStore, uploadFileToSignedUelInS3 } from "../../../services/talentApiService";
import { message } from "antd";
import { useSelector } from "react-redux";
import { ROOTSTORE } from "../../../redux/store";
import { AxiosError, AxiosResponse } from "axios";

export function WorkSubmitForm({  open, closeModal, id }: {  open: boolean, closeModal: React.Dispatch<React.SetStateAction<boolean>>, id: string }) {

    const role = useSelector((state: ROOTSTORE) => state.signup.role)
    const [showBtn, setShowSubmitBtn] = useState<boolean>(false);
    const [url, setUrl] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [urlError, setUrlError] = useState<string>('');
    const [descriptionError, setDescriptionError] = useState<string>('');
    useEffect(() => {
        const workItem = localStorage.getItem("work")
        const workData = JSON.parse(workItem ? workItem : "{}")
        if (workData) {
            setShowSubmitBtn(false)
            setUrl(workData.url)
            setDescription(workData.description)
        } else {
            setShowSubmitBtn(true)
        }
    }, [open, closeModal, id])
    const handleUrlChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e?.target.files?.length === 0) {
            setUrlError('Maximum file limit is one . Selete one file.');
            return
        } else {
            setUrlError('');
        }
        if (e?.target.files?.length === 1) {
            const file: File = e.target.files[0];
            const content_type: string = file.type;
            const key: string = `test/image/${file.name}`;
            CAllS3ServiceToStore({ key, content_type })
                .then((res: AxiosResponse) => {
                    setUrl(res.data.fileLink);
                    uploadFileToSignedUelInS3(res.data.signedUrl, file, content_type, () => {
                    })
                })
                .catch((error: AxiosError) => {
                    console.error("Error uploading file:", error);
                });
        }
    };
    const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        setDescription(value);
        if (value.length < 10 || value.length > 100) {
            setDescriptionError('Description must be between 10 and 100 characters.');
        } else {
            setDescriptionError('');
        }
    };
    const handleSubmit = () => {
        submitWork(id, { url, description })
            .then((res) => {
                console.log(res)
                if (res.data) {
                    message.success("successfully work submitted")
                } else {
                    message.error("Something went wrong ! ")
                }
                closeModal(!open)
            }).catch((err) => {
                message.error("Something went wrong ! ")
                console.log(err)
            })
    };
    const handleSubmitEdit = () => {
        const workItem = localStorage.getItem("work")
        const workData = JSON.parse(workItem ? workItem : "{}")
        submitEditWork(id, { url, description }, workData._id)
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    message.success("successfully work submitted")
                } else {
                    message.error("Something went wrong ! ")
                }
                closeModal(!open)
            }).catch((err) => {
                message.error("Something went wrong ! ")
                console.log(err)
            })
    };
    return (
        <>
            <Dialog
                className="m-32 h-full flex items-center justify-center overflow-auto"
                size="lg"
                open={open}
                handler={closeModal}
                placeholder={undefined}
            >
                <Card className=" w-full max-w-[24rem] shadow-2xl border-2" placeholder={undefined}>
                    <CardBody className="flex flex-col gap-4" placeholder={undefined}>
                        <Typography variant="h4" color="blue-gray" placeholder={undefined}>
                            Submit your work
                        </Typography>
                        <Typography className="mb-2" variant="h6" placeholder={undefined}>
                            Upload you project file
                        </Typography>
                        {
                            url ? <>
                                <a className="underline text-blue-500" href={url}>Click me to show the file</a>
                            </> : <>
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" onChange={handleUrlChange} />
                                    </label>
                                </div>
                            </>
                        }
                        {
                            showBtn && <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" onChange={handleUrlChange} />
                                </label>
                            </div>
                        }

                        {urlError && <p className="text-red-500">{urlError}</p>}
                        <Typography className="mb-2 mt-2" variant="h6" placeholder={undefined}>
                            Description
                        </Typography>
                        <Textarea
                            // readOnly={!showBtn ? true : false}
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                        {descriptionError && <p className="text-red-500">{descriptionError}</p>}
                    </CardBody>
                    <CardFooter className="pt-0" placeholder={undefined}>
                        {
                            role === "TALENT" && <>
                                {/* {
                                    showBtn ? <>
                                        <Button color="red" fullWidth onClick={isEdit ? handleSubmitEdit : handleSubmit} placeholder={undefined}>
                                            Submit{showBtn}
                                        </Button>
                                    </> : <>
                                        <Button color="red" fullWidth onClick={() => { setShowSubmitBtn(!showBtn) }} placeholder={undefined}>
                                            Edit
                                        </Button>
                                    </>
                                } */}
                                <Button color="red" fullWidth onClick={ handleSubmit} placeholder={undefined}>
                                    Submit{showBtn}
                                </Button>
                            </>

                        }
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
}