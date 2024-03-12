import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export default function Modal({ isOpen, closeModal, content }) {
    return (
        <>
            <Transition appear show={isOpen} as={Fragment} >
                <Dialog as="div" className="fixed inset-0 w-auto z-10 overflow-y-auto" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black/25 w-auto" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="flex items-center justify-center min-h-full p-4">
                            <div className="mt-2 w-auto">{content}</div>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </>
    )
}
