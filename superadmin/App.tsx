

import React, { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { SuperAdminPanel } from './components/SuperAdminPanel';
import type { CurrentUser } from './types';
import { firebaseConfig } from './firebaseConfig';
import { ConfigurationWarning } from './components/ConfigurationWarning';

export default function App() {
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const isPlaceholderConfig = firebaseConfig.apiKey.includes('placeholder');

    useEffect(() => {
        // Check for existing session
        const storedUser = localStorage.getItem('optilearn_superadmin');
        if (storedUser) {
            try {
                setCurrentUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse stored session", e);
                localStorage.removeItem('optilearn_superadmin');
            }
        }
        setIsLoading(false);
    }, []);

    const handleLogin = (user: CurrentUser) => {
        setCurrentUser(user);
        localStorage.setItem('optilearn_superadmin', JSON.stringify(user));
    };

    const handleLogout = () => {
        setCurrentUser(null);
        localStorage.removeItem('optilearn_superadmin');
    };

    if (isLoading) {
        return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading...</div>;
    }

    if (!currentUser) {
        return (
            <div className="min-h-screen bg-gray-900 flex flex-col">
                {isPlaceholderConfig && <ConfigurationWarning />}
                <LoginPage onLogin={handleLogin} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">
             {isPlaceholderConfig && <ConfigurationWarning />}
            <SuperAdminPanel onLogout={handleLogout} />
        </div>
    );
}