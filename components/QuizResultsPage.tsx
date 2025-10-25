
import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import type { Quiz, QuizSubmission, Student } from '../types';

interface QuizResultsPageProps {
  onBack: () => void;
  quiz: Quiz;
  submissions: QuizSubmission[];
  students: Student[];
}

export function QuizResultsPage({ onBack, quiz, submissions, students }: QuizResultsPageProps) {
    const sortedSubmissions = [...submissions].sort((a, b) => b.score - a.score);

    const getStudentPhoto = (studentId: string) => {
        const student = students.find(s => s.id === studentId);
        return student?.photo || `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(student?.name || ' ')}`;
    };

    return (
        <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <div className="ml-2">
                    <h1 className="text-xl font-bold">Quiz Results</h1>
                    <p className="text-sm opacity-90">{quiz.title}</p>
                </div>
            </header>

            <main className="flex-grow p-4 overflow-y-auto">
                <h2 className="text-lg font-bold text-center mb-4 text-gray-800 dark:text-gray-100">Leaderboard</h2>
                {sortedSubmissions.length === 0 ? (
                    <div className="text-center py-20 px-4">
                        <p className="text-lg text-gray-500 dark:text-gray-400">No submissions yet for this quiz.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {sortedSubmissions.map((sub, index) => (
                            <div key={sub.id} className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm flex items-center space-x-4">
                                <span className="font-bold text-lg text-gray-500 dark:text-gray-400 w-6 text-center">{index + 1}</span>
                                <img src={getStudentPhoto(sub.studentId)} alt={sub.studentName} className="w-10 h-10 rounded-full object-cover bg-gray-200" />
                                <div className="flex-grow">
                                    <p className="font-semibold text-gray-800 dark:text-gray-100">{sub.studentName}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{sub.studentRollNumber}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-xl text-indigo-600 dark:text-indigo-400">{sub.score.toFixed(2)}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">/ {sub.totalMarks}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
