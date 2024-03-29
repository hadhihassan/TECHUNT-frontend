import React from 'react';

interface ButtonProps {
    onClick?: () => void;
    bgColor: string;
    text: string;
    width: string;
    textColor?: string;
}

const ButtonMain: React.FC<ButtonProps> = ({ onClick, bgColor, text, width }) => {
    return (
        <button className={`bg-${bgColor} w-${width}`} onClick={onClick}>
            {text}
        </button>
    );
};

export default ButtonMain;
