

import React, { useState, useEffect, useRef, useMemo } from 'react';
import type { FeatureItem, Academy, Student, Batch, Staff, Transaction } from '../types';
import { FeatureIcon } from './FeatureIcon';

import { BatchesIcon } from './icons/BatchesIcon';
import { StudentsIcon } from './icons/StudentsIcon';
import { AttendanceIcon } from './icons/AttendanceIcon';
import { FeesIcon } from './icons/FeesIcon';
import { IncomeIcon } from './icons/IncomeIcon';
import { ExamsIcon } from './icons/ExamsIcon';
import { EnquiryIcon } from './icons/EnquiryIcon';
import { StaffIcon } from './icons/StaffIcon';
import { ReportsIcon } from './icons/ReportsIcon';
import { StudyMaterialIcon } from './icons/StudyMaterialIcon';
import { HomeworkIcon } from './icons/HomeworkIcon';
import { QuizIcon } from './icons/QuizIcon';
import { LeaveIcon } from './icons/LeaveIcon';
import { TodoIcon } from './icons/TodoIcon';
import { NoticeIcon } from './icons/NoticeIcon';
import { TransportIcon } from './icons/TransportIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { TimetableIcon } from './icons/TimetableIcon';
import { GraduationCapIcon } from './icons/GraduationCapIcon';
import { EmailIcon } from './icons/EmailIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { BuildingIcon } from './icons/BuildingIcon';
import NewLogo from '../public/logo.png';

const features: FeatureItem[] = [
  { name: 'Batches', Icon: BatchesIcon, color: 'bg-teal-500' },
  { name: 'Students', Icon: StudentsIcon, color: 'bg-blue-600' },
  { name: 'Timetable', Icon: TimetableIcon, color: 'bg-pink-500' },
  { name: 'Attendance', Icon: AttendanceIcon, color: 'bg-purple-600' },
  { name: 'Tuition Fees', Icon: FeesIcon, color: 'bg-emerald-500' },
  { name: 'Income/Expenses', Icon: IncomeIcon, color: 'bg-orange-500' },
  { name: 'Manage Exams', Icon: ExamsIcon, color: 'bg-lime-500' },
  { name: 'Enquiry Manager', Icon: EnquiryIcon, color: 'bg-cyan-500' },
  { name: 'Staff Manager', Icon: StaffIcon, color: 'bg-sky-600' },
  { name: 'Reports', Icon: ReportsIcon, color: 'bg-red-500' },
  { name: 'Study Material', Icon: StudyMaterialIcon, color: 'bg-gray-700' },
  { name: 'Homework', Icon: HomeworkIcon, color: 'bg-green-500' },
  { name: 'Online Quiz', Icon: QuizIcon, color: 'bg-teal-600' },
  { name: 'Leave Manager', Icon: LeaveIcon, color: 'bg-blue-500' },
  { name: 'To Do Task', Icon: TodoIcon, color: 'bg-slate-500' },
  { name: 'Notice Board', Icon: NoticeIcon, color: 'bg-cyan-600' },
  { name: 'Transport', Icon: TransportIcon, color: 'bg-amber-500' },
  { name: 'Settings', Icon: SettingsIcon, color: 'bg-red-600' },
];

interface DashboardProps {
    onNavigate: (page: string) => void;
    academy: Academy;
    students: Student[];
    batches: Batch[];
    staff: Staff[];
    transactions: Transaction[];
    onShowDevPopup: (featureName: string) => void;
}

// FIX: Extracted SummaryCard props to a dedicated interface for better type inference and reusability.
interface SummaryCardProps {
    title: string; 
    total: number; 
    active: number; 
    inactive: number; 
    Icon: React.FC<{className?: string}>; 
    onNavigate: () => void;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, total, active, inactive, Icon, onNavigate }) => (
  <button onClick={onNavigate} className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex items-center gap-4 transition-transform transform hover:scale-105 w-full">
    <div className="bg-indigo-100 dark:bg-indigo-900/40 p-3 rounded-full">
      <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
    </div>
    <div className="text-left">
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{total}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {active} Active / {inactive} Inactive
      </p>
    </div>
  </button>
);

