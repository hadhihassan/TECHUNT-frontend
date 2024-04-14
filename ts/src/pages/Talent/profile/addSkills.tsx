/* eslint-disable @typescript-eslint/no-unused-vars */
import Avatar from "react-avatar";
import Header from "../../../components/General/Home/Header/header";
import Footer from "../../../components/General/Home/footer/footer";
import { useSelector } from "react-redux";
import { ROOTSTORE } from "../../../redux/store";
import Button from '@mui/material/Button';
import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clientRoutes } from "../../../routes/pathVariables";
import { storeWorkBasedDataBioData } from "../../../services/talentApiService";
import Alert from '@mui/material/Alert';
import { Combobox } from '@headlessui/react'
import axios from "axios";
import { message } from "antd";



const AddSkills: React.FC = () => {
    const [selectedPerson, setSelectedPerson] = useState("")
    const [query, setQuery] = useState('')
    const [people, setPeople] = useState<string[]>([])
    const [text, setText] = useState<string>("");
    const [skills, setSkills] = useState<string[]>([]);
    const [error, setError] = useState<string>("");

    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) => {
                return person.toLowerCase().includes(query.toLowerCase())
            })
    const data = useSelector((state: ROOTSTORE) => state.signup);
    const navigate = useNavigate();

    const addSkill: (value: string) => void = (value) => {
        
        if (value.trim() !== "") {
            if (!skills.includes(value.trim())) {
                setSkills(prevSkills => [...prevSkills, value.trim()]);
                setText("");
                setError(""); setText("");
            } else {
                setError("Skill already exists");
                setTimeout(() => {
                    setError("");
                }, 3000);
            }
        }
    };

    const removeSkill = (index: number) => {
        setSkills(prevSkills => prevSkills.filter((_, idx) => idx !== index));
    };

    const handleClick = () => {
        const dataString: string | null = localStorage.getItem("talent_Data");
        const data: { skills?: string[] } = dataString ? JSON.parse(dataString) : {};
        if (skills.length >= 5) {
            setError("")
            data.skills = skills;
            localStorage.setItem("talent_Data", JSON.stringify(data));
            storeWorkBasedDataBioData(data)
                .then(() => {
                    navigate(clientRoutes.ADD_PROFILE_DESCRIPTION);
                })
                .catch(() => {
                    message.error("Something went wrong !")
                })
                .finally(() => {
                });
        } else {
            setError("Minimum 5 skill you want ")
            setTimeout(() => {
                setError("");
            }, 300);
        }
    };
    const onChangeQuery = async (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
        const query = e.target.value
        const response = await axios.get(`https://api.apilayer.com/skills?q=${query}`, {
            headers: {
                'apikey': 'W7KRn2JNTycH8QoI9b0CVHczMD0rTofH'
            }
        });
        setPeople(response.data)
    }

    return (
        <div>
            <Header layout={true} />
            <div className="w-full flex justify-center items-center">
                <div className="w-[700px] flex justify-center items-center xl:[700px] md:w[1100px] sm:w-[650px] xs:w-[550px] flex-col h-[35rem] mt-16 mb-16 border shadow-2xl rounded-lg">
                    <Button />
                    <div className="w-[80%] h-[95%]">
                        <div className="flex w-full pt-9">
                            <div className="flex items-center justify-center">
                                <div>
                                    <Avatar name={data.email} size="33" round />
                                </div>
                                <div className="text-opacity-40 text-center text-stone-800 text-xs ml-1 font-medium font-sans underline">
                                    {data.email ? data.email : "hadhi@gmail.com"}
                                </div>
                            </div>
                            <div className="pl-[5rem] pt-1.5">
                                <p className="text-xl font-medium tracking-tight text-gray-900 ">Create profile</p>
                            </div>
                        </div>
                        <div className="mt-10">
                            <div className="flex justify-between">
                                <p onClick={() => history.back()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                    </svg>
                                </p>
                                <p>1/2</p>
                            </div>
                            <div className="pt-2 ">
                                {/* <ProgressBar value={40} /> */}
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="w-full">
                                <h1 className="text-2xl font-medium tracking-tight text-gray-900">Add your skills.</h1>
                                <p className="text-xs pt-4 font-normal">Add skills that increase your rating.</p>

                                {/* <input
                                    value={text}
                                    onChange={handleChange}
                                    id="message"
                                    className="block mt-4 p-2.5 w-full text-sm bg-gray-50 rounded-lg border focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:text-neutral-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Example: node js | react js"
                                /> */}
                                <Combobox value={selectedPerson} onChange={setSelectedPerson} >
                                    <Combobox.Input value={text} onChange={onChangeQuery}
                                        className="block mt-4 p-2.5 w-full text-sm bg-gray-50 rounded-lg border focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:text-neutral-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Example: node js | react js"
                                    />
                                    <Combobox.Options>
                                        {filteredPeople.map((person) => (
                                            <Combobox.Option onClick={() => addSkill(person)} key={person} value={person}>
                                                {person}
                                            </Combobox.Option>
                                        ))}
                                    </Combobox.Options>
                                </Combobox>
                                <label className="text-red-500 text-sm font-medium" onClick={addSkill}>+ Add skills</label>
                                {error && <Alert severity="warning">{error}</Alert>}
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
                                <button onClick={handleClick} className="w-[250px] mx-auto items-center text-white h-[35.31px] bg-red-500 rounded-[100px]">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AddSkills;
