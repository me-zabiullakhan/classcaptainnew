import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import type { Quiz, Student } from '../../types';
import { db } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { LoadingSpinner } from '../LoadingSpinner';

interface StudentQuizzesPageProps {
  onBack: () => void;
  quizzes: Quiz[];
  student: Student;
  onNavigate: (page: string, params: { [key: string]: any }) => void;
  academyId: string;
}

const QuizCard: React.FC<{
    quiz: Quiz;
    status: 'upcoming' | 'active' | 'completed';
    onNavigate: StudentQuizzesPageProps['onNavigate'];
}> = ({ quiz, status, onNavigate }) => {
    
    const handleAction = () => {
        if (status === 'active') {
            onNavigate('take-quiz', { quizId: quiz.id });
        } else if (status === 'completed') {
            onNavigate('quiz-result', { quizId: quiz.id });
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <h3 className="font-bold text-gray-800 dark:text-gray-100">{quiz.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{quiz.batchName} &middot; {quiz.subject}</p>
            <div className="text-xs text-gray-600 dark:text-gray-300 mt-2">
                <p>Date: {quiz.dateTime.toDate().toLocaleString()}</p>
                <p>Duration: {quiz.duration} mins | Total Marks: {quiz.totalMarks}</p>
            </div>
            <div className="mt-4 flex justify-end">
                {status === 'upcoming' && <button disabled className="px-4 py-2 text-sm font-semibold text-gray-500 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-not-allowed">Starts Soon</button>}
                {status === 'active' && <button onClick={handleAction} className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700">Start Quiz</button>}
                {status === 'completed' && <button onClick={handleAction} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">View Result</button>}
            </div>
        </div>
    );
};


export function StudentQuizzesPage({ onBack, quizzes, student, onNavigate, academyId }: StudentQuizzesPageProps) {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'active' | 'completed'>('active');
    const [submittedQuizIds, setSubmittedQuizIds] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSubmissions = async () => {
            setIsLoading(true);
            const submittedIds = new Set<string>();
            const studentBatchNames = new Set(student.batches);
            const relevantQuizzes = quizzes.filter(q => studentBatchNames.has(q.batchName) && q.status === 'Published');

            for (const quiz of relevantQuizzes) {
                const subRef = doc(db, `academies/${academyId}/quizzes/${quiz.id}/submissions`, student.id);
                try {
                    const docSnap = await getDoc(subRef);
                    if (docSnap.exists()) {
                        submittedIds.add(quiz.id);
                    }
                } catch (error) {
                    console.error(`Error checking submission for quiz ${quiz.id}:`, error);
                }
            }
            setSubmittedQuizIds(submittedIds);
            setIsLoading(false);
        };
        fetchSubmissions();
    }, [quizzes, student.id, student.batches, academyId]);

    const { upcoming, active, completed } = useMemo(() => {
        const studentBatchNames = new Set(student.batches);
        const relevantQuizzes = quizzes.filter(q => studentBatchNames.has(q.batchName) && q.status === 'Published');

        const upcoming: Quiz[] = [];
        const active: Quiz[] = [];
        const completed: Quiz[] = [];

        const now = new Date();

        relevantQuizzes.forEach(quiz => {
            const startTime = quiz.dateTime.toDate();
            const endTime = new Date(startTime.getTime() + quiz.duration * 60000);

            if (submittedQuizIds.has(quiz.id)) {
                 completed.push(quiz);
            } else if (now < startTime) {
                upcoming.push(quiz);
            } else if (now >= startTime && now <= endTime) {
                active.push(quiz);
            }
        });
        
        // Sort for consistent order
        upcoming.sort((a,b) => a.dateTime.toMillis() - b.dateTime.toMillis());
        active.sort((a,b) => a.dateTime.toMillis() - b.dateTime.toMillis());
        completed.sort((a,b) => b.dateTime.toMillis() - a.dateTime.toMillis());

        return { upcoming, active, completed };

    }, [quizzes, student.batches, submittedQuizIds]);

    const quizzesToShow = activeTab === 'upcoming' ? upcoming : activeTab === 'active' ? active : completed;

    return (
        <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Online Quizzes</h1>
            </header>
            <div className="p-2 bg-white dark:bg-gray-800 shadow-sm flex-shrink-0">
                <div className="flex justify-around bg-gray-100 dark:bg-gray-900 p-1 rounded-lg">
                    <button onClick={() => setActiveTab('active')} className={`w-full py-2 rounded-md font-semibold ${activeTab === 'active' ? 'bg-indigo-600 text-white' : 'dark:text-gray-300'}`}>Active</button>
                    <button onClick={() => setActiveTab('upcoming')} className={`w-full py-2 rounded-md font-semibold ${activeTab === 'upcoming' ? 'bg-indigo-600 text-white' : 'dark:text-gray-300'}`}>Upcoming</button>
                    <button onClick={() => setActiveTab('completed')} className={`w-full py-2 rounded-md font-semibold ${activeTab === 'completed' ? 'bg-indigo-600 text-white' : 'dark:text-gray-300'}`}>Completed</button>
                </div>
            </div>
            
            <main className="flex-grow p-4 overflow-y-auto">
                {isLoading ? <LoadingSpinner message="Loading quizzes..." /> : quizzesToShow.length === 0 ? (
                     <div className="text-center py-20 px-4">
                        <p className="text-lg text-gray-500 dark:text-gray-400">No {activeTab} quizzes found.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {quizzesToShow.map(quiz => (
                            <QuizCard key={quiz.id} quiz={quiz} status={activeTab} onNavigate={onNavigate} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
