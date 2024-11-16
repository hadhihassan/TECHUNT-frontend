import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { rateTheWork } from '../../../services/clientApiService';
import { useSelector } from 'react-redux';
import { ROOTSTORE } from '../../../redux/store';
import { message } from 'antd';


interface ReviewProps {
    openReview: boolean,
    closeModal: () => void,
    workId: string | undefined,
    to: string
    onUpdate : () => void
}

const ReviewForm: React.FC<ReviewProps> = ({ openReview, closeModal, workId, to, onUpdate }) => {
    const [comment, setDescription] = useState<string>("")
    const [rating, setRate] = useState<number>(0)
    const basicData = useSelector((state: ROOTSTORE) => state.signup)
    const handleSubmit = () => {
        rateTheWork(workId || "", { comment, rating, from: basicData.id || "", to }, basicData.role)
            .then(() => {
                message.success("Review addedd successfully, Thank you for rating .")
                onUpdate()
                closeModal()
            }).catch(()=>{
                message.error("Something went wrong .")
                closeModal()
            })
    }
    return (<>
        <Transition appear show={openReview} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <div className="fixed inset-0 overflow-y-auto">
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg  font-medium leading-6 text-gray-900"
                                >
                                    Rate Your Experience
                                </Dialog.Title>
                                <div className="mt-5">
                                    <div>
                                        <label htmlFor="institution">Description:</label>
                                        <input onChange={(e: { target: { value: string } }) => setDescription(e.target.value)} type="text" id="institution" name="institution" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="degree">Rate:</label>
                                        <Stack spacing={2} >
                                            <Rating name="size-small" defaultValue={0} size="small" onChange={(_event, newValue: number | null) => setRate(newValue || 0)} />
                                        </Stack>
                                    </div>
                                    <button type="submit" className='border-2 border-red-500 rounded-xl p-2 mt-2 font-semibold text-sm' onClick={handleSubmit}>Rate</button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>)
}

export default ReviewForm