
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import type { Batch, Student, AttendanceStatus, Academy } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { CustomDropdown } from './CustomDropdown';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { PdfIcon } from './icons/PdfIcon';
import { BellIcon } from './icons/BellIcon';
import { WhatsappIcon } from './icons/WhatsappIcon';
import { SmsIcon } from './icons/SmsIcon';
import { XMarkIcon } from './icons/XMarkIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { LogoIcon } from './icons/LogoIcon';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface AttendanceReportPageProps {
    onBack: () => void;
    batches: Batch[];
    students: Student[];
    academyId: string;
    academy: Academy;
}

type ReportData = {
    students: Student[];
    attendance: Record<string, Record<string, AttendanceStatus>>;
    summaries: Record<string, { P: number; A: number; L: number; H: number }>;
} | null;

const MONTHLY_ATTENDANCE_TEMPLATE_KEY = 'monthlyAttendanceReport';
const DEFAULT_MONTHLY_ATTENDANCE_TEMPLATE = "Dear Parents, Monthly attendance report for [STUDENT_NAME] ([BATCH_NAME]) for [MONTH]: Present-[P_DAYS], Absent-[A_DAYS], Leave-[L_DAYS].\nRegards,\n[ACADEMY_NAME] ~";

const SendMonthlyAttendanceModal: React.FC<{
    onClose: () => void;
    reportData: ReportData;
    academy: Academy;
    batchName: string;
    month: string;
}> = ({ onClose, reportData, academy, batchName, month }) => {
    const [step, setStep] = useState<'select_app' | 'sending_in_progress' | 'sending_complete'>('select_app');
    const [appType, setAppType] = useState<'sms' | 'whatsapp' | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const studentsToSend = reportData?.students || [];

    const startMessagingLoop = (type: 'sms' | 'whatsapp') => {
        setAppType(type);
        setCurrentIndex(0);
        setStep('sending_in_progress');
    };

    const sendMessageToCurrentStudent = useCallback(() => {
        if (currentIndex >= studentsToSend.length) {
            setStep('sending_complete');
            return;
        }

        const student = studentsToSend[currentIndex];
        const summary = reportData!.summaries[student.id];
        const monthFormatted = new Date(month + '-02').toLocaleString('default', { month: 'long', year: 'numeric' });
        const template = academy.smsTemplates?.[MONTHLY_ATTENDANCE_TEMPLATE_KEY] || DEFAULT_MONTHLY_ATTENDANCE_TEMPLATE;

        const message = template
            .replace(/\[STUDENT_NAME\]/g, student.name)
            .replace(/\[BATCH_NAME\]/g, batchName)
            .replace(/\[MONTH\]/g, monthFormatted)
            .replace(/\[P_DAYS\]/g, String(summary.P))
            .replace(/\[A_DAYS\]/g, String(summary.A))
            .replace(/\[L_DAYS\]/g, String(summary.L))
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
    }, [currentIndex, studentsToSend, reportData, academy, month, batchName, appType]);
    
     useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible' && step === 'sending_in_progress') {
                setTimeout(() => setCurrentIndex(prev => prev + 1), 500);
            }
        };

        if (step === 'sending_in_progress') {
            sendMessageToCurrentStudent();
            document.addEventListener('visibilitychange', handleVisibilityChange);
        }

        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [step, currentIndex, sendMessageToCurrentStudent]);

    // ... UI for the modal steps ...
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-sm flex flex-col max-h-[90vh] relative">
                <header className="flex items-center justify-between p-4 border-b dark:border-gray-700 flex-shrink-0">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Send Report</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <XMarkIcon className="w-6 h-6 text-gray-500" />
                    </button>
                </header>
                <div className="flex flex-col flex-grow overflow-hidden p-4">
                     {step === 'select_app' && (
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
                     )}
                     {step === 'sending_in_progress' && (
                         <div className="text-center p-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                            <h3 className="text-lg font-bold mt-4">Preparing Message...</h3>
                            <p>Sending to: <span className="font-semibold">{studentsToSend[currentIndex]?.name}</span></p>
                            <p className="text-sm text-gray-500">({currentIndex + 1} of {studentsToSend.length})</p>
                            <p className="text-xs mt-4 text-gray-500">You will be redirected to {appType}. After sending, return to this app to continue.</p>
                            <button onClick={onClose} className="mt-6 bg-red-100 text-red-700 font-semibold py-2 px-4 rounded-lg text-sm">Cancel</button>
                        </div>
                     )}
                     {step === 'sending_complete' && (
                        <div className="text-center p-8">
                            <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
                            <h3 className="text-lg font-bold mt-4">All Done!</h3>
                            <p className="text-gray-600">All messages have been prepared.</p>
                            <button onClick={onClose} className="mt-6 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg w-full">Finish</button>
                        </div>
                     )}
                </div>
            </div>
        </div>
    );
};

