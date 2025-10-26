

import React, { useState, useMemo } from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import type { LeaveRequest, CurrentUser, Student, Staff, Batch } from '../types';
import { CheckIcon } from './icons/CheckIcon';
import { XMarkIcon } from './icons/XMarkIcon';
import { LinkIcon } from './icons/LinkIcon';

interface LeaveManagerPageProps {
  onBack: () => void;
  leaveRequests: LeaveRequest[];
  students: Student[];
  staff: Staff[];
  currentUser: CurrentUser;
  batches: Batch[];
  onUpdateStatus: (id: string, status: 'Approved' | 'Rejected') => Promise<void>;
}

type TabStatus = 'Pending' | 'Approved' | 'Rejected';

const LeaveCard: React.FC<{ request: LeaveRequest; onUpdateStatus: LeaveManagerPageProps['onUpdateStatus'] }> = ({ request, onUpdateStatus }) => {
    
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-100">{request.userName}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {request.userRole === 'student' ? `Roll No: ${request.userRollNumber}` : 'Staff'}
                    </p>
                </div>
                <div className="text-right text-xs">
                    <p>From: {request.fromDate.toDate().toLocaleDateString()}</p>
                    <p>To: {request.toDate.toDate().toLocaleDateString()}</p>
                </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 italic">"{request.reason}"</p>
            {request.attachmentUrl && (
                 <a href={request.attachmentUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                    <LinkIcon className="w-4 h-4" />
                    <span>View Attachment</span>
                </a>
            )}
            {request.status === 'Pending' && (
                <div className="border-t dark:border-gray-700 mt-4 pt-3 flex justify-end space-x-2">
                    <button onClick={() => onUpdateStatus(request.id, 'Rejected')} className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-100 rounded-md hover:bg-red-200">
                        <XMarkIcon className="w-4 h-4" /> Reject
                    </button>
                    <button onClick={() => onUpdateStatus(request.id, 'Approved')} className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-green-600 rounded-md hover:bg-green-700">
                        <CheckIcon className="w-4 h-4" /> Approve
                    </button>
                </div>
            )}
            {request.status !== 'Pending' && (
                <div className="border-t dark:border-gray-700 mt-2 pt-2 text-xs text-gray-500 dark:text-gray-400">
                    Reviewed by {request.reviewedBy} on {request.reviewedAt?.toDate().toLocaleDateString()}
                </div>
            )}
        </div>
    );
};

export function LeaveManagerPage({ onBack, leaveRequests, students, staff, currentUser, batches, onUpdateStatus }: LeaveManagerPageProps) {
    const [activeTab, setActiveTab] = useState<TabStatus>('Pending');

    const visibleRequests = useMemo(() => {
        let filtered = leaveRequests;

        if (currentUser.role === 'staff') {
            const staffData = currentUser.data;
            // Get batch IDs where staff has leaveRequests permission
            const permittedBatchIds = Object.keys(staffData.batchAccess || {}).filter(
                batchId => staffData.batchAccess[batchId]?.leaveRequests
            );
            // Get the names of those batches
            const permittedBatchNames = new Set(
                batches.filter(b => permittedBatchIds.includes(b.id)).map(b => b.name)
            );
            // Get IDs of students who are in any of the permitted batches
            const permittedStudentIds = new Set(
                students.filter(s => s.batches.some(b => permittedBatchNames.has(b)))
                       .map(s => s.id)
            );

            // Staff can only see student requests from their permitted batches
            filtered = leaveRequests.filter(req => req.userRole === 'student' && permittedStudentIds.has(req.userId));
        }
        
        return filtered.filter(req => req.status === activeTab)
                       .sort((a, b) => b.requestedAt.toMillis() - a.requestedAt.toMillis());

    }, [leaveRequests, currentUser, students, batches, activeTab]);

    return (
        <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Leave Manager</h1>
            </header>
            <div className="p-2 bg-white dark:bg-gray-800 shadow-sm flex-shrink-0">
                <div className="flex justify-around bg-gray-100 dark:bg-gray-900 p-1 rounded-lg">
                    {(['Pending', 'Approved', 'Rejected'] as TabStatus[]).map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full py-2 rounded-md font-semibold ${activeTab === tab ? 'bg-indigo-600 text-white' : 'dark:text-gray-300'}`}>
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <main className="flex-grow p-4 overflow-y-auto">
                {visibleRequests.length === 0 ? (
                    <div className="text-center py-20 px-4">
                        <p className="text-lg text-gray-500 dark:text-gray-400">No {activeTab.toLowerCase()} requests found.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {visibleRequests.map(req => (
                            <LeaveCard key={req.id} request={req} onUpdateStatus={onUpdateStatus} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}