import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../icons/ArrowRightIcon';
import type { Quiz } from '../../types';
import { CheckCircleIcon } from '../icons/CheckCircleIcon';
import { LoadingSpinner } from '../LoadingSpinner';

interface TakeQuizPageProps {
  onBack: () => void;
  quiz: Quiz;
  onSaveSubmission: (quizId: string, answers: Record<string, number>) => Promise<void>;
  studentId: string;
  academyId: string;
}

const ConfirmSubmitModal: React.FC<{ onConfirm: () => void; onCancel: () => void; unansweredCount: number }> = ({ onConfirm, onCancel, unansweredCount }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-sm text-center">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Confirm Submission</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Are you sure you want to submit your quiz?</p>
            {unansweredCount > 0 && <p className="font-semibold text-yellow-600 dark:text-yellow-400 mb-6">You have {unansweredCount} unanswered question(s).</p>}
            <div className="flex gap-3">
                <button onClick={onCancel} className="w-full py-2 px-4 rounded-md bg-gray-200 dark:bg-gray-600 font-semibold">Review</button>
                <button onClick={onConfirm} className="w-full py-2 px-4 rounded-md bg-green-600 text-white font-semibold">Submit</button>
            </div>
        </div>
    </div>
);

const TimeUpModal: React.FC<{ onConfirm: () => void }> = ({ onConfirm }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-sm text-center">
            <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">Time's Up!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Your time for this quiz has expired. Your answers will be submitted automatically.</p>
            <button onClick={onConfirm} className="w-full py-3 px-4 rounded-lg bg-indigo-600 text-white font-bold">OK</button>
        </div>
    </div>
);


export function TakeQuizPage({ onBack, quiz, onSaveSubmission }: TakeQuizPageProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [timeLeft, setTimeLeft] = useState(quiz.duration * 60);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showTimeUp, setShowTimeUp] = useState(false);

    const timerRef = useRef<number | null>(null);
    const hasSubmitted = useRef(false);

    const handleSubmit = async () => {
        if (hasSubmitted.current) return;
        hasSubmitted.current = true;
        
        setIsSubmitting(true);
        setShowConfirm(false);
        if(timerRef.current) clearInterval(timerRef.current);
        
        try {
            await onSaveSubmission(quiz.id, answers);
            alert("Quiz submitted successfully!");
            onBack();
        } catch (error) {
            alert("Failed to submit quiz. Please try again.");
            setIsSubmitting(false);
            hasSubmitted.current = false;
        }
    };
    
    useEffect(() => {
        timerRef.current = window.setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    setShowTimeUp(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);
    
    const handleTimeUpSubmit = () => {
        setShowTimeUp(false);
        handleSubmit();
    }
    
    const handleAnswerSelect = (questionId: string, optionIndex: number) => {
        setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    };

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    const unansweredCount = quiz.questions.length - Object.keys(answers).length;

    if (isSubmitting) {
        return (
            <div className="h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
                <LoadingSpinner message="Submitting Quiz..." />
            </div>
        )
    }

    return (
        <>
        <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <header className="bg-indigo-700 text-white p-3 flex items-center justify-between shadow-md flex-shrink-0 sticky top-0 z-10">
                <h1 className="text-lg font-bold truncate">{quiz.title}</h1>
                <div className={`font-bold text-lg px-2 py-1 rounded-md ${timeLeft < 60 ? 'bg-red-500 text-white animate-pulse' : 'bg-white/20'}`}>
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </div>
            </header>
            
            <main className="flex-grow p-4 overflow-y-auto">
                <div className="mb-4">
                    <p className="text-sm text-gray-500">Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
                    <p className="font-semibold text-lg text-gray-800 dark:text-gray-100">{currentQuestion.questionText}</p>
                </div>
                <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                        <label key={index} className={`block p-4 rounded-lg border-2 cursor-pointer transition-colors ${answers[currentQuestion.id] === index ? 'bg-indigo-100 border-indigo-500 dark:bg-indigo-900/50' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>
                            <input
                                type="radio"
                                name={`question-${currentQuestion.id}`}
                                className="mr-3"
                                checked={answers[currentQuestion.id] === index}
                                onChange={() => handleAnswerSelect(currentQuestion.id, index)}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            </main>
            
            <footer className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700 flex-shrink-0">
                <div className="flex justify-between mb-4">
                    <button onClick={() => setCurrentQuestionIndex(p => Math.max(0, p - 1))} disabled={currentQuestionIndex === 0} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 disabled:opacity-50"><ArrowLeftIcon className="w-5 h-5"/> Prev</button>
                    <button onClick={() => setCurrentQuestionIndex(p => Math.min(quiz.questions.length - 1, p + 1))} disabled={currentQuestionIndex === quiz.questions.length - 1} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 disabled:opacity-50">Next <ArrowRightIcon className="w-5 h-5"/></button>
                </div>
                <button onClick={() => setShowConfirm(true)} className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700">
                    Submit Quiz
                </button>
            </footer>
        </div>
        {showConfirm && <ConfirmSubmitModal onConfirm={handleSubmit} onCancel={() => setShowConfirm(false)} unansweredCount={unansweredCount} />}
        {showTimeUp && <TimeUpModal onConfirm={handleTimeUpSubmit} />}
        </>
    );
}
