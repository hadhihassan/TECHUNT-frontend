import { Dialog, Transition } from '@headlessui/react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Fragment } from 'react'
import { reviewRatingSchema } from '../../../util/validationSchema'

interface ReviewProps {
    openReview: boolean,
    closeModal: () => void,
}
interface ReviewType {
    description: string
    rate: string
}
const ReviewForm: React.FC<ReviewProps> = ({ openReview, closeModal }) => {
    const handleSubmit = (reviewData: ReviewType) => {
        console.log(reviewData)
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
                                    <Formik
                                        initialValues={{
                                            description: '',
                                            rate: ''
                                        }}
                                        validationSchema={reviewRatingSchema}
                                        onSubmit={(values:ReviewType) => handleSubmit(values)}
                                    >
                                        {() => (
                                            <Form
                                                className='w-full  text-sm font-sans font-semibold flex flex-col gap-4'
                                            >
                                                <div>
                                                    <label htmlFor="institution">Description:</label>
                                                    <Field type="text" id="institution" name="institution" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                    <ErrorMessage name="institution" component="div" className="error text-sm text-red-500" />
                                                </div>
                                                <div>
                                                    <label htmlFor="degree">Rate:</label>
                                                    <Field type="text" id="degree" name="degree" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                    <ErrorMessage name="degree" component="div" className="error text-sm text-red-500" />
                                                </div>
                                                <button type="submit" className='border-2 border-red-500 rounded-xl p-2 mt-2 font-semibold text-sm' >Rate</button>
                                            </Form>
                                        )}
                                    </Formik>
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