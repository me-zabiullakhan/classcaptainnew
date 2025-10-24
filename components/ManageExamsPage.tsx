

import React, { useState } from 'react';
import type { Exam, BatchAccessPermissions } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { PlusIcon } from './icons/PlusIcon';
import { PencilIcon } from './icons/PencilIcon';
import { FileTextIcon } from './icons/FileTextIcon';
import { ArrowUpTrayIcon } from './icons/ArrowUpTrayIcon';

interface ManageExamsPageProps {
  onBack: () => void;
  exams: Exam[];
  onNavigate: (page: string, params?: { [key: string]: any }) => void;
  staffPermissions?: Record<string, BatchAccessPermissions>;
  onPublish: (examId: string, status: 'Published' | 'Draft') => Promise<void>;
}

const ExamCard: React.FC<{ exam: Exam; onNavigate: (page: string, params?: { [key: string]: any }) => void; onPublish: () => Promise<void>; isPublishing: boolean; }> = ({ exam, onNavigate, onPublish, isPublishing }) => {
    
    const handlePublishClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!window.confirm("Are you sure you want to publish the results? This will make them visible to students.")) return;
        onPublish();
    };
    
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-l-4 border-lime-400">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 uppercase">{exam.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{exam.batchName} &middot; {exam.subject}</p>
                </div>
                 <span className={`text-xs px-2 py-1 rounded-full font-semibold ${exam.resultStatus === 'Published' ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'}`}>
                    {exam.resultStatus}
                </span>
            </div>
            <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                <p>Date: {exam.date.toDate().toLocaleDateString('en-GB')}</p>
                <p>Max Marks: {exam.maxMarks} | Passing: {exam.passingMarks}</p>
            </div>
            <div className="border-t dark:border-gray-700 mt-4 pt-3 flex justify-end space-x-2">
                <button onClick={() => onNavigate('create-exam', { examId: exam.id })} className="flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <FileTextIcon className="w-4 h-4" />
                    <span>Details</span>
                </button>
                <button onClick={() => onNavigate('record-marks', { examId: exam.id })} className="flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors">
                    <PencilIcon className="w-4 h-4" />
                    <span>Record Marks</span>
                </button>
                {exam.resultStatus === 'Draft' && (
                    <button onClick={handlePublishClick} disabled={isPublishing} className="flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-green-400 transition-colors">
                        <ArrowUpTrayIcon className="w-4 h-4" />
                        <span>{isPublishing ? 'Publishing...' : 'Publish'}</span>
                    </button>
                )}
            </div>
        </div>
    )
};

export function ManageExamsPage({ onBack, exams, onNavigate, staffPermissions, onPublish }: ManageExamsPageProps) {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
    const [publishingId, setPublishingId] = useState<string | null>(null);

    const now = new Date();
    const accessibleExams = exams.filter(exam => {
        if (!staffPermissions) return true; // Admin has access to all
        return !!staffPermissions[exam.batchId]?.exams;
    });

    const upcomingExams = accessibleExams.filter(e => e.date.toDate() >= now).sort((a,b) => a.date.toMillis() - b.date.toMillis());
    const completedExams = accessibleExams.filter(e => e.date.toDate() < now).sort((a,b) => b.date.toMillis() - a.date.toMillis());

    const examsToShow = activeTab === 'upcoming' ? upcomingExams : completedExams;
    
    const handlePublish = async (examId: string) => {
        setPublishingId(examId);
        try {
            await onPublish(examId, 'Published');
        } catch (e) {
            // Error is handled in App.tsx with an alert
        } finally {
            setPublishingId(null);
        }
    };

    return (
        <div className="animate-fade-in flex flex-col h-full">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Manage Exams</h1>
            </header>
            <div className="p-2 bg-white dark:bg-gray-800 shadow-sm flex-shrink-0">
                <div className="flex justify-around bg-gray-100 dark:bg-gray-900 p-1 rounded-lg">
                    <button onClick={() => setActiveTab('upcoming')} className={`w-full py-2 rounded-md font-semibold ${activeTab === 'upcoming' ? 'bg-indigo-600 text-white' : 'dark:text-gray-300'}`}>Upcoming</button>
                    <button onClick={() => setActiveTab('completed')} className={`w-full py-2 rounded-md font-semibold ${activeTab === 'completed' ? 'bg-indigo-600 text-white' : 'dark:text-gray-300'}`}>Completed</button>
                </div>
            </div>

            <main className="flex-grow p-4 overflow-y-auto">
                {examsToShow.length === 0 ? (
                    <div className="text-center py-20 px-4">
                        <p className="text-lg text-gray-500 dark:text-gray-400">No {activeTab} exams found.</p>
                        <p className="text-gray-400 dark:text-gray-500">Click the <span className="font-bold text-indigo-500">+</span> button to create one.</p>
                    </div>
                ) : (
                    <div className="space-y-4 pb-20">
                        {examsToShow.map(exam => (
                            <ExamCard key={exam.id} exam={exam} onNavigate={onNavigate} onPublish={() => handlePublish(exam.id)} isPublishing={publishingId === exam.id} />
                        ))}
                    </div>
                )}
            </main>

            <button
                onClick={() => onNavigate('create-exam')}
                className="absolute bottom-6 right-6 bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-label="Create New Exam"
            >
                <PlusIcon className="w-8 h-8" />
            </button>
        </div>
    );
}