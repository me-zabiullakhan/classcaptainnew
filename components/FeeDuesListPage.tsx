
import React from 'react';
import type { Student, Batch, FeeCollection } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { PdfIcon } from './icons/PdfIcon';
import { BellIcon } from './icons/BellIcon';

interface FeeDuesListPageProps {
  onBack: () => void;
  students: Student[];
  batches: Batch[];
  feeCollections: FeeCollection[];
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

export function FeeDuesListPage({ onBack, students, batches, feeCollections }: FeeDuesListPageProps): React.ReactNode {
    const [filter, setFilter] = React.useState('all');
    
    const duesData = getDuesData(students, feeCollections);

    const filteredDues = duesData.filter(({ student }) =>
        filter === 'all' || student.batches.includes(filter)
    );

    return (
        <div className="animate-fade-in flex flex-col h-full">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Fee Dues List</h1>
            </header>
            <div className="p-4 flex-shrink-0">
                <select
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="all">All Batches</option>
                    {batches.map(batch => (
                        <option key={batch.id} value={batch.name}>{batch.name}</option>
                    ))}
                </select>
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
                <button onClick={() => alert('Feature under development')} className="flex items-center justify-center space-x-2 w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                    <BellIcon className="w-5 h-5" />
                    <span>Send Reminder</span>
                </button>
                <button onClick={() => alert('Feature under development')} className="flex items-center justify-center space-x-2 w-full bg-gray-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors shadow-md">
                    <PdfIcon className="w-5 h-5" />
                    <span>Export PDF</span>
                </button>
             </footer>
        </div>
    );
}
