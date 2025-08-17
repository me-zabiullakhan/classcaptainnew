
import React from 'react';
import { LogoIcon } from '../icons/LogoIcon';
import { BuildingIcon } from '../icons/BuildingIcon';
import { EmailIcon } from '../icons/EmailIcon';
import { LockIcon } from '../icons/LockIcon';
import { UserIcon } from '../icons/UserIcon';
import { CalendarIcon } from '../icons/CalendarIcon';
import { BookIcon } from '../icons/BookIcon';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import type { CurrentUser, Student, Teacher, Academy } from '../../types';
import { demoStudents } from '../../demoData';

type Role = 'academy' | 'student' | 'teacher';

interface LoginPageProps {
    onLogin: (user: CurrentUser) => void;
    onSuperAdminLogin: () => void;
    onNavigateToRegister: () => void;
    externalError: string | null;
    clearExternalError: () => void;
}

const AuthLayout = ({ title, subtitle, children }: { title: string, subtitle: string, children: React.ReactNode }) => (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8" style={{background: 'linear-gradient(160deg, #f3e8ff 0%, #f4f5f7 100%)'}}>
        <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-3 mb-4">
                <LogoIcon className="w-12 h-12 text-indigo-600" />
                <span className="text-3xl font-bold text-gray-800">Class Captain</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            <p className="text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className="w-full max-w-sm">
            {children}
        </div>
    </div>
);

const AuthCard = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
        {children}
    </div>
);

