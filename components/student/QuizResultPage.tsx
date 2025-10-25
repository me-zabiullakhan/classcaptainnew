
import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import type { Quiz, QuizQuestion, QuizSubmission } from '../../types';
import { db } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { CheckIcon } from '../icons/CheckIcon';
import { XMarkIcon } from '../icons/XMarkIcon';

interface QuizResultPageProps {
  onBack: () => void;
  quiz: Quiz;
  studentId: string;
  academyId: string;
}

const QuestionResult: React.FC<{ question: QuizQuestion, studentAnswerIndex?: number }> = ({ question, studentAnswerIndex }) => {
    const isCorrect = studentAnswerIndex === question.correctAnswerIndex;
    
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <p className="font-semibold text-gray-800 dark:text-gray-100 mb-3">{question.questionText}</p>
            <div className="space-y-2">
                {question.options.map((option, index) => {
                    const isStudentAnswer = studentAnswerIndex === index;
                    const isCorrectAnswer = question.correctAnswerIndex === index;
                    
                    let bgColor = 'bg-gray-100 dark:bg-gray-700';
                    if (isCorrectAnswer) bgColor = 'bg-green-100 dark:bg-green-900/50';
                    if (isStudentAnswer && !isCorrect) bgColor = 'bg-red-100 dark:bg-red-900/50';

                    return (
                        <div key={index} className={`p-2 rounded-md flex items-center gap-3 text-sm ${bgColor}`}>
                            {isCorrectAnswer ? <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0" /> : isStudentAnswer ? <XMarkIcon className="w-5 h-5 text-red-600 flex-shrink-0" /> : <div className="w-5 h-5 flex-shrink-0"></div>}
                            <span className="text-gray-700 dark:text-gray-200">{option}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export function QuizResultPage({ onBack, quiz, studentId, academyId }: QuizResultPageProps) {
    const [submission, setSubmission] = useState<QuizSubmission | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSubmission = async () => {
            setIsLoading(true);
            const subRef = doc(db, `academies/${academyId}/quizzes/${quiz.id}/submissions`, studentId);
            const docSnap = await getDoc(subRef);
            if (docSnap.exists()) {
                setSubmission({ id: docSnap.id, ...docSnap.data() } as QuizSubmission);
            }
            setIsLoading(false);
        };
        fetchSubmission();
    }, [academyId, quiz.id, studentId]);
    
    const percentage = submission ? (submission.score / submission.totalMarks) * 100 : 0;

    return (
        <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Quiz Result</h1>
            </header>

            <main className="flex-grow p-4 overflow-y-auto">
                {isLoading ? (
                    <p className="text-center text-gray-500">Loading your result...</p>
                ) : !submission ? (
                    <p className="text-center text-red-500">Could not find your submission for this quiz.</p>
                ) : (
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center">
                            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">{quiz.title}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{quiz.subject}</p>
                            <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mt-4">
                                {submission.score.toFixed(2)} / <span className="text-2xl text-gray-500">{submission.totalMarks}</span>
                            </p>
                             <p className="font-semibold text-lg">{percentage.toFixed(2)}%</p>
                        </div>
                        
                        <h3 className="font-bold text-gray-700 dark:text-gray-200 pt-4">Answer Review</h3>
                        {quiz.questions.map(q => (
                            <QuestionResult key={q.id} question={q} studentAnswerIndex={submission.answers[q.id]} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
