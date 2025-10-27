
import React from 'react';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { LeaveIcon } from '../icons/LeaveIcon';
import type { LeaveRequest } from '../../types';

interface StaffNotificationsPageProps {
    onBack: () => void;
    pendingLeaves: LeaveRequest[];
    onNavigate: (page: string) => void;
}

export function StaffNotificationsPage({ onBack, pendingLeaves, onNavigate }: StaffNotificationsPageProps) {
    return (
        <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Notifications</h1>
            </header>
            <main className="flex-grow p-4 overflow-y-auto">
                {pendingLeaves.length === 0 ? (
                    <div className="text-center py-20 px-4">
                        <p className="text-lg text-gray-500 dark:text-gray-400">No new notifications.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {pendingLeaves.map(leave => (
                            <button 
                                key={leave.id} 
                                onClick={() => onNavigate('leave-manager')} 
                                className="w-full text-left bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-start space-x-3"
                            >
                                <div className="flex-shrink-0 mt-1">
                                    <LeaveIcon className="w-5 h-5 text-orange-500" />
                                </div>
                                <div className="flex-1">
                                    <p>New Leave Request from <strong>{leave.userName}</strong>.</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{leave.requestedAt.toDate().toLocaleString()}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
