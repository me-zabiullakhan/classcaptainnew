
import React from 'react';
import { MenuIcon } from '../icons/MenuIcon';
import { MoonIcon } from '../icons/MoonIcon';
import { SunIcon } from '../icons/SunIcon';

interface StudentHeaderProps {
    studentName: string;
    academyLogoUrl?: string;
    onToggleNav: () => void;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
}

export function StudentHeader({ studentName, academyLogoUrl, onToggleNav, theme, onToggleTheme }: StudentHeaderProps): React.ReactNode {
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
        <header className="bg-indigo-700 text-white p-3 flex items-center justify-between shadow-md sticky top-0 z-30">
            <div className="flex items-center">
                <button onClick={onToggleNav} className="p-2 -ml-1" aria-label="Open menu">
                    <MenuIcon className="w-6 h-6" />
                </button>
                {academyLogoUrl && (
                    <img src={academyLogoUrl} alt="Academy Logo" className="w-8 h-8 rounded-full object-cover ml-3" />
                )}
                <h1 className="text-xl font-bold ml-3">{greeting}, {studentName}!</h1>
            </div>
            <button onClick={onToggleTheme} className="text-indigo-200 hover:text-white transition-colors p-2" aria-label="Toggle dark mode">
                {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
            </button>
        </header>
    );
}
