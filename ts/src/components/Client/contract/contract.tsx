import React, { useState } from 'react';
import { LeftCircleOutlined, CloseOutlined } from '@ant-design/icons';
import {ContractDetailsType, MilestoneType}  from './contractInterface'
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Select,
    Card
} from 'antd';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface ValidationResult {
    (rule: string[], value: string, callback: (error?: string) => void): void;
}

interface HandleChange {
    (fieldName: string, value: string | Date | number , index: number): void;
}

interface HandleFormChange {
    (changedValues: ContractDetailsType, allValues: ContractDetailsType): void;
}

const ContractForm: React.FC = () => {
    const [form] = Form.useForm();
    const [contractDetails, setContractDetails] = useState<ContractDetailsType>({
        terms: "",
        work: "",
        duration: [null, null],
        amount: 0,
        notes: "",
        paymentTerms: ""
    });
    const [milestones, setMilestones] = useState<MilestoneType[]>([{
        no: 0,
        description: "",
        starting: null,
        due: null
    }]);
    const isNumber: ValidationResult = (rule: string[], value: string, callback: (message?: string) => void) => {
        const regex = /^[0-9]*$/;
        if (!regex.test(value)) {
            callback('Please enter a valid number!');
        } else {
            callback();
        }
    };
    const hasNumber: ValidationResult = (rule: string[], value: string, callback: (message?: string) => void) => {
        const regex = /\d/;
        if (regex.test(value)) {
            callback('The input should not contain any numbers!');
        } else {
            callback();
        }
    };
    const handleChange: HandleChange = (fieldName, value, index) => {
        const updatedMilestones = [...milestones];
        if (updatedMilestones[index] !== undefined) {
            if (fieldName === 'name') {
                updatedMilestones[index].description = value || "";
            } else if (fieldName === 'startData') {
                updatedMilestones[index].starting = value || null;
            } else if (fieldName === 'dueData') {
                updatedMilestones[index].due = value || null;
            }
            setMilestones(updatedMilestones);
        }
        setMilestones(updatedMilestones);
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
    return (
        <>
            <div className='container m-auto flex flex-col justify-center rounded-lg items-center font-sans text-gray-700 font-semibold  '>
                <div className='m-8 shadow-2xl border  w-[75%] h-auto rounded-xl  '>
                    <Button className='border flex justify-center items-center rounded-xl m-5'>
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
                            label="Select Work"
                            name={"work"}

                            validateFirst
                            rules={[{ required: true, message: 'Please select work!' }, { type: 'string' }, { validator: hasNumber }]}
                        >
                            <Select className='border border-gray-500 rounded-lg' defaultValue={contractDetails.work} >
                                <Select.Option value="demo" className='border border-gray-500'>Demo</Select.Option>
                            </Select>
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
                            name={"note"}
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
                        <Form.List
                            name="milestones"
                        >
                            {(fields, { add, remove }) => (
                                <div style={{ display: 'flex', rowGap: 1, flexDirection: 'column' }} className='border border-gray-500  w-[84%] md:20 md:ml-28 sm:16  xl:ml:28 ' >
                                    {fields.map((field) => (
                                        <Card
                                            size="small"
                                            title={`Milestones ${field.name + 1}`}
                                            key={field.key}
                                            extra={
                                                <CloseOutlined
                                                    onClick={() => {
                                                        remove(field.name);
                                                    }}
                                                />
                                            }
                                        >
                                            <Form.Item
                                                label="Name"
                                                name={[field.name, 'name']}
                                                rules={[
                                                    { required: true, message: 'Please enter milestone name!' },
                                                    { type: 'string', min: 1, message: 'Name must be at least 5' },
                                                    { type: 'string', max: 50, message: 'Amount must be at most 50' },
                                                ]}
                                            >
                                                <Input onChange={(e) => handleChange('name', e.target.value, field.name)} />
                                            </Form.Item>
                                            <Form.Item
                                                label="Start date"
                                                name={[field.name, 'startData']}
                                                rules={[{ required: true, message: 'Please select start date!' }]}
                                            >
                                                <DatePicker onChange={(date, dateString) => handleChange('startData', dateString, field.name)} />
                                            </Form.Item>
                                            <Form.Item
                                                label="Due date"
                                                name={[field.name, 'dueData']}
                                                rules={[{ required: true, message: 'Please select due date!' }]}
                                            >
                                                <DatePicker onChange={(date, dateString) => handleChange('dueData', dateString, field.name)} />
                                            </Form.Item>
                                        </Card>
                                    ))}
                                    <Button type="dashed" onClick={() => add()} block>
                                        + Add milestone
                                    </Button>
                                </div>
                            )}
                        </Form.List>
                        <Form.Item  >
                            <Button htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
}
export default ContractForm