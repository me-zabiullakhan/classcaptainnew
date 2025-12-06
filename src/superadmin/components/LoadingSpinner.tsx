import React, { useState, useEffect } from 'react';
import { PencilIcon } from './icons/PencilIcon';
import { BookIcon } from './icons/BookIcon';
import { GraduationCapIcon } from './icons/GraduationCapIcon';

const icons = [
    PencilIcon,
    BookIcon,
    GraduationCapIcon,
];

export const LoadingSpinner: React.FC<{ message?: string }> = ({ message = "Loading..." }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % icons.length);
        }, 700); // Change icon every 700ms

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center gap-4 py-10">
            <div className="relative w-12 h-12">
                {icons.map((Icon, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <Icon className="w-12 h-12 text-indigo-500 dark:text-indigo-400" />
                    </div>
                ))}
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">{message}</p>
        </div>
    );
};
