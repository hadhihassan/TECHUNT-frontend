import Avatar from "react-avatar";
import Header from "../../components/General/Home/Header/header";
import Footer from "../../components/General/Home/footer/footer";
import { ProgressBar } from "../../components/General/progressBar";
import { useSelector } from "react-redux";
import { ROOTSTORE } from "../../redux/store";
import Button from '@mui/material/Button'
import React, { useState } from "react";
import { talent_routes } from "../../util/pathVariables";
import { useNavigate } from "react-router";
import Alert from '@mui/material/Alert';


const Addexperiance: React.FC = () => {

    const navigate = useNavigate();
    const data = useSelector((state: ROOTSTORE) => state.signup);
    const [text, setText] = useState<string>("");
    const [experience, setExperience] = useState<string[]>([]);
    const [error, setError] = useState<string>("")

    const addExperience = () => {
        if (text.trim() !== "") {
            if (!experience.includes(text.trim())) {
                setExperience(prevExperience => [...prevExperience, text.trim()]);
                setText("");
                setError("");
            } else {
                setError("Experience already exists");
                setTimeout(() => {
                    setError("");
                }, 3000);
            }
        }
    };
    const removeExperience = (index: number) => {
        setExperience(prevExperience => prevExperience.filter((_, idx) => idx !== index));
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
        setError(""); // Clear error message when input changes
    };
    const handleClick = () => {
        let dataString: string | null = localStorage.getItem("talent_Data");
        let data: { experience?: string[] } = dataString ? JSON.parse(dataString) : {};
        data.experience = experience;
        localStorage.setItem("talent_Data", JSON.stringify(data));
        navigate(talent_routes.AddSkills);

    };

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
                                <ProgressBar value={40} />
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="w-full">
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
                                {error && <Alert severity="warning">{error}</Alert>}
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
}



export default Addexperiance;