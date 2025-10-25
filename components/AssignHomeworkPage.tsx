import React, { useState } from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import type { Batch, Homework } from '../types';
import { CustomDropdown } from './CustomDropdown';
import { storage } from '../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { serverTimestamp, Timestamp } from 'firebase/firestore';

interface AssignHomeworkPageProps {
  onBack: () => void;
  onSave: (data: Omit<Homework, 'id'>) => Promise<void>;
  batches: Batch[];
  academyId: string;
  uploaderName: string;
  homeworkToEdit?: Homework;
  isDemoMode: boolean;
}

export function AssignHomeworkPage({ onBack, onSave, batches, academyId, uploaderName, homeworkToEdit, isDemoMode }: AssignHomeworkPageProps) {
    const isEditMode = !!homeworkToEdit;
    
    const [formData, setFormData] = useState({
        title: homeworkToEdit?.title || '',
        description: homeworkToEdit?.description || '',
        batchId: homeworkToEdit?.batchId || '',
        subject: homeworkToEdit?.subject || '',
        dueDate: homeworkToEdit?.dueDate.toDate().toISOString().split('T')[0] || '',
    });
    const [file, setFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isSaving, setIsSaving] = useState(false);

    const activeBatches = batches.filter(b => b.isActive);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isDemoMode) {
            alert("This is a demo. Data cannot be saved.");
            return;
        }
        if (!formData.title || !formData.batchId || !formData.subject || !formData.dueDate) {
            alert("Please fill all required fields: Title, Batch, Subject, and Due Date.");
            return;
        }

        setIsSaving(true);
        const selectedBatch = batches.find(b => b.id === formData.batchId);
        
        try {
            let attachmentUrl: string | undefined = homeworkToEdit?.attachmentUrl;
            let attachmentName: string | undefined = homeworkToEdit?.attachmentName;
            let storagePath: string | undefined = homeworkToEdit?.storagePath;
            
            if (file) {
                // Upload new file
                storagePath = `academies/${academyId}/homework_attachments/${Date.now()}_${file.name}`;
                const storageRef = ref(storage, storagePath);
                const uploadTask = uploadBytesResumable(storageRef, file);

                await new Promise<void>((resolve, reject) => {
                    uploadTask.on('state_changed', 
                        (snapshot) => {
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            setUploadProgress(progress);
                        },
                        (error) => {
                            console.error("Upload failed:", error);
                            alert("File upload failed. Please try again.");
                            setIsSaving(false);
                            reject(error);
                        },
                        async () => {
                            attachmentUrl = await getDownloadURL(uploadTask.snapshot.ref);
                            attachmentName = file.name;
                            resolve();
                        }
                    );
                });
            }

            await onSave({
                ...formData,
                dueDate: Timestamp.fromDate(new Date(formData.dueDate)),
                attachmentUrl,
                attachmentName,
                storagePath,
                batchName: selectedBatch?.name || '',
                assignedAt: homeworkToEdit?.assignedAt || serverTimestamp(),
                assignedBy: uploaderName,
            });

        } catch (error) {
            if (!isSaving) return; // Prevent alert if already handled
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
                <h1 className="text-xl font-bold ml-2">{isEditMode ? 'Edit Homework' : 'Assign Homework'}</h1>
            </header>
            
            <form onSubmit={handleSave} className="flex-grow flex flex-col">
                <main className="flex-grow p-4 overflow-y-auto space-y-4">
                    <input type="text" name="title" placeholder="Homework Title" value={formData.title} onChange={handleChange} required className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    <CustomDropdown
                        label="Batch / Class"
                        options={activeBatches.map(b => ({ value: b.id, label: b.name }))}
                        selectedValue={formData.batchId}
                        onSelect={(value) => setFormData(p => ({ ...p, batchId: value }))}
                        placeholder="Select a batch"
                    />
                    <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                     <div>
                        <label htmlFor="dueDate" className="block text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">Due Date</label>
                        <input id="dueDate" type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <textarea name="description" placeholder="Description / Instructions (Optional)" value={formData.description} onChange={handleChange} rows={4} className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                    
                    <div>
                        <label htmlFor="file-upload" className="w-full p-3 bg-white dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500">
                            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Attach File (Optional)</span>
                            {file && <span className="text-sm text-gray-500 mt-1">{file.name}</span>}
                            {isEditMode && !file && homeworkToEdit?.attachmentName && <span className="text-sm text-gray-500 mt-1">Current: {homeworkToEdit.attachmentName}</span>}
                        </label>
                        <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" />
                        {isSaving && uploadProgress > 0 && uploadProgress < 100 && (
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
                                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                            </div>
                        )}
                    </div>

                </main>
                <footer className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
                    <button type="submit" disabled={isSaving} className="relative w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md disabled:bg-indigo-300 disabled:cursor-not-allowed overflow-hidden">
                        <span className="relative z-10">
                            {isSaving ? `Saving... ${Math.round(uploadProgress)}%` : (isEditMode ? 'Update Homework' : 'Assign Homework')}
                        </span>
                        {isSaving && (
                            <div 
                                className="absolute top-0 left-0 h-full bg-indigo-500 transition-all duration-200"
                                style={{ width: `${uploadProgress}%` }}
                            ></div>
                        )}
                    </button>
                </footer>
            </form>
        </div>
    );
}