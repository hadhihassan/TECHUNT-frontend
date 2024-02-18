import Header from "../General/Home/Header/afterLoginHeader";
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
import { useForm } from 'react-hook-form';
import toast, { Toaster } from "react-hot-toast";
import { useParams } from 'react-router-dom';
import { editJobPost, fetchAllJobPost } from "../../api/client.Api"
const top100Films = [
    'The Shawshank Redemption',
    'The Godfather',
    'The Godfather: Part II',
    'The Dark Knight',
    '12 Angry Men',
    "Schindler's List",
    'Pulp Fiction',

];
const EditjobPostForm = () => {
    const { id } = useParams();
    console.log(id, "this is the params")
    const success = (message: string) => {
        toast.success(message);
    }
    const error = (err: string) => toast.error(err);
    const fixedOptions: any = [];
    const [value, setValue] = React.useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const handleOptionChange = (event: { target: { value: any, }; }) => {
        setSelectedOption(event.target.value);
        onChangeInput(event)
    };

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [docId,setId] = useState<string | null>(null)
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
    useEffect(() => {
        fetchAllJobPost()
            .then((res: any) => {
                const data = res?.data?.data?.data.find((item: { _id: string | undefined; }) => item._id === id)
                console.log(data, res?.data?.data?.data)
                setId(data?._id)
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
            })

    }, [])
    const onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {

        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(formData)
    };

    const onChangeForTextArea: (e: ChangeEvent<HTMLTextAreaElement>) => void = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(formData)
    };
    const handleChangeSkill = (_event, newValue) => {
        const uniqueSkills = newValue.filter((option) => !formData.Skills.includes(option));

        setValue([
            ...value,
            ...uniqueSkills
        ]);

        setFormData((prevFormData) => ({
            ...prevFormData,
            Skills: [
                ...prevFormData.Skills,
                ...uniqueSkills
            ]
        }));
    };

    const handleSubmitForm = (e: React.FormEvent) => {
        e.preventDefault()
        editJobPost(formData,docId)
            .then((res: any) => {
                console.log(res)
                if (res.data) {
                    success(res?.data?.data?.message)
                } else {
                    error(res?.error?.response?.data?.message)
                }
            }).catch((err: any) => {
                error("Internal server error.")
            })
    }
    return (
        <>
            <Header />
            <div >
                <Toaster
                    position="top-left"
                    reverseOrder={false}
                />
                <div className="w-[80%] h-[165vh] m-auto mt-10 shadow-xl border rounded-xl">
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
                        <div className="w-full h-full md:flex font-sans font-medium  sm:w-[100%] ">
                            <div className="border-r-2 md:w-[80%] sm:w-full h-full ml-10 ">
                                <p className="mt-5">Job title</p>
                                <div className=" mt-4">
                                    <input
                                        name="Title"
                                        value={formData.Title}
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
                                        className="relative bg-gray-50 ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-gray-300 text-sm  focus:ring-violet-500  focus:border-gray-300 block w-[95%] rounded-xl p-2.5 checked:bg-emerald-500"
                                        placeholder="ex, need Web devloper for figma"
                                    />
                                    {errors.Title && <p className="font-sans font-normal text-xs text-red-500 m-1">{errors.Title.message}</p>}
                                </div>
                                <p className="mt-5">Describe about the project</p>
                                <div className=" mt-4">

                                    <textarea name="Description" value={formData.Description} onChange={onChangeForTextArea} rows={10} className="relative bg-gray-50 ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-gray-300 text-sm  focus:ring-violet-500  focus:border-gray-300 block w-[95%] rounded-xl p-2.5 checked:bg-emerald-500" placeholder="write here.." />
                                </div>
                                <p className="mt-5">Required Skills</p>
                                <div className=" mt-4">
                                    <Autocomplete
                                        multiple
                                        id="fixed-tags-demo"
                                        value={value}

                                        onChange={(_event, newValue) => {
                                            setValue([
                                                ...fixedOptions,
                                                ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
                                            ]);
                                            console.log(value)
                                            setFormData({
                                                ...formData,
                                                ["Skills"]: value,
                                            });
                                            console.log(formData.Skills)
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
                                            value={formData.Amount}
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
                            <div className="md:w-[20%]">
                                <button className="bg-red-500 px-5 py-2 rounded-full text-white font-sans text-sm font-semibold md:mt-10 md:ml-10" onClick={handleSubmitForm}>Edit Post job </button>
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