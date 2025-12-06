import React from 'react';
import type { ScheduleItem } from '../../types';
import { ClockIcon } from '../icons/ClockIcon';
import { BookIcon } from '../icons/BookIcon';
import { LoadingSpinner } from '../LoadingSpinner';

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

export const TodaySchedulePopup: React.FC<{ schedule: ScheduleItem[] | null; onClose: () => void; isLoading: boolean; }> = ({ schedule, onClose, isLoading }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto flex flex-col max-h-[90vh]">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">Today's Schedule</h2>
                <div className="flex-grow overflow-y-auto pr-2 space-y-3">
                    {isLoading ? (
                        <LoadingSpinner message="Loading schedule..." />
                    ) : schedule && schedule.length > 0 ? (
                        schedule.map(item => (
                            <div key={item.id} className={`p-3 rounded-lg flex items-center gap-4 ${item.type === 'class' ? 'bg-blue-50 dark:bg-blue-900/40' : 'bg-yellow-50 dark:bg-yellow-900/40'}`}>
                                <div className="text-center w-20 flex-shrink-0">
                                    <p className="font-semibold text-sm text-gray-700 dark:text-gray-200">{formatTime12h(item.startTime)}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">to</p>
                                    <p className="font-semibold text-sm text-gray-700 dark:text-gray-200">{formatTime12h(item.endTime)}</p>
                                </div>
                                {item.type === 'class' ? (
                                    <div>
                                        <p className="font-bold text-gray-800 dark:text-gray-100">{item.subject}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">by {item.teacherName}</p>
                                    </div>
                                ) : (
                                    <p className="font-bold text-yellow-800 dark:text-yellow-300 flex items-center gap-2">
                                        <ClockIcon className="w-5 h-5" />
                                        {item.breakType}
                                    </p>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10">
                            <BookIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto" />
                            <p className="mt-4 text-gray-600 dark:text-gray-400">No classes scheduled for today.</p>
                        </div>
                    )}
                </div>
                <div className="mt-6 flex-shrink-0">
                    <button onClick={onClose} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};
