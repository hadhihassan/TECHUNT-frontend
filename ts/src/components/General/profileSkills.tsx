import React, { useEffect, useState } from "react";
import Modal from "./profileEditModal";
import { updateSkills } from "../../api/talent.Api";
import Alert from '@mui/material/Alert';



const profileSkills: React.FC<{ data: any, onUpdate: () => void }> = ({ data, onUpdate }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [text, setText] = useState<string>("");
    const [skills, setSkills] = useState<string[]>([]);
    const [success_Message, setSuccess_Message] = useState<boolean>(false)
    useEffect(() => {
        setSkills(data?.Profile?.Skills);
        console.log(data?.Profile?.Skills);
    }, [data]);

    const openModal: () => void = () => {
        setIsOpen(true);
    };

    const closeModal: () => void = () => {
        setIsOpen(false);
    };

    const addSkill: () => void = () => {
        if (text.trim() !== "") {
            setSkills(prevSkills => [...prevSkills, text.trim()]);
            setText("");
        }
    };

    const removeSkill = (index: number) => {
        setSkills(prevSkills => prevSkills.filter((_, idx) => idx !== index));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleUpdateSkills: () => void = () => {
        updateSkills(skills)
            .then((res: any) => {
                console.log(res);
                onUpdate();
                setSuccess_Message(true)
                setTimeout(() => {
                    setSuccess_Message(false)
                }, 3000);
            }).catch((err: any) => {
                console.log(err);
            });
    };

    return (
        <div className="w-[22rem] h-[20rem] rounded-2xl   border shadow-xl ">
            <div className="flex justify-between">
                <p className="m-4 font-sans font-medium">Top Skills</p>
                <button onClick={openModal} className="w-[5rem] mt-3 mr-2 font-sans font-medium rounded-full h-7 border border-red-500 text-red-500">Edit</button>
            </div>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <div className="mt-6">
                    <div className="w-full">
                        {success_Message ? <Alert severity="success">Skills set updated .</Alert> : null}
                        <h1 className="text-2xl font-medium tracking-tight text-gray-900">Add your skills.</h1>
                        <p className="text-xs pt-4 font-normal">Add skills that increase your rating.</p>
                        <input
                            value={text}
                            onChange={handleChange}
                            id="message"
                            className="block mt-4 p-2.5 w-full text-sm bg-gray-50 rounded-lg border focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:text-neutral-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Example: node js | react js"
                        />
                        <label className="text-red-500 text-sm font-medium" onClick={addSkill}>+ Add skills</label>
                        <div className="flex flex-wrap mt-2">
                            {skills &&
                                skills.map((value, key) => (
                                    <div key={key} className="flex items-center mt-2 mr-2">
                                        <p
                                            className={`bg-red-500 text-white rounded-xl text-center text-sm border relative ${value.length > 10 ? 'w-[10rem]' : 'w-[10rem]'
                                                }`}
                                        >
                                            {value}
                                            <label
                                                className="mr-4 bg-red-500 text-white h-[8px] ml-2 rounded-xl absolute right-0 cursor-pointer"
                                                onClick={() => removeSkill(key)}
                                            >
                                                X
                                            </label>

                                        </p>

                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-8">
                        <button onClick={handleUpdateSkills} className="w-[250px] mx-auto items-center text-white h-[35.31px] bg-red-500 rounded-[100px]">
                            Next
                        </button>
                    </div>
                </div>
            </Modal>
            <hr />
            <div className="flex flex-col space-y-5 items-start m-5">
                {data?.Profile?.Skills.map((value: string, key: number) => (
                    <span className="text-start font-semibold font-sans" key={key}>
                        {value}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default profileSkills;