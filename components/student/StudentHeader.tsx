
import React from 'react';
import { MenuIcon } from '../icons/MenuIcon';

interface StudentHeaderProps {
    studentName: string;
    academyLogoUrl?: string;
    onToggleNav: () => void;
}

export function StudentHeader({ studentName, academyLogoUrl, onToggleNav }: StudentHeaderProps): React.ReactNode {
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
        <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md">
            <button onClick={onToggleNav} className="p-2 -ml-1" aria-label="Open menu">
                <MenuIcon className="w-6 h-6" />
            </button>
            {academyLogoUrl && (
                <img src={academyLogoUrl} alt="Academy Logo" className="w-8 h-8 rounded-full object-cover ml-3" />
            )}
            <h1 className="text-xl font-bold ml-3">{greeting}, {studentName}!</h1>
        </header>
    );
}
