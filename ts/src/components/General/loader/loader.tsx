import React from 'react';
import avatar from '../../../assets/avatar-thinking-9.svg'
const Loader = () => {
    return (
        <>
            <div className="relative flex justify-center items-center">
                <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
                <img src={avatar} className="rounded-full h-28 w-28" />
            </div>
        </>
    )
};

export default Loader;