
import React from 'react';
import { LogoutIcon } from './icons/LogoutIcon';
import { MoonIcon } from './icons/MoonIcon';

interface HeaderProps {
    academyName: string;
    academyId: string;
    onLogout: () => void;
}

export function Header({ academyName, academyId, onLogout }: HeaderProps): React.ReactNode {
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
                <div>
                    <h1 className="text-xl md:text-2xl font-bold">{greeting}, {academyName}!</h1>
                    <p className="text-sm text-indigo-200 mt-1">Academy ID: {academyId}</p>
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
