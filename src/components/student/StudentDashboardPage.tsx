
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
import { doc, getDoc } from 'firebase/firestore';
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
    systemLogoUrl?: string | null;
    isDemoMode?: boolean;
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
            <div className="relative w-16 h-16 sm:w-24 sm:h-24 transition-all duration-300">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 96 96">
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
                    <span className={`text-sm sm:text-xl font-bold ${color}`}>{percentage}%</span>
                </div>
            </div>
            <p className="text-[10px] sm:text-xs font-semibold text-gray-600 dark:text-gray-300 mt-1">{label}</p>
            {subLabel && <p className="text-[9px] sm:text-[10px] text-gray-400 hidden sm:block">{subLabel}</p>}
        </div>
    );
};

const AnimatedPieChart = ({ data }: { data: { label: string, value: number, color: string }[] }) => {
    const total = data.reduce((acc, item) => acc + item.value, 0);
    let cumulativePercent = 0;

    if (total === 0) {
        return (
            <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center transition-all duration-300">
                <span className="text-[10px] sm:text-xs text-gray-400">No Data</span>
            </div>
        );
    }

    return (
        <div className="relative w-20 h-20 sm:w-32 sm:h-32 transition-all duration-300">
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
            </svg>
        </div>
    );
};

const StatCard = ({ title, count, total, colorClass, labelColor }: { title: string, count: number, total: number, colorClass: string, labelColor: string }) => (
    <div className={`p-2.5 sm:p-3 rounded-xl flex-1 flex flex-col justify-between ${colorClass} shadow-sm min-w-[70px] sm:min-w-[80px]`}>
        <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${labelColor}`}>{title}</p>
        <div className="flex items-end justify-between mt-1 sm:mt-2">
            <span className={`text-lg sm:text-2xl font-extrabold ${labelColor}`}>{count}</span>
            <span className={`text-[10px] sm:text-xs opacity-70 mb-0.5 sm:mb-1 ${labelColor}`}>/ {total}</span>
        </div>
    </div>
);

const StudentInsights = ({ student, academyId, batches, isDemoMode }: { student: Student, academyId: string, batches: Batch[], isDemoMode?: boolean }) => {
    const [stats, setStats] = useState({ present: 0, absent: 0, leave: 0, totalDays: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        
        const fetchAttendance = async () => {
            if (isDemoMode) {
                if (isMounted) {
                    setStats({ present: 5, absent: 1, leave: 0, totalDays: 6 });
                    setLoading(false);
                }
                return;
            }

            if (!academyId || !student.batches || student.batches.length === 0) {
                if (isMounted) setLoading(false);
                return;
            }

            const studentBatchIds = batches
                .filter(b => student.batches.includes(b.name))
                .map(b => b.id);

            if (studentBatchIds.length === 0) {
                 if (isMounted) setLoading(false);
                 return;
            }

            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            
            let present = 0;
            let absent = 0;
            let leave = 0;
            let count = 0;

            const datePromises = Array.from({ length: daysInMonth }, (_, i) => {
                if (i + 1 > now.getDate()) return null;
                
                const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`;
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
                if (isMounted) setStats({ present, absent, leave, totalDays: count });
            } catch (e) {
                console.error("Failed to fetch dashboard stats", e);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchAttendance();
        
        return () => {
            isMounted = false;
        };
    }, [student, academyId, batches, isDemoMode]);

    if (loading) return <div className="h-40 bg-white dark:bg-gray-800 rounded-2xl animate-pulse"></div>;

    const pieData = [
        { label: 'Present', value: stats.present, color: '#4ade80' },
        { label: 'Absent', value: stats.absent, color: '#f87171' },
        { label: 'Leave', value: stats.leave, color: '#fbbf24' },
    ];

    const overallPercentage = stats.totalDays > 0 ? Math.round((stats.present / stats.totalDays) * 100) : 0;
    const currentMonthName = new Date().toLocaleString('default', { month: 'short' });

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm overflow-hidden p-3 sm:p-5 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-3 sm:mb-6">
                <div className="p-1.5 sm:p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-full">
                    <ChartPieIcon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100">Attendance Report</h2>
            </div>

            <div className="flex flex-row flex-wrap sm:flex-nowrap gap-4 items-center justify-between sm:justify-center mb-4 sm:mb-8">
                {/* Pie Chart & Legend - Compact Group */}
                <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-center sm:justify-start">
                    <div className="w-20 h-20 sm:w-32 sm:h-32"> {/* Responsive size container */}
                         <AnimatedPieChart data={pieData} />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400"></span>
                            <span className="text-[10px] sm:text-xs font-medium text-gray-600 dark:text-gray-300">Present</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-amber-400"></span>
                            <span className="text-[10px] sm:text-xs font-medium text-gray-600 dark:text-gray-300">Leave</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-400"></span>
                            <span className="text-[10px] sm:text-xs font-medium text-gray-600 dark:text-gray-300">Absent</span>
                        </div>
                    </div>
                </div>

                {/* Circular Progress - Compact Group */}
                <div className="flex gap-4 sm:gap-6 w-full sm:w-auto justify-center sm:justify-start border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 dark:border-gray-700">
                    <CircularProgress percentage={overallPercentage} color="text-indigo-600 dark:text-indigo-400" label="Overall" />
                    <CircularProgress percentage={overallPercentage} color="text-blue-500" label={currentMonthName} subLabel="This Month" />
                </div>
            </div>

            {/* Bottom Stats Cards */}
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1">
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


export function StudentDashboardPage({ student, academy, feeCollections, batches, onNavigate, onToggleNav, theme, onToggleTheme, onShowDevPopup, systemLogoUrl, isDemoMode }: StudentDashboardPageProps): React.ReactNode {
    
    const [showSchedulePopup, setShowSchedulePopup] = useState(false);
    const [showFeePopup, setShowFeePopup] = useState(false);
    const [todaysSchedule, setTodaysSchedule] = useState<ScheduleItem[] | null>(null);
    const [isScheduleLoading, setIsScheduleLoading] = useState(true);
    const [pendingFees, setPendingFees] = useState<{ months: string[], total: number } | null>(null);
    
    const photoUrl = student.photo || `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(student.name)}`;

    useEffect(() => {
        const fetchSchedule = async () => {
            if (isDemoMode) {
                setIsScheduleLoading(false);
                return null;
            }

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
    }, [student, academy.id, batches, feeCollections, isDemoMode]);

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
                <StudentInsights student={student} academyId={academy.id} batches={batches} isDemoMode={isDemoMode} />

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
