import React from 'react';
import { AuthLayout } from './AuthComponents';

// Using text emojis for better platform consistency and to avoid external dependencies
const ADMIN_EMOJI = '👨‍🏫';
const TEACHER_EMOJI = '👩‍🏫';
const STUDENT_EMOJI = '👩‍🎓';

type Role = 'academy' | 'staff' | 'student';

const RoleCard: React.FC<{ emoji: string; label: string; onClick: () => void }> = ({ emoji, label, onClick }) => (
    <button onClick={onClick} className="w-full flex flex-col items-center gap-2 rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 focus:ring-indigo-500">
        <div className="bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-lg">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center w-24 h-24">
                 <span className="text-5xl">{emoji}</span>
            </div>
        </div>
        <span className="bg-indigo-600 text-white font-semibold px-8 py-1.5 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">{label}</span>
    </button>
);

export const RoleSelectionPage: React.FC<{ onSelectRole: (role: Role) => void; onBack: () => void; }> = ({ onSelectRole, onBack }) => {
    return (
        <AuthLayout title="Select an option" subtitle="Choose your role to continue" onBack={onBack}>
            <div className="space-y-4">
                <RoleCard emoji={ADMIN_EMOJI} label="Admin Login" onClick={() => onSelectRole('academy')} />
                <RoleCard emoji={TEACHER_EMOJI} label="Teacher Login" onClick={() => onSelectRole('staff')} />
                <RoleCard emoji={STUDENT_EMOJI} label="Student Login" onClick={() => onSelectRole('student')} />
            </div>
             <div className="text-center mt-4 text-xs text-gray-500 dark:text-gray-400">
                <p>By signing in you agree to our</p>
                <a href="#" className="underline hover:text-indigo-600 dark:hover:text-indigo-400">Privacy Policy</a>
            </div>
        </AuthLayout>
    );
};