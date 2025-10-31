import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { Batch, Staff, ScheduleItem, DailySchedule, StaffAttendance } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { db } from '../firebaseConfig';
// FIX: Import `Timestamp` from `firebase/firestore` to fix 'Cannot find name Timestamp' error.
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';
import { CustomDropdown } from './CustomDropdown';
import { LoadingSpinner } from './LoadingSpinner';
import { PencilIcon } from './icons/PencilIcon';
import { XMarkIcon } from './icons/XMarkIcon';

interface MarkStaffAttendancePageProps {
  onBack: () => void;
  batches: Batch[];
  staff: Staff[];
  academyId: string;
  isDemoMode: boolean;
  staffAttendance: StaffAttendance[];
  onSave: (data: Partial<Omit<StaffAttendance, 'id'>>, id?: string) => Promise<string | void>;
  onDelete: (id: string) => Promise<void>;
}

const AttendanceModal: React.FC<{
    onClose: () => void;
    onSave: (data: Partial<Omit<StaffAttendance, 'id'>>) => Promise<void>;
    staffMember: Staff;
    date: Date;
    batches: Batch[];
    scheduledClasses: (ScheduleItem & { batchName: string })[];
    existingEntry?: StaffAttendance | null;
}> = ({ onClose, onSave, staffMember, date, batches, scheduledClasses, existingEntry }) => {
    const isEditMode = !!existingEntry;
    
    const [selectedClass, setSelectedClass] = useState<string>(existingEntry?.scheduleItemId || (scheduledClasses.length > 0 ? scheduledClasses[0].id : 'unscheduled'));
    const [unscheduledBatchId, setUnscheduledBatchId] = useState(isEditMode && !existingEntry?.scheduleItemId ? existingEntry.batchId : '');
    const [unscheduledSubject, setUnscheduledSubject] = useState(isEditMode && !existingEntry?.scheduleItemId ? existingEntry.subject : '');
    const [startTime, setStartTime] = useState(existingEntry?.startTime || '');
    const [endTime, setEndTime] = useState(existingEntry?.endTime || '');
    const [notes, setNotes] = useState(existingEntry?.notes || '');
    const [isSaving, setIsSaving] = useState(false);
    
    const classOptions = useMemo(() => [
        ...scheduledClasses.map(sc => ({ value: sc.id, label: `${sc.subject} - ${sc.batchName} (${sc.startTime})`})),
        { value: 'unscheduled', label: 'Unscheduled Class' }
    ], [scheduledClasses]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        let classDetails: Partial<StaffAttendance> = {};
        if (selectedClass === 'unscheduled') {
            const batch = batches.find(b => b.id === unscheduledBatchId);
            if (!batch || !unscheduledSubject) {
                alert("Please select a batch and enter a subject for unscheduled classes.");
                setIsSaving(false);
                return;
            }
            classDetails = { batchId: batch.id, batchName: batch.name, subject: unscheduledSubject, scheduleItemId: null };
        } else {
            const scheduledClass = scheduledClasses.find(sc => sc.id === selectedClass);
            const batch = batches.find(b => b.name === scheduledClass?.batchName);
            if (!scheduledClass || !batch) {
                alert("Selected scheduled class is invalid.");
                setIsSaving(false);
                return;
            }
            classDetails = { batchId: batch.id, batchName: batch.name, subject: scheduledClass.subject, scheduleItemId: scheduledClass.id };
        }
        
        try {
            await onSave({
                ...classDetails,
                startTime,
                endTime,
                notes,
            });
            onClose();
        } catch (error) {
            console.error(error);
            alert("Failed to save attendance.");
        } finally {
            setIsSaving(false);
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-lg mx-auto flex flex-col max-h-[90vh]">
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{isEditMode ? 'Edit Entry' : 'Add Class Entry'}</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><XMarkIcon className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSave} className="flex-grow overflow-y-auto pr-2 space-y-4">
                    <CustomDropdown label="Class" options={classOptions} selectedValue={selectedClass} onSelect={setSelectedClass} />
                    {selectedClass === 'unscheduled' && (
                        <div className="p-3 border rounded-md space-y-3 bg-gray-50 dark:bg-gray-700/50">
                            <CustomDropdown label="Batch" options={batches.map(b => ({value: b.id, label: b.name}))} selectedValue={unscheduledBatchId} onSelect={setUnscheduledBatchId} placeholder="Select batch..."/>
                            <input type="text" placeholder="Subject" value={unscheduledSubject} onChange={e => setUnscheduledSubject(e.target.value)} className="w-full p-2 border rounded-md" />
                        </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Start Time</label>
                            <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} required className="mt-1 w-full p-2 border rounded-md" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">End Time</label>
                            <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} required className="mt-1 w-full p-2 border rounded-md" />
                        </div>
                    </div>
                    <textarea placeholder="Notes (optional)" value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="w-full p-2 border rounded-md"/>
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-lg bg-gray-200 dark:bg-gray-600 font-bold">Cancel</button>
                        <button type="submit" disabled={isSaving} className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-bold disabled:bg-indigo-300">{isSaving ? 'Saving...' : 'Save'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
};


export function MarkStaffAttendancePage({ onBack, batches, staff, academyId, isDemoMode, staffAttendance, onSave, onDelete }: MarkStaffAttendancePageProps) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedStaffId, setSelectedStaffId] = useState<string | null>(staff.find(s => s.isActive)?.id || null);
    const [showModal, setShowModal] = useState(false);
    const [editingEntry, setEditingEntry] = useState<StaffAttendance | null>(null);
    const [isLoadingSchedule, setIsLoadingSchedule] = useState(false);
    const [scheduledClasses, setScheduledClasses] = useState<(ScheduleItem & { batchName: string })[]>([]);
    
    const dateString = selectedDate.toISOString().split('T')[0];
    const activeStaff = staff.filter(s => s.isActive);

    useEffect(() => {
        if (!selectedStaffId || isDemoMode) {
            setScheduledClasses([]);
            return;
        }

        const fetchSchedule = async () => {
            setIsLoadingSchedule(true);
            try {
                const scheduleRef = doc(db, `academies/${academyId}/schedules/${dateString}`);
                const docSnap = await getDoc(scheduleRef);
                const staffClasses: (ScheduleItem & { batchName: string })[] = [];
                if (docSnap.exists()) {
                    const data = docSnap.data() as DailySchedule;
                    for (const batchId in data) {
                        const batch = batches.find(b => b.id === batchId);
                        if (batch) {
                            data[batchId].forEach(item => {
                                if (item.type === 'class' && item.teacherId === selectedStaffId) {
                                    staffClasses.push({ ...item, batchName: batch.name });
                                }
                            });
                        }
                    }
                }
                staffClasses.sort((a,b) => a.startTime.localeCompare(b.startTime));
                setScheduledClasses(staffClasses);
            } catch (err) {
                console.error("Error fetching staff schedule:", err);
            } finally {
                setIsLoadingSchedule(false);
            }
        };

        fetchSchedule();
    }, [selectedDate, selectedStaffId, academyId, isDemoMode, batches]);

    const todaysAttendance = useMemo(() => staffAttendance.filter(sa => 
        sa.staffId === selectedStaffId && sa.date.toDate().toDateString() === selectedDate.toDateString()
    ).sort((a,b) => a.startTime.localeCompare(b.startTime)), [staffAttendance, selectedStaffId, selectedDate]);
    
    const handleSaveEntry = async (data: Partial<Omit<StaffAttendance, 'id'>>) => {
        if (!selectedStaffId) return;
        const staffMember = staff.find(s => s.id === selectedStaffId);
        if(!staffMember) return;
        
        await onSave({
            ...data,
            staffId: staffMember.id,
            staffName: staffMember.name,
            date: Timestamp.fromDate(selectedDate),
        }, editingEntry?.id);
    };

    return (
        <>
            <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
                <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                    <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-bold ml-2">Staff Attendance</h1>
                </header>

                <main className="flex-grow p-4 overflow-y-auto">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm space-y-4 mb-4">
                        <input type="date" value={dateString} onChange={e => setSelectedDate(new Date(e.target.value))} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"/>
                        <CustomDropdown label="Select Staff" options={activeStaff.map(s => ({value: s.id, label: s.name}))} selectedValue={selectedStaffId} onSelect={setSelectedStaffId} placeholder="Select a staff member"/>
                    </div>
                    {selectedStaffId && (
                        <>
                            {isLoadingSchedule ? <LoadingSpinner message="Loading schedule..."/> : 
                            todaysAttendance.length > 0 ? (
                                <div className="space-y-3">
                                    {todaysAttendance.map(entry => (
                                        <div key={entry.id} className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm flex items-center justify-between">
                                            <div>
                                                <p className="font-semibold">{entry.subject} <span className="text-sm font-normal text-gray-500">({entry.batchName})</span></p>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">{entry.startTime} - {entry.endTime} ({entry.durationMinutes} mins)</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => {setEditingEntry(entry); setShowModal(true);}} className="p-1.5 text-blue-600 rounded-full hover:bg-blue-100"><PencilIcon className="w-4 h-4"/></button>
                                                <button onClick={() => onDelete(entry.id)} className="p-1.5 text-red-600 rounded-full hover:bg-red-100"><TrashIcon className="w-4 h-4"/></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500 py-6">No attendance marked for this day.</p>
                            )}
                             <button onClick={() => {setEditingEntry(null); setShowModal(true)}} className="mt-4 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700">
                                <PlusIcon className="w-5 h-5"/>
                                Add Class Entry
                            </button>
                        </>
                    )}
                </main>
            </div>
            {showModal && selectedStaffId && (
                <AttendanceModal 
                    onClose={() => setShowModal(false)}
                    onSave={handleSaveEntry}
                    staffMember={staff.find(s => s.id === selectedStaffId)!}
                    date={selectedDate}
                    batches={batches}
                    scheduledClasses={scheduledClasses}
                    existingEntry={editingEntry}
                />
            )}
        </>
    );
}