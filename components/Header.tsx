
import React from 'react';
import { BellIcon } from './icons/BellIcon';
import { MoonIcon } from './icons/MoonIcon';
import { MenuIcon } from './icons/MenuIcon';
import { SunIcon } from './icons/SunIcon';
import type { Academy } from '../types';

interface HeaderProps {
    academy: Academy;
    onLogout: () => void;
    onToggleNav: () => void;
    onNavigate: (page: string) => void;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
    notificationCount: number;
}

const TrialIndicator = ({ trialEndsAt, onNavigate }: { trialEndsAt: any, onNavigate: (page: string) => void }) => {
    const [daysLeft, setDaysLeft] = React.useState(0);

    React.useEffect(() => {
        if (trialEndsAt) {
            const endDate = trialEndsAt.toMillis();
            const now = Date.now();
            const remaining = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));
            setDaysLeft(Math.max(0, remaining));
        }
    }, [trialEndsAt]);

    if (daysLeft <= 0) return null;

    return (
        <div className="bg-yellow-400 text-yellow-900 text-sm font-bold text-center p-2">
            <button onClick={() => onNavigate('subscription')} className="w-full">
                You have {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left in your trial. Upgrade Now!
            </button>
        </div>
    );
};


export function Header({ academy, onLogout, onToggleNav, onNavigate, theme, onToggleTheme, notificationCount }: HeaderProps): React.ReactNode {
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

    const displayName = academy.adminName || academy.name;

    return (
        <header className="bg-indigo-700 text-white shadow-md sticky top-0 z-30">
             {academy.subscriptionStatus === 'trialing' && academy.trialEndsAt && (
                <TrialIndicator trialEndsAt={academy.trialEndsAt} onNavigate={onNavigate} />
            )}
            <div className="p-4 flex justify-between items-center">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <button onClick={onToggleNav} className="flex-shrink-0 text-indigo-200 hover:text-white transition-colors p-2 -ml-2 rounded-full" aria-label="Open navigation menu">
                        <MenuIcon className="w-6 h-6" />
                    </button>
                    {academy.logoUrl && (
                        <img src={academy.logoUrl} alt="Academy Logo" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                    )}
                    <div className="min-w-0">
                        <h1 className="text-base sm:text-lg md:text-xl font-bold truncate">{greeting}, {displayName}!</h1>
                        <p className="text-sm text-indigo-200 mt-1 truncate">Academy ID: {academy.academyId}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <button onClick={onToggleTheme} className="text-indigo-200 hover:text-white transition-colors" aria-label="Toggle dark mode">
                        {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
                    </button>
                    <button onClick={() => onNavigate('notifications')} className="relative text-indigo-200 hover:text-white transition-colors" aria-label="Notifications">
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
