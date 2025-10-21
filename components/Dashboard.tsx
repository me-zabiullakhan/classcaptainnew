

import React from 'react';
import type { FeatureItem, Academy, Student, Batch, Staff } from '../types';
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
import { GraduationCapIcon } from './icons/GraduationCapIcon';
import { EmailIcon } from './icons/EmailIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { BuildingIcon } from './icons/BuildingIcon';

const features: FeatureItem[] = [
  { name: 'Batches', Icon: BatchesIcon, color: 'bg-teal-500' },
  { name: 'Students', Icon: StudentsIcon, color: 'bg-blue-600' },
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
    onShowDevPopup: (featureName: string) => void;
}

const SummaryCard = ({ title, active, inactive, colorClass, onNavigate }: { title: string, active: number, inactive: number, colorClass: string, onNavigate: () => void }) => (
  <button onClick={onNavigate} className={`p-4 rounded-xl shadow-md text-white w-full ${colorClass} text-left transition-transform transform hover:scale-105`}>
    <h3 className="text-xl font-bold">{title}</h3>
    <div className="mt-2 text-sm">
      <div className="flex justify-between"><span>Active</span> <span>{active}</span></div>
      <div className="flex justify-between"><span>Inactive</span> <span>{inactive}</span></div>
    </div>
  </button>
);


export function Dashboard({ onNavigate, academy, students, batches, staff, onShowDevPopup }: DashboardProps): React.ReactNode {
  const getClickHandler = (name: string) => {
    switch (name) {
      case 'Batches':
        return () => onNavigate('batches');
      case 'Students':
        return () => onNavigate('student-options');
      case 'Tuition Fees':
        return () => onNavigate('fees-options');
      case 'Attendance':
        return () => onNavigate('select-batch-attendance');
      case 'Staff Manager':
        return () => onNavigate('staff-manager');
      case 'Settings':
        return () => onNavigate('settings');
      default:
        return () => onShowDevPopup(name);
    }
  }

  const activeStudents = students.filter(s => s.isActive).length;
  const inactiveStudents = students.length - activeStudents;

  const activeStaff = staff.filter(s => s.isActive).length;
  const inactiveStaff = staff.length - activeStaff;

  const activeBatches = batches.length;
  const inactiveBatches = 0;

  const hasContactInfo = academy.contactEmail || academy.contactPhone || academy.address;

  return (
    <div className="p-4 overflow-y-auto flex-grow">
      <div className="bg-indigo-600 text-white p-4 rounded-xl shadow-lg mb-6 flex items-center space-x-4">
          <div className="bg-white/30 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
               {academy.logoUrl ? (
                <img src={academy.logoUrl} alt="Academy Logo" className="w-full h-full rounded-full object-cover" />
              ) : (
                <GraduationCapIcon className="w-9 h-9 text-white" />
              )}
          </div>
          <div>
              <h2 className="text-xl font-bold">{academy.name}</h2>
              <p className="text-sm opacity-90">{academy.adminEmail}</p>
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

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-3 sm:gap-x-4 text-center">
        {features.map((feature) => (
          <FeatureIcon
              key={feature.name}
              {...feature}
              onClick={getClickHandler(feature.name)}
          />
        ))}
      </div>
      
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard title="Batches" active={activeBatches} inactive={inactiveBatches} colorClass="bg-teal-500" onNavigate={() => onNavigate('batches')} />
        <SummaryCard title="Students" active={activeStudents} inactive={inactiveStudents} colorClass="bg-orange-500" onNavigate={() => onNavigate('student-options')} />
        <SummaryCard title="Staff" active={activeStaff} inactive={inactiveStaff} colorClass="bg-red-500" onNavigate={() => onNavigate('staff-manager')} />
      </div>
    </div>
  );
}