
import React from 'react';
import { InfoIcon } from './icons/InfoIcon';

export function ConfigurationWarning(): React.ReactNode {
    return (
        <div className="bg-blue-100 border-b-2 border-blue-300 text-blue-900 p-4 shadow-md z-20 relative">
            <div className="flex items-start space-x-3">
                <InfoIcon className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                    <h3 className="text-lg font-bold">Action Required: Configure Firebase</h3>
                    <p className="mt-1 text-sm">
                        The Super Admin portal is using placeholder credentials. You must configure your Firebase project.
                    </p>
                    <ol className="list-decimal list-inside mt-3 space-y-1 text-sm">
                        <li>Go to the <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:text-blue-700">Firebase Console</a>.</li>
                        <li>Update the <code className="bg-blue-200 text-blue-800 px-1 rounded text-xs">superadmin/firebaseConfig.ts</code> file with your project's credentials.</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}
