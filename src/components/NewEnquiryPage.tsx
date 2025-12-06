import React, { useState } from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import type { Batch, Enquiry, EnquiryStatus, ReferenceSource } from '../types';
import { CustomDropdown } from './CustomDropdown';
import { Timestamp, serverTimestamp } from 'firebase/firestore';

interface NewEnquiryPageProps {
  onBack: () => void;
  onSave: (enquiryData: any) => Promise<void>;
  batches: Batch[];
  enquiry?: Enquiry | null;
}

const REFERENCE_SOURCES: ReferenceSource[] = ['Google', 'Referral', 'Walk-in', 'Social Media', 'Other'];
const STATUSES: EnquiryStatus[] = ['New', 'Follow-up', 'Converted', 'Lost'];

export function NewEnquiryPage({ onBack, onSave, batches, enquiry }: NewEnquiryPageProps) {
    const isEditMode = !!enquiry;
    
    const [formData, setFormData] = useState({
        studentName: enquiry?.studentName || '',
        mobile: enquiry?.mobile || '',
        email: enquiry?.email || '',
        interestedBatch: enquiry?.interestedBatch || '',
        referenceSource: enquiry?.referenceSource || 'Other',
        followUpDate: enquiry?.followUpDate?.toDate().toISOString().split('T')[0] || '',
        notes: enquiry?.notes || '',
        status: enquiry?.status || 'New',
    });
    const [isSaving, setIsSaving] = useState(false);

    const activeBatches = batches.filter(b => b.isActive);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.studentName || !formData.mobile || !formData.interestedBatch) {
            alert("Please fill Name, Mobile, and Interested Batch.");
            return;
        }

        setIsSaving(true);
        const dataToSave = {
            ...formData,
            referenceSource: formData.referenceSource as ReferenceSource,
            status: formData.status as EnquiryStatus,
            followUpDate: formData.followUpDate ? Timestamp.fromDate(new Date(formData.followUpDate)) : null,
        };

        try {
            if (isEditMode) {
                await onSave({ enquiryId: enquiry.id, data: dataToSave });
            } else {
                await onSave({ ...dataToSave, createdAt: serverTimestamp() });
            }
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
                <h1 className="text-xl font-bold ml-2">{isEditMode ? 'Edit Enquiry' : 'New Enquiry'}</h1>
            </header>
            
            <form onSubmit={handleSave} className="flex-grow flex flex-col">
                <main className="flex-grow p-4 overflow-y-auto space-y-4">
                    <input type="text" name="studentName" placeholder="Student Name" value={formData.studentName} onChange={handleChange} required className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    <input type="tel" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} required className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    <input type="email" name="email" placeholder="Email (Optional)" value={formData.email} onChange={handleChange} className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    <CustomDropdown
                        label="Interested Class"
                        options={activeBatches.map(b => ({ value: b.name, label: b.name }))}
                        selectedValue={formData.interestedBatch}
                        onSelect={(value) => setFormData(p => ({ ...p, interestedBatch: value }))}
                        placeholder="Select a class"
                    />
                    <CustomDropdown
                        label="Reference Source"
                        options={REFERENCE_SOURCES.map(s => ({ value: s, label: s }))}
                        selectedValue={formData.referenceSource}
                        // FIX: Cast string value from onSelect to the expected 'ReferenceSource' type.
                        onSelect={(value) => setFormData(p => ({ ...p, referenceSource: value as ReferenceSource }))}
                    />
                     <div>
                        <label htmlFor="followUpDate" className="block text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">Next Follow-up Date (Optional)</label>
                        <input id="followUpDate" type="date" name="followUpDate" value={formData.followUpDate} onChange={handleChange} className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                     <CustomDropdown
                        label="Status"
                        options={STATUSES.map(s => ({ value: s, label: s }))}
                        selectedValue={formData.status}
                        // FIX: Cast string value from onSelect to the expected 'EnquiryStatus' type.
                        onSelect={(value) => setFormData(p => ({ ...p, status: value as EnquiryStatus }))}
                    />
                    <textarea name="notes" placeholder="Notes (Optional)" value={formData.notes} onChange={handleChange} rows={4} className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                </main>
                <footer className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
                    <button type="submit" disabled={isSaving} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md disabled:bg-indigo-300">
                        {isSaving ? 'Saving...' : (isEditMode ? 'Update Enquiry' : 'Save Enquiry')}
                    </button>
                </footer>
            </form>
        </div>
    );
}