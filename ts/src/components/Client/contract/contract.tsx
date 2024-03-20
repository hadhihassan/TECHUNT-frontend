import React, { useEffect, useState } from 'react';
import { LeftCircleOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, InputNumber, Space, message } from 'antd';
import moment from 'moment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { sendContract } from '../../../services/clientApiService';
import { AxiosResponse } from 'axios';
import type { ContractDetailsType, MilestoneType } from './contractInterface'
import { useNavigate } from 'react-router-dom';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const ContractForm: React.FC = () => {
    const [form] = Form.useForm();
    const [proposal, setProposal] = useState()
    const [contractDetails, setContractDetails] = useState<ContractDetailsType>({
        terms: "",
        work: "",
        duration: [null, null],
        amount: 0,
        notes: "",
        paymentTerms: "",
        client: "",
        talent: "",
    });
    const [milestones, setMilestones] = useState<MilestoneType[]>([{
        no: 0,
        name: "",
        description: "",
        startingDate: "",
        dueDate: "",
        amount: 0
    }]);
    const navigate = useNavigate()
    useEffect(() => {
        const proposal = JSON.parse(localStorage.getItem("proposal") || "");
        setProposal(proposal)
        setContractDetails(prevState => ({
            ...prevState,
            client: proposal?.Client_id,
            talent: proposal?.talentId?._id,
            work: proposal?.jobId?._id,
        }));
    }, [])
    const handleChange = (fieldName: string, value: string, index: number) => {
        const updatedMilestones = [...milestones];
        if (!updatedMilestones[index]) {
            updatedMilestones[index] = {
                no: index,
                name: "",
                description: "",
                startingDate: "",
                dueDate: "",
                amount: 0
            }
        }
        if (updatedMilestones[index]) {
            updatedMilestones[index][fieldName] = value || null;
            setMilestones(updatedMilestones);
        }
        console.log(milestones)
    };
    const handleFormChange = (changedValues: ContractDetailsType) => {
        setContractDetails(prevState => ({
            ...prevState,
            ...changedValues
        }));
        console.log(contractDetails);

    };

    const handleSubmit = () => {
        sendContract({ contract: contractDetails, milestone: milestones, isMilestone: true })
            .then((res: AxiosResponse) => {
                console.log(res, "this is response of the contract");
                message.success("Succfully contract submitted. ")
                setTimeout(() => {
                    history.back()
                }, 2000)
            }).catch(() => message.error("While sending contract got and error.!"))
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
                    <label className='ml-[40%] font-bold underline'>Send Contract</label>
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
                            rules={[
                                { required: true, message: 'Please enter terms!' },
                                { type: 'string' },
                                { min: 200 },
                                { max: 500 }

                            ]}
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
                                // { max: 10000000 }
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
                        {
                            proposal?.jobId?.WorkType === "Fixed" ? <>
                                <Space style={{ display: 'flex', marginBottom: 8, marginLeft: 110 }} align="baseline" className='ml-10'>
                                    <Form.Item
                                        className='w-[100%]'
                                        rules={[{ required: true, message: 'Missing name' }, { min: 5 }]}
                                        style={{ marginRight: 1, marginBottom: 0 }}

                                    >
                                        <Input placeholder="name" onChange={(e) => handleChange('name', e.target.value, 0)} />
                                    </Form.Item>
                                    <Form.Item
                                        className='w-[100%]'
                                        rules={[{ required: true, message: 'Missing Description' }, { min: 50 }]}
                                        style={{ marginRight: 1, marginBottom: 0 }}
                                    >
                                        <Input placeholder="Description" onChange={(e) => handleChange('description', e.target.value, 0)} />
                                    </Form.Item>
                                    <Form.Item
                                        className='w-[100%]'
                                        rules={[
                                            { required: true, message: 'Missing starting date' },
                                            {
                                                validator: (_, value) => {
                                                    const today = moment();
                                                    const startingDate = moment(value);
                                                    if (!startingDate.isValid()) {
                                                        return Promise.reject('Invalid date');
                                                    }
                                                    return Promise.resolve();
                                                },
                                            },
                                        ]}
                                        style={{ marginRight: 1, marginBottom: 0 }}
                                    >
                                        <DatePicker placeholder="Starting Date" onChange={(date, dateString) => handleChange('startingDate', dateString, 0)} />
                                    </Form.Item>
                                    <Form.Item
                                        className='w-[100%]'
                                        rules={[
                                            { required: true, message: 'Missing due date' },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    const startingDateValue = getFieldValue([name, 'startingDate']);
                                                    const startingDate = moment(startingDateValue);
                                                    const dueDate = moment(value);
                                                    if (!dueDate.isValid()) {
                                                        return Promise.reject('Invalid date');
                                                    }
                                                    return Promise.resolve();
                                                },
                                            }),
                                        ]}
                                        style={{ marginRight: 1, marginBottom: 0 }}
                                    >
                                        <DatePicker placeholder="Due Date" onChange={(date, dateString) => handleChange('dueDate', dateString, 0)} />
                                    </Form.Item>
                                    <Form.Item
                                        className='w-[100%]'
                                        rules={[{ required: true, message: 'Missing amount' }]}
                                        style={{ marginRight: 1, marginBottom: 0 }}
                                    >
                                        <Input placeholder="Amount" defaultValue={proposal?.jobId?.Amount} onChange={(e) => handleChange('amount', e.target.value, 0)} />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            </> : <>
                                <Form.List name={"milestones"}>
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, ...restField }, index) => (
                                                <Space key={key} style={{ display: 'flex', marginBottom: 8, marginLeft: 110 }} align="baseline" className='ml-10'>
                                                    <Form.Item
                                                        className='w-[100%]'
                                                        {...restField}
                                                        name={[name, 'name']}
                                                        rules={[{ required: true, message: 'Missing name' }, { min: 5 }]}
                                                        style={{ marginRight: 1, marginBottom: 0 }}
                                                    >
                                                        <Input placeholder="name" onChange={(e) => handleChange('name', e.target.value, index)} />
                                                    </Form.Item>
                                                    <Form.Item
                                                        className='w-[100%]'
                                                        {...restField}
                                                        name={[name, 'description']}
                                                        rules={[{ required: true, message: 'Missing Description' }, { min: 50 }]}
                                                        style={{ marginRight: 1, marginBottom: 0 }}
                                                    >
                                                        <Input placeholder="Description" onChange={(e) => handleChange('description', e.target.value, index)} />
                                                    </Form.Item>
                                                    <Form.Item
                                                        className='w-[100%]'
                                                        {...restField}
                                                        name={[name, 'startingDate']}
                                                        rules={[
                                                            { required: true, message: 'Missing starting date' },
                                                            {
                                                                validator: (_, value) => {
                                                                    const today = moment();
                                                                    const startingDate = moment(value);
                                                                    if (!startingDate.isValid()) {
                                                                        return Promise.reject('Invalid date');
                                                                    }
                                                                    return Promise.resolve();
                                                                },
                                                            },
                                                        ]}
                                                        style={{ marginRight: 1, marginBottom: 0 }}
                                                    >
                                                        <DatePicker placeholder="Starting Date" onChange={(date, dateString) => handleChange('startingDate', dateString, index)} />
                                                    </Form.Item>
                                                    <Form.Item
                                                        className='w-[100%]'
                                                        {...restField}
                                                        name={[name, 'dueDate']}
                                                        rules={[
                                                            { required: true, message: 'Missing due date' },
                                                            ({ getFieldValue }) => ({
                                                                validator(_, value) {
                                                                    const startingDateValue = getFieldValue([name, 'startingDate']);
                                                                    const startingDate = moment(startingDateValue);
                                                                    const dueDate = moment(value);
                                                                    if (!dueDate.isValid()) {
                                                                        return Promise.reject('Invalid date');
                                                                    }
                                                                    return Promise.resolve();
                                                                },
                                                            }),
                                                        ]}
                                                        style={{ marginRight: 1, marginBottom: 0 }}
                                                    >
                                                        <DatePicker placeholder="Due Date" onChange={(date, dateString) => handleChange('dueDate', dateString, index)} />
                                                    </Form.Item>
                                                    <Form.Item
                                                        className='w-[100%]'
                                                        {...restField}
                                                        name={[name, 'amount']}
                                                        rules={[{ required: true, message: 'Missing amount' }]}
                                                        style={{ marginRight: 1, marginBottom: 0 }}
                                                    >
                                                        <Input placeholder="Amount" onChange={(e) => handleChange('amount', e.target.value, index)} />
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
                            </>
                        }
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