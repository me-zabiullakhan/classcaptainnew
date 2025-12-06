
import React, { useMemo } from 'react';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import type { Notice } from '../../types';
import { FileTextIcon } from '../icons/FileTextIcon';

const NoticeCard: React.FC<{ notice: Notice }> = ({ notice }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <h3 className="font-bold text-gray-800 dark:text-gray-100">{notice.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
                Posted on: {notice.createdAt.toDate().toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 whitespace-pre-wrap">{notice.description}</p>
            {notice.attachmentUrl && (
                <a href={notice.attachmentUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                    <FileTextIcon className="w-4 h-4" />
                    <span>{notice.attachmentName || 'View Attachment'}</span>
                </a>
            )}
        </div>
    );
};

export function StudentNoticeBoardPage({ onBack, notices }: { onBack: () => void; notices: Notice[] }) {
    
    const relevantNotices = useMemo(() => {
        const now = new Date();
        return notices
            .filter(n => (n.targetAudience === 'All' || n.targetAudience === 'Students') && n.expiryDate.toDate() >= now)
            .sort((a,b) => b.createdAt.toMillis() - a.createdAt.toMillis());
    }, [notices]);

    return (
        <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Notice Board</h1>
            </header>
            
            <main className="flex-grow p-4 overflow-y-auto">
                {relevantNotices.length === 0 ? (
                    <div className="text-center py-20 px-4">
                        <p className="text-lg text-gray-500 dark:text-gray-400">No new notices at the moment.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {relevantNotices.map(notice => (
                            <NoticeCard key={notice.id} notice={notice} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}