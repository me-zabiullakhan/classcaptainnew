

import React, { useState, useEffect } from 'react';
import type { Staff, DailySchedule, ClassScheduleItem } from '../../types';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { db } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

interface StaffSchedulePageProps {
  onBack: () => void;
  staff: Staff;
  academyId: string;
}

interface StaffClass {
    batchName: string;
    subject: string;
    startTime: string;
    endTime: string;
}

const formatTime12h = (timeString: string | undefined): string => {
    if (!timeString) {
      return '--:--';
    }
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)/;
    const match = timeString.match(timeRegex);
    
    if (!match) {
      return timeString;
    }
  
    let [_, hours, minutes] = match;
    let h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12; // the hour '0' should be '12'
    
    return `${h}:${minutes} ${ampm}`;
  };

export function StaffSchedulePage({ onBack, staff, academyId }: StaffSchedulePageProps) {
    const [classes, setClasses] = useState<StaffClass[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const date = new Date();
    const dateString = date.toISOString().split('T')[0];

    useEffect(() => {
        const fetchSchedule = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const scheduleRef = doc(db, `academies/${academyId}/schedules`, dateString);
                const docSnap = await getDoc(scheduleRef);
                const staffClasses: StaffClass[] = [];

                if (docSnap.exists()) {
                    const data = docSnap.data() as DailySchedule;
                    for (const batchId in data) {
                        const batchDoc = await getDoc(doc(db, `academies/${academyId}/batches`, batchId));
                        const batchName = batchDoc.exists() ? batchDoc.data().name : 'Unknown Batch';

                        data[batchId].forEach(item => {
                            if (item.type === 'class' && item.teacherId === staff.id) {
                                staffClasses.push({
                                    batchName,
                                    subject: item.subject,
                                    startTime: item.startTime,
                                    endTime: item.endTime,
                                });
                            }
                        });
                    }
                }
                
                const now = new Date();
                const upcomingClasses = staffClasses.filter(item => {
                    if (!item.endTime) return true;
                    const [hours, minutes] = item.endTime.split(':').map(Number);
                    const itemEndTime = new Date();
                    itemEndTime.setHours(hours, minutes, 0, 0);
                    return itemEndTime > now;
                });

                upcomingClasses.sort((a,b) => a.startTime.localeCompare(b.startTime));
                setClasses(upcomingClasses);
            } catch (err) {
                console.error("Error fetching schedule:", err);
                setError("Failed to load your schedule. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchSchedule();
    }, [dateString, academyId, staff.id]);

    return (
        <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Your Class Schedule</h1>
            </header>
            
            <main className="flex-grow p-4 overflow-y-auto">
                <div className="text-center mb-4">
                    <p className="font-bold text-lg text-indigo-700 dark:text-indigo-400">{date.toLocaleDateString('en-US', { weekday: 'long' })}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                
                {isLoading && <p className="text-center text-gray-500">Loading your schedule...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                
                {!isLoading && !error && (
                    classes.length > 0 ? (
                        <div className="space-y-3">
                            {classes.map((item, index) => (
                                <div key={index} className="p-4 rounded-lg shadow-sm flex items-center space-x-4 bg-white dark:bg-gray-800">
                                    <div className="flex flex-col items-center w-20 text-indigo-600 dark:text-indigo-300">
                                        <span className="font-bold text-sm">{formatTime12h(item.startTime)}</span>
                                        <span className="text-xs">to</span>
                                        <span className="font-bold text-sm">{formatTime12h(item.endTime)}</span>
                                    </div>
                                    <div className="w-1 h-16 rounded-full bg-indigo-200 dark:bg-indigo-700"></div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">{item.subject}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.batchName}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 px-4">
                            <p className="text-lg text-gray-500 dark:text-gray-400">You have no upcoming classes scheduled for today.</p>
                        </div>
                    )
                )}
            </main>
        </div>
    );
}