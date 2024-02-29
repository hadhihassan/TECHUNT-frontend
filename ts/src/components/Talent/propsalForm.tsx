import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Space } from 'antd';
import type { Proposal as ProposalInterface } from '../../interface/interfaces';
import type { DatePickerProps } from 'antd';
import { CAllS3ServiceToStore, uploadFileToSignedUelInS3, submitProposal } from '../../services/talentApiService';
import { AxiosError, AxiosResponse } from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { socket } from '../General/Home/Header/afterLoginHeader';
import { useNavigate } from 'react-router-dom';

interface ProposalFormProps {
    isOpen: boolean;
    forClose:()=>void
}

const ProposalForm: React.FC<ProposalFormProps> = ({ isOpen, forClose }) => {
    const navigate = useNavigate()
    const [receivedNotifications, setReceivedNotifications] = useState([]);
    const [open, setOpen] = useState(false);
    const jobid: ProposalInterface = JSON.parse(localStorage.getItem("deatildView")) || "N/a"
    const sender_id: string = jobid?._id || "ds";
    const recipient_id: string = jobid.Client_id?._id
    console.log("this is the job is", jobid)

    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])
    const onClose = () => {
        forClose(false)
        setOpen(false);
    };
    const [proposalData, setData] = useState<ProposalInterface>({
        title: "",
        coverLetter: "",
        rate: 0,
        availability: null,
        attachments: null,
        additionalInfo: "",
        jobId: "",
        Client_id: recipient_id
    })
    const handleFormChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setData({
            ...proposalData,
            [name]: value
        });
        console.log("proposal object ", proposalData)
    };
    const onChange: DatePickerProps['onChange'] = (_date, dateString) => {
        setData({
            ...proposalData,
            ["availability"]: dateString,
            ["jobId"]: jobid?._id
        });
    };
    //sucess toast hot message
    const success = (message: string) =>{

        toast.success(message);
        setTimeout(() => {
            navigate("/talent/home/")
        }, 3000);
    }
    //error toast host message
    const error = (err: string) => toast.error(err);
    const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e?.target.files?.length === 1) {
            const file: File = e.target.files[0];
            const content_type: string = file.type;
            const key: string = `test/image/${file.name}`;
            CAllS3ServiceToStore({ key, content_type })
                .then((res: AxiosResponse) => {
                    console.log(res.data.fileLink, "file respoen");
                    setData({
                        ...proposalData,
                        ["attachments"]: res.data.fileLink
                    });
                    console.log(proposalData, "file respoen");
                    uploadFileToSignedUelInS3(res.data.signedUrl, file, content_type, () => {
                    })
                })
                .catch((error: AxiosError) => {
                    console.error("Error uploading file:", error);
                });
        } else {
            error("Maximum file limit is one . Selete one file")
        }
    };
    const hadleSubmit = (e: ProposalInterface) => {
        if (e.coverLetter) {
            submitProposal(proposalData)
                .then((res: AxiosResponse) => {
                    console.log(res)
                    success(res.data.message)
                    sendNotification(res.data.data._id)
                }).catch((err: AxiosError) => {
                    console.log(err)
                    error("Error uploading file")
                })
        }
    }
    const sendNotification = (id: string) => {
        try {
            socket.emit("sendNotification", { sender_id, recipient_id, content: "this is the notificaiosn", type: "proposal", metaData: id });
        } catch (err) {
            console.log("e", err)
        }
    }
    useEffect(() => {
        socket.on("receiveNotification", (data) => {
            setReceivedNotifications([...receivedNotifications, data])
        })
        socket.emit("getNotifications", sender_id);
        socket.on("receivedNotificatios", (notifications) => {
            setReceivedNotifications(notifications)
            console.log(notifications)
        })
        console.log(receivedNotifications, "notif")
        return () => {
            socket.off('receiveNotification');
            socket.off('receiveNotifications');
        }
    }, [sender_id])
    return (
        <>
            <Toaster
                position="top-left"
                reverseOrder={true}
            />
            <Drawer
                title="Send a proposal"
                width={720}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                    </Space>
                }
            >
                <Form layout="vertical" onFinish={hadleSubmit}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                // validateFirst={true}
                                name="title"
                                label="Title"
                                rules={[
                                    { required: true, message: 'Please enter the titel' },
                                    { type: 'string', message: "Title must be letters" },
                                    { min: 4, message: "Minmum 4 letters required" },
                                    { max: 50, message: "Maximum 50 letters allowed" },
                                ]}
                            >
                                <Input

                                    name="title"
                                    onChange={handleFormChange}
                                    placeholder="Please enter the titel" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="coverLetter"
                                label="Cover Letter"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Write here',
                                    }, {
                                        min: 50,
                                        message: "Minimum 50 charactors is required"
                                    }, {
                                        max: 200,
                                        message: "Maximum 200 charactors is allowed"
                                    }, {
                                        type: 'string',
                                        message: "Conver letter must be letters"
                                    }
                                ]}
                            >
                                <Input.TextArea
                                    name="coverLetter"
                                    onChange={handleFormChange}
                                    rows={4} placeholder="Write here" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                label="Additional Informations"
                                name="additionalInfo"
                                rules={[
                                    {
                                        type: 'string',
                                        message: "Conver letter must be letters"
                                    }
                                ]}
                            >
                                <Input.TextArea
                                    name="additionalInfo"
                                    onChange={handleFormChange}
                                    rows={2} placeholder="Write here" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="availability"
                                label="availability"
                                rules={[
                                    { required: true, message: 'Please choose the dateTime' },
                                    { type: 'date', message: "Pick the valid date." },

                                ]}
                            >
                                <DatePicker
                                    name="availability"
                                    onChange={onChange}
                                    style={{ width: '100%' }}
                                    getPopupContainer={(trigger) => trigger.parentElement!}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="rate"
                                label="Additional Rate"
                                rules={[{ required: true, message: 'Please enter rate' }
                                ]}
                            >
                                <Input
                                    name="rate"
                                    onChange={handleFormChange}
                                    style={{ width: '100%' }}
                                    placeholder="Please enter the rate"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="attachments"
                                label="attachments"
                                rules={[{ required: true, message: 'Please choose the dateTime' }]}
                            >
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Resume or CV, Certificates or Credentials, Case Studies , Contracts or Agreements (MAX. 800x400px)</p>
                                        </div>
                                        <input onChange={uploadFile} type="file" className="hidden" />
                                    </label>
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Button onClick={hadleSubmit} htmlType="submit">Submit</Button>

                </Form>
            </Drawer>
        </>
    );
};

export default ProposalForm;


