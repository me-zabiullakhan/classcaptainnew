

import React from 'react';
import type { FeatureItem, Academy, Staff, BatchAccessPermissions } from '../../types';
import { FeatureIcon } from '../FeatureIcon';
import { StudentsIcon } from '../icons/StudentsIcon';
import { AttendanceIcon } from '../icons/AttendanceIcon';
import { FeesIcon } from '../icons/FeesIcon';
import { ExamsIcon } from '../icons/ExamsIcon';
import { NoticeIcon } from '../icons/NoticeIcon';
import { IncomeIcon } from '../icons/IncomeIcon';
import { TimetableIcon } from '../icons/TimetableIcon';

const permissionBasedFeatures: FeatureItem[] = [
  { name: 'Students', Icon: StudentsIcon, color: 'bg-blue-600' },
  { name: 'Attendance', Icon: AttendanceIcon, color: 'bg-purple-600' },
  { name: 'Class Schedule', Icon: TimetableIcon, color: 'bg-pink-500' },
  { name: 'Tuition Fees', Icon: FeesIcon, color: 'bg-emerald-500' },
  { name: 'Manage Exams', Icon: ExamsIcon, color: 'bg-lime-500' },
];

const defaultFeatures: FeatureItem[] = [
    { name: 'Staff Attendance', Icon: AttendanceIcon, color: 'bg-sky-500' },
    { name: 'Notice Board', Icon: NoticeIcon, color: 'bg-cyan-600' },
    { name: 'Salary Details', Icon: IncomeIcon, color: 'bg-orange-500' },
];


interface StaffDashboardPageProps {
    onNavigate: (page: string) => void;
    academy: Academy;
    staff: Staff;
    onShowDevPopup: (featureName: string) => void;
}

export function StaffDashboardPage({ onNavigate, academy, staff, onShowDevPopup }: StaffDashboardPageProps): React.ReactNode {
  const { batchAccess } = staff;

  const placeholderPhoto = `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(staff.name)}`;

  const hasPermission = (perm: keyof BatchAccessPermissions) => {
    return Object.values(batchAccess || {}).some(p => p[perm]);
  }

  const availableFeatures = permissionBasedFeatures.filter(feature => {
      switch (feature.name) {
          case 'Students':
              return Object.keys(batchAccess || {}).length > 0;
          case 'Attendance':
              return hasPermission('attendance');
          case 'Class Schedule':
              return Object.keys(batchAccess || {}).length > 0;
          case 'Tuition Fees':
              return hasPermission('fees');
          case 'Manage Exams':
              return hasPermission('exams');
          default:
              return false;
      }
  });

  const allVisibleFeatures = [...availableFeatures, ...defaultFeatures];

  const getClickHandler = (name: string) => {
    switch (name) {
      case 'Students': return () => onNavigate('active-students');
      case 'Tuition Fees': return () => onNavigate('select-batch-for-fees');
      case 'Attendance': return () => onNavigate('select-batch-attendance');
      case 'Class Schedule': return () => onNavigate('class-schedule');
      default: return () => onShowDevPopup(name);
    }
  }

  return (
    <main className="flex-grow p-4 space-y-4 overflow-y-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-4">
            <img
                src={staff.photo || placeholderPhoto}
                alt={staff.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500"
            />
            <div>
                <h3 className="text-lg font-bold text-gray-800">{staff.name.toUpperCase()}</h3>
                <p className="text-sm text-gray-600">{staff.staffId}</p>
            </div>
        </div>

        {/* Features Grid */}
        <div className="bg-white rounded-lg shadow-sm p-4">
             <div className="grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-3 sm:gap-x-4 text-center">
                {allVisibleFeatures.map((feature) => (
                  <FeatureIcon
                      key={feature.name}
                      {...feature}
                      onClick={getClickHandler(feature.name)}
                  />
                ))}
              </div>
        </div>
    </main>
  );
}