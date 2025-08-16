import React from 'react';
import { LogoIcon } from './icons/LogoIcon';

export function SplashScreen(): React.ReactNode {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center animate-pulse">
                <LogoIcon className="w-20 h-20 text-purple-600" />
                <p className="text-gray-500 mt-4 text-lg font-medium">Loading...</p>
            </div>
        </div>
    );
}
