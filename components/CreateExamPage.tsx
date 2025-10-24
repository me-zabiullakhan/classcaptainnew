

import React, { useState } from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import type { Batch, Exam, BatchAccessPermissions } from '../types';
import { CustomDropdown } from './CustomDropdown';
import { Timestamp } from 'firebase/firestore';

interface CreateExamPageProps {
  onBack: () => void;
  onSave: (examData: Omit<Exam, 'id'>) => Promise<void>;
  batches: Batch[];
  exam?: Exam; // Make exam optional
  staffPermissions?: Record<string, BatchAccessPermissions>;
}

export function CreateExamPage({ onBack, onSave, batches, exam, staffPermissions }: CreateExamPageProps) {
    const isEditMode = !!exam;
    
    const [formData, setFormData] = useState({
        name: exam?.name || '',
        batchId: exam?.batchId || '',
        subject: exam?.subject || '',
        date: exam?.date.toDate().toISOString().split('T')[0] || '',
        time: exam?.date.toDate().toTimeString().substring(0, 5) || '',
        maxMarks: String(exam?.maxMarks || ''),
        passingMarks: String(exam?.passingMarks || ''),
        description: exam?.description || '',
    });
    const [isSaving, setIsSaving] = useState(false);

    const accessibleBatches = batches.filter(b => {
        if (!b.isActive) return false;
        if (!staffPermissions) return true; // Admin
        return !!staffPermissions[b.id]?.exams;
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.batchId || !formData.date || !formData.time) {
            alert("Please fill all required fields.");
            return;
        }

        setIsSaving(true);
        try {
            const selectedBatch = batches.find(b => b.id === formData.batchId);
            const examTimestamp = Timestamp.fromDate(new Date(`${formData.date}T${formData.time}`));

            await onSave({
                name: formData.name,
                batchId: formData.batchId,
                batchName: selectedBatch?.name || 'Unknown Batch',
                subject: formData.subject,
                date: examTimestamp,
                maxMarks: Number(formData.maxMarks),
                passingMarks: Number(formData.passingMarks),
                description: formData.description,
                resultStatus: exam?.resultStatus || 'Draft',
            });
        } catch (error) {
            alert((error as Error).message);
            setIsSaving(false);
        }
    };
    
    return (
        <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">{isEditMode ? 'Edit Exam Details' : 'Create New Exam'}</h1>
            </header>
            
            <form onSubmit={handleSave} className="flex-grow flex flex-col">
                <main className="flex-grow p-4 overflow-y-auto space-y-4">
                    <input type="text" name="name" placeholder="Exam Name (e.g., Mid-Term Test)" value={formData.name} onChange={handleChange} required className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    <CustomDropdown
                        label="Batch / Class"
                        options={accessibleBatches.map(b => ({ value: b.id, label: b.name }))}
                        selectedValue={formData.batchId}
                        onSelect={(value) => setFormData(p => ({ ...p, batchId: value }))}
                        placeholder="Select a batch"
                    />
                    <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    <div className="grid grid-cols-2 gap-4">
                        <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        <input type="time" name="time" value={formData.time} onChange={handleChange} required className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <input type="number" name="maxMarks" placeholder="Max Marks" value={formData.maxMarks} onChange={handleChange} required className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        <input type="number" name="passingMarks" placeholder="Passing Marks" value={formData.passingMarks} onChange={handleChange} required className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <textarea name="description" placeholder="Description / Notes (Optional)" value={formData.description} onChange={handleChange} rows={4} className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                </main>
                <footer className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
                    <button type="submit" disabled={isSaving} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md disabled:bg-indigo-300">
                        {isSaving ? 'Saving...' : (isEditMode ? 'Update Exam' : 'Save Exam')}
                    </button>
                </footer>
            </form>
        </div>
    );
}