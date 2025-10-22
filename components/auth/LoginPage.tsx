
import React from 'react';
import { LogoIcon } from '../icons/LogoIcon';
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
import { XMarkIcon } from '../icons/XMarkIcon';


type Role = 'academy' | 'student' | 'staff';

interface LoginPageProps {
    onLogin: (user: CurrentUser) => void;
    onNavigateToRegister: () => void;
    externalError: string | null;
    clearExternalError: () => void;
}

const AuthLayout: React.FC<{ title: string, subtitle: string, children: React.ReactNode }> = ({ title, subtitle, children }) => (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8 bg-gradient-to-br from-purple-50 to-slate-100 dark:from-indigo-900 dark:to-gray-900">
        <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-3 mb-4">
                <LogoIcon className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
                <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">Class Captain</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{title}</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
        </div>
        <div className="w-full max-w-sm">
            {children}
        </div>
    </div>
);

const AuthCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg">
        {children}
    </div>
);

const FormInput = ({ icon, label, ...props }: { icon: React.ReactNode, label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="mb-4">
        <label htmlFor={props.id || props.name} className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">{label}</label>
        <div className="relative">
            <label htmlFor={props.id || props.name} className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 cursor-pointer">
                {icon}
            </label>
            <input
                id={props.id || props.name}
                className="w-full bg-white dark:bg-gray-700 text-black dark:text-white pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
                {...props}
            />
        </div>
    </div>
);

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

const SuperAdminLoginModal = ({ onLogin, onClose }: { onLogin: (user: CurrentUser) => void, onClose: () => void }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (email === 'admin@classcaptain.com' && password === 'superadmin123') {
            onLogin({
                role: 'superadmin',
                data: { uid: 'super-admin-static-uid', email: 'admin@classcaptain.com' }
            });
            onClose();
        } else {
            setError('Invalid super admin credentials.');
        }
    };

    return (
         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-sm relative">
                 <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Close modal">
                    <XMarkIcon className="w-6 h-6 text-gray-500 dark:text-gray-300" />
                </button>
                <h2 className="text-xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">Super Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <FormInput icon={<EmailIcon className="w-5 h-5" />} label="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    <FormInput icon={<LockIcon className="w-5 h-5" />} label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
                    <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md mt-4">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

const AcademyLoginForm = ({ setIsLoading, setError, onLoginFailed, onLogin }: { setIsLoading: (l:boolean)=>void, setError: (e:string)=>void, onLoginFailed: () => void, onLogin: (user: CurrentUser) => void }) => {
    
    const handleGoogleLogin = async () => {
        setError('');
        setIsLoading(true);
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
            await auth.signInWithRedirect(provider);
            // The page will redirect. App.tsx's onAuthStateChanged will handle the result.
        } catch (error: any) {
            console.error("Google Login Redirect Error:", error);
            setError(error.message || 'Failed to start sign in with Google.');
            setIsLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={async (e) => {
                e.preventDefault();
                setError('');
                setIsLoading(true);

                const form = e.target as HTMLFormElement;
                const emailInput = form.elements.namedItem('email') as HTMLInputElement;
                const passwordInput = form.elements.namedItem('password') as HTMLInputElement;
                const rawEmail = emailInput.value;
                const rawPassword = passwordInput.value;

                if (rawEmail === 'demo@classcaptain.com' && rawPassword === 'demo123') {
                    const demoAcademy: Academy = {
                        id: 'demo-academy-id',
                        academyId: 'ACDEMO',
                        name: 'Demo Academy',
                        adminUid: 'demo-admin-uid',
                        adminEmail: 'demo@classcaptain.com',
                        status: 'active',
                    };
                    onLogin({ role: 'admin', data: demoAcademy });
                    setIsLoading(false);
                    return;
                }

                try {
                    await auth.signInWithEmailAndPassword(rawEmail, rawPassword);
                    // onAuthStateChanged in App.tsx will handle the rest
                } catch (err: any) {
                    if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                        // Check if an academy with this email exists in Firestore to give a more specific error.
                        try {
                            const q = query(collection(db, 'academies'), where('adminEmail', '==', rawEmail));
                            const querySnapshot = await getDocs(q);
                            
                            if (querySnapshot.empty) {
                                // No academy found for this email, so it's a "user not found" case.
                                onLoginFailed(); 
                            } else {
                                // Academy exists, so it must be a "wrong password" case.
                                setError('Incorrect password. Please try again.');
                            }
                        } catch (firestoreError) {
                            // If the Firestore query fails, fallback to a generic message.
                            console.error("Firestore check failed during login:", firestoreError);
                            setError("Invalid email or password. Please try again.");
                        }
                    } else {
                        console.error("Login Error:", err);
                        setError(err.message || 'Failed to login.');
                    }
                } finally {
                    setIsLoading(false);
                }
            }}>
                <FormInput icon={<EmailIcon className="w-5 h-5" />} label="Email Address" type="email" name="email" placeholder="Enter your email" required />
                <FormInput icon={<LockIcon className="w-5 h-5" />} label="Password" type="password" name="password" placeholder="Enter your password" required />
                
                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md mt-4">
                    Sign in
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

            <button type="button" onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm">
                <GoogleIcon className="w-5 h-5" />
                Sign in with Google
            </button>
        </>
    );
};

const StudentLoginForm = ({ setIsLoading, setError, onLogin }: { setIsLoading: (l:boolean)=>void, setError: (e:string)=>void, onLogin: (user: CurrentUser) => void }) => {
    const handleStudentLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        const form = e.target as HTMLFormElement;
        const academyId = (form.elements.namedItem('academyId') as HTMLInputElement).value.toUpperCase();
        const rollNumber = (form.elements.namedItem('rollNumber') as HTMLInputElement).value.toUpperCase();
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;

        if (academyId === 'ACDEMO') {
            const demoStudent = demoStudents.find(s => s.rollNumber === rollNumber && s.password === password);
            if (demoStudent) {
                onLogin({ role: 'student', data: demoStudent, academyId, academyName: 'Demo Academy' });
                setIsLoading(false);
                return;
            } else {
                setError("Invalid demo credentials.");
                setIsLoading(false);
                return;
            }
        }

        try {
            const q = query(
                collection(db, 'academies'),
                where('academyId', '==', academyId)
            );
            const academySnapshot = await getDocs(q);

            if (academySnapshot.empty) {
                setError(`Academy with ID ${academyId} not found.`);
                setIsLoading(false);
                return;
            }
            const academyDoc = academySnapshot.docs[0];
            const firestoreAcademyId = academyDoc.id;
            const academyName = academyDoc.data().name;

            const studentQuery = query(
                collection(db, `academies/${firestoreAcademyId}/students`),
                where('rollNumber', '==', rollNumber)
            );
            const studentSnapshot = await getDocs(studentQuery);

            if (studentSnapshot.empty) {
                setError('Student not found with that Roll Number.');
                setIsLoading(false);
                return;
            }

            const studentDoc = studentSnapshot.docs[0];
            const studentData = { id: studentDoc.id, ...studentDoc.data() } as Student;

            if (studentData.password === password) {
                onLogin({ role: 'student', data: studentData, academyId: firestoreAcademyId, academyName: academyName });
            } else {
                setError('Incorrect password.');
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred during login. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleStudentLogin}>
            <FormInput icon={<BuildingIcon className="w-5 h-5" />} label="Academy ID" type="text" name="academyId" placeholder="e.g. AC0001" required autoCapitalize="characters" />
            <FormInput icon={<UserIcon className="w-5 h-5" />} label="Roll Number" type="text" name="rollNumber" placeholder="e.g. S001" required autoCapitalize="characters" />
            <FormInput icon={<LockIcon className="w-5 h-5" />} label="Password" type="password" name="password" placeholder="Enter your password" required />
            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md mt-4">
                Sign in
            </button>
        </form>
    );
};

const StaffLoginForm = ({ setIsLoading, setError, onLogin }: { setIsLoading: (l:boolean)=>void, setError: (e:string)=>void, onLogin: (user: CurrentUser) => void }) => {
    const handleStaffLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        const form = e.target as HTMLFormElement;
        const academyId = (form.elements.namedItem('academyId') as HTMLInputElement).value.toUpperCase();
        const staffId = (form.elements.namedItem('staffId') as HTMLInputElement).value.toUpperCase();
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;

        if (academyId === 'ACDEMO') {
            const demoStaffMember = demoStaff.find(s => s.staffId === staffId && s.password === password);
            if (demoStaffMember) {
                onLogin({ role: 'staff', data: demoStaffMember, academyId });
                setIsLoading(false);
                return;
            } else {
                setError("Invalid demo credentials for staff.");
                setIsLoading(false);
                return;
            }
        }

        try {
            const q = query(
                collection(db, 'academies'),
                where('academyId', '==', academyId)
            );
            const academySnapshot = await getDocs(q);

            if (academySnapshot.empty) {
                setError(`Academy with ID ${academyId} not found.`);
                setIsLoading(false);
                return;
            }
            const academyDoc = academySnapshot.docs[0];
            const firestoreAcademyId = academyDoc.id;

            const staffQuery = query(
                collection(db, `academies/${firestoreAcademyId}/staff`),
                where('staffId', '==', staffId)
            );
            const staffSnapshot = await getDocs(staffQuery);

            if (staffSnapshot.empty) {
                setError('Staff member not found with that ID.');
                setIsLoading(false);
                return;
            }

            const staffDoc = staffSnapshot.docs[0];
            const staffData = { id: staffDoc.id, ...staffDoc.data() } as Staff;

            if (staffData.password === password) {
                onLogin({ role: 'staff', data: staffData, academyId: firestoreAcademyId });
            } else {
                setError('Incorrect password.');
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred during login. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleStaffLogin}>
            <FormInput icon={<BuildingIcon className="w-5 h-5" />} label="Academy ID" type="text" name="academyId" placeholder="e.g. AC0001" required autoCapitalize="characters" />
            <FormInput icon={<BookIcon className="w-5 h-5" />} label="Staff ID" type="text" name="staffId" placeholder="e.g. T01" required autoCapitalize="characters" />
            <FormInput icon={<LockIcon className="w-5 h-5" />} label="Password" type="password" name="password" placeholder="Enter your password" required />
            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md mt-4">
                Sign in
            </button>
        </form>
    );
};

export function LoginPage({ onLogin, onNavigateToRegister, externalError, clearExternalError }: LoginPageProps): React.ReactNode {
    const [role, setRole] = React.useState<Role>('academy');
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [showAcademyNotFound, setShowAcademyNotFound] = React.useState(false);
    const [isSuperAdminModalOpen, setIsSuperAdminModalOpen] = React.useState(false);

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

    return (
        <>
        <AuthLayout title="Welcome Back!" subtitle="Please sign in to continue">
            <AuthCard>
                <RoleSwitcher activeRole={role} onRoleChange={handleRoleChange} />
                
                {role === 'academy' && <AcademyLoginForm setIsLoading={setIsLoading} setError={handleSetError} onLoginFailed={() => setShowAcademyNotFound(true)} onLogin={onLogin} />}
                {role === 'student' && <StudentLoginForm setIsLoading={setIsLoading} setError={handleSetError} onLogin={onLogin} />}
                {role === 'staff' && <StaffLoginForm setIsLoading={setIsLoading} setError={handleSetError} onLogin={onLogin} />}

                {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
                
                {isLoading && (
                    <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 flex justify-center items-center rounded-2xl">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
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
                 <button onClick={() => setIsSuperAdminModalOpen(true)} className="text-xs text-gray-500 dark:text-gray-400 hover:underline">
                    Super Admin Login
                </button>
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

        {isSuperAdminModalOpen && (
            <SuperAdminLoginModal onLogin={onLogin} onClose={() => setIsSuperAdminModalOpen(false)} />
        )}
        </>
    );
}
