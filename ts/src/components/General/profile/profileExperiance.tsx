/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Modal from "./profileEditModal";
import { updateExperiance } from "../../../services/talentApiService";
import Alert from '@mui/material/Alert';


const ProfileExperiance: React.FC<{ data: any, onUpdate: () => void }> = ({ data, onUpdate }) => {

    const [success_Message, setSuccess_Message] = useState<boolean>(false)
    useEffect(() => {
        setExperience(data?.Profile?.Work_Experiance)
    }, [data])
    const [text, setText] = useState<string>("");
    const [experience, setExperience] = useState<string[]>([]);
    const addExperience: () => void = () => {
        if (text.trim() !== "") {
            setExperience(prevExperience => [...prevExperience, text.trim()]);
            setText("");
        }
    };
    const removeExperience = (index: number) => {
        setExperience(prevExperience => prevExperience.filter((_, idx) => idx !== index));
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };
    const [isOpen, setIsOpen] = useState(false);
    const openModal: () => void = () => {
        setIsOpen(true);
    };
    const closeModal: () => void = () => {
        setIsOpen(false);
    };
    const handleUpdateExperiance: () => void = () => {
        updateExperiance(experience)
            .then((res) => {
                console.log(res);
                setSuccess_Message(true)
                setTimeout(() => {
                    setSuccess_Message(false)
                }, 3000);
                onUpdate()
            }).catch((err) => {
                console.log(err);
            })
    }
    return (
        <div className="w-auto  rounded-xl h-auto shadow-2xl border bg-white">
            <div className="flex justify-between">
                <p className="m-4 font-sans font-medium">Work Experience</p>
                <button onClick={openModal} className="w-[5rem] mt-3 mr-2 font-sans font-medium rounded-full h-7 border border-red-500 text-red-500">Edit</button>
            </div>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <div className="mt-6">
                    <div className="w-full">
                        {success_Message ? <Alert severity="success">Experiances updated success .</Alert> : null}

                        <h1 className="text-2xl font-medium tracking-tight text-gray-900">Add your work experiences.</h1>
                        <p className="text-xs pt-4 font-normal">Add work experiences that increase your rating.</p>

                        <input
                            value={text}
                            onChange={handleChange}
                            id="message"
                            className="block mt-4 p-2.5 w-full text-sm bg-gray-50 rounded-lg border focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:text-neutral-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Example: Web developer | Web & Mobile"
                        />
                        <label className="text-red-500 text-sm font-medium" onClick={addExperience}>+ Add Experience</label>

                        <div className="flex flex-wrap mt-2">
                            {experience &&
                                experience.map((value, key) => (
                                    <div key={key} className="flex items-center mt-2 mr-2">
                                        <p
                                            className={`bg-red-500 text-white rounded-xl text-center text-sm border relative ${value.length > 10 ? 'w-[10rem]' : 'w-[10rem]'
                                                }`}
                                        >
                                            {value}
                                            <label

                                                className="mr-4 bg-red-500 text-white h-[8px] ml-2 rounded-xl absolute right-0 cursor-pointer"
                                                onClick={() => removeExperience(key)}
                                            >
                                                X
                                            </label>
                                        </p>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-8">
                        <button onClick={handleUpdateExperiance} className="w-[250px] mx-auto items-center text-white h-[35.31px] bg-red-500 rounded-[100px]">
                            Next
                        </button>
                    </div>
                </div>
            </Modal>
            <hr />
            <div className="flex flex-col space-y-5 items-start m-5">
                {data?.Profile?.Work_Experiance[0] ? (
                    <>
                        <p className="text-gray-700 text-md font-sans font-medium">
                            {data?.Profile?.Work_Experiance[0]}
                        </p>
                    </>
                ) : (
                    <p className="text-center text-3xl font-sans font-medium">Fresher</p>
                )}
            </div>
            {
                data?.Profile?.Work_Experiance[0] && (
                    <>
                        <hr />
                        <p className="mt-4 text-blue-500 text-center">View All</p>
                    </>
                )
            }
        </div >
    )
}


export default ProfileExperiance;