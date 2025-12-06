import React, { useEffect } from 'react';
import { BuildingIcon } from '../icons/BuildingIcon';
import { AuthLayout, AuthCard, FormInput } from './AuthComponents';

interface CompleteRegistrationPageProps {
    onComplete: (instituteName: string) => Promise<void>;
    onLogout: () => void;
    userEmail: string;
    externalError: string | null;
    clearExternalError: () => void;
}

export function CompleteRegistrationPage({ onComplete, onLogout, userEmail, externalError, clearExternalError }: CompleteRegistrationPageProps) {
    const [instituteName, setInstituteName] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    useEffect(() => {
        if (externalError) {
            setError(externalError);
        }
    }, [externalError]);

    const handleSetError = (msg: string) => {
        clearExternalError();
        setError(msg);
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        handleSetError('');
        if (!instituteName.trim()) {
            handleSetError("Institute name is required.");
            return;
        }
        setIsLoading(true);
        await onComplete(instituteName);
        // On success, the page will change via App state, so no need to setIsLoading(false)
    };

    return (
        <AuthLayout title="Complete Your Registration" subtitle={`Just one more step, ${userEmail}`}>
            <AuthCard>
                <form onSubmit={handleSubmit}>
                    <p className="text-sm text-center text-gray-600 dark:text-gray-300 mb-6">
                        It looks like your account was created but your institute details weren't saved. Please provide your institute's name to finish setup.
                    </p>
                    <FormInput
                        icon={<BuildingIcon className="w-5 h-5" />}
                        label="Institute Name"
                        type="text"
                        name="instituteName"
                        placeholder="Enter your institute's name"
                        required
                        value={instituteName}
                        onChange={e => setInstituteName(e.target.value)}
                    />
                     {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
                    <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md mt-4 disabled:bg-indigo-300">
                        {isLoading ? 'Saving...' : 'Complete Registration'}
                    </button>
                </form>
                <div className="text-center mt-6">
                    <button onClick={onLogout} className="text-sm text-gray-500 dark:text-gray-400 hover:underline">
                        Not you? Logout
                    </button>
                </div>
            </AuthCard>
        </AuthLayout>
    );
}