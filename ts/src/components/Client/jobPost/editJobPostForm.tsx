/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Header from "../../General/Home/Header/afterLoginHeader";
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import React, { ChangeEvent, useEffect, useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import toast, { Toaster } from "react-hot-toast";
import { useParams } from 'react-router-dom';
import { editJobPost, fetchAllJobPost } from "../../../services/clientApiService"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { topSkills } from "../../../schema/profileBasedSchema";


export interface jobInterface {
    _id?: string;
    Title: string;
    Description: string;
    Skills: string[];
    TimeLine: string | 'Small' | 'Medium' | 'Large';
    Expertiselevel: string | 'Fresher' | 'Medium' | 'Experinced';
    WorkType: string | 'Fixed' | 'Milestone';
    Amount: number;
}
const EditjobPostForm = () => {
    const { id } = useParams();
    console.log(id, "this is the params")
    const success = (message: string) => {
        toast.success(message);
    }
    const error = (err: string) => toast.error(err);
    const fixedOptions: string[] = [];
    const [value, setValue] = React.useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const handleOptionChange: (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void = (event: { target: { value: string, }; }) => {
        setSelectedOption(event.target.value);
        onChangeInput(event as ChangeEvent<HTMLInputElement>)
    };

    const [docId, setId] = useState<string | null>(null)
    const [formData, setFormData] = useState<jobInterface>({
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
        AmountError: "",
    });
    const [validationError, setValidationError] = useState('');
    const [editorHtml, setEditorHtml] = useState("");

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
    useEffect(() => {
        fetchAllJobPost()
            .then((res: any) => {
                if (res) {
                    const data: jobInterface | undefined = res?.data?.data?.data.find((item: jobInterface) => item._id === id) || undefined
                    if (data) {
                        setId(data?._id || "")
                        setSelectedOption(data.WorkType)
                        setValue(data.Skills)
                        setFormData({
                            Title: data?.Title,
                            Description: data?.Description,
                            Skills: data?.Skills,
                            TimeLine: data?.TimeLine,
                            Expertiselevel: data?.Expertiselevel,
                            WorkType: data?.WorkType,
                            Amount: data?.Amount,
                        })
                        setEditorHtml(data?.Description)
                    }
                }
            })
    }, [])
    const onChangeInput: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void = (e) => {
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
    };
    const handleSubmitForm = (e: React.FormEvent) => {
        e.preventDefault()
        if (formData.Title === "") {
            setFormDataError((prevData) => ({
                ...prevData,
                ["TitleError"]: "Title is required .",
            }));
        }
        if (formData.Description === "") {
            setValidationError("Description is required .")
        }
        if (formData.Skills.length === 0) {
            setFormDataError((prevData) => ({
                ...prevData,
                ["SkillsError"]: "Skills is required .",
            }));
        }
        if (formData.Amount === 0) {
            setFormDataError((prevData) => ({
                ...prevData,
                ["AmountError"]: "Amount is required .",
            }));
        }
        if (formDataError.AmountError === "" && formDataError.SkillsError === "" &&
            formDataError.TitleError === "" && validationError === ""
        ) {
            editJobPost(formData, docId || "")
                .then((res: any) => {
                    if (res.data) {
                        success(res?.data?.data?.message || "")
                    } else {
                        error(res?.error?.response?.data?.message || "")
                    }
                }).catch(() => {
                    error("Internal server error.")
                })
        }
    }
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
                    <form >
                        <div className="w-full h-auto mb-5  md:flex font-sans font-medium  sm:w-[100%] ">
                            <div className="border-r-2 md:w-[80%] sm:w-full h-full ml-10 ">
                                <p className="mt-5">Job title</p>
                                <div className=" mt-4">
                                    <input
                                        name="Title"
                                        value={formData.Title}
                                        onChange={onChangeInput}
                                        type="text"
                                        className="relative bg-gray-50 ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-gray-300 text-sm  focus:ring-violet-500  focus:border-gray-300 block w-[94%] rounded-xl p-2.5 checked:bg-emerald-500"
                                        placeholder="ex, need Web devloper for figma"
                                    />
                                </div>
                                {formDataError.TitleError && <p className="text-red-500">{formDataError.TitleError}</p>}
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
                                    />                                </div>
                                {validationError && <p className="text-red-500">{validationError}</p>}
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
                                    {formDataError.SkillsError && <p className="text-red-500">{formDataError.SkillsError}</p>}
                                </div>
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
                                            <FormControlLabel value="Small" control={<Radio />} label="Small" checked={formData.TimeLine === "Small"} />
                                            <FormControlLabel value="Medium" control={<Radio />} label="Medium" checked={formData.TimeLine === "Medium"} />
                                            <FormControlLabel value="Large" control={<Radio />} label="Large" checked={formData.TimeLine === "Large"} />
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
                                            <FormControlLabel value="Fresher" control={<Radio />} label="Fresher" checked={formData.Expertiselevel === "Fresher"} />
                                            <FormControlLabel value="Medium" control={<Radio />} label="Medium" checked={formData.Expertiselevel === "Medium"} />
                                            <FormControlLabel value="Experianced" control={<Radio />} label="Experinced" checked={formData.Expertiselevel === "Experianced"} />
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
                                            type="number"
                                            value={formData.Amount}
                                            name="Amount"
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
                            <div className="md:w-[20%]">
                                <button className="bg-red-500 px-5 py-2 rounded-full text-white font-sans text-sm font-semibold md:mt-10 md:ml-10" onClick={handleSubmitForm}>Edit job post  </button>
                                <button className="border border-red-500 px-4 py-2 rounded-full font-sans text-sm font-semibold md:mt-2 md:ml-10 ">Saved as draft</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </>
    )
}


export default EditjobPostForm;