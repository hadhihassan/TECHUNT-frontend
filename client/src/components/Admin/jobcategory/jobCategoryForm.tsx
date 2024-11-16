import React, { ChangeEvent, useState } from "react"
import { descriptionRegex, nameRegex, maxLength, minLength } from '../../../constant/validation'
interface JobCategoryFormProps {
    editable: boolean;
    formData: JobInterface;
    handleChnage: (e: ChangeEvent<HTMLInputElement>) => void;
    OnSubmit: () => void
}
interface ValidattionInterface {
    nameError: string,
    descriptionError: string,
}
interface JobInterface {
    name: string,
    description: string,
}
const JobCategoryForm: React.FC<JobCategoryFormProps> = ({ formData, handleChnage, OnSubmit }) => {
    const [inputData, setData] = useState<JobInterface>({
        name: formData?.name || "",
        description: formData?.description || "",
    })

    const [errors, setErrors] = useState<ValidattionInterface>({
        nameError: "",
        descriptionError: "",
    });

    const changeData = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value }: { name: string, value: string } = e.target;
        if (e.target instanceof HTMLInputElement) {
            let error = ""
            switch (name) {
                case 'name':
                    if (!value.match(nameRegex)) {
                        error = 'Name must contain only letters';
                    } else if (value.trim().length < minLength.name || value.trim().length > maxLength.name) {
                        error = `Name must be between ${minLength.name} and ${maxLength.name} characters`;
                    }
                    setErrors({ ...errors, nameError: error });
                    break;
                case 'description':
                    if (!value.match(descriptionRegex)) {
                        error = 'Description must contain only letters';
                    } else if (value.trim().length < minLength.description || value.trim().length > maxLength.description) {
                        error = `Description must be between ${minLength.description} and ${maxLength.description} characters`;
                    }
                    setErrors({ ...errors, descriptionError: error });
                    break;
                default:
                    break;
            }
            setData({ ...inputData, [name]: value });
            handleChnage(e as ChangeEvent<HTMLInputElement>)
        }
    }
    const Validate = () => {
        if (!inputData.description && inputData.description === "") {
            setErrors({ ...errors, descriptionError: "Description is required" });
        } else if (!inputData.name && inputData.name === "") {
            setErrors({ ...errors, nameError: "Name is required" });
        } else {
            if (errors.descriptionError === "" && errors.nameError === "") {
                OnSubmit()
            }
        }
    }
    return (
        <>
            <div className=" w-auto h-auto">
                <div className="mb-1">
                    <p className="m-4 font-sans font-semibold text-center">Add new Job category</p>
                    <hr />
                </div>
                <div className="flex flex-wrap -mx-3 mb-1 mt-2">
                    <div className="w-full px-3">
                        <label className="block tracking-wide text-gray-900 text-xs font-bold mb-2">
                            Name
                        </label>
                        <input
                            required
                            name="name"
                            value={inputData?.name}
                            onChange={changeData}
                            className="appearance-none block w-[40vh] text-gray-900 border border-gray-200 rounded py-2 px-2 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                        />
                        <label className="block tracking-wide text-red-500 text-sm font-normal mb-2">
                            <div className="font-sans text-xs text-red-500 fonse">{errors.nameError}</div>
                        </label>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1 mt-2">
                    <div className="w-full px-3">
                        <label className="block tracking-wide text-gray-900 text-xs font-bold mb-2">
                            Description
                        </label>
                        <input
                            required
                            value={inputData?.description}
                            onChange={changeData}
                            name="description"
                            className="appearance-none block w-[40vh]  text-gray-900 border border-gray-200 rounded py-2 px-2 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" />
                        <label className="block tracking-wide text-red-500 text-sm font-normal mb-2">
                        </label>
                        <div className="font-sans text-xs text-red-500 fonse">{errors.descriptionError}</div>
                    </div>
                </div>
                <div className="mt-10">
                    <button
                        onClick={Validate}
                        type="submit" className="block w-full rounded-md text-center px-3.5 py-2.5  text-sm font-semibold text-white shadow-sm bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add</button>
                </div>
            </div>
        </>
    )
}

export default JobCategoryForm