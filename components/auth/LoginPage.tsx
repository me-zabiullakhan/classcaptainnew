
import React from 'react';
import { BuildingIcon } from '../icons/BuildingIcon';
import { EmailIcon } from '../icons/EmailIcon';
import { LockIcon } from '../icons/LockIcon';
import { UserIcon } from '../icons/UserIcon';
import { BookIcon } from '../icons/BookIcon';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import type { CurrentUser, Student, Staff, Academy } from '../../types';
import { demoStudents, demoStaff } from '../../demoData';
import { GoogleIcon } from '../icons/GoogleIcon';
import firebase from 'firebase/compat/app';
import { AuthLayout, AuthCard, FormInput } from './AuthComponents';
import { CalendarIcon } from '../icons/CalendarIcon';
import { AuthErrorModal } from './AuthErrorModal';
import { LoadingSpinner } from '../LoadingSpinner';


type Role = 'academy' | 'student' | 'staff';

interface LoginPageProps {
    onLogin: (user: CurrentUser) => void;
    onNavigateToRegister: () => void;
    externalError: string | null;
    clearExternalError: () => void;
    initialRole: Role;
    onGoBack: () => void;
}

const RoleSwitcher = ({ activeRole, onRoleChange }: { activeRole: Role, onRoleChange: (role: Role) => void }) => {
    const roles: { id: Role; name: string; icon: React.ReactNode }[] = [
        { id: 'academy', name: 'Academy', icon: <BuildingIcon className="w-5 h-5" /> },
        { id: 'student', name: 'Student', icon: <UserIcon className="w-5 h-5" /> },
        { id: 'staff', name: 'Teacher/Staff', icon: <BookIcon className="w-5 h-5" /> },
    ];

    return (
        <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-lg flex justify-between gap-1 mb-6">
            {roles.map(({ id, name, icon }) => (
                <button
                    key={id}
                    onClick={() => onRoleChange(id)}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-semibold transition-colors ${
                        activeRole === id ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                >
                    {icon}
                    {name}
                </button>
            ))}
        </div>
    );
};

const AcademyLoginFailedPopup = ({ onCancel, onRegister }: { onCancel: () => void, onRegister: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
        <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm mx-4 text-center">
            <h3 className="text-lg font-bold text-gray-800">Account Not Found</h3>
            <p className="text-gray-600 mt-2 mb-6">We couldn't find an academy account for that email. Please check for typos or register a new academy.</p>
            <div className="flex flex-col gap-3">
                <button onClick={onRegister} className="w-full bg-indigo-600 text-white font-bold py-2.5 rounded-lg hover:bg-indigo-700 transition-colors">
                    Register Academy
                </button>
                <button onClick={onCancel} className="w-full bg-gray-200 text-gray-800 font-bold py-2.5 rounded-lg hover:bg-gray-300 transition-colors">
                    Close
                </button>
            </div>
        </div>
    </div>
);

const ForgotPasswordModal = ({ onClose, initialEmail }: { onClose: () => void, initialEmail: string }) => {
    const [email, setEmail] = React.useState(initialEmail);
    const [isLoading, setIsLoading] = React.useState(false);
    const [status, setStatus] = React.useState<{ type: 'success' | 'error', message: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!email) return;
        setIsLoading(true);
        setStatus(null);
        try {
            await auth.sendPasswordResetEmail(email);
            setStatus({ type: 'success', message: 'Password reset email sent! Check your inbox.' });
        } catch (error: any) {
            console.error(error);
            let msg = "Failed to send reset email.";
            if (error.code === 'auth/user-not-found') msg = "No account found with this email.";
            if (error.code === 'auth/invalid-email') msg = "Invalid email address.";
            setStatus({ type: 'error', message: msg });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-sm mx-auto">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Reset Password</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Enter your email to receive a password reset link.</p>
                
                <form onSubmit={handleSubmit}>
                    <FormInput
                        icon={<EmailIcon className="w-5 h-5" />}
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        placeholder="admin@example.com"
                    />
                    
                    {status && (
                        <div className={`p-3 rounded-lg text-sm mb-4 ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {status.message}
                        </div>
                    )}

                    <div className="flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-2.5 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" disabled={isLoading || (status?.type === 'success')} className="flex-1 bg-indigo-600 text-white font-bold py-2.5 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-300">
                            {isLoading ? 'Sending...' : 'Send Link'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const DemoCredentials: React.FC<{ credentials: Record<string, string> }> = ({ credentials }) => (
    <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg border dark:border-gray-600">
        <p className="font-bold text-center mb-1 text-gray-600 dark:text-gray-300">For Demo</p>
        {Object.entries(credentials).map(([key, value]) => (
            <div key={key} className="flex justify-between">
                <span className="font-semibold">{key}:</span>
                <span className="font-mono">{value}</span>
            </div>
        ))}
    </div>
);

const AcademyLoginForm = ({ setIsLoading, setError, onLoginFailed, onLogin }: { setIsLoading: (l:boolean)=>void, setError: (e:string)=>void, onLoginFailed: () => void, onLogin: (user: CurrentUser) => void }) => {
    const [email, setEmail] = React.useState('');
    const [showForgot, setShowForgot] = React.useState(false);

    React.useEffect(() => {
        const prefilledEmail = sessionStorage.getItem('registration_email');
        if (prefilledEmail) {
            setEmail(prefilledEmail);
        }
    }, []);
    
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        sessionStorage.setItem('registration_email', newEmail);
    };

    const handleGoogleLogin = async () => {
        setError('');
        setIsLoading(true);
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
            await auth.signInWithPopup(provider);
            // The onAuthStateChanged listener in App.tsx will handle the result.
        } catch (error: any) {
            console.error("Google Login Popup Error:", error);
            setError(error.message || 'Failed to sign in with Google.');
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const form = e.target as HTMLFormElement;
        const passwordInput = form.elements.namedItem('password') as HTMLInputElement;
        const rawEmail = email;
        const rawPassword = passwordInput.value;

        if (rawEmail === 'demo@classcaptain.com' && rawPassword === 'demo123') {
            const demoAcademy: Academy = {
                id: 'demo-academy-id', academyId: 'DEMO', name: 'Demo Academy',
                adminUid: 'demo-admin-uid', adminEmail: 'demo@classcaptain.com', status: 'active',
            };
            onLogin({ role: 'admin', data: demoAcademy });
            setIsLoading(false);
            return;
        }

        try {
            // Just sign in. The onAuthStateChanged listener in App.tsx handles success cases.
            await auth.signInWithEmailAndPassword(rawEmail, rawPassword);
            // On success, the listener will take over and this component will unmount.
        } catch (err: any) {
             if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                const methods = await auth.fetchSignInMethodsForEmail(rawEmail).catch(() => []);
                if (methods.length === 0) {
                    onLoginFailed();
                } else {
                    setError('Incorrect password. Please try again.');
                }
            } else {
                console.error("Login Error:", err);
                setError(err.message || 'An error occurred during login.');
            }
            setIsLoading(false); // Only set loading to false on error.
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <FormInput
                    icon={<EmailIcon className="w-5 h-5" />}
                    label="Email Address"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={handleEmailChange}
                />
                <FormInput icon={<LockIcon className="w-5 h-5" />} label="Password" type="password" name="password" placeholder="Enter your password" required />
                
                <div className="flex justify-end -mt-3 mb-4">
                    <button 
                        type="button" 
                        onClick={() => setShowForgot(true)}
                        className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                    >
                        Forgot Password?
                    </button>
                </div>

                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
                    Sign in
                </button>
                <DemoCredentials credentials={{ Email: 'demo@classcaptain.com', Password: 'demo123' }} />
            </form>

            <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">OR</span>
                </div>
            </div>

            <button type="button" onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm">
                <GoogleIcon className="w-5 h-5" />
                Sign in with Google
            </button>
            
            {showForgot && <ForgotPasswordModal onClose={() => setShowForgot(false)} initialEmail={email} />}
        </>
    );
};

// Extracted shared login logic for Student and Staff
const handleNonAdminLogin = async (
    e: React.FormEvent,
    role: 'student' | 'staff',
    { setIsLoading, setError, onLogin, setShowConfigError }: any
) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const form = e.target as HTMLFormElement;
    const academyId = (form.elements.namedItem('academyId') as HTMLInputElement).value.trim().toUpperCase();
    const userId = (form.elements.namedItem(role === 'student' ? 'rollNumber' : 'staffId') as HTMLInputElement).value.trim().toUpperCase();
    const dob = (form.elements.namedItem('dob') as HTMLInputElement).value;

    const collectionName = role === 'student' ? 'students' : 'staff';
    const idFieldName = role === 'student' ? 'rollNumber' : 'staffId';
    const demoData = role === 'student' ? demoStudents : demoStaff;

    if (academyId === 'DEMO') {
        const demoUser = (demoData as any[]).find(u => u[idFieldName] === userId && u.dob === dob);
        if (demoUser) {
            onLogin({ role, data: demoUser, academyId, academyName: 'Demo Academy' });
        } else {
            setError("Invalid demo credentials.");
        }
        setIsLoading(false);
        return;
    }

    let hadConfigError = false;
    let loginSucceeded = false;
    try {
        if (!auth.currentUser || !auth.currentUser.isAnonymous) {
            await auth.signInAnonymously();
        }

        const academyQuery = query(collection(db, 'academies'), where('academyId', '==', academyId));
        const academySnapshot = await getDocs(academyQuery);

        if (academySnapshot.empty) {
            setError(`Academy with ID ${academyId} not found.`);
        } else {
            const academyDoc = academySnapshot.docs[0];
            const firestoreAcademyId = academyDoc.id;
            const academyName = academyDoc.data().name;

            const userQuery = query(collection(db, `academies/${firestoreAcademyId}/${collectionName}`), where(idFieldName, '==', userId));
            const userSnapshot = await getDocs(userQuery);
    
            if (userSnapshot.empty) {
                setError(`${role.charAt(0).toUpperCase() + role.slice(1)} not found with that ID.`);
            } else {
                const userDoc = userSnapshot.docs[0];
                const userData = { id: userDoc.id, ...userDoc.data() } as Student | Staff;
        
                if (userData.dob === dob) {
                    loginSucceeded = true;
                    onLogin({ role, data: userData, academyId: firestoreAcademyId, academyName: academyName });
                } else {
                    setError('Incorrect Date of Birth.');
                }
            }
        }
    } catch (error: any) {
        console.error(error);
        if (error.code === 'auth/operation-not-allowed' || error.code === 'auth/admin-restricted-operation' || error.code === 'permission-denied' || error.code === 'missing-permission') {
            setShowConfigError(true);
            hadConfigError = true;
        } else {
            setError('An error occurred during login. Please try again.');
        }
    } finally {
        if (!hadConfigError && !loginSucceeded) {
             setIsLoading(false);
        }
    }
};


const StudentLoginForm = (props: any) => {
    const handleSubmit = (e: React.FormEvent) => handleNonAdminLogin(e, 'student', props);

    return (
        <form onSubmit={handleSubmit}>
            <FormInput icon={<BuildingIcon className="w-5 h-5" />} label="Academy ID" type="text" name="academyId" placeholder="e.g. SUNSHINE" required autoCapitalize="characters" />
            <FormInput icon={<UserIcon className="w-5 h-5" />} label="Roll Number" type="text" name="rollNumber" placeholder="e.g. S001" required autoCapitalize="characters" />
            <FormInput icon={<CalendarIcon className="w-5 h-5" />} label="Date of Birth" type="date" name="dob" required />
            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md mt-4">
                Sign in
            </button>
            <DemoCredentials credentials={{ "Academy ID": "DEMO", "Roll Number": "S001", "Date of Birth": "2006-05-15" }} />
        </form>
    );
};

const StaffLoginForm = (props: any) => {
    const handleSubmit = (e: React.FormEvent) => handleNonAdminLogin(e, 'staff', props);

    return (
        <form onSubmit={handleSubmit}>
            <FormInput icon={<BuildingIcon className="w-5 h-5" />} label="Academy ID" type="text" name="academyId" placeholder="e.g. SUNSHINE" required autoCapitalize="characters" />
            <FormInput icon={<BookIcon className="w-5 h-5" />} label="Staff ID" type="text" name="staffId" placeholder="e.g. ALAN" required autoCapitalize="characters" />
            <FormInput icon={<CalendarIcon className="w-5 h-5" />} label="Date of Birth" type="date" name="dob" required />
            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md mt-4">
                Sign in
            </button>
            <DemoCredentials credentials={{ "Academy ID": "DEMO", "Staff ID": "T01", "Date of Birth": "1970-03-15" }} />
        </form>
    );
};

export function LoginPage({ onLogin, onNavigateToRegister, externalError, clearExternalError, initialRole, onGoBack }: LoginPageProps): React.ReactNode {
    const [role, setRole] = React.useState<Role>(initialRole);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [showAcademyNotFound, setShowAcademyNotFound] = React.useState(false);
    const [showConfigError, setShowConfigError] = React.useState(false);
    
    React.useEffect(() => {
        setRole(initialRole);
    }, [initialRole]);

    React.useEffect(() => {
        if (externalError) {
            setError(externalError);
        }
    }, [externalError]);
    
    const handleSetError = (msg: string) => {
        clearExternalError();
        setError(msg);
    };

    const handleRoleChange = (newRole: Role) => {
        setRole(newRole);
        setError('');
        clearExternalError();
    };
    
    const nonAdminLoginProps = { setIsLoading, setError: handleSetError, onLogin, setShowConfigError };

    return (
        <>
        {showConfigError && <AuthErrorModal onClose={() => { setShowConfigError(false); setIsLoading(false); }} />}

        <AuthLayout title="Welcome Back!" subtitle="Please sign in to continue" onBack={onGoBack}>
            <AuthCard>
                <RoleSwitcher activeRole={role} onRoleChange={handleRoleChange} />
                
                {role === 'academy' && <AcademyLoginForm setIsLoading={setIsLoading} setError={handleSetError} onLoginFailed={() => setShowAcademyNotFound(true)} onLogin={onLogin} />}
                {role === 'student' && <StudentLoginForm {...nonAdminLoginProps} />}
                {role === 'staff' && <StaffLoginForm {...nonAdminLoginProps} />}

                {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
                
                {isLoading && (
                    <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 flex justify-center items-center rounded-2xl">
                        <LoadingSpinner />
                    </div>
                )}
            </AuthCard>

            <div className="text-center mt-6 space-y-2">
                {role === 'academy' && (
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Don't have an account?{' '}
                        <button onClick={onNavigateToRegister} className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                            Register here
                        </button>
                    </p>
                )}
            </div>
            
            {showAcademyNotFound && (
                <AcademyLoginFailedPopup 
                    onCancel={() => setShowAcademyNotFound(false)}
                    onRegister={() => {
                        setShowAcademyNotFound(false);
                        onNavigateToRegister();
                    }}
                />
            )}
        </AuthLayout>
        </>
    );
}
