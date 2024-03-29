import React from "react";

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="relative z-50 bg-white rounded-lg max-w-lg mx-auto p-8">
                <div className="absolute top-0 right-0 pt-2 pr-4">
                    <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
