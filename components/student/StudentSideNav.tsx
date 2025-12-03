
import React from 'react';
import { SystemLogo } from '../SystemLogo';
import { XMarkIcon } from '../icons/XMarkIcon';
import { MyAcademyIcon } from '../icons/MyAcademyIcon';
import { LogoutIcon } from '../icons/LogoutIcon';
import { TimetableIcon } from '../icons/TimetableIcon';
import { AttendanceStudentIcon } from '../icons/AttendanceStudentIcon';
import { TuitionFeesStudentIcon } from '../icons/TuitionFeesStudentIcon';
import { ExamsIcon } from '../icons/ExamsIcon';
import { StudyMaterialStudentIcon } from '../icons/StudyMaterialStudentIcon';
import { HomeworkStudentIcon } from '../icons/HomeworkStudentIcon';
import { LeaveIcon } from '../icons/LeaveIcon';
import { NoticeIcon } from '../icons/NoticeIcon';
import { TransportIcon } from '../icons/TransportIcon';

interface StudentSideNavProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  systemLogoUrl?: string | null;
}

export function StudentSideNav({ isOpen, onClose, onNavigate, onLogout, systemLogoUrl }: StudentSideNavProps): React.ReactNode {
  const handleNavigate = (page: string) => {
    onNavigate(page);
    onClose();
  };

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
                    <SystemLogo url={systemLogoUrl} className="w-8 h-8 text-indigo-600" />
                    <h2 id="sidenav-title" className="text-lg font-bold text-gray-800">OptiLearn</h2>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100" aria-label="Close menu">
                    <XMarkIcon className="w-6 h-6 text-gray-600"/>
                </button>
            </header>

            {/* Navigation Links */}
            <nav className="flex-grow py-4">
                <ul>
                    <li>
                        <button onClick={() => handleNavigate('my-academy')} className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                            <MyAcademyIcon className="w-6 h-6 mr-4 text-gray-400"/>
                            <span className="font-medium">My Academy</span>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => handleNavigate('timetable')} className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                            <TimetableIcon className="w-6 h-6 mr-4 text-gray-400"/>
                            <span className="font-medium">Timetable</span>
                        </button>
                    </li>
                     <li>
                        <button onClick={() => handleNavigate('attendance')} className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                            <AttendanceStudentIcon className="w-6 h-6 mr-4 text-gray-400"/>
                            <span className="font-medium">Attendance</span>
                        </button>
                    </li>
                     <li>
                        <button onClick={() => handleNavigate('fee-status')} className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                            <TuitionFeesStudentIcon className="w-6 h-6 mr-4 text-gray-400"/>
                            <span className="font-medium">Fee Status</span>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => handleNavigate('student-exams')} className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                            <ExamsIcon className="w-6 h-6 mr-4 text-gray-400"/>
                            <span className="font-medium">Exams</span>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => handleNavigate('student-study-material')} className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                            <StudyMaterialStudentIcon className="w-6 h-6 mr-4 text-gray-400"/>
                            <span className="font-medium">Study Material</span>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => handleNavigate('student-homework')} className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                            <HomeworkStudentIcon className="w-6 h-6 mr-4 text-gray-400"/>
                            <span className="font-medium">Homework</span>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => handleNavigate('my-leave')} className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                            <LeaveIcon className="w-6 h-6 mr-4 text-gray-400"/>
                            <span className="font-medium">My Leave</span>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => handleNavigate('student-notice-board')} className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                            <NoticeIcon className="w-6 h-6 mr-4 text-gray-400"/>
                            <span className="font-medium">Notice Board</span>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => handleNavigate('student-transport')} className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                            <TransportIcon className="w-6 h-6 mr-4 text-gray-400"/>
                            <span className="font-medium">Transport</span>
                        </button>
                    </li>
                </ul>
            </nav>

            {/* Footer */}
            <footer className="p-4 border-t mt-auto">
                 <button onClick={onLogout} className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors rounded-lg">
                    <LogoutIcon className="w-6 h-6 mr-4 text-gray-400"/>
                    <span className="font-medium">Logout</span>
                </button>
            </footer>
        </div>
      </aside>
    </>
  );
}
