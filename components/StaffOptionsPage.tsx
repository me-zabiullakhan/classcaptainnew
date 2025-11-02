import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { NewStaffIcon } from './icons/NewStaffIcon';
import { StudentsListIcon } from './icons/StudentsListIcon';
import { InactiveStudentsIcon } from './icons/InactiveStudentsIcon';
import { AttendanceIcon } from './icons/AttendanceIcon';
import { ReportsIcon } from './icons/ReportsIcon';

interface StaffOptionsPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const staffOptions = [
  { name: 'Add New Staff', Icon: NewStaffIcon, key: 'new-staff' },
  { name: 'Active Staff List', Icon: StudentsListIcon, key: 'staff-manager' },
  { name: 'Mark Staff Attendance', Icon: AttendanceIcon, key: 'mark-staff-attendance' },
  { name: 'Staff Attendance Report', Icon: ReportsIcon, key: 'staff-attendance-report' },
  { name: 'Inactive Staff List', Icon: InactiveStudentsIcon, key: 'inactive-staff' },
];

export function StaffOptionsPage({ onBack, onNavigate }: StaffOptionsPageProps): React.ReactNode {
  return (
    <div className="animate-fade-in flex flex-col h-full">
      <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back to dashboard">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold ml-2">Staff Options</h1>
      </header>

      <main className="flex-grow p-4 overflow-y-auto">
        <div className="space-y-4">
          {staffOptions.map(({ name, Icon, key }) => (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className="w-full bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center space-x-4 text-left"
            >
              <div className="w-10 h-10 text-indigo-500">
                <Icon />
              </div>
              <span className="text-lg font-medium text-indigo-800">{name}</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}