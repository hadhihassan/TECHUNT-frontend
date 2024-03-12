import React, { ChangeEvent, useEffect, useState } from "react";
import {
    Button,
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Textarea,
} from "@material-tailwind/react";
import { submitWork, submitEditWork } from "../../../services/talentApiService";
import { message } from "antd";
import { useSelector } from "react-redux";
import { ROOTSTORE } from "../../../redux/store";

export function WorkSubmitForm({ setContract, open, closeModal, id }: { setContract: React.Dispatch<React.SetStateAction<boolean>>, open: boolean, closeModal: React.Dispatch<React.SetStateAction<boolean>>, id: string }) {

    const role = useSelector((state: ROOTSTORE) => state.signup.role)
    const [isEdit, setisEdit] = useState<boolean>(false);
    const [showBtn, setshowBtn] = useState<boolean>(false);
    const [url, setUrl] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [urlError, setUrlError] = useState<string>('');
    const [descriptionError, setDescriptionError] = useState<string>('');
    useEffect(() => {
        const workData = JSON.parse(localStorage.getItem("work"))
        if (workData) {
            setisEdit(true)
            setUrl(workData.url)
            setDescription(workData.description)
        } else {
            setshowBtn(true)
        }
    }, [open, closeModal, id])
    const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUrl(value);
        if (!isValidUrl(value)) {
            setUrlError('Please enter a valid URL.');
        } else {
            setUrlError('');
        }
    };
    const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
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
                if (res.data.success) {
                    message.success("successfully work submitted")
                    // setContract(())
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
        const workData = JSON.parse(localStorage.getItem("work"))
        console.log(isEdit)
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
    const isValidUrl = (url: string) => {
        return url.trim() !== '';
    };
    return (
        <>
            <Dialog
                className="w-[100%]"
                size="xs"
                open={open}
                handler={closeModal}
                placeholder={undefined}
            >
                <Card className="mx-auto w-full max-w-[24rem]" placeholder={undefined}>
                    <CardBody className="flex flex-col gap-4" placeholder={undefined}>
                        <Typography variant="h4" color="blue-gray" placeholder={undefined}>
                            Submit your work
                        </Typography>
                        <Typography className="mb-2" variant="h6" placeholder={undefined}>
                            URL
                        </Typography>
                        <Input
                            readOnly={!showBtn ? true : false}
                            label=""
                            size="md"
                            crossOrigin={undefined}
                            value={url}
                            onChange={handleUrlChange}
                        />
                        {urlError && <p className="text-red-500">{urlError}</p>}
                        <Typography className="mb-2 mt-2" variant="h6" placeholder={undefined}>
                            Description
                        </Typography>
                        <Textarea
                            readOnly={!showBtn ? true : false}
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                        {descriptionError && <p className="text-red-500">{descriptionError}</p>}
                    </CardBody>
                    <CardFooter className="pt-0" placeholder={undefined}>
                        {
                            role === "TALENT" && <>
                                {
                                    showBtn ? <>
                                        <Button color="red" fullWidth onClick={isEdit ? handleSubmitEdit : handleSubmit} placeholder={undefined}>
                                            Submit
                                        </Button>
                                    </> : <>
                                        <Button color="red" fullWidth onClick={() => { setshowBtn(!showBtn) }} placeholder={undefined}>
                                            Edit
                                        </Button>
                                    </>
                                }
                            </>
                        }
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
}