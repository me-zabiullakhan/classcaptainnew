
import React from 'react';
import { LogoIcon } from '../icons/LogoIcon';
import { BuildingIcon } from '../icons/BuildingIcon';
import { EmailIcon } from '../icons/EmailIcon';
import { LockIcon } from '../icons/LockIcon';
import { collection, doc, runTransaction } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';

interface RegisterPageProps {
    onRegisterSuccess: () => void;
    onNavigateToLogin: () => void;
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
        <label className="block text-sm font-medium text-gray-600 mb-2">{label}</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                {icon}
            </div>
            <input 
                className="w-full bg-white text-black pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
                {...props}
            />
        </div>
    </div>
);

const InfoNote = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-indigo-50 border-l-4 border-indigo-300 p-4 rounded-r-lg mt-6">
        <div className="flex">
            <div className="flex-shrink-0">
                <span className="text-lg">📝</span>
            </div>
            <div className="ml-3">
                <h3 className="text-sm font-bold text-indigo-800">Note:</h3>
                <p className="text-sm text-indigo-700 mt-1">{children}</p>
            </div>
        </div>
    </div>
);

export function RegisterPage({ onRegisterSuccess, onNavigateToLogin }: RegisterPageProps) {
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [newAcademyId, setNewAcademyId] = React.useState<string | null>(null);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const form = e.target as HTMLFormElement;
        const instituteName = (form.elements.namedItem('instituteName') as HTMLInputElement).value;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;
        const confirmPassword = (form.elements.namedItem('confirmPassword') as HTMLInputElement).value;

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            if (!user) {
                throw new Error("User creation failed.");
            }

            const generatedId = await runTransaction(db, async (transaction) => {
                const counterRef = doc(db, 'counters', 'academyCounter');
                const counterDoc = await transaction.get(counterRef);
                
                const lastId = counterDoc.exists() ? counterDoc.data().lastId : 0;
                const newIdNumber = lastId + 1;
                const formattedId = `AC${String(newIdNumber).padStart(4, '0')}`;
                
                const newAcademyRef = doc(collection(db, 'academies'));
                transaction.set(newAcademyRef, {
                    name: instituteName,
                    adminEmail: user.email,
                    adminUid: user.uid,
                    createdAt: new Date(),
                    status: 'active',
                    academyId: formattedId,
                });
                
                transaction.set(counterRef, { lastId: newIdNumber }, { merge: !counterDoc.exists() });

                return formattedId;
            });
            
            setNewAcademyId(generatedId);

        } catch (err: any) {
             if (err.code === 'auth/email-already-in-use') {
                setError("This email address is already registered. Please try logging in.");
            } else {
                setError(err.message || "Failed to create account.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (newAcademyId) {
        return (
            <AuthLayout title="Registration Successful!" subtitle="Your academy is now ready to go.">
                <AuthCard>
                    <div className="text-center">
                        <p className="text-gray-600 mb-4">Here is your unique Academy ID. Please save it carefully. Your students and teachers will need this ID to log in.</p>
                        <div className="bg-gray-100 p-4 rounded-lg my-4">
                            <p className="text-gray-500 text-sm">Academy ID</p>
                            <p className="text-indigo-600 font-bold text-xl tracking-widest">{newAcademyId}</p>
                        </div>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(newAcademyId);
                                alert('Academy ID copied to clipboard!');
                                onRegisterSuccess();
                            }}
                            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md mt-4"
                        >
                            Copy ID & Proceed to Login
                        </button>
                    </div>
                </AuthCard>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout title="Create Your Account" subtitle="Register your coaching institute with Class Captain">
            <AuthCard>
                <form onSubmit={handleRegister}>
                    <FormInput icon={<BuildingIcon className="w-5 h-5" />} label="Institute Name" type="text" name="instituteName" placeholder="Enter institute name" required />
                    <FormInput icon={<EmailIcon className="w-5 h-5" />} label="Email Address" type="email" name="email" placeholder="Enter your email" required />
                    <FormInput icon={<LockIcon className="w-5 h-5" />} label="Password" type="password" name="password" placeholder="Create a password" required />
                    <FormInput icon={<LockIcon className="w-5 h-5" />} label="Confirm Password" type="password" name="confirmPassword" placeholder="Confirm your password" required />
                    
                    {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                    <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md mt-4 disabled:bg-indigo-300">
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <button onClick={onNavigateToLogin} className="font-medium text-indigo-600 hover:underline">
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
