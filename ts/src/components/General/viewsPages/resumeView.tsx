import React, { useState, Fragment } from 'react';
import { Document, Page, pdfjs, } from 'react-pdf';
import { Dialog, Transition } from '@headlessui/react'
import 'react-pdf/dist/Page/TextLayer.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ROOTSTORE } from '../../../redux/store';
interface DisplayPdfProps {
    pdfUrl: string;
    open: boolean
    closeModal: () => void
    uploadNewResume: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const DisplayResume: React.FC<DisplayPdfProps> = ({ pdfUrl, open, closeModal, uploadNewResume }) => {
    const userData = useSelector((state: ROOTSTORE) => state.signup)
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess() {
        setPageNumber(1);
    }
    const onButtonClick = async () => {
        try {
            const response = await axios.get(pdfUrl, {
                responseType: 'blob',
            });
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(pdfBlob);
            const tempLink = document.createElement('a');
            tempLink.href = url;
            tempLink.setAttribute('download', 'file.pdf');
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };
    return <>
        <Transition appear show={open} as={Fragment} >
            <Dialog as="div" className="relative z-10" onClose={closeModal} open={open}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto h-auto w-auto flex justify-center items-center">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full h-auto transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    My Resume
                                </Dialog.Title>
                                <div className='h-[110vh] w-[100vh] overflow-auto mt-20'>
                                    <div className='flex items-start gap-2'>
                                        {
                                            userData.premiumUser && <>
                                                <button className='mb-5 border border-red-500 rounded-xl font-sans font-semibold text-red-500 px-2 py-1' onClick={onButtonClick}>Download</button>
                                            </>
                                        }
                                        {
                                            userData.role === "TALENT" && <>
                                                <div className="flex  items-center justify-center">
                                                    <label className="mb-5 border border-red-500 rounded-xl font-sans font-semibold text-red-500 px-2 py-1">
                                                        <span className="font-sans font-semibold leading-normal" >Upload resume</span>
                                                        <input type='file' className="hidden" onChange={uploadNewResume} />
                                                    </label>
                                                </div>
                                            </>
                                        }
                                    </div>
                                    <Document
                                        file={pdfUrl}
                                        onLoadSuccess={onDocumentLoadSuccess}
                                    >
                                        <Page pageNumber={pageNumber} />
                                    </Document>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>
};

export default DisplayResume;