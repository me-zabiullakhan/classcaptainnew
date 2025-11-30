
import React, { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { SuperAdminPanel } from './components/SuperAdminPanel';
import type { CurrentUser } from './types';
import { firebaseConfig } from './firebaseConfig';
import { ConfigurationWarning } from './components/ConfigurationWarning';

export default function App() {
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
    const isPlaceholderConfig = firebaseConfig.apiKey.includes('placeholder');

    const handleLogin = (user: CurrentUser) => {
        setCurrentUser(user);
    };

    const handleLogout = () => {
        setCurrentUser(null);
    };

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
