/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "../../General/Home/Header/afterLoginHeader";
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ChangeEvent, useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { postJob } from "../../../services/clientApiService";
import toast, { Toaster } from "react-hot-toast";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useSocketContext } from "../../../context/socketContext";
import { useSelector } from "react-redux";
import { ROOTSTORE } from "../../../redux/store";
import { INITIALSTATE } from "../../../redux/Slice/signupSlice";
import { Socket } from "socket.io-client";
import { topSkills } from "../../../schema/profileBasedSchema";


const JobPostForm = () => {
    const navigate = useNavigate()
    const success = (message: string) => {
        toast.success(message);
        setTimeout(() => {
            navigate(-1)
        }, 1000);
    }
    const error = (err: string) => toast.error(err);
    const fixedOptions: string[] = [];
    const [value, setValue] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState<string>("");
    const handleOptionChange = (event: { target: { value: string, }; }) => {
        setSelectedOption(event?.target?.value as string || "");
        onChangeInput(event as ChangeEvent<HTMLInputElement>)
    };
    const userData: INITIALSTATE = useSelector((state: ROOTSTORE) => state.signup)
    const { socket }: { socket: Socket } = useSocketContext() as { socket: Socket };
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
    const [formDataError, setFormDataError] = useState({
        TitleError: '',
        SkillsError: "",
        TimeLineError: '',
        ExpertiselevelError: '',
        WorkTypeError: '',
        AmountError: "",
    });
    const [validationError, setValidationError] = useState('');
    const onSubmit = () => {
        if (formData.Title === "") {
            setFormDataError((prevData) => ({
                ...prevData,
                ["TitleError"]: "Title is required .",
            }));
        }
        if (formData.Description === "") {
            setValidationError("Description is required .")
        }
        if (formData.TimeLine === "") {
            setFormDataError((prevData) => ({
                ...prevData,
                ["TimeLineError"]: "TimeLineError is required .",
            }));
        }
        if (formData.Skills.length === 0) {
            setFormDataError((prevData) => ({
                ...prevData,
                ["SkillsError"]: "Skills is required .",
            }));
        }
        if (formData.Expertiselevel === "") {
            setFormDataError((prevData) => ({
                ...prevData,
                ["ExpertiselevelError"]: "Expertiselevel is required .",
            }));
        }
        if (formData.WorkType === "") {
            setFormDataError((prevData) => ({
                ...prevData,
                ["WorkTypeError"]: "WorkType is required .",
            }));
        }
        if (formData.Amount === 0) {
            setFormDataError((prevData) => ({
                ...prevData,
                ["AmountError"]: "Amount is required .",
            }));
        }

        if (formDataError.AmountError === "" && formDataError.SkillsError === "" && formDataError.TimeLineError === "" &&
            formDataError.ExpertiselevelError === "" && formDataError.TitleError === "" && formDataError.WorkTypeError === "" && validationError === ""
        ) {
            postJob(formData)
                .then((res: any) => {
                    if (res?.data?.data.success) {
                        success(res?.data?.data.message)
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
                    } else if (res?.error?.response?.data.message) {
                        error(res?.error?.response?.data?.message || "")
                    } else {
                        error("Internal server error.")
                    }
                }).catch((err: AxiosError) => {
                    console.log(err)
                })
        }
    };
    const [editorHtml, setEditorHtml] = useState<string>('');
    const onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {

        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        if (name === "Title") {
            if (value.trim() === "") {
                setFormDataError((prevData) => ({
                    ...prevData,
                    ["TitleError"]: "Title is required .",
                }));
                return
            } else if (value.trim().length < 4) {
                setFormDataError((prevData) => ({
                    ...prevData,
                    ["TitleError"]: "Title must be 4 charactors .",
                }));
                return
            } else if (value.trim().length > 30) {
                setFormDataError((prevData) => ({
                    ...prevData,
                    ["TitleError"]: "Title maximum 30 charactors allowed .",
                }));
                return
            } else {
                setFormDataError((prevData) => ({
                    ...prevData,
                    ["TitleError"]: "",
                }))
                return
            }
        } else if (name === "Amount") {
            const amount = parseInt(value)
            if (value.trim() === "") {
                setFormDataError((prevData) => ({
                    ...prevData,
                    ["AmountError"]: "Amount is required .",
                }));
                return
            } else if (amount < 0) {
                setFormDataError((prevData) => ({
                    ...prevData,
                    ["AmountError"]: "Amount must be positive number.",
                }));
                return
            } else if (value.trim().length > 10) {
                setFormDataError((prevData) => ({
                    ...prevData,
                    ["AmountError"]: "Amount cannot exceed 10 characters.",
                }));
                return
            } else {
                setFormDataError((prevData) => ({
                    ...prevData,
                    ["AmountError"]: "",
                }));
                return
            }
        }
        if (name === "TimeLine") {
            if (value === "") {
                setFormDataError((prevData) => ({
                    ...prevData,
                    ["TimeLineError"]: "Time is required.",
                }));
                return
            } else {
                setFormDataError((prevData) => ({
                    ...prevData,
                    ["TimeLineError"]: "",
                }));
                return
            }
        }
        if (name === "Expertiselevel") {
            if (value === "") {
                setFormDataError((prevData) => ({
                    ...prevData,
                    ["ExpertiselevelError"]: "Expertise level is required.",
                }));
                return
            } else {
                setFormDataError((prevData) => ({
                    ...prevData,
                    ["ExpertiselevelError"]: "",
                }));
                return
            }
        } if (name === "WorkType") {
            if (value === "") {
                setFormDataError((prevData) => ({
                    ...prevData,
                    ["WorkTypeError"]: "Work type is required.",
                }));
                return
            } else {
                setFormDataError((prevData) => ({
                    ...prevData,
                    ["WorkTypeError"]: "",
                }));
                return
            }
        }
    }
    const handleEditorChange = (html: string) => {
        setEditorHtml(html);
        if (html.trim() === "") {
            setValidationError('Description is required');
        } else if (html.trim().length < 50) {
            setValidationError('Description must be more than 50 characters.');
        } else {
            setValidationError('');
        }
        setFormData((prevData) => ({
            ...prevData,
            ["Description"]: html,
        }));
    };
    const handleSkillChange = (_event: any, newValue: any) => {
        setFormData(prevData => ({
            ...prevData,
            ["Skills"]: newValue,
        }));

        let error = '';
        if (newValue.length < 3 || newValue.length > 9) {
            error = 'Skills must be between 3 and 9';
        }
        setValue([
            ...fixedOptions,
            ...newValue.filter((option: string) => fixedOptions.indexOf(option) === -1),
        ]);
        setFormDataError(prevError => ({
            ...prevError,
            SkillsError: error,
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
                    <div className="w-full h-auto mb-5  md:flex font-sans font-medium  sm:w-[100%] ">
                        <div className="border-r-2 md:w-[80%] sm:w-full h-full ml-10 ">
                            <p className="mt-5">Job title</p>
                            <div className=" mt-4">
                                <input
                                    name="Title"
                                    onChange={onChangeInput}
                                    type="text"
                                    className="relative bg-gray-50 ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-gray-300 text-sm  focus:ring-violet-500  focus:border-gray-300 block w-[94%] rounded-xl p-2.5 checked:bg-emerald-500"
                                    placeholder="ex, need Web developer for figma"
                                />
                                {formDataError.TitleError && <p className="text-red-500">{formDataError.TitleError}</p>}
                            </div>
                            <p className="mt-5">Describe about the project</p>
                            <div className="mt-4 w-[94%]">
                                <ReactQuill
                                    theme="snow"
                                    value={editorHtml}
                                    onChange={handleEditorChange}
                                    placeholder={"Write Description"}
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
                                /> {validationError && <div className="text-red-500">{validationError}</div>}
                            </div>
                            <p className="mt-5">Required Skills</p>
                            <div className=" mt-4">
                                <Autocomplete
                                    multiple
                                    id="fixed-tags-demo"
                                    value={value}
                                    options={topSkills}
                                    onChange={handleSkillChange}
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
                            {formDataError.SkillsError && <p className="text-red-500">{formDataError.SkillsError}</p>}
                            <label className="text-end text-sm font-sans font-normal">maximum 15 Skills</label>
                            <p className="mt-5">Estimate your timeline here ? </p>
                            <div className=" mt-4">
                                <FormControl>
                                    <RadioGroup
                                        onChange={onChangeInput}
                                        row
                                        aria-required
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="TimeLine"
                                    >
                                        <FormControlLabel value="Small" control={<Radio />} label="Small" />
                                        <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
                                        <FormControlLabel value="Large" control={<Radio />} label="Large" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            {formDataError.TimeLineError && <p className="text-red-500">{formDataError.TimeLineError}</p>}
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
                            {formDataError.ExpertiselevelError && <p className="text-red-500">{formDataError.ExpertiselevelError}</p>}

                            <p className="mt-5">What is work type ?
                            </p>
                            <div className=" mt-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                        <input
                                            required
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
                                {formDataError.WorkTypeError && <p className="text-red-500">{formDataError.WorkTypeError}</p>}
                            </div>
                            <p className="mt-5">Tell us about your budget ?
                            </p>
                            <div className=" mt-4">
                                <FormControl >
                                    <OutlinedInput
                                        name="Amount"
                                        type="number"
                                        onChange={onChangeInput}
                                        id="outlined-adornment-amount"
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        style={{ width: 300, height: 45 }}

                                    />
                                </FormControl>
                            </div>
                            {formDataError.AmountError && <p className="text-red-500">{formDataError.AmountError}</p>}
                        </div>
                        {/* right side for the  create button*/}
                        <div className="md:w-[20%] sm:m-5 md:m-5 m-1 xl:m-0">
                            <button onClick={onSubmit} className="bg-red-500 px-5 py-2 rounded-full text-white font-sans text-sm font-semibold md:mt-10 md:ml-10">Post job now</button>
                            <button className="border border-red-500 px-4 py-2 rounded-full font-sans text-sm font-semibold md:mt-2 md:ml-10 ">Saved as draft</button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )

}

export default JobPostForm;