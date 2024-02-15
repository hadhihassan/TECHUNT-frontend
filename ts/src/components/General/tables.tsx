import React, { useState, ChangeEvent } from "react"
import Modal from "./profileEditModal";
import { IMG_URL, JOB_CATEGORY_FORM_DATA } from '../../constant/columns'
import { createNewJobCategoru, editJobCategory, softDeleteJobCategory } from "../../api/admin.Api";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import toast, { Toaster } from "react-hot-toast";
import JobCategoryForm from "../Admin/jobcategory/jobCategoryForm";
//interface for props data shap 
interface TablesProps {
    data: any[];
    columns: string[];
    reCall: () => void
}

const Tables: React.FC<TablesProps> = ({ data, columns, reCall }) => {
    //sucess toast hot message
    const success = (message: string) =>
        toast.success(message);
    //error toast host message
    const error = (err: string) => toast.error(err);
    //modal chandle states
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpen1, setIsOpen1] = useState<boolean>(false);
    const openModal: () => void = () => {
        setIsOpen(true);
    };
    const closeModal: () => void = () => {
        setIsOpen(false);
    };
    const openModal1: () => void = () => {
        setIsOpen1(true);
    };
    const closeModal1: () => void = () => {
        setIsOpen1(false);
    };
    //input change handlers & state
    const [formData, setFormData] = useState<JOB_CATEGORY_FORM_DATA>({
        name: "",
        description: "",
        image: null,
    })
    const handleChnage: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
        if (e.target.name === 'image' && e.target.files && e.target.files.length > 0) {
            const selectedImage = e.target.files[0];
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
            console.log(formDataToUpload)
        }
        createNewJobCategoru(formDataToUpload)
            .then((res: any) => {
                if (res?.data?.data?.success) {
                    success(res?.data?.data?.message);
                    reCall()
                    setFormData({
                        name: "",
                        description: "",
                        image: null,
                    })
                } else if (res?.data?.data?.message) {
                    error(res?.data?.data?.message);
                } else {
                    error(res?.error?.response?.data?.message || 'An error occurred while processing your request.');
                }
            })
            .catch((err) => {
                error(err?.error?.response?.data?.message || 'An error occurred while processing your request.');
            });
    }
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const changeState: (_id: string, status: boolean) => void = (_id, status) => {
        const state = !status
        softDeleteJobCategory(state, _id)
            .then((res: any) => {
                if (res.data.status === 200) {
                    success(res?.data?.data?.message);
                    reCall()
                } else if (res?.error) {
                    error(res?.error?.response?.data?.message || 'An error occurred while processing your request.');
                } else {
                    error(res?.error?.response?.data?.message || 'An error occurred while processing your request.');
                }
            }).catch((err: any) => {
                error(err?.error?.response?.data?.message || 'An error occurred while processing your request.');
            })
    }
    const [editData, setEditData] = useState<{} | any | null>(null)
    const editCategory = (index: number) => {
        setEditData(data[index])
        setFormData({
            name: data[index].name,
            description: data[index].description,
            image: data[index].image,
        })
        openModal1()
    }
    const chandleEditJobCategory = () => {
        const formDataToUpload = new FormData();
        formDataToUpload.append('name', formData.name);
        formDataToUpload.append('description', formData.description);
        // if (formData.image) {
        //     formDataToUpload.append('image', formData.image );
        // }
        editJobCategory({ name: formData.name, description: formData.description }, editData?._id)
            .then((res: any) => {
                if (res?.data?.data.status === 200) {
                    success(res?.data?.data?.message);
                    reCall()
                } else if (res?.error?.response?.data.message) {
                    error(res.error.response.data.message);
                } else {
                    error(res?.error?.response?.data?.message);
                }
            }).catch((err: any) => {
                console.log(err)
                error(err?.error?.response?.data?.message);
            })
    }


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
                                                    <DeleteIcon color="error" className="ml-2" onClick={() => changeState(value._id, value.status)} />
                                                    <EditNoteIcon color="primary" onClick={() => editCategory(index)} />
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
        {/* add job category modal starting */}
        <Modal isOpen={isOpen} onClose={closeModal}>
            <JobCategoryForm
                editable={false}
                formData={undefined}
                handleChnage={handleChnage}
                OnSubmit={chandleAddNewJobCategory} />
        </Modal>
        {/* Modal end */}
        {/* editjob category modal starting */}
        <Modal isOpen={isOpen1} onClose={closeModal1}>
            <JobCategoryForm
                editable={true}
                formData={editData}
                handleChnage={handleChnage}
                OnSubmit={chandleEditJobCategory} />
        </Modal>
        {/* Modal end */}

    </>
}
export default Tables