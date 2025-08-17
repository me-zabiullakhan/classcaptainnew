
import React from 'react';
import type { FeatureItem, Academy } from '../types';
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
import { BehaviorIcon } from './icons/BehaviorIcon';
import { LeaveIcon } from './icons/LeaveIcon';
import { TodoIcon } from './icons/TodoIcon';
import { NoticeIcon } from './icons/NoticeIcon';
import { WebsiteIcon } from './icons/WebsiteIcon';
import { TransportIcon } from './icons/TransportIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { ContactIcon } from './icons/ContactIcon';
import { GraduationCapIcon } from './icons/GraduationCapIcon';

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
  { name: 'Manage Behavior', Icon: BehaviorIcon, color: 'bg-emerald-600' },
  { name: 'Leave Manager', Icon: LeaveIcon, color: 'bg-blue-500' },
  { name: 'To Do Task', Icon: TodoIcon, color: 'bg-slate-500' },
  { name: 'Notice Board', Icon: NoticeIcon, color: 'bg-cyan-600' },
  { name: 'Website Settings', Icon: WebsiteIcon, color: 'bg-purple-500' },
  { name: 'Transport', Icon: TransportIcon, color: 'bg-amber-500' },
  { name: 'Settings', Icon: SettingsIcon, color: 'bg-red-600' },
  { name: 'Contact Us', Icon: ContactIcon, color: 'bg-lime-600' },
];

interface DashboardProps {
    onNavigate: (page: string) => void;
    academy: Academy;
}

export function Dashboard({ onNavigate, academy }: DashboardProps): React.ReactNode {
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
      default:
        return () => alert('This feature is under development.');
    }
  }

  return (
    <>
      <div className="bg-indigo-600 text-white p-4 rounded-xl shadow-lg mb-6 flex items-center space-x-4">
          <div className="bg-white/30 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
              <GraduationCapIcon className="w-9 h-9 text-white" />
          </div>
          <div>
              <h2 className="text-xl font-bold">{academy.name}</h2>
              <p className="text-sm opacity-90">{academy.adminEmail}</p>
              <p className="text-sm opacity-90">Academy ID: {academy.academyId || 'N/A'}</p>
          </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-3 sm:gap-x-4 text-center">
        {features.map((feature) => (
          <FeatureIcon 
              key={feature.name} 
              {...feature} 
              onClick={getClickHandler(feature.name)}
          />
        ))}
      </div>
    </>
  );
}
