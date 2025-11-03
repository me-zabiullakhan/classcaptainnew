

import React, { useState, useEffect } from 'react';
import type { Student, Academy, FeeCollection, Batch, ScheduleItem } from '../../types';
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
import { NoticeIcon } from '../icons/NoticeIcon';
import { TransportIcon } from '../icons/TransportIcon';
import { TodaySchedulePopup } from './TodaySchedulePopup';
import { FeeReminderPopup } from './FeeReminderPopup';
import { db } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';


interface StudentDashboardPageProps {
    student: Student;
    academy: Academy;
    feeCollections: FeeCollection[];
    batches: Batch[];
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
    { name: 'Notice Board', Icon: NoticeIcon, color: 'bg-cyan-600' },
    { name: 'Transport', Icon: TransportIcon, color: 'bg-amber-500' },
];

const getPendingMonths = (student: Student, paidMonths: Set<string>): string[] => {
    if (!student.admissionDate || !student.feeType) return [];

    const pending: string[] = [];
    const admissionDate = new Date(student.admissionDate);
    const today = new Date();
    
    if (student.feeType === 'Monthly') {
        let currentDate = new Date(admissionDate.getFullYear(), admissionDate.getMonth(), 1);
        while (currentDate <= today) {
            const monthString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
            if (!paidMonths.has(monthString)) {
                pending.push(monthString);
            }
            currentDate.setMonth(currentDate.getMonth() + 1);
        }
    } else { // Handles 'Yearly'
        let cycleStartDate = new Date(admissionDate.getFullYear(), admissionDate.getMonth(), 1);
        while (cycleStartDate <= today) {
            const cycleStartString = `${cycleStartDate.getFullYear()}-${String(cycleStartDate.getMonth() + 1).padStart(2, '0')}`;
            if (!paidMonths.has(cycleStartString)) {
                pending.push(cycleStartString);
            }
            cycleStartDate.setFullYear(cycleStartDate.getFullYear() + 1);
        }
    }

    return pending;
};

export function StudentDashboardPage({ student, academy, feeCollections, batches, onNavigate, onToggleNav, theme, onToggleTheme, onShowDevPopup }: StudentDashboardPageProps): React.ReactNode {
    
    const [showSchedulePopup, setShowSchedulePopup] = useState(false);
    const [showFeePopup, setShowFeePopup] = useState(false);
    const [todaysSchedule, setTodaysSchedule] = useState<ScheduleItem[] | null>(null);
    const [isScheduleLoading, setIsScheduleLoading] = useState(true);
    const [pendingFees, setPendingFees] = useState<{ months: string[], total: number } | null>(null);
    
    const photoUrl = student.photo || `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(student.name)}`;

    useEffect(() => {
        const fetchSchedule = async () => {
            const studentBatchIds = batches
                .filter(b => student.batches.includes(b.name))
                .map(b => b.id);

            if (studentBatchIds.length === 0) {
                return null;
            }
            
            const primaryBatchId = studentBatchIds[0];
            const dateString = new Date().toISOString().split('T')[0];

            try {
                const scheduleRef = doc(db, `academies/${academy.id}/schedules/${dateString}`);
                const docSnap = await getDoc(scheduleRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const items = (data[primaryBatchId] || []) as ScheduleItem[];
                    items.sort((a,b) => a.startTime.localeCompare(b.startTime));
                    return items;
                }
                return [];
            } catch (err) {
                console.error("Error fetching schedule for popup:", err);
                return null;
            }
        };

        const calculatePendingFees = () => {
            const paidMonths = new Set(feeCollections.map(fc => fc.feeForMonth));
            const pending = getPendingMonths(student, paidMonths);
            
            if (pending.length > 0) {
                const totalDue = pending.length * ((student.feeAmount || 0) + (student.transportFee || 0));
                return { months: pending, total: totalDue };
            }
            return null;
        };

        const runChecks = async () => {
            if (sessionStorage.getItem('dashboardPopupsShown') === 'true') {
                setIsScheduleLoading(false);
                return;
            }
            
            const schedule = await fetchSchedule();
            const fees = calculatePendingFees();
            
            setTodaysSchedule(schedule);
            setPendingFees(fees);
            setIsScheduleLoading(false);

            if(schedule !== null) { // Show schedule popup even if empty
                setShowSchedulePopup(true);
            } else if (fees) { // If schedule fetch fails or no batches, check for fees
                setShowFeePopup(true);
            }
            sessionStorage.setItem('dashboardPopupsShown', 'true');
        };

        runChecks();
    }, [student, academy.id, batches, feeCollections]);

    const handleScheduleClose = () => {
        setShowSchedulePopup(false);
        if (pendingFees) {
            setShowFeePopup(true);
        }
    };

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
            case 'Notice Board':
                return () => onNavigate('student-notice-board');
            case 'Transport':
                return () => onNavigate('student-transport');
            default:
                return () => onShowDevPopup(name);
        }
    };

    const featuresToDisplay = studentFeatures.filter(
      feature => feature.name !== 'Transport' || student.transportRouteId
    );

    return (
        <div className="bg-gray-100 dark:bg-gray-900 h-full font-sans flex flex-col">
            <StudentHeader studentName={student.name} academyLogoUrl={academy.logoUrl} onToggleNav={onToggleNav} theme={theme} onToggleTheme={onToggleTheme} />
            <main className="flex-grow p-4 space-y-4 overflow-y-auto">
                {/* Banner */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                    <div className="p-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
                        <p className="text-xs font-bold opacity-80">CLASS CAPTAIN</p>
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
                        {featuresToDisplay.map((feature) => (
                            <StudentFeatureIcon
                                key={feature.name}
                                {...feature}
                                onClick={getClickHandler(feature.name)}
                            />
                        ))}
                    </div>
                </div>
            </main>
            {showSchedulePopup && (
                <TodaySchedulePopup 
                    schedule={todaysSchedule} 
                    onClose={handleScheduleClose} 
                    isLoading={isScheduleLoading}
                />
            )}
            {showFeePopup && pendingFees && (
                <FeeReminderPopup 
                    pendingMonths={pendingFees.months} 
                    totalDue={pendingFees.total}
                    studentFeeType={student.feeType}
                    onClose={() => setShowFeePopup(false)} 
                    onNavigate={onNavigate} 
                />
            )}
        </div>
    );
}