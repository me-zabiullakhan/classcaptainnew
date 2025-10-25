

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { Batch, Staff, ScheduleItem, DailySchedule, ClassScheduleItem, BreakScheduleItem } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { db } from '../firebaseConfig';
import { doc, getDoc, updateDoc, deleteField } from 'firebase/firestore';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';
import { ClockIcon } from './icons/ClockIcon';
import { CustomDropdown } from './CustomDropdown';
import { PencilIcon } from './icons/PencilIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

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

const DeleteConfirmationModal = ({ batchName, onConfirm, onCancel, isDeleting }: { batchName: string, onConfirm: () => void, onCancel: () => void, isDeleting: boolean }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/40 mb-5">
                <TrashIcon className="h-9 w-9 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Delete Schedule?</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to delete the schedule for <span className="font-bold">{batchName}</span> on this day? This action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row-reverse gap-3">
                <button onClick={onConfirm} disabled={isDeleting} className="w-full sm:w-auto flex-1 bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition-colors shadow-md disabled:bg-red-300">
                    {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                </button>
                <button onClick={onCancel} disabled={isDeleting} className="w-full sm:w-auto flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                    No
                </button>
            </div>
        </div>
    </div>
);

const SuccessModal = ({ onClose }: { onClose: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg max-w-sm mx-auto text-center">
                <div className="animate-pulse">
                     <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-4">Deleted Successfully!</h3>
                <button onClick={onClose} className="mt-6 bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg">
                    OK
                </button>
            </div>
        </div>
    );
};


interface ScheduleEditorProps {
  onBack: () => void;
  batches: Batch[];
  staff: Staff[];
  onSave: (date: string, batchId: string, scheduleItems: ScheduleItem[]) => Promise<void>;
  initialDate: Date;
  initialBatchId: string;
  academyId: string;
  isDemoMode: boolean;
}

const ScheduleEditor: React.FC<ScheduleEditorProps> = ({ onBack, batches, staff, onSave, initialDate, initialBatchId, academyId, isDemoMode }) => {
    const [date, setDate] = useState(initialDate);
    const [selectedBatchId, setSelectedBatchId] = useState<string>(initialBatchId);
    const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const dateString = date.toISOString().split('T')[0];

    useEffect(() => {
        if (!selectedBatchId || isDemoMode) {
            setScheduleItems([]);
            return;
        }

        const fetchSchedule = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const scheduleRef = doc(db, `academies/${academyId}/schedules/${date.toISOString().split('T')[0]}`);
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
    }, [date, selectedBatchId, academyId, isDemoMode]);
    
    const handleUpdateItem = (id: string, field: string, value: string) => {
        setScheduleItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const handleTeacherChange = (itemId: string, teacherId: string) => {
        const selectedTeacher = staff.find(s => s.id === teacherId);
        if (!selectedTeacher) return;
        setScheduleItems(prev => prev.map(item => (item.id === itemId && item.type === 'class') ? { ...item, teacherId: selectedTeacher.id, teacherName: selectedTeacher.name } : item));
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
            onBack();
        } catch (err) {
            alert((err as Error).message);
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label htmlFor="schedule-date" className="block text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">Date</label>
                    <input id="schedule-date" type="date" value={dateString} onChange={e => setDate(new Date(e.target.value))} className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <CustomDropdown
                    label="Batch"
                    options={batches.map(b => ({ value: b.id, label: b.name }))}
                    selectedValue={selectedBatchId}
                    onSelect={setSelectedBatchId}
                    placeholder="Select a Batch"
                />
            </div>
            
            {selectedBatchId && (
                <div className="space-y-4">
                     {isLoading && <p>Loading...</p>}
                     {error && <p className="text-red-500">{error}</p>}
                    {scheduleItems.map((item, index) => (
                        <div key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-indigo-500">
                            <div className="flex justify-between items-center mb-4 border-b dark:border-gray-700 pb-3">
                                <span className="font-bold text-lg text-gray-800 dark:text-gray-200">{item.type === 'class' ? `Class ${index + 1 - scheduleItems.filter((_, i) => i < index && _.type === 'break').length}` : 'Break'}</span>
                                <button onClick={() => handleRemoveItem(item.id)} className="p-1.5 text-red-500 hover:text-red-700 rounded-full hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"><TrashIcon className="w-5 h-5" /></button>
                            </div>
                            {item.type === 'class' ? (
                                <div className="space-y-4">
                                    <input type="text" placeholder="Subject" value={(item as ClassScheduleItem).subject} onChange={e => handleUpdateItem(item.id, 'subject', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg" />
                                    <CustomDropdown label="Teacher" options={staff.map(s => ({ value: s.id, label: s.name }))} selectedValue={(item as ClassScheduleItem).teacherId} onSelect={(teacherId) => handleTeacherChange(item.id, teacherId)} placeholder="Select Teacher" />
                                    <div className="flex gap-4"><input type="time" aria-label="Start time" value={item.startTime} onChange={e => handleUpdateItem(item.id, 'startTime', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border" /><input type="time" aria-label="End time" value={item.endTime} onChange={e => handleUpdateItem(item.id, 'endTime', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border" /></div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <CustomDropdown label="Break Type" options={[{ value: 'Short Break', label: 'Short Break' }, { value: 'Lunch Break', label: 'Lunch Break' }, { value: 'Other', label: 'Other' }]} selectedValue={(item as BreakScheduleItem).breakType} onSelect={(value) => handleUpdateItem(item.id, 'breakType', value)} placeholder="Select Break Type"/>
                                    <div className="flex gap-4"><input type="time" aria-label="Start time" value={item.startTime} onChange={e => handleUpdateItem(item.id, 'startTime', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border" /><input type="time" aria-label="End time" value={item.endTime} onChange={e => handleUpdateItem(item.id, 'endTime', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border" /></div>
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="flex gap-3 pt-2">
                        <button onClick={() => handleAddItem('class')} className="w-full bg-blue-500 text-white p-2.5 rounded-lg flex items-center justify-center gap-1.5 font-semibold hover:bg-blue-600"><PlusIcon className="w-5 h-5"/> Class</button>
                        <button onClick={() => handleAddItem('break')} className="w-full bg-yellow-500 text-white p-2.5 rounded-lg flex items-center justify-center gap-1.5 font-semibold hover:bg-yellow-600"><ClockIcon className="w-5 h-5"/> Break</button>
                    </div>

                    <div className="mt-6 flex gap-3">
                         <button type="button" onClick={onBack} className="w-full bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300">Cancel</button>
                         <button type="button" onClick={handleSave} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700">Save Schedule</button>
                    </div>
                </div>
            )}
        </div>
    )
};


const BatchScheduleView: React.FC<{ batch: Batch; items: ScheduleItem[]; onEdit: (batchId: string) => void; onDelete: (batchId: string, batchName: string) => void; }> = ({ batch, items, onEdit, onDelete }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg text-indigo-700 dark:text-indigo-400 mb-2">{batch.name}</h3>
            {items.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">No classes scheduled for this batch.</p>
            ) : (
                <div className="space-y-2">
                    {items.map(item => (
                        <div key={item.id} className={`p-2 rounded-md flex items-center space-x-3 ${item.type === 'class' ? 'bg-gray-50 dark:bg-gray-700/50' : 'bg-yellow-50 dark:bg-yellow-900/40'}`}>
                             <div className="text-center w-20 flex-shrink-0">
                                <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">{formatTime12h(item.startTime)}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{formatTime12h(item.endTime)}</p>
                            </div>
                            {item.type === 'class' ? (
                                <div>
                                    <p className="font-semibold text-gray-800 dark:text-gray-100">{item.subject}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.teacherName}</p>
                                </div>
                            ) : (
                                <p className="font-semibold text-yellow-800 dark:text-yellow-300">{item.breakType}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
            <div className="border-t dark:border-gray-700 mt-4 pt-3 flex justify-end space-x-2">
                <button
                    onClick={() => onDelete(batch.id, batch.name)}
                    className="flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-100 dark:bg-red-900/40 rounded-md hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors"
                    aria-label={`Delete schedule for ${batch.name}`}
                >
                    <TrashIcon className="w-4 h-4" />
                    <span>Delete</span>
                </button>
                <button
                    onClick={() => onEdit(batch.id)}
                    className="flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                    aria-label={`Edit schedule for ${batch.name}`}
                >
                    <PencilIcon className="w-4 h-4" />
                    <span>Edit</span>
                </button>
            </div>
        </div>
    );
};


const ScheduleViewer: React.FC<{
    batches: Batch[];
    date: Date;
    setDate: React.Dispatch<React.SetStateAction<Date>>;
    dailySchedule: DailySchedule | null;
    isLoading: boolean;
    error: string | null;
    onEnterEditMode: (batchId: string) => void;
    onDeleteSchedule: (batchId: string, batchName: string) => void;
}> = ({ batches, date, setDate, dailySchedule, isLoading, error, onEnterEditMode, onDeleteSchedule }) => {
    
    const dateString = date.toISOString().split('T')[0];
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    const scheduledBatches = useMemo(() => {
        if (!dailySchedule) return [];
        return batches.filter(b => dailySchedule[b.id] && dailySchedule[b.id].length > 0)
    }, [batches, dailySchedule]);

    const getUpcomingItems = useCallback((items: ScheduleItem[]) => {
        if (!isToday) return items;
        return items.filter(item => {
            if (!item.endTime) return true;
            const [hours, minutes] = item.endTime.split(':').map(Number);
            const itemEndTime = new Date();
            itemEndTime.setHours(hours, minutes, 0, 0);
            return itemEndTime > now;
        }).sort((a,b) => a.startTime.localeCompare(b.startTime));
    }, [isToday, now]);

    return (
        <div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-4">
                <label htmlFor="view-date" className="block text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">Select Date</label>
                <input id="view-date" type="date" value={dateString} onChange={e => setDate(new Date(e.target.value))} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            
            <button onClick={() => onEnterEditMode(batches[0]?.id || '')} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md mb-6">
                Manage Schedule
            </button>
            
            <div className="space-y-4">
                {isLoading && <p>Loading schedule...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!isLoading && !error && (
                    scheduledBatches.length > 0 ? (
                        scheduledBatches.map(batch => {
                            const batchSchedule = dailySchedule?.[batch.id] || [];
                            const upcomingSchedule = getUpcomingItems(batchSchedule);
                            if (upcomingSchedule.length === 0) return null;

                            return <BatchScheduleView key={batch.id} batch={batch} items={upcomingSchedule} onEdit={onEnterEditMode} onDelete={onDeleteSchedule} />;
                        })
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-lg text-gray-500 dark:text-gray-400">No classes scheduled for this day.</p>
                            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Click 'Manage Schedule' to add classes.</p>
                        </div>
                    )
                )}
            </div>
        </div>
    )
};


interface ScheduleClassesPageProps {
  onBack: () => void;
  batches: Batch[];
  staff: Staff[];
  academyId: string;
  onSave: (date: string, batchId: string, scheduleItems: ScheduleItem[]) => Promise<void>;
  isDemoMode: boolean;
}

export function ScheduleClassesPage({ onBack, batches, staff, academyId, onSave, isDemoMode }: ScheduleClassesPageProps) {
    const [mode, setMode] = useState<'view' | 'edit'>('view');
    const [editorBatchId, setEditorBatchId] = useState<string | null>(null);
    const [date, setDate] = useState(new Date());

    const [dailySchedule, setDailySchedule] = useState<DailySchedule | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [deletingSchedule, setDeletingSchedule] = useState<{ batchId: string; batchName: string } | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        if (isDemoMode) return;
        
        const dateString = date.toISOString().split('T')[0];

        const fetchDailySchedule = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const scheduleRef = doc(db, `academies/${academyId}/schedules/${dateString}`);
                const docSnap = await getDoc(scheduleRef);
                if (docSnap.exists()) {
                    setDailySchedule(docSnap.data() as DailySchedule);
                } else {
                    setDailySchedule(null);
                }
            } catch (err) {
                console.error("Error fetching daily schedule:", err);
                setError("Failed to load schedule data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchDailySchedule();
    }, [date, academyId, isDemoMode]);

    const handleEnterEditMode = (batchId: string) => {
        setEditorBatchId(batchId);
        setMode('edit');
    };
    
    const handleExitEditMode = () => {
        setEditorBatchId(null);
        setMode('view');
    };

    const handleDeleteSchedule = async () => {
        if (!deletingSchedule || isDemoMode) {
            if (isDemoMode) alert("Demo mode: Cannot delete schedule.");
            return;
        }
        
        setIsDeleting(true);
        try {
            const scheduleRef = doc(db, `academies/${academyId}/schedules/${date.toISOString().split('T')[0]}`);
            await updateDoc(scheduleRef, {
                [deletingSchedule.batchId]: deleteField()
            });
            
            setDailySchedule(prev => {
                if (!prev) return null;
                const newSchedule = { ...prev };
                delete newSchedule[deletingSchedule.batchId];
                return newSchedule;
            });
            
            setDeletingSchedule(null);
            setShowSuccessModal(true);

        } catch (error) {
            console.error("Error deleting schedule:", error);
            alert("Failed to delete schedule. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };
    
    return (
        <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={mode === 'edit' ? handleExitEditMode : onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Schedule Classes</h1>
            </header>

            <main className="flex-grow p-4 overflow-y-auto">
                {mode === 'edit' && editorBatchId ? (
                    <ScheduleEditor 
                        onBack={handleExitEditMode}
                        batches={batches}
                        staff={staff}
                        onSave={onSave}
                        initialDate={date}
                        initialBatchId={editorBatchId}
                        academyId={academyId}
                        isDemoMode={isDemoMode}
                    />
                ) : (
                    <ScheduleViewer
                        batches={batches}
                        date={date}
                        setDate={setDate}
                        dailySchedule={dailySchedule}
                        isLoading={isLoading}
                        error={error}
                        onEnterEditMode={handleEnterEditMode}
                        onDeleteSchedule={(batchId, batchName) => setDeletingSchedule({ batchId, batchName })}
                    />
                )}
            </main>
            {deletingSchedule && (
                <DeleteConfirmationModal
                    batchName={deletingSchedule.batchName}
                    onConfirm={handleDeleteSchedule}
                    onCancel={() => setDeletingSchedule(null)}
                    isDeleting={isDeleting}
                />
            )}
            {showSuccessModal && (
                <SuccessModal onClose={() => setShowSuccessModal(false)} />
            )}
        </div>
    );
}