
import React from 'react';
import { CloudSlashIcon } from './icons/CloudSlashIcon';

export function OfflineIndicator(): React.ReactNode {
    return (
        <div className="bg-yellow-100 border-b-2 border-yellow-300 text-yellow-800 p-3 text-center text-sm font-medium z-10 flex flex-col sm:flex-row items-center justify-center space-x-2 animate-fade-in">
            <CloudSlashIcon className="w-5 h-5 flex-shrink-0 mb-1 sm:mb-0" />
            <div>
                <span className="font-bold">You are currently offline.</span>
                <span className="block sm:inline sm:ml-1">The app will sync when you're back online. If this persists, check your network and Firebase configuration.</span>
            </div>
        </div>
    );
}
