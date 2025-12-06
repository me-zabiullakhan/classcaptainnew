
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import type { Academy, Exam, Student } from '../types';
import { XMarkIcon } from './icons/XMarkIcon';
import { WhatsappIcon } from './icons/WhatsappIcon';
import { SmsIcon } from './icons/SmsIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface SendMarksSmsModalProps {
    onClose: () => void;
    students: Student[];
    marks: Record<string, number | null>;
    exam: Exam;
    academy: Academy;
}

const EXAM_MARKS_TEMPLATE_KEY = 'examMarks';
const DEFAULT_EXAM_MARKS_TEMPLATE = "Student Name : [STUDENT_NAME]([BATCH_NAME])\nTopic : [EXAM_TOPIC]\nResult : [MARKS]/[MAX_MARKS] on [DATE]\nRegards,\n[ACADEMY_NAME] ~";

export function SendMarksSmsModal({ onClose, students, marks, exam, academy }: SendMarksSmsModalProps) {
    const [step, setStep] = useState<'select_app' | 'sending_in_progress' | 'sending_complete'>('select_app');
    const [appType, setAppType] = useState<'sms' | 'whatsapp' | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const studentsToSend = useMemo(() => {
        return students.filter(s => marks[s.id] !== null && marks[s.id] !== undefined);
    }, [students, marks]);

    const startMessagingLoop = (type: 'sms' | 'whatsapp') => {
        setAppType(type);
        setCurrentIndex(0);
        setStep('sending_in_progress');
    };
    
    const cancelLoop = useCallback(() => {
        setStep('select_app');
        setAppType(null);
    }, []);

    const sendMessageToCurrentStudent = useCallback(() => {
        if (currentIndex >= studentsToSend.length) {
            setStep('sending_complete');
            return;
        }

        const student = studentsToSend[currentIndex];
        const studentMark = marks[student.id];
        const formattedDate = exam.date.toDate().toLocaleDateString('en-GB');
        const template = academy.smsTemplates?.[EXAM_MARKS_TEMPLATE_KEY] || DEFAULT_EXAM_MARKS_TEMPLATE;

        const message = template
            .replace(/\[STUDENT_NAME\]/g, student.name)
            .replace(/\[BATCH_NAME\]/g, exam.batchName)
            .replace(/\[EXAM_TOPIC\]/g, exam.subject)
            .replace(/\[MARKS\]/g, String(studentMark))
            .replace(/\[MAX_MARKS\]/g, String(exam.maxMarks))
            .replace(/\[DATE\]/g, formattedDate)
            .replace(/\[ACADEMY_NAME\]/g, academy.name);
        
        const phoneNumber = student.mobile1.replace(/[^0-9]/g, '');
        const encodedMessage = encodeURIComponent(message);
        
        let url = '';
        if (appType === 'whatsapp') {
            const internationalNumber = phoneNumber.startsWith('91') ? phoneNumber : `91${phoneNumber}`;
            url = `https://wa.me/${internationalNumber}?text=${encodedMessage}`;
        } else {
            url = `sms:${phoneNumber}?body=${encodedMessage}`;
        }

        window.open(url, '_blank');
    }, [currentIndex, studentsToSend, marks, exam, academy, appType]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible' && step === 'sending_in_progress') {
                setTimeout(() => {
                    setCurrentIndex(prevIndex => prevIndex + 1);
                }, 500);
            }
        };

        if (step === 'sending_in_progress') {
            sendMessageToCurrentStudent();
            document.addEventListener('visibilitychange', handleVisibilityChange);
        }

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [step, currentIndex, sendMessageToCurrentStudent]);
    
     const renderContent = () => {
        switch(step) {
            case 'sending_in_progress':
                const student = studentsToSend[currentIndex];
                return (
                     <div className="text-center p-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                        <h3 className="text-lg font-bold mt-4">Preparing Message...</h3>
                        <p>Sending to: <span className="font-semibold">{student?.name}</span></p>
                        <p className="text-sm text-gray-500">({currentIndex + 1} of {studentsToSend.length})</p>
                        <p className="text-xs mt-4 text-gray-500">You will be redirected to {appType}. After sending, return to this app to continue.</p>
                        <button onClick={cancelLoop} className="mt-6 bg-red-100 text-red-700 font-semibold py-2 px-4 rounded-lg text-sm">Cancel Sending</button>
                    </div>
                );
            case 'sending_complete':
                 return (
                    <div className="text-center p-8">
                        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
                        <h3 className="text-lg font-bold mt-4">All Done!</h3>
                        <p className="text-gray-600">All messages have been prepared for sending.</p>
                        <button onClick={onClose} className="mt-6 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg w-full">Finish</button>
                    </div>
                );
            case 'select_app':
            default:
                return (
                    <div className="p-4">
                        <h3 className="text-lg font-bold text-center mb-4">Choose App to Send Marks</h3>
                        <p className="text-sm text-center text-gray-600 dark:text-gray-300 mb-4">
                            You are about to send results to {studentsToSend.length} student(s).
                        </p>
                         <div className="space-y-3">
                            <button onClick={() => startMessagingLoop('whatsapp')} className="w-full flex items-center justify-center gap-3 bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors">
                                <WhatsappIcon className="w-6 h-6" />
                                <span>Send via WhatsApp</span>
                            </button>
                             <button onClick={() => startMessagingLoop('sms')} className="w-full flex items-center justify-center gap-3 bg-sky-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-sky-600 transition-colors">
                                <SmsIcon className="w-6 h-6" />
                                <span>Send via SMS</span>
                            </button>
                        </div>
                    </div>
                );
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-sm flex flex-col max-h-[90vh] relative">
                <header className="flex items-center justify-between p-4 border-b dark:border-gray-700 flex-shrink-0">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Send Exam Marks</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <XMarkIcon className="w-6 h-6 text-gray-500" />
                    </button>
                </header>
                <div className="flex flex-col flex-grow overflow-hidden">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}
