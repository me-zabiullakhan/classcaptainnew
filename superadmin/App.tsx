import React, { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { SuperAdminPanel } from './components/SuperAdminPanel';
import type { CurrentUser } from './types';

export default function App() {
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

    const handleLogin = (user: CurrentUser) => {
        setCurrentUser(user);
    };

    const handleLogout = () => {
        setCurrentUser(null);
    };

    if (!currentUser) {
        return <LoginPage onLogin={handleLogin} />;
    }

    return <SuperAdminPanel onLogout={handleLogout} />;
}