const StatsSlider: React.FC<{ stats: SummaryCardProps[] }> = ({ stats }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () => setCurrentIndex((prevIndex) => (prevIndex + 1) % stats.length),
            4000
        );

        return () => {
            resetTimeout();
        };
    }, [currentIndex, stats.length]);

    useEffect(() => {
        if (sliderRef.current) {
            const slideWidth = sliderRef.current.offsetWidth;
            sliderRef.current.scrollTo({
                left: currentIndex * slideWidth,
                behavior: 'smooth',
            });
        }
    }, [currentIndex]);
    
    return (
        <div className="mt-8">
             <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-3 text-center">Institute Stats</h3>
            <div 
                ref={sliderRef} 
                className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide -mx-2"
            >
                {stats.map((stat, index) => (
                    <div key={index} className="flex-shrink-0 w-full snap-center px-2">
                        <SummaryCard {...stat} />
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-center gap-2 mt-4">
                {stats.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index ? 'w-4 bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                        aria-label={`Go to stat card ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

const FinancialOverview: React.FC<{ 
    transactions: Transaction[], 
    onNavigate: (page: string) => void,
    viewMode: 'month' | 'overall',
    setViewMode: (mode: 'month' | 'overall') => void
}> = ({ transactions, onNavigate, viewMode, setViewMode }) => {
    const { totalIncome, totalExpenses } = useMemo(() => {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();

        const transactionsToProcess = viewMode === 'month'
            ? transactions.filter(tx => {
                if (!tx.date) return false;
                
                // Handle both Timestamp and other date formats (string, Date)
                const txDate = tx.date && typeof tx.date.toDate === 'function' 
                    ? tx.date.toDate() 
                    : new Date(tx.date as any);
                
                if (isNaN(txDate.getTime())) return false;
        
                return txDate.getFullYear() === currentYear && txDate.getMonth() === currentMonth;
            })
            : transactions;

        return transactionsToProcess
            .reduce((acc, tx) => {
                if (tx.type === 'Income') {
                    acc.totalIncome += tx.amount;
                } else {
                    acc.totalExpenses += tx.amount;
                }
                return acc;
            }, { totalIncome: 0, totalExpenses: 0 });
    }, [transactions, viewMode]);

    const netBalance = totalIncome - totalExpenses;
    const totalTransactionsValue = totalIncome + totalExpenses;
    const incomePercentage = totalTransactionsValue > 0 ? (totalIncome / totalTransactionsValue) * 100 : 0;

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md mt-8">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-bold text-gray-800 dark:text-gray-100">Financial Overview</h3>
                 <div className="bg-gray-200 dark:bg-gray-700 p-1 rounded-lg flex text-xs font-semibold">
                    <button
                        onClick={() => setViewMode('month')}
                        className={`px-3 py-1 rounded-md transition-all ${viewMode === 'month' ? 'bg-white dark:bg-gray-800 shadow text-indigo-600' : 'text-gray-600 dark:text-gray-300'}`}
                    >
                        This Month
                    </button>
                    <button
                        onClick={() => setViewMode('overall')}
                        className={`px-3 py-1 rounded-md transition-all ${viewMode === 'overall' ? 'bg-white dark:bg-gray-800 shadow text-indigo-600' : 'text-gray-600 dark:text-gray-300'}`}
                    >
                        Overall
                    </button>
                </div>
            </div>

            <div className="w-full bg-red-200 dark:bg-red-900/40 rounded-full h-3 mb-4">
                <div 
                    className="bg-green-500 h-3 rounded-full" 
                    style={{ width: `${incomePercentage}%` }}
                    title={`Income: ${incomePercentage.toFixed(1)}%`}
                ></div>
            </div>

            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Income</p>
                        <p className="font-bold text-gray-800 dark:text-gray-100">₹{totalIncome.toLocaleString('en-IN')}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-right">
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Expenses</p>
                        <p className="font-bold text-gray-800 dark:text-gray-100">₹{totalExpenses.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Net Balance</p>
                    <p className={`text-xl font-bold ${netBalance >= 0 ? 'text-indigo-600 dark:text-indigo-400' : 'text-red-600 dark:text-red-400'}`}>
                        ₹{netBalance.toLocaleString('en-IN')}
                    </p>
                </div>
                <button 
                    onClick={() => onNavigate('income-expenses')} 
                    className="px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-100 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900"
                >
                    View Details →
                </button>
            </div>
        </div>
    );
};


export function Dashboard({ onNavigate, academy, students, batches, staff, transactions, onShowDevPopup }: DashboardProps): React.ReactNode {
  const [financialViewMode, setFinancialViewMode] = useState<'month' | 'overall'>('month');

  const getClickHandler = (name: string) => {
    switch (name) {
      case 'Batches':
        return () => onNavigate('batches');
      case 'Students':
        return () => onNavigate('student-options');
      case 'Timetable':
        return () => onNavigate('schedule-classes');
      case 'Tuition Fees':
        return () => onNavigate('fees-options');
      case 'Attendance':
        return () => onNavigate('select-batch-attendance');
      case 'Staff Manager':
        return () => onNavigate('staff-options');
      case 'Settings':
        return () => onNavigate('settings');
      case 'Income/Expenses':
        return () => onNavigate('income-expenses');
      case 'Manage Exams':
        return () => onNavigate('manage-exams');
      case 'Enquiry Manager':
        return () => onNavigate('enquiry-manager');
      case 'Reports':
        return () => onNavigate('reports-options');
      case 'Study Material':
        return () => onNavigate('study-material');
      case 'Homework':
        return () => onNavigate('homework');
      case 'Online Quiz':
        return () => onNavigate('manage-quizzes');
      case 'Leave Manager':
        return () => onNavigate('leave-manager');
      case 'To Do Task':
        return () => onNavigate('todo-task');
      case 'Notice Board':
        return () => onNavigate('notice-board');
      case 'Transport':
        return () => onNavigate('transport-options');
      default:
        return () => onShowDevPopup(name);
    }
  }

  const activeStudents = students.filter(s => s.isActive).length;
  const inactiveStudents = students.length - activeStudents;

  const activeStaff = staff.filter(s => s.isActive).length;
  const inactiveStaff = staff.length - activeStaff;

  const activeBatches = batches.filter(b => b.isActive).length;
  const inactiveBatches = batches.length - activeBatches;

  const hasContactInfo = academy.contactEmail || academy.contactPhone || academy.address;

  const statsData = [
    { 
        title: "Total Batches", 
        total: batches.length,
        active: activeBatches, 
        inactive: inactiveBatches, 
        Icon: BatchesIcon, 
        onNavigate: () => onNavigate('batches') 
    },
    { 
        title: "Total Students",
        total: students.length,
        active: activeStudents, 
        inactive: inactiveStudents, 
        Icon: StudentsIcon, 
        onNavigate: () => onNavigate('student-options') 
    },
    { 
        title: "Total Staff",
        total: staff.length,
        active: activeStaff, 
        inactive: inactiveStaff, 
        Icon: StaffIcon, 
        onNavigate: () => onNavigate('staff-options') 
    }
  ];

  return (
    <div className="p-4 flex-grow pb-24 sm:pb-4">
      <div className="bg-indigo-600 text-white p-4 rounded-xl shadow-lg mb-6 flex items-center space-x-4">
          <div className="bg-white/30 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
               {academy.logoUrl ? (
                <img src={NewLogo} alt="Academy Logo" className="w-full h-full rounded-full object-cover" />
              ) : (
                <GraduationCapIcon className="w-9 h-9 text-white" />
              )}
          </div>
          <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold truncate">{academy.name}</h2>
              <p className="text-sm opacity-90 truncate">{academy.adminEmail}</p>
              <p className="text-sm opacity-90">Academy ID: {academy.academyId || 'N/A'}</p>
          </div>
      </div>

      {hasContactInfo && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md mb-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-3">Academy Details</h3>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            {academy.contactEmail && (
              <div className="flex items-center space-x-2">
                <EmailIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                <span>{academy.contactEmail}</span>
              </div>
            )}
            {academy.contactPhone && (
              <div className="flex items-center space-x-2">
                <PhoneIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                <span>{academy.contactPhone}</span>
              </div>
            )}
            {academy.address && (
              <div className="flex items-start space-x-2">
                <BuildingIcon className="w-4 h-4 text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0" />
                <span>{academy.address}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* DESKTOP: Stats Cards */}
      <div className="hidden sm:flex flex-col sm:flex-row gap-4 mb-8">
        {statsData.map((stat, index) => (
            <SummaryCard key={index} {...stat} />
        ))}
      </div>
      
      {/* ALL SCREENS: Feature Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-3 sm:gap-x-4 text-center">
        {features.map((feature) => (
          <FeatureIcon
              key={feature.name}
              {...feature}
              onClick={getClickHandler(feature.name)}
          />
        ))}
      </div>
      
       {/* MOBILE: Stats Slider */}
      <div className="sm:hidden">
        <StatsSlider stats={statsData} />
      </div>

      {/* Financial Overview */}
      <FinancialOverview 
        transactions={transactions} 
        onNavigate={onNavigate} 
        viewMode={financialViewMode}
        setViewMode={setFinancialViewMode}
      />
      
    </div>
  );
}