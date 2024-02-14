import React, { useState, ChangeEvent } from "react"
import Modal from "./profileEditModal";
import { IMG_URL, JOB_CATEGORY_FORM_DATA } from '../../constant/columns'
import { createNewJobCategoru } from "../../api/admin.Api";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import toast, { Toaster } from "react-hot-toast";



//interface for props data shap 
interface TablesProps {
    data: any[];
    columns: string[];
    reCAll: () => void
}


const Tables: React.FC<TablesProps> = ({ data, columns, reCall }) => {
    //sucess toast hot message
    const success = (message: string) =>
        toast.success(message);
    //error toast host message
    const error = (err: string) => toast.error(err);
    //modal chandle states
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null)
    const openModal: () => void = () => {
        setIsOpen(true);
    };
    const closeModal: () => void = () => {
        setIsOpen(false);
    };
    //input change handlers & state
    const [formData, setFormData] = useState<JOB_CATEGORY_FORM_DATA>({
        name: "",
        description: "",
        image: null,
        status: false
    })
    const handleChnage: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
        if (e.target.name === 'image' && e.target.files && e.target.files.length > 0) {
            const selectedImage = e.target.files[0];
            setImage(e.target.files[0])
            setFormData({
                ...formData,
                image: selectedImage,
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    }
    //create a api call for the save new job category
    const chandleAddNewJobCategory: () => void = () => {
        const formDataToUpload = new FormData();
        formDataToUpload.append('name', formData.name);
        formDataToUpload.append('description', formData.description);
        if (formData.image) {
            formDataToUpload.append('image', formData.image);
        }
        createNewJobCategoru(formDataToUpload)
            .then((res: any) => {
                console.log('Job API response: ', res);
                if (res?.data?.data?.success) {
                    success(res?.data?.data?.message);
                    reCall()
                } else if (res?.data?.data?.message) {
                    error(res?.data?.data?.message);
                } else {
                    error(res?.error?.response?.data?.message || 'An error occurred while processing your request.');
                }
            })
            .catch((err) => {
                console.error('Job API error: ', err);
                error(err?.error?.response?.data?.message || 'An error occurred while processing your request.');
            });
    }
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return <>
        <div className="w-full h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="flex flex-col">
                    
                    <div className="-mb-2 py-4 flex flex-wrap flex-grow justify-between">
                        <div className="flex items-center py-2">
                            <input
                                onChange={handleSearch}
                                className=" appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-searcg"
                                type="text"
                                placeholder="Search" />
                        </div>
                        <div className="flex items-center py-2">
                            <a onClick={openModal}
                                className="inline-block  px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline">
                                Create job
                            </a>
                        </div>
                    </div>
                    <div className="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="align-middle inline-bloczzk w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
                            <table className="min-w-full">
                                {/* <!-- HEAD start --> */}
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                                        {
                                            columns.map((names: string, index: number) => (
                                                <th className="px-6 py-3 text-left font-medium" key={index}>
                                                    {names}
                                                </th>
                                            ))
                                        }
                                    </tr>
                                </thead>
                                {/* <!-- HEAD end --> */}
                                {/* <!-- BODY start --> */}
                                <tbody className="bg-white">
                                    {
                                        filteredData.map((value, index) => (
                                            <tr>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                    <div className="text-sm leading-5 text-gray-900">
                                                        {value.name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img className="h-10 w-10 rounded-full"
                                                                src={`${IMG_URL}${value.image}`}
                                                                alt="" />
                                                        </div>
                                                        {/* <div className="ml-4">
                                                            <div className="text-sm leading-5 font-medium text-gray-900">
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                    <div className="text-sm leading-5 text-gray-900 text-center">
                                                        {new Date(value.createdAt).toLocaleDateString()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                    <span className="px-2 inline-flex animate-pulse text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        {value.status ? "Inactive" : "Active"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center text-sm leading-5 text-gray-500">
                                                    {value.workingBelow}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap text-right border-b  border-gray-200 text-sm leading-5 font-medium">
                                                    <DeleteIcon color="error" className="ml-2" />
                                                    <EditNoteIcon color="primary" />
                                                </td>
                                            </tr>
                                        ))}
                                    <Toaster
                                        position="top-left"
                                        reverseOrder={true}
                                    />
                                </tbody>
                                {/* <!-- BODY end --> */}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* modal starting */}
        <Modal isOpen={isOpen} onClose={closeModal}>
            <div className="w-full  ">
                <div className="mb-1">
                    <p className="m-4 font-sans font-semibold text-center">Back</p>
                    <hr />
                </div>
                <div className="flex flex-wrap -mx-3 mb-1 mt-2">
                    <div className="w-full px-3">
                        <label className="block tracking-wide text-gray-900 text-xs font-bold mb-2">
                            Name
                        </label>
                        <input name="name" onChange={handleChnage} className="appearance-none block w-full  text-gray-900 border border-gray-200 rounded py-2 px-2 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" />
                        <label className="block tracking-wide text-red-500 text-sm font-normal mb-2">

                        </label>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1 mt-2">
                    <div className="w-full px-3">
                        <label className="block tracking-wide text-gray-900 text-xs font-bold mb-2">
                            Description
                        </label>
                        <textarea rows={2} onChange={handleChnage} name="description" className="appearance-none block w-full  text-gray-900 border border-gray-200 rounded py-2 px-2 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" />
                        <label className="block tracking-wide text-red-500 text-sm font-normal mb-2">
                        </label>
                    </div>
                </div>
                {image &&
                    <div className="flex flex-wrap -mx-3 mb-1 mt-2">
                        <div className="w-full px-3">
                            <img className="rounded-full h-20 w-20" src={URL.createObjectURL(image)} alt="Selected" />
                        </div>
                    </div>
                }
                <div className="flex flex-wrap -mx-3 mb-1 mt-2">
                    <div className="w-full px-3">
                        <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="imageUpload">
                            Image/Icon
                        </label>
                        <div className="relative">
                            <input
                                onChange={handleChnage}
                                type="file"
                                name="image"
                                className="appearance-none block w-full border border-gray-300 py-2 px-3 mb-1 leading-tight focus:outline-none focus:shadow-outline rounded-md"
                                id="imageUpload"
                                accept="image/*"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M12 4v16m8-8H4"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block tracking-wide text-gray-900 text-xs font-bold mb-2">
                            Status
                        </label>
                        <input onChange={handleChnage} name="status" className="appearance-none block w-full  text-gray-900 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" />
                        <label className="block tracking-wide text-red-500 text-sm font-normal mb-2">
                        </label>
                    </div>
                </div>
                <div className="mt-10">
                    <button
                        onClick={chandleAddNewJobCategory}
                        type="submit" className="block w-full rounded-md text-center px-3.5 py-2.5  text-sm font-semibold text-white shadow-sm bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add</button>
                </div>
            </div>
        </Modal>
        {/* Modal end */}
    </>
}
export default Tables