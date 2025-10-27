import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export function SplashScreen(): React.ReactNode {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-gray-900">
            <LoadingSpinner message="Loading App..." />
        </div>
    );
}
