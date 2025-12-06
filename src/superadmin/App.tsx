import React, { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { SuperAdminPanel } from './components/SuperAdminPanel';
import type { CurrentUser } from './types';
import { firebaseConfig, auth } from './firebaseConfig';
import { ConfigurationWarning } from './components/ConfigurationWarning';

export default function App() {
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const isPlaceholderConfig = firebaseConfig.apiKey.includes('placeholder');

    useEffect(() => {
        const initAuth = async () => {
            const storedUser = localStorage.getItem('optilearn_superadmin');
            if (storedUser) {
                try {
                    // Restore firebase session if missing (e.g. page refresh)
                    // Firestore rules require authenticated user
                    if (!auth.currentUser) {
                        await auth.signInAnonymously();
                    }
                    setCurrentUser(JSON.parse(storedUser));
                } catch (e) {
                    console.error("Failed to restore firebase session", e);
                    // If we can't sign in to firebase, the app won't work.
                    // Clear local session to force manual re-login
                    localStorage.removeItem('optilearn_superadmin');
                }
            }
            setIsLoading(false);
        };
        initAuth();
    }, []);

    const handleLogin = (user: CurrentUser) => {
        setCurrentUser(user);
        localStorage.setItem('optilearn_superadmin', JSON.stringify(user));
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
        } catch (e) {
            console.error("Sign out error", e);
        }
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