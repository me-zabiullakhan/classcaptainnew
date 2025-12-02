import React, { useState } from 'react';
import type { CurrentUser } from '../types';
import { FullLogoIcon } from './icons/LogoIcon';
import { EmailIcon } from './icons/EmailIcon';
import { LockIcon } from './icons/LockIcon';

const AuthLayout: React.FC<{ title: string, subtitle: string, children: React.ReactNode }> = ({ title, subtitle, children }) => (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-4 bg-slate-50 text-gray-900">
        <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
                <FullLogoIcon className="w-64" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className="w-full max-w-sm">
            {children}
        </div>
    </div>
);

const AuthCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
        {children}
    </div>
);

const FormInput = React.forwardRef<HTMLInputElement, { icon: React.ReactNode, label: string } & React.InputHTMLAttributes<HTMLInputElement>>(
    ({ icon, label, ...props }, ref) => (
    <div className="mb-4">
        <label htmlFor={props.id || props.name} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <div className="relative">
             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                {icon}
            </div>
            <input
                id={props.id || props.name}
                className="w-full bg-white text-gray-900 pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                {...props}
                ref={ref}
            />
        </div>
    </div>
));
FormInput.displayName = 'FormInput';

interface LoginPageProps {
    onLogin: (user: CurrentUser) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Using static credentials for super admin as before
        if (email === 'admin@optilearn.com' && password === 'superadmin123') {
            onLogin({
                role: 'superadmin',
                data: { uid: 'super-admin-static-uid', email: 'admin@optilearn.com' }
            });
        } else {
            setError('Invalid super admin credentials.');
        }
    };

    return (
        <AuthLayout title="Super Admin Portal" subtitle="Platform Management">
            <AuthCard>
                <form onSubmit={handleSubmit}>
                    <FormInput icon={<EmailIcon className="w-5 h-5" />} label="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    <FormInput icon={<LockIcon className="w-5 h-5" />} label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    {error && <p className="text-red-500 text-sm text-center mt-2 font-medium">{error}</p>}
                    <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md mt-4">
                        Login
                    </button>
                </form>
            </AuthCard>
        </AuthLayout>
    );
}