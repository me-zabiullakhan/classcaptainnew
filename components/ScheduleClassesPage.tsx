import React, { useState, useEffect } from 'react';
import type { Batch, Staff, ScheduleItem, DailySchedule, ClassScheduleItem, BreakScheduleItem } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';
import { ClockIcon } from './icons/ClockIcon';
import { CustomDropdown } from './CustomDropdown';

interface ScheduleClassesPageProps {
  onBack: () => void;
  batches: Batch[];
  staff: Staff[];
  academyId: string;
  isDemoMode: boolean;
  onSave: (date: string, batchId: string, scheduleItems: ScheduleItem[]) => Promise<void>;
}

export function ScheduleClassesPage({ onBack, batches, staff, academyId, isDemoMode, onSave }: ScheduleClassesPageProps) {
    const [mode, setMode] = useState<'daily' | 'weekly'>('daily');
    const [date, setDate] = useState(new Date());
    const [selectedBatchId, setSelectedBatchId] = useState<string>('');
    const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const dateString = date.toISOString().split('T')[0];
    const activeBatches = batches.filter(b => b.isActive);

    useEffect(() => {
        if (!selectedBatchId || isDemoMode) {
            setScheduleItems([]);
            return;
        }

        const fetchSchedule = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const scheduleRef = doc(db, `academies/${academyId}/schedules`, dateString);
                const docSnap = await getDoc(scheduleRef);
                if (docSnap.exists()) {
                    const data = docSnap.data() as DailySchedule;
                    setScheduleItems(data[selectedBatchId] || []);
                } else {
                    setScheduleItems([]);
                }
            } catch (err) {
                console.error("Error fetching schedule:", err);
                setError("Failed to load schedule. Check your connection.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchSchedule();
    }, [dateString, selectedBatchId, academyId, isDemoMode]);

    const handleUpdateItem = (id: string, field: string, value: string) => {
        setScheduleItems(prev => prev.map(item => {
            if (item.id === id) {
                return { ...item, [field]: value };
            }
            return item;
        }));
    };
    
    const handleTeacherChange = (itemId: string, teacherId: string) => {
        const selectedTeacher = staff.find(s => s.id === teacherId);
        if (!selectedTeacher) return;

        setScheduleItems(prev => prev.map(item => {
            if (item.id === itemId && item.type === 'class') {
                return { ...item, teacherId: selectedTeacher.id, teacherName: selectedTeacher.name };
            }
            return item;
        }));
    };

    const handleAddItem = (type: 'class' | 'break') => {
        const newItem: ScheduleItem = type === 'class'
            ? { id: `${Date.now()}`, type: 'class', subject: '', teacherId: '', teacherName: '', startTime: '', endTime: '' }
            : { id: `${Date.now()}`, type: 'break', breakType: 'Short Break', startTime: '', endTime: '' };
        setScheduleItems(prev => [...prev, newItem]);
    };

    const handleRemoveItem = (id: string) => {
        setScheduleItems(prev => prev.filter(item => item.id !== id));
    };
    
    const handleSave = async () => {
        try {
            await onSave(dateString, selectedBatchId, scheduleItems);
            alert("Schedule saved successfully!");
        } catch (err) {
            alert((err as Error).message);
        }
    };

    return (
        <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Schedule Classes</h1>
            </header>
            
            <main className="flex-grow p-4 overflow-y-auto">
                <div className="bg-white dark:bg-gray-800 p-2 rounded-lg flex justify-around mb-4 shadow-sm">
                    {(['daily', 'weekly'] as const).map(m => (
                        <button key={m} onClick={() => setMode(m)} className={`px-4 py-2 rounded-md text-sm font-semibold capitalize w-1/2 transition-colors ${mode === m ? 'bg-indigo-600 text-white shadow' : 'text-gray-600 dark:text-gray-300'}`}>
                            {m} Schedule
                        </button>
                    ))}
                </div>

                {mode === 'daily' && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label htmlFor="schedule-date" className="block text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">Date</label>
                                <input id="schedule-date" type="date" value={dateString} onChange={e => setDate(new Date(e.target.value))} className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                           <CustomDropdown
                                label="Batch"
                                options={activeBatches.map(b => ({ value: b.id, label: b.name }))}
                                selectedValue={selectedBatchId}
                                onSelect={setSelectedBatchId}
                                placeholder="Select a Batch"
                            />
                        </div>

                        {selectedBatchId && (
                            <div className="space-y-4">
                                {scheduleItems.map((item, index) => (
                                    <div key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-indigo-500">
                                        <div className="flex justify-between items-center mb-4 border-b dark:border-gray-700 pb-3">
                                            <span className="font-bold text-lg text-gray-800 dark:text-gray-200">{item.type === 'class' ? `Class ${index + 1 - scheduleItems.filter((_, i) => i < index && _.type === 'break').length}` : 'Break'}</span>
                                            <button onClick={() => handleRemoveItem(item.id)} className="p-1.5 text-red-500 hover:text-red-700 rounded-full hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"><TrashIcon className="w-5 h-5" /></button>
                                        </div>
                                        {item.type === 'class' ? (
                                            <div className="space-y-4">
                                                <div>
                                                    <label htmlFor={`subject-${item.id}`} className="block text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">Subject</label>
                                                    <input id={`subject-${item.id}`} type="text" placeholder="e.g., Physics, Mathematics" value={(item as ClassScheduleItem).subject} onChange={e => handleUpdateItem(item.id, 'subject', e.target.value)} className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                                </div>
                                                <CustomDropdown
                                                    label="Teacher"
                                                    options={staff.map(s => ({ value: s.id, label: s.name }))}
                                                    selectedValue={(item as ClassScheduleItem).teacherId}
                                                    onSelect={(teacherId) => handleTeacherChange(item.id, teacherId)}
                                                    placeholder="Select Teacher"
                                                />
                                                <div className="flex gap-4">
                                                    <div className="w-full">
                                                        <label htmlFor={`start-time-${item.id}`} className="block text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">Start Time</label>
                                                        <input id={`start-time-${item.id}`} type="time" aria-label="Start time" value={item.startTime} onChange={e => handleUpdateItem(item.id, 'startTime', e.target.value)} className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                                    </div>
                                                    <div className="w-full">
                                                        <label htmlFor={`end-time-${item.id}`} className="block text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">End Time</label>
                                                        <input id={`end-time-${item.id}`} type="time" aria-label="End time" value={item.endTime} onChange={e => handleUpdateItem(item.id, 'endTime', e.target.value)} className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                <CustomDropdown
                                                    label="Break Type"
                                                    options={[
                                                        { value: 'Short Break', label: 'Short Break' },
                                                        { value: 'Lunch Break', label: 'Lunch Break' },
                                                        { value: 'Other', label: 'Other' },
                                                    ]}
                                                    selectedValue={(item as BreakScheduleItem).breakType}
                                                    onSelect={(value) => handleUpdateItem(item.id, 'breakType', value)}
                                                    placeholder="Select Break Type"
                                                />
                                                <div className="flex gap-4">
                                                    <div className="w-full">
                                                        <label htmlFor={`break-start-time-${item.id}`} className="block text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">Start Time</label>
                                                        <input id={`break-start-time-${item.id}`} type="time" aria-label="Start time" value={item.startTime} onChange={e => handleUpdateItem(item.id, 'startTime', e.target.value)} className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                                    </div>
                                                    <div className="w-full">
                                                        <label htmlFor={`break-end-time-${item.id}`} className="block text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">End Time</label>
                                                        <input id={`break-end-time-${item.id}`} type="time" aria-label="End time" value={item.endTime} onChange={e => handleUpdateItem(item.id, 'endTime', e.target.value)} className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div className="flex gap-3 pt-2">
                                    <button onClick={() => handleAddItem('class')} className="w-full bg-blue-500 text-white p-2.5 rounded-lg flex items-center justify-center gap-1.5 font-semibold hover:bg-blue-600 transition-colors"><PlusIcon className="w-5 h-5"/> Class</button>
                                    <button onClick={() => handleAddItem('break')} className="w-full bg-yellow-500 text-white p-2.5 rounded-lg flex items-center justify-center gap-1.5 font-semibold hover:bg-yellow-600 transition-colors"><ClockIcon className="w-5 h-5"/> Break</button>
                                </div>
                            </div>
                        )}
                    </>
                )}
                
                {mode === 'weekly' && (
                    <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Coming Soon!</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">The weekly timetable feature is under development. Please check back later!</p>
                    </div>
                )}
            </main>
            
            {mode === 'daily' && selectedBatchId && (
                <footer className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700 flex-shrink-0">
                    <button onClick={handleSave} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
                        Save Schedule
                    </button>
                </footer>
            )}
        </div>
    );
}
