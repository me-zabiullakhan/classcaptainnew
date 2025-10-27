

import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { EnquiryIcon } from './icons/EnquiryIcon';
import { LeaveIcon } from './icons/LeaveIcon';
import { AttendanceIcon } from './icons/AttendanceIcon';
import type { Enquiry, LeaveRequest, Batch } from '../types';

interface NotificationsPageProps {
    onBack: () => void;
    enquiries: Enquiry[];
    leaveRequests: LeaveRequest[];
    unmarkedAttendanceBatches: Batch[];
    onNavigate: (page: string) => void;
}

export function NotificationsPage({ onBack, enquiries, leaveRequests, unmarkedAttendanceBatches, onNavigate }: NotificationsPageProps) {
    
    const notifications = [
        ...enquiries.map(e => ({ type: 'enquiry', data: e, time: e.createdAt.toDate() })),
        ...leaveRequests.map(l => ({ type: 'leave', data: l, time: l.requestedAt.toDate() })),
        ...unmarkedAttendanceBatches.map(b => ({ type: 'attendance', data: b, time: new Date() }))
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
                            <button 
                                key={index} 
                                onClick={() => onNavigate(notif.type === 'enquiry' ? 'enquiry-manager' : notif.type === 'leave' ? 'leave-manager' : 'select-batch-attendance')} 
                                className="w-full text-left bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-start space-x-3"
                            >
                                <div className="flex-shrink-0 mt-1">
                                    {notif.type === 'enquiry' ? <EnquiryIcon className="w-5 h-5 text-blue-500" /> 
                                     : notif.type === 'leave' ? <LeaveIcon className="w-5 h-5 text-orange-500" /> 
                                     : <AttendanceIcon className="w-5 h-5 text-purple-500" />
                                    }
                                </div>
                                <div className="flex-1">
                                    {notif.type === 'enquiry' ? 
                                        <p>New Enquiry from <strong>{(notif.data as Enquiry).studentName}</strong> for batch {(notif.data as Enquiry).interestedBatch}.</p>
                                        : notif.type === 'leave' ?
                                        <p>New Leave Request from <strong>{(notif.data as LeaveRequest).userName}</strong>.</p>
                                        :
                                        <p>Attendance for batch <strong>{(notif.data as Batch).name}</strong> has not been marked for today.</p>
                                    }
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.time.toLocaleString()}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}