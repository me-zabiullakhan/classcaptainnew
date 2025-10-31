
import React, { useState, useCallback, useEffect } from 'react';
import type { Student, Batch, FeeCollection, Academy } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { PdfIcon } from './icons/PdfIcon';
import { BellIcon } from './icons/BellIcon';
import { XMarkIcon } from './icons/XMarkIcon';
import { WhatsappIcon } from './icons/WhatsappIcon';
import { SmsIcon } from './icons/SmsIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface SendDuesReminderModalProps {
    onClose: () => void;
    studentsWithDues: { student: Student; pendingMonths: string[] }[];
    academy: Academy;
}

const SendDuesReminderModal: React.FC<SendDuesReminderModalProps> = ({ onClose, studentsWithDues, academy }) => {
    const [step, setStep] = useState<'select_list' | 'select_app' | 'sending_in_progress' | 'sending_complete'>('select_list');
    const [appType, setAppType] = useState<'sms' | 'whatsapp' | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const FEE_REMINDER_TEMPLATE_KEY = 'feeReminder';
    const DEFAULT_FEE_REMINDER_TEMPLATE = "Gentle Fee Reminder.\nDear Parents, A fee of Rs. [FEES_AMOUNT] of [FEES_MONTHS] month(s) is pending for [STUDENT_NAME]([BATCH_NAME]). Kindly clear outstanding fee immediately to continue classes uninterrupted.\n\nThanks and Regards\n[ACADEMY_NAME] ~";

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
        if (currentIndex >= studentsWithDues.length) {
            setStep('sending_complete');
            return;
        }

        const { student, pendingMonths } = studentsWithDues[currentIndex];
        const template = academy.smsTemplates?.[FEE_REMINDER_TEMPLATE_KEY] || DEFAULT_FEE_REMINDER_TEMPLATE;
        const totalDue = (student.feeAmount || 0) * pendingMonths.length;

        const message = template
            .replace(/\[STUDENT_NAME\]/g, student.name)
            .replace(/\[BATCH_NAME\]/g, student.batches.join(', '))
            .replace(/\[FEES_AMOUNT\]/g, String(totalDue))
            .replace(/\[FEES_MONTHS\]/g, String(pendingMonths.length))
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
    }, [currentIndex, studentsWithDues, academy, appType]);

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
                const student = studentsWithDues[currentIndex];
                return (
                     <div className="text-center p-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                        <h3 className="text-lg font-bold mt-4">Preparing Message...</h3>
                        <p>Sending to: <span className="font-semibold">{student?.student.name}</span></p>
                        <p className="text-sm text-gray-500">({currentIndex + 1} of {studentsWithDues.length})</p>
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
                        <p className="text-sm text-center text-gray-600 dark:text-gray-300 mb-2">The following students have pending fees:</p>
                        <div className="flex-grow overflow-y-auto space-y-2 pr-2">
                             {studentsWithDues.length > 0 ? studentsWithDues.map(({ student }) => (
                                <div key={student.id} className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                                        {student.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{student.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{student.rollNumber}</p>
                                    </div>
                                </div>
                            )) : <p className="text-center text-gray-500 pt-10">No students with dues found in this filter.</p>}
                        </div>
                        <div className="pt-4 mt-auto">
                            <button onClick={() => setStep('select_app')} disabled={studentsWithDues.length === 0} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-300">
                                Send Reminder ({studentsWithDues.length})
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
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Send Fee Reminders</h2>
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

interface FeeDuesListPageProps {
  onBack: () => void;
  students: Student[];
  batches: Batch[];
  feeCollections: FeeCollection[];
  academy: Academy;
}

const getDuesData = (students: Student[], feeCollections: FeeCollection[]) => {
    const studentsWithDues: { student: Student; pendingMonths: string[] }[] = [];

    students.forEach(student => {
        if (!student.isActive || !student.admissionDate || !student.feeType) return;
        
        const paidMonths = new Set(
            feeCollections.filter(fc => fc.studentId === student.id).map(fc => fc.feeForMonth)
        );
        
        const pending: string[] = [];
        const admissionDate = new Date(student.admissionDate);
        const today = new Date();

        if (student.feeType === 'Monthly') {
            let currentDate = new Date(admissionDate.getFullYear(), admissionDate.getMonth(), 1);
            while (currentDate <= today) {
                const monthString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
                if (!paidMonths.has(monthString)) {
                    pending.push(monthString);
                }
                currentDate.setMonth(currentDate.getMonth() + 1);
            }
        } else { // Handles 'Yearly'
            let cycleStartDate = new Date(admissionDate.getFullYear(), admissionDate.getMonth(), 1);
            while (cycleStartDate <= today) {
                const cycleStartString = `${cycleStartDate.getFullYear()}-${String(cycleStartDate.getMonth() + 1).padStart(2, '0')}`;
                if (!paidMonths.has(cycleStartString)) {
                    pending.push(cycleStartString);
                }
                cycleStartDate.setFullYear(cycleStartDate.getFullYear() + 1);
            }
        }

        if (pending.length > 0) {
            studentsWithDues.push({ student, pendingMonths: pending });
        }
    });

    return studentsWithDues;
};

export function FeeDuesListPage({ onBack, students, batches, feeCollections, academy }: FeeDuesListPageProps) {
    const [filter, setFilter] = React.useState('all');
    const [isSmsModalOpen, setIsSmsModalOpen] = useState(false);
    
    const duesData = getDuesData(students, feeCollections);

    const filteredDues = duesData.filter(({ student }) =>
        filter === 'all' || student.batches.includes(filter)
    );

    return (
        <div className="animate-fade-in flex flex-col h-full">
            <div className="flex-shrink-0 sticky top-0 z-10 bg-slate-100 dark:bg-gray-900 shadow-md">
                <header className="bg-indigo-700 text-white p-3 flex items-center">
                    <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-bold ml-2">Fee Dues List</h1>
                </header>
                <div className="p-4">
                    <select
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="all">All Batches</option>
                        {batches.filter(b => b.isActive).map(batch => (
                            <option key={batch.id} value={batch.name}>{batch.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <main className="flex-grow overflow-y-auto px-4">
                {filteredDues.length > 0 ? (
                    <div className="space-y-4 pb-4">
                        {filteredDues.map(({ student, pendingMonths }) => {
                            const totalDue = (student.feeAmount || 0) * pendingMonths.length;
                            return (
                                <div key={student.id} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-bold text-gray-800">{student.name}</p>
                                            <p className="text-sm text-gray-500">{student.rollNumber}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-lg text-red-600">₹{totalDue.toFixed(2)}</p>
                                            <p className="text-xs text-gray-500">{pendingMonths.length} {student.feeType === 'Monthly' ? 'month(s)' : 'year(s)'} due</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20 px-4">
                        <p className="text-lg text-gray-500">No fee dues found!</p>
                        <p className="text-sm text-gray-400 mt-2">All student fees are up to date for the selected filter.</p>
                    </div>
                )}
            </main>
             <footer className="p-3 bg-white border-t grid grid-cols-2 gap-3 flex-shrink-0">
                <button onClick={() => setIsSmsModalOpen(true)} className="flex items-center justify-center space-x-2 w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
                    <BellIcon className="w-5 h-5" />
                    <span>Send Reminder</span>
                </button>
                <button onClick={() => alert('Feature under development')} className="flex items-center justify-center space-x-2 w-full bg-slate-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-900 transition-colors shadow-md">
                    <PdfIcon className="w-5 h-5" />
                    <span>Export PDF</span>
                </button>
             </footer>
             {isSmsModalOpen && (
                <SendDuesReminderModal
                    onClose={() => setIsSmsModalOpen(false)}
                    studentsWithDues={filteredDues}
                    academy={academy}
                />
            )}
        </div>
    );
}
