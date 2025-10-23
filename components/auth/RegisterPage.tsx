







import React from 'react';
import { LogoIcon } from '../icons/LogoIcon';
import { BuildingIcon } from '../icons/BuildingIcon';
import { EmailIcon } from '../icons/EmailIcon';
import { LockIcon } from '../icons/LockIcon';
import { auth } from '../../firebaseConfig';
import { GoogleIcon } from '../icons/GoogleIcon';
import firebase from 'firebase/compat/app';


interface RegisterPageProps {
    onNavigateToLogin: () => void;
}

// FIX: Property 'children' does not exist on type '{ title: string; subtitle: string; }'.
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

// FIX: Property 'children' does not exist on type '{}'.
const AuthCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg">
        {children}
    </div>
);

// FIX: Update FormInput to forward refs, resolving an error when passing a ref to it.
const FormInput = React.forwardRef<HTMLInputElement, { icon: React.ReactNode, label: string } & React.InputHTMLAttributes<HTMLInputElement>>(
    ({ icon, label, ...props }, ref) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">{label}</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                {icon}
            </div>
            <input 
                className="w-full bg-white dark:bg-gray-700 text-black dark:text-white pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
                {...props}
                ref={ref}
            />
        </div>
    </div>
));
FormInput.displayName = 'FormInput';


// FIX: Property 'children' does not exist on type '{}'.
const InfoNote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-indigo-50 dark:bg-indigo-900/40 border-l-4 border-indigo-300 dark:border-indigo-600 p-4 rounded-r-lg mt-6">
        <div className="flex">
            <div className="flex-shrink-0">
                <span className="text-lg">📝</span>
            </div>
            <div className="ml-3">
                <h3 className="text-sm font-bold text-indigo-800 dark:text-indigo-300">Note:</h3>
                <p className="text-sm text-indigo-700 dark:text-indigo-200 mt-1">{children}</p>
            </div>
        </div>
    </div>
);

export function RegisterPage({ onNavigateToLogin }: RegisterPageProps) {
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const instituteNameRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        const prefilledEmail = sessionStorage.getItem('registration_email');
        if (prefilledEmail) {
            setEmail(prefilledEmail);
        }
    }, []);

    const handleGoogleRegister = async () => {
        setError('');
        const instituteName = instituteNameRef.current?.value;
        if (!instituteName || instituteName.trim() === '') {
            setError("Please enter your institute's name before signing up.");
            return;
        }

        setIsLoading(true);
        try {
            sessionStorage.setItem('google_reg_flow', 'true');
            sessionStorage.setItem('google_reg_institute_name', instituteName);
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
        setIsLoading(true);

        const form = e.target as HTMLFormElement;
        const instituteName = (form.elements.namedItem('instituteName') as HTMLInputElement).value;
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;
        const confirmPassword = (form.elements.namedItem('confirmPassword') as HTMLInputElement).value;

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        try {
            // Store institute name for the onAuthStateChanged listener to pick up
            sessionStorage.setItem('registration_institute_name', instituteName);
            
            // Attempt to create the user.
            await auth.createUserWithEmailAndPassword(email, password);
            
            // If successful, the onAuthStateChanged listener in App.tsx will take over.
            // It will see the new user, find no academy document, and then create one
            // using the instituteName from sessionStorage.
            
        } catch (err: any) {
            // Handle specific errors from createUserWithEmailAndPassword
            if (err.code === 'auth/email-already-in-use') {
                setError("This email address is already registered. Please try logging in.");
            } else {
                console.error("Registration Error:", err);
                setError(err.message || "An unexpected error occurred during registration.");
            }
            
            // Clean up sessionStorage if any part of the registration fails
            sessionStorage.removeItem('registration_institute_name');
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout title="Create Your Account" subtitle="Register your coaching institute with Class Captain">
            <AuthCard>
                <form onSubmit={handleRegister} className="space-y-4">
                    <FormInput icon={<BuildingIcon className="w-5 h-5" />} label="Institute Name" type="text" name="instituteName" placeholder="Enter institute name" required ref={instituteNameRef} />
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

                    <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md disabled:bg-indigo-300">
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

                <button type="button" onClick={handleGoogleRegister} disabled={isLoading} className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm disabled:opacity-50">
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
                    After registration, you'll receive a unique Academy ID that students and teachers will use to join your institute. Students and teachers cannot register directly - they must be added by the academy admin.
                </InfoNote>
            </AuthCard>
        </AuthLayout>
    );
}