const FormInput = ({ icon, label, ...props }: { icon: React.ReactNode, label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="mb-4">
        <label htmlFor={props.id || props.name} className="block text-sm font-medium text-gray-600 mb-2">{label}</label>
        <div className="relative">
            <label htmlFor={props.id || props.name} className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 cursor-pointer">
                {icon}
            </label>
            <input
                id={props.id || props.name}
                className="w-full bg-white text-black pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
                {...props}
            />
        </div>
    </div>
);


const RoleSwitcher = ({ activeRole, onRoleChange }: { activeRole: Role, onRoleChange: (role: Role) => void }) => {
    const roles: { id: Role; name: string; icon: React.ReactNode }[] = [
        { id: 'academy', name: 'Academy', icon: <BuildingIcon className="w-5 h-5" /> },
        { id: 'student', name: 'Student', icon: <UserIcon className="w-5 h-5" /> },
        { id: 'teacher', name: 'Teacher', icon: <BookIcon className="w-5 h-5" /> },
    ];

    return (
        <div className="bg-gray-100 p-1 rounded-lg flex justify-between gap-1 mb-6">
            {roles.map(({ id, name, icon }) => (
                <button
                    key={id}
                    onClick={() => onRoleChange(id)}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-semibold transition-colors ${
                        activeRole === id ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:bg-gray-200'
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

const sha256 = async (message: string) => {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
};

const SUPER_ADMIN_EMAIL_HASH = 'f19f1aa2185579916327663473177891823126b484777490f2b3433a0b35b5df';
const SUPER_ADMIN_PASS_HASH = 'd0a708a28f5223c345b85a3fd8667b93a8cf88b90c000302256799d5357eb433';

const AcademyLoginForm = ({ setIsLoading, setError, onLoginFailed, onSuperAdminLogin, onLogin }: { setIsLoading: (l:boolean)=>void, setError: (e:string)=>void, onLoginFailed: () => void, onSuperAdminLogin: () => void, onLogin: (user: CurrentUser) => void }) => (
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
            // Super admin check: trim inputs and lowercase email for robust matching.
            const emailForCheck = rawEmail.trim().toLowerCase();
            const passwordForCheck = rawPassword.trim(); // Only trim, preserve case for password.

            const emailHash = await sha256(emailForCheck);
            const passwordHash = await sha256(passwordForCheck);
            
            if (emailHash === SUPER_ADMIN_EMAIL_HASH && passwordHash === SUPER_ADMIN_PASS_HASH) {
                onSuperAdminLogin();
                return; // Exit after successful super admin login
            }
            
            // If not super admin, proceed with Firebase auth using raw, untrimmed values.
            await auth.signInWithEmailAndPassword(rawEmail, rawPassword);
            // onAuthStateChanged in App.tsx will handle the rest
        } catch (err: any) {
            if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                // This error is from Firebase Auth, so the super admin check also failed.
                onLoginFailed();
            } else if (err instanceof TypeError) {
                // This can happen if crypto.subtle is not available (e.g., on http).
                console.error("Crypto API error during login:", err);
                setError("A security error occurred. Please use a secure connection (HTTPS).");
            } else {
                // General error for Firebase or other issues.
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
            Sign In
        </button>
    </form>
);

const StudentLoginForm = ({ onLogin, onAcademyNotFound }: { onLogin: (u: CurrentUser) => void, onAcademyNotFound: ()=>void }) => {
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleStudentLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const form = e.target as HTMLFormElement;
        const academyId = (form.elements.namedItem('academyId') as HTMLInputElement).value.trim().toUpperCase();
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;
        const dob = (form.elements.namedItem('dob') as HTMLInputElement).value;

        if (!academyId || !password || !dob) {
            setError("All fields are required.");
            setIsLoading(false);
            return;
        }

        if (academyId === 'ACDEMO') {
            const demoStudent = demoStudents.find(s => s.password === password && s.dob === dob);
            if (demoStudent) {
                onLogin({ role: 'student', data: demoStudent, academyId: 'ACDEMO', academyName: 'SM TUTORIALS' });
            } else {
                setError("Invalid demo credentials. Please check your Password and Date of Birth.");
            }
            setIsLoading(false);
            return;
        }

        try {
            const academyDocRef = doc(db, 'academies', academyId);
            const academyDoc = await getDoc(academyDocRef);
            if (!academyDoc.exists() || academyDoc.data().status === 'paused') {
                onAcademyNotFound();
                setIsLoading(false);
                return;
            }
            const academyData = academyDoc.data() as Academy;

            const studentsRef = collection(db, `academies/${academyId}/students`);
            const q = query(studentsRef, where("password", "==", password), where("dob", "==", dob));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                setError("Invalid credentials. Please check your Password and Date of Birth.");
            } else {
                const studentDoc = querySnapshot.docs[0];
                const studentData = { id: studentDoc.id, ...studentDoc.data() } as Student;
                onLogin({ role: 'student', data: studentData, academyId, academyName: academyData.name });
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <form onSubmit={handleStudentLogin}>
            <FormInput icon={<BuildingIcon className="w-5 h-5" />} label="Academy ID" type="text" name="academyId" placeholder="Enter your academy ID" required />
            <FormInput icon={<LockIcon className="w-5 h-5" />} label="Password" type="password" name="password" placeholder="Enter your password" required />
            <FormInput icon={<CalendarIcon className="w-5 h-5" />} label="Date of Birth" type="date" name="dob" placeholder="dd/mm/yyyy" required />
            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
            <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md mt-4 disabled:bg-indigo-300">
                {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
        </form>
    );
};


const TeacherLoginForm = ({ onLogin, onAcademyNotFound }: { onLogin: (u: CurrentUser) => void, onAcademyNotFound: ()=>void }) => {
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleTeacherLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const form = e.target as HTMLFormElement;
        const academyId = (form.elements.namedItem('academyId') as HTMLInputElement).value.trim();
        const teacherId = (form.elements.namedItem('teacherId') as HTMLInputElement).value.trim();
        const dob = (form.elements.namedItem('dob') as HTMLInputElement).value;
        
        if (!academyId || !teacherId || !dob) {
            setError("All fields are required.");
            setIsLoading(false);
            return;
        }

        try {
            const academyDocRef = doc(db, 'academies', academyId);
            const academyDoc = await getDoc(academyDocRef);
            if (!academyDoc.exists() || academyDoc.data().status === 'paused') {
                onAcademyNotFound();
                setIsLoading(false);
                return;
            }

            const teachersRef = collection(db, `academies/${academyId}/teachers`);
            const q = query(teachersRef, where("teacherId", "==", teacherId), where("dob", "==", dob));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                setError("Invalid credentials. Please check your Teacher ID and Date of Birth.");
            } else {
                const teacherDoc = querySnapshot.docs[0];
                const teacherData = { id: teacherDoc.id, ...teacherDoc.data() } as Teacher;
                onLogin({ role: 'teacher', data: teacherData, academyId });
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <form onSubmit={handleTeacherLogin}>
            <FormInput icon={<BuildingIcon className="w-5 h-5" />} label="Academy ID" type="text" name="academyId" placeholder="Enter your academy ID" required />
            <FormInput icon={<UserIcon className="w-5 h-5" />} label="Teacher ID" type="text" name="teacherId" placeholder="Enter your teacher ID" required />
            <FormInput icon={<CalendarIcon className="w-5 h-5" />} label="Date of Birth" type="date" name="dob" placeholder="dd/mm/yyyy" required />
            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
            <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md mt-4 disabled:bg-indigo-300">
                {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
        </form>
    );
};

const AcademyNotFoundPopup = ({ onCancel, onRegister }: { onCancel: () => void, onRegister: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm mx-4 text-center">
            <h3 className="text-lg font-bold text-gray-800">Academy Not Found</h3>
            <p className="text-gray-600 mt-2 mb-6">The Academy ID you entered is not registered or has been suspended. Please check the ID or register the academy.</p>
            <div className="flex flex-col gap-3">
                <button onClick={onRegister} className="w-full bg-indigo-600 text-white font-bold py-2.5 rounded-lg hover:bg-indigo-700 transition-colors">
                    Register Now
                </button>
                <button onClick={onCancel} className="w-full bg-gray-200 text-gray-800 font-bold py-2.5 rounded-lg hover:bg-gray-300 transition-colors">
                    Cancel
                </button>
            </div>
        </div>
    </div>
);


export function LoginPage({ onLogin, onSuperAdminLogin, onNavigateToRegister, externalError, clearExternalError }: LoginPageProps) {
    const [activeRole, setActiveRole] = React.useState<Role>('academy');
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [showNotFoundPopup, setShowNotFoundPopup] = React.useState(false);
    const [showAcademyLoginFailedPopup, setShowAcademyLoginFailedPopup] = React.useState(false);

    React.useEffect(() => {
        if (externalError) {
            setError(externalError);
        }
    }, [externalError]);

    const handleRoleChange = (role: Role) => {
        setActiveRole(role);
        setError('');
        if (externalError) {
            clearExternalError();
        }
    };

    const renderForm = () => {
        switch (activeRole) {
            case 'academy':
                return (
                    <>
                        <AcademyLoginForm
                            setIsLoading={setIsLoading}
                            setError={setError}
                            onLoginFailed={() => setShowAcademyLoginFailedPopup(true)}
                            onSuperAdminLogin={onSuperAdminLogin}
                            onLogin={onLogin}
                        />
                         <div className="text-center mt-6 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <p className="font-bold text-gray-700 mb-1">Demo Login</p>
                            <p>Email: <code className="font-mono bg-gray-200 text-gray-800 px-1.5 py-0.5 rounded">demo@classcaptain.com</code></p>
                            <p className="mt-1">Password: <code className="font-mono bg-gray-200 text-gray-800 px-1.5 py-0.5 rounded">demo123</code></p>
                        </div>
                    </>
                );
            case 'student':
                 return (
                    <>
                        <StudentLoginForm onLogin={onLogin} onAcademyNotFound={() => setShowNotFoundPopup(true)} />
                        <div className="text-center mt-6 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <p className="font-bold text-gray-700 mb-1">Demo Student Login</p>
                            <p>Academy ID: <code className="font-mono bg-gray-200 text-gray-800 px-1.5 py-0.5 rounded">ACDEMO</code></p>
                            <p className="mt-1">Password: <code className="font-mono bg-gray-200 text-gray-800 px-1.5 py-0.5 rounded">alice123</code></p>
                            <p className="mt-1">Date of Birth: <code className="font-mono bg-gray-200 text-gray-800 px-1.5 py-0.5 rounded">2006-05-15</code></p>
                        </div>
                    </>
                );
            case 'teacher':
                return <TeacherLoginForm onLogin={onLogin} onAcademyNotFound={() => setShowNotFoundPopup(true)} />;
            default:
                return null;
        }
    };
    
    return (
        <AuthLayout title="Welcome Back" subtitle="Sign in to your account to continue">
            {showNotFoundPopup && (
                <AcademyNotFoundPopup 
                    onCancel={() => setShowNotFoundPopup(false)}
                    onRegister={() => {
                        setShowNotFoundPopup(false);
                        onNavigateToRegister();
                    }}
                />
            )}
            {showAcademyLoginFailedPopup && (
                 <AcademyLoginFailedPopup 
                    onCancel={() => setShowAcademyLoginFailedPopup(false)}
                    onRegister={() => {
                        setShowAcademyLoginFailedPopup(false);
                        onNavigateToRegister();
                    }}
                />
            )}
            <AuthCard>
                <RoleSwitcher activeRole={activeRole} onRoleChange={handleRoleChange} />
                <div className="relative">
                    {isLoading && <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center rounded-b-2xl z-10"><p>Loading...</p></div>}
                    {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                    {renderForm()}
                </div>
            </AuthCard>
            
            <div className="text-center mt-6">
                 {activeRole === 'academy' && (
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:underline">
                        Forgot your password?
                    </a>
                )}
            </div>

            <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button onClick={onNavigateToRegister} className="font-medium text-indigo-600 hover:underline">
                        Register here
                    </button>
                </p>
            </div>
        </AuthLayout>
    );
}
