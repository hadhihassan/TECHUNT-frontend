import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Space } from 'antd';
import type { Proposal as ProposalInterface } from '../../interface/interfaces';
import type { DatePickerProps } from 'antd';

interface ProposalFormProps {
    isOpen: boolean;
}

const ProposalForm: React.FC<ProposalFormProps> = ({ isOpen }) => {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])
    const onClose = () => {
        setOpen(false);
    };
    const [proposalData, setData] = useState<ProposalInterface>({
        title: "",
        coverLetter: "",
        rate: 0,
        availability: null,
        attachments: null,
        additionalInfo: ""
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
            ["availability"] : dateString 
        });
    };
    return (
        <>
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
                        <Button onClick={onClose}>Submit</Button>
                    </Space>
                }
            >
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="title"
                                label="Title"
                                rules={[{ required: true, message: 'Please enter the titel' }, { min: 4, message: "hai djsfhsdjh" }]}
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
                                    },
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
                                        required: true,
                                        message: 'Write ',
                                    },
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
                                rules={[{ required: true, message: 'Please choose the dateTime' }]}
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
                                label="Rate"
                                rules={[{ required: true, message: 'Please enter rate' }]}
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
                                <Input
                                    name="attachments"
                                    onChange={handleFormChange}
                                    style={{ width: '100%' }}
                                    placeholder="Please enter the rate"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export default ProposalForm;