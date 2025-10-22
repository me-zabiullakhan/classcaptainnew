

import React from 'react';
import type { FeatureItem, Staff, BatchAccessPermissions } from '../../types';
import { LogoIcon } from '../icons/LogoIcon';
import { XMarkIcon } from '../icons/XMarkIcon';
import { StudentsIcon } from '../icons/StudentsIcon';
import { AttendanceIcon } from '../icons/AttendanceIcon';
import { FeesIcon } from '../icons/FeesIcon';
import { ExamsIcon } from '../icons/ExamsIcon';
import { AccountIcon } from '../icons/AccountIcon';
import { LogoutIcon } from '../icons/LogoutIcon';
import { TimetableIcon } from '../icons/TimetableIcon';

const allFeatures: Omit<FeatureItem, 'color'>[] = [
  { name: 'Students', Icon: StudentsIcon },
  { name: 'Attendance', Icon: AttendanceIcon },
  { name: 'Class Schedule', Icon: TimetableIcon },
  { name: 'Tuition Fees', Icon: FeesIcon },
  { name: 'Manage Exams', Icon: ExamsIcon },
];


interface StaffSideNavProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  staff: Staff;
  onShowDevPopup: (featureName: string) => void;
}

export function StaffSideNav({ isOpen, onClose, onNavigate, onLogout, staff, onShowDevPopup }: StaffSideNavProps): React.ReactNode {
  const { batchAccess } = staff;

  const hasPermission = (perm: keyof BatchAccessPermissions) => {
    return Object.values(batchAccess || {}).some(p => p[perm]);
  }

  const handleNavigate = (page: string) => {
    onNavigate(page);
    onClose();
  };

  const getClickHandler = (name: string) => {
    switch (name) {
      case 'Students': return () => handleNavigate('active-students');
      case 'Tuition Fees': return () => handleNavigate('fees-options');
      case 'Attendance': return () => handleNavigate('select-batch-attendance');
      case 'Class Schedule': return () => handleNavigate('class-schedule');
      default: return () => onShowDevPopup(name);
    }
  }

  const availableFeatures = allFeatures.filter(feature => {
      switch (feature.name) {
          case 'Students': return Object.keys(batchAccess || {}).length > 0;
          case 'Attendance': return hasPermission('attendance');
          case 'Class Schedule': return Object.keys(batchAccess || {}).length > 0;
          case 'Tuition Fees': return hasPermission('fees');
          case 'Manage Exams': return hasPermission('exams');
          default: return false;
      }
  });
  
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <aside 
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sidenav-title"
      >
        <div className="flex flex-col h-full">
            <header className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                    <LogoIcon className="w-8 h-8 text-indigo-600"/>
                    <h2 id="sidenav-title" className="text-lg font-bold text-gray-800">Class Captain</h2>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100" aria-label="Close menu">
                    <XMarkIcon className="w-6 h-6 text-gray-600"/>
                </button>
            </header>

            <nav className="flex-grow overflow-y-auto py-4">
                <ul>
                    {availableFeatures.map(({ name, Icon }) => (
                        <li key={name}>
                            <button onClick={getClickHandler(name)} className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                                <Icon className="w-6 h-6 mr-4 text-gray-400"/>
                                <span className="font-medium">{name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            <footer className="p-4 border-t">
                 <button onClick={() => onShowDevPopup('My Account')} className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors rounded-lg">
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