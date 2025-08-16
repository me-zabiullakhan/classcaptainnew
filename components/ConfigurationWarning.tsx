
import React from 'react';
import { InfoIcon } from './icons/InfoIcon';

export function ConfigurationWarning(): React.ReactNode {
    return (
        <div className="bg-blue-100 border-b-2 border-blue-300 text-blue-900 p-4 shadow-md z-20">
            <div className="flex items-start space-x-3">
                <InfoIcon className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                    <h3 className="text-lg font-bold">Action Required: Configure Firebase</h3>
                    <p className="mt-1 text-sm">
                        This application is currently using placeholder credentials and cannot connect to a database. To fix this, you must use your own Firebase project configuration.
                    </p>
                    <ol className="list-decimal list-inside mt-3 space-y-1 text-sm">
                        <li>Go to the <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:text-blue-700">Firebase Console</a> and select your project.</li>
                        <li>In Project Settings (⚙️), find your web app's configuration object.</li>
                        <li>Copy the entire <code className="bg-blue-200 text-blue-800 px-1 rounded text-xs">firebaseConfig</code> object.</li>
                        <li>Open the <code className="bg-blue-200 text-blue-800 px-1 rounded text-xs">firebaseConfig.ts</code> file in this project and replace the placeholder with your copied configuration.</li>
                    </ol>
                    <p className="mt-3 text-xs font-semibold">This banner will disappear automatically after you update the configuration.</p>
                </div>
            </div>
        </div>
    );
}
