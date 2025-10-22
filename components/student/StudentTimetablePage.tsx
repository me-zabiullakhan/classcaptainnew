
import React, { useState, useEffect } from 'react';
import type { Student, Batch, DailySchedule, ScheduleItem } from '../../types';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { db } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { ClockIcon } from '../icons/ClockIcon';

interface StudentTimetablePageProps {
  onBack: () => void;
  student: Student;
  academyId: string;
  batches: Batch[];
}

export function StudentTimetablePage({ onBack, student, academyId, batches }: StudentTimetablePageProps) {
    const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const date = new Date();
    const dateString = date.toISOString().split('T')[0];

    useEffect(() => {
        const studentBatchIds = batches
            .filter(b => student.batches.includes(b.name))
            .map(b => b.id);

        if (studentBatchIds.length === 0) {
            setIsLoading(false);
            return;
        }
        // For simplicity, we'll just use the first batch if a student is in multiple.
        // A more complex app might show schedules for all batches or let the user choose.
        const primaryBatchId = studentBatchIds[0];

        const fetchSchedule = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const scheduleRef = doc(db, `academies/${academyId}/schedules`, dateString);
                const docSnap = await getDoc(scheduleRef);
                if (docSnap.exists()) {
                    const data = docSnap.data() as DailySchedule;
                    const items = data[primaryBatchId] || [];
                    items.sort((a,b) => a.startTime.localeCompare(b.startTime));
                    setScheduleItems(items);
                } else {
                    setScheduleItems([]);
                }
            } catch (err) {
                console.error("Error fetching schedule:", err);
                setError("Failed to load today's schedule. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchSchedule();
    }, [dateString, academyId, student.batches, batches]);

    return (
        <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Today's Timetable</h1>
            </header>
            
            <main className="flex-grow p-4 overflow-y-auto">
                <div className="text-center mb-4">
                    <p className="font-bold text-lg text-indigo-700 dark:text-indigo-400">{date.toLocaleDateString('en-US', { weekday: 'long' })}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                
                {isLoading && <p className="text-center text-gray-500">Loading schedule...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                
                {!isLoading && !error && (
                    scheduleItems.length > 0 ? (
                        <div className="space-y-3">
                            {scheduleItems.map(item => (
                                <div key={item.id} className={`p-4 rounded-lg shadow-sm flex items-center space-x-4 ${item.type === 'class' ? 'bg-white dark:bg-gray-800' : 'bg-yellow-50 dark:bg-yellow-900/40'}`}>
                                    <div className="flex flex-col items-center w-20 text-indigo-600 dark:text-indigo-300">
                                        <span className="font-bold text-sm">{item.startTime}</span>
                                        <span className="text-xs">to</span>
                                        <span className="font-bold text-sm">{item.endTime}</span>
                                    </div>
                                    <div className={`w-1 h-16 rounded-full ${item.type === 'class' ? 'bg-indigo-200 dark:bg-indigo-700' : 'bg-yellow-200 dark:bg-yellow-700'}`}></div>
                                    <div>
                                        {item.type === 'class' ? (
                                            <>
                                                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">{item.subject}</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">by {item.teacherName}</p>
                                            </>
                                        ) : (
                                            <h3 className="font-bold text-lg text-yellow-800 dark:text-yellow-300 flex items-center gap-2">
                                                <ClockIcon className="w-5 h-5" />
                                                {item.breakType}
                                            </h3>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 px-4">
                            <p className="text-lg text-gray-500 dark:text-gray-400">No schedule set for today.</p>
                        </div>
                    )
                )}
            </main>
        </div>
    );
}
