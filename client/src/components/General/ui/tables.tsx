/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ChangeEvent } from "react"
import Modal from "../profile/profileEditModal";
import { JOB_CATEGORY_FORM_DATA } from '../../../constant/columns'
import { createNewJobCategoru, softDeleteJobCategory } from "../../../services/adminApiService";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import toast, { Toaster } from "react-hot-toast";
import JobCategoryForm from "../../Admin/jobcategory/jobCategoryForm";
import EditJobCategoryForm from "../../Admin/jobcategory/editJobCategory";

interface TablesProps {
    data: JOB_CATEGORY_FORM_DATA[];
    columns: string[];
    reCall: () => void
}

const Tables: React.FC<TablesProps> = ({ data, columns, reCall }) => {

    const success = (message: string) => toast.success(message);
    const error = (err: string) => toast.error(err);
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
    const [formData, setFormData] = useState<JOB_CATEGORY_FORM_DATA>({
        name: "",
        description: "",
    })
    const handleChange: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const chandleAddNewJobCategory: () => void = () => {
        const formDataToUpload = new FormData();
        formDataToUpload.append('name', formData.name);
        formDataToUpload.append('description', formData.description);
        createNewJobCategoru(formDataToUpload)
            .then((res: any) => {
                if (res?.data?.data?.success) {
                    success(res?.data?.data?.message);
                    reCall()
                    setFormData({
                        name: "",
                        description: "",
                    })
                } else if (res?.data?.data?.message) {
                    error(res?.data?.data?.message);
                } else {
                    error(res?.error?.response?.data?.message as string || 'An error occurred while processing your request.');
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

    const filteredData = data.filter((item: { name?: string }) =>
        item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const changeState: (_id: string, status: boolean) => void = (_id, status) => {
        const state = !status
        softDeleteJobCategory(state, _id)
            .then((res: any) => {
                if (res?.data?.status === 200) {
                    success(res?.data?.data?.message);
                    reCall()
                } else if (res?.error) {
                    error(res?.error?.response?.data?.message || 'An error occurred while processing your request.');
                } else {
                    error(res?.error?.response?.data?.message || 'An error occurred while processing your request.');
                }
            }).catch((err) => {
                error(err?.error?.response?.data?.message || 'An error occurred while processing your request.');
            })
    }
    const [editData, setEditData] = useState<JOB_CATEGORY_FORM_DATA>()
    const editCategory = (index: number) => {
        setEditData(data[index])
        setFormData({
            name: data[index].name,
            description: data[index].description,
        })
        openModal1()
    }
    // paginaion logic
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage: number = 5;
    const totalPages: number = Math.ceil(filteredData.length / itemsPerPage);
    const indexOfLastPost: number = currentPage * itemsPerPage;
    const indexOfFirstPost: number = indexOfLastPost - itemsPerPage;
    const slicedData = filteredData.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };
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
                                className="inline-block  px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline">
                                Create job
                            </a>
                        </div>
                    </div>
                    <div className="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="align-middle inline-block    w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
                            <table className="min-w-full">
                                {/* <!-- HEAD start --> */}
                                <thead>
                                    <tr className="bg-gray-300 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                                        {
                                            columns?.map((names: string, index: number) => (
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
                                        slicedData?.map((value: JOB_CATEGORY_FORM_DATA, index: number) => (
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
                                                    <div className="text-sm leading-5 text-gray-900 text-center">
                                                        {new Date(value?.createdAt || "").toLocaleDateString()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                    <span className="px-2 inline-flex animate-pulse text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        {value?.status ? "Inactive" : "Active"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center text-sm leading-5 text-gray-500">
                                                    {value?.workingBelow}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap text-right border-b  border-gray-200 text-sm leading-5 font-medium">
                                                    <DeleteIcon color="error" className="ml-2" onClick={() => changeState(value?._id || "", value?.status || true)} />
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
                        <div className="flex items-end gap-4 justify-end m-10">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                className="bg-gray-900 px-3 py-1 text-white rounded-full"
                                    key={index}
                                    onClick={() => paginate(index + 1)}
                                    disabled={currentPage === index + 1}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* add job category modal starting */}
        <Modal isOpen={isOpen} onClose={closeModal}>
            <JobCategoryForm
                editable={false}
                formData={{ name: "", description: "" }}
                handleChnage={handleChange}
                OnSubmit={chandleAddNewJobCategory} />
        </Modal>
        {/* Modal end */}
        {/* editjob category modal starting */}
        <Modal isOpen={isOpen1} onClose={closeModal1}>
            <EditJobCategoryForm
                formData={editData || { _id: "", name: "", description: "" }}
                success={success}
                error={error}
                reCall={reCall}
            />
        </Modal>
        {/* Modal end */}

    </>
}
export default Tables