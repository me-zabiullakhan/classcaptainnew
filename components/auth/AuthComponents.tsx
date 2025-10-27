import React from 'react';
import { FullLogoIcon } from '../icons/LogoIcon';

export const AuthLayout: React.FC<{ title: string, subtitle: string, children: React.ReactNode }> = ({ title, subtitle, children }) => (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8 bg-gradient-to-br from-purple-50 to-slate-100 dark:from-indigo-900 dark:to-gray-900">
        <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
                <FullLogoIcon className="w-64" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{title}</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
        </div>
        <div className="w-full max-w-sm">
            {children}
        </div>
    </div>
);

export const AuthCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg">
        {children}
    </div>
);

export const FormInput = React.forwardRef<HTMLInputElement, { icon: React.ReactNode, label: string } & React.InputHTMLAttributes<HTMLInputElement>>(
    ({ icon, label, ...props }, ref) => (
    <div className="mb-4">
        <label htmlFor={props.id || props.name} className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">{label}</label>
        <div className="relative">
             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                {icon}
            </div>
            <input
                id={props.id || props.name}
                className="w-full bg-white dark:bg-gray-700 text-black dark:text-white pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
                {...props}
                ref={ref}
            />
        </div>
    </div>
));
FormInput.displayName = 'FormInput';


export const InfoNote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
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