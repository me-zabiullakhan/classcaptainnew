
import React from 'react';
import { BuildingIcon } from '../icons/BuildingIcon';
import { EmailIcon } from '../icons/EmailIcon';
import { UserIcon } from '../icons/UserIcon';
import { LockIcon } from '../icons/LockIcon';
import { auth, db } from '../../firebaseConfig';
import { GoogleIcon } from '../icons/GoogleIcon';
import firebase from 'firebase/compat/app';
import { AuthLayout, AuthCard, FormInput, InfoNote } from './AuthComponents';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { RefreshIcon } from '../icons/RefreshIcon';
import { CheckCircleIcon } from '../icons/CheckCircleIcon';
import { XCircleIcon } from '../icons/XCircleIcon';


interface RegisterPageProps {
    onNavigateToLogin: () => void;
}

const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = React.useState(value);
    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};


export function RegisterPage({ onNavigateToLogin }: RegisterPageProps) {
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [instituteName, setInstituteName] = React.useState('');
    const [adminName, setAdminName] = React.useState('');
    const [academyId, setAcademyId] = React.useState('');
    const [idStatus, setIdStatus] = React.useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
    const debouncedAcademyId = useDebounce(academyId, 800);


    React.useEffect(() => {
        const prefilledEmail = sessionStorage.getItem('registration_email');
        if (prefilledEmail) {
            setEmail(prefilledEmail);
        }
    }, []);
    
    React.useEffect(() => {
        if (instituteName && !academyId) {
            const suggestedId = instituteName
                .split(' ')
                .map(word => word.replace(/[^a-zA-Z0-9]/g, ''))
                .join('')
                .substring(0, 10)
                .toUpperCase();
            if (suggestedId) {
                setAcademyId(suggestedId);
            }
        }
    }, [instituteName]);
    
    React.useEffect(() => {
        if (debouncedAcademyId.length < 3) {
            setIdStatus('idle');
            return;
        }

        const checkId = async () => {
            // FIX: Ensure we have at least an anonymous session to satisfy Firestore security rules
            // which require request.auth != null for listing academies.
            if (!auth.currentUser) {
                try {
                    await auth.signInAnonymously();
                } catch (e) {
                    console.error("Failed to sign in anonymously for ID check:", e);
                    // We continue, as the query will likely fail, but the error handling below will catch it.
                }
            }

            setIdStatus('checking');
            try {
                const q = query(collection(db, "academies"), where("academyId", "==", debouncedAcademyId));
                const querySnapshot = await getDocs(q);
                setIdStatus(querySnapshot.empty ? 'available' : 'taken');
            } catch (err) {
                console.error("Error checking ID availability", err);
                setIdStatus('idle'); // fallback or handle error
            }
        };

        checkId();
    }, [debouncedAcademyId]);


    const handleGoogleRegister = async () => {
        setError('');
        if (!instituteName.trim() || !academyId.trim() || !adminName.trim()) {
            setError("Please enter your name, institute's name, and choose an Academy ID.");
            return;
        }
        if (idStatus !== 'available') {
            setError("Please choose an available Academy ID.");
            return;
        }

        setIsLoading(true);
        try {
            sessionStorage.setItem('google_reg_flow', 'true');
            sessionStorage.setItem('google_reg_institute_name', instituteName);
            sessionStorage.setItem('google_reg_academy_id', academyId);
            sessionStorage.setItem('google_reg_admin_name', adminName);
            const provider = new firebase.auth.GoogleAuthProvider();
            await auth.signInWithPopup(provider);
            // The onAuthStateChanged listener in App.tsx will now handle academy creation.
        } catch (error: any) {
            console.error("Google Registration Popup Error:", error);
            setError(error.message || 'Failed to start sign up with Google.');
            setIsLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        if (idStatus !== 'available' || !adminName.trim()) {
            setError("Please enter your name and choose an available Academy ID.");
            return;
        }

        setIsLoading(true);

        const form = e.target as HTMLFormElement;
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;
        const confirmPassword = (form.elements.namedItem('confirmPassword') as HTMLInputElement).value;

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        try {
            // Store details for the onAuthStateChanged listener to pick up
            sessionStorage.setItem('registration_institute_name', instituteName);
            sessionStorage.setItem('registration_academy_id', academyId);
            sessionStorage.setItem('registration_admin_name', adminName);
            
            await auth.createUserWithEmailAndPassword(email, password);
            // Listener in App.tsx will take over.
            
        } catch (err: any) {
            if (err.code === 'auth/email-already-in-use') {
                setError("This email address is already registered. Please try logging in.");
            } else {
                console.error("Registration Error:", err);
                setError(err.message || "An unexpected error occurred during registration.");
            }
            
            sessionStorage.removeItem('registration_institute_name');
            sessionStorage.removeItem('registration_academy_id');
            sessionStorage.removeItem('registration_admin_name');
            setIsLoading(false);
        }
    };
    
    const renderIdStatus = () => {
        if (academyId.length > 0 && academyId.length < 3) {
            return <p className="text-xs text-gray-500 mt-1 pl-1">ID must be at least 3 characters.</p>;
        }

        if (academyId.length < 3 || (idStatus === 'idle' && debouncedAcademyId.length < 3)) {
             return <div className="h-[20px] mt-1"></div>;
        }
    
        switch(idStatus) {
            case 'checking': 
                return (
                    <p className="flex items-center gap-1 text-xs text-gray-500 mt-1 pl-1">
                        <RefreshIcon className="w-4 h-4 animate-spin" />
                        <span>Checking availability...</span>
                    </p>
                );
            case 'available': 
                return (
                    <p className="flex items-center gap-1 text-xs text-green-600 mt-1 pl-1">
                        <CheckCircleIcon className="w-4 h-4" />
                        <span>Available!</span>
                    </p>
                );
            case 'taken': 
                return (
                    <p className="flex items-center gap-1 text-xs text-red-600 mt-1 pl-1">
                        <XCircleIcon className="w-4 h-4" />
                        <span>This ID is already taken.</span>
                    </p>
                );
            default:
                return <div className="h-[20px] mt-1"></div>;
        }
    };

    return (
        <AuthLayout title="Create Your Account" subtitle="Register your coaching institute with Class Captain">
            <AuthCard>
                <form onSubmit={handleRegister} className="space-y-4">
                    <FormInput icon={<BuildingIcon className="w-5 h-5" />} label="Institute Name" type="text" name="instituteName" placeholder="Enter institute name" required value={instituteName} onChange={e => setInstituteName(e.target.value)} />
                    <FormInput icon={<UserIcon className="w-5 h-5" />} label="Your Name" type="text" name="adminName" placeholder="Enter your full name" required value={adminName} onChange={e => setAdminName(e.target.value)} />
                    <div>
                        <FormInput icon={<BuildingIcon className="w-5 h-5" />} label="Academy ID" type="text" name="academyId" placeholder="e.g. SUNSHINE" required value={academyId} onChange={e => setAcademyId(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))} />
                        {renderIdStatus()}
                    </div>
                    <FormInput
                        icon={<EmailIcon className="w-5 h-5" />}
                        label="Email Address"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <FormInput icon={<LockIcon className="w-5 h-5" />} label="Password" type="password" name="password" placeholder="Create a password" required />
                    <FormInput icon={<LockIcon className="w-5 h-5" />} label="Confirm Password" type="password" name="confirmPassword" placeholder="Confirm your password" required />
                    
                    {error && <p className="text-red-500 text-sm text-center -mt-2 mb-2">{error}</p>}

                    <button type="submit" disabled={isLoading || idStatus !== 'available'} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md disabled:bg-indigo-300">
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                 <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">OR</span>
                    </div>
                </div>

                <button type="button" onClick={handleGoogleRegister} disabled={isLoading || idStatus !== 'available'} className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm disabled:opacity-50">
                    <GoogleIcon className="w-5 h-5" />
                    Sign up with Google
                </button>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Already have an account?{' '}
                        <button onClick={onNavigateToLogin} className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                            Sign in here
                        </button>
                    </p>
                </div>
                
                <InfoNote>
                    Your Academy ID is a unique, memorable code your students and staff will use to log in.
                </InfoNote>
            </AuthCard>
        </AuthLayout>
    );
}
