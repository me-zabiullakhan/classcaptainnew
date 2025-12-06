
import React, { useState } from 'react';
import { AuthLayout } from './AuthComponents';
import { LegalModal } from '../LegalPage';

// Using text emojis for better platform consistency and to avoid external dependencies
const ADMIN_EMOJI = '👨‍🏫';
const TEACHER_EMOJI = '👩‍🏫';
const STUDENT_EMOJI = '👩‍🎓';
const SUPERADMIN_EMOJI = '🚀';

type Role = 'academy' | 'staff' | 'student' | 'superadmin';

interface RoleCardProps {
    role: Role;
    title: string;
    description: string;
    emoji: string;
    color: string;
    onClick: (role: Role) => void;
    delay: string;
}

const RoleCard: React.FC<RoleCardProps> = ({ role, title, description, emoji, color, onClick, delay }) => (
    <button
        onClick={() => onClick(role)}
        className="group relative w-full overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-5 text-left shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 animate-fade-in-up border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900"
        style={{ animationDelay: delay, animationFillMode: 'both' }}
    >
        {/* Decorative background blob */}
        <div className={`absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full ${color} opacity-10 transition-all duration-500 group-hover:scale-150 group-hover:opacity-20`}></div>
        
        <div className="relative z-10 flex items-center justify-between gap-4">
            <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                    {description}
                </p>
            </div>
            <div className={`flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl ${color} bg-opacity-10 text-3xl shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 backdrop-blur-sm`}>
                {emoji}
            </div>
        </div>
        
        {/* Animated arrow hint */}
        <div className="mt-3 flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            Continue as {title} <span className="ml-1 text-lg leading-none">→</span>
        </div>
    </button>
);

export const RoleSelectionPage: React.FC<{ onSelectRole: (role: any) => void; onBack: () => void; }> = ({ onSelectRole, onBack }) => {
    const [showLegal, setShowLegal] = useState(false);
    
    const handleRoleClick = (role: Role) => {
        if (role === 'superadmin') {
            // Explicitly pointing to index.html ensures the browser treats this as a navigation to a separate page/entry point
            // rather than a path handled by the current single-page app router.
            window.location.assign('/superadmin/index.html');
        } else {
            onSelectRole(role);
        }
    };

    return (
        <>
            <AuthLayout title="Welcome Back" subtitle="Who is logging in today?" onBack={onBack}>
                <div className="space-y-4 mt-2 perspective-1000">
                    <RoleCard 
                        role="academy"
                        title="Academy Admin"
                        description="Manage institute, students, staff & finances."
                        emoji={ADMIN_EMOJI}
                        color="bg-blue-500"
                        onClick={handleRoleClick}
                        delay="0ms"
                    />
                    <RoleCard 
                        role="staff"
                        title="Teacher / Staff"
                        description="Mark attendance, manage classes & results."
                        emoji={TEACHER_EMOJI}
                        color="bg-purple-500"
                        onClick={handleRoleClick}
                        delay="100ms"
                    />
                    <RoleCard 
                        role="student"
                        title="Student"
                        description="View timetable, results, attendance & pay fees."
                        emoji={STUDENT_EMOJI}
                        color="bg-emerald-500"
                        onClick={handleRoleClick}
                        delay="200ms"
                    />
                    <RoleCard 
                        role="superadmin"
                        title="Super Admin"
                        description="Platform owner control panel."
                        emoji={SUPERADMIN_EMOJI}
                        color="bg-red-500"
                        onClick={handleRoleClick}
                        delay="300ms"
                    />
                </div>
                 <div className="text-center mt-8 text-xs text-gray-400 dark:text-gray-500">
                    <p>By signing in you agree to our <button onClick={() => setShowLegal(true)} className="underline hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors bg-transparent border-0 p-0">Privacy Policy</button></p>
                </div>
            </AuthLayout>
            {showLegal && <LegalModal onClose={() => setShowLegal(false)} />}
        </>
    );
};
