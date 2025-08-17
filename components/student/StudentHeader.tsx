
import React from 'react';
import { MenuIcon } from '../icons/MenuIcon';

interface StudentHeaderProps {
    academyName: string;
    onLogout: () => void; // Keeping for future use, though not in UI from image
}

export function StudentHeader({ academyName }: StudentHeaderProps): React.ReactNode {
    return (
        <header className="bg-cyan-500 text-white p-3 flex items-center shadow-md">
            <button className="p-2 -ml-1" aria-label="Open menu">
                <MenuIcon className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold ml-3">{academyName}</h1>
        </header>
    );
}
