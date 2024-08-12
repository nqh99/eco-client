import React from 'react';
import Image from 'next/image';

interface AlertProps {
    type: 'warning' | 'success' | 'error';
    message: string;
}

const alertConfig = {
    warning: { styles: 'bg-yellow-500 text-white', svgSrc: '/icons/warning.svg' },
    success: { styles: 'bg-green-500 text-white', svgSrc: '/icons/success.svg' },
    error: { styles: 'bg-red-500 text-white', svgSrc: '/icons/error.svg' },
};

const Alert: React.FC<AlertProps> = ({ type, message }) => {
    const { styles, svgSrc } = alertConfig[type];

    return (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded shadow-md ${styles}`}>
            <div className="flex items-center">
                <span className="text-sm font-medium">{message}</span>
                <Image src={svgSrc} alt={`${type} icon`} width={16} height={16} className="ml-2" />
            </div>
        </div>
    );
};

export default Alert;
