

import React from 'react';
import type { Student, Academy } from '../../types';
import { StudentHeader } from './StudentHeader';
import { StudentFeatureIcon } from './StudentFeatureIcon';
import { MyAcademyIcon } from '../icons/MyAcademyIcon';
import { AttendanceStudentIcon } from '../icons/AttendanceStudentIcon';
import { TuitionFeesStudentIcon } from '../icons/TuitionFeesStudentIcon';
import { ExamsIcon } from '../icons/ExamsIcon';
import { HomeworkStudentIcon } from '../icons/HomeworkStudentIcon';
import { OnlineExamIcon } from '../icons/OnlineExamIcon';
import { StudyMaterialStudentIcon } from '../icons/StudyMaterialStudentIcon';
import { TimetableIcon } from '../icons/TimetableIcon';
import { LeaveIcon } from '../icons/LeaveIcon';

interface StudentDashboardPageProps {
    student: Student;
    academy: Academy;
    onNavigate: (page: string) => void;
    onToggleNav: () => void;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
    onShowDevPopup: (featureName: string) => void;
}

const studentFeatures = [
    { name: 'My Academy', Icon: MyAcademyIcon, color: 'bg-cyan-500' },
    { name: 'Attendance', Icon: AttendanceStudentIcon, color: 'bg-purple-500' },
    { name: 'Timetable', Icon: TimetableIcon, color: 'bg-pink-500' },
    { name: 'Tuition Fees', Icon: TuitionFeesStudentIcon, color: 'bg-green-500' },
    { name: 'Exams', Icon: ExamsIcon, color: 'bg-lime-500' },
    { name: 'Study Material', Icon: StudyMaterialStudentIcon, color: 'bg-gray-700' },
    { name: 'Homework', Icon: HomeworkStudentIcon, color: 'bg-teal-500' },
    { name: 'Online Quiz', Icon: OnlineExamIcon, color: 'bg-red-500' },
    { name: 'My Leave', Icon: LeaveIcon, color: 'bg-blue-500' },
];

export function StudentDashboardPage({ student, academy, onNavigate, onToggleNav, theme, onToggleTheme, onShowDevPopup }: StudentDashboardPageProps): React.ReactNode {
    
    const photoUrl = student.photo || `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(student.name)}`;

    const getClickHandler = (name: string) => {
        switch (name) {
            case 'Tuition Fees':
                return () => onNavigate('fee-status');
            case 'My Academy':
                return () => onNavigate('my-academy');
            case 'Attendance':
                return () => onNavigate('attendance');
            case 'Timetable':
                return () => onNavigate('timetable');
            case 'Exams':
                return () => onNavigate('student-exams');
            case 'Study Material':
                return () => onNavigate('student-study-material');
            case 'Homework':
                return () => onNavigate('student-homework');
            case 'Online Quiz':
                return () => onNavigate('student-quizzes');
            case 'My Leave':
                return () => onNavigate('my-leave');
            default:
                return () => onShowDevPopup(name);
        }
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 h-full font-sans flex flex-col">
            <StudentHeader studentName={student.name} academyLogoUrl={academy.logoUrl} onToggleNav={onToggleNav} theme={theme} onToggleTheme={onToggleTheme} />
            <main className="flex-grow p-4 space-y-4 overflow-y-auto">
                {/* Banner */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                    <div className="p-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
                        <p className="text-xs font-bold opacity-80">SM TUTORIALS</p>
                        <h2 className="text-lg font-bold">ADMISSIONS OPEN FOR</h2>
                        <h3 className="text-2xl font-extrabold text-yellow-300">II PUC COMMERCE</h3>
                        <p className="text-sm font-semibold">FOR YEAR 2025-26</p>
                    </div>
                    <div className="p-4 text-sm text-gray-700 dark:text-gray-300">
                        <p className="font-bold mb-2 text-gray-800 dark:text-gray-100">WHAT'S SPECIAL?</p>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                            <li>Individual Attention</li>
                            <li>Experienced Faculty</li>
                            <li>Best Study Material</li>
                            <li>Shortcut Techniques</li>
                            <li>MONTHLY FEE STRUCTURE</li>
                        </ul>
                    </div>
                </div>

                {/* Profile Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-center space-x-4">
                    <img
                        src={photoUrl}
                        alt={student.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500 bg-gray-200"
                    />
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{student.name.toUpperCase()}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">({student.batches.join(', ')})</p>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                    <div className="grid grid-cols-3 gap-y-6 text-center">
                        {studentFeatures.map((feature) => (
                            <StudentFeatureIcon
                                key={feature.name}
                                {...feature}
                                onClick={getClickHandler(feature.name)}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}