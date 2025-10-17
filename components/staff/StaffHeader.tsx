
import React from 'react';
import { LogoutIcon } from '../icons/LogoutIcon';
import { MoonIcon } from '../icons/MoonIcon';
import { MenuIcon } from '../icons/MenuIcon';

interface StaffHeaderProps {
    staffName: string;
    academyName: string;
    onLogout: () => void;
    onToggleNav: () => void;
}

export function StaffHeader({ staffName, academyName, onLogout, onToggleNav }: StaffHeaderProps): React.ReactNode {
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
        <header className="bg-indigo-700 text-white p-4 shadow-md">
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
                    <button className="text-indigo-200 hover:text-white transition-colors" aria-label="Toggle dark mode">
                        <MoonIcon className="w-6 h-6" />
                    </button>
                    <button onClick={onLogout} className="text-indigo-200 hover:text-white transition-colors" aria-label="Logout">
                        <LogoutIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    );
}