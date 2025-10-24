import React, { useState, useMemo } from 'react';
import type { Batch, Student, AttendanceStatus } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { CustomDropdown } from './CustomDropdown';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { PdfIcon } from './icons/PdfIcon';

interface AttendanceReportPageProps {
    onBack: () => void;
    batches: Batch[];
    students: Student[];
    academyId: string;
}

type ReportData = {
    students: Student[];
    attendance: Record<string, Record<string, AttendanceStatus>>;
    summaries: Record<string, { P: number; A: number; L: number; H: number }>;
} | null;

export function AttendanceReportPage({ onBack, batches, students, academyId }: AttendanceReportPageProps) {
    const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<string>(new Date().toISOString().substring(0, 7));
    const [reportData, setReportData] = useState<ReportData>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const activeBatches = batches.filter(b => b.isActive);

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
                const day = i + 1;
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

    const getStatusChar = (status?: AttendanceStatus) => {
        switch (status) {
            case 'Present': return 'P';
            case 'Absent': return 'A';
            case 'Leave': return 'L';
            case 'Holiday': return 'H';
            default: return '-';
        }
    };
    
    const getStatusColor = (status?: AttendanceStatus) => {
        switch (status) {
            case 'Present': return 'text-green-600 font-bold';
            case 'Absent': return 'text-red-600 font-bold';
            case 'Leave': return 'text-orange-500 font-bold';
            case 'Holiday': return 'text-purple-500 font-bold';
            default: return 'text-gray-400';
        }
    }

    const daysInMonth = useMemo(() => {
        if (!selectedMonth) return 0;
        const [year, month] = selectedMonth.split('-').map(Number);
        return new Date(year, month, 0).getDate();
    }, [selectedMonth]);

    return (
        <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10 no-print">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Attendance Report</h1>
            </header>
            
            <main className="flex-grow p-4 overflow-y-auto">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm space-y-4 no-print">
                    <CustomDropdown
                        label="Batch"
                        options={activeBatches.map(b => ({ value: b.id, label: b.name }))}
                        selectedValue={selectedBatchId}
                        onSelect={setSelectedBatchId}
                        placeholder="Select a Batch"
                    />
                     <div>
                        <label className="block text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">Month</label>
                        <input
                            type="month"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <button
                        onClick={handleGenerateReport}
                        disabled={isLoading || !selectedBatchId}
                        className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md disabled:bg-indigo-300"
                    >
                        {isLoading ? 'Generating...' : 'Generate Report'}
                    </button>
                </div>

                {error && <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}

                {reportData && (
                    <div className="printable-form bg-white dark:bg-gray-800 mt-4 rounded-lg shadow-sm">
                        <div className="p-4 text-center border-b dark:border-gray-700">
                             <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Monthly Attendance Report</h2>
                             <p className="text-sm text-gray-600 dark:text-gray-400">
                                {activeBatches.find(b => b.id === selectedBatchId)?.name} - {new Date(selectedMonth + '-02').toLocaleString('default', { month: 'long', year: 'numeric' })}
                             </p>
                        </div>
                        <div className="overflow-x-auto p-4">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-700">
                                        <th className="p-2 border dark:border-gray-600">Student Name</th>
                                        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
                                            <th key={day} className="p-2 border dark:border-gray-600 text-center">{day}</th>
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
                                                <td key={day} className={`p-2 border dark:border-gray-600 text-center ${getStatusColor(reportData.attendance[student.id]?.[day])}`}>
                                                    {getStatusChar(reportData.attendance[student.id]?.[day])}
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
                <footer className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700 flex-shrink-0 no-print">
                    <button onClick={() => window.print()} className="w-full flex items-center justify-center space-x-2 bg-slate-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-900 transition-colors shadow-md">
                        <PdfIcon className="w-5 h-5" />
                        <span>Print / Save as PDF</span>
                    </button>
                </footer>
            )}
        </div>
    );
}