const AttendanceReportPrintable = ({ academy, reportData, batchName, monthName }: { academy: Academy, reportData: ReportData, batchName: string, monthName: string }) => {
    if (!reportData) return null;
    const daysInMonth = Object.keys(reportData.attendance[reportData.students[0].id] || {}).length || new Date(monthName).getDate();

    const getStatusChar = (status?: AttendanceStatus) => {
        switch (status) { case 'Present': return 'P'; case 'Absent': return 'A'; case 'Leave': return 'L'; case 'Holiday': return 'H'; default: return '-'; }
    };
    
    return (
        <div className="bg-white text-black p-4 font-sans">
            <div className="flex justify-between items-center pb-4 border-b-2 border-gray-300">
                <div className="flex items-center space-x-4">
                    {academy.logoUrl ? <img src={academy.logoUrl} alt="Logo" className="w-16 h-16 object-contain" /> : <LogoIcon className="w-16 h-16 text-indigo-600" />}
                    <div>
                        <h1 className="text-2xl font-bold">{academy.name}</h1>
                        <p className="text-sm">Monthly Attendance Report</p>
                    </div>
                </div>
                <div className="text-right text-sm">
                    <p>Batch: {batchName}</p>
                    <p>Month: {monthName}</p>
                </div>
            </div>
            <div className="overflow-x-auto pt-4">
                <table className="w-full text-xs border-collapse">
                     <thead>
                        <tr className="bg-gray-100">
                            <th className="p-1 border border-gray-300">Student</th>
                            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => ( <th key={day} className="p-1 border border-gray-300 text-center">{day}</th> ))}
                            <th className="p-1 border border-gray-300 text-center">P</th>
                            <th className="p-1 border border-gray-300 text-center">A</th>
                            <th className="p-1 border border-gray-300 text-center">L</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportData.students.map(student => (
                            <tr key={student.id}>
                                <td className="p-1 border border-gray-300 font-medium whitespace-nowrap">{student.name}</td>
                                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
                                    <td key={day} className="p-1 border border-gray-300 text-center">{getStatusChar(reportData.attendance[student.id]?.[day])}</td>
                                ))}
                                <td className="p-1 border border-gray-300 text-center font-bold">{reportData.summaries[student.id].P}</td>
                                <td className="p-1 border border-gray-300 text-center font-bold">{reportData.summaries[student.id].A}</td>
                                <td className="p-1 border border-gray-300 text-center font-bold">{reportData.summaries[student.id].L}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export function AttendanceReportPage({ onBack, batches, students, academyId, academy }: AttendanceReportPageProps) {
    // FIX: Moved `activeBatches` declaration before its usage to fix a 'used before declaration' error.
    const activeBatches = batches.filter(b => b.isActive);
    const [selectedBatchId, setSelectedBatchId] = useState<string | null>(activeBatches[0]?.id || null);
    const [selectedMonth, setSelectedMonth] = useState<string>(new Date().toISOString().substring(0, 7));
    const [reportData, setReportData] = useState<ReportData>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    const [isSmsModalOpen, setIsSmsModalOpen] = useState(false);

    const handleGenerateReport = async () => {
        if (!selectedBatchId || !selectedMonth) {
            alert("Please select a batch and a month.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setReportData(null);

        try {
            const [year, month] = selectedMonth.split('-').map(Number);
            const daysInMonth = new Date(year, month, 0).getDate();
            
            const studentsInBatch = students.filter(s => s.batches.includes(activeBatches.find(b => b.id === selectedBatchId)!.name));

            const attendanceForStudents: Record<string, Record<string, AttendanceStatus>> = {};
            studentsInBatch.forEach(s => { attendanceForStudents[s.id] = {}; });

            const datePromises = Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                return getDoc(doc(db, `academies/${academyId}/batches/${selectedBatchId}/attendance`, dateString));
            });

            const dailyDocs = await Promise.all(datePromises);
            
            dailyDocs.forEach((docSnap, i) => {
                const day = String(i + 1);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    studentsInBatch.forEach(student => {
                        if (data[student.id]) {
                            attendanceForStudents[student.id][day] = data[student.id];
                        }
                    });
                }
            });

            const summaries: ReportData['summaries'] = {};
            studentsInBatch.forEach(student => {
                summaries[student.id] = { P: 0, A: 0, L: 0, H: 0 };
                Object.values(attendanceForStudents[student.id]).forEach(status => {
                    if (status === 'Present') summaries[student.id].P++;
                    else if (status === 'Absent') summaries[student.id].A++;
                    else if (status === 'Leave') summaries[student.id].L++;
                    else if (status === 'Holiday') summaries[student.id].H++;
                });
            });

            setReportData({
                students: studentsInBatch,
                attendance: attendanceForStudents,
                summaries
            });

        } catch (err) {
            console.error(err);
            setError("Failed to generate report. Please check your connection and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleExportPdf = async () => {
        if (!reportData) return;
        setIsGeneratingPdf(true);
    
        setTimeout(async () => {
            const reportElement = document.getElementById('pdf-report-container');
            if (!reportElement) {
                console.error("Report element not found");
                setIsGeneratingPdf(false);
                return;
            }
    
            try {
                const canvas = await html2canvas(reportElement, { scale: 2 });
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: 'a4' });
    
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const imgProps = pdf.getImageProperties(imgData);
                const imgRatio = imgProps.height / imgProps.width;
                
                let finalWidth = pdfWidth - 20;
                let finalHeight = finalWidth * imgRatio;
                if (finalHeight > pdfHeight - 20) {
                    finalHeight = pdfHeight - 20;
                    finalWidth = finalHeight / imgRatio;
                }
                
                const x = (pdfWidth - finalWidth) / 2;
                const y = (pdfHeight - finalHeight) / 2;
    
                pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);
                
                const pdfBlob = pdf.output('blob');
                const fileName = `Attendance-${selectedBatchId}-${selectedMonth}.pdf`;
                const pdfFile = new File([pdfBlob], fileName, { type: 'application/pdf' });
    
                if (navigator.share && navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
                    await navigator.share({ title: 'Attendance Report', files: [pdfFile] });
                } else {
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(pdfFile);
                    link.download = fileName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(link.href);
                }
            } catch (error) {
                console.error("Error generating PDF:", error);
                alert("Failed to generate PDF.");
            } finally {
                setIsGeneratingPdf(false);
            }
        }, 100);
    };

    const getStatusChar = (status?: AttendanceStatus) => {
        switch (status) { case 'Present': return 'P'; case 'Absent': return 'A'; case 'Leave': return 'L'; case 'Holiday': return 'H'; default: return '-'; }
    };
    
    const getStatusColor = (status?: AttendanceStatus) => {
        switch (status) { case 'Present': return 'text-green-600 font-bold'; case 'Absent': return 'text-red-600 font-bold'; case 'Leave': return 'text-orange-500 font-bold'; case 'Holiday': return 'text-purple-500 font-bold'; default: return 'text-gray-400'; }
    }

    const daysInMonth = useMemo(() => {
        if (!selectedMonth) return 0;
        const [year, month] = selectedMonth.split('-').map(Number);
        return new Date(year, month, 0).getDate();
    }, [selectedMonth]);
    
    const batchName = activeBatches.find(b => b.id === selectedBatchId)?.name || '';
    const monthName = new Date(selectedMonth + '-02').toLocaleString('default', { month: 'long', year: 'numeric' });

    return (
        <>
        <div style={{ position: 'fixed', left: '-9999px', top: 0, zIndex: -1 }}>
            {isGeneratingPdf && reportData && (
                 <div id="pdf-report-container" style={{ width: '297mm', height: '210mm' }}>
                    <AttendanceReportPrintable academy={academy} reportData={reportData} batchName={batchName} monthName={monthName} />
                 </div>
             )}
        </div>
        <div className={'animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900'}>
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10 no-print">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Attendance Report</h1>
            </header>
            
            <main className="flex-grow p-4 overflow-y-auto">
                {/* Form Section */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6 no-print">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Batch</label>
                            <select
                                value={selectedBatchId || ''}
                                onChange={e => setSelectedBatchId(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                            >
                                <option value="" disabled>Select a Batch</option>
                                {activeBatches.map(batch => (
                                    <option key={batch.id} value={batch.id}>{batch.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Month</label>
                            <input
                                type="month"
                                value={selectedMonth}
                                onChange={e => setSelectedMonth(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                            />
                        </div>
                        <button
                            onClick={handleGenerateReport}
                            disabled={isLoading || !selectedBatchId}
                            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md disabled:bg-indigo-400"
                        >
                            {isLoading ? 'Generating...' : 'Generate Report'}
                        </button>
                    </div>
                </div>

                {error && <p className="text-center text-red-500">{error}</p>}
                
                {/* Report Display Section */}
                {reportData && (
                    <div className="bg-white dark:bg-gray-800 mt-4 rounded-lg shadow-sm animate-fade-in-up">
                        <div className="p-4 text-center border-b dark:border-gray-700">
                             <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Monthly Attendance Report</h2>
                             <p className="text-sm text-gray-600 dark:text-gray-400">
                                {batchName} - {monthName}
                             </p>
                        </div>
                        <div className="overflow-x-auto p-4">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-700">
                                        <th className="p-2 border dark:border-gray-600">Student Name</th>
                                        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
                                            <th key={day} className="p-2 border dark:border-gray-600 text-center min-w-[30px]">{day}</th>
                                        ))}
                                        <th className="p-2 border dark:border-gray-600 text-center bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-300">P</th>
                                        <th className="p-2 border dark:border-gray-600 text-center bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-300">A</th>
                                        <th className="p-2 border dark:border-gray-600 text-center bg-orange-50 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300">L</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportData.students.map(student => (
                                        <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                            <td className="p-2 border dark:border-gray-600 font-medium whitespace-nowrap">{student.name}</td>
                                            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
                                                <td key={day} className={`p-2 border dark:border-gray-600 text-center ${getStatusColor(reportData.attendance[student.id]?.[String(day)])}`}>
                                                    {getStatusChar(reportData.attendance[student.id]?.[String(day)])}
                                                </td>
                                            ))}
                                            <td className="p-2 border dark:border-gray-600 text-center font-bold">{reportData.summaries[student.id].P}</td>
                                            <td className="p-2 border dark:border-gray-600 text-center font-bold">{reportData.summaries[student.id].A}</td>
                                            <td className="p-2 border dark:border-gray-600 text-center font-bold">{reportData.summaries[student.id].L}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>

            {reportData && (
                <footer className="p-3 bg-white dark:bg-gray-800 border-t dark:border-gray-700 grid grid-cols-2 gap-3 flex-shrink-0 no-print">
                    <button onClick={() => setIsSmsModalOpen(true)} className="flex items-center justify-center space-x-2 w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                        <BellIcon className="w-5 h-5" />
                        <span>Send Attendance</span>
                    </button>
                    <button onClick={handleExportPdf} disabled={isGeneratingPdf} className="flex items-center justify-center space-x-2 w-full bg-slate-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-900 transition-colors shadow-md disabled:bg-slate-600">
                        <PdfIcon className="w-5 h-5" />
                        <span>{isGeneratingPdf ? 'Generating...' : 'Download PDF'}</span>
                    </button>
                </footer>
            )}
        </div>
        {isSmsModalOpen && reportData && (
            <SendMonthlyAttendanceModal 
                onClose={() => setIsSmsModalOpen(false)}
                reportData={reportData}
                academy={academy}
                batchName={batchName}
                month={selectedMonth}
            />
        )}
        </>
    );
}
