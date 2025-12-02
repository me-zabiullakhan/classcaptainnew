

import React from 'react';
import { DataUsageIcon } from './icons/DataUsageIcon';

interface DataConsentModalProps {
    onAccept: () => void;
}

export function DataConsentModal({ onAccept }: DataConsentModalProps): React.ReactNode {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg max-w-md mx-auto text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 mb-5">
                    <DataUsageIcon className="h-9 w-9 text-purple-600" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">Internet Connection Required</h2>
                <p className="text-sm sm:text-base text-gray-600 mb-6">
                    OptiLearn requires an internet connection to sync data in real-time. Please be aware that using this application on a mobile network may consume your mobile data and could result in charges from your provider.
                </p>
                <button 
                    onClick={onAccept}
                    className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                    Accept & Continue
                </button>
            </div>
        </div>
    );
}