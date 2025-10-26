


import React, { useState } from 'react';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import type { CurrentUser, LeaveRequest, Student } from '../../types';
import { storage } from '../../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { serverTimestamp, Timestamp } from 'firebase/firestore';

interface ApplyLeavePageProps {
  onBack: () => void;
  onSave: (data: Omit<LeaveRequest, 'id'>) => Promise<void>;
  currentUser: CurrentUser;
  academyId: string;
  isDemoMode: boolean;
}

const UploadingModal: React.FC<{ progress: number }> = ({ progress }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-xs text-center">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Submitting Request</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Uploading attachment, please wait...</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-150" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-sm font-semibold mt-2 text-gray-700 dark:text-gray-200">{Math.round(progress)}%</p>
        </div>
    </div>
);


export function ApplyLeavePage({ onBack, onSave, currentUser, academyId, isDemoMode }: ApplyLeavePageProps) {
    const [formData, setFormData] = useState({
        fromDate: '',
        toDate: '',
        reason: '',
    });
    const [file, setFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isSaving, setIsSaving] = useState(false);

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
            alert("This is a demo. Cannot apply for leave.");
            return;
        }
        if (!formData.fromDate || !formData.toDate || !formData.reason) {
            alert("Please fill all fields.");
            return;
        }

        // FIX: Add type guard to ensure the user is a student or staff member before accessing role-specific properties like 'id', 'name', 'batches', and 'rollNumber'.
        if (currentUser.role !== 'student' && currentUser.role !== 'staff') {
            alert("Only students and staff can apply for leave.");
            return;
        }

        setIsSaving(true);
        
        try {
            let attachmentUrl: string | undefined = undefined;
            let storagePath: string | undefined = undefined;
            
            if (file) {
                storagePath = `academies/${academyId}/leave_attachments/${Date.now()}_${file.name}`;
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
                            resolve();
                        }
                    );
                });
            }
            
            const userData = currentUser.data;
            const userBatches = currentUser.role === 'student' ? (userData as Student).batches : [];

            await onSave({
                userId: userData.id,
                userName: userData.name,
                userRole: currentUser.role,
                userRollNumber: currentUser.role === 'student' ? (userData as Student).rollNumber : undefined,
                userBatches: userBatches,
                fromDate: Timestamp.fromDate(new Date(formData.fromDate)),
                toDate: Timestamp.fromDate(new Date(formData.toDate)),
                reason: formData.reason,
                attachmentUrl,
                storagePath,
                status: 'Pending',
                requestedAt: serverTimestamp(),
            } as Omit<LeaveRequest, 'id'>);

        } catch (error) {
            if (!isSaving) return; // Prevent alert if already handled by upload promise rejection
            alert((error as Error).message);
            setIsSaving(false);
        }
    };
    
    return (
        <>
            {isSaving && file && <UploadingModal progress={uploadProgress} />}
            <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
                <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                    <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-bold ml-2">Apply for Leave</h1>
                </header>
                
                <form onSubmit={handleSave} className="flex-grow flex flex-col">
                    <main className="flex-grow p-4 overflow-y-auto space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="fromDate" className="block text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">From Date</label>
                                <input id="fromDate" type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} required className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg" />
                            </div>
                            <div>
                                <label htmlFor="toDate" className="block text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">To Date</label>
                                <input id="toDate" type="date" name="toDate" value={formData.toDate} onChange={handleChange} required className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg" />
                            </div>
                        </div>
                        <textarea name="reason" placeholder="Reason for leave..." value={formData.reason} onChange={handleChange} required rows={5} className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"></textarea>
                        
                        <div>
                            <label htmlFor="file-upload" className="w-full p-3 bg-white dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500">
                                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Attach Document (Optional)</span>
                                <span className="text-xs text-gray-500">e.g., medical note</span>
                                {file && <span className="text-sm text-gray-500 mt-1">{file.name}</span>}
                            </label>
                            <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" />
                        </div>

                    </main>
                    <footer className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
                        <button type="submit" disabled={isSaving} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md disabled:bg-indigo-400">
                            {isSaving ? 'Submitting...' : 'Submit Application'}
                        </button>
                    </footer>
                </form>
            </div>
        </>
    );
}