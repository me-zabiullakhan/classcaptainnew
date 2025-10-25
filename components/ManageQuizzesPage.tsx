
import React, { useState } from 'react';
import type { Quiz, BatchAccessPermissions } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { PlusIcon } from './icons/PlusIcon';
import { PencilIcon } from './icons/PencilIcon';
import { TrashIcon } from './icons/TrashIcon';
import { FileTextIcon } from './icons/FileTextIcon';

interface ManageQuizzesPageProps {
  onBack: () => void;
  quizzes: Quiz[];
  onNavigate: (page: string, params?: { [key: string]: any }) => void;
  staffPermissions?: Record<string, BatchAccessPermissions>;
  onDelete: (quizId: string) => Promise<void>;
  onShowDevPopup: (featureName: string) => void;
}

const QuizCard: React.FC<{ 
    quiz: Quiz; 
    onNavigate: ManageQuizzesPageProps['onNavigate']; 
    onDelete: ManageQuizzesPageProps['onDelete']; 
    onShowDevPopup: ManageQuizzesPageProps['onShowDevPopup'];
}> = ({ quiz, onNavigate, onDelete, onShowDevPopup }) => {
    
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-l-4 border-teal-500">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">{quiz.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{quiz.batchName} &middot; {quiz.subject}</p>
                </div>
                 <span className={`text-xs px-2 py-1 rounded-full font-semibold bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200`}>
                    {quiz.status}
                </span>
            </div>
            <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                <p>Date: {quiz.dateTime.toDate().toLocaleString('en-GB')}</p>
                <p>Duration: {quiz.duration} mins | Marks: {quiz.totalMarks}</p>
            </div>
            <div className="border-t dark:border-gray-700 mt-4 pt-3 flex flex-wrap justify-end gap-2">
                <button onClick={() => onNavigate('quiz-results', { quizId: quiz.id })} className="flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                    <span>View Results</span>
                </button>
                <button onClick={() => onNavigate('edit-quiz', { quizId: quiz.id })} className="flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <PencilIcon className="w-4 h-4" />
                    <span>Edit</span>
                </button>
                 <button onClick={() => onDelete(quiz.id)} className="flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-100 dark:bg-red-900/40 rounded-md hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors">
                    <TrashIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
};

export function ManageQuizzesPage({ onBack, quizzes, onNavigate, staffPermissions, onDelete, onShowDevPopup }: ManageQuizzesPageProps) {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');

    const now = new Date();
    const accessibleQuizzes = quizzes.filter(quiz => {
        if (!staffPermissions) return true; // Admin has access to all
        return !!staffPermissions[quiz.batchId]?.onlineQuiz;
    });

    const upcomingQuizzes = accessibleQuizzes.filter(e => e.dateTime.toDate() >= now).sort((a,b) => a.dateTime.toMillis() - b.dateTime.toMillis());
    const completedQuizzes = accessibleQuizzes.filter(e => e.dateTime.toDate() < now).sort((a,b) => b.dateTime.toMillis() - a.dateTime.toMillis());

    const quizzesToShow = activeTab === 'upcoming' ? upcomingQuizzes : completedQuizzes;

    return (
        <div className="animate-fade-in flex flex-col h-full">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Manage Quizzes</h1>
            </header>
            <div className="p-2 bg-white dark:bg-gray-800 shadow-sm flex-shrink-0">
                <div className="flex justify-around bg-gray-100 dark:bg-gray-900 p-1 rounded-lg">
                    <button onClick={() => setActiveTab('upcoming')} className={`w-full py-2 rounded-md font-semibold ${activeTab === 'upcoming' ? 'bg-indigo-600 text-white' : 'dark:text-gray-300'}`}>Upcoming</button>
                    <button onClick={() => setActiveTab('completed')} className={`w-full py-2 rounded-md font-semibold ${activeTab === 'completed' ? 'bg-indigo-600 text-white' : 'dark:text-gray-300'}`}>Completed</button>
                </div>
            </div>

            <main className="flex-grow p-4 overflow-y-auto">
                {quizzesToShow.length === 0 ? (
                    <div className="text-center py-20 px-4">
                        <p className="text-lg text-gray-500 dark:text-gray-400">No {activeTab} quizzes found.</p>
                        <p className="text-gray-400 dark:text-gray-500">Click the <span className="font-bold text-indigo-500">+</span> button to create one.</p>
                    </div>
                ) : (
                    <div className="space-y-4 pb-20">
                        {quizzesToShow.map(quiz => (
                            <QuizCard key={quiz.id} quiz={quiz} onNavigate={onNavigate} onDelete={onDelete} onShowDevPopup={onShowDevPopup}/>
                        ))}
                    </div>
                )}
            </main>

            <button
                onClick={() => onNavigate('create-quiz')}
                className="absolute bottom-20 right-6 bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-label="Create New Quiz"
            >
                <PlusIcon className="w-8 h-8" />
            </button>
        </div>
    );
}
