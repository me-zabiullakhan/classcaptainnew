
import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { LogoutIcon } from './icons/LogoutIcon';

interface MyAccountPageProps {
  onBack: () => void;
  onLogout: () => void;
}

export function MyAccountPage({ onBack, onLogout }: MyAccountPageProps): React.ReactNode {
  return (
    <div className="animate-fade-in flex flex-col h-full">
      <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md w-full -mx-3 sm:-mx-4 mt-[-1rem]">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back to dashboard">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold ml-2">My Account</h1>
      </header>

      <main className="flex-grow pt-6">
        <div className="space-y-4">
          <button
            onClick={onLogout}
            className="w-full bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center space-x-4 text-left"
          >
            <div className="w-10 h-10 text-red-500 flex items-center justify-center p-1">
                <LogoutIcon />
            </div>
            <span className="text-lg font-medium text-red-600">Logout</span>
          </button>
        </div>
      </main>
    </div>
  );
}
