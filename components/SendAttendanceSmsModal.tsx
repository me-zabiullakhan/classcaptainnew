import React, { useState, useMemo, useEffect, useCallback } from 'react';
import type { Academy, AttendanceStatus, Batch, Student } from '../types';
import { XMarkIcon } from './icons/XMarkIcon';
import { WhatsappIcon } from './icons/WhatsappIcon';
import { SmsIcon } from './icons/SmsIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface SendAttendanceSmsModalProps {
    onClose: () => void;
    students: Student[];
    attendance: Record<string, AttendanceStatus>;
    batch: Batch;
    academy: Academy;
    date: Date;
}

const ATTENDANCE_TEMPLATE_KEY = 'attendance';
const DEFAULT_ATTENDANCE_TEMPLATE = "Student : [STUDENT_NAME]([BATCH_NAME]) is *[STATUS]* for today's class Date : [DATE]\nRegards,\n[ACADEMY_NAME] ~\nNote: In case of queries call/message: *+91 9341771776*";
const STATUS_OPTIONS: AttendanceStatus[] = ['Present', 'Absent', 'Leave', 'Holiday'];

export function SendAttendanceSmsModal({ onClose, students, attendance, batch, academy, date }: SendAttendanceSmsModalProps) {
    const [activeStatus, setActiveStatus] = useState<AttendanceStatus>('Absent');
    const [step, setStep] = useState<'select_list' | 'select_app' | 'sending_in_progress' | 'sending_complete'>('select_list');
    const [appType, setAppType] = useState<'sms' | 'whatsapp' | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const studentsToSend = useMemo(() => {
        return students.filter(s => attendance[s.id] === activeStatus);
    }, [students, attendance, activeStatus]);

    const startMessagingLoop = (type: 'sms' | 'whatsapp') => {
        setAppType(type);
        setCurrentIndex(0);
        setStep('sending_in_progress');
    };
    
    const cancelLoop = useCallback(() => {
        setStep('select_list');
        setAppType(null);
    }, []);

    const sendMessageToCurrentStudent = useCallback(() => {
        if (currentIndex >= studentsToSend.length) {
            setStep('sending_complete');
            return;
        }

        const student = studentsToSend[currentIndex];
        const status = attendance[student.id];
        const formattedDate = date.toLocaleDateString('en-GB');
        const template = academy.smsTemplates?.[ATTENDANCE_TEMPLATE_KEY] || DEFAULT_ATTENDANCE_TEMPLATE;

        const message = template
            .replace(/\[STUDENT_NAME\]/g, student.name)
            .replace(/\[BATCH_NAME\]/g, batch.name)
            .replace(/\[STATUS\]/g, status)
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
    }, [currentIndex, studentsToSend, attendance, date, academy, batch, appType]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible' && step === 'sending_in_progress') {
                // Add a small delay to give the user time to see the screen update
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
                return (
                    <div className="p-4">
                        <h3 className="text-lg font-bold text-center mb-4">Choose App</h3>
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
            case 'select_list':
            default:
                return (
                    <>
                        <div className="p-2 bg-gray-100 dark:bg-gray-900 rounded-lg flex justify-around mb-4">
                            {STATUS_OPTIONS.map(status => (
                                <button key={status} onClick={() => setActiveStatus(status)} className={`px-3 py-1.5 text-sm font-semibold rounded-md flex-grow transition-colors ${activeStatus === status ? 'bg-indigo-600 text-white shadow' : 'text-gray-600 dark:text-gray-300'}`}>
                                    {status}
                                </button>
                            ))}
                        </div>
                        <div className="flex-grow overflow-y-auto space-y-2 pr-2">
                             {studentsToSend.length > 0 ? studentsToSend.map(student => (
                                <div key={student.id} className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                                        {student.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{student.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{student.rollNumber}</p>
                                    </div>
                                </div>
                            )) : <p className="text-center text-gray-500 pt-10">No students with status "{activeStatus}".</p>}
                        </div>
                        <div className="pt-4 mt-auto">
                            <button onClick={() => setStep('select_app')} disabled={studentsToSend.length === 0} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-300">
                                Send Message ({studentsToSend.length})
                            </button>
                        </div>
                    </>
                );
        }
    }


    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-sm flex flex-col max-h-[90vh] relative">
                <header className="flex items-center justify-between p-4 border-b dark:border-gray-700 flex-shrink-0">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Send Attendance SMS</h2>
                    <button onClick={step === 'sending_in_progress' ? cancelLoop : onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <XMarkIcon className="w-6 h-6 text-gray-500" />
                    </button>
                </header>
                <div className="flex flex-col flex-grow overflow-hidden p-4">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}