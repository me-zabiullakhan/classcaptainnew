import React from 'react';
import type { Batch, Student, AttendanceStatus } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { InfoIcon } from './icons/InfoIcon';
import { MoreVertIcon } from './icons/MoreVertIcon';

interface TakeAttendancePageProps {
  onBack: () => void;
  batch: Batch;
  students: Student[];
}

const attendanceStatuses: AttendanceStatus[] = ['Not Set', 'Holiday', 'Leave', 'Present', 'Absent'];

const StatusButton = ({ status, isActive, onClick }: { status: AttendanceStatus, isActive: boolean, onClick: () => void }) => {
    const baseClasses = 'px-3 py-1 text-xs rounded-md font-medium transition-colors';
    const activeClasses = 'bg-purple-500 text-white';
    const inactiveClasses = 'bg-gray-200 text-gray-600 hover:bg-gray-300';
    return (
        <button onClick={onClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
            {status}
        </button>
    );
};

const StudentAttendanceCard = ({ student, batch, status, onStatusChange }: { student: Student, batch: Batch, status: AttendanceStatus, onStatusChange: (studentId: string, status: AttendanceStatus) => void}) => {
    const course = batch.name.split(' - ')[0] || 'Class';
    return (
        <div className="bg-white p-3 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center">
                <div className="flex-1">
                    <p className="text-sm text-purple-700 font-semibold">{student.rollNumber || student.id}</p>
                    <p className="text-base font-bold text-gray-800">{student.name}</p>
                    <p className="text-xs text-gray-500">{batch.name}</p>
                </div>
                <div className="text-purple-600">
                    <InfoIcon className="w-6 h-6" />
                </div>
            </div>
            <div className="mt-3 flex flex-col items-center">
                 <p className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full mb-2">{course}</p>
                 <div className="flex space-x-1.5">
                    {attendanceStatuses.map(s => (
                        <StatusButton key={s} status={s} isActive={status === s} onClick={() => onStatusChange(student.id, s)} />
                    ))}
                 </div>
            </div>
        </div>
    );
};

export function TakeAttendancePage({ onBack, batch, students }: TakeAttendancePageProps): React.ReactNode {
    const [currentDate, setCurrentDate] = React.useState(new Date());
    const [attendance, setAttendance] = React.useState<Record<string, AttendanceStatus>>(() => {
        const initialState: Record<string, AttendanceStatus> = {};
        students.forEach(s => {
            initialState[s.id] = 'Not Set';
        });
        return initialState;
    });

    const handleDateChange = (direction: 'prev' | 'next') => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
            return newDate;
        });
    };

    const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
        setAttendance(prev => ({ ...prev, [studentId]: status }));
    };

    const handleSetAll = (status: AttendanceStatus) => {
        const newAttendance: Record<string, AttendanceStatus> = {};
        students.forEach(s => {
            newAttendance[s.id] = status;
        });
        setAttendance(newAttendance);
    };

    const formattedDate = currentDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');

    return (
        <div className="bg-slate-100 flex flex-col h-screen animate-fade-in">
            <header className="bg-purple-600 text-white p-3 flex items-center justify-between shadow-md flex-shrink-0">
                <div className="flex items-center">
                    <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-purple-700" aria-label="Go back">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-bold ml-2">Take Attendance</h1>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="text-sm font-medium">SMS</button>
                    <button className="p-1 rounded-full hover:bg-purple-700">
                        <MoreVertIcon className="w-6 h-6" />
                    </button>
                </div>
            </header>

            <div className="bg-purple-800 text-white p-2 flex items-center justify-between">
                <button onClick={() => handleDateChange('prev')} className="p-2 rounded-full hover:bg-purple-700">
                    <ArrowLeftIcon className="w-5 h-5" />
                </button>
                <span className="font-bold text-lg">{formattedDate}</span>
                <button onClick={() => handleDateChange('next')} className="p-2 rounded-full hover:bg-purple-700">
                    <ArrowRightIcon className="w-5 h-5" />
                </button>
            </div>
            
            <div className="p-2 text-center">
                 <p className="text-xs text-gray-500 mb-1">Click to set all</p>
                 <div className="flex space-x-1.5 justify-center">
                    {attendanceStatuses.map(s => (
                        <StatusButton key={s} status={s} isActive={false} onClick={() => handleSetAll(s)} />
                    ))}
                 </div>
            </div>
            
            <main className="flex-grow p-2 sm:p-3 overflow-y-auto">
                {students.length > 0 ? (
                    <div className="space-y-3 pb-4">
                        {students.map(student => (
                            <StudentAttendanceCard 
                                key={student.id} 
                                student={student}
                                batch={batch}
                                status={attendance[student.id] || 'Not Set'}
                                onStatusChange={handleStatusChange}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 px-4">
                        <p className="text-lg text-gray-500">No active students found in this batch.</p>
                        <p className="text-sm text-gray-400 mt-2">Add students to this batch to take attendance.</p>
                    </div>
                )}
            </main>
        </div>
    );
}