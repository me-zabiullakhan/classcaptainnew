
import React from 'react';
import { LogoIcon, FullLogoIcon } from './icons/LogoIcon';

interface SystemLogoProps {
    url?: string | null;
    className?: string;
    variant?: 'icon' | 'full';
}

export const SystemLogo: React.FC<SystemLogoProps> = ({ url, className = "", variant = 'icon' }) => {
    if (url) {
        if (variant === 'full') {
             return (
                <div className={`flex items-center gap-3 justify-center ${className}`}>
                    <img src={url} alt="App Logo" className="h-10 w-10 object-contain" />
                    <div className="flex flex-col text-left">
                        <span className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-none">OptiLearn</span>
                        <span className="text-[0.6rem] font-bold text-gray-500 dark:text-gray-400 tracking-[0.2em] uppercase mt-0.5">Get Organised</span>
                    </div>
                </div>
             )
        }
        return <img src={url} alt="App Logo" className={`object-contain ${className}`} />;
    }

    // Fallback to default SVG logos
    if (variant === 'full') return <FullLogoIcon className={className} />;
    return <LogoIcon className={className} />;
};
