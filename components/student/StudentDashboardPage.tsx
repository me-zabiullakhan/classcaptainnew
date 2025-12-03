
import React, { useState, useEffect } from 'react';
import type { Student, Academy, FeeCollection, Batch, ScheduleItem, AttendanceStatus } from '../../types';
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
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { ChartPieIcon } from '../icons/ChartPieIcon';


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

// --- Custom Components for Insights ---

const CircularProgress = ({ percentage, color, label, subLabel }: { percentage: number, color: string, label: string, subLabel?: string }) => {
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="transparent"
                        className="text-gray-200 dark:text-gray-700"
                    />
                    <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className={`${color} transition-all duration-1000 ease-out`}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-xl font-bold ${color}`}>{percentage}%</span>
                </div>
            </div>
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 mt-1">{label}</p>
            {subLabel && <p className="text-[10px] text-gray-400">{subLabel}</p>}
        </div>
    );
};

const AnimatedPieChart = ({ data }: { data: { label: string, value: number, color: string }[] }) => {
    const total = data.reduce((acc, item) => acc + item.value, 0);
    let cumulativePercent = 0;

    if (total === 0) {
        return (
            <div className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-xs text-gray-400">No Data</span>
            </div>
        );
    }

    return (
        <div className="relative w-32 h-32">
            <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                {data.map((item, index) => {
                    const percent = item.value / total;
                    const strokeDasharray = `${percent * 314} 314`; // 2 * PI * 50 ~= 314
                    const strokeDashoffset = -cumulativePercent * 314;
                    cumulativePercent += percent;

                    return (
                        <circle
                            key={index}
                            r="25"
                            cx="50"
                            cy="50"
                            fill="transparent"
                            stroke={item.color}
                            strokeWidth="50"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            className="transition-all duration-1000 ease-out hover:opacity-90"
                        />
                    );
                })}
                {/* Center hole for Donut effect */}
                {/* <circle r="30" cx="50" cy="50" fill="white" /> */} 
            </svg>
        </div>
    );
};

const StatCard = ({ title, count, total, colorClass, labelColor }: { title: string, count: number, total: number, colorClass: string, labelColor: string }) => (
    <div className={`p-3 rounded-xl flex-1 flex flex-col justify-between ${colorClass} shadow-sm min-w-[80px]`}>
        <p className={`text-xs font-bold uppercase tracking-wider ${labelColor}`}>{title}</p>
        <div className="flex items-end justify-between mt-2">
            <span className={`text-2xl font-extrabold ${labelColor}`}>{count}</span>
            <span className={`text-xs opacity-70 mb-1 ${labelColor}`}>/ {total}</span>
        </div>
    </div>
);

const StudentInsights = ({ student, academyId, batches }: { student: Student, academyId: string, batches: Batch[] }) => {
    const [stats, setStats] = useState({ present: 0, absent: 0, leave: 0, totalDays: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAttendance = async () => {
            if (!student.batches || student.batches.length === 0) {
                setLoading(false);
                return;
            }

            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            
            // Build cache of student's batch IDs
            const studentBatchIds = batches
                .filter(b => student.batches.includes(b.name))
                .map(b => b.id);

            let present = 0;
            let absent = 0;
            let leave = 0;
            let count = 0;

            // Simple heuristic: Fetch last 7 days + today to show *some* data quickly without 30 reads
            // For a full month report, we'd need a more efficient backend structure or aggregate doc.
            // Here we iterate all days of current month because that's what the UI implies.
            // Optimization: Fetch concurrently.
            
            const datePromises = Array.from({ length: daysInMonth }, (_, i) => {
                // Don't fetch future dates
                if (i + 1 > now.getDate()) return null;
                
                const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`;
                // We check the FIRST batch the student is in for simplicity in this dashboard view
                // Ideally we check all, but attendance is usually marked per batch.
                return getDoc(doc(db, `academies/${academyId}/batches/${studentBatchIds[0]}/attendance`, dateString));
            }).filter(Boolean);

            try {
                const snapshots = await Promise.all(datePromises);
                snapshots.forEach(snap => {
                    if (snap && snap.exists()) {
                        const status = snap.data()[student.id] as AttendanceStatus;
                        if (status) {
                            count++;
                            if (status === 'Present') present++;
                            else if (status === 'Absent') absent++;
                            else if (status === 'Leave') leave++;
                        }
                    }
                });
                setStats({ present, absent, leave, totalDays: count });
            } catch (e) {
                console.error("Failed to fetch dashboard stats", e);
            } finally {
                setLoading(false);
            }
        };

        fetchAttendance();
    }, [student, academyId, batches]);

    if (loading) return <div className="h-48 bg-white dark:bg-gray-800 rounded-2xl animate-pulse"></div>;

    const pieData = [
        { label: 'Present', value: stats.present, color: '#4ade80' }, // green-400
        { label: 'Absent', value: stats.absent, color: '#f87171' },   // red-400
        { label: 'Leave', value: stats.leave, color: '#fbbf24' },     // amber-400
    ];

    const overallPercentage = stats.totalDays > 0 ? Math.round((stats.present / stats.totalDays) * 100) : 0;
    const currentMonthName = new Date().toLocaleString('default', { month: 'long' });

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm overflow-hidden p-5 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-full">
                    <ChartPieIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Attendance Report</h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 items-center justify-center mb-8">
                {/* Pie Chart Legend & Visual */}
                <div className="flex items-center gap-4">
                    <AnimatedPieChart data={pieData} />
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-green-400"></span>
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Present</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Leave</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-400"></span>
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Absent</span>
                        </div>
                    </div>
                </div>

                {/* Circular Progress */}
                <div className="flex gap-6">
                    <CircularProgress percentage={overallPercentage} color="text-indigo-600 dark:text-indigo-400" label="Overall" />
                    <CircularProgress percentage={overallPercentage} color="text-blue-500" label={currentMonthName} subLabel="This Month" />
                </div>
            </div>

            {/* Bottom Stats Cards */}
            <div className="flex gap-3 overflow-x-auto pb-2">
                <StatCard 
                    title="Presents" 
                    count={stats.present} 
                    total={stats.totalDays} 
                    colorClass="bg-indigo-50 dark:bg-indigo-900/30" 
                    labelColor="text-indigo-600 dark:text-indigo-300" 
                />
                <StatCard 
                    title="Leaves" 
                    count={stats.leave} 
                    total={stats.totalDays} 
                    colorClass="bg-amber-50 dark:bg-amber-900/30" 
                    labelColor="text-amber-600 dark:text-amber-300" 
                />
                <StatCard 
                    title="Absents" 
                    count={stats.absent} 
                    total={stats.totalDays} 
                    colorClass="bg-red-50 dark:bg-red-900/30" 
                    labelColor="text-red-600 dark:text-red-300" 
                />
            </div>
        </div>
    );
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

                {/* Quick Insights (Attendance Stats) */}
                <StudentInsights student={student} academyId={academy.id} batches={batches} />

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
