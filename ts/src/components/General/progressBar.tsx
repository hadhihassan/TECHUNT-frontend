import React from 'react';

interface ProgressBarProps {
    value: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
    return (
        value < 6 ? (
            <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-70">
                <div className={`bg-red-500 h-1 rounded-full w-[50%] dark:bg-gray-70`}></div>
            </div>
        ) : (
            <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-70">
                <div className={`bg-red-500 h-1 rounded-full w-[100%] dark:bg-gray-70`}></div>
            </div>
        )
    );
};
