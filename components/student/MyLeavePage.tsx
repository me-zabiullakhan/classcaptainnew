


import React from 'react';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import type { LeaveRequest, CurrentUser } from '../../types';
import { PlusIcon } from '../icons/PlusIcon';

interface MyLeavePageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
  currentUser: CurrentUser;
  leaveRequests: LeaveRequest[];
}

const getStatusColor = (status: LeaveRequest['status']) => {
    switch (status) {
        case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300';
        case 'Approved': return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300';
        case 'Rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300';
    }
};

export function MyLeavePage({ onBack, onNavigate, currentUser, leaveRequests }: MyLeavePageProps) {
    // FIX: Property 'id' does not exist on type '{ uid: string; email: string; }'. Added a type guard to ensure the user is a student or staff member before accessing properties like 'id'.
    const userId = (currentUser.role === 'student' || currentUser.role === 'staff') ? currentUser.data.id : null;

    const myRequests = leaveRequests
        .filter(req => req.userId === userId)
        .sort((a, b) => b.requestedAt.toMillis() - a.requestedAt.toMillis());

    return (
        <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">My Leave Requests</h1>
            </header>
            
            <main className="flex-grow p-4 overflow-y-auto">
                {myRequests.length === 0 ? (
                    <div className="text-center py-20 px-4">
                        <p className="text-lg text-gray-500 dark:text-gray-400">You haven't applied for any leave yet.</p>
                         <p className="text-gray-400 dark:text-gray-500">Click the <span className="font-bold text-indigo-500">+</span> button to apply.</p>
                    </div>
                ) : (
                    <div className="space-y-3 pb-20">
                        {myRequests.map(req => (
                            <div key={req.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {req.fromDate.toDate().toLocaleDateString()} - {req.toDate.toDate().toLocaleDateString()}
                                        </p>
                                        <p className="font-semibold text-gray-700 dark:text-gray-200 mt-1">{req.reason}</p>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusColor(req.status)}`}>
                                        {req.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <button
                onClick={() => onNavigate('apply-leave')}
                className="absolute bottom-20 right-6 bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-110"
                aria-label="Apply for new leave"
            >
                <PlusIcon className="w-8 h-8" />
            </button>
        </div>
    );
}