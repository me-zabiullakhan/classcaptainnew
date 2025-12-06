import React, { useState, useMemo } from 'react';
import type { Staff, StaffAttendance } from '../../types';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';

interface StaffAttendancePageProps {
    onBack: () => void;
    staff: Staff;
    staffAttendance: StaffAttendance[];
}

export function StaffAttendancePage({ onBack, staff, staffAttendance }: StaffAttendancePageProps) {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];

    const [startDate, setStartDate] = useState(firstDayOfMonth);
    const [endDate, setEndDate] = useState(lastDayOfMonth);

    const reportData = useMemo(() => {
        const filtered = staffAttendance.filter(sa => {
            if (sa.staffId !== staff.id) return false;
            const saDate = sa.date.toDate();
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;
            if (start) start.setHours(0, 0, 0, 0);
            if (end) end.setHours(23, 59, 59, 999);
            return (!start || saDate >= start) && (!end || saDate <= end);
        }).sort((a,b) => a.date.toMillis() - b.date.toMillis());
        
        const totalMinutes = filtered.reduce((sum, item) => sum + item.durationMinutes, 0);
        const totalHours = (totalMinutes / 60).toFixed(2);
        
        return { records: filtered, totalClasses: filtered.length, totalHours };

    }, [staffAttendance, staff.id, startDate, endDate]);

    return (
        <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">My Attendance</h1>
            </header>
            
            <main className="flex-grow p-4 overflow-y-auto">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm space-y-4 mb-4">
                    <p className="text-sm font-medium text-gray-500">Filter by Date:</p>
                    <div className="grid grid-cols-2 gap-4">
                        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" aria-label="Start Date"/>
                        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" aria-label="End Date"/>
                    </div>
                </div>

                {reportData && (
                    <div className="bg-white dark:bg-gray-800 mt-4 rounded-lg shadow-sm">
                        <div className="overflow-x-auto p-4">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-700">
                                        <th className="p-2 border dark:border-gray-600">Date</th>
                                        <th className="p-2 border dark:border-gray-600">Class Details</th>
                                        <th className="p-2 border dark:border-gray-600 text-center">Duration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportData.records.map(rec => (
                                        <tr key={rec.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                            <td className="p-2 border dark:border-gray-600 whitespace-nowrap">{rec.date.toDate().toLocaleDateString()}</td>
                                            <td className="p-2 border dark:border-gray-600">
                                                <p className="font-semibold">{rec.subject}</p>
                                                <p className="text-xs text-gray-500">{rec.batchName} | {rec.startTime} - {rec.endTime}</p>
                                            </td>
                                            <td className="p-2 border dark:border-gray-600 text-center font-mono">{rec.durationMinutes} mins</td>
                                        </tr>
                                    ))}
                                     <tr className="bg-gray-100 dark:bg-gray-700 font-bold">
                                        <td className="p-2 border dark:border-gray-600" colSpan={2}>Total</td>
                                        <td className="p-2 border dark:border-gray-600 text-center">{reportData.totalClasses} classes ({reportData.totalHours} hrs)</td>
                                     </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}