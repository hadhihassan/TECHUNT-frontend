import React, { useEffect, useState } from 'react';
import { LeftCircleOutlined, CloseOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, InputNumber, Select, Card, Space } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { sendContract } from '../../../services/clientApiService';
import { AxiosError, AxiosResponse } from 'axios';
import type { ContractDetailsType, MilestoneType } from './contractInterface'
import type { ProposalInterface } from '../../../interface/interfaces';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface ValidationResult {
    (rule: string[], value: string, callback: (error?: string) => void): void;
}
interface HandleChange {
    (fieldName: string, value: string | Date | number, index: number): void;
}
const ContractForm: React.FC = () => {
    const [form] = Form.useForm();
    const [contractDetails, setContractDetails] = useState<ContractDetailsType>({
        terms: "",
        work: "",
        duration: [null, null],
        amount: 0,
        notes: "",
        paymentTerms: "",
        client : "",
        talent : "",
    });
    const [milestones, setMilestones] = useState<MilestoneType[]>([{
        no: 0,
        description: "",
        startingDate: null,
        dueDate: null
    }]);
    useEffect(() => {
        const proposal: ProposalInterface | null = JSON.parse(localStorage.getItem("proposal") || "{}");
        setContractDetails(prevState => ({
            ...prevState,
            client: proposal?.Client_id,
            talent: proposal?.talentId?._id,
            work: proposal?.jobId?._id,
        }));
    }, [])
    const hasNumber: ValidationResult = (rule: string[], value: string, callback: (message?: string) => void) => {
        const regex = /\d/;
        if (regex.test(value)) {
            callback('The input should not contain any numbers!');
        } else {
            callback();
        }
    };
    const handleChange = (fieldName: string, value: string, index: number) => {
        const updatedMilestones = [...milestones];
        if (updatedMilestones[index]) {
            if (fieldName === 'name') {
                updatedMilestones[index].description = value || "";
            } else if (fieldName === 'startingDate') {
                updatedMilestones[index].startingDate = value || null;
            } else if (fieldName === 'dueDate') {
                updatedMilestones[index].dueDate = value || null;
            }
            setMilestones(updatedMilestones);
        }
    };
    const handleFormChange = (changedValues: ContractDetailsType) => {
        setContractDetails(prevState => ({
            ...prevState,
            ...changedValues
        }));
        console.log(contractDetails);

    };
    const hasNoNote = (rule: string[], value: string, callback: (message?: string) => void) => {
        if (!value || !value.trim()) {
            callback();
        } else if (value.trim().toLowerCase().includes('note')) {
            callback('Notes are not allowed.');
        } else {
            callback();
        }
    };
    const handleSubmit = () => {
        console.log(contractDetails, "==>")
        console.log(milestones, "==>")
        sendContract({ contract: contractDetails, milestone: milestones, isMilestone: true })
            .then((res: AxiosResponse) => {
                console.log(res, "this is response of the contract");
            })
            .catch((err: AxiosError) => {
                console.log(err);
            });
    }
    return (
        <>
            <div className='container m-auto flex flex-col justify-center rounded-lg items-center font-sans text-gray-700 font-semibold  '>
                <div className='m-8 shadow-2xl border  w-[75%] h-auto rounded-xl  '>
                    <Button
                        className='border flex justify-center items-center rounded-xl m-5'
                        onClick={() => {
                            history.back()
                        }}>
                        <LeftCircleOutlined />
                        Back
                    </Button>
                    <label className='ml-[40%] font-bold underline'>Create New Contract</label>
                    <Form
                        onValuesChange={handleFormChange}
                        className='m-5 items-center'
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 20 }}
                        layout="horizontal"
                        style={{ maxWidth: "100%" }}
                        form={form}
                    >
                        <Form.Item
                            label="Terms"
                            name={"terms"}
                            rules={[{ required: true, message: 'Please enter terms!' }, { type: 'string' }]}
                        >
                            <ReactQuill
                                theme="snow"
                                modules={{
                                    toolbar: [
                                        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                        [{ size: [] }],
                                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                        [{ 'list': 'ordered' }, { 'list': 'bullet' },
                                        { 'indent': '-1' }, { 'indent': '+1' }],
                                        ['link', 'image', 'video'],
                                        ['clean']
                                    ],
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            validateFirst='parallel'
                            label="Duration"
                            name={"duration"}

                            rules={[{ required: true, message: 'Please select duration!' }]}
                        >
                            <RangePicker
                                // defaultValue={[contractDetails.duration[0], contractDetails.duration[1]]}
                                className='border border-gray-500' />
                        </Form.Item>
                        <Form.Item
                            label="Amount"
                            name={"amount"}
                            rules={[
                                // { validator: isNumber },
                                { required: true, message: 'Please enter amount!' },
                                // { min: 100 },
                            ]}
                        >
                            <InputNumber
                                defaultValue={contractDetails?.amount}
                                className='border border-gray-500' />
                        </Form.Item>
                        <Form.Item
                            label="Notes"
                            name={"notes"}
                            rules={[{ required: true, message: 'Please enter notes!' }, { type: 'string' }]}
                        >
                            <TextArea
                                rows={4}
                                value={contractDetails.notes}
                                className='border border-gray-500' />
                        </Form.Item>
                        <Form.Item
                            name={"paymentTerms"}
                            label="Payment terms"
                            rules={[{ required: true, message: 'Please enter payment terms!' }, { type: 'string' }]}
                        >
                            <TextArea defaultValue={contractDetails.paymentTerms} rows={4} className='border border-gray-500' />
                        </Form.Item>
                        <Form.List name="milestones" >
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }, index) => (
                                        <Space key={key} style={{ display: 'flex', marginBottom: 8, marginLeft: 120 }} align="baseline" className='ml-10'>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'description']}
                                                rules={[{ required: true, message: 'Missing Description' }]}
                                                style={{ marginRight: 8, marginBottom: 0 }}
                                            >
                                                <Input placeholder="Description" onChange={(e) => handleChange('name', e.target.value, index)} />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'startingDate']}
                                                rules={[{ required: true, message: 'Missing starting date' }]}
                                                style={{ marginRight: 8, marginBottom: 0 }}
                                            >
                                                <DatePicker placeholder="Starting Date" onChange={(date, dateString) => handleChange('startingDate', dateString, index)} />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'dueDate']}
                                                rules={[{ required: true, message: 'Missing due date' }]}
                                                style={{ marginRight: 8, marginBottom: 0 }}
                                            >
                                                <DatePicker placeholder="Due Date" onChange={(date, dateString) => handleChange('dueDate', dateString, index)} />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Space>
                                    ))}
                                    <Form.Item className='ml-28'>
                                        <Button type="dashed" onClick={() => add()} block danger icon={<PlusOutlined />}>
                                            Add milestone
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                        <Form.Item  >
                            <Button htmlType="submit" onClick={handleSubmit}>Submit</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
}
export default ContractForm