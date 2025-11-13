

import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { EnquiryIcon } from './icons/EnquiryIcon';
import { LeaveIcon } from './icons/LeaveIcon';
import { AttendanceIcon } from './icons/AttendanceIcon';
import { TimetableIcon } from './icons/TimetableIcon';
import type { Enquiry, LeaveRequest, Batch } from '../types';

interface NotificationsPageProps {
    onBack: () => void;
    enquiries: Enquiry[];
    leaveRequests: LeaveRequest[];
    unmarkedAttendanceBatches: Batch[];
    scheduleAlerts: { type: string; data: { message: string }; time: Date }[];
    onNavigate: (page: string) => void;
}

// A helper function to create a notification item, making the main component cleaner.
const NotificationItem: React.FC<{
    type: string;
    data: any;
    time: Date;
    onNavigate: (page: string) => void;
}> = ({ type, data, time, onNavigate }) => {
    let message: React.ReactNode = null;
    let icon: React.ReactNode = null;
    let navigationPage: string = 'dashboard';

    switch (type) {
        case 'enquiry':
            const enquiry = data as Enquiry;
            message = <p>New Enquiry from <strong>{enquiry.studentName}</strong> for batch {enquiry.interestedBatch}.</p>;
            icon = <EnquiryIcon className="w-5 h-5 text-blue-500" />;
            navigationPage = 'enquiry-manager';
            break;
        case 'leave':
            const leave = data as LeaveRequest;
            message = <p>New Leave Request from <strong>{leave.userName}</strong>.</p>;
            icon = <LeaveIcon className="w-5 h-5 text-orange-500" />;
            navigationPage = 'leave-manager';
            break;
        case 'attendance':
            const batch = data as Batch;
            message = <p>Attendance for batch <strong>{batch.name}</strong> has not been marked for today.</p>;
            icon = <AttendanceIcon className="w-5 h-5 text-purple-500" />;
            navigationPage = 'select-batch-attendance';
            break;
        case 'schedule':
            const schedule = data as { message: string };
            message = <p><strong>Schedule Alert:</strong> {schedule.message}</p>;
            icon = <TimetableIcon className="w-5 h-5 text-pink-500" />;
            navigationPage = 'schedule-classes';
            break;
        default:
            return null;
    }

    return (
        <button 
            onClick={() => onNavigate(navigationPage)} 
            className="w-full text-left bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-start space-x-3"
        >
            <div className="flex-shrink-0 mt-1">{icon}</div>
            <div className="flex-1">
                {message}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{time.toLocaleString()}</p>
            </div>
        </button>
    );
};


export function NotificationsPage({ onBack, enquiries, leaveRequests, unmarkedAttendanceBatches, scheduleAlerts, onNavigate }: NotificationsPageProps) {
    
    const notifications = [
        ...enquiries.map(e => ({ type: 'enquiry', data: e, time: e.createdAt.toDate() })),
        ...leaveRequests.map(l => ({ type: 'leave', data: l, time: l.requestedAt.toDate() })),
        ...unmarkedAttendanceBatches.map(b => ({ type: 'attendance', data: b, time: new Date() })),
        ...scheduleAlerts,
    ].sort((a, b) => b.time.getTime() - a.time.getTime());

    return (
        <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Notifications</h1>
            </header>
            <main className="flex-grow p-4 overflow-y-auto">
                {notifications.length === 0 ? (
                    <div className="text-center py-20 px-4">
                        <p className="text-lg text-gray-500 dark:text-gray-400">No new notifications.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {notifications.map((notif, index) => (
                           <NotificationItem 
                             key={`${notif.type}-${(notif.data as any).id || index}`}
                             type={notif.type}
                             data={notif.data}
                             time={notif.time}
                             onNavigate={onNavigate}
                           />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}