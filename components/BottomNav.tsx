
import React from 'react';
import { DashboardIcon } from './icons/DashboardIcon';
import { AccountIcon } from './icons/AccountIcon';
import { CentralIcon } from './icons/CentralIcon';

interface BottomNavProps {
  onNavigate: (page: string) => void;
  activePage: string;
}

export function BottomNav({ onNavigate, activePage }: BottomNavProps): React.ReactNode {
  return (
    <footer className="bg-white sticky bottom-0 w-full border-t border-gray-200 md:rounded-b-xl">
      <div className="flex justify-around items-center h-16">
        <button 
          onClick={() => onNavigate('dashboard')} 
          className={`flex flex-col items-center font-semibold ${activePage === 'dashboard' ? 'text-indigo-600' : 'text-gray-500'}`} 
          aria-label="Go to dashboard"
        >
          <DashboardIcon className="w-6 h-6 mb-1" />
          <span className="text-xs sm:text-sm">Dashboard</span>
        </button>
        
        <div className="relative -mt-12">
          <button className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg border-4 border-white" aria-label="Central Action">
            <CentralIcon className="w-8 h-8"/>
          </button>
        </div>
        
        <button 
          onClick={() => onNavigate('my-account')} 
          className={`flex flex-col items-center font-semibold ${activePage === 'my-account' ? 'text-indigo-600' : 'text-gray-500'}`} 
          aria-label="Go to my account"
        >
          <AccountIcon className="w-6 h-6 mb-1" />
          <span className="text-xs sm:text-sm">My Account</span>
        </button>
      </div>
    </footer>
  );
}
