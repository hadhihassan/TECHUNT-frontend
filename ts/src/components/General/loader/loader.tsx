import React from 'react';
import avatar from '../../../assets/avatar-thinking-9.svg'
const Loader = () => {
    return (
        <>
            <div className="flex justify-center items-center h-full">
                <div className="relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
                    <img src={avatar} className="rounded-full h-28 w-28" />
                </div>
            </div>
        </>
    )
};

export default Loader;