


import React from 'react';
import { BellIcon } from '../icons/BellIcon';
import { MoonIcon } from '../icons/MoonIcon';
import { MenuIcon } from '../icons/MenuIcon';
import { SunIcon } from '../icons/SunIcon';

interface StaffHeaderProps {
    staffName: string;
    academyName: string;
    onLogout: () => void;
    onToggleNav: () => void;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
    onNavigate: (page: string) => void;
    notificationCount: number;
}

export function StaffHeader({ staffName, academyName, onLogout, onToggleNav, theme, onToggleTheme, onNavigate, notificationCount }: StaffHeaderProps): React.ReactNode {
    const [greeting, setGreeting] = React.useState('');

    React.useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) {
            setGreeting('Good Morning');
        } else if (hour < 17) {
            setGreeting('Good Afternoon');
        } else {
            setGreeting('Good Evening');
        }
    }, []);

    return (
        <header className="bg-indigo-700 text-white p-4 shadow-md sticky top-0 z-30">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <button onClick={onToggleNav} className="text-indigo-200 hover:text-white transition-colors p-2 -ml-2 rounded-full" aria-label="Open navigation menu">
                        <MenuIcon className="w-6 h-6" />
                    </button>
                    <div>
                        <h1 className="text-lg sm:text-xl md:text-2xl font-bold">{greeting}, {staffName}!</h1>
                        <p className="text-sm text-indigo-200 mt-1">{academyName}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <button onClick={onToggleTheme} className="text-indigo-200 hover:text-white transition-colors" aria-label="Toggle dark mode">
                        {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
                    </button>
                     <button onClick={() => onNavigate('staff-notifications')} className="relative text-indigo-200 hover:text-white transition-colors" aria-label="Notifications">
                        <BellIcon className="w-6 h-6" />
                        {notificationCount > 0 && (
                            <span className="absolute -top-1 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-indigo-700">
                                {notificationCount > 9 ? '9+' : notificationCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}