
import React from 'react';
import { MenuIcon } from '../icons/MenuIcon';

interface StudentHeaderProps {
    academyName: string;
    onLogout: () => void; // Keeping for future use, though not in UI from image
}

export function StudentHeader({ academyName }: StudentHeaderProps): React.ReactNode {
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
            <button className="p-2 -ml-1" aria-label="Open menu">
                <MenuIcon className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold ml-3">{greeting}, {academyName}!</h1>
        </header>
    );
}
