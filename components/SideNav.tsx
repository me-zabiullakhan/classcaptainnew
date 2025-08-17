import React from 'react';
import type { FeatureItem } from '../types';
import { LogoIcon } from './icons/LogoIcon';
import { XMarkIcon } from './icons/XMarkIcon';
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
import { ContactIcon } from './icons/ContactIcon';
import { AccountIcon } from './icons/AccountIcon';
import { LogoutIcon } from './icons/LogoutIcon';

const features: Omit<FeatureItem, 'color'>[] = [
  { name: 'Batches', Icon: BatchesIcon },
  { name: 'Students', Icon: StudentsIcon },
  { name: 'Attendance', Icon: AttendanceIcon },
  { name: 'Tuition Fees', Icon: FeesIcon },
  { name: 'Income/Expenses', Icon: IncomeIcon },
  { name: 'Manage Exams', Icon: ExamsIcon },
  { name: 'Enquiry Manager', Icon: EnquiryIcon },
  { name: 'Staff Manager', Icon: StaffIcon },
  { name: 'Reports', Icon: ReportsIcon },
  { name: 'Study Material', Icon: StudyMaterialIcon },
  { name: 'Homework', Icon: HomeworkIcon },
  { name: 'Online Quiz', Icon: QuizIcon },
  { name: 'Leave Manager', Icon: LeaveIcon },
  { name: 'To Do Task', Icon: TodoIcon },
  { name: 'Notice Board', Icon: NoticeIcon },
  { name: 'Transport', Icon: TransportIcon },
  { name: 'Settings', Icon: SettingsIcon },
  { name: 'Contact Us', Icon: ContactIcon },
];


interface SideNavProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function SideNav({ isOpen, onClose, onNavigate, onLogout }: SideNavProps): React.ReactNode {
  const handleNavigate = (page: string) => {
    onNavigate(page);
    onClose();
  };
  
  const getClickHandler = (name: string) => {
    switch (name) {
      case 'Batches':
        return () => handleNavigate('batches');
      case 'Students':
        return () => handleNavigate('student-options');
      case 'Tuition Fees':
        return () => handleNavigate('fees-options');
      case 'Attendance':
        return () => handleNavigate('select-batch-attendance');
      default:
        return () => alert('This feature is under development.');
    }
  }
  
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* SideNav */}
      <aside 
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sidenav-title"
      >
        <div className="flex flex-col h-full">
            {/* Header */}
            <header className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                    <LogoIcon className="w-8 h-8 text-indigo-600"/>
                    <h2 id="sidenav-title" className="text-lg font-bold text-gray-800">Class Captain</h2>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100" aria-label="Close menu">
                    <XMarkIcon className="w-6 h-6 text-gray-600"/>
                </button>
            </header>

            {/* Navigation Links */}
            <nav className="flex-grow overflow-y-auto py-4">
                <ul>
                    {features.map(({ name, Icon }) => (
                        <li key={name}>
                            <button onClick={getClickHandler(name)} className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                                <Icon className="w-6 h-6 mr-4 text-gray-400"/>
                                <span className="font-medium">{name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer */}
            <footer className="p-4 border-t">
                 <button onClick={() => handleNavigate('my-account')} className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors rounded-lg">
                    <AccountIcon className="w-6 h-6 mr-4 text-gray-400"/>
                    <span className="font-medium">My Account</span>
                </button>
                 <button onClick={onLogout} className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors rounded-lg mt-2">
                    <LogoutIcon className="w-6 h-6 mr-4 text-gray-400"/>
                    <span className="font-medium">Logout</span>
                </button>
            </footer>
        </div>
      </aside>
    </>
  );
}
