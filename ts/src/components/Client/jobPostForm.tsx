import Header from "../General/Home/Header/afterLoginHeader";
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import React, { ChangeEvent, useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { useForm } from 'react-hook-form';
import { postJob } from "../../services/clientApiService";
import toast, { Toaster } from "react-hot-toast";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { useSocketContext } from "../../context/socketContext";
import { useSelector } from "react-redux";
import { ROOTSTORE } from "../../redux/store";
import { INITIALSTATE } from "../../redux/Slice/signupSlice";

const top100Films = [
    "JavaScript",
    "Python",
    "Java",
    "HTML",
    "CSS",
    "SQL",
    "Node.js",
    "React",
    "Angular",
    "Vue.js",
    "MongoDB",
    "Express.js",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "Google Cloud Platform",
    "TensorFlow",
    "PyTorch",
    "Machine Learning",
    "Deep Learning",
    "Artificial Intelligence",
    "Natural Language Processing",
    "Computer Vision",
    "Data Science",
    "Big Data",
    "Hadoop",
    "Spark",
    "Scala",
    "C++",
    "C#",
    "PHP",
    "Ruby",
    "Swift",
    "Objective-C",
    "Kotlin",
    "Flutter",
    "Dart",
    "Unity",
    "Game Development",
    "Cybersecurity",
    "Network Security",
    "Penetration Testing",
    "Blockchain",
    "Cryptocurrency",
    "Ethereum",
    "Smart Contracts",
    "Solidity",
    "Web Development",
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "Responsive Web Design",
    "RESTful APIs",
    "GraphQL",
    "Microservices",
    "DevOps",
    "Continuous Integration",
    "Continuous Deployment",
    "Git",
    "GitHub",
    "GitLab",
    "Jenkins",
    "Agile Methodologies",
    "Scrum",
    "Kanban",
    "Test-Driven Development",
    "Behavior-Driven Development",
    "Selenium",
    "Jira",
    "Confluence",
    "Microsoft Office",
    "Excel",
    "Word",
    "PowerPoint",
    "Google Workspace",
    "G Suite",
    "Microsoft Azure DevOps",
    "Trello",
    "Asana",
    "Slack",
    "Zoom",
    "Microsoft Teams",
    "Communication Skills",
    "Problem Solving",
    "Teamwork",
    "Time Management",
    "Leadership",
    "Creativity",
    "Critical Thinking",
    "Adaptability",
    "Attention to Detail",
    "Organization",
    "Multitasking",
    "Analytical Skills",
    "Presentation Skills",
    "Technical Writing"

];
const JobPostForm = () => {

    const navigate = useNavigate()
    const success = (message: string) => {
        toast.success(message);
        setTimeout(() => {
            navigate(-1)
        }, 1000);
    }
    //error toast host message
    const error = (err: string) => toast.error(err);
    const fixedOptions: string[] = [];
    const [value, setValue] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const handleOptionChange = (event: { target: { value: string, }; }) => {
        setSelectedOption(event.target.value);
        onChangeInput(event)
    };
    const userData: INITIALSTATE = useSelector((state: ROOTSTORE) => state.signup)
    const { socket } = useSocketContext();

    const { register, handleSubmit, formState: { errors } } = useForm();
    interface FormData {
        Title: string;
        Description: string;
        Skills: string[];
        TimeLine: string | 'Small' | 'Medium' | 'Large';
        Expertiselevel: string | 'Fresher' | 'Medium' | 'Experinced';
        WorkType: string | 'Fixed' | 'Milestone';
        Amount: number;
    }
    const [formData, setFormData] = useState<FormData>({
        Title: '',
        Description: '',
        Skills: value,
        TimeLine: '',
        Expertiselevel: '',
        WorkType: '',
        Amount: 0,
    });
    const onSubmit = () => {
        postJob(formData)
            .then((res: any) => {
                if (res?.data?.data.success) {
                    success(res?.data?.data.message)
                    // emiting the event for the premimum usersto notified
                    socket.emit("newJobPost", { userData, formData })
                    setFormData({
                        Title: '',
                        Description: '',
                        Skills: value,
                        TimeLine: '',
                        Expertiselevel: '',
                        WorkType: '',
                        Amount: 0,
                    })
                } else if (res.error.response.data.message) {
                    error(res?.error?.response?.data?.message)
                } else {
                    error("Internal server error.")
                }

            }).catch((err: AxiosError) => {
                console.log(err)
            })

    };
    const onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {

        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(name, value)
        console.log(formData)
    };

    const [editorHtml, setEditorHtml] = useState('');

    const handleEditorChange = (html: string) => {
        console.log(editorHtml)
        setEditorHtml(html);
        // const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            ["Description"]: html,
        }));

    };
    return (
        <>
            <Header />
            <div >
                <Toaster
                    position="top-left"
                    reverseOrder={false}
                />
                <div className="w-[80%] h-auto mb-10  m-auto mt-10 shadow-xl border-2 rounded-xl">
                    {/* form header  */}
                    <div className="border-b-2 w-full flex " onClick={() => {
                        history.back()
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-3 -mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <p className="font-sans font-semibold text-md  m-3">Back</p>
                    </div>
                    {/* left side input  */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full h-auto mb-5  md:flex font-sans font-medium  sm:w-[100%] ">
                            <div className="border-r-2 md:w-[80%] sm:w-full h-full ml-10 ">
                                <p className="mt-5">Job title</p>
                                <div className=" mt-4">
                                    <input
                                        name="Title"
                                        onChange={onChangeInput}
                                        // {...register('Title', {
                                        //     required: 'Job title is required',
                                        //     minLength: {
                                        //         value: 5,
                                        //         message: 'Job title must be at least 5 characters long',
                                        //     },
                                        //     maxLength: {
                                        //         value: 50,
                                        //         message: 'Job title cannot exceed 20 characters',
                                        //     },
                                        // })}
                                        type="text"
                                        className="relative bg-gray-50 ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-gray-300 text-sm  focus:ring-violet-500  focus:border-gray-300 block w-[94%] rounded-xl p-2.5 checked:bg-emerald-500"
                                        placeholder="ex, need Web developer for figma"
                                    />
                                    {errors.Title && <p className="font-sans font-normal text-xs text-red-500 m-1">{errors.Title.message}</p>}
                                </div>
                                <p className="mt-5">Describe about the project</p>
                                <div className="mt-4 w-[94%]">
                                    <ReactQuill
                                        theme="snow"
                                        value={editorHtml}
                                        onChange={handleEditorChange}
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
                                </div>
                                <p className="mt-5">Required Skills</p>
                                <div className=" mt-4">
                                    <Autocomplete
                                        multiple
                                        id="fixed-tags-demo"
                                        value={value}

                                        onChange={(_event, newValue) => {
                                            setFormData((prevData) => ({
                                                ...prevData,
                                                ["Skills"]: value,
                                            }));
                                            setValue([
                                                ...fixedOptions,
                                                ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
                                            ]);
                                        }}
                                        options={top100Films}
                                        getOptionLabel={(option) => option}
                                        renderTags={(tagValue, getTagProps) =>
                                            tagValue.map((option, index) => (
                                                <Chip
                                                    label={option}
                                                    {...getTagProps({ index })}
                                                    disabled={fixedOptions.indexOf(option) !== -1}
                                                    classes={{
                                                        root: 'bg-red-500 text-white', // Apply Tailwind CSS classes here
                                                    }}
                                                />
                                            ))
                                        }
                                        style={{ width: 775 }}
                                        renderInput={(params) => (
                                            <TextField {...params} placeholder="Add Skills" />
                                        )}
                                    />
                                </div>
                                {errors.Skills && <p>{errors.Skills.message}</p>}
                                <label className="text-end text-sm font-sans font-normal">maximum 15 Skills</label>
                                <p className="mt-5">Estimate your timeline here ? </p>
                                <div className=" mt-4">
                                    <FormControl>

                                        <RadioGroup
                                            onChange={onChangeInput}
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="TimeLine"
                                        >
                                            <FormControlLabel value="Small" control={<Radio />} label="Small" />
                                            <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
                                            <FormControlLabel value="Large" control={<Radio />} label="Large" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <p className="mt-5">Expertise level you want ?</p>
                                <div className=" mt-4">
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="Expertiselevel"
                                            onChange={onChangeInput}
                                        >
                                            <FormControlLabel value="Fresher" control={<Radio />} label="Fresher" />
                                            <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
                                            <FormControlLabel value="Experianced" control={<Radio />} label="Experinced" />
                                        </RadioGroup>
                                    </FormControl>

                                </div>
                                <p className="mt-5">What is work type ?
                                </p>
                                <div className=" mt-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="Fixed"
                                                name="WorkType"
                                                className="hidden"
                                                value="Fixed"
                                                onChange={handleOptionChange}
                                                checked={selectedOption === "Fixed"}
                                            />
                                            <label
                                                htmlFor="Fixed"
                                                className={`border rounded-md px-4 py-2 cursor-pointer transition-colors duration-300 ${selectedOption === "Fixed" ? 'bg-red-100 border-red-500' : ' border-gray-300 hover:bg-gray-300'
                                                    }`}
                                            >
                                                Fixed
                                            </label>
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="Milestone"
                                                name="WorkType"
                                                className="hidden"
                                                value="Milestone"
                                                onChange={handleOptionChange}
                                                checked={selectedOption === "Milestone"}
                                            />
                                            <label
                                                htmlFor="Milestone"
                                                className={`border rounded-md px-4 py-2 cursor-pointer transition-colors duration-300 ${selectedOption === "Milestone" ? 'bg-red-100 border-red-500' : ' border-gray-300 hover:bg-gray-300'
                                                    }`}
                                            >
                                                Milestone
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-5">Tell us about your budget ?
                                </p>
                                <div className=" mt-4">
                                    <FormControl >
                                        <OutlinedInput
                                            name="Amount"
                                            onChange={onChangeInput}
                                            id="outlined-adornment-amount"
                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            style={{ width: 300, height: 45 }}
                                            
                                        />
                                    </FormControl>
                                </div>
                            </div>
                            {/* right side for the  create button*/}
                            <div className="md:w-[20%] sm:m-5 md:m-5 m-1 xl:m-0">
                                <button className="bg-red-500 px-5 py-2 rounded-full text-white font-sans text-sm font-semibold md:mt-10 md:ml-10">Post job now</button>
                                <button className="border border-red-500 px-4 py-2 rounded-full font-sans text-sm font-semibold md:mt-2 md:ml-10 ">Saved as draft</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </>
    )
}


export default JobPostForm